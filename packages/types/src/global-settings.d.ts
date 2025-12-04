import { z } from "zod"
import { type Keys } from "./type-fu.js"
import { type ProviderSettings } from "./provider-settings.js"
/**
 * Default delay in milliseconds after writes to allow diagnostics to detect potential problems.
 * This delay is particularly important for Go and other languages where tools like goimports
 * need time to automatically clean up unused imports.
 */
export declare const DEFAULT_WRITE_DELAY_MS = 1000
/**
 * Default terminal output character limit constant.
 * This provides a reasonable default that aligns with typical terminal usage
 * while preventing context window explosions from extremely long lines.
 */
export declare const DEFAULT_TERMINAL_OUTPUT_CHARACTER_LIMIT = 50000
/**
 * Minimum checkpoint timeout in seconds.
 */
export declare const MIN_CHECKPOINT_TIMEOUT_SECONDS = 10
/**
 * Maximum checkpoint timeout in seconds.
 */
export declare const MAX_CHECKPOINT_TIMEOUT_SECONDS = 60
/**
 * Default checkpoint timeout in seconds.
 */
export declare const DEFAULT_CHECKPOINT_TIMEOUT_SECONDS = 15
/**
 * GlobalSettings
 */
export declare const globalSettingsSchema: z.ZodObject<
	{
		currentApiConfigName: z.ZodOptional<z.ZodString>
		listApiConfigMeta: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						id: z.ZodString
						name: z.ZodString
						apiProvider: z.ZodOptional<
							z.ZodEnum<
								[
									"openrouter",
									"vercel-ai-gateway",
									"huggingface",
									"litellm",
									"kilocode",
									"ovhcloud",
									"gemini",
									"inception",
									"synthetic",
									"sap-ai-core",
									"deepinfra",
									"io-intelligence",
									"requesty",
									"unbound",
									"glama",
									"roo",
									"chutes",
									"nano-gpt",
									"ollama",
									"lmstudio",
									"vscode-lm",
									"openai",
									"fake-ai",
									"human-relay",
									"anthropic",
									"bedrock",
									"cerebras",
									"claude-code",
									"doubao",
									"deepseek",
									"featherless",
									"fireworks",
									"gemini",
									"gemini-cli",
									"groq",
									"mistral",
									"moonshot",
									"minimax",
									"openai-native",
									"qwen-code",
									"roo",
									"kilocode",
									"minimax",
									"gemini-cli",
									"virtual-quota-fallback",
									"synthetic",
									"inception",
									"sambanova",
									"vertex",
									"xai",
									"zai",
								]
							>
						>
						modelId: z.ZodOptional<z.ZodString>
						profileType: z.ZodOptional<z.ZodEnum<["chat", "autocomplete"]>>
					},
					"strip",
					z.ZodTypeAny,
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
					},
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
					}
				>,
				"many"
			>
		>
		pinnedApiConfigs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		lastShownAnnouncementId: z.ZodOptional<z.ZodString>
		customInstructions: z.ZodOptional<z.ZodString>
		taskHistory: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						id: z.ZodString
						rootTaskId: z.ZodOptional<z.ZodString>
						parentTaskId: z.ZodOptional<z.ZodString>
						number: z.ZodNumber
						ts: z.ZodNumber
						task: z.ZodString
						tokensIn: z.ZodNumber
						tokensOut: z.ZodNumber
						cacheWrites: z.ZodOptional<z.ZodNumber>
						cacheReads: z.ZodOptional<z.ZodNumber>
						totalCost: z.ZodNumber
						size: z.ZodOptional<z.ZodNumber>
						workspace: z.ZodOptional<z.ZodString>
						isFavorited: z.ZodOptional<z.ZodBoolean>
						fileNotfound: z.ZodOptional<z.ZodBoolean>
						mode: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
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
					},
					{
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
					}
				>,
				"many"
			>
		>
		dismissedUpsells: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		openRouterImageApiKey: z.ZodOptional<z.ZodString>
		openRouterImageGenerationSelectedModel: z.ZodOptional<z.ZodString>
		kiloCodeImageApiKey: z.ZodOptional<z.ZodString>
		condensingApiConfigId: z.ZodOptional<z.ZodString>
		customCondensingPrompt: z.ZodOptional<z.ZodString>
		autoApprovalEnabled: z.ZodOptional<z.ZodBoolean>
		yoloMode: z.ZodOptional<z.ZodBoolean>
		yoloGatekeeperApiConfigId: z.ZodOptional<z.ZodString>
		alwaysAllowReadOnly: z.ZodOptional<z.ZodBoolean>
		alwaysAllowReadOnlyOutsideWorkspace: z.ZodOptional<z.ZodBoolean>
		alwaysAllowWrite: z.ZodOptional<z.ZodBoolean>
		alwaysAllowWriteOutsideWorkspace: z.ZodOptional<z.ZodBoolean>
		alwaysAllowWriteProtected: z.ZodOptional<z.ZodBoolean>
		writeDelayMs: z.ZodOptional<z.ZodNumber>
		alwaysAllowBrowser: z.ZodOptional<z.ZodBoolean>
		alwaysApproveResubmit: z.ZodOptional<z.ZodBoolean>
		requestDelaySeconds: z.ZodOptional<z.ZodNumber>
		alwaysAllowMcp: z.ZodOptional<z.ZodBoolean>
		alwaysAllowModeSwitch: z.ZodOptional<z.ZodBoolean>
		alwaysAllowSubtasks: z.ZodOptional<z.ZodBoolean>
		alwaysAllowExecute: z.ZodOptional<z.ZodBoolean>
		alwaysAllowFollowupQuestions: z.ZodOptional<z.ZodBoolean>
		followupAutoApproveTimeoutMs: z.ZodOptional<z.ZodNumber>
		alwaysAllowUpdateTodoList: z.ZodOptional<z.ZodBoolean>
		allowedCommands: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		deniedCommands: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		commandExecutionTimeout: z.ZodOptional<z.ZodNumber>
		commandTimeoutAllowlist: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		preventCompletionWithOpenTodos: z.ZodOptional<z.ZodBoolean>
		allowedMaxRequests: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		allowedMaxCost: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		autoCondenseContext: z.ZodOptional<z.ZodBoolean>
		autoCondenseContextPercent: z.ZodOptional<z.ZodNumber>
		maxConcurrentFileReads: z.ZodOptional<z.ZodNumber>
		allowVeryLargeReads: z.ZodOptional<z.ZodBoolean>
		/**
		 * Whether to include current time in the environment details
		 * @default true
		 */
		includeCurrentTime: z.ZodOptional<z.ZodBoolean>
		/**
		 * Whether to include current cost in the environment details
		 * @default true
		 */
		includeCurrentCost: z.ZodOptional<z.ZodBoolean>
		/**
		 * Whether to include diagnostic messages (errors, warnings) in tool outputs
		 * @default true
		 */
		includeDiagnosticMessages: z.ZodOptional<z.ZodBoolean>
		/**
		 * Maximum number of diagnostic messages to include in tool outputs
		 * @default 50
		 */
		maxDiagnosticMessages: z.ZodOptional<z.ZodNumber>
		browserToolEnabled: z.ZodOptional<z.ZodBoolean>
		browserViewportSize: z.ZodOptional<z.ZodString>
		showAutoApproveMenu: z.ZodOptional<z.ZodBoolean>
		showTaskTimeline: z.ZodOptional<z.ZodBoolean>
		sendMessageOnEnter: z.ZodOptional<z.ZodBoolean>
		showTimestamps: z.ZodOptional<z.ZodBoolean>
		hideCostBelowThreshold: z.ZodOptional<z.ZodNumber>
		localWorkflowToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		globalWorkflowToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		localRulesToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		globalRulesToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		screenshotQuality: z.ZodOptional<z.ZodNumber>
		remoteBrowserEnabled: z.ZodOptional<z.ZodBoolean>
		remoteBrowserHost: z.ZodOptional<z.ZodString>
		cachedChromeHostUrl: z.ZodOptional<z.ZodString>
		enableCheckpoints: z.ZodOptional<z.ZodBoolean>
		checkpointTimeout: z.ZodOptional<z.ZodNumber>
		autoPurgeEnabled: z.ZodOptional<z.ZodBoolean>
		autoPurgeDefaultRetentionDays: z.ZodOptional<z.ZodNumber>
		autoPurgeFavoritedTaskRetentionDays: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		autoPurgeCompletedTaskRetentionDays: z.ZodOptional<z.ZodNumber>
		autoPurgeIncompleteTaskRetentionDays: z.ZodOptional<z.ZodNumber>
		autoPurgeLastRunTimestamp: z.ZodOptional<z.ZodNumber>
		ttsEnabled: z.ZodOptional<z.ZodBoolean>
		ttsSpeed: z.ZodOptional<z.ZodNumber>
		soundEnabled: z.ZodOptional<z.ZodBoolean>
		soundVolume: z.ZodOptional<z.ZodNumber>
		systemNotificationsEnabled: z.ZodOptional<z.ZodBoolean>
		maxOpenTabsContext: z.ZodOptional<z.ZodNumber>
		maxWorkspaceFiles: z.ZodOptional<z.ZodNumber>
		showRooIgnoredFiles: z.ZodOptional<z.ZodBoolean>
		maxReadFileLine: z.ZodOptional<z.ZodNumber>
		maxImageFileSize: z.ZodOptional<z.ZodNumber>
		maxTotalImageSize: z.ZodOptional<z.ZodNumber>
		terminalOutputLineLimit: z.ZodOptional<z.ZodNumber>
		terminalOutputCharacterLimit: z.ZodOptional<z.ZodNumber>
		terminalShellIntegrationTimeout: z.ZodOptional<z.ZodNumber>
		terminalShellIntegrationDisabled: z.ZodOptional<z.ZodBoolean>
		terminalCommandDelay: z.ZodOptional<z.ZodNumber>
		terminalPowershellCounter: z.ZodOptional<z.ZodBoolean>
		terminalZshClearEolMark: z.ZodOptional<z.ZodBoolean>
		terminalZshOhMy: z.ZodOptional<z.ZodBoolean>
		terminalZshP10k: z.ZodOptional<z.ZodBoolean>
		terminalZdotdir: z.ZodOptional<z.ZodBoolean>
		terminalCompressProgressBar: z.ZodOptional<z.ZodBoolean>
		diagnosticsEnabled: z.ZodOptional<z.ZodBoolean>
		rateLimitSeconds: z.ZodOptional<z.ZodNumber>
		diffEnabled: z.ZodOptional<z.ZodBoolean>
		fuzzyMatchThreshold: z.ZodOptional<z.ZodNumber>
		experiments: z.ZodOptional<
			z.ZodObject<
				{
					morphFastApply: z.ZodOptional<z.ZodBoolean>
					powerSteering: z.ZodOptional<z.ZodBoolean>
					multiFileApplyDiff: z.ZodOptional<z.ZodBoolean>
					preventFocusDisruption: z.ZodOptional<z.ZodBoolean>
					imageGeneration: z.ZodOptional<z.ZodBoolean>
					runSlashCommand: z.ZodOptional<z.ZodBoolean>
				},
				"strip",
				z.ZodTypeAny,
				{
					morphFastApply?: boolean | undefined
					powerSteering?: boolean | undefined
					multiFileApplyDiff?: boolean | undefined
					preventFocusDisruption?: boolean | undefined
					imageGeneration?: boolean | undefined
					runSlashCommand?: boolean | undefined
				},
				{
					morphFastApply?: boolean | undefined
					powerSteering?: boolean | undefined
					multiFileApplyDiff?: boolean | undefined
					preventFocusDisruption?: boolean | undefined
					imageGeneration?: boolean | undefined
					runSlashCommand?: boolean | undefined
				}
			>
		>
		morphApiKey: z.ZodOptional<z.ZodString>
		fastApplyModel: z.ZodOptional<
			z.ZodEnum<["auto", "morph/morph-v3-fast", "morph/morph-v3-large", "relace/relace-apply-3"]>
		>
		fastApplyApiProvider: z.ZodOptional<z.ZodEnum<["current", "morph", "kilocode", "openrouter"]>>
		codebaseIndexModels: z.ZodOptional<
			z.ZodObject<
				{
					openai: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					ollama: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					"openai-compatible": z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					gemini: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					mistral: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					"vercel-ai-gateway": z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					openrouter: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
				},
				"strip",
				z.ZodTypeAny,
				{
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
				},
				{
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
			>
		>
		codebaseIndexConfig: z.ZodOptional<
			z.ZodObject<
				{
					codebaseIndexEnabled: z.ZodOptional<z.ZodBoolean>
					codebaseIndexQdrantUrl: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderProvider: z.ZodOptional<
						z.ZodEnum<
							[
								"openai",
								"ollama",
								"openai-compatible",
								"gemini",
								"mistral",
								"vercel-ai-gateway",
								"openrouter",
							]
						>
					>
					codebaseIndexVectorStoreProvider: z.ZodOptional<z.ZodEnum<["lancedb", "qdrant"]>>
					codebaseIndexLancedbVectorStoreDirectory: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderBaseUrl: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderModelId: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderModelDimension: z.ZodOptional<z.ZodNumber>
					codebaseIndexSearchMinScore: z.ZodOptional<z.ZodNumber>
					codebaseIndexSearchMaxResults: z.ZodOptional<z.ZodNumber>
					codebaseIndexOpenAiCompatibleBaseUrl: z.ZodOptional<z.ZodString>
					codebaseIndexOpenAiCompatibleModelDimension: z.ZodOptional<z.ZodNumber>
				},
				"strip",
				z.ZodTypeAny,
				{
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
				},
				{
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
			>
		>
		language: z.ZodOptional<
			z.ZodEnum<
				[
					"ar",
					"cs",
					"th",
					"uk",
					"ca",
					"de",
					"en",
					"es",
					"fr",
					"hi",
					"id",
					"it",
					"ja",
					"ko",
					"nl",
					"pl",
					"pt-BR",
					"ru",
					"tr",
					"vi",
					"zh-CN",
					"zh-TW",
				]
			>
		>
		telemetrySetting: z.ZodOptional<z.ZodEnum<["unset", "enabled", "disabled"]>>
		mcpEnabled: z.ZodOptional<z.ZodBoolean>
		enableMcpServerCreation: z.ZodOptional<z.ZodBoolean>
		mcpMarketplaceCatalog: z.ZodOptional<z.ZodAny>
		mode: z.ZodOptional<z.ZodString>
		modeApiConfigs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>
		customModes: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						slug: z.ZodString
						name: z.ZodString
						roleDefinition: z.ZodString
						whenToUse: z.ZodOptional<z.ZodString>
						description: z.ZodOptional<z.ZodString>
						customInstructions: z.ZodOptional<z.ZodString>
						groups: z.ZodEffects<
							z.ZodArray<
								z.ZodUnion<
									[
										z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
										z.ZodTuple<
											[
												z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
												z.ZodObject<
													{
														fileRegex: z.ZodEffects<
															z.ZodOptional<z.ZodString>,
															string | undefined,
															string | undefined
														>
														description: z.ZodOptional<z.ZodString>
													},
													"strip",
													z.ZodTypeAny,
													{
														description?: string | undefined
														fileRegex?: string | undefined
													},
													{
														description?: string | undefined
														fileRegex?: string | undefined
													}
												>,
											],
											null
										>,
									]
								>,
								"many"
							>,
							(
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
							)[],
							(
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
						>
						source: z.ZodOptional<z.ZodEnum<["global", "project", "organization"]>>
						iconName: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
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
					},
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
					}
				>,
				"many"
			>
		>
		customModePrompts: z.ZodOptional<
			z.ZodRecord<
				z.ZodString,
				z.ZodOptional<
					z.ZodObject<
						{
							roleDefinition: z.ZodOptional<z.ZodString>
							whenToUse: z.ZodOptional<z.ZodString>
							description: z.ZodOptional<z.ZodString>
							customInstructions: z.ZodOptional<z.ZodString>
						},
						"strip",
						z.ZodTypeAny,
						{
							description?: string | undefined
							roleDefinition?: string | undefined
							whenToUse?: string | undefined
							customInstructions?: string | undefined
						},
						{
							description?: string | undefined
							roleDefinition?: string | undefined
							whenToUse?: string | undefined
							customInstructions?: string | undefined
						}
					>
				>
			>
		>
		customSupportPrompts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodString>>>
		enhancementApiConfigId: z.ZodOptional<z.ZodString>
		dismissedNotificationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		commitMessageApiConfigId: z.ZodOptional<z.ZodString>
		terminalCommandApiConfigId: z.ZodOptional<z.ZodString>
		ghostServiceSettings: z.ZodOptional<
			z.ZodObject<
				{
					enableAutoTrigger: z.ZodOptional<z.ZodBoolean>
					enableQuickInlineTaskKeybinding: z.ZodOptional<z.ZodBoolean>
					enableSmartInlineTaskKeybinding: z.ZodOptional<z.ZodBoolean>
					useNewAutocomplete: z.ZodOptional<z.ZodBoolean>
					provider: z.ZodOptional<z.ZodString>
					model: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					enableAutoTrigger?: boolean | undefined
					enableQuickInlineTaskKeybinding?: boolean | undefined
					enableSmartInlineTaskKeybinding?: boolean | undefined
					useNewAutocomplete?: boolean | undefined
					provider?: string | undefined
					model?: string | undefined
				},
				{
					enableAutoTrigger?: boolean | undefined
					enableQuickInlineTaskKeybinding?: boolean | undefined
					enableSmartInlineTaskKeybinding?: boolean | undefined
					useNewAutocomplete?: boolean | undefined
					provider?: string | undefined
					model?: string | undefined
				}
			>
		>
		hasPerformedOrganizationAutoSwitch: z.ZodOptional<z.ZodBoolean>
		includeTaskHistoryInEnhance: z.ZodOptional<z.ZodBoolean>
		historyPreviewCollapsed: z.ZodOptional<z.ZodBoolean>
		reasoningBlockCollapsed: z.ZodOptional<z.ZodBoolean>
		profileThresholds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>
		hasOpenedModeSelector: z.ZodOptional<z.ZodBoolean>
		lastModeExportPath: z.ZodOptional<z.ZodString>
		lastModeImportPath: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
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
		fastApplyModel?: "auto" | "morph/morph-v3-fast" | "morph/morph-v3-large" | "relace/relace-apply-3" | undefined
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
		mcpMarketplaceCatalog?: unknown
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
	},
	{
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
		fastApplyModel?: "auto" | "morph/morph-v3-fast" | "morph/morph-v3-large" | "relace/relace-apply-3" | undefined
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
		mcpMarketplaceCatalog?: unknown
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
	}
