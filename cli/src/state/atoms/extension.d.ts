/**
 * Extension state atoms for managing ExtensionState and related data
 */
import type { ExtensionState, RouterModels } from "../../types/messages.js"
/**
 * Atom to hold the complete ExtensionState
 * This is the primary state object received from the extension
 */
export declare const extensionStateAtom: import("jotai").PrimitiveAtom<ExtensionState | null> & {
	init: ExtensionState | null
}
/**
 * Atom to hold the message history (chatMessages)
 * Extracted from ExtensionState for easier access
 */
export declare const chatMessagesAtom: import("jotai").PrimitiveAtom<
	{
		type: "ask" | "say"
		ts: number
		text?: string | undefined
		reasoning?: string | undefined
		ask?:
			| "followup"
			| "command"
			| "command_output"
			| "completion_result"
			| "tool"
			| "api_req_failed"
			| "resume_task"
			| "resume_completed_task"
			| "mistake_limit_reached"
			| "browser_action_launch"
			| "use_mcp_server"
			| "auto_approval_max_req_reached"
			| "payment_required_prompt"
			| "invalid_model"
			| "report_bug"
			| "condense"
			| "checkpoint_restore"
			| undefined
		say?:
			| "command_output"
			| "completion_result"
			| "error"
			| "api_req_started"
			| "api_req_finished"
			| "api_req_retried"
			| "api_req_retry_delayed"
			| "api_req_deleted"
			| "text"
			| "image"
			| "reasoning"
			| "user_feedback"
			| "user_feedback_diff"
			| "shell_integration_warning"
			| "browser_action"
			| "browser_action_result"
			| "mcp_server_request_started"
			| "mcp_server_response"
			| "subtask_result"
			| "checkpoint_saved"
			| "rooignore_error"
			| "diff_error"
			| "condense_context"
			| "condense_context_error"
			| "codebase_search_result"
			| "user_edit_todos"
			| undefined
		images?: string[] | undefined
		partial?: boolean | undefined
		conversationHistoryIndex?: number | undefined
		checkpoint?: Record<string, unknown> | undefined
		progressStatus?:
			| {
					text?: string | undefined
					icon?: string | undefined
			  }
			| undefined
		contextCondense?:
			| {
					cost: number
					prevContextTokens: number
					newContextTokens: number
					summary: string
			  }
			| undefined
		isProtected?: boolean | undefined
		apiProtocol?: "openai" | "anthropic" | undefined
		isAnswered?: boolean | undefined
		metadata?:
			| {
					kiloCode?:
						| {
								commitRange?:
									| {
											from: string
											to: string
											fromTimeStamp?: number | undefined
									  }
									| undefined
						  }
						| undefined
			  }
			| undefined
	}[]
> & {
	init: {
		type: "ask" | "say"
		ts: number
		text?: string | undefined
		reasoning?: string | undefined
		ask?:
			| "followup"
			| "command"
			| "command_output"
			| "completion_result"
			| "tool"
			| "api_req_failed"
			| "resume_task"
			| "resume_completed_task"
			| "mistake_limit_reached"
			| "browser_action_launch"
			| "use_mcp_server"
			| "auto_approval_max_req_reached"
			| "payment_required_prompt"
			| "invalid_model"
			| "report_bug"
			| "condense"
			| "checkpoint_restore"
			| undefined
		say?:
			| "command_output"
			| "completion_result"
			| "error"
			| "api_req_started"
			| "api_req_finished"
			| "api_req_retried"
			| "api_req_retry_delayed"
			| "api_req_deleted"
			| "text"
			| "image"
			| "reasoning"
			| "user_feedback"
			| "user_feedback_diff"
			| "shell_integration_warning"
			| "browser_action"
			| "browser_action_result"
			| "mcp_server_request_started"
			| "mcp_server_response"
			| "subtask_result"
			| "checkpoint_saved"
			| "rooignore_error"
			| "diff_error"
			| "condense_context"
			| "condense_context_error"
			| "codebase_search_result"
			| "user_edit_todos"
			| undefined
		images?: string[] | undefined
		partial?: boolean | undefined
		conversationHistoryIndex?: number | undefined
		checkpoint?: Record<string, unknown> | undefined
		progressStatus?:
			| {
					text?: string | undefined
					icon?: string | undefined
			  }
			| undefined
		contextCondense?:
			| {
					cost: number
					prevContextTokens: number
					newContextTokens: number
					summary: string
			  }
			| undefined
		isProtected?: boolean | undefined
		apiProtocol?: "openai" | "anthropic" | undefined
		isAnswered?: boolean | undefined
		metadata?:
			| {
					kiloCode?:
						| {
								commitRange?:
									| {
											from: string
											to: string
											fromTimeStamp?: number | undefined
									  }
									| undefined
						  }
						| undefined
			  }
			| undefined
	}[]
}
/**
 * Atom to track message versions (content length) for reconciliation
 * Maps message timestamp to content length to determine which version is newer
 */
