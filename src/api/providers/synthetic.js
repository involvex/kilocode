// kilocode_change - provider added
import { syntheticDefaultModelId, syntheticModels } from "@roo-code/types"
import { BaseOpenAiCompatibleProvider } from "./base-openai-compatible-provider"
import { getModels } from "./fetchers/modelCache"
import { getModelParams } from "../transform/model-params"
export class SyntheticHandler extends BaseOpenAiCompatibleProvider {
	models = {}
	constructor(options) {
		super({
			...options,
			providerName: "Synthetic",
			baseURL: "https://api.synthetic.new/openai/v1",
			apiKey: options.syntheticApiKey,
			defaultProviderModelId: syntheticDefaultModelId,
			providerModels: syntheticModels,
			defaultTemperature: 0.5,
		})
	}
	async fetchModel() {
		this.models = await getModels({ provider: "synthetic", apiKey: this.options.apiKey })
		return this.getModel()
	}
	getModel() {
		const id = this.options.apiModelId ?? syntheticDefaultModelId
		const info = this.models[id] ?? syntheticModels[id] ?? syntheticModels[syntheticDefaultModelId]
		const params = getModelParams({
			format: "openai",
			modelId: id,
			model: info,
			settings: this.options,
		})
		return { id, info, ...params }
	}
	async *createMessage(systemPrompt, messages, metadata) {
		await this.fetchModel()
		yield* super.createMessage(systemPrompt, messages, metadata)
	}
	async completePrompt(prompt) {
		await this.fetchModel()
		return super.completePrompt(prompt)
	}
}
//# sourceMappingURL=synthetic.js.map
