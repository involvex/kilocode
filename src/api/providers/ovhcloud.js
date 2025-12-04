// kilocode_change - file added
import { ovhCloudAiEndpointsDefaultModelId, ovhCloudAiEndpointsDefaultModelInfo } from "@roo-code/types"
import { RouterProvider } from "./router-provider"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { calculateApiCostOpenAI } from "../../shared/cost"
import { convertToR1Format } from "../transform/r1-format"
import { XmlMatcher } from "../../utils/xml-matcher"
export class OVHcloudAIEndpointsHandler extends RouterProvider {
	constructor(options) {
		super({
			options,
			name: "ovhcloud",
			baseURL: `${options.ovhCloudAiEndpointsBaseUrl || "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1"}`,
			apiKey: options.ovhCloudAiEndpointsApiKey,
			modelId: options.ovhCloudAiEndpointsModelId,
			defaultModelId: ovhCloudAiEndpointsDefaultModelId,
			defaultModelInfo: ovhCloudAiEndpointsDefaultModelInfo,
		})
	}
	async *createMessage(systemPrompt, messages, _metadata) {
		const { id: modelId, info } = await this.fetchModel()
		const useR1Format = modelId.toLowerCase().includes("deepseek-r1")
		const openAiMessages = [
			{ role: "system", content: systemPrompt },
			...(useR1Format ? convertToR1Format(messages) : convertToOpenAiMessages(messages)),
		]
		const body = {
			model: modelId,
			messages: openAiMessages,
			stream: true,
			stream_options: { include_usage: true },
		}
		const completion = await this.client.chat.completions.create(body)
		const matcher = new XmlMatcher("think", (chunk) => ({
			type: chunk.matched ? "reasoning" : "text",
			text: chunk.data,
		}))
		for await (const chunk of completion) {
			const delta = chunk.choices[0]?.delta
			if (delta?.content) {
				for (const matcherChunk of matcher.update(delta.content)) {
					yield matcherChunk
				}
			}
			if (chunk.usage) {
				const usage = chunk.usage
				yield {
					type: "usage",
					inputTokens: usage.prompt_tokens || 0,
					outputTokens: usage.completion_tokens || 0,
					totalCost:
						calculateApiCostOpenAI(info, usage.prompt_tokens || 0, usage.completion_tokens || 0)
							.totalCost || undefined,
				}
			}
		}
	}
	async completePrompt(prompt) {
		const { id: modelId } = await this.fetchModel()
		try {
			const requestOptions = {
				model: modelId,
				messages: [{ role: "user", content: prompt }],
			}
			if (this.supportsTemperature(modelId)) {
				requestOptions.temperature = this.options.modelTemperature ?? 0.7
			}
			const response = await this.client.chat.completions.create(requestOptions)
			return response.choices[0]?.message.content || ""
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`OVHcloud AI Endpoints completion error: ${error.message}`)
			}
			throw error
		}
	}
}
//# sourceMappingURL=ovhcloud.js.map