>
export type GlobalSettings = z.infer<typeof globalSettingsSchema>
export declare const GLOBAL_SETTINGS_KEYS: [
	"diffEnabled",
	"fuzzyMatchThreshold",
	"rateLimitSeconds",
	"language",
	"mode",
	"customInstructions",
	"customModes",
	"currentApiConfigName",
	"listApiConfigMeta",
	"pinnedApiConfigs",
	"lastShownAnnouncementId",
	"taskHistory",
	"dismissedUpsells",
	"openRouterImageApiKey",
	"openRouterImageGenerationSelectedModel",
	"kiloCodeImageApiKey",
	"condensingApiConfigId",
	"customCondensingPrompt",
	"autoApprovalEnabled",
	"yoloMode",
	"yoloGatekeeperApiConfigId",
	"alwaysAllowReadOnly",
	"alwaysAllowReadOnlyOutsideWorkspace",
	"alwaysAllowWrite",
	"alwaysAllowWriteOutsideWorkspace",
	"alwaysAllowWriteProtected",
	"writeDelayMs",
	"alwaysAllowBrowser",
	"alwaysApproveResubmit",
	"requestDelaySeconds",
	"alwaysAllowMcp",
	"alwaysAllowModeSwitch",
	"alwaysAllowSubtasks",
	"alwaysAllowExecute",
	"alwaysAllowFollowupQuestions",
	"followupAutoApproveTimeoutMs",
	"alwaysAllowUpdateTodoList",
	"allowedCommands",
	"deniedCommands",
	"commandExecutionTimeout",
	"commandTimeoutAllowlist",
	"preventCompletionWithOpenTodos",
	"allowedMaxRequests",
	"allowedMaxCost",
	"autoCondenseContext",
	"autoCondenseContextPercent",
	"maxConcurrentFileReads",
	"allowVeryLargeReads",
	"includeCurrentTime",
	"includeCurrentCost",
	"includeDiagnosticMessages",
	"maxDiagnosticMessages",
	"browserToolEnabled",
	"browserViewportSize",
	"showAutoApproveMenu",
	"showTaskTimeline",
	"sendMessageOnEnter",
	"showTimestamps",
	"hideCostBelowThreshold",
	"localWorkflowToggles",
	"globalWorkflowToggles",
	"localRulesToggles",
	"globalRulesToggles",
	"screenshotQuality",
	"remoteBrowserEnabled",
	"remoteBrowserHost",
	"cachedChromeHostUrl",
	"enableCheckpoints",
	"checkpointTimeout",
	"autoPurgeEnabled",
	"autoPurgeDefaultRetentionDays",
	"autoPurgeFavoritedTaskRetentionDays",
	"autoPurgeCompletedTaskRetentionDays",
	"autoPurgeIncompleteTaskRetentionDays",
	"autoPurgeLastRunTimestamp",
	"ttsEnabled",
	"ttsSpeed",
	"soundEnabled",
	"soundVolume",
	"systemNotificationsEnabled",
	"maxOpenTabsContext",
	"maxWorkspaceFiles",
	"showRooIgnoredFiles",
	"maxReadFileLine",
	"maxImageFileSize",
	"maxTotalImageSize",
	"terminalOutputLineLimit",
	"terminalOutputCharacterLimit",
	"terminalShellIntegrationTimeout",
	"terminalShellIntegrationDisabled",
	"terminalCommandDelay",
	"terminalPowershellCounter",
	"terminalZshClearEolMark",
	"terminalZshOhMy",
	"terminalZshP10k",
	"terminalZdotdir",
	"terminalCompressProgressBar",
	"diagnosticsEnabled",
	"experiments",
	"morphApiKey",
	"fastApplyModel",
	"fastApplyApiProvider",
	"codebaseIndexModels",
	"codebaseIndexConfig",
	"telemetrySetting",
	"mcpEnabled",
	"enableMcpServerCreation",
	"mcpMarketplaceCatalog",
	"modeApiConfigs",
	"customModePrompts",
	"customSupportPrompts",
	"enhancementApiConfigId",
	"dismissedNotificationIds",
	"commitMessageApiConfigId",
	"terminalCommandApiConfigId",
	"ghostServiceSettings",
	"hasPerformedOrganizationAutoSwitch",
	"includeTaskHistoryInEnhance",
	"historyPreviewCollapsed",
	"reasoningBlockCollapsed",
	"profileThresholds",
	"hasOpenedModeSelector",
	"lastModeExportPath",
	"lastModeImportPath",
]
/**
 * RooCodeSettings
 */
