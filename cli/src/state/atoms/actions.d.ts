/**
 * Action atoms for service interaction
 * These atoms provide high-level actions for interacting with the ExtensionService
 */
import type { ClineAskResponse } from "../../types/messages.js"
/**
 * Action atom to send a webview message to the extension
 * This is the primary way to communicate with the extension
 */
export declare const sendWebviewMessageAtom: import("jotai").WritableAtom<
	null,
	[message: WebviewMessage],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to send a new task to the extension
 */
export declare const sendTaskAtom: import("jotai").WritableAtom<
	null,
	[
		params: {
			text: string
			images?: string[]
			mode?: string
		},
	],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to send an ask response to the extension
 */
export declare const sendAskResponseAtom: import("jotai").WritableAtom<
	null,
	[
		params: {
			response?: ClineAskResponse
			action?: string
			text?: string
			images?: string[]
		},
	],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to request router models from the extension
 */
export declare const requestRouterModelsAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to clear the current task
 */
export declare const clearTaskAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to cancel the current task
 */
export declare const cancelTaskAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to resume a task
 */
export declare const resumeTaskAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to switch modes
 */
export declare const switchModeAtom: import("jotai").WritableAtom<null, [mode: string], Promise<void>> & {
	init: null
}
/**
 * Action atom to approve or reject a tool use
 */
export declare const respondToToolAtom: import("jotai").WritableAtom<
	null,
	[
		params: {
			response: "yesButtonClicked" | "noButtonClicked"
			text?: string
			images?: string[]
		},
	],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to send API configuration
 */