export declare const messageVersionMapAtom: import("jotai").PrimitiveAtom<Map<number, number>> & {
	init: Map<number, number>
}
/**
 * Atom to track actively streaming messages
 * Messages in this set are protected from being overwritten by state updates
 */
export declare const streamingMessagesSetAtom: import("jotai").PrimitiveAtom<Set<number>> & {
	init: Set<number>
}
/**
 * Atom to hold the current task item
 */
export declare const currentTaskAtom: import("jotai").PrimitiveAtom<{
	number: number
	ts: number
	totalCost: number
	id: string
	task: string
	tokensIn: number
	tokensOut: number
	rootTaskId?: string | undefined
	parentTaskId?: string | undefined
	cacheWrites?: number | undefined
	cacheReads?: number | undefined
	size?: number | undefined
	workspace?: string | undefined
	isFavorited?: boolean | undefined
	fileNotfound?: boolean | undefined
	mode?: string | undefined
} | null> & {
	init: {
		number: number
		ts: number
		totalCost: number
		id: string
		task: string
		tokensIn: number
		tokensOut: number
		rootTaskId?: string | undefined
		parentTaskId?: string | undefined
		cacheWrites?: number | undefined
		cacheReads?: number | undefined
		size?: number | undefined
		workspace?: string | undefined
		isFavorited?: boolean | undefined
		fileNotfound?: boolean | undefined
		mode?: string | undefined
	} | null
}
/**
 * Atom to hold the current task's todo list
 */
export declare const taskTodosAtom: import("jotai").PrimitiveAtom<
	{
		status: "completed" | "pending" | "in_progress"
		id: string
		content: string
	}[]
> & {
	init: {
		status: "completed" | "pending" | "in_progress"
		id: string
		content: string
	}[]
}
/**
 * Atom to hold available router models
 */
export declare const routerModelsAtom: import("jotai").PrimitiveAtom<RouterModels | null> & {
	init: RouterModels | null
}
/**
 * Atom to hold the current API configuration
 */
export declare const apiConfigurationAtom: import("jotai").PrimitiveAtom<{
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
		| null
		| undefined
} | null> & {
	init: {
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
	} | null
}
/**
 * Atom to hold the current mode
 */
export declare const extensionModeAtom: import("jotai").PrimitiveAtom<string> & {
	init: string
}
/**
 * Atom to hold custom modes
 */
export declare const customModesAtom: import("jotai").PrimitiveAtom<
	{
		name: string
		slug: string
		roleDefinition: string
		groups: (
			| "command"
			| "read"
			| "edit"
			| "browser"
			| "mcp"
			| "modes"
			| [
					"command" | "read" | "edit" | "browser" | "mcp" | "modes",
					{
						description?: string | undefined
						fileRegex?: string | undefined
					},
			  ]
		)[]
		description?: string | undefined
		whenToUse?: string | undefined
		customInstructions?: string | undefined
		source?: "global" | "project" | "organization" | undefined
		iconName?: string | undefined
	}[]
> & {
	init: {
		name: string
		slug: string
		roleDefinition: string
		groups: (
			| "command"
			| "read"
			| "edit"
			| "browser"
			| "mcp"
			| "modes"
			| [
					"command" | "read" | "edit" | "browser" | "mcp" | "modes",
					{
						description?: string | undefined
						fileRegex?: string | undefined
					},
			  ]
		)[]
		description?: string | undefined
		whenToUse?: string | undefined
		customInstructions?: string | undefined
		source?: "global" | "project" | "organization" | undefined
		iconName?: string | undefined
	}[]
}
/**
 * Atom to hold MCP servers configuration
 */
export declare const mcpServersAtom: import("jotai").PrimitiveAtom<McpServer[]> & {
	init: McpServer[]
}
/**
 * Atom to hold the current working directory
 */
