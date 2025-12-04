import { Anthropic } from "@anthropic-ai/sdk"
import type { ApiHandlerOptions, ModelRecord } from "../../shared/api"
import type { ApiHandlerCreateMessageMetadata } from "../index"
import { ApiStreamChunk } from "../transform/stream"
import { BaseProvider } from "./base-provider"
import type { SingleCompletionHandler } from "../index"
export declare class NanoGptHandler extends BaseProvider implements SingleCompletionHandler {
	protected options: ApiHandlerOptions
	private client
	protected models: ModelRecord
	protected get providerName(): string
	constructor(options: ApiHandlerOptions)
	createMessage(
		systemPrompt: string,
		messages: Anthropic.Messages.MessageParam[],
		metadata?: ApiHandlerCreateMessageMetadata,
	): AsyncGenerator<ApiStreamChunk>
	fetchModel(): Promise<{
		format: "openai"
		reasoning: import("../transform/reasoning").OpenAiReasoningParams | undefined
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
	}>
	getModel(): {
		format: "openai"
		reasoning: import("../transform/reasoning").OpenAiReasoningParams | undefined
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
	}
	completePrompt(prompt: string): Promise<string>
}
//# sourceMappingURL=nano-gpt.d.ts.map
