// kilocode_change - new file
import OpenAI from "openai"
import { nanoGptDefaultModelId, nanoGptDefaultModelInfo } from "@roo-code/types"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { getModelParams } from "../transform/model-params"
import { getModels } from "./fetchers/modelCache"
import { DEFAULT_HEADERS } from "./constants"
import { BaseProvider } from "./base-provider"
import { handleOpenAIError } from "./utils/openai-error-handler"
import { XmlMatcher } from "../../utils/xml-matcher"
export class NanoGptHandler extends BaseProvider {
	options
	client
	models = {}
	get providerName() {
		return "Nano-GPT"
	}
	constructor(options) {
		super()
		this.options = options
		const baseURL = "https://nano-gpt.com/api/v1"
		const apiKey = this.options.nanoGptApiKey ?? "not-provided"
		this.client = new OpenAI({ baseURL, apiKey, defaultHeaders: DEFAULT_HEADERS })
	}
	async *createMessage(systemPrompt, messages, metadata) {
		const model = await this.fetchModel()
		const { id: modelId, maxTokens, temperature } = model
		const openAiMessages = [{ role: "system", content: systemPrompt }, ...convertToOpenAiMessages(messages)]
		const completionParams = {
			model: modelId,
			...(maxTokens && maxTokens > 0 && { max_tokens: maxTokens }),
			temperature,
			messages: openAiMessages,
			stream: true,
			stream_options: { include_usage: true },
		}
		let stream
		try {
			stream = await this.client.chat.completions.create(completionParams)
		} catch (error) {
			throw handleOpenAIError(error, this.providerName)
		}
		let lastUsage = undefined
		// Initialize XmlMatcher to parse <think>...</think> tags
		const matcher = new XmlMatcher("think", (chunk) => {
			return {
				type: chunk.matched ? "reasoning" : "text",
				text: chunk.data,
			}
		})
		for await (const chunk of stream) {
			if ("error" in chunk) {
				const error = chunk.error
				console.error(`Nano-GPT API Error: ${error?.code} - ${error?.message}`)
				throw new Error(`Nano-GPT API Error ${error?.code}: ${error?.message}`)
			}
			const delta = chunk.choices[0]?.delta
			if (delta?.content) {
				// Use XmlMatcher to parse <think>...</think> tags
				for (const parsedChunk of matcher.update(delta.content)) {
					yield parsedChunk
				}
			}
			if (chunk.usage) {
				lastUsage = chunk.usage
			}
		}
		// Finalize any remaining content in the matcher
		for (const parsedChunk of matcher.final()) {
			yield parsedChunk
		}
		if (lastUsage) {
			yield {
				type: "usage",
				inputTokens: lastUsage.prompt_tokens || 0,
				outputTokens: lastUsage.completion_tokens || 0,
			}
		}
	}
	async fetchModel() {
		const models = await getModels({
			provider: "nano-gpt",
			apiKey: this.options.nanoGptApiKey,
			nanoGptModelList: this.options.nanoGptModelList,
		})
		this.models = models
		return this.getModel()
	}
	getModel() {
		const id = this.options.nanoGptModelId ?? nanoGptDefaultModelId
		const info = this.models[id] ?? nanoGptDefaultModelInfo
		const params = getModelParams({
			format: "openai",
			modelId: id,
			model: info,
			settings: this.options,
		})
		return { id, info, ...params }
	}
	async completePrompt(prompt) {
		const { id: modelId, maxTokens, temperature } = await this.fetchModel()
		const completionParams = {
			model: modelId,
			max_tokens: maxTokens,
			temperature,
			messages: [{ role: "user", content: prompt }],
			stream: false,
		}
		let response
		try {
			response = await this.client.chat.completions.create(completionParams)
		} catch (error) {
			throw handleOpenAIError(error, this.providerName)
		}
		if ("error" in response) {
			const error = response.error
			throw new Error(`Nano-GPT API Error ${error?.code}: ${error?.message}`)
		}
		const completion = response
		return completion.choices[0]?.message?.content || ""
	}
}
//# sourceMappingURL=nano-gpt.js.map