export declare const cwdAtom: import("jotai").PrimitiveAtom<string | null> & {
	init: string | null
}
/**
 * Atom to track if we're in parallel mode
 */
export declare const isParallelModeAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Derived atom to get the extension version
 */
export declare const extensionVersionAtom: import("jotai").Atom<string>
/**
 * Derived atom to get the current API config name
 */
export declare const currentApiConfigNameAtom: import("jotai").Atom<string | null>
/**
 * Derived atom to get the list of API config metadata
 */
export declare const listApiConfigMetaAtom: import("jotai").Atom<
	{
		id: string
		name: string
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
		modelId?: string | undefined
		profileType?: "chat" | "autocomplete" | undefined
	}[]
>
/**
 * Derived atom to get task history length
 */
export declare const taskHistoryLengthAtom: import("jotai").Atom<number>
/**
 * Derived atom to get the render context
 */
export declare const renderContextAtom: import("jotai").Atom<"sidebar" | "editor" | "cli">
/**
 * Derived atom to check if there are any messages
 */
export declare const hasChatMessagesAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get the last message
 */
export declare const lastChatMessageAtom: import("jotai").Atom<{
	type: "ask" | "say"
	ts: number
	text?: string | undefined
	reasoning?: string | undefined
	ask?:
		| "followup"
		| "command"
		| "command_output"
		| "completion_result"
		| "tool"
		| "api_req_failed"
		| "resume_task"
		| "resume_completed_task"
		| "mistake_limit_reached"
		| "browser_action_launch"
		| "use_mcp_server"
		| "auto_approval_max_req_reached"
		| "payment_required_prompt"
		| "invalid_model"
		| "report_bug"
		| "condense"
		| "checkpoint_restore"
		| undefined
	say?:
		| "command_output"
		| "completion_result"
		| "error"
		| "api_req_started"
		| "api_req_finished"
		| "api_req_retried"
		| "api_req_retry_delayed"
		| "api_req_deleted"
		| "text"
		| "image"
		| "reasoning"
		| "user_feedback"
		| "user_feedback_diff"
		| "shell_integration_warning"
		| "browser_action"
		| "browser_action_result"
		| "mcp_server_request_started"
		| "mcp_server_response"
		| "subtask_result"
		| "checkpoint_saved"
		| "rooignore_error"
		| "diff_error"
		| "condense_context"
		| "condense_context_error"
		| "codebase_search_result"
		| "user_edit_todos"
		| undefined
	images?: string[] | undefined
	partial?: boolean | undefined
	conversationHistoryIndex?: number | undefined
	checkpoint?: Record<string, unknown> | undefined
	progressStatus?:
		| {
				text?: string | undefined
				icon?: string | undefined
		  }
		| undefined
	contextCondense?:
		| {
				cost: number
				prevContextTokens: number
				newContextTokens: number
				summary: string
		  }
		| undefined
	isProtected?: boolean | undefined
	apiProtocol?: "openai" | "anthropic" | undefined
	isAnswered?: boolean | undefined
	metadata?:
		| {
				kiloCode?:
					| {
							commitRange?:
								| {
										from: string
										to: string
										fromTimeStamp?: number | undefined
								  }
								| undefined
					  }
					| undefined
		  }
		| undefined
} | null>
/**
 * Derived atom to check if there's an active task
 */
export declare const hasActiveTaskAtom: import("jotai").Atom<boolean>
/**
 * Atom to track if the task was resumed via --continue flag
 * Prevents showing "Task ready to resume" message when already resumed
 */
export declare const taskResumedViaContinueOrSessionAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Derived atom to check if there's a resume_task ask pending
 * This checks if the last message is a resume_task or resume_completed_task
 * But doesn't show the message if the task was already resumed via --continue
 */
export declare const hasResumeTaskAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get pending todos count
 */
export declare const pendingTodosCountAtom: import("jotai").Atom<number>
/**
 * Derived atom to get completed todos count
 */
export declare const completedTodosCountAtom: import("jotai").Atom<number>
/**
 * Derived atom to get in-progress todos count
 */
export declare const inProgressTodosCountAtom: import("jotai").Atom<number>
/**
 * Action atom to update the complete extension state
 * This syncs all derived atoms with the new state
 * Uses intelligent message reconciliation to prevent flickering during streaming
 */
export declare const updateExtensionStateAtom: import("jotai").WritableAtom<
	null,
	[state: ExtensionState | null],
	void
> & {
	init: null
}
/**
 * Action atom to update only the messages
 * Useful for incremental message updates
 */
