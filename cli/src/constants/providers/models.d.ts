import type { ProviderName } from "../../types/messages.js"
import type { ProviderConfig } from "../../config/types.js"
/**
 * RouterName type - mirrors the one from src/shared/api.ts
 */
export type RouterName =
	| "openrouter"
	| "requesty"
	| "glama"
	| "unbound"
	| "litellm"
	| "kilocode"
	| "ollama"
	| "lmstudio"
	| "io-intelligence"
	| "deepinfra"
	| "vercel-ai-gateway"
	| "ovhcloud"
/**
 * ModelInfo interface - mirrors the one from packages/types/src/model.ts
 */
export interface ModelInfo {
	maxTokens?: number | null
	maxThinkingTokens?: number | null
	contextWindow: number
	supportsImages?: boolean
	supportsComputerUse?: boolean
	supportsPromptCache: boolean
	promptCacheRetention?: "in_memory" | "24h"
	supportsVerbosity?: boolean
	supportsReasoningBudget?: boolean
	supportsReasoningBinary?: boolean
	supportsTemperature?: boolean
	defaultTemperature?: number
	requiredReasoningBudget?: boolean
	supportsReasoningEffort?: boolean | ("disable" | "none" | "minimal" | "low" | "medium" | "high")[]
	requiredReasoningEffort?: boolean
	preserveReasoning?: boolean
	supportedParameters?: ("max_tokens" | "temperature" | "reasoning" | "include_reasoning")[]
	inputPrice?: number
	outputPrice?: number
	cacheWritesPrice?: number
	cacheReadsPrice?: number
	description?: string
	reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high"
	minTokensPerCachePoint?: number
	maxCachePoints?: number
	cachableFields?: string[]
	displayName?: string | null
	preferredIndex?: number | null
	deprecated?: boolean
	isFree?: boolean
	supportsNativeTools?: boolean
	tiers?: Array<{
		name?: "default" | "flex" | "priority"
		contextWindow: number
		inputPrice?: number
		outputPrice?: number
		cacheWritesPrice?: number
		cacheReadsPrice?: number
	}>
}
export type ModelRecord = Record<string, ModelInfo>
export type RouterModels = Record<RouterName, ModelRecord>
/**
 * Mapping from ProviderName to RouterName for model fetching
 */
export declare const PROVIDER_TO_ROUTER_NAME: Record<ProviderName, RouterName | null>
/**
 * Mapping from ProviderName to the field name that stores the model ID
 */
export declare const PROVIDER_MODEL_FIELD: Record<ProviderName, string | null>
/**
 * Check if a provider supports dynamic model lists
 */
export declare const providerSupportsModelList: (provider: ProviderName) => boolean
/**
 * Check if a field is a model selection field
 */
export declare const isModelField: (field: string) => boolean
/**
 * Get the RouterName for a provider
 */
export declare const getRouterNameForProvider: (provider: ProviderName) => RouterName | null
/**
 * Get the model field name for a provider
 */
export declare const getModelFieldForProvider: (provider: ProviderName) => string | null
/**
 * Default model IDs for each provider
 * For providers without router support, these are fallback defaults
 */
export declare const DEFAULT_MODEL_IDS: Partial<Record<ProviderName, string>>
/**
 * Get models for a specific provider
 * Mirrors the logic from webview-ui/src/components/kilocode/hooks/useProviderModels.ts
 */
export declare function getModelsByProvider(params: {
	provider: ProviderName
	routerModels: RouterModels | null
	kilocodeDefaultModel: string
}): {
	models: ModelRecord
	defaultModel: string
}
/**
 * Get the model ID key for a provider
 * Mirrors the logic from webview-ui/src/components/kilocode/hooks/useSelectedModel.ts
 */
export declare function getModelIdKey(provider: ProviderName): string
/**
 * Get the current model ID from provider config
 */
export declare function getCurrentModelId(params: {
	providerConfig: ProviderConfig
	routerModels: RouterModels | null
	kilocodeDefaultModel: string
}): string
/**
 * Sort models by preferred index
 * Mirrors the logic from webview-ui/src/components/ui/hooks/kilocode/usePreferredModels.ts
 */
export declare function sortModelsByPreference(models: ModelRecord): string[]
/**
 * Format price for display
 */
export declare function formatPrice(price?: number): string
/**
 * Format model info for display
 */
export declare function formatModelInfo(modelId: string, model: ModelInfo): string
/**
 * Fuzzy filter models by name
 * Simple fuzzy matching: checks if all characters in filter appear in order in the model ID
 */
export declare function fuzzyFilterModels(models: ModelRecord, filter: string): string[]
/**
 * Get a pretty name for a model
 */
export declare function prettyModelName(modelId: string): string
//# sourceMappingURL=models.d.ts.map
