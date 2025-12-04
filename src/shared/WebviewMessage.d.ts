import { z } from "zod"
import {
	type RooCodeSettings,
	type ProviderSettings,
	type PromptComponent,
	type ModeConfig,
	type InstallMarketplaceItemOptions,
	type MarketplaceItem,
	type ShareVisibility,
	type QueuedMessage,
	CommitRange,
	HistoryItem,
	GlobalState,
} from "@roo-code/types"
import { Mode } from "./modes"
export type ClineAskResponse =
	| "yesButtonClicked"
	| "noButtonClicked"
	| "messageResponse"
	| "objectResponse"
	| "retry_clicked"
export type PromptMode = Mode | "enhance"
export type AudioType = "notification" | "celebration" | "progress_loop"
export interface UpdateTodoListPayload {
	todos: any[]
}
export type EditQueuedMessagePayload = Pick<QueuedMessage, "id" | "text" | "images">
export type GlobalStateValue<K extends keyof GlobalState> = GlobalState[K]
export type UpdateGlobalStateMessage<K extends keyof GlobalState = keyof GlobalState> = {
	type: "updateGlobalState"
	stateKey: K
	stateValue: GlobalStateValue<K>
}
export interface WebviewMessage {
	type:
		| "updateTodoList"
		| "deleteMultipleTasksWithIds"
		| "currentApiConfigName"
		| "saveApiConfiguration"
		| "upsertApiConfiguration"
		| "deleteApiConfiguration"
		| "loadApiConfiguration"
		| "loadApiConfigurationById"
		| "getProfileConfigurationForEditing"
		| "renameApiConfiguration"
		| "getListApiConfiguration"
		| "customInstructions"
		| "webviewDidLaunch"
		| "newTask"
		| "askResponse"
		| "terminalOperation"
		| "clearTask"
		| "didShowAnnouncement"
		| "selectImages"
		| "exportCurrentTask"
		| "shareCurrentTask"
		| "showTaskWithId"
		| "deleteTaskWithId"
		| "exportTaskWithId"
		| "importSettings"
		| "toggleToolAutoApprove"
		| "openExtensionSettings"
		| "openInBrowser"
		| "fetchOpenGraphData"
		| "checkIsImageUrl"
		| "exportSettings"
		| "resetState"
		| "flushRouterModels"
		| "requestRouterModels"
		| "requestOpenAiModels"
		| "requestOllamaModels"
		| "requestLmStudioModels"
		| "requestRooModels"
		| "requestVsCodeLmModels"
		| "requestHuggingFaceModels"
		| "requestSapAiCoreModels"
		| "requestSapAiCoreDeployments"
		| "openImage"
		| "saveImage"
		| "openFile"
		| "openMention"
		| "cancelTask"
		| "updateVSCodeSetting"
		| "getVSCodeSetting"
		| "vsCodeSetting"
		| "updateCondensingPrompt"
		| "yoloGatekeeperApiConfigId"
		| "playSound"
		| "playTts"
		| "stopTts"
		| "ttsEnabled"
		| "ttsSpeed"
		| "openKeyboardShortcuts"
		| "openMcpSettings"
		| "openProjectMcpSettings"
		| "restartMcpServer"
		| "refreshAllMcpServers"
		| "toggleToolAlwaysAllow"
		| "toggleToolEnabledForPrompt"
		| "toggleMcpServer"
		| "updateMcpTimeout"
		| "morphApiKey"
		| "fastApplyModel"
		| "fastApplyApiProvider"
		| "enhancePrompt"
		| "enhancedPrompt"
		| "draggedImages"
		| "deleteMessage"
		| "deleteMessageConfirm"
		| "submitEditedMessage"
		| "editMessageConfirm"
		| "enableMcpServerCreation"
		| "remoteControlEnabled"
		| "taskSyncEnabled"
		| "searchCommits"
		| "setApiConfigPassword"
		| "mode"
		| "updatePrompt"
		| "getSystemPrompt"
		| "copySystemPrompt"
		| "systemPrompt"
		| "enhancementApiConfigId"
		| "commitMessageApiConfigId"
		| "terminalCommandApiConfigId"
		| "ghostServiceSettings"
		| "autoApprovalEnabled"
		| "yoloMode"
		| "updateCustomMode"
		| "deleteCustomMode"
		| "setopenAiCustomModelInfo"
		| "openCustomModesSettings"
		| "checkpointDiff"
		| "checkpointRestore"
		| "requestCheckpointRestoreApproval"
		| "seeNewChanges"
		| "deleteMcpServer"
		| "humanRelayResponse"
		| "humanRelayCancel"
		| "insertTextToChatArea"
		| "codebaseIndexEnabled"
		| "telemetrySetting"
		| "testBrowserConnection"
		| "browserConnectionResult"
		| "allowVeryLargeReads"
		| "showFeedbackOptions"
		| "fetchMcpMarketplace"
		| "silentlyRefreshMcpMarketplace"
		| "fetchLatestMcpServersFromHub"
		| "downloadMcp"
		| "showSystemNotification"
		| "showAutoApproveMenu"
		| "reportBug"
		| "profileButtonClicked"
		| "fetchProfileDataRequest"
		| "profileDataResponse"
		| "fetchBalanceDataRequest"
		| "shopBuyCredits"
		| "balanceDataResponse"
		| "updateProfileData"
		| "condense"
		| "toggleWorkflow"
		| "refreshRules"
		| "toggleRule"
		| "createRuleFile"
		| "deleteRuleFile"
		| "searchFiles"
		| "toggleApiConfigPin"
		| "hasOpenedModeSelector"
		| "cloudButtonClicked"
		| "rooCloudSignIn"
		| "cloudLandingPageSignIn"
		| "rooCloudSignOut"
		| "rooCloudManualUrl"
		| "switchOrganization"
		| "condenseTaskContextRequest"
		| "requestIndexingStatus"
		| "startIndexing"
		| "cancelIndexing"
		| "clearIndexData"
		| "indexingStatusUpdate"
		| "indexCleared"
		| "focusPanelRequest"
		| "clearUsageData"
		| "getUsageData"
		| "usageDataResponse"
		| "showTaskTimeline"
		| "sendMessageOnEnter"
		| "showTimestamps"
		| "hideCostBelowThreshold"
		| "toggleTaskFavorite"
		| "fixMermaidSyntax"
		| "mermaidFixResponse"
		| "openGlobalKeybindings"
		| "getKeybindings"
		| "setReasoningBlockCollapsed"
		| "setHistoryPreviewCollapsed"
		| "openExternal"
		| "filterMarketplaceItems"
		| "mcpButtonClicked"
		| "marketplaceButtonClicked"
		| "installMarketplaceItem"
		| "installMarketplaceItemWithParameters"
		| "cancelMarketplaceInstall"
		| "removeInstalledMarketplaceItem"
		| "marketplaceInstallResult"
		| "fetchMarketplaceData"
		| "switchTab"
		| "editMessage"
		| "systemNotificationsEnabled"
		| "dismissNotificationId"
		| "tasksByIdRequest"
		| "taskHistoryRequest"
		| "updateGlobalState"
		| "autoPurgeEnabled"
		| "autoPurgeDefaultRetentionDays"
		| "autoPurgeFavoritedTaskRetentionDays"
		| "autoPurgeCompletedTaskRetentionDays"
		| "autoPurgeIncompleteTaskRetentionDays"
		| "manualPurge"
		| "shareTaskSuccess"
		| "exportMode"
		| "exportModeResult"
		| "importMode"
		| "importModeResult"
		| "checkRulesDirectory"
		| "checkRulesDirectoryResult"
		| "saveCodeIndexSettingsAtomic"
		| "requestCodeIndexSecretStatus"
		| "fetchKilocodeNotifications"
		| "requestCommands"
		| "openCommandFile"
		| "deleteCommand"
		| "createCommand"
		| "insertTextIntoTextarea"
		| "showMdmAuthRequiredNotification"
		| "imageGenerationSettings"
		| "kiloCodeImageApiKey"
		| "queueMessage"
		| "removeQueuedMessage"
		| "editQueuedMessage"
		| "dismissUpsell"
		| "getDismissedUpsells"
		| "updateSettings"
		| "requestManagedIndexerState"
		| "addTaskToHistory"
		| "singleCompletion"
	text?: string
	completionRequestId?: string
	editedMessageContent?: string
	tab?: "settings" | "history" | "mcp" | "modes" | "chat" | "marketplace" | "cloud"
	disabled?: boolean
	context?: string
	dataUri?: string
	askResponse?: ClineAskResponse
	apiConfiguration?: ProviderSettings
	images?: string[]
	bool?: boolean
	value?: number
	commands?: string[]
	audioType?: AudioType
	notificationOptions?: {
		title?: string
		subtitle?: string
		message: string
	}
	mcpId?: string
	toolNames?: string[]
	autoApprove?: boolean
	workflowPath?: string
	enabled?: boolean
	rulePath?: string
	isGlobal?: boolean
	filename?: string
	ruleType?: string
	notificationId?: string
	commandIds?: string[]
	serverName?: string
	toolName?: string
	alwaysAllow?: boolean
	isEnabled?: boolean
	mode?: Mode
	promptMode?: PromptMode
	customPrompt?: PromptComponent
	dataUrls?: string[]
	values?: Record<string, any>
	query?: string
	setting?: string
	slug?: string
	modeConfig?: ModeConfig
	timeout?: number
	payload?: WebViewMessagePayload
	source?: "global" | "project"
	requestId?: string
	ids?: string[]
	hasSystemPromptOverride?: boolean
	terminalOperation?: "continue" | "abort"
	messageTs?: number
	restoreCheckpoint?: boolean
	historyPreviewCollapsed?: boolean
	filters?: {
		type?: string
		search?: string
		tags?: string[]
	}
	settings?: any
	url?: string
	mpItem?: MarketplaceItem
	mpInstallOptions?: InstallMarketplaceItemOptions
	config?: Record<string, any>
	visibility?: ShareVisibility
	hasContent?: boolean
	checkOnly?: boolean
	upsellId?: string
	list?: string[]
	organizationId?: string | null
	historyItem?: HistoryItem
	codeIndexSettings?: {
		codebaseIndexEnabled: boolean
		codebaseIndexQdrantUrl: string
		codebaseIndexEmbedderProvider:
			| "openai"
			| "ollama"
			| "openai-compatible"
			| "gemini"
			| "mistral"
			| "vercel-ai-gateway"
			| "openrouter"
		codebaseIndexVectorStoreProvider?: "lancedb" | "qdrant"
		codebaseIndexLancedbVectorStoreDirectory?: string
		codebaseIndexEmbedderBaseUrl?: string
		codebaseIndexEmbedderModelId: string
		codebaseIndexEmbedderModelDimension?: number
		codebaseIndexOpenAiCompatibleBaseUrl?: string
		codebaseIndexSearchMaxResults?: number
		codebaseIndexSearchMinScore?: number
		codeIndexOpenAiKey?: string
		codeIndexQdrantApiKey?: string
		codebaseIndexOpenAiCompatibleApiKey?: string
		codebaseIndexGeminiApiKey?: string
		codebaseIndexMistralApiKey?: string
		codebaseIndexVercelAiGatewayApiKey?: string
		codebaseIndexOpenRouterApiKey?: string
	}
	updatedSettings?: RooCodeSettings
}
export type MaybeTypedWebviewMessage = WebviewMessage | UpdateGlobalStateMessage
export type OrganizationRole = "owner" | "admin" | "member"
export type UserOrganizationWithApiKey = {
	id: string
	name: string
	balance: number
	role: OrganizationRole
	apiKey: string
}
export type ProfileData = {
	kilocodeToken: string
	user: {
		id: string
		name: string
		email: string
		image: string
	}
	organizations?: UserOrganizationWithApiKey[]
}
export interface ProfileDataResponsePayload {
	success: boolean
	data?: ProfileData
	error?: string
}
export interface BalanceDataResponsePayload {
	success: boolean
	data?: any
	error?: string
}
export interface SeeNewChangesPayload {
	commitRange: CommitRange
}
export interface TasksByIdRequestPayload {
	requestId: string
	taskIds: string[]
}
export interface TaskHistoryRequestPayload {
	requestId: string
	workspace: "current" | "all"
	sort: "newest" | "oldest" | "mostExpensive" | "mostTokens" | "mostRelevant"
	favoritesOnly: boolean
	pageIndex: number
	search?: string
}
export interface TasksByIdResponsePayload {
	requestId: string
	tasks: HistoryItem[]
}
export interface TaskHistoryResponsePayload {
	requestId: string
	historyItems: HistoryItem[]
	pageIndex: number
	pageCount: number
}
export declare const checkoutDiffPayloadSchema: z.ZodObject<
	{
		ts: z.ZodOptional<z.ZodNumber>
		previousCommitHash: z.ZodOptional<z.ZodString>
		commitHash: z.ZodString
		mode: z.ZodEnum<["full", "checkpoint", "from-init", "to-current"]>
	},
	"strip",
	z.ZodTypeAny,
	{
		mode: "checkpoint" | "full" | "from-init" | "to-current"
		commitHash: string
		ts?: number | undefined
		previousCommitHash?: string | undefined
	},
	{
		mode: "checkpoint" | "full" | "from-init" | "to-current"
		commitHash: string
		ts?: number | undefined
		previousCommitHash?: string | undefined
	}
