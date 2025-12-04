// kilocode_change - file added
import { GoogleGenAI } from "@google/genai"
import { geminiDefaultModelId, geminiModels } from "@roo-code/types"
const DEFAULT_CONTEXT_WINDOW = 1_048_576
const STATIC_MODELS = geminiModels
const SUPPORTED_MODEL_PREFIXES = ["gemini-", "learnlm-"]
/**
 * Extract the canonical model identifier from the API model resource name.
 */
const normalizeModelId = (name) => {
	if (!name) {
		return undefined
	}
	const segments = name.split("/")
	const candidate = segments[segments.length - 1]
	if (!candidate || candidate.startsWith("tunedModels")) {
		return undefined
	}
	return candidate
}
const isSupportedModelId = (id) => SUPPORTED_MODEL_PREFIXES.some((prefix) => id.startsWith(prefix))
const createModelInfo = ({ id, staticInfo, inputTokenLimit, outputTokenLimit, displayName, description }) => {
	const contextWindow = inputTokenLimit ?? staticInfo?.contextWindow ?? DEFAULT_CONTEXT_WINDOW
	const maxTokens = outputTokenLimit ?? staticInfo?.maxTokens ?? null
	const supportsPromptCache = staticInfo?.supportsPromptCache ?? false
	const info = {
		...(staticInfo ?? {}),
		contextWindow,
		maxTokens,
		supportsPromptCache,
	}
	info.displayName = displayName ?? staticInfo?.displayName ?? id
	if (description ?? staticInfo?.description) {
		info.description = description ?? staticInfo?.description
	}
	return info
}
export const getGeminiModels = async ({ apiKey, baseUrl } = {}) => {
	if (!apiKey) {
		console.debug("[getGeminiModels] No API key provided, returning static models")
		return { ...STATIC_MODELS }
	}
	try {
		console.debug("[getGeminiModels] Fetching models", {
			hasApiKey: true,
			baseUrl,
		})
		const client = new GoogleGenAI({ apiKey })
		const listParams = baseUrl ? { config: { httpOptions: { baseUrl } } } : {}
		const pager = await client.models.list(listParams)
		const models = {}
		const fetchedBaseIds = new Set()
		for await (const model of pager) {
			const id = normalizeModelId(model.name)
			if (!id || !isSupportedModelId(id)) {
				continue
			}
			fetchedBaseIds.add(id)
			const staticInfo = STATIC_MODELS[id]
			models[id] = createModelInfo({
				id,
				staticInfo,
				inputTokenLimit: model.inputTokenLimit ?? undefined,
				outputTokenLimit: model.outputTokenLimit ?? undefined,
				displayName: model.displayName,
				description: model.description,
			})
		}
		// Include reasoning variants (e.g. :thinking) when the base model is available.
		for (const [id, staticInfo] of Object.entries(STATIC_MODELS)) {
			if (!id.includes(":")) {
				continue
			}
			const baseId = id.split(":")[0]
			if (models[baseId] || fetchedBaseIds.has(baseId)) {
				models[id] = createModelInfo({ id, staticInfo })
			}
		}
		if (!Object.keys(models).length) {
			console.debug("[getGeminiModels] No models returned from API, falling back to static list")
			return { ...STATIC_MODELS }
		}
		if (!models[geminiDefaultModelId] && STATIC_MODELS[geminiDefaultModelId]) {
			models[geminiDefaultModelId] = createModelInfo({
				id: geminiDefaultModelId,
				staticInfo: STATIC_MODELS[geminiDefaultModelId],
			})
		}
		console.debug("[getGeminiModels] Returning models", { count: Object.keys(models).length })
		return models
	} catch (error) {
		console.error("[getGeminiModels] Error fetching Gemini models", error)
		return { ...STATIC_MODELS }
	}
}
//# sourceMappingURL=gemini.js.map
