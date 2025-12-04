// kilocode_change - file added
import axios from "axios"
import { parseApiPrice } from "../../../shared/cost"
export async function getOvhCloudAiEndpointsModels() {
	const models = {}
	try {
		const response = await axios.get("https://catalog.endpoints.ai.ovh.net/rest/v2/openrouter")
		for (const model of response.data.data) {
			models[model.name] = {
				maxTokens: model.max_output_length,
				contextWindow: model.context_length,
				supportsImages: model.input_modalities.includes("image"),
				supportsPromptCache: model.input_modalities.includes("cache"),
				inputPrice: parseApiPrice(model.pricing.prompt),
				outputPrice: parseApiPrice(model.pricing.completion),
				description: model.description,
			}
		}
	} catch (error) {
		console.error(
			`Error fetching OVHcloud AI Endpoints models: ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`,
		)
	}
	return models
}
//# sourceMappingURL=ovhcloud.js.map
