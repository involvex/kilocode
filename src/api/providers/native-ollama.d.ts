import { Anthropic } from "@anthropic-ai/sdk"
import { ModelInfo } from "@roo-code/types"
import { ApiStream } from "../transform/stream"
import { BaseProvider } from "./base-provider"
import type { ApiHandlerOptions } from "../../shared/api"
import type { SingleCompletionHandler, ApiHandlerCreateMessageMetadata } from "../index"
export declare class NativeOllamaHandler extends BaseProvider implements SingleCompletionHandler {
	protected options: ApiHandlerOptions
	private client
	protected models: Record<string, ModelInfo>
	private isInitialized
	constructor(options: ApiHandlerOptions)
	private initialize
	private ensureClient
	createMessage(
		systemPrompt: string,
		messages: Anthropic.Messages.MessageParam[],
		metadata?: ApiHandlerCreateMessageMetadata,
	): ApiStream
	fetchModel(): Promise<
		Record<
			string,
			{
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
		>
	>
	getModel(): {
		id: string
		info: ModelInfo
	}
	completePrompt(prompt: string): Promise<string>
}
//# sourceMappingURL=native-ollama.d.ts.map