export declare const updateChatMessagesAtom: import("jotai").WritableAtom<
	null,
	[
		messages: {
			type: "ask" | "say"
			ts: number
			text?: string | undefined
			reasoning?: string | undefined
			ask?:
				| "followup"
				| "command"
				| "command_output"
				| "completion_result"
				| "tool"
				| "api_req_failed"
				| "resume_task"
				| "resume_completed_task"
				| "mistake_limit_reached"
				| "browser_action_launch"
				| "use_mcp_server"
				| "auto_approval_max_req_reached"
				| "payment_required_prompt"
				| "invalid_model"
				| "report_bug"
				| "condense"
				| "checkpoint_restore"
				| undefined
			say?:
				| "command_output"
				| "completion_result"
				| "error"
				| "api_req_started"
				| "api_req_finished"
				| "api_req_retried"
				| "api_req_retry_delayed"
				| "api_req_deleted"
				| "text"
				| "image"
				| "reasoning"
				| "user_feedback"
				| "user_feedback_diff"
				| "shell_integration_warning"
				| "browser_action"
				| "browser_action_result"
				| "mcp_server_request_started"
				| "mcp_server_response"
				| "subtask_result"
				| "checkpoint_saved"
				| "rooignore_error"
				| "diff_error"
				| "condense_context"
				| "condense_context_error"
				| "codebase_search_result"
				| "user_edit_todos"
				| undefined
			images?: string[] | undefined
			partial?: boolean | undefined
			conversationHistoryIndex?: number | undefined
			checkpoint?: Record<string, unknown> | undefined
			progressStatus?:
				| {
						text?: string | undefined
						icon?: string | undefined
				  }
				| undefined
			contextCondense?:
				| {
						cost: number
						prevContextTokens: number
						newContextTokens: number
						summary: string
				  }
				| undefined
			isProtected?: boolean | undefined
			apiProtocol?: "openai" | "anthropic" | undefined
			isAnswered?: boolean | undefined
			metadata?:
				| {
						kiloCode?:
							| {
									commitRange?:
										| {
												from: string
												to: string
												fromTimeStamp?: number | undefined
										  }
										| undefined
							  }
							| undefined
				  }
				| undefined
		}[],
	],
	void
> & {
	init: null
}
/**
 * Action atom to add a single message
 */
export declare const addChatMessageAtom: import("jotai").WritableAtom<
	null,
	[
		message: {
			type: "ask" | "say"
			ts: number
			text?: string | undefined
			reasoning?: string | undefined
			ask?:
				| "followup"
				| "command"
				| "command_output"
				| "completion_result"
				| "tool"
				| "api_req_failed"
				| "resume_task"
				| "resume_completed_task"
				| "mistake_limit_reached"
				| "browser_action_launch"
				| "use_mcp_server"
				| "auto_approval_max_req_reached"
				| "payment_required_prompt"
				| "invalid_model"
				| "report_bug"
				| "condense"
				| "checkpoint_restore"
				| undefined
			say?:
				| "command_output"
				| "completion_result"
				| "error"
				| "api_req_started"
				| "api_req_finished"
				| "api_req_retried"
				| "api_req_retry_delayed"
				| "api_req_deleted"
				| "text"
				| "image"
				| "reasoning"
				| "user_feedback"
				| "user_feedback_diff"
				| "shell_integration_warning"
				| "browser_action"
				| "browser_action_result"
				| "mcp_server_request_started"
				| "mcp_server_response"
				| "subtask_result"
				| "checkpoint_saved"
				| "rooignore_error"
				| "diff_error"
				| "condense_context"
				| "condense_context_error"
				| "codebase_search_result"
				| "user_edit_todos"
				| undefined
			images?: string[] | undefined
			partial?: boolean | undefined
			conversationHistoryIndex?: number | undefined
			checkpoint?: Record<string, unknown> | undefined
			progressStatus?:
				| {
						text?: string | undefined
						icon?: string | undefined
				  }
				| undefined
			contextCondense?:
				| {
						cost: number
						prevContextTokens: number
						newContextTokens: number
						summary: string
				  }
				| undefined
			isProtected?: boolean | undefined
			apiProtocol?: "openai" | "anthropic" | undefined
			isAnswered?: boolean | undefined
			metadata?:
				| {
						kiloCode?:
							| {
									commitRange?:
										| {
												from: string
												to: string
												fromTimeStamp?: number | undefined
										  }
										| undefined
							  }
							| undefined
				  }
				| undefined
		},
	],
	void
