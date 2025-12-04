import { streamSse } from "../../../fetch/stream.js"
import { chatChunk, usageChatChunk } from "../util.js"
import { EMPTY_CHAT_COMPLETION } from "../util/emptyChatCompletion.js"
import { CACHING_STRATEGIES } from "./AnthropicCachingStrategies.js"
import {
	getAnthropicHeaders,
	getAnthropicMediaTypeFromDataUrl,
	openAiToolChoiceToAnthropicToolChoice,
	openaiToolToAnthropicTool,
} from "./AnthropicUtils.js"
export class AnthropicApi {
	config
	apiBase = "https://api.anthropic.com/v1/"
	constructor(config) {
		this.config = config
		this.apiBase = config.apiBase ?? this.apiBase
		if (!this.apiBase.endsWith("/")) {
			this.apiBase += "/"
		}
	}
	_convertBody(oaiBody) {
		// Step 1: Convert to clean Anthropic body (no caching)
		const cleanBody = this._convertToCleanAnthropicBody(oaiBody)
		// Step 2: Apply caching strategy
		const cachingStrategy = CACHING_STRATEGIES[this.config.cachingStrategy ?? "systemAndTools"]
		return cachingStrategy(cleanBody)
	}
	maxTokensForModel(model) {
		if (model.includes("haiku")) {
			return 8192
		}
		return 32_000
	}
	_convertToCleanAnthropicBody(oaiBody) {
		let stop = undefined
		if (oaiBody.stop && Array.isArray(oaiBody.stop)) {
			stop = oaiBody.stop.filter((x) => x.trim() !== "")
		} else if (typeof oaiBody.stop === "string" && oaiBody.stop.trim() !== "") {
			stop = [oaiBody.stop]
		}
		const systemMessage = oaiBody.messages.find((msg) => msg.role === "system")?.content
		// TODO support custom tools
		const functionTools = oaiBody.tools?.filter((t) => t.type === "function")
		let tools = undefined
		if (oaiBody.tool_choice !== "none" && functionTools && functionTools.length > 0) {
			if (typeof oaiBody.tool_choice !== "string" && oaiBody.tool_choice?.type === "allowed_tools") {
				const allowedToolNames = new Set(
					oaiBody.tool_choice?.allowed_tools.tools.map((tool) => tool["name"]) ?? [],
				)
				const allowedTools = functionTools.filter((t) => allowedToolNames.has(t.function.name))
				tools = allowedTools.map(openaiToolToAnthropicTool)
			} else {
				tools = functionTools.map(openaiToolToAnthropicTool)
			}
		}
		const anthropicBody = {
			messages: this._convertMessages(oaiBody.messages.filter((msg) => msg.role !== "system")),
			system:
				typeof systemMessage === "string"
					? [
							{
								type: "text",
								text: systemMessage,
							},
						]
					: systemMessage,
			top_p: oaiBody.top_p ?? undefined,
			temperature: oaiBody.temperature ?? undefined,
			max_tokens: oaiBody.max_tokens ?? this.maxTokensForModel(oaiBody.model), // max_tokens is required
			model: oaiBody.model,
			stop_sequences: stop,
			stream: oaiBody.stream ?? undefined,
			tools,
			tool_choice: openAiToolChoiceToAnthropicToolChoice(oaiBody.tool_choice),
		}
		return anthropicBody
	}
	// 1. ignores empty content
	// 2. converts string content to text parts
	// 3. converts text and refusal parts to text blocks
	// 4. converts image parts to image blocks
	convertMessageContentToBlocks(content) {
		const blocks = []
		if (typeof content === "string") {
			if (content) {
				blocks.push({
					type: "text",
					text: content,
				})
			}
		} else {
			const supportedParts = content.filter(
				(p) => p.type === "text" || p.type === "image_url" || p.type === "refusal",
			)
			for (const part of supportedParts) {
				if (part.type === "image_url") {
					const dataUrl = part.image_url.url
					if (dataUrl?.startsWith("data:")) {
						blocks.push({
							type: "image",
							source: {
								type: "base64",
								media_type: getAnthropicMediaTypeFromDataUrl(dataUrl),
								data: dataUrl.split(",")[1],
							},
						})
					}
				} else {
					const text = part.type === "text" ? part.text : part.refusal
					if (text) {
						blocks.push({
							type: "text",
							text,
						})
					}
				}
			}
		}
		return blocks
	}
	getContentBlocksFromChatMessage(message) {
		switch (message.role) {
			// One tool message = one tool_result block
			case "user":
				return this.convertMessageContentToBlocks(message.content)
			case "assistant": {
				const blocks = message.content ? this.convertMessageContentToBlocks(message.content) : []
				return blocks
			}
			// system, etc.
			default:
				return []
		}
	}
	_convertMessages(msgs) {
		const nonSystemMessages = msgs.filter((m) => m.role !== "system")
		const convertedMessages = []
		let currentRole = undefined
		let currentParts = []
		const flushCurrentMessage = () => {
			if (currentRole && currentParts.length > 0) {
				convertedMessages.push({
					role: currentRole,
					content: currentParts,
				})
				currentParts = []
			}
		}
		for (const message of nonSystemMessages) {
			const newRole = message.role === "user" || message.role === "tool" ? "user" : "assistant"
			if (currentRole !== newRole) {
				flushCurrentMessage()
				currentRole = newRole
			}
			currentParts.push(...this.getContentBlocksFromChatMessage(message))
		}
		flushCurrentMessage()
		return convertedMessages
	}
	async chatCompletionNonStream(body, signal) {
		const response = await fetch(new URL("messages", this.apiBase), {
			method: "POST",
			headers: this.getHeaders(),
			body: JSON.stringify(this._convertBody(body)),
			signal,
		})
		if (response.status === 499) {
			return EMPTY_CHAT_COMPLETION
		}
		const completion = await response.json()
		const usage = completion.usage
		return {
			id: completion.id,
			object: "chat.completion",
			model: body.model,
			created: Date.now(),
			usage: {
				total_tokens: (usage?.input_tokens ?? 0) + (usage?.output_tokens ?? 0),
				completion_tokens: usage?.output_tokens ?? 0,
				prompt_tokens: usage?.input_tokens ?? 0,
				prompt_tokens_details: {
					cached_tokens: usage?.cache_read_input_tokens ?? 0,
				},
			},
			choices: [
				{
					logprobs: null,
					finish_reason: "stop",
					message: {
						role: "assistant",
						content: completion.content[0].text,
						refusal: null,
					},
					index: 0,
				},
			],
		}
	}
	// This is split off so e.g. VertexAI can use it
	async *handleStreamResponse(response, model) {
		const usage = {
			completion_tokens: 0,
			prompt_tokens: 0,
			total_tokens: 0,
		}
		for await (const event of streamSse(response)) {
			// https://docs.anthropic.com/en/api/messages-streaming#event-types
			const rawEvent = event
			switch (rawEvent.type) {
				case "message_start": {
					const startEvent = rawEvent
					usage.prompt_tokens = startEvent.message.usage?.input_tokens ?? 0
					usage.prompt_tokens_details = {
						cached_tokens: startEvent.message.usage?.cache_read_input_tokens ?? 0,
					}
					break
				}
				case "message_delta": {
					const deltaEvent = rawEvent
					usage.completion_tokens = deltaEvent.usage?.output_tokens ?? 0
					break
				}
				case "content_block_delta": {
					// https://docs.anthropic.com/en/api/messages-streaming#delta-types
					const blockDeltaEvent = rawEvent
					switch (blockDeltaEvent.delta.type) {
						case "text_delta":
							yield chatChunk({
								content: blockDeltaEvent.delta.text,
								model,
							})
							break
						case "input_json_delta":
							// Skip tool use delta
							break
					}
					break
				}
				default:
					break
			}
		}
		yield usageChatChunk({
			model,
			usage: {
				...usage,
				total_tokens: usage.completion_tokens + usage.prompt_tokens,
			},
		})
	}
	async *chatCompletionStream(body, signal) {
		const response = await fetch(new URL("messages", this.apiBase), {
			method: "POST",
			headers: this.getHeaders(),
			body: JSON.stringify(this._convertBody(body)),
			signal,
		})
		yield* this.handleStreamResponse(response, body.model)
	}
	getHeaders() {
		const enableCaching = this.config?.cachingStrategy !== "none"
		return getAnthropicHeaders(this.config.apiKey, enableCaching)
	}
	async completionNonStream(_body, _signal) {
		throw new Error("Method not implemented.")
	}
	// eslint-disable-next-line require-yield
	async *completionStream(_body, _signal) {
		throw new Error("Method not implemented.")
	}
	// eslint-disable-next-line require-yield
	async *fimStream(_body, _signal) {
		throw new Error("Method not implemented.")
	}
	async rerank(_body) {
		throw new Error("Method not implemented.")
	}
	list() {
		throw new Error("Method not implemented.")
	}
}
//# sourceMappingURL=Anthropic.js.map
