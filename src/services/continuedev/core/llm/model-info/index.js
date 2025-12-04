import { OpenAi } from "./providers/openai.js"
const allModelProviders = [OpenAi]
const allLlms = allModelProviders.flatMap((provider) =>
	provider.models.map((model) => ({ ...model, provider: provider.id })),
)
export function findLlmInfo(model, preferProviderId) {
	if (preferProviderId) {
		const provider = allModelProviders.find((p) => p.id === preferProviderId)
		const info = provider?.models.find((llm) => (llm.regex ? llm.regex.test(model) : llm.model === model))
		if (info) {
			return {
				...info,
				provider: preferProviderId,
			}
		}
	}
	return allLlms.find((llm) => (llm.regex ? llm.regex.test(model) : llm.model === model))
}
//# sourceMappingURL=index.js.map
