import type { Anthropic } from "@anthropic-ai/sdk"
import type { ApiHandlerOptions } from "../../shared/api"
import type { ApiStream } from "../transform/stream"
import type { SingleCompletionHandler, ApiHandlerCreateMessageMetadata } from "../index"
import { BaseProvider } from "./base-provider"
export declare class GeminiCliHandler extends BaseProvider implements SingleCompletionHandler {
	protected options: ApiHandlerOptions
	private authClient
	private projectId
	private credentials
	private oauthClientId
	private oauthClientSecret
	constructor(options: ApiHandlerOptions)
	private fetchOAuthConfig
	private loadOAuthCredentials
	private ensureAuthenticated
	/**
	 * Call a Code Assist API endpoint
	 */
	private callEndpoint
	/**
	 * Discover or retrieve the project ID
	 */
	private discoverProjectId
	/**
	 * Parse Server-Sent Events from a stream
	 */
	private parseSSEStream
	createMessage(
		systemInstruction: string,
		messages: Anthropic.Messages.MessageParam[],
		metadata?: ApiHandlerCreateMessageMetadata,
	): ApiStream
	getModel(): {
		format: "gemini"
		reasoning: import("../transform/reasoning").GeminiReasoningParams | undefined
		maxTokens: number | undefined
		temperature: number | undefined
		reasoningEffort:
			| import("@roo-code/types", { with: { "resolution-mode": "import" } }).ReasoningEffortExtended
			| undefined
		reasoningBudget: number | undefined
		verbosity: import("@roo-code/types", { with: { "resolution-mode": "import" } }).VerbosityLevel | undefined
		id: "gemini-3-pro-preview" | "gemini-2.5-flash" | "gemini-2.5-pro"
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
	countTokens(content: Array<Anthropic.Messages.ContentBlockParam>): Promise<number>
}
//# sourceMappingURL=gemini-cli.d.ts.map