> & {
	init: null
}
/**
 * Action atom to update a single message by timestamp
 * Used for incremental message updates during streaming
 *
 * Simplified version that trusts state as source of truth:
 * - Only updates messages that already exist in state
 * - Ignores updates for non-existent messages (they'll come via state update)
 * - Always updates partial messages to show streaming progress
 * - Only updates complete messages if they have more content
 */
export declare const updateChatMessageByTsAtom: import("jotai").WritableAtom<
	null,
	[
		updatedMessage: {
			type: "ask" | "say"
			ts: number
			text?: string | undefined
			reasoning?: string | undefined
			ask?:
				| "followup"
				| "command"
				| "command_output"
				| "completion_result"
				| "tool"
				| "api_req_failed"
				| "resume_task"
				| "resume_completed_task"
				| "mistake_limit_reached"
				| "browser_action_launch"
				| "use_mcp_server"
				| "auto_approval_max_req_reached"
				| "payment_required_prompt"
				| "invalid_model"
				| "report_bug"
				| "condense"
				| "checkpoint_restore"
				| undefined
			say?:
				| "command_output"
				| "completion_result"
				| "error"
				| "api_req_started"
				| "api_req_finished"
				| "api_req_retried"
				| "api_req_retry_delayed"
				| "api_req_deleted"
				| "text"
				| "image"
				| "reasoning"
				| "user_feedback"
				| "user_feedback_diff"
				| "shell_integration_warning"
				| "browser_action"
				| "browser_action_result"
				| "mcp_server_request_started"
				| "mcp_server_response"
				| "subtask_result"
				| "checkpoint_saved"
				| "rooignore_error"
				| "diff_error"
				| "condense_context"
				| "condense_context_error"
				| "codebase_search_result"
				| "user_edit_todos"
				| undefined
			images?: string[] | undefined
			partial?: boolean | undefined
			conversationHistoryIndex?: number | undefined
			checkpoint?: Record<string, unknown> | undefined
			progressStatus?:
				| {
						text?: string | undefined
						icon?: string | undefined
				  }
				| undefined
			contextCondense?:
				| {
						cost: number
						prevContextTokens: number
						newContextTokens: number
						summary: string
				  }
				| undefined
			isProtected?: boolean | undefined
			apiProtocol?: "openai" | "anthropic" | undefined
			isAnswered?: boolean | undefined
			metadata?:
				| {
						kiloCode?:
							| {
									commitRange?:
										| {
												from: string
												to: string
												fromTimeStamp?: number | undefined
										  }
										| undefined
							  }
							| undefined
				  }
				| undefined
		},
	],
	void
> & {
	init: null
}
/**
 * Action atom to update the current task
 */
export declare const updateCurrentTaskAtom: import("jotai").WritableAtom<
	null,
	[
		task: {
			number: number
			ts: number
			totalCost: number
			id: string
			task: string
			tokensIn: number
			tokensOut: number
			rootTaskId?: string | undefined
			parentTaskId?: string | undefined
			cacheWrites?: number | undefined
			cacheReads?: number | undefined
			size?: number | undefined
			workspace?: string | undefined
			isFavorited?: boolean | undefined
			fileNotfound?: boolean | undefined
			mode?: string | undefined
		} | null,
	],
	void
> & {
	init: null
}
/**
 * Action atom to update task todos
 */
export declare const updateTaskTodosAtom: import("jotai").WritableAtom<
	null,
	[
		todos: {
			status: "completed" | "pending" | "in_progress"
			id: string
			content: string
		}[],
	],
	void
> & {
	init: null
}
/**
 * Action atom to update router models
 */
export declare const updateRouterModelsAtom: import("jotai").WritableAtom<null, [models: RouterModels | null], void> & {
	init: null
}
/**
 * Action atom to update the mode
 */
export declare const updateExtensionModeAtom: import("jotai").WritableAtom<null, [mode: string], void> & {
	init: null
}
/**
 * Action atom to update extension state with partial updates
 * Merges the partial state with the current state
 */
export declare const updatePartialExtensionStateAtom: import("jotai").WritableAtom<
	null,
	[partialState: Partial<ExtensionState>],
	void
> & {
	init: null
}
/**
 * Action atom to clear all extension state
 */
export declare const clearExtensionStateAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
//# sourceMappingURL=extension.d.ts.map
