import {
	BedrockRuntimeClient,
	ConversationRole,
	ConverseStreamCommand,
	ImageFormat,
	InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime"
import { randomUUID } from "node:crypto"
import { fromNodeProviderChain } from "@aws-sdk/credential-providers"
import { chatChunk, rerank } from "../util.js"
export class BedrockApi {
	config
	constructor(config) {
		this.config = config
		if (config.env?.accessKeyId || config?.env?.secretAccessKey) {
			if (!config.env?.accessKeyId) {
				throw new Error("accessKeyId is required for Bedrock API. Only found secretAccessKey")
			}
			if (!config.env?.secretAccessKey) {
				throw new Error("secretAccessKey is required for Bedrock API. Only found accessKeyId")
			}
		}
	}
	async getCreds() {
		if (this.config?.env?.accessKeyId && this.config?.env?.secretAccessKey) {
			return {
				accessKeyId: this.config.env.accessKeyId,
				secretAccessKey: this.config.env.secretAccessKey,
			}
		}
		const profile = this.config.env?.profile ?? "bedrock"
		try {
			return await fromNodeProviderChain({
				profile: profile,
				ignoreCache: true,
			})()
		} catch {
			console.warn(`AWS profile with name ${profile} not found in ~/.aws/credentials, using default profile`)
		}
		return await fromNodeProviderChain()()
	}
	async getClient() {
		const region = this.config.env?.region
		// If apiKey is provided, use bearer token authentication
		if (this.config.apiKey) {
			return new BedrockRuntimeClient({
				region,
				credentials: {
					accessKeyId: this.config.apiKey,
					secretAccessKey: this.config.apiKey,
				},
			})
		}
		// Otherwise use IAM credentials (existing behavior)
		const creds = await this.getCreds()
		return new BedrockRuntimeClient({
			region,
			credentials: creds,
		})
	}
	_oaiPartToBedrockPart(part) {
		switch (part.type) {
			case "refusal":
				return {
					text: part.refusal,
				}
			case "text":
				return {
					text: part.text,
				}
			case "input_audio":
				throw new Error("Unsupported part type: input_audio")
			case "image_url":
			default:
				try {
					const [mimeType, base64Data] = part.image_url.url.split(",")
					const format = mimeType.split("/")[1]?.split(";")[0] || "jpeg"
					if (
						format === ImageFormat.JPEG ||
						format === ImageFormat.PNG ||
						format === ImageFormat.WEBP ||
						format === ImageFormat.GIF
					) {
						return {
							image: {
								format,
								source: {
									bytes: Uint8Array.from(Buffer.from(base64Data, "base64")),
								},
							},
						}
					} else {
						console.warn(`Bedrock: skipping unsupported image part format: ${format}`)
						return { text: "[Unsupported image format]" }
					}
				} catch (error) {
					console.warn("Bedrock: failed to process image part", error)
					return { text: "[Failed to process image]" }
				}
		}
	}
	_convertMessages(oaiMessages, _availableTools) {
		let currentRole = "user"
		let currentBlocks = []
		const converted = []
		const pushCurrentMessage = () => {
			if (currentBlocks.length > 0) {
				converted.push({
					role: currentRole,
					content: currentBlocks,
				})
				currentBlocks = []
			}
		}
		const nonSystemMessages = oaiMessages.filter((m) => m.role !== "system")
		for (let idx = 0; idx < nonSystemMessages.length; idx++) {
			const message = nonSystemMessages[idx]
			if (message.role === "user" || message.role === "tool") {
				// Detect conversational turn change
				if (currentRole !== ConversationRole.USER) {
					pushCurrentMessage()
					currentRole = ConversationRole.USER
				}
				// USER messages
				if (message.role === "user") {
					const content = message.content
					if (content) {
						if (typeof content === "string") {
							currentBlocks.push({ text: content })
						} else {
							content.forEach((part) => {
								currentBlocks.push(this._oaiPartToBedrockPart(part))
							})
						}
					}
				}
				// TOOL messages - no longer supported, skip
			} else if (message.role === "assistant") {
				// Detect conversational turn change
				if (currentRole !== ConversationRole.ASSISTANT) {
					pushCurrentMessage()
					currentRole = ConversationRole.ASSISTANT
				}
				// ASSISTANT messages
				if (typeof message.content === "string") {
					const trimmedText = message.content.trim()
					if (trimmedText) {
						currentBlocks.push({ text: trimmedText })
					}
				} else {
					message.content?.forEach((part) => {
						const text = part.type === "text" ? part.text : part.refusal
						const trimmedText = text.trim()
						if (trimmedText) {
							currentBlocks.push({ text: trimmedText })
						}
					})
				}
			}
		}
		if (currentBlocks.length > 0) {
			pushCurrentMessage()
		}
		// If caching is enabled, add cache points
		// if (this.config.cacheBehavior?.cacheConversation) {
		//   this._addCachingToLastTwoUserMessages(converted);
		// }
		return converted
	}
	_convertBody(oaiBody) {
		// Extract system message
		const systemMessage = oaiBody.messages.find((msg) => msg.role === "system")?.content || ""
		const systemMessageText =
			typeof systemMessage === "string"
				? systemMessage
				: systemMessage.map((part) => (part.type === "text" ? part.text : "[Non-text content]")).join(" ")
		// Check for tools
		const availableTools = new Set()
		let toolConfig = undefined
		if (oaiBody.tools && oaiBody.tools.length > 0) {
			toolConfig = {
				tools: oaiBody.tools.map((tool) => {
					// Type guard for function tools
					if (tool.type === "function" && "function" in tool) {
						return {
							toolSpec: {
								name: tool.function.name,
								description: tool.function.description,
								inputSchema: {
									json: tool.function.parameters,
								},
							},
						}
					} else {
						throw new Error(`Unsupported tool type in Bedrock: ${tool.type}`)
					}
				}),
			}
			// Add cache point if needed
			// if (this.config.cacheBehavior?.cacheSystemMessage) {
			//   toolConfig!.tools!.push({ cachePoint: { type: "default" } });
			// }
			oaiBody.tools.forEach((tool) => {
				if (tool.type === "function" && "function" in tool) {
					availableTools.add(tool.function.name)
				}
			})
		}
		// Convert messages
		const convertedMessages = this._convertMessages(oaiBody.messages, availableTools)
		// Build final request body
		const body = {
			modelId: oaiBody.model,
			messages: convertedMessages,
			inferenceConfig: {
				temperature: oaiBody.temperature ?? undefined,
				topP: oaiBody.top_p ?? undefined,
				maxTokens: oaiBody.max_tokens ?? undefined,
				stopSequences: Array.isArray(oaiBody.stop)
					? oaiBody.stop.filter((s) => s.trim() !== "").slice(0, 4)
					: oaiBody.stop
						? [oaiBody.stop].filter((s) => s.trim() !== "")
						: undefined,
			},
		}
		// Add system message if present
		if (systemMessageText) {
			body.system = [{ text: systemMessageText }]
		}
		// Add tool config if present
		if (toolConfig) {
			body.toolConfig = toolConfig
		}
		// Add reasoning if needed
		// TODO REASONING
		// if (this.c) {
		//   body.additionalModelRequestFields = {
		//     thinking: {
		//       type: "enabled",
		//       budget_tokens:
		//         oaiBody.additionalModelRequestFields.reasoningBudgetTokens,
		//     },
		//   };
		// }
		return body
	}
	async chatCompletionNonStream(body, signal) {
		let completion = ""
		for await (const chunk of this.chatCompletionStream(
			{
				...body,
				stream: true,
			},
			signal,
		)) {
			if (chunk.choices[0].delta.content) {
				completion += chunk.choices[0].delta.content
			}
		}
		return {
			id: randomUUID(),
			object: "chat.completion",
			model: body.model,
			created: Date.now(),
			choices: [
				{
					index: 0,
					logprobs: null,
					finish_reason: "stop",
					message: {
						role: "assistant",
						content: completion,
						refusal: null,
					},
				},
			],
			usage: undefined,
		}
	}
	async *chatCompletionStream(body, signal) {
		const requestBody = this._convertBody(body)
		try {
			const command = new ConverseStreamCommand({
				...requestBody,
			})
			const client = await this.getClient()
			const response = await client.send(command, { abortSignal: signal })
			if (!response?.stream) {
				throw new Error("No stream received from Bedrock API")
			}
			for await (const chunk of response.stream) {
				if (chunk.contentBlockDelta?.delta) {
					const delta = chunk.contentBlockDelta.delta
					// Handle text content
					if (delta.text) {
						yield chatChunk({
							content: delta.text,
							model: body.model,
						})
						continue
					}
					// Handle thinking content (if reasoning enabled)
					if (delta.reasoningContent?.text) {
						// TODO reasoning
						// Reasoning is not directly supported in OpenAI format,
						// but we could add it as a special message
						continue
					}
					// Skip tool use blocks
				}
				if (chunk.contentBlockStart?.start) {
					const start = chunk.contentBlockStart.start
					if (start.toolUse) {
						// Skip tool use
						continue
					}
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				if ("code" in error) {
					const code = error.code
					throw new Error(`AWS Bedrock stream error (${code ?? "UNKNOWN"}): ${error.message}`)
				}
				throw new Error(`Error processing Bedrock stream: ${error.message}`)
			}
			throw new Error("Error processing Bedrock stream: Unknown error occurred")
		}
	}
	completionNonStream(_body) {
		throw new Error("Bedrock does not support completions API")
	}
	completionStream(_body) {
		throw new Error("Bedrock does not support completions API")
	}
	fimStream(_body) {
		throw new Error("Bedrock does not support FIM directly")
	}
	async getInvokeModelResponseBody(model, jsonBody) {
		const payload = {
			body: JSON.stringify(jsonBody),
			modelId: model,
			accept: "*/*",
			contentType: "application/json",
		}
		const command = new InvokeModelCommand(payload)
		const client = await this.getClient()
		const response = await client.send(command)
		if (!response.body) {
			throw new Error("No response body")
		}
		const decoder = new TextDecoder()
		const decoded = decoder.decode(response.body)
		return JSON.parse(decoded)
	}
	async rerank(body) {
		if (!body.query || !body.documents.length) {
			throw new Error("Query and chunks must not be empty")
		}
		// Base payload for both models
		const payload = {
			query: body.query,
			documents: body.documents,
			top_n: body.top_k ?? body.documents.length,
		}
		// Add api_version for Cohere model
		if (body.model.startsWith("cohere.rerank")) {
			payload.api_version = 2
		}
		try {
			const responseBody = await this.getInvokeModelResponseBody(body.model, payload)
			const scores = responseBody.results
				.sort((a, b) => a.index - b.index)
				.map((result) => result.relevance_score)
			return rerank({
				model: body.model,
				usage: {
					total_tokens: 0,
				},
				data: scores,
			})
		} catch (error) {
			if (error instanceof Error) {
				if ("code" in error) {
					// AWS SDK specific errors
					const code = error.code
					throw new Error(`AWS Bedrock rerank error (${code ?? "UNKNOWN"}): ${error.message}`)
				}
				throw new Error(`Error in BedrockReranker.rerank: ${error.message}`)
			}
			throw new Error("Error in BedrockReranker.rerank: Unknown error occurred")
		}
	}
	list() {
		throw new Error("Method not implemented.")
	}
}
//# sourceMappingURL=Bedrock.js.map
