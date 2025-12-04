// kilocode_change - file added
import { calculateApiCostOpenAI } from "../../shared/cost"
import { RouterProvider } from "./router-provider"
import { inceptionDefaultModelId, inceptionDefaultModelInfo } from "@roo-code/types"
import { getModels } from "./fetchers/modelCache"
import { getModelParams } from "../transform/model-params"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { addNativeToolCallsToParams, ToolCallAccumulator } from "./kilocode/nativeToolCallHelpers"
export class InceptionLabsHandler extends RouterProvider {
	constructor(options) {
		super({
			options: {
				...options,
				openAiHeaders: {
					"X-Inceptionlabs-Source": "kilocode",
					"X-Inceptionlabs-Version": `2025-10-31`,
				},
			},
			name: "inception",
			baseURL: `${options.inceptionLabsBaseUrl || "https://api.inceptionlabs.ai/v1/"}`,
			apiKey: options.inceptionLabsApiKey || "not-provided",
			modelId: options.inceptionLabsModelId,
			defaultModelId: inceptionDefaultModelId,
			defaultModelInfo: inceptionDefaultModelInfo,
		})
	}
	async fetchModel() {
		this.models = await getModels({ provider: this.name, apiKey: this.client.apiKey, baseUrl: this.client.baseURL })
		return this.getModel()
	}
	getModel() {
		const id = this.options.inceptionLabsModelId ?? inceptionDefaultModelId
		const info = this.models[id] ?? inceptionDefaultModelInfo
		const params = getModelParams({
			format: "openai",
			modelId: id,
			model: info,
			settings: this.options,
		})
		return { id, info, ...params }
	}
	async *createMessage(systemPrompt, messages, _metadata) {
		await this.fetchModel()
		const { id: modelId, info, reasoningEffort: reasoning_effort } = await this.fetchModel()
		let prompt_cache_key = undefined
		const requestOptions = {
			model: modelId,
			messages: [{ role: "system", content: systemPrompt }, ...convertToOpenAiMessages(messages)],
			stream: true,
			reasoning_effort,
			prompt_cache_key,
		}
		if (this.supportsTemperature(modelId)) {
			requestOptions.temperature = this.options.modelTemperature ?? 0
		}
		if (this.options.includeMaxTokens == true && info.maxTokens) {
			requestOptions.max_completion_tokens = this.options.modelMaxTokens
		}
		requestOptions.stream_options = { include_usage: true }
		const { data: stream } = await this.client.chat.completions
			.create(addNativeToolCallsToParams(requestOptions, this.options, _metadata))
			.withResponse()
		let lastUsage
		const toolCallAccumulator = new ToolCallAccumulator()
		for await (const chunk of stream) {
			const delta = chunk.choices[0]?.delta
			yield* toolCallAccumulator.processChunk(chunk)
			if (delta?.content) {
				yield { type: "text", text: delta.content }
			}
			if (delta && "reasoning_content" in delta && delta.reasoning_content) {
				yield { type: "reasoning", text: delta.reasoning_content || "" }
			}
			if (chunk.usage) {
				lastUsage = chunk.usage
			}
		}
		if (lastUsage) {
			yield this.processUsageMetrics(lastUsage, info)
		}
	}
	async completePrompt(prompt) {
		await this.fetchModel()
		const { id: modelId, info } = this.getModel()
		const requestOptions = {
			model: modelId,
			messages: [{ role: "user", content: prompt }],
		}
		if (this.supportsTemperature(modelId)) {
			requestOptions.temperature = this.options.modelTemperature ?? 0
		}
		if (this.options.includeMaxTokens === true && info.maxTokens) {
			requestOptions.max_completion_tokens = this.options.modelMaxTokens || info.maxTokens
		}
		const resp = await this.client.chat.completions.create(requestOptions)
		return resp.choices[0]?.message?.content || ""
	}
	processUsageMetrics(usage, modelInfo) {
		const inputTokens = usage?.prompt_tokens || 0
		const outputTokens = usage?.completion_tokens || 0
		const cacheWriteTokens = usage?.prompt_tokens_details?.cache_write_tokens || 0
		const cacheReadTokens = usage?.prompt_tokens_details?.cached_tokens || 0
		const totalCost = modelInfo
			? calculateApiCostOpenAI(modelInfo, inputTokens, outputTokens, cacheWriteTokens, cacheReadTokens)
			: undefined
		return {
			type: "usage",
			inputTokens,
			outputTokens,
			cacheWriteTokens: cacheWriteTokens || undefined,
			cacheReadTokens: cacheReadTokens || undefined,
			totalCost: totalCost?.totalCost || undefined,
		}
	}
}
//# sourceMappingURL=inception.js.map
