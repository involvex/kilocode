import { type ModelInfo } from "@roo-code/types"
interface GeminiFetcherOptions {
	apiKey?: string
	baseUrl?: string
}
export declare const getGeminiModels: ({ apiKey, baseUrl }?: GeminiFetcherOptions) => Promise<Record<string, ModelInfo>>
export {}
//# sourceMappingURL=gemini.d.ts.map
