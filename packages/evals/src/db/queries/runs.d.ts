import type { InsertRun, UpdateRun } from "../schema.js"
export declare const findRun: (id: number) => Promise<{
	model: string
	id: number
	name: string | null
	contextWindow: number | null
	inputPrice: number | null
	outputPrice: number | null
	cacheWritesPrice: number | null
	cacheReadsPrice: number | null
	description: string | null
	pid: number | null
	settings:
		| ({
				language?:
					| "id"
					| "ar"
					| "cs"
					| "th"
					| "uk"
					| "ca"
					| "de"
					| "en"
					| "es"
					| "fr"
					| "hi"
					| "it"
					| "ja"
					| "ko"
					| "nl"
					| "pl"
					| "pt-BR"
					| "ru"
					| "tr"
					| "vi"
					| "zh-CN"
					| "zh-TW"
					| undefined
				diffEnabled?: boolean | undefined
				fuzzyMatchThreshold?: number | undefined
				rateLimitSeconds?: number | undefined
				mode?: string | undefined
				customInstructions?: string | undefined
				customModes?:
					| {
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
					| undefined
				currentApiConfigName?: string | undefined
				listApiConfigMeta?:
					| {
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
					| undefined
				pinnedApiConfigs?: Record<string, boolean> | undefined
				lastShownAnnouncementId?: string | undefined
				taskHistory?:
					| {
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
					  }[]
					| undefined
				dismissedUpsells?: string[] | undefined
				openRouterImageApiKey?: string | undefined
				openRouterImageGenerationSelectedModel?: string | undefined
				kiloCodeImageApiKey?: string | undefined
				condensingApiConfigId?: string | undefined
				customCondensingPrompt?: string | undefined
				autoApprovalEnabled?: boolean | undefined
				yoloMode?: boolean | undefined
				yoloGatekeeperApiConfigId?: string | undefined
				alwaysAllowReadOnly?: boolean | undefined
				alwaysAllowReadOnlyOutsideWorkspace?: boolean | undefined
				alwaysAllowWrite?: boolean | undefined
				alwaysAllowWriteOutsideWorkspace?: boolean | undefined
				alwaysAllowWriteProtected?: boolean | undefined
				writeDelayMs?: number | undefined
				alwaysAllowBrowser?: boolean | undefined
				alwaysApproveResubmit?: boolean | undefined
				requestDelaySeconds?: number | undefined
				alwaysAllowMcp?: boolean | undefined
				alwaysAllowModeSwitch?: boolean | undefined
				alwaysAllowSubtasks?: boolean | undefined
				alwaysAllowExecute?: boolean | undefined
				alwaysAllowFollowupQuestions?: boolean | undefined
				followupAutoApproveTimeoutMs?: number | undefined
				alwaysAllowUpdateTodoList?: boolean | undefined
				allowedCommands?: string[] | undefined
				deniedCommands?: string[] | undefined
				commandExecutionTimeout?: number | undefined
				commandTimeoutAllowlist?: string[] | undefined
				preventCompletionWithOpenTodos?: boolean | undefined
				allowedMaxRequests?: number | null | undefined
				allowedMaxCost?: number | null | undefined
				autoCondenseContext?: boolean | undefined
				autoCondenseContextPercent?: number | undefined
				maxConcurrentFileReads?: number | undefined
				allowVeryLargeReads?: boolean | undefined
				includeCurrentTime?: boolean | undefined
				includeCurrentCost?: boolean | undefined
				includeDiagnosticMessages?: boolean | undefined
				maxDiagnosticMessages?: number | undefined
				browserToolEnabled?: boolean | undefined
				browserViewportSize?: string | undefined
				showAutoApproveMenu?: boolean | undefined
				showTaskTimeline?: boolean | undefined
				sendMessageOnEnter?: boolean | undefined
				showTimestamps?: boolean | undefined
				hideCostBelowThreshold?: number | undefined
				localWorkflowToggles?: Record<string, boolean> | undefined
				globalWorkflowToggles?: Record<string, boolean> | undefined
				localRulesToggles?: Record<string, boolean> | undefined
				globalRulesToggles?: Record<string, boolean> | undefined
				screenshotQuality?: number | undefined
				remoteBrowserEnabled?: boolean | undefined
				remoteBrowserHost?: string | undefined
				cachedChromeHostUrl?: string | undefined
				enableCheckpoints?: boolean | undefined
				checkpointTimeout?: number | undefined
				autoPurgeEnabled?: boolean | undefined
				autoPurgeDefaultRetentionDays?: number | undefined
				autoPurgeFavoritedTaskRetentionDays?: number | null | undefined
				autoPurgeCompletedTaskRetentionDays?: number | undefined
				autoPurgeIncompleteTaskRetentionDays?: number | undefined
				autoPurgeLastRunTimestamp?: number | undefined
				ttsEnabled?: boolean | undefined
				ttsSpeed?: number | undefined
				soundEnabled?: boolean | undefined
				soundVolume?: number | undefined
				systemNotificationsEnabled?: boolean | undefined
				maxOpenTabsContext?: number | undefined
				maxWorkspaceFiles?: number | undefined
				showRooIgnoredFiles?: boolean | undefined
				maxReadFileLine?: number | undefined
				maxImageFileSize?: number | undefined
				maxTotalImageSize?: number | undefined
				terminalOutputLineLimit?: number | undefined
				terminalOutputCharacterLimit?: number | undefined
				terminalShellIntegrationTimeout?: number | undefined
				terminalShellIntegrationDisabled?: boolean | undefined
				terminalCommandDelay?: number | undefined
				terminalPowershellCounter?: boolean | undefined
				terminalZshClearEolMark?: boolean | undefined
				terminalZshOhMy?: boolean | undefined
				terminalZshP10k?: boolean | undefined
				terminalZdotdir?: boolean | undefined
				terminalCompressProgressBar?: boolean | undefined
				diagnosticsEnabled?: boolean | undefined
				experiments?:
					| {
							morphFastApply?: boolean | undefined
							powerSteering?: boolean | undefined
							multiFileApplyDiff?: boolean | undefined
							preventFocusDisruption?: boolean | undefined
							imageGeneration?: boolean | undefined
							runSlashCommand?: boolean | undefined
					  }
					| undefined
				morphApiKey?: string | undefined
				fastApplyModel?:
					| "auto"
					| "morph/morph-v3-fast"
					| "morph/morph-v3-large"
					| "relace/relace-apply-3"
					| undefined
				fastApplyApiProvider?: "current" | "morph" | "kilocode" | "openrouter" | undefined
				codebaseIndexModels?:
					| {
							openrouter?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							openai?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							ollama?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"openai-compatible"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							gemini?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							mistral?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"vercel-ai-gateway"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
					  }
					| undefined
				codebaseIndexConfig?:
					| {
							codebaseIndexEnabled?: boolean | undefined
							codebaseIndexQdrantUrl?: string | undefined
							codebaseIndexEmbedderProvider?:
								| "openrouter"
								| "openai"
								| "ollama"
								| "openai-compatible"
								| "gemini"
								| "mistral"
								| "vercel-ai-gateway"
								| undefined
							codebaseIndexVectorStoreProvider?: "lancedb" | "qdrant" | undefined
							codebaseIndexLancedbVectorStoreDirectory?: string | undefined
							codebaseIndexEmbedderBaseUrl?: string | undefined
							codebaseIndexEmbedderModelId?: string | undefined
							codebaseIndexEmbedderModelDimension?: number | undefined
							codebaseIndexSearchMinScore?: number | undefined
							codebaseIndexSearchMaxResults?: number | undefined
							codebaseIndexOpenAiCompatibleBaseUrl?: string | undefined
							codebaseIndexOpenAiCompatibleModelDimension?: number | undefined
					  }
					| undefined
				telemetrySetting?: "unset" | "enabled" | "disabled" | undefined
				mcpEnabled?: boolean | undefined
				enableMcpServerCreation?: boolean | undefined
				mcpMarketplaceCatalog?: any
				modeApiConfigs?: Record<string, string> | undefined
				customModePrompts?:
					| Record<
							string,
							| {
									description?: string | undefined
									roleDefinition?: string | undefined
									whenToUse?: string | undefined
									customInstructions?: string | undefined
							  }
							| undefined
					  >
					| undefined
				customSupportPrompts?: Record<string, string | undefined> | undefined
				enhancementApiConfigId?: string | undefined
				dismissedNotificationIds?: string[] | undefined
				commitMessageApiConfigId?: string | undefined
				terminalCommandApiConfigId?: string | undefined
				ghostServiceSettings?:
					| {
							enableAutoTrigger?: boolean | undefined
							enableQuickInlineTaskKeybinding?: boolean | undefined
							enableSmartInlineTaskKeybinding?: boolean | undefined
							useNewAutocomplete?: boolean | undefined
							provider?: string | undefined
							model?: string | undefined
					  }
					| undefined
				hasPerformedOrganizationAutoSwitch?: boolean | undefined
				includeTaskHistoryInEnhance?: boolean | undefined
				historyPreviewCollapsed?: boolean | undefined
				reasoningBlockCollapsed?: boolean | undefined
				profileThresholds?: Record<string, number> | undefined
				hasOpenedModeSelector?: boolean | undefined
				lastModeExportPath?: string | undefined
				lastModeImportPath?: string | undefined
		  } & {
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
		  })
		| null
	failed: number
	timeout: number
	socketPath: string
	concurrency: number
	createdAt: Date
	taskMetricsId: number | null
	passed: number
}>
export declare const createRun: (args: InsertRun) => Promise<{
	model: string
	id: number
	name: string | null
	contextWindow: number | null
	inputPrice: number | null
	outputPrice: number | null
	cacheWritesPrice: number | null
	cacheReadsPrice: number | null
	description: string | null
	pid: number | null
	settings:
		| ({
				language?:
					| "id"
					| "ar"
					| "cs"
					| "th"
					| "uk"
					| "ca"
					| "de"
					| "en"
					| "es"
					| "fr"
					| "hi"
					| "it"
					| "ja"
					| "ko"
					| "nl"
					| "pl"
					| "pt-BR"
					| "ru"
					| "tr"
					| "vi"
					| "zh-CN"
					| "zh-TW"
					| undefined
				diffEnabled?: boolean | undefined
				fuzzyMatchThreshold?: number | undefined
				rateLimitSeconds?: number | undefined
				mode?: string | undefined
				customInstructions?: string | undefined
				customModes?:
					| {
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
					| undefined
				currentApiConfigName?: string | undefined
				listApiConfigMeta?:
					| {
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
					| undefined
				pinnedApiConfigs?: Record<string, boolean> | undefined
				lastShownAnnouncementId?: string | undefined
				taskHistory?:
					| {
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
					  }[]
					| undefined
				dismissedUpsells?: string[] | undefined
				openRouterImageApiKey?: string | undefined
				openRouterImageGenerationSelectedModel?: string | undefined
				kiloCodeImageApiKey?: string | undefined
				condensingApiConfigId?: string | undefined
				customCondensingPrompt?: string | undefined
				autoApprovalEnabled?: boolean | undefined
				yoloMode?: boolean | undefined
				yoloGatekeeperApiConfigId?: string | undefined
				alwaysAllowReadOnly?: boolean | undefined
				alwaysAllowReadOnlyOutsideWorkspace?: boolean | undefined
				alwaysAllowWrite?: boolean | undefined
				alwaysAllowWriteOutsideWorkspace?: boolean | undefined
				alwaysAllowWriteProtected?: boolean | undefined
				writeDelayMs?: number | undefined
				alwaysAllowBrowser?: boolean | undefined
				alwaysApproveResubmit?: boolean | undefined
				requestDelaySeconds?: number | undefined
				alwaysAllowMcp?: boolean | undefined
				alwaysAllowModeSwitch?: boolean | undefined
				alwaysAllowSubtasks?: boolean | undefined
				alwaysAllowExecute?: boolean | undefined
				alwaysAllowFollowupQuestions?: boolean | undefined
				followupAutoApproveTimeoutMs?: number | undefined
				alwaysAllowUpdateTodoList?: boolean | undefined
				allowedCommands?: string[] | undefined
				deniedCommands?: string[] | undefined
				commandExecutionTimeout?: number | undefined
				commandTimeoutAllowlist?: string[] | undefined
				preventCompletionWithOpenTodos?: boolean | undefined
				allowedMaxRequests?: number | null | undefined
				allowedMaxCost?: number | null | undefined
				autoCondenseContext?: boolean | undefined
				autoCondenseContextPercent?: number | undefined
				maxConcurrentFileReads?: number | undefined
				allowVeryLargeReads?: boolean | undefined
				includeCurrentTime?: boolean | undefined
				includeCurrentCost?: boolean | undefined
				includeDiagnosticMessages?: boolean | undefined
				maxDiagnosticMessages?: number | undefined
				browserToolEnabled?: boolean | undefined
				browserViewportSize?: string | undefined
				showAutoApproveMenu?: boolean | undefined
				showTaskTimeline?: boolean | undefined
				sendMessageOnEnter?: boolean | undefined
				showTimestamps?: boolean | undefined
				hideCostBelowThreshold?: number | undefined
				localWorkflowToggles?: Record<string, boolean> | undefined
				globalWorkflowToggles?: Record<string, boolean> | undefined
				localRulesToggles?: Record<string, boolean> | undefined
				globalRulesToggles?: Record<string, boolean> | undefined
				screenshotQuality?: number | undefined
				remoteBrowserEnabled?: boolean | undefined
				remoteBrowserHost?: string | undefined
				cachedChromeHostUrl?: string | undefined
				enableCheckpoints?: boolean | undefined
				checkpointTimeout?: number | undefined
				autoPurgeEnabled?: boolean | undefined
				autoPurgeDefaultRetentionDays?: number | undefined
				autoPurgeFavoritedTaskRetentionDays?: number | null | undefined
				autoPurgeCompletedTaskRetentionDays?: number | undefined
				autoPurgeIncompleteTaskRetentionDays?: number | undefined
				autoPurgeLastRunTimestamp?: number | undefined
				ttsEnabled?: boolean | undefined
				ttsSpeed?: number | undefined
				soundEnabled?: boolean | undefined
				soundVolume?: number | undefined
				systemNotificationsEnabled?: boolean | undefined
				maxOpenTabsContext?: number | undefined
				maxWorkspaceFiles?: number | undefined
				showRooIgnoredFiles?: boolean | undefined
				maxReadFileLine?: number | undefined
				maxImageFileSize?: number | undefined
				maxTotalImageSize?: number | undefined
				terminalOutputLineLimit?: number | undefined
				terminalOutputCharacterLimit?: number | undefined
				terminalShellIntegrationTimeout?: number | undefined
				terminalShellIntegrationDisabled?: boolean | undefined
				terminalCommandDelay?: number | undefined
				terminalPowershellCounter?: boolean | undefined
				terminalZshClearEolMark?: boolean | undefined
				terminalZshOhMy?: boolean | undefined
				terminalZshP10k?: boolean | undefined
				terminalZdotdir?: boolean | undefined
				terminalCompressProgressBar?: boolean | undefined
				diagnosticsEnabled?: boolean | undefined
				experiments?:
					| {
							morphFastApply?: boolean | undefined
							powerSteering?: boolean | undefined
							multiFileApplyDiff?: boolean | undefined
							preventFocusDisruption?: boolean | undefined
							imageGeneration?: boolean | undefined
							runSlashCommand?: boolean | undefined
					  }
					| undefined
				morphApiKey?: string | undefined
				fastApplyModel?:
					| "auto"
					| "morph/morph-v3-fast"
					| "morph/morph-v3-large"
					| "relace/relace-apply-3"
					| undefined
				fastApplyApiProvider?: "current" | "morph" | "kilocode" | "openrouter" | undefined
				codebaseIndexModels?:
					| {
							openrouter?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							openai?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							ollama?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"openai-compatible"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							gemini?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							mistral?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"vercel-ai-gateway"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
					  }
					| undefined
				codebaseIndexConfig?:
					| {
							codebaseIndexEnabled?: boolean | undefined
							codebaseIndexQdrantUrl?: string | undefined
							codebaseIndexEmbedderProvider?:
								| "openrouter"
								| "openai"
								| "ollama"
								| "openai-compatible"
								| "gemini"
								| "mistral"
								| "vercel-ai-gateway"
								| undefined
							codebaseIndexVectorStoreProvider?: "lancedb" | "qdrant" | undefined
							codebaseIndexLancedbVectorStoreDirectory?: string | undefined
							codebaseIndexEmbedderBaseUrl?: string | undefined
							codebaseIndexEmbedderModelId?: string | undefined
							codebaseIndexEmbedderModelDimension?: number | undefined
							codebaseIndexSearchMinScore?: number | undefined
							codebaseIndexSearchMaxResults?: number | undefined
							codebaseIndexOpenAiCompatibleBaseUrl?: string | undefined
							codebaseIndexOpenAiCompatibleModelDimension?: number | undefined
					  }
					| undefined
				telemetrySetting?: "unset" | "enabled" | "disabled" | undefined
				mcpEnabled?: boolean | undefined
				enableMcpServerCreation?: boolean | undefined
				mcpMarketplaceCatalog?: any
				modeApiConfigs?: Record<string, string> | undefined
				customModePrompts?:
					| Record<
							string,
							| {
									description?: string | undefined
									roleDefinition?: string | undefined
									whenToUse?: string | undefined
									customInstructions?: string | undefined
							  }
							| undefined
					  >
					| undefined
				customSupportPrompts?: Record<string, string | undefined> | undefined
				enhancementApiConfigId?: string | undefined
				dismissedNotificationIds?: string[] | undefined
				commitMessageApiConfigId?: string | undefined
				terminalCommandApiConfigId?: string | undefined
				ghostServiceSettings?:
					| {
							enableAutoTrigger?: boolean | undefined
							enableQuickInlineTaskKeybinding?: boolean | undefined
							enableSmartInlineTaskKeybinding?: boolean | undefined
							useNewAutocomplete?: boolean | undefined
							provider?: string | undefined
							model?: string | undefined
					  }
					| undefined
				hasPerformedOrganizationAutoSwitch?: boolean | undefined
				includeTaskHistoryInEnhance?: boolean | undefined
				historyPreviewCollapsed?: boolean | undefined
				reasoningBlockCollapsed?: boolean | undefined
				profileThresholds?: Record<string, number> | undefined
				hasOpenedModeSelector?: boolean | undefined
				lastModeExportPath?: string | undefined
				lastModeImportPath?: string | undefined
		  } & {
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
		  })
		| null
	failed: number
	timeout: number
	socketPath: string
	concurrency: number
	createdAt: Date
	taskMetricsId: number | null
	passed: number
}>
export declare const updateRun: (
	id: number,
	values: UpdateRun,
) => Promise<{
	id: number
	taskMetricsId: number | null
	model: string
	name: string | null
	description: string | null
	contextWindow: number | null
	inputPrice: number | null
	outputPrice: number | null
	cacheWritesPrice: number | null
	cacheReadsPrice: number | null
	settings:
		| ({
				language?:
					| "id"
					| "ar"
					| "cs"
					| "th"
					| "uk"
					| "ca"
					| "de"
					| "en"
					| "es"
					| "fr"
					| "hi"
					| "it"
					| "ja"
					| "ko"
					| "nl"
					| "pl"
					| "pt-BR"
					| "ru"
					| "tr"
					| "vi"
					| "zh-CN"
					| "zh-TW"
					| undefined
				diffEnabled?: boolean | undefined
				fuzzyMatchThreshold?: number | undefined
				rateLimitSeconds?: number | undefined
				mode?: string | undefined
				customInstructions?: string | undefined
				customModes?:
					| {
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
					| undefined
				currentApiConfigName?: string | undefined
				listApiConfigMeta?:
					| {
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
					| undefined
				pinnedApiConfigs?: Record<string, boolean> | undefined
				lastShownAnnouncementId?: string | undefined
				taskHistory?:
					| {
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
					  }[]
					| undefined
				dismissedUpsells?: string[] | undefined
				openRouterImageApiKey?: string | undefined
				openRouterImageGenerationSelectedModel?: string | undefined
				kiloCodeImageApiKey?: string | undefined
				condensingApiConfigId?: string | undefined
				customCondensingPrompt?: string | undefined
				autoApprovalEnabled?: boolean | undefined
				yoloMode?: boolean | undefined
				yoloGatekeeperApiConfigId?: string | undefined
				alwaysAllowReadOnly?: boolean | undefined
				alwaysAllowReadOnlyOutsideWorkspace?: boolean | undefined
				alwaysAllowWrite?: boolean | undefined
				alwaysAllowWriteOutsideWorkspace?: boolean | undefined
				alwaysAllowWriteProtected?: boolean | undefined
				writeDelayMs?: number | undefined
				alwaysAllowBrowser?: boolean | undefined
				alwaysApproveResubmit?: boolean | undefined
				requestDelaySeconds?: number | undefined
				alwaysAllowMcp?: boolean | undefined
				alwaysAllowModeSwitch?: boolean | undefined
				alwaysAllowSubtasks?: boolean | undefined
				alwaysAllowExecute?: boolean | undefined
				alwaysAllowFollowupQuestions?: boolean | undefined
				followupAutoApproveTimeoutMs?: number | undefined
				alwaysAllowUpdateTodoList?: boolean | undefined
				allowedCommands?: string[] | undefined
				deniedCommands?: string[] | undefined
				commandExecutionTimeout?: number | undefined
				commandTimeoutAllowlist?: string[] | undefined
				preventCompletionWithOpenTodos?: boolean | undefined
				allowedMaxRequests?: number | null | undefined
				allowedMaxCost?: number | null | undefined
				autoCondenseContext?: boolean | undefined
				autoCondenseContextPercent?: number | undefined
				maxConcurrentFileReads?: number | undefined
				allowVeryLargeReads?: boolean | undefined
				includeCurrentTime?: boolean | undefined
				includeCurrentCost?: boolean | undefined
				includeDiagnosticMessages?: boolean | undefined
				maxDiagnosticMessages?: number | undefined
				browserToolEnabled?: boolean | undefined
				browserViewportSize?: string | undefined
				showAutoApproveMenu?: boolean | undefined
				showTaskTimeline?: boolean | undefined
				sendMessageOnEnter?: boolean | undefined
				showTimestamps?: boolean | undefined
				hideCostBelowThreshold?: number | undefined
				localWorkflowToggles?: Record<string, boolean> | undefined
				globalWorkflowToggles?: Record<string, boolean> | undefined
				localRulesToggles?: Record<string, boolean> | undefined
				globalRulesToggles?: Record<string, boolean> | undefined
				screenshotQuality?: number | undefined
				remoteBrowserEnabled?: boolean | undefined
				remoteBrowserHost?: string | undefined
				cachedChromeHostUrl?: string | undefined
				enableCheckpoints?: boolean | undefined
				checkpointTimeout?: number | undefined
				autoPurgeEnabled?: boolean | undefined
				autoPurgeDefaultRetentionDays?: number | undefined
				autoPurgeFavoritedTaskRetentionDays?: number | null | undefined
				autoPurgeCompletedTaskRetentionDays?: number | undefined
				autoPurgeIncompleteTaskRetentionDays?: number | undefined
				autoPurgeLastRunTimestamp?: number | undefined
				ttsEnabled?: boolean | undefined
				ttsSpeed?: number | undefined
				soundEnabled?: boolean | undefined
				soundVolume?: number | undefined
				systemNotificationsEnabled?: boolean | undefined
				maxOpenTabsContext?: number | undefined
				maxWorkspaceFiles?: number | undefined
				showRooIgnoredFiles?: boolean | undefined
				maxReadFileLine?: number | undefined
				maxImageFileSize?: number | undefined
				maxTotalImageSize?: number | undefined
				terminalOutputLineLimit?: number | undefined
				terminalOutputCharacterLimit?: number | undefined
				terminalShellIntegrationTimeout?: number | undefined
				terminalShellIntegrationDisabled?: boolean | undefined
				terminalCommandDelay?: number | undefined
				terminalPowershellCounter?: boolean | undefined
				terminalZshClearEolMark?: boolean | undefined
				terminalZshOhMy?: boolean | undefined
				terminalZshP10k?: boolean | undefined
				terminalZdotdir?: boolean | undefined
				terminalCompressProgressBar?: boolean | undefined
				diagnosticsEnabled?: boolean | undefined
				experiments?:
					| {
							morphFastApply?: boolean | undefined
							powerSteering?: boolean | undefined
							multiFileApplyDiff?: boolean | undefined
							preventFocusDisruption?: boolean | undefined
							imageGeneration?: boolean | undefined
							runSlashCommand?: boolean | undefined
					  }
					| undefined
				morphApiKey?: string | undefined
				fastApplyModel?:
					| "auto"
					| "morph/morph-v3-fast"
					| "morph/morph-v3-large"
					| "relace/relace-apply-3"
					| undefined
				fastApplyApiProvider?: "current" | "morph" | "kilocode" | "openrouter" | undefined
				codebaseIndexModels?:
					| {
							openrouter?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							openai?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							ollama?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"openai-compatible"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							gemini?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							mistral?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"vercel-ai-gateway"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
					  }
					| undefined
				codebaseIndexConfig?:
					| {
							codebaseIndexEnabled?: boolean | undefined
							codebaseIndexQdrantUrl?: string | undefined
							codebaseIndexEmbedderProvider?:
								| "openrouter"
								| "openai"
								| "ollama"
								| "openai-compatible"
								| "gemini"
								| "mistral"
								| "vercel-ai-gateway"
								| undefined
							codebaseIndexVectorStoreProvider?: "lancedb" | "qdrant" | undefined
							codebaseIndexLancedbVectorStoreDirectory?: string | undefined
							codebaseIndexEmbedderBaseUrl?: string | undefined
							codebaseIndexEmbedderModelId?: string | undefined
							codebaseIndexEmbedderModelDimension?: number | undefined
							codebaseIndexSearchMinScore?: number | undefined
							codebaseIndexSearchMaxResults?: number | undefined
							codebaseIndexOpenAiCompatibleBaseUrl?: string | undefined
							codebaseIndexOpenAiCompatibleModelDimension?: number | undefined
					  }
					| undefined
				telemetrySetting?: "unset" | "enabled" | "disabled" | undefined
				mcpEnabled?: boolean | undefined
				enableMcpServerCreation?: boolean | undefined
				mcpMarketplaceCatalog?: any
				modeApiConfigs?: Record<string, string> | undefined
				customModePrompts?:
					| Record<
							string,
							| {
									description?: string | undefined
									roleDefinition?: string | undefined
									whenToUse?: string | undefined
									customInstructions?: string | undefined
							  }
							| undefined
					  >
					| undefined
				customSupportPrompts?: Record<string, string | undefined> | undefined
				enhancementApiConfigId?: string | undefined
				dismissedNotificationIds?: string[] | undefined
				commitMessageApiConfigId?: string | undefined
				terminalCommandApiConfigId?: string | undefined
				ghostServiceSettings?:
					| {
							enableAutoTrigger?: boolean | undefined
							enableQuickInlineTaskKeybinding?: boolean | undefined
							enableSmartInlineTaskKeybinding?: boolean | undefined
							useNewAutocomplete?: boolean | undefined
							provider?: string | undefined
							model?: string | undefined
					  }
					| undefined
				hasPerformedOrganizationAutoSwitch?: boolean | undefined
				includeTaskHistoryInEnhance?: boolean | undefined
				historyPreviewCollapsed?: boolean | undefined
				reasoningBlockCollapsed?: boolean | undefined
				profileThresholds?: Record<string, number> | undefined
				hasOpenedModeSelector?: boolean | undefined
				lastModeExportPath?: string | undefined
				lastModeImportPath?: string | undefined
		  } & {
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
		  })
		| null
	pid: number | null
	socketPath: string
	concurrency: number
	timeout: number
	passed: number
	failed: number
	createdAt: Date
}>
export declare const getRuns: () => Promise<
	{
		model: string
		id: number
		name: string | null
		contextWindow: number | null
		inputPrice: number | null
		outputPrice: number | null
		cacheWritesPrice: number | null
		cacheReadsPrice: number | null
		description: string | null
		pid: number | null
		settings:
			| ({
					language?:
						| "id"
						| "ar"
						| "cs"
						| "th"
						| "uk"
						| "ca"
						| "de"
						| "en"
						| "es"
						| "fr"
						| "hi"
						| "it"
						| "ja"
						| "ko"
						| "nl"
						| "pl"
						| "pt-BR"
						| "ru"
						| "tr"
						| "vi"
						| "zh-CN"
						| "zh-TW"
						| undefined
					diffEnabled?: boolean | undefined
					fuzzyMatchThreshold?: number | undefined
					rateLimitSeconds?: number | undefined
					mode?: string | undefined
					customInstructions?: string | undefined
					customModes?:
						| {
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
						| undefined
					currentApiConfigName?: string | undefined
					listApiConfigMeta?:
						| {
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
						| undefined
					pinnedApiConfigs?: Record<string, boolean> | undefined
					lastShownAnnouncementId?: string | undefined
					taskHistory?:
						| {
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
						  }[]
						| undefined
					dismissedUpsells?: string[] | undefined
					openRouterImageApiKey?: string | undefined
					openRouterImageGenerationSelectedModel?: string | undefined
					kiloCodeImageApiKey?: string | undefined
					condensingApiConfigId?: string | undefined
					customCondensingPrompt?: string | undefined
					autoApprovalEnabled?: boolean | undefined
					yoloMode?: boolean | undefined
					yoloGatekeeperApiConfigId?: string | undefined
					alwaysAllowReadOnly?: boolean | undefined
					alwaysAllowReadOnlyOutsideWorkspace?: boolean | undefined
					alwaysAllowWrite?: boolean | undefined
					alwaysAllowWriteOutsideWorkspace?: boolean | undefined
					alwaysAllowWriteProtected?: boolean | undefined
					writeDelayMs?: number | undefined
					alwaysAllowBrowser?: boolean | undefined
					alwaysApproveResubmit?: boolean | undefined
					requestDelaySeconds?: number | undefined
					alwaysAllowMcp?: boolean | undefined
					alwaysAllowModeSwitch?: boolean | undefined
					alwaysAllowSubtasks?: boolean | undefined
					alwaysAllowExecute?: boolean | undefined
					alwaysAllowFollowupQuestions?: boolean | undefined
					followupAutoApproveTimeoutMs?: number | undefined
					alwaysAllowUpdateTodoList?: boolean | undefined
					allowedCommands?: string[] | undefined
					deniedCommands?: string[] | undefined
					commandExecutionTimeout?: number | undefined
					commandTimeoutAllowlist?: string[] | undefined
					preventCompletionWithOpenTodos?: boolean | undefined
					allowedMaxRequests?: number | null | undefined
					allowedMaxCost?: number | null | undefined
					autoCondenseContext?: boolean | undefined
					autoCondenseContextPercent?: number | undefined
					maxConcurrentFileReads?: number | undefined
					allowVeryLargeReads?: boolean | undefined
					includeCurrentTime?: boolean | undefined
					includeCurrentCost?: boolean | undefined
					includeDiagnosticMessages?: boolean | undefined
					maxDiagnosticMessages?: number | undefined
					browserToolEnabled?: boolean | undefined
					browserViewportSize?: string | undefined
					showAutoApproveMenu?: boolean | undefined
					showTaskTimeline?: boolean | undefined
					sendMessageOnEnter?: boolean | undefined
					showTimestamps?: boolean | undefined
					hideCostBelowThreshold?: number | undefined
					localWorkflowToggles?: Record<string, boolean> | undefined
					globalWorkflowToggles?: Record<string, boolean> | undefined
					localRulesToggles?: Record<string, boolean> | undefined
					globalRulesToggles?: Record<string, boolean> | undefined
					screenshotQuality?: number | undefined
					remoteBrowserEnabled?: boolean | undefined
					remoteBrowserHost?: string | undefined
					cachedChromeHostUrl?: string | undefined
					enableCheckpoints?: boolean | undefined
					checkpointTimeout?: number | undefined
					autoPurgeEnabled?: boolean | undefined
					autoPurgeDefaultRetentionDays?: number | undefined
					autoPurgeFavoritedTaskRetentionDays?: number | null | undefined
					autoPurgeCompletedTaskRetentionDays?: number | undefined
					autoPurgeIncompleteTaskRetentionDays?: number | undefined
					autoPurgeLastRunTimestamp?: number | undefined
					ttsEnabled?: boolean | undefined
					ttsSpeed?: number | undefined
					soundEnabled?: boolean | undefined
					soundVolume?: number | undefined
					systemNotificationsEnabled?: boolean | undefined
					maxOpenTabsContext?: number | undefined
					maxWorkspaceFiles?: number | undefined
					showRooIgnoredFiles?: boolean | undefined
					maxReadFileLine?: number | undefined
					maxImageFileSize?: number | undefined
					maxTotalImageSize?: number | undefined
					terminalOutputLineLimit?: number | undefined
					terminalOutputCharacterLimit?: number | undefined
					terminalShellIntegrationTimeout?: number | undefined
					terminalShellIntegrationDisabled?: boolean | undefined
					terminalCommandDelay?: number | undefined
					terminalPowershellCounter?: boolean | undefined
					terminalZshClearEolMark?: boolean | undefined
					terminalZshOhMy?: boolean | undefined
					terminalZshP10k?: boolean | undefined
					terminalZdotdir?: boolean | undefined
					terminalCompressProgressBar?: boolean | undefined
					diagnosticsEnabled?: boolean | undefined
					experiments?:
						| {
								morphFastApply?: boolean | undefined
								powerSteering?: boolean | undefined
								multiFileApplyDiff?: boolean | undefined
								preventFocusDisruption?: boolean | undefined
								imageGeneration?: boolean | undefined
								runSlashCommand?: boolean | undefined
						  }
						| undefined
					morphApiKey?: string | undefined
					fastApplyModel?:
						| "auto"
						| "morph/morph-v3-fast"
						| "morph/morph-v3-large"
						| "relace/relace-apply-3"
						| undefined
					fastApplyApiProvider?: "current" | "morph" | "kilocode" | "openrouter" | undefined
					codebaseIndexModels?:
						| {
								openrouter?:
									| Record<
											string,
											{
												dimension: number
											}
									  >
									| undefined
								openai?:
									| Record<
											string,
											{
												dimension: number
											}
									  >
									| undefined
								ollama?:
									| Record<
											string,
											{
												dimension: number
											}
									  >
									| undefined
								"openai-compatible"?:
									| Record<
											string,
											{
												dimension: number
											}
									  >
									| undefined
								gemini?:
									| Record<
											string,
											{
												dimension: number
											}
									  >
									| undefined
								mistral?:
									| Record<
											string,
											{
												dimension: number
											}
									  >
									| undefined
								"vercel-ai-gateway"?:
									| Record<
											string,
											{
												dimension: number
											}
									  >
									| undefined
						  }
						| undefined
					codebaseIndexConfig?:
						| {
								codebaseIndexEnabled?: boolean | undefined
								codebaseIndexQdrantUrl?: string | undefined
								codebaseIndexEmbedderProvider?:
									| "openrouter"
									| "openai"
									| "ollama"
									| "openai-compatible"
									| "gemini"
									| "mistral"
									| "vercel-ai-gateway"
									| undefined
								codebaseIndexVectorStoreProvider?: "lancedb" | "qdrant" | undefined
								codebaseIndexLancedbVectorStoreDirectory?: string | undefined
								codebaseIndexEmbedderBaseUrl?: string | undefined
								codebaseIndexEmbedderModelId?: string | undefined
								codebaseIndexEmbedderModelDimension?: number | undefined
								codebaseIndexSearchMinScore?: number | undefined
								codebaseIndexSearchMaxResults?: number | undefined
								codebaseIndexOpenAiCompatibleBaseUrl?: string | undefined
								codebaseIndexOpenAiCompatibleModelDimension?: number | undefined
						  }
						| undefined
					telemetrySetting?: "unset" | "enabled" | "disabled" | undefined
					mcpEnabled?: boolean | undefined
					enableMcpServerCreation?: boolean | undefined
					mcpMarketplaceCatalog?: any
					modeApiConfigs?: Record<string, string> | undefined
					customModePrompts?:
						| Record<
								string,
								| {
										description?: string | undefined
										roleDefinition?: string | undefined
										whenToUse?: string | undefined
										customInstructions?: string | undefined
								  }
								| undefined
						  >
						| undefined
					customSupportPrompts?: Record<string, string | undefined> | undefined
					enhancementApiConfigId?: string | undefined
					dismissedNotificationIds?: string[] | undefined
					commitMessageApiConfigId?: string | undefined
					terminalCommandApiConfigId?: string | undefined
					ghostServiceSettings?:
						| {
								enableAutoTrigger?: boolean | undefined
								enableQuickInlineTaskKeybinding?: boolean | undefined
								enableSmartInlineTaskKeybinding?: boolean | undefined
								useNewAutocomplete?: boolean | undefined
								provider?: string | undefined
								model?: string | undefined
						  }
						| undefined
					hasPerformedOrganizationAutoSwitch?: boolean | undefined
					includeTaskHistoryInEnhance?: boolean | undefined
					historyPreviewCollapsed?: boolean | undefined
					reasoningBlockCollapsed?: boolean | undefined
					profileThresholds?: Record<string, number> | undefined
					hasOpenedModeSelector?: boolean | undefined
					lastModeExportPath?: string | undefined
					lastModeImportPath?: string | undefined
			  } & {
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
					minimaxBaseUrl?:
						| "https://api.minimax.io/anthropic"
						| "https://api.minimaxi.com/anthropic"
						| undefined
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
			  })
			| null
		failed: number
		timeout: number
		socketPath: string
		concurrency: number
		createdAt: Date
		taskMetricsId: number | null
		passed: number
		taskMetrics: {
			cost: number
			id: number
			duration: number
			tokensIn: number
			tokensOut: number
			cacheWrites: number
			cacheReads: number
			toolUsage: Partial<
				Record<
					| "report_bug"
					| "condense"
					| "browser_action"
					| "execute_command"
					| "read_file"
					| "write_to_file"
					| "apply_diff"
					| "insert_content"
					| "search_files"
					| "list_files"
					| "list_code_definition_names"
					| "use_mcp_tool"
					| "access_mcp_resource"
					| "ask_followup_question"
					| "attempt_completion"
					| "switch_mode"
					| "new_task"
					| "fetch_instructions"
					| "codebase_search"
					| "edit_file"
					| "new_rule"
					| "delete_file"
					| "update_todo_list"
					| "run_slash_command"
					| "generate_image",
					{
						attempts: number
						failures: number
					}
				>
			> | null
			createdAt: Date
			tokensContext: number
		} | null
	}[]
>
export declare const finishRun: (runId: number) => Promise<{
	taskMetrics: {
		cost: number
		id: number
		duration: number
		tokensIn: number
		tokensOut: number
		cacheWrites: number
		cacheReads: number
		toolUsage: Partial<
			Record<
				| "report_bug"
				| "condense"
				| "browser_action"
				| "execute_command"
				| "read_file"
				| "write_to_file"
				| "apply_diff"
				| "insert_content"
				| "search_files"
				| "list_files"
				| "list_code_definition_names"
				| "use_mcp_tool"
				| "access_mcp_resource"
				| "ask_followup_question"
				| "attempt_completion"
				| "switch_mode"
				| "new_task"
				| "fetch_instructions"
				| "codebase_search"
				| "edit_file"
				| "new_rule"
				| "delete_file"
				| "update_todo_list"
				| "run_slash_command"
				| "generate_image",
				{
					attempts: number
					failures: number
				}
			>
		> | null
		createdAt: Date
		tokensContext: number
	}
	model: string
	id: number
	name: string | null
	contextWindow: number | null
	inputPrice: number | null
	outputPrice: number | null
	cacheWritesPrice: number | null
	cacheReadsPrice: number | null
	description: string | null
	pid: number | null
	settings:
		| ({
				language?:
					| "id"
					| "ar"
					| "cs"
					| "th"
					| "uk"
					| "ca"
					| "de"
					| "en"
					| "es"
					| "fr"
					| "hi"
					| "it"
					| "ja"
					| "ko"
					| "nl"
					| "pl"
					| "pt-BR"
					| "ru"
					| "tr"
					| "vi"
					| "zh-CN"
					| "zh-TW"
					| undefined
				diffEnabled?: boolean | undefined
				fuzzyMatchThreshold?: number | undefined
				rateLimitSeconds?: number | undefined
				mode?: string | undefined
				customInstructions?: string | undefined
				customModes?:
					| {
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
					| undefined
				currentApiConfigName?: string | undefined
				listApiConfigMeta?:
					| {
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
					| undefined
				pinnedApiConfigs?: Record<string, boolean> | undefined
				lastShownAnnouncementId?: string | undefined
				taskHistory?:
					| {
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
					  }[]
					| undefined
				dismissedUpsells?: string[] | undefined
				openRouterImageApiKey?: string | undefined
				openRouterImageGenerationSelectedModel?: string | undefined
				kiloCodeImageApiKey?: string | undefined
				condensingApiConfigId?: string | undefined
				customCondensingPrompt?: string | undefined
				autoApprovalEnabled?: boolean | undefined
				yoloMode?: boolean | undefined
				yoloGatekeeperApiConfigId?: string | undefined
				alwaysAllowReadOnly?: boolean | undefined
				alwaysAllowReadOnlyOutsideWorkspace?: boolean | undefined
				alwaysAllowWrite?: boolean | undefined
				alwaysAllowWriteOutsideWorkspace?: boolean | undefined
				alwaysAllowWriteProtected?: boolean | undefined
				writeDelayMs?: number | undefined
				alwaysAllowBrowser?: boolean | undefined
				alwaysApproveResubmit?: boolean | undefined
				requestDelaySeconds?: number | undefined
				alwaysAllowMcp?: boolean | undefined
				alwaysAllowModeSwitch?: boolean | undefined
				alwaysAllowSubtasks?: boolean | undefined
				alwaysAllowExecute?: boolean | undefined
				alwaysAllowFollowupQuestions?: boolean | undefined
				followupAutoApproveTimeoutMs?: number | undefined
				alwaysAllowUpdateTodoList?: boolean | undefined
				allowedCommands?: string[] | undefined
				deniedCommands?: string[] | undefined
				commandExecutionTimeout?: number | undefined
				commandTimeoutAllowlist?: string[] | undefined
				preventCompletionWithOpenTodos?: boolean | undefined
				allowedMaxRequests?: number | null | undefined
				allowedMaxCost?: number | null | undefined
				autoCondenseContext?: boolean | undefined
				autoCondenseContextPercent?: number | undefined
				maxConcurrentFileReads?: number | undefined
				allowVeryLargeReads?: boolean | undefined
				includeCurrentTime?: boolean | undefined
				includeCurrentCost?: boolean | undefined
				includeDiagnosticMessages?: boolean | undefined
				maxDiagnosticMessages?: number | undefined
				browserToolEnabled?: boolean | undefined
				browserViewportSize?: string | undefined
				showAutoApproveMenu?: boolean | undefined
				showTaskTimeline?: boolean | undefined
				sendMessageOnEnter?: boolean | undefined
				showTimestamps?: boolean | undefined
				hideCostBelowThreshold?: number | undefined
				localWorkflowToggles?: Record<string, boolean> | undefined
				globalWorkflowToggles?: Record<string, boolean> | undefined
				localRulesToggles?: Record<string, boolean> | undefined
				globalRulesToggles?: Record<string, boolean> | undefined
				screenshotQuality?: number | undefined
				remoteBrowserEnabled?: boolean | undefined
				remoteBrowserHost?: string | undefined
				cachedChromeHostUrl?: string | undefined
				enableCheckpoints?: boolean | undefined
				checkpointTimeout?: number | undefined
				autoPurgeEnabled?: boolean | undefined
				autoPurgeDefaultRetentionDays?: number | undefined
				autoPurgeFavoritedTaskRetentionDays?: number | null | undefined
				autoPurgeCompletedTaskRetentionDays?: number | undefined
				autoPurgeIncompleteTaskRetentionDays?: number | undefined
				autoPurgeLastRunTimestamp?: number | undefined
				ttsEnabled?: boolean | undefined
				ttsSpeed?: number | undefined
				soundEnabled?: boolean | undefined
				soundVolume?: number | undefined
				systemNotificationsEnabled?: boolean | undefined
				maxOpenTabsContext?: number | undefined
				maxWorkspaceFiles?: number | undefined
				showRooIgnoredFiles?: boolean | undefined
				maxReadFileLine?: number | undefined
				maxImageFileSize?: number | undefined
				maxTotalImageSize?: number | undefined
				terminalOutputLineLimit?: number | undefined
				terminalOutputCharacterLimit?: number | undefined
				terminalShellIntegrationTimeout?: number | undefined
				terminalShellIntegrationDisabled?: boolean | undefined
				terminalCommandDelay?: number | undefined
				terminalPowershellCounter?: boolean | undefined
				terminalZshClearEolMark?: boolean | undefined
				terminalZshOhMy?: boolean | undefined
				terminalZshP10k?: boolean | undefined
				terminalZdotdir?: boolean | undefined
				terminalCompressProgressBar?: boolean | undefined
				diagnosticsEnabled?: boolean | undefined
				experiments?:
					| {
							morphFastApply?: boolean | undefined
							powerSteering?: boolean | undefined
							multiFileApplyDiff?: boolean | undefined
							preventFocusDisruption?: boolean | undefined
							imageGeneration?: boolean | undefined
							runSlashCommand?: boolean | undefined
					  }
					| undefined
				morphApiKey?: string | undefined
				fastApplyModel?:
					| "auto"
					| "morph/morph-v3-fast"
					| "morph/morph-v3-large"
					| "relace/relace-apply-3"
					| undefined
				fastApplyApiProvider?: "current" | "morph" | "kilocode" | "openrouter" | undefined
				codebaseIndexModels?:
					| {
							openrouter?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							openai?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							ollama?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"openai-compatible"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							gemini?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							mistral?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
							"vercel-ai-gateway"?:
								| Record<
										string,
										{
											dimension: number
										}
								  >
								| undefined
					  }
					| undefined
				codebaseIndexConfig?:
					| {
							codebaseIndexEnabled?: boolean | undefined
							codebaseIndexQdrantUrl?: string | undefined
							codebaseIndexEmbedderProvider?:
								| "openrouter"
								| "openai"
								| "ollama"
								| "openai-compatible"
								| "gemini"
								| "mistral"
								| "vercel-ai-gateway"
								| undefined
							codebaseIndexVectorStoreProvider?: "lancedb" | "qdrant" | undefined
							codebaseIndexLancedbVectorStoreDirectory?: string | undefined
							codebaseIndexEmbedderBaseUrl?: string | undefined
							codebaseIndexEmbedderModelId?: string | undefined
							codebaseIndexEmbedderModelDimension?: number | undefined
							codebaseIndexSearchMinScore?: number | undefined
							codebaseIndexSearchMaxResults?: number | undefined
							codebaseIndexOpenAiCompatibleBaseUrl?: string | undefined
							codebaseIndexOpenAiCompatibleModelDimension?: number | undefined
					  }
					| undefined
				telemetrySetting?: "unset" | "enabled" | "disabled" | undefined
				mcpEnabled?: boolean | undefined
				enableMcpServerCreation?: boolean | undefined
				mcpMarketplaceCatalog?: any
				modeApiConfigs?: Record<string, string> | undefined
				customModePrompts?:
					| Record<
							string,
							| {
									description?: string | undefined
									roleDefinition?: string | undefined
									whenToUse?: string | undefined
									customInstructions?: string | undefined
							  }
							| undefined
					  >
					| undefined
				customSupportPrompts?: Record<string, string | undefined> | undefined
				enhancementApiConfigId?: string | undefined
				dismissedNotificationIds?: string[] | undefined
				commitMessageApiConfigId?: string | undefined
				terminalCommandApiConfigId?: string | undefined
				ghostServiceSettings?:
					| {
							enableAutoTrigger?: boolean | undefined
							enableQuickInlineTaskKeybinding?: boolean | undefined
							enableSmartInlineTaskKeybinding?: boolean | undefined
							useNewAutocomplete?: boolean | undefined
							provider?: string | undefined
							model?: string | undefined
					  }
					| undefined
				hasPerformedOrganizationAutoSwitch?: boolean | undefined
				includeTaskHistoryInEnhance?: boolean | undefined
				historyPreviewCollapsed?: boolean | undefined
				reasoningBlockCollapsed?: boolean | undefined
				profileThresholds?: Record<string, number> | undefined
				hasOpenedModeSelector?: boolean | undefined
				lastModeExportPath?: string | undefined
				lastModeImportPath?: string | undefined
		  } & {
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
		  })
		| null
	failed: number
	timeout: number
	socketPath: string
	concurrency: number
	createdAt: Date
	taskMetricsId: number | null
	passed: number
}>
export declare const deleteRun: (runId: number) => Promise<void>
//# sourceMappingURL=runs.d.ts.map