export declare const sendApiConfigurationAtom: import("jotai").WritableAtom<
	null,
	[
		apiConfiguration: {
			reasoningEffort?: "low" | "medium" | "high" | "minimal" | "none" | "disable" | undefined
			codebaseIndexOpenAiCompatibleBaseUrl?: string | undefined
			codebaseIndexOpenAiCompatibleModelDimension?: number | undefined
			codeIndexOpenAiKey?: string | undefined
			codeIndexQdrantApiKey?: string | undefined
			codebaseIndexOpenAiCompatibleApiKey?: string | undefined
			codebaseIndexGeminiApiKey?: string | undefined
			codebaseIndexMistralApiKey?: string | undefined
			codebaseIndexVercelAiGatewayApiKey?: string | undefined
			codebaseIndexOpenRouterApiKey?: string | undefined
			apiProvider?:
				| "kilocode"
				| "openrouter"
				| "openai"
				| "anthropic"
				| "ollama"
				| "gemini"
				| "mistral"
				| "vercel-ai-gateway"
				| "huggingface"
				| "litellm"
				| "ovhcloud"
				| "inception"
				| "synthetic"
				| "sap-ai-core"
				| "deepinfra"
				| "io-intelligence"
				| "requesty"
				| "unbound"
				| "glama"
				| "roo"
				| "chutes"
				| "nano-gpt"
				| "lmstudio"
				| "vscode-lm"
				| "fake-ai"
				| "human-relay"
				| "bedrock"
				| "cerebras"
				| "claude-code"
				| "doubao"
				| "deepseek"
				| "featherless"
				| "fireworks"
				| "gemini-cli"
				| "groq"
				| "moonshot"
				| "minimax"
				| "openai-native"
				| "qwen-code"
				| "virtual-quota-fallback"
				| "sambanova"
				| "vertex"
				| "xai"
				| "zai"
				| undefined
			profileType?: "chat" | "autocomplete" | undefined
			includeMaxTokens?: boolean | undefined
			diffEnabled?: boolean | undefined
			todoListEnabled?: boolean | undefined
			fuzzyMatchThreshold?: number | undefined
			modelTemperature?: number | null | undefined
			rateLimitSeconds?: number | undefined
			rateLimitAfter?: boolean | undefined
			consecutiveMistakeLimit?: number | undefined
			enableReasoningEffort?: boolean | undefined
			modelMaxTokens?: number | undefined
			modelMaxThinkingTokens?: number | undefined
			verbosity?: "low" | "medium" | "high" | undefined
			toolStyle?: "xml" | "json" | undefined
			apiModelId?: string | undefined
			apiKey?: string | undefined
			anthropicBaseUrl?: string | undefined
			anthropicUseAuthToken?: boolean | undefined
			anthropicDeploymentName?: string | undefined
			anthropicBeta1MContext?: boolean | undefined
			claudeCodePath?: string | undefined
			claudeCodeMaxOutputTokens?: number | undefined
			glamaModelId?: string | undefined
			glamaApiKey?: string | undefined
			nanoGptApiKey?: string | undefined
			nanoGptModelId?: string | undefined
			nanoGptModelList?: "all" | "personalized" | "subscription" | undefined
			openRouterApiKey?: string | undefined
			openRouterModelId?: string | undefined
			openRouterBaseUrl?: string | undefined
			openRouterSpecificProvider?: string | undefined
			openRouterUseMiddleOutTransform?: boolean | undefined
			openRouterProviderDataCollection?: "allow" | "deny" | undefined
			openRouterProviderSort?: "price" | "throughput" | "latency" | undefined
			openRouterZdr?: boolean | undefined
			awsAccessKey?: string | undefined
			awsSecretKey?: string | undefined
			awsSessionToken?: string | undefined
			awsRegion?: string | undefined
			awsUseCrossRegionInference?: boolean | undefined
			awsUseGlobalInference?: boolean | undefined
			awsUsePromptCache?: boolean | undefined
			awsProfile?: string | undefined
			awsUseProfile?: boolean | undefined
			awsApiKey?: string | undefined
			awsUseApiKey?: boolean | undefined
			awsCustomArn?: string | undefined
			awsModelContextWindow?: number | undefined
			awsBedrockEndpointEnabled?: boolean | undefined
			awsBedrockEndpoint?: string | undefined
			awsBedrock1MContext?: boolean | undefined
			vertexKeyFile?: string | undefined
			vertexJsonCredentials?: string | undefined
			vertexProjectId?: string | undefined
			vertexRegion?: string | undefined
			enableUrlContext?: boolean | undefined
			enableGrounding?: boolean | undefined
			openAiBaseUrl?: string | undefined
			openAiApiKey?: string | undefined
			openAiLegacyFormat?: boolean | undefined
			openAiR1FormatEnabled?: boolean | undefined
			openAiModelId?: string | undefined
			openAiCustomModelInfo?:
				| {
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
						supportedParameters?:
							| ("reasoning" | "max_tokens" | "temperature" | "include_reasoning")[]
							| undefined
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
				| null
				| undefined
			openAiUseAzure?: boolean | undefined
			azureApiVersion?: string | undefined
			openAiStreamingEnabled?: boolean | undefined
			openAiHostHeader?: string | undefined
			openAiHeaders?: Record<string, string> | undefined
			ollamaModelId?: string | undefined
			ollamaBaseUrl?: string | undefined
			ollamaApiKey?: string | undefined
			ollamaNumCtx?: number | undefined
			vsCodeLmModelSelector?:
				| {
						id?: string | undefined
						family?: string | undefined
						version?: string | undefined
						vendor?: string | undefined
				  }
				| undefined
			lmStudioModelId?: string | undefined
			lmStudioBaseUrl?: string | undefined
			lmStudioDraftModelId?: string | undefined
			lmStudioSpeculativeDecodingEnabled?: boolean | undefined
			geminiApiKey?: string | undefined
			googleGeminiBaseUrl?: string | undefined
			geminiCliOAuthPath?: string | undefined
			geminiCliProjectId?: string | undefined
			openAiNativeApiKey?: string | undefined
			openAiNativeBaseUrl?: string | undefined
			openAiNativeServiceTier?: "default" | "flex" | "priority" | undefined
			mistralApiKey?: string | undefined
			mistralCodestralUrl?: string | undefined
			deepSeekBaseUrl?: string | undefined
			deepSeekApiKey?: string | undefined
			deepInfraBaseUrl?: string | undefined
			deepInfraApiKey?: string | undefined
			deepInfraModelId?: string | undefined
			doubaoBaseUrl?: string | undefined
			doubaoApiKey?: string | undefined
			moonshotBaseUrl?: "https://api.moonshot.ai/v1" | "https://api.moonshot.cn/v1" | undefined
			moonshotApiKey?: string | undefined
			minimaxBaseUrl?: "https://api.minimax.io/anthropic" | "https://api.minimaxi.com/anthropic" | undefined
			minimaxApiKey?: string | undefined
			unboundApiKey?: string | undefined
			unboundModelId?: string | undefined
			requestyBaseUrl?: string | undefined
			requestyApiKey?: string | undefined
			requestyModelId?: string | undefined
			fakeAi?: unknown
			xaiApiKey?: string | undefined
			groqApiKey?: string | undefined
			huggingFaceApiKey?: string | undefined
			huggingFaceModelId?: string | undefined
			huggingFaceInferenceProvider?: string | undefined
			chutesApiKey?: string | undefined
			litellmBaseUrl?: string | undefined
			litellmApiKey?: string | undefined
			litellmModelId?: string | undefined
			litellmUsePromptCache?: boolean | undefined
			cerebrasApiKey?: string | undefined
			sambaNovaApiKey?: string | undefined
			inceptionLabsBaseUrl?: string | undefined
			inceptionLabsApiKey?: string | undefined
			inceptionLabsModelId?: string | undefined
			ovhCloudAiEndpointsApiKey?: string | undefined
			ovhCloudAiEndpointsModelId?: string | undefined
			ovhCloudAiEndpointsBaseUrl?: string | undefined
			kilocodeToken?: string | undefined
			kilocodeOrganizationId?: string | undefined
			kilocodeModel?: string | undefined
			kilocodeTesterWarningsDisabledUntil?: number | undefined
			profiles?:
				| {
						profileName?: string | undefined
						profileId?: string | undefined
						profileLimits?:
							| {
									tokensPerMinute?: number | undefined
									tokensPerHour?: number | undefined
									tokensPerDay?: number | undefined
									requestsPerMinute?: number | undefined
									requestsPerHour?: number | undefined
									requestsPerDay?: number | undefined
							  }
							| undefined
				  }[]
				| undefined
			zaiApiKey?: string | undefined
			zaiApiLine?: "international_coding" | "china_coding" | undefined
			fireworksApiKey?: string | undefined
			syntheticApiKey?: string | undefined
			featherlessApiKey?: string | undefined
			ioIntelligenceModelId?: string | undefined
			ioIntelligenceApiKey?: string | undefined
			qwenCodeOauthPath?: string | undefined
			vercelAiGatewayApiKey?: string | undefined
			vercelAiGatewayModelId?: string | undefined
			sapAiCoreServiceKey?: string | undefined
			sapAiCoreResourceGroup?: string | undefined
			sapAiCoreUseOrchestration?: boolean | undefined
			sapAiCoreModelId?: string | undefined
			sapAiCoreDeploymentId?: string | undefined
			sapAiCoreCustomModelInfo?:
				| {
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
						supportedParameters?:
							| ("reasoning" | "max_tokens" | "temperature" | "include_reasoning")[]
							| undefined
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
				| null
				| undefined
		},
	],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to send custom instructions
 */
export declare const sendCustomInstructionsAtom: import("jotai").WritableAtom<
	null,
	[instructions: string],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to send always allow settings
 */
export declare const sendAlwaysAllowAtom: import("jotai").WritableAtom<null, [alwaysAllow: boolean], Promise<void>> & {
	init: null
}
/**
 * Action atom to open a file in the editorMcp
 */
export declare const openFileAtom: import("jotai").WritableAtom<null, [filePath: string], Promise<void>> & {
	init: null
}
/**
 * Action atom to open the settings
 */
export declare const openSettingsAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to refresh the extension state
 */
export declare const refreshStateAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to send a primary button click
 */
export declare const sendPrimaryButtonClickAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to send a secondary button click
 */
export declare const sendSecondaryButtonClickAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
//# sourceMappingURL=actions.d.ts.map
