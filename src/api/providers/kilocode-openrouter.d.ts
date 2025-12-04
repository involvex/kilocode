import { ApiHandlerOptions, ModelRecord } from "../../shared/api"
import { CompletionUsage, OpenRouterHandler } from "./openrouter"
import { ApiHandlerCreateMessageMetadata } from ".."
/**
 * A custom OpenRouter handler that overrides the getModel function
 * to provide custom model information and fetches models from the KiloCode OpenRouter endpoint.
 */
export declare class KilocodeOpenrouterHandler extends OpenRouterHandler {
	protected models: ModelRecord
	defaultModel: string
	private apiFIMBase
	protected get providerName(): "KiloCode"
	constructor(options: ApiHandlerOptions)
	getRolloutHash(): number | undefined
	customRequestOptions(metadata?: ApiHandlerCreateMessageMetadata):
		| {
				headers: Record<string, string>
		  }
		| undefined
	getTotalCost(lastUsage: CompletionUsage): number
	getModel(): {
		format: "openrouter"
		reasoning: import("../transform/reasoning").OpenRouterReasoningParams | undefined
		maxTokens: number | undefined
		temperature: number | undefined
		reasoningEffort:
			| import("@roo-code/types", { with: { "resolution-mode": "import" } }).ReasoningEffortExtended
			| undefined
		reasoningBudget: number | undefined
		verbosity: import("@roo-code/types", { with: { "resolution-mode": "import" } }).VerbosityLevel | undefined
		id: string
		info: {
			contextWindow: number
			supportsPromptCache: boolean
			maxTokens?: number | null | undefined
			maxThinkingTokens?: number | null | undefined
			supportsImages?: boolean | undefined
			supportsComputerUse?: boolean | undefined
			promptCacheRetention?: "in_memory" | "24h" | undefined
			supportsVerbosity?: boolean | undefined
			supportsReasoningBudget?: boolean | undefined
			supportsReasoningBinary?: boolean | undefined
			supportsTemperature?: boolean | undefined
			defaultTemperature?: number | undefined
			requiredReasoningBudget?: boolean | undefined
			supportsReasoningEffort?:
				| boolean
				| ("low" | "medium" | "high" | "minimal" | "none" | "disable")[]
				| undefined
			requiredReasoningEffort?: boolean | undefined
			preserveReasoning?: boolean | undefined
			supportedParameters?: ("reasoning" | "max_tokens" | "temperature" | "include_reasoning")[] | undefined
			inputPrice?: number | undefined
			outputPrice?: number | undefined
			cacheWritesPrice?: number | undefined
			cacheReadsPrice?: number | undefined
			description?: string | undefined
			reasoningEffort?: "low" | "medium" | "high" | "minimal" | "none" | undefined
			minTokensPerCachePoint?: number | undefined
			maxCachePoints?: number | undefined
			cachableFields?: string[] | undefined
			displayName?: string | null | undefined
			preferredIndex?: number | null | undefined
			deprecated?: boolean | undefined
			isFree?: boolean | undefined
			supportsNativeTools?: boolean | undefined
			tiers?:
				| {
						contextWindow: number
						name?: "default" | "flex" | "priority" | undefined
						inputPrice?: number | undefined
						outputPrice?: number | undefined
						cacheWritesPrice?: number | undefined
						cacheReadsPrice?: number | undefined
				  }[]
				| undefined
		}
		topP: number | undefined
	}
	fetchModel(): Promise<{
		format: "openrouter"
		reasoning: import("../transform/reasoning").OpenRouterReasoningParams | undefined
		maxTokens: number | undefined
		temperature: number | undefined
		reasoningEffort:
			| import("@roo-code/types", { with: { "resolution-mode": "import" } }).ReasoningEffortExtended
			| undefined
		reasoningBudget: number | undefined
		verbosity: import("@roo-code/types", { with: { "resolution-mode": "import" } }).VerbosityLevel | undefined
		id: string
		info: {
			contextWindow: number
			supportsPromptCache: boolean
			maxTokens?: number | null | undefined
			maxThinkingTokens?: number | null | undefined
			supportsImages?: boolean | undefined
			supportsComputerUse?: boolean | undefined
			promptCacheRetention?: "in_memory" | "24h" | undefined
			supportsVerbosity?: boolean | undefined
			supportsReasoningBudget?: boolean | undefined
			supportsReasoningBinary?: boolean | undefined
			supportsTemperature?: boolean | undefined
			defaultTemperature?: number | undefined
			requiredReasoningBudget?: boolean | undefined
			supportsReasoningEffort?:
				| boolean
				| ("low" | "medium" | "high" | "minimal" | "none" | "disable")[]
				| undefined
			requiredReasoningEffort?: boolean | undefined
			preserveReasoning?: boolean | undefined
			supportedParameters?: ("reasoning" | "max_tokens" | "temperature" | "include_reasoning")[] | undefined
			inputPrice?: number | undefined
			outputPrice?: number | undefined
			cacheWritesPrice?: number | undefined
			cacheReadsPrice?: number | undefined
			description?: string | undefined
			reasoningEffort?: "low" | "medium" | "high" | "minimal" | "none" | undefined
			minTokensPerCachePoint?: number | undefined
			maxCachePoints?: number | undefined
			cachableFields?: string[] | undefined
			displayName?: string | null | undefined
			preferredIndex?: number | null | undefined
			deprecated?: boolean | undefined
			isFree?: boolean | undefined
			supportsNativeTools?: boolean | undefined
			tiers?:
				| {
						contextWindow: number
						name?: "default" | "flex" | "priority" | undefined
						inputPrice?: number | undefined
						outputPrice?: number | undefined
						cacheWritesPrice?: number | undefined
						cacheReadsPrice?: number | undefined
				  }[]
				| undefined
		}
		topP: number | undefined
	}>
	supportsFim(): boolean
	completeFim(prefix: string, suffix: string, taskId?: string): Promise<string>
	streamFim(
		prefix: string,
		suffix: string,
		taskId?: string,
		onUsage?: (usage: CompletionUsage) => void,
	): AsyncGenerator<string>
}
//# sourceMappingURL=kilocode-openrouter.d.ts.map