export declare const rooCodeSettingsSchema: z.ZodObject<
	{
		codeIndexOpenAiKey: z.ZodOptional<z.ZodString>
		codeIndexQdrantApiKey: z.ZodOptional<z.ZodString>
		codebaseIndexOpenAiCompatibleBaseUrl: z.ZodOptional<z.ZodString>
		codebaseIndexOpenAiCompatibleApiKey: z.ZodOptional<z.ZodString>
		codebaseIndexOpenAiCompatibleModelDimension: z.ZodOptional<z.ZodNumber>
		codebaseIndexGeminiApiKey: z.ZodOptional<z.ZodString>
		codebaseIndexMistralApiKey: z.ZodOptional<z.ZodString>
		codebaseIndexVercelAiGatewayApiKey: z.ZodOptional<z.ZodString>
		codebaseIndexOpenRouterApiKey: z.ZodOptional<z.ZodString>
		profileType: z.ZodOptional<z.ZodEnum<["chat", "autocomplete"]>>
		includeMaxTokens: z.ZodOptional<z.ZodBoolean>
		todoListEnabled: z.ZodOptional<z.ZodBoolean>
		modelTemperature: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		rateLimitAfter: z.ZodOptional<z.ZodBoolean>
		consecutiveMistakeLimit: z.ZodOptional<z.ZodNumber>
		enableReasoningEffort: z.ZodOptional<z.ZodBoolean>
		reasoningEffort: z.ZodOptional<z.ZodEnum<["disable", "none", "minimal", "low", "medium", "high"]>>
		modelMaxTokens: z.ZodOptional<z.ZodNumber>
		modelMaxThinkingTokens: z.ZodOptional<z.ZodNumber>
		verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>
		toolStyle: z.ZodOptional<z.ZodEnum<["xml", "json"]>>
		sapAiCoreServiceKey: z.ZodOptional<z.ZodString>
		sapAiCoreResourceGroup: z.ZodOptional<z.ZodString>
		sapAiCoreUseOrchestration: z.ZodOptional<z.ZodBoolean>
		sapAiCoreModelId: z.ZodOptional<z.ZodString>
		sapAiCoreDeploymentId: z.ZodOptional<z.ZodString>
		sapAiCoreCustomModelInfo: z.ZodOptional<
			z.ZodNullable<
				z.ZodObject<
					{
						maxTokens: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
						maxThinkingTokens: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
						contextWindow: z.ZodNumber
						supportsImages: z.ZodOptional<z.ZodBoolean>
						supportsComputerUse: z.ZodOptional<z.ZodBoolean>
						supportsPromptCache: z.ZodBoolean
						promptCacheRetention: z.ZodOptional<z.ZodEnum<["in_memory", "24h"]>>
						supportsVerbosity: z.ZodOptional<z.ZodBoolean>
						supportsReasoningBudget: z.ZodOptional<z.ZodBoolean>
						supportsReasoningBinary: z.ZodOptional<z.ZodBoolean>
						supportsTemperature: z.ZodOptional<z.ZodBoolean>
						defaultTemperature: z.ZodOptional<z.ZodNumber>
						requiredReasoningBudget: z.ZodOptional<z.ZodBoolean>
						supportsReasoningEffort: z.ZodOptional<
							z.ZodUnion<
								[
									z.ZodBoolean,
									z.ZodArray<
										z.ZodEnum<["disable", "none", "minimal", "low", "medium", "high"]>,
										"many"
									>,
								]
							>
						>
						requiredReasoningEffort: z.ZodOptional<z.ZodBoolean>
						preserveReasoning: z.ZodOptional<z.ZodBoolean>
						supportedParameters: z.ZodOptional<
							z.ZodArray<
								z.ZodEnum<["max_tokens", "temperature", "reasoning", "include_reasoning"]>,
								"many"
							>
						>
						inputPrice: z.ZodOptional<z.ZodNumber>
						outputPrice: z.ZodOptional<z.ZodNumber>
						cacheWritesPrice: z.ZodOptional<z.ZodNumber>
						cacheReadsPrice: z.ZodOptional<z.ZodNumber>
						description: z.ZodOptional<z.ZodString>
						reasoningEffort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>
						minTokensPerCachePoint: z.ZodOptional<z.ZodNumber>
						maxCachePoints: z.ZodOptional<z.ZodNumber>
						cachableFields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
						displayName: z.ZodOptional<z.ZodNullable<z.ZodString>>
						preferredIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
						deprecated: z.ZodOptional<z.ZodBoolean>
						isFree: z.ZodOptional<z.ZodBoolean>
						supportsNativeTools: z.ZodOptional<z.ZodBoolean>
						tiers: z.ZodOptional<
							z.ZodArray<
								z.ZodObject<
									{
										name: z.ZodOptional<z.ZodEnum<["default", "flex", "priority"]>>
										contextWindow: z.ZodNumber
										inputPrice: z.ZodOptional<z.ZodNumber>
										outputPrice: z.ZodOptional<z.ZodNumber>
										cacheWritesPrice: z.ZodOptional<z.ZodNumber>
										cacheReadsPrice: z.ZodOptional<z.ZodNumber>
									},
									"strip",
									z.ZodTypeAny,
									{
										contextWindow: number
										name?: "default" | "flex" | "priority" | undefined
										inputPrice?: number | undefined
										outputPrice?: number | undefined
										cacheWritesPrice?: number | undefined
										cacheReadsPrice?: number | undefined
									},
									{
										contextWindow: number
										name?: "default" | "flex" | "priority" | undefined
										inputPrice?: number | undefined
										outputPrice?: number | undefined
										cacheWritesPrice?: number | undefined
										cacheReadsPrice?: number | undefined
									}
								>,
								"many"
							>
						>
					},
					"strip",
					z.ZodTypeAny,
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
					},
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
				>
			>
		>
		vercelAiGatewayApiKey: z.ZodOptional<z.ZodString>
		vercelAiGatewayModelId: z.ZodOptional<z.ZodString>
		apiModelId: z.ZodOptional<z.ZodString>
		qwenCodeOauthPath: z.ZodOptional<z.ZodString>
		ioIntelligenceModelId: z.ZodOptional<z.ZodString>
		ioIntelligenceApiKey: z.ZodOptional<z.ZodString>
		featherlessApiKey: z.ZodOptional<z.ZodString>
		fireworksApiKey: z.ZodOptional<z.ZodString>
		zaiApiKey: z.ZodOptional<z.ZodString>
		zaiApiLine: z.ZodOptional<z.ZodEnum<["international_coding", "china_coding"]>>
		sambaNovaApiKey: z.ZodOptional<z.ZodString>
		cerebrasApiKey: z.ZodOptional<z.ZodString>
		litellmBaseUrl: z.ZodOptional<z.ZodString>
		litellmApiKey: z.ZodOptional<z.ZodString>
		litellmModelId: z.ZodOptional<z.ZodString>
		litellmUsePromptCache: z.ZodOptional<z.ZodBoolean>
		chutesApiKey: z.ZodOptional<z.ZodString>
		huggingFaceApiKey: z.ZodOptional<z.ZodString>
		huggingFaceModelId: z.ZodOptional<z.ZodString>
		huggingFaceInferenceProvider: z.ZodOptional<z.ZodString>
		groqApiKey: z.ZodOptional<z.ZodString>
		xaiApiKey: z.ZodOptional<z.ZodString>
		fakeAi: z.ZodOptional<z.ZodUnknown>
		requestyBaseUrl: z.ZodOptional<z.ZodString>
		requestyApiKey: z.ZodOptional<z.ZodString>
		requestyModelId: z.ZodOptional<z.ZodString>
		unboundApiKey: z.ZodOptional<z.ZodString>
		unboundModelId: z.ZodOptional<z.ZodString>
		minimaxBaseUrl: z.ZodOptional<
			z.ZodUnion<
				[z.ZodLiteral<"https://api.minimax.io/anthropic">, z.ZodLiteral<"https://api.minimaxi.com/anthropic">]
			>
		>
		minimaxApiKey: z.ZodOptional<z.ZodString>
		moonshotBaseUrl: z.ZodOptional<
			z.ZodUnion<[z.ZodLiteral<"https://api.moonshot.ai/v1">, z.ZodLiteral<"https://api.moonshot.cn/v1">]>
		>
		moonshotApiKey: z.ZodOptional<z.ZodString>
		doubaoBaseUrl: z.ZodOptional<z.ZodString>
		doubaoApiKey: z.ZodOptional<z.ZodString>
		deepInfraBaseUrl: z.ZodOptional<z.ZodString>
		deepInfraApiKey: z.ZodOptional<z.ZodString>
		deepInfraModelId: z.ZodOptional<z.ZodString>
		deepSeekBaseUrl: z.ZodOptional<z.ZodString>
		deepSeekApiKey: z.ZodOptional<z.ZodString>
		mistralApiKey: z.ZodOptional<z.ZodString>
		mistralCodestralUrl: z.ZodOptional<z.ZodString>
		openAiNativeApiKey: z.ZodOptional<z.ZodString>
		openAiNativeBaseUrl: z.ZodOptional<z.ZodString>
		openAiNativeServiceTier: z.ZodOptional<z.ZodEnum<["default", "flex", "priority"]>>
		inceptionLabsBaseUrl: z.ZodOptional<z.ZodString>
		inceptionLabsApiKey: z.ZodOptional<z.ZodString>
		inceptionLabsModelId: z.ZodOptional<z.ZodString>
		ovhCloudAiEndpointsApiKey: z.ZodOptional<z.ZodString>
		ovhCloudAiEndpointsModelId: z.ZodOptional<z.ZodString>
		ovhCloudAiEndpointsBaseUrl: z.ZodOptional<z.ZodString>
		syntheticApiKey: z.ZodOptional<z.ZodString>
		profiles: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						profileName: z.ZodOptional<z.ZodString>
						profileId: z.ZodOptional<z.ZodString>
						profileLimits: z.ZodOptional<
							z.ZodObject<
								{
									tokensPerMinute: z.ZodOptional<z.ZodNumber>
									tokensPerHour: z.ZodOptional<z.ZodNumber>
									tokensPerDay: z.ZodOptional<z.ZodNumber>
									requestsPerMinute: z.ZodOptional<z.ZodNumber>
									requestsPerHour: z.ZodOptional<z.ZodNumber>
									requestsPerDay: z.ZodOptional<z.ZodNumber>
								},
								"strip",
								z.ZodTypeAny,
								{
									tokensPerMinute?: number | undefined
									tokensPerHour?: number | undefined
									tokensPerDay?: number | undefined
									requestsPerMinute?: number | undefined
									requestsPerHour?: number | undefined
									requestsPerDay?: number | undefined
								},
								{
									tokensPerMinute?: number | undefined
									tokensPerHour?: number | undefined
									tokensPerDay?: number | undefined
									requestsPerMinute?: number | undefined
									requestsPerHour?: number | undefined
									requestsPerDay?: number | undefined
								}
							>
						>
					},
					"strip",
					z.ZodTypeAny,
					{
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
					},
					{
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
					}
				>,
				"many"
			>
		>
		kilocodeToken: z.ZodOptional<z.ZodString>
		kilocodeOrganizationId: z.ZodOptional<z.ZodString>
		kilocodeModel: z.ZodOptional<z.ZodString>
		openRouterSpecificProvider: z.ZodOptional<z.ZodString>
		openRouterProviderDataCollection: z.ZodOptional<z.ZodEnum<["allow", "deny"]>>
		openRouterProviderSort: z.ZodOptional<z.ZodEnum<["price", "throughput", "latency"]>>
		openRouterZdr: z.ZodOptional<z.ZodBoolean>
		kilocodeTesterWarningsDisabledUntil: z.ZodOptional<z.ZodNumber>
		geminiCliOAuthPath: z.ZodOptional<z.ZodString>
		geminiCliProjectId: z.ZodOptional<z.ZodString>
		geminiApiKey: z.ZodOptional<z.ZodString>
		googleGeminiBaseUrl: z.ZodOptional<z.ZodString>
		enableUrlContext: z.ZodOptional<z.ZodBoolean>
		enableGrounding: z.ZodOptional<z.ZodBoolean>
		lmStudioModelId: z.ZodOptional<z.ZodString>
		lmStudioBaseUrl: z.ZodOptional<z.ZodString>
		lmStudioDraftModelId: z.ZodOptional<z.ZodString>
		lmStudioSpeculativeDecodingEnabled: z.ZodOptional<z.ZodBoolean>
		vsCodeLmModelSelector: z.ZodOptional<
			z.ZodObject<
				{
					vendor: z.ZodOptional<z.ZodString>
					family: z.ZodOptional<z.ZodString>
					version: z.ZodOptional<z.ZodString>
					id: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					id?: string | undefined
					family?: string | undefined
					version?: string | undefined
					vendor?: string | undefined
				},
				{
					id?: string | undefined
					family?: string | undefined
					version?: string | undefined
					vendor?: string | undefined
				}
			>
		>
		ollamaModelId: z.ZodOptional<z.ZodString>
		ollamaBaseUrl: z.ZodOptional<z.ZodString>
		ollamaApiKey: z.ZodOptional<z.ZodString>
		ollamaNumCtx: z.ZodOptional<z.ZodNumber>
		openAiBaseUrl: z.ZodOptional<z.ZodString>
		openAiApiKey: z.ZodOptional<z.ZodString>
		openAiLegacyFormat: z.ZodOptional<z.ZodBoolean>
		openAiR1FormatEnabled: z.ZodOptional<z.ZodBoolean>
		openAiModelId: z.ZodOptional<z.ZodString>
		openAiCustomModelInfo: z.ZodOptional<
			z.ZodNullable<
				z.ZodObject<
					{
						maxTokens: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
						maxThinkingTokens: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
						contextWindow: z.ZodNumber
						supportsImages: z.ZodOptional<z.ZodBoolean>
						supportsComputerUse: z.ZodOptional<z.ZodBoolean>
						supportsPromptCache: z.ZodBoolean
						promptCacheRetention: z.ZodOptional<z.ZodEnum<["in_memory", "24h"]>>
						supportsVerbosity: z.ZodOptional<z.ZodBoolean>
						supportsReasoningBudget: z.ZodOptional<z.ZodBoolean>
						supportsReasoningBinary: z.ZodOptional<z.ZodBoolean>
						supportsTemperature: z.ZodOptional<z.ZodBoolean>
						defaultTemperature: z.ZodOptional<z.ZodNumber>
						requiredReasoningBudget: z.ZodOptional<z.ZodBoolean>
						supportsReasoningEffort: z.ZodOptional<
							z.ZodUnion<
								[
									z.ZodBoolean,
									z.ZodArray<
										z.ZodEnum<["disable", "none", "minimal", "low", "medium", "high"]>,
										"many"
									>,
								]
							>
						>
						requiredReasoningEffort: z.ZodOptional<z.ZodBoolean>
						preserveReasoning: z.ZodOptional<z.ZodBoolean>
						supportedParameters: z.ZodOptional<
							z.ZodArray<
								z.ZodEnum<["max_tokens", "temperature", "reasoning", "include_reasoning"]>,
								"many"
							>
						>
						inputPrice: z.ZodOptional<z.ZodNumber>
						outputPrice: z.ZodOptional<z.ZodNumber>
						cacheWritesPrice: z.ZodOptional<z.ZodNumber>
						cacheReadsPrice: z.ZodOptional<z.ZodNumber>
						description: z.ZodOptional<z.ZodString>
						reasoningEffort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>
						minTokensPerCachePoint: z.ZodOptional<z.ZodNumber>
						maxCachePoints: z.ZodOptional<z.ZodNumber>
						cachableFields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
						displayName: z.ZodOptional<z.ZodNullable<z.ZodString>>
						preferredIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
						deprecated: z.ZodOptional<z.ZodBoolean>
						isFree: z.ZodOptional<z.ZodBoolean>
						supportsNativeTools: z.ZodOptional<z.ZodBoolean>
						tiers: z.ZodOptional<
							z.ZodArray<
								z.ZodObject<
									{
										name: z.ZodOptional<z.ZodEnum<["default", "flex", "priority"]>>
										contextWindow: z.ZodNumber
										inputPrice: z.ZodOptional<z.ZodNumber>
										outputPrice: z.ZodOptional<z.ZodNumber>
										cacheWritesPrice: z.ZodOptional<z.ZodNumber>
										cacheReadsPrice: z.ZodOptional<z.ZodNumber>
									},
									"strip",
									z.ZodTypeAny,
									{
										contextWindow: number
										name?: "default" | "flex" | "priority" | undefined
										inputPrice?: number | undefined
										outputPrice?: number | undefined
										cacheWritesPrice?: number | undefined
										cacheReadsPrice?: number | undefined
									},
									{
										contextWindow: number
										name?: "default" | "flex" | "priority" | undefined
										inputPrice?: number | undefined
										outputPrice?: number | undefined
										cacheWritesPrice?: number | undefined
										cacheReadsPrice?: number | undefined
									}
								>,
								"many"
							>
						>
					},
					"strip",
					z.ZodTypeAny,
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
					},
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
				>
			>
		>
		openAiUseAzure: z.ZodOptional<z.ZodBoolean>
		azureApiVersion: z.ZodOptional<z.ZodString>
		openAiStreamingEnabled: z.ZodOptional<z.ZodBoolean>
		openAiHostHeader: z.ZodOptional<z.ZodString>
		openAiHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>
		vertexKeyFile: z.ZodOptional<z.ZodString>
		vertexJsonCredentials: z.ZodOptional<z.ZodString>
		vertexProjectId: z.ZodOptional<z.ZodString>
		vertexRegion: z.ZodOptional<z.ZodString>
		awsAccessKey: z.ZodOptional<z.ZodString>
		awsSecretKey: z.ZodOptional<z.ZodString>
		awsSessionToken: z.ZodOptional<z.ZodString>
		awsRegion: z.ZodOptional<z.ZodString>
		awsUseCrossRegionInference: z.ZodOptional<z.ZodBoolean>
		awsUseGlobalInference: z.ZodOptional<z.ZodBoolean>
		awsUsePromptCache: z.ZodOptional<z.ZodBoolean>
		awsProfile: z.ZodOptional<z.ZodString>
		awsUseProfile: z.ZodOptional<z.ZodBoolean>
		awsApiKey: z.ZodOptional<z.ZodString>
		awsUseApiKey: z.ZodOptional<z.ZodBoolean>
		awsCustomArn: z.ZodOptional<z.ZodString>
		awsModelContextWindow: z.ZodOptional<z.ZodNumber>
		awsBedrockEndpointEnabled: z.ZodOptional<z.ZodBoolean>
		awsBedrockEndpoint: z.ZodOptional<z.ZodString>
		awsBedrock1MContext: z.ZodOptional<z.ZodBoolean>
		openRouterApiKey: z.ZodOptional<z.ZodString>
		openRouterModelId: z.ZodOptional<z.ZodString>
		openRouterBaseUrl: z.ZodOptional<z.ZodString>
		openRouterUseMiddleOutTransform: z.ZodOptional<z.ZodBoolean>
		nanoGptApiKey: z.ZodOptional<z.ZodString>
		nanoGptModelId: z.ZodOptional<z.ZodString>
		nanoGptModelList: z.ZodOptional<z.ZodEnum<["all", "personalized", "subscription"]>>
		glamaModelId: z.ZodOptional<z.ZodString>
		glamaApiKey: z.ZodOptional<z.ZodString>
		claudeCodePath: z.ZodOptional<z.ZodString>
		claudeCodeMaxOutputTokens: z.ZodOptional<z.ZodNumber>
		apiKey: z.ZodOptional<z.ZodString>
		anthropicBaseUrl: z.ZodOptional<z.ZodString>
		anthropicUseAuthToken: z.ZodOptional<z.ZodBoolean>
		anthropicDeploymentName: z.ZodOptional<z.ZodString>
		anthropicBeta1MContext: z.ZodOptional<z.ZodBoolean>
		apiProvider: z.ZodOptional<
			z.ZodEnum<
				[
					"openrouter",
					"vercel-ai-gateway",
					"huggingface",
					"litellm",
					"kilocode",
					"ovhcloud",
					"gemini",
					"inception",
					"synthetic",
					"sap-ai-core",
					"deepinfra",
					"io-intelligence",
					"requesty",
					"unbound",
					"glama",
					"roo",
					"chutes",
					"nano-gpt",
					"ollama",
					"lmstudio",
					"vscode-lm",
					"openai",
					"fake-ai",
					"human-relay",
					"anthropic",
					"bedrock",
					"cerebras",
					"claude-code",
					"doubao",
					"deepseek",
					"featherless",
					"fireworks",
					"gemini",
					"gemini-cli",
					"groq",
					"mistral",
					"moonshot",
					"minimax",
					"openai-native",
					"qwen-code",
					"roo",
					"kilocode",
					"minimax",
					"gemini-cli",
					"virtual-quota-fallback",
					"synthetic",
					"inception",
					"sambanova",
					"vertex",
					"xai",
					"zai",
				]
			>
		>
	} & {
		currentApiConfigName: z.ZodOptional<z.ZodString>
		listApiConfigMeta: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						id: z.ZodString
						name: z.ZodString
						apiProvider: z.ZodOptional<
							z.ZodEnum<
								[
									"openrouter",
									"vercel-ai-gateway",
									"huggingface",
									"litellm",
									"kilocode",
									"ovhcloud",
									"gemini",
									"inception",
									"synthetic",
									"sap-ai-core",
									"deepinfra",
									"io-intelligence",
									"requesty",
									"unbound",
									"glama",
									"roo",
									"chutes",
									"nano-gpt",
									"ollama",
									"lmstudio",
									"vscode-lm",
									"openai",
									"fake-ai",
									"human-relay",
									"anthropic",
									"bedrock",
									"cerebras",
									"claude-code",
									"doubao",
									"deepseek",
									"featherless",
									"fireworks",
									"gemini",
									"gemini-cli",
									"groq",
									"mistral",
									"moonshot",
									"minimax",
									"openai-native",
									"qwen-code",
									"roo",
									"kilocode",
									"minimax",
									"gemini-cli",
									"virtual-quota-fallback",
									"synthetic",
									"inception",
									"sambanova",
									"vertex",
									"xai",
									"zai",
								]
							>
						>
						modelId: z.ZodOptional<z.ZodString>
						profileType: z.ZodOptional<z.ZodEnum<["chat", "autocomplete"]>>
					},
					"strip",
					z.ZodTypeAny,
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
					},
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
					}
				>,
				"many"
			>
		>
		pinnedApiConfigs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		lastShownAnnouncementId: z.ZodOptional<z.ZodString>
		customInstructions: z.ZodOptional<z.ZodString>
		taskHistory: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						id: z.ZodString
						rootTaskId: z.ZodOptional<z.ZodString>
						parentTaskId: z.ZodOptional<z.ZodString>
						number: z.ZodNumber
						ts: z.ZodNumber
						task: z.ZodString
						tokensIn: z.ZodNumber
						tokensOut: z.ZodNumber
						cacheWrites: z.ZodOptional<z.ZodNumber>
						cacheReads: z.ZodOptional<z.ZodNumber>
						totalCost: z.ZodNumber
						size: z.ZodOptional<z.ZodNumber>
						workspace: z.ZodOptional<z.ZodString>
						isFavorited: z.ZodOptional<z.ZodBoolean>
						fileNotfound: z.ZodOptional<z.ZodBoolean>
						mode: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
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
					},
					{
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
					}
				>,
				"many"
			>
		>
		dismissedUpsells: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		openRouterImageApiKey: z.ZodOptional<z.ZodString>
		openRouterImageGenerationSelectedModel: z.ZodOptional<z.ZodString>
		kiloCodeImageApiKey: z.ZodOptional<z.ZodString>
		condensingApiConfigId: z.ZodOptional<z.ZodString>
		customCondensingPrompt: z.ZodOptional<z.ZodString>
		autoApprovalEnabled: z.ZodOptional<z.ZodBoolean>
		yoloMode: z.ZodOptional<z.ZodBoolean>
		yoloGatekeeperApiConfigId: z.ZodOptional<z.ZodString>
		alwaysAllowReadOnly: z.ZodOptional<z.ZodBoolean>
		alwaysAllowReadOnlyOutsideWorkspace: z.ZodOptional<z.ZodBoolean>
		alwaysAllowWrite: z.ZodOptional<z.ZodBoolean>
		alwaysAllowWriteOutsideWorkspace: z.ZodOptional<z.ZodBoolean>
		alwaysAllowWriteProtected: z.ZodOptional<z.ZodBoolean>
		writeDelayMs: z.ZodOptional<z.ZodNumber>
		alwaysAllowBrowser: z.ZodOptional<z.ZodBoolean>
		alwaysApproveResubmit: z.ZodOptional<z.ZodBoolean>
		requestDelaySeconds: z.ZodOptional<z.ZodNumber>
		alwaysAllowMcp: z.ZodOptional<z.ZodBoolean>
		alwaysAllowModeSwitch: z.ZodOptional<z.ZodBoolean>
		alwaysAllowSubtasks: z.ZodOptional<z.ZodBoolean>
		alwaysAllowExecute: z.ZodOptional<z.ZodBoolean>
		alwaysAllowFollowupQuestions: z.ZodOptional<z.ZodBoolean>
		followupAutoApproveTimeoutMs: z.ZodOptional<z.ZodNumber>
		alwaysAllowUpdateTodoList: z.ZodOptional<z.ZodBoolean>
		allowedCommands: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		deniedCommands: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		commandExecutionTimeout: z.ZodOptional<z.ZodNumber>
		commandTimeoutAllowlist: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		preventCompletionWithOpenTodos: z.ZodOptional<z.ZodBoolean>
		allowedMaxRequests: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		allowedMaxCost: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		autoCondenseContext: z.ZodOptional<z.ZodBoolean>
		autoCondenseContextPercent: z.ZodOptional<z.ZodNumber>
		maxConcurrentFileReads: z.ZodOptional<z.ZodNumber>
		allowVeryLargeReads: z.ZodOptional<z.ZodBoolean>
		includeCurrentTime: z.ZodOptional<z.ZodBoolean>
		includeCurrentCost: z.ZodOptional<z.ZodBoolean>
		includeDiagnosticMessages: z.ZodOptional<z.ZodBoolean>
		maxDiagnosticMessages: z.ZodOptional<z.ZodNumber>
		browserToolEnabled: z.ZodOptional<z.ZodBoolean>
		browserViewportSize: z.ZodOptional<z.ZodString>
		showAutoApproveMenu: z.ZodOptional<z.ZodBoolean>
		showTaskTimeline: z.ZodOptional<z.ZodBoolean>
		sendMessageOnEnter: z.ZodOptional<z.ZodBoolean>
		showTimestamps: z.ZodOptional<z.ZodBoolean>
		hideCostBelowThreshold: z.ZodOptional<z.ZodNumber>
		localWorkflowToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		globalWorkflowToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		localRulesToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		globalRulesToggles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>
		screenshotQuality: z.ZodOptional<z.ZodNumber>
		remoteBrowserEnabled: z.ZodOptional<z.ZodBoolean>
		remoteBrowserHost: z.ZodOptional<z.ZodString>
		cachedChromeHostUrl: z.ZodOptional<z.ZodString>
		enableCheckpoints: z.ZodOptional<z.ZodBoolean>
		checkpointTimeout: z.ZodOptional<z.ZodNumber>
		autoPurgeEnabled: z.ZodOptional<z.ZodBoolean>
		autoPurgeDefaultRetentionDays: z.ZodOptional<z.ZodNumber>
		autoPurgeFavoritedTaskRetentionDays: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		autoPurgeCompletedTaskRetentionDays: z.ZodOptional<z.ZodNumber>
		autoPurgeIncompleteTaskRetentionDays: z.ZodOptional<z.ZodNumber>
		autoPurgeLastRunTimestamp: z.ZodOptional<z.ZodNumber>
		ttsEnabled: z.ZodOptional<z.ZodBoolean>
		ttsSpeed: z.ZodOptional<z.ZodNumber>
		soundEnabled: z.ZodOptional<z.ZodBoolean>
		soundVolume: z.ZodOptional<z.ZodNumber>
		systemNotificationsEnabled: z.ZodOptional<z.ZodBoolean>
		maxOpenTabsContext: z.ZodOptional<z.ZodNumber>
		maxWorkspaceFiles: z.ZodOptional<z.ZodNumber>
		showRooIgnoredFiles: z.ZodOptional<z.ZodBoolean>
		maxReadFileLine: z.ZodOptional<z.ZodNumber>
		maxImageFileSize: z.ZodOptional<z.ZodNumber>
		maxTotalImageSize: z.ZodOptional<z.ZodNumber>
		terminalOutputLineLimit: z.ZodOptional<z.ZodNumber>
		terminalOutputCharacterLimit: z.ZodOptional<z.ZodNumber>
		terminalShellIntegrationTimeout: z.ZodOptional<z.ZodNumber>
		terminalShellIntegrationDisabled: z.ZodOptional<z.ZodBoolean>
		terminalCommandDelay: z.ZodOptional<z.ZodNumber>
		terminalPowershellCounter: z.ZodOptional<z.ZodBoolean>
		terminalZshClearEolMark: z.ZodOptional<z.ZodBoolean>
		terminalZshOhMy: z.ZodOptional<z.ZodBoolean>
		terminalZshP10k: z.ZodOptional<z.ZodBoolean>
		terminalZdotdir: z.ZodOptional<z.ZodBoolean>
		terminalCompressProgressBar: z.ZodOptional<z.ZodBoolean>
		diagnosticsEnabled: z.ZodOptional<z.ZodBoolean>
		rateLimitSeconds: z.ZodOptional<z.ZodNumber>
		diffEnabled: z.ZodOptional<z.ZodBoolean>
		fuzzyMatchThreshold: z.ZodOptional<z.ZodNumber>
		experiments: z.ZodOptional<
			z.ZodObject<
				{
					morphFastApply: z.ZodOptional<z.ZodBoolean>
					powerSteering: z.ZodOptional<z.ZodBoolean>
					multiFileApplyDiff: z.ZodOptional<z.ZodBoolean>
					preventFocusDisruption: z.ZodOptional<z.ZodBoolean>
					imageGeneration: z.ZodOptional<z.ZodBoolean>
					runSlashCommand: z.ZodOptional<z.ZodBoolean>
				},
				"strip",
				z.ZodTypeAny,
				{
					morphFastApply?: boolean | undefined
					powerSteering?: boolean | undefined
					multiFileApplyDiff?: boolean | undefined
					preventFocusDisruption?: boolean | undefined
					imageGeneration?: boolean | undefined
					runSlashCommand?: boolean | undefined
				},
				{
					morphFastApply?: boolean | undefined
					powerSteering?: boolean | undefined
					multiFileApplyDiff?: boolean | undefined
					preventFocusDisruption?: boolean | undefined
					imageGeneration?: boolean | undefined
					runSlashCommand?: boolean | undefined
				}
			>
		>
		morphApiKey: z.ZodOptional<z.ZodString>
		fastApplyModel: z.ZodOptional<
			z.ZodEnum<["auto", "morph/morph-v3-fast", "morph/morph-v3-large", "relace/relace-apply-3"]>
		>
		fastApplyApiProvider: z.ZodOptional<z.ZodEnum<["current", "morph", "kilocode", "openrouter"]>>
		codebaseIndexModels: z.ZodOptional<
			z.ZodObject<
				{
					openai: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					ollama: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					"openai-compatible": z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					gemini: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					mistral: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					"vercel-ai-gateway": z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
					openrouter: z.ZodOptional<
						z.ZodRecord<
							z.ZodString,
							z.ZodObject<
								{
									dimension: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									dimension: number
								},
								{
									dimension: number
								}
							>
						>
					>
				},
				"strip",
				z.ZodTypeAny,
				{
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
				},
				{
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
			>
		>
		codebaseIndexConfig: z.ZodOptional<
			z.ZodObject<
				{
					codebaseIndexEnabled: z.ZodOptional<z.ZodBoolean>
					codebaseIndexQdrantUrl: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderProvider: z.ZodOptional<
						z.ZodEnum<
							[
								"openai",
								"ollama",
								"openai-compatible",
								"gemini",
								"mistral",
								"vercel-ai-gateway",
								"openrouter",
							]
						>
					>
					codebaseIndexVectorStoreProvider: z.ZodOptional<z.ZodEnum<["lancedb", "qdrant"]>>
					codebaseIndexLancedbVectorStoreDirectory: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderBaseUrl: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderModelId: z.ZodOptional<z.ZodString>
					codebaseIndexEmbedderModelDimension: z.ZodOptional<z.ZodNumber>
					codebaseIndexSearchMinScore: z.ZodOptional<z.ZodNumber>
					codebaseIndexSearchMaxResults: z.ZodOptional<z.ZodNumber>
					codebaseIndexOpenAiCompatibleBaseUrl: z.ZodOptional<z.ZodString>
					codebaseIndexOpenAiCompatibleModelDimension: z.ZodOptional<z.ZodNumber>
				},
				"strip",
				z.ZodTypeAny,
				{
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
				},
				{
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
			>
		>
		language: z.ZodOptional<
			z.ZodEnum<
				[
					"ar",
					"cs",
					"th",
					"uk",
					"ca",
					"de",
					"en",
					"es",
					"fr",
					"hi",
					"id",
					"it",
					"ja",
					"ko",
					"nl",
					"pl",
					"pt-BR",
					"ru",
					"tr",
					"vi",
					"zh-CN",
					"zh-TW",
				]
			>
		>
		telemetrySetting: z.ZodOptional<z.ZodEnum<["unset", "enabled", "disabled"]>>
		mcpEnabled: z.ZodOptional<z.ZodBoolean>
		enableMcpServerCreation: z.ZodOptional<z.ZodBoolean>
		mcpMarketplaceCatalog: z.ZodOptional<z.ZodAny>
		mode: z.ZodOptional<z.ZodString>
		modeApiConfigs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>
		customModes: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						slug: z.ZodString
						name: z.ZodString
						roleDefinition: z.ZodString
						whenToUse: z.ZodOptional<z.ZodString>
						description: z.ZodOptional<z.ZodString>
						customInstructions: z.ZodOptional<z.ZodString>
						groups: z.ZodEffects<
							z.ZodArray<
								z.ZodUnion<
									[
										z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
										z.ZodTuple<
											[
												z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
												z.ZodObject<
													{
														fileRegex: z.ZodEffects<
															z.ZodOptional<z.ZodString>,
															string | undefined,
															string | undefined
														>
														description: z.ZodOptional<z.ZodString>
													},
													"strip",
													z.ZodTypeAny,
													{
														description?: string | undefined
														fileRegex?: string | undefined
													},
													{
														description?: string | undefined
														fileRegex?: string | undefined
													}
												>,
											],
											null
										>,
									]
								>,
								"many"
							>,
							(
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
							)[],
							(
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
						>
						source: z.ZodOptional<z.ZodEnum<["global", "project", "organization"]>>
						iconName: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
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
					},
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
					}
				>,
				"many"
			>
		>
		customModePrompts: z.ZodOptional<
			z.ZodRecord<
				z.ZodString,
				z.ZodOptional<
					z.ZodObject<
						{
							roleDefinition: z.ZodOptional<z.ZodString>
							whenToUse: z.ZodOptional<z.ZodString>
							description: z.ZodOptional<z.ZodString>
							customInstructions: z.ZodOptional<z.ZodString>
						},
						"strip",
						z.ZodTypeAny,
						{
							description?: string | undefined
							roleDefinition?: string | undefined
							whenToUse?: string | undefined
							customInstructions?: string | undefined
						},
						{
							description?: string | undefined
							roleDefinition?: string | undefined
							whenToUse?: string | undefined
							customInstructions?: string | undefined
						}
					>
				>
			>
		>
		customSupportPrompts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodString>>>
		enhancementApiConfigId: z.ZodOptional<z.ZodString>
		dismissedNotificationIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		commitMessageApiConfigId: z.ZodOptional<z.ZodString>
		terminalCommandApiConfigId: z.ZodOptional<z.ZodString>
		ghostServiceSettings: z.ZodOptional<
			z.ZodObject<
				{
					enableAutoTrigger: z.ZodOptional<z.ZodBoolean>
					enableQuickInlineTaskKeybinding: z.ZodOptional<z.ZodBoolean>
					enableSmartInlineTaskKeybinding: z.ZodOptional<z.ZodBoolean>
					useNewAutocomplete: z.ZodOptional<z.ZodBoolean>
					provider: z.ZodOptional<z.ZodString>
					model: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					enableAutoTrigger?: boolean | undefined
					enableQuickInlineTaskKeybinding?: boolean | undefined
					enableSmartInlineTaskKeybinding?: boolean | undefined
					useNewAutocomplete?: boolean | undefined
					provider?: string | undefined
					model?: string | undefined
				},
				{
					enableAutoTrigger?: boolean | undefined
					enableQuickInlineTaskKeybinding?: boolean | undefined
					enableSmartInlineTaskKeybinding?: boolean | undefined
					useNewAutocomplete?: boolean | undefined
					provider?: string | undefined
					model?: string | undefined
				}
			>
		>
		hasPerformedOrganizationAutoSwitch: z.ZodOptional<z.ZodBoolean>
		includeTaskHistoryInEnhance: z.ZodOptional<z.ZodBoolean>
		historyPreviewCollapsed: z.ZodOptional<z.ZodBoolean>
		reasoningBlockCollapsed: z.ZodOptional<z.ZodBoolean>
		profileThresholds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>
		hasOpenedModeSelector: z.ZodOptional<z.ZodBoolean>
		lastModeExportPath: z.ZodOptional<z.ZodString>
		lastModeImportPath: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
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
		fastApplyModel?: "auto" | "morph/morph-v3-fast" | "morph/morph-v3-large" | "relace/relace-apply-3" | undefined
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
		mcpMarketplaceCatalog?: unknown
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
	},
	{
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
		fastApplyModel?: "auto" | "morph/morph-v3-fast" | "morph/morph-v3-large" | "relace/relace-apply-3" | undefined
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
		mcpMarketplaceCatalog?: unknown
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
	}