>
export type CheckpointDiffPayload = z.infer<typeof checkoutDiffPayloadSchema>
export declare const checkoutRestorePayloadSchema: z.ZodObject<
	{
		ts: z.ZodNumber
		commitHash: z.ZodString
		mode: z.ZodEnum<["preview", "restore"]>
	},
	"strip",
	z.ZodTypeAny,
	{
		ts: number
		mode: "preview" | "restore"
		commitHash: string
	},
	{
		ts: number
		mode: "preview" | "restore"
		commitHash: string
	}
>
export type CheckpointRestorePayload = z.infer<typeof checkoutRestorePayloadSchema>
export declare const requestCheckpointRestoreApprovalPayloadSchema: z.ZodObject<
	{
		commitHash: z.ZodString
		checkpointTs: z.ZodNumber
		messagesToRemove: z.ZodNumber
		confirmationText: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		commitHash: string
		checkpointTs: number
		messagesToRemove: number
		confirmationText: string
	},
	{
		commitHash: string
		checkpointTs: number
		messagesToRemove: number
		confirmationText: string
	}
>
export type RequestCheckpointRestoreApprovalPayload = z.infer<typeof requestCheckpointRestoreApprovalPayloadSchema>
export interface IndexingStatusPayload {
	state: "Standby" | "Indexing" | "Indexed" | "Error"
	message: string
}
export interface IndexClearedPayload {
	success: boolean
	error?: string
}
export declare const installMarketplaceItemWithParametersPayloadSchema: z.ZodObject<
	{
		item: z.ZodDiscriminatedUnion<
			"type",
			[
				z.ZodObject<
					{
						id: z.ZodString
						name: z.ZodString
						description: z.ZodString
						author: z.ZodOptional<z.ZodString>
						authorUrl: z.ZodOptional<z.ZodString>
						tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
						prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
					} & {
						content: z.ZodString
					} & {
						type: z.ZodLiteral<"mode">
					},
					"strip",
					z.ZodTypeAny,
					{
						type: "mode"
						id: string
						name: string
						description: string
						content: string
						tags?: string[] | undefined
						prerequisites?: string[] | undefined
						author?: string | undefined
						authorUrl?: string | undefined
					},
					{
						type: "mode"
						id: string
						name: string
						description: string
						content: string
						tags?: string[] | undefined
						prerequisites?: string[] | undefined
						author?: string | undefined
						authorUrl?: string | undefined
					}
				>,
				z.ZodObject<
					{
						id: z.ZodString
						name: z.ZodString
						description: z.ZodString
						author: z.ZodOptional<z.ZodString>
						authorUrl: z.ZodOptional<z.ZodString>
						tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
						prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
					} & {
						url: z.ZodString
						content: z.ZodUnion<
							[
								z.ZodString,
								z.ZodArray<
									z.ZodObject<
										{
											name: z.ZodString
											content: z.ZodString
											parameters: z.ZodOptional<
												z.ZodArray<
													z.ZodObject<
														{
															name: z.ZodString
															key: z.ZodString
															placeholder: z.ZodOptional<z.ZodString>
															optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
														},
														"strip",
														z.ZodTypeAny,
														{
															name: string
															key: string
															optional: boolean
															placeholder?: string | undefined
														},
														{
															name: string
															key: string
															placeholder?: string | undefined
															optional?: boolean | undefined
														}
													>,
													"many"
												>
											>
											prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
										},
										"strip",
										z.ZodTypeAny,
										{
											name: string
											content: string
											parameters?:
												| {
														name: string
														key: string
														optional: boolean
														placeholder?: string | undefined
												  }[]
												| undefined
											prerequisites?: string[] | undefined
										},
										{
											name: string
											content: string
											parameters?:
												| {
														name: string
														key: string
														placeholder?: string | undefined
														optional?: boolean | undefined
												  }[]
												| undefined
											prerequisites?: string[] | undefined
										}
									>,
									"many"
								>,
							]
						>
						parameters: z.ZodOptional<
							z.ZodArray<
								z.ZodObject<
									{
										name: z.ZodString
										key: z.ZodString
										placeholder: z.ZodOptional<z.ZodString>
										optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
									},
									"strip",
									z.ZodTypeAny,
									{
										name: string
										key: string
										optional: boolean
										placeholder?: string | undefined
									},
									{
										name: string
										key: string
										placeholder?: string | undefined
										optional?: boolean | undefined
									}
								>,
								"many"
							>
						>
					} & {
						type: z.ZodLiteral<"mcp">
					},
					"strip",
					z.ZodTypeAny,
					{
						type: "mcp"
						id: string
						name: string
						description: string
						url: string
						content:
							| string
							| {
									name: string
									content: string
									parameters?:
										| {
												name: string
												key: string
												optional: boolean
												placeholder?: string | undefined
										  }[]
										| undefined
									prerequisites?: string[] | undefined
							  }[]
						tags?: string[] | undefined
						parameters?:
							| {
									name: string
									key: string
									optional: boolean
									placeholder?: string | undefined
							  }[]
							| undefined
						prerequisites?: string[] | undefined
						author?: string | undefined
						authorUrl?: string | undefined
					},
					{
						type: "mcp"
						id: string
						name: string
						description: string
						url: string
						content:
							| string
							| {
									name: string
									content: string
									parameters?:
										| {
												name: string
												key: string
												placeholder?: string | undefined
												optional?: boolean | undefined
										  }[]
										| undefined
									prerequisites?: string[] | undefined
							  }[]
						tags?: string[] | undefined
						parameters?:
							| {
									name: string
									key: string
									placeholder?: string | undefined
									optional?: boolean | undefined
							  }[]
							| undefined
						prerequisites?: string[] | undefined
						author?: string | undefined
						authorUrl?: string | undefined
					}
				>,
			]
		>
		parameters: z.ZodRecord<z.ZodString, z.ZodAny>
	},
	"strip",
	z.ZodTypeAny,
	{
		parameters: Record<string, any>
		item:
			| {
					type: "mode"
					id: string
					name: string
					description: string
					content: string
					tags?: string[] | undefined
					prerequisites?: string[] | undefined
					author?: string | undefined
					authorUrl?: string | undefined
			  }
			| {
					type: "mcp"
					id: string
					name: string
					description: string
					url: string
					content:
						| string
						| {
								name: string
								content: string
								parameters?:
									| {
											name: string
											key: string
											optional: boolean
											placeholder?: string | undefined
									  }[]
									| undefined
								prerequisites?: string[] | undefined
						  }[]
					tags?: string[] | undefined
					parameters?:
						| {
								name: string
								key: string
								optional: boolean
								placeholder?: string | undefined
						  }[]
						| undefined
					prerequisites?: string[] | undefined
					author?: string | undefined
					authorUrl?: string | undefined
			  }
	},
	{
		parameters: Record<string, any>
		item:
			| {
					type: "mode"
					id: string
					name: string
					description: string
					content: string
					tags?: string[] | undefined
					prerequisites?: string[] | undefined
					author?: string | undefined
					authorUrl?: string | undefined
			  }
			| {
					type: "mcp"
					id: string
					name: string
					description: string
					url: string
					content:
						| string
						| {
								name: string
								content: string
								parameters?:
									| {
											name: string
											key: string
											placeholder?: string | undefined
											optional?: boolean | undefined
									  }[]
									| undefined
								prerequisites?: string[] | undefined
						  }[]
					tags?: string[] | undefined
					parameters?:
						| {
								name: string
								key: string
								placeholder?: string | undefined
								optional?: boolean | undefined
						  }[]
						| undefined
					prerequisites?: string[] | undefined
					author?: string | undefined
					authorUrl?: string | undefined
			  }
	}
>
export type InstallMarketplaceItemWithParametersPayload = z.infer<
	typeof installMarketplaceItemWithParametersPayloadSchema
>
export type WebViewMessagePayload =
	| ProfileDataResponsePayload
	| BalanceDataResponsePayload
	| SeeNewChangesPayload
	| TasksByIdRequestPayload
	| TaskHistoryRequestPayload
	| RequestCheckpointRestoreApprovalPayload
	| CheckpointDiffPayload
	| CheckpointRestorePayload
	| IndexingStatusPayload
	| IndexClearedPayload
	| InstallMarketplaceItemWithParametersPayload
	| UpdateTodoListPayload
	| EditQueuedMessagePayload
//# sourceMappingURL=WebviewMessage.d.ts.map