>
export type RooCodeSettings = GlobalSettings & ProviderSettings
/**
 * SecretState
 */
export declare const SECRET_STATE_KEYS: readonly [
	"apiKey",
	"glamaApiKey",
	"openRouterApiKey",
	"awsAccessKey",
	"awsApiKey",
	"awsSecretKey",
	"awsSessionToken",
	"openAiApiKey",
	"ollamaApiKey",
	"geminiApiKey",
	"openAiNativeApiKey",
	"cerebrasApiKey",
	"deepSeekApiKey",
	"doubaoApiKey",
	"moonshotApiKey",
	"mistralApiKey",
	"minimaxApiKey",
	"unboundApiKey",
	"requestyApiKey",
	"xaiApiKey",
	"groqApiKey",
	"chutesApiKey",
	"litellmApiKey",
	"deepInfraApiKey",
	"codeIndexOpenAiKey",
	"codeIndexQdrantApiKey",
	"minimaxApiKey",
	"kilocodeToken",
	"syntheticApiKey",
	"ovhCloudAiEndpointsApiKey",
	"inceptionLabsApiKey",
	"codebaseIndexOpenAiCompatibleApiKey",
	"codebaseIndexGeminiApiKey",
	"codebaseIndexMistralApiKey",
	"codebaseIndexVercelAiGatewayApiKey",
	"codebaseIndexOpenRouterApiKey",
	"huggingFaceApiKey",
	"sambaNovaApiKey",
	"zaiApiKey",
	"fireworksApiKey",
	"featherlessApiKey",
	"ioIntelligenceApiKey",
	"vercelAiGatewayApiKey",
	"sapAiCoreServiceKey",
]
export declare const GLOBAL_SECRET_KEYS: readonly ["openRouterImageApiKey", "kiloCodeImageApiKey"]
type ProviderSecretKey = (typeof SECRET_STATE_KEYS)[number]
type GlobalSecretKey = (typeof GLOBAL_SECRET_KEYS)[number]
export type SecretState = Pick<ProviderSettings, Extract<ProviderSecretKey, keyof ProviderSettings>> & {
	[K in GlobalSecretKey]?: string
}
export declare const isSecretStateKey: (key: string) => key is Keys<SecretState>
/**
 * GlobalState
 */
export type GlobalState = Omit<RooCodeSettings, Keys<SecretState>>
export declare const GLOBAL_STATE_KEYS: Keys<GlobalState>[]
export declare const isGlobalStateKey: (key: string) => key is Keys<GlobalState>
/**
 * Evals
 */
export declare const EVALS_SETTINGS: RooCodeSettings
export declare const EVALS_TIMEOUT: number
export {}
//# sourceMappingURL=global-settings.d.ts.map
