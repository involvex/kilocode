import type {
	GlobalSettings,
	ProviderSettingsEntry,
	ProviderSettings,
	ModelInfo, // kilocode_change
	HistoryItem,
	ModeConfig,
	TelemetrySetting,
	Experiments,
	ClineMessage,
	MarketplaceItem,
	TodoItem,
	CloudUserInfo,
	CloudOrganizationMembership,
	OrganizationAllowList,
	ShareVisibility,
	QueuedMessage,
} from "@roo-code/types"
import { GitCommit } from "../utils/git"
import { McpServer } from "./mcp"
import { McpMarketplaceCatalog, McpDownloadResponse } from "./kilocode/mcp"
import { Mode } from "./modes"
import { ModelRecord, RouterModels } from "./api"
import {
	ProfileDataResponsePayload,
	BalanceDataResponsePayload,
	TaskHistoryResponsePayload,
	TasksByIdResponsePayload,
} from "./WebviewMessage"
import { ClineRulesToggles } from "./cline-rules"
import { KiloCodeWrapperProperties } from "./kilocode/wrapper"
import { DeploymentRecord } from "../api/providers/fetchers/sap-ai-core"
export interface Command {
	name: string
	source: "global" | "project" | "built-in"
	filePath?: string
	description?: string
	argumentHint?: string
}
export interface MarketplaceInstalledMetadata {
	project: Record<
		string,
		{
			type: string
		}
	>
	global: Record<
		string,
		{
			type: string
		}
	>
}
export interface IndexingStatus {
	systemStatus: string
	message?: string
	processedItems: number
	totalItems: number
	currentItemUnit?: string
	workspacePath?: string
	gitBranch?: string
	manifest?: {
		totalFiles: number
		totalChunks: number
		lastUpdated: string
	}
}
export interface IndexingStatusUpdateMessage {
	type: "indexingStatusUpdate"
	values: IndexingStatus
}
export interface LanguageModelChatSelector {
	vendor?: string
	family?: string
	version?: string
	id?: string
}
export interface ExtensionMessage {
	type:
		| "action"
		| "state"
		| "selectedImages"
		| "theme"
		| "workspaceUpdated"
		| "invoke"
		| "messageUpdated"
		| "mcpServers"
		| "enhancedPrompt"
		| "commitSearchResults"
		| "listApiConfig"
		| "routerModels"
		| "openAiModels"
		| "ollamaModels"
		| "lmStudioModels"
		| "vsCodeLmModels"
		| "huggingFaceModels"
		| "sapAiCoreModels"
		| "sapAiCoreDeployments"
		| "vsCodeLmApiAvailable"
		| "updatePrompt"
		| "systemPrompt"
		| "autoApprovalEnabled"
		| "yoloMode"
		| "updateCustomMode"
		| "deleteCustomMode"
		| "exportModeResult"
		| "importModeResult"
		| "checkRulesDirectoryResult"
		| "deleteCustomModeCheck"
		| "currentCheckpointUpdated"
		| "checkpointInitWarning"
		| "showHumanRelayDialog"
		| "humanRelayResponse"
		| "humanRelayCancel"
		| "insertTextToChatArea"
		| "browserToolEnabled"
		| "browserConnectionResult"
		| "remoteBrowserEnabled"
		| "ttsStart"
		| "ttsStop"
		| "maxReadFileLine"
		| "fileSearchResults"
		| "toggleApiConfigPin"
		| "mcpMarketplaceCatalog"
		| "mcpDownloadDetails"
		| "showSystemNotification"
		| "openInBrowser"
		| "acceptInput"
		| "focusChatInput"
		| "setHistoryPreviewCollapsed"
		| "commandExecutionStatus"
		| "mcpExecutionStatus"
		| "vsCodeSetting"
		| "profileDataResponse"
		| "balanceDataResponse"
		| "updateProfileData"
		| "profileConfigurationForEditing"
		| "authenticatedUser"
		| "condenseTaskContextResponse"
		| "singleRouterModelFetchResponse"
		| "indexingStatusUpdate"
		| "indexCleared"
		| "codebaseIndexConfig"
		| "rulesData"
		| "marketplaceInstallResult"
		| "marketplaceRemoveResult"
		| "marketplaceData"
		| "mermaidFixResponse"
		| "tasksByIdResponse"
		| "taskHistoryResponse"
		| "shareTaskSuccess"
		| "codeIndexSettingsSaved"
		| "codeIndexSecretStatus"
		| "showDeleteMessageDialog"
		| "showEditMessageDialog"
		| "kilocodeNotificationsResponse"
		| "usageDataResponse"
		| "keybindingsResponse"
		| "autoPurgeEnabled"
		| "autoPurgeDefaultRetentionDays"
		| "autoPurgeFavoritedTaskRetentionDays"
		| "autoPurgeCompletedTaskRetentionDays"
		| "autoPurgeIncompleteTaskRetentionDays"
		| "manualPurge"
		| "commands"
		| "insertTextIntoTextarea"
		| "dismissedUpsells"
		| "interactionRequired"
		| "organizationSwitchResult"
		| "showTimestamps"
		| "apiMessagesSaved"
		| "taskMessagesSaved"
		| "taskMetadataSaved"
		| "managedIndexerState"
		| "singleCompletionResult"
		| "managedIndexerState"
	text?: string
	completionRequestId?: string
	completionText?: string
	completionError?: string
	payload?:
		| ProfileDataResponsePayload
		| BalanceDataResponsePayload
		| TasksByIdResponsePayload
		| TaskHistoryResponsePayload
		| [string, string]
	checkpointWarning?: {
		type: "WAIT_TIMEOUT" | "INIT_TIMEOUT"
		timeout: number
	}
	action?:
		| "chatButtonClicked"
		| "mcpButtonClicked"
		| "settingsButtonClicked"
		| "historyButtonClicked"
		| "promptsButtonClicked"
		| "profileButtonClicked"
		| "marketplaceButtonClicked"
		| "cloudButtonClicked"
		| "didBecomeVisible"
		| "focusInput"
		| "switchTab"
		| "focusChatInput"
		| "toggleAutoApprove"
	invoke?: "newChat" | "sendMessage" | "primaryButtonClick" | "secondaryButtonClick" | "setChatBoxMessage"
	state?: ExtensionState
	images?: string[]
	filePaths?: string[]
	openedTabs?: Array<{
		label: string
		isActive: boolean
		path?: string
	}>
	clineMessage?: ClineMessage
	routerModels?: RouterModels
	openAiModels?: string[]
	ollamaModels?: ModelRecord
	lmStudioModels?: ModelRecord
	vsCodeLmModels?: {
		vendor?: string
		family?: string
		version?: string
		id?: string
	}[]
	huggingFaceModels?: Array<{
		id: string
		object: string
		created: number
		owned_by: string
		providers: Array<{
			provider: string
			status: "live" | "staging" | "error"
			supports_tools?: boolean
			supports_structured_output?: boolean
			context_length?: number
			pricing?: {
				input: number
				output: number
			}
		}>
	}>
	sapAiCoreModels?: ModelRecord
	sapAiCoreDeployments?: DeploymentRecord
	mcpServers?: McpServer[]
	commits?: GitCommit[]
	listApiConfig?: ProviderSettingsEntry[]
	apiConfiguration?: ProviderSettings
	mode?: Mode
	customMode?: ModeConfig
	slug?: string
	success?: boolean
	values?: Record<string, any>
	requestId?: string
	promptText?: string
	results?: {
		path: string
		type: "file" | "folder"
		label?: string
	}[]
	error?: string
	mcpMarketplaceCatalog?: McpMarketplaceCatalog
	mcpDownloadDetails?: McpDownloadResponse
	notificationOptions?: {
		title?: string
		subtitle?: string
		message: string
	}
	url?: string
	keybindings?: Record<string, string>
	setting?: string
	value?: any
	hasContent?: boolean
	items?: MarketplaceItem[]
	userInfo?: CloudUserInfo
	organizationAllowList?: OrganizationAllowList
	tab?: string
	globalRules?: ClineRulesToggles
	localRules?: ClineRulesToggles
	globalWorkflows?: ClineRulesToggles
	localWorkflows?: ClineRulesToggles
	marketplaceItems?: MarketplaceItem[]
	organizationMcps?: MarketplaceItem[]
	marketplaceInstalledMetadata?: MarketplaceInstalledMetadata
	fixedCode?: string | null
	errors?: string[]
	visibility?: ShareVisibility
	rulesFolderPath?: string
	settings?: any
	messageTs?: number
	hasCheckpoint?: boolean
	context?: string
	notifications?: Array<{
		id: string
		title: string
		message: string
		action?: {
			actionText: string
			actionURL: string
		}
	}>
	commands?: Command[]
	queuedMessages?: QueuedMessage[]
	list?: string[]
	organizationId?: string | null
	managedIndexerEnabled?: boolean
	managedIndexerState?: Array<{
		workspaceFolderPath: string
		workspaceFolderName: string
		gitBranch: string | null
		projectId: string | null
		isIndexing: boolean
		hasManifest: boolean
		manifestFileCount: number
		hasWatcher: boolean
		error?: {
			type: string
			message: string
			timestamp: string
			context?: {
				filePath?: string
				branch?: string
				operation?: string
			}
		}
	}>
}
export type ExtensionState = Pick<
	GlobalSettings,
	| "currentApiConfigName"
	| "listApiConfigMeta"
	| "pinnedApiConfigs"
	| "customInstructions"
	| "dismissedUpsells"
	| "autoApprovalEnabled"
	| "yoloMode"
	| "alwaysAllowReadOnly"
	| "alwaysAllowReadOnlyOutsideWorkspace"
	| "alwaysAllowWrite"
	| "alwaysAllowWriteOutsideWorkspace"
	| "alwaysAllowWriteProtected"
	| "alwaysAllowBrowser"
	| "alwaysApproveResubmit"
	| "alwaysAllowMcp"
	| "alwaysAllowModeSwitch"
	| "alwaysAllowSubtasks"
	| "alwaysAllowFollowupQuestions"
	| "alwaysAllowExecute"
	| "alwaysAllowUpdateTodoList"
	| "followupAutoApproveTimeoutMs"
	| "allowedCommands"
	| "deniedCommands"
	| "allowedMaxRequests"
	| "allowedMaxCost"
	| "browserToolEnabled"
	| "browserViewportSize"
	| "showAutoApproveMenu"
	| "hideCostBelowThreshold"
	| "screenshotQuality"
	| "remoteBrowserEnabled"
	| "cachedChromeHostUrl"
	| "remoteBrowserHost"
	| "ttsEnabled"
	| "ttsSpeed"
	| "soundEnabled"
	| "soundVolume"
	| "maxConcurrentFileReads"
	| "allowVeryLargeReads"
	| "terminalOutputLineLimit"
	| "terminalOutputCharacterLimit"
	| "terminalShellIntegrationTimeout"
	| "terminalShellIntegrationDisabled"
	| "terminalCommandDelay"
	| "terminalPowershellCounter"
	| "terminalZshClearEolMark"
	| "terminalZshOhMy"
	| "terminalZshP10k"
	| "terminalZdotdir"
	| "terminalCompressProgressBar"
	| "diagnosticsEnabled"
	| "diffEnabled"
	| "fuzzyMatchThreshold"
	| "morphApiKey"
	| "fastApplyModel"
	| "fastApplyApiProvider"
	| "language"
	| "modeApiConfigs"
	| "customModePrompts"
	| "customSupportPrompts"
	| "enhancementApiConfigId"
	| "localWorkflowToggles"
	| "globalRulesToggles"
	| "localRulesToggles"
	| "globalWorkflowToggles"
	| "commitMessageApiConfigId"
	| "terminalCommandApiConfigId"
	| "dismissedNotificationIds"
	| "ghostServiceSettings"
	| "autoPurgeEnabled"
	| "autoPurgeDefaultRetentionDays"
	| "autoPurgeFavoritedTaskRetentionDays"
	| "autoPurgeCompletedTaskRetentionDays"
	| "autoPurgeIncompleteTaskRetentionDays"
	| "autoPurgeLastRunTimestamp"
	| "condensingApiConfigId"
	| "customCondensingPrompt"
	| "yoloGatekeeperApiConfigId"
	| "codebaseIndexConfig"
	| "codebaseIndexModels"
	| "profileThresholds"
	| "systemNotificationsEnabled"
	| "includeDiagnosticMessages"
	| "maxDiagnosticMessages"
	| "openRouterImageGenerationSelectedModel"
	| "includeTaskHistoryInEnhance"
	| "reasoningBlockCollapsed"
	| "includeCurrentTime"
	| "includeCurrentCost"
> & {
	version: string
	clineMessages: ClineMessage[]
	currentTaskItem?: HistoryItem
	currentTaskTodos?: TodoItem[]
	apiConfiguration: ProviderSettings
	uriScheme?: string
	uiKind?: string
	kiloCodeWrapperProperties?: KiloCodeWrapperProperties
	kilocodeDefaultModel: string
	shouldShowAnnouncement: boolean
	taskHistoryFullLength: number
	taskHistoryVersion: number
	writeDelayMs: number
	requestDelaySeconds: number
	enableCheckpoints: boolean
	checkpointTimeout: number
	maxOpenTabsContext: number
	maxWorkspaceFiles: number
	showRooIgnoredFiles: boolean
	maxReadFileLine: number
	showAutoApproveMenu: boolean
	maxImageFileSize: number
	maxTotalImageSize: number
	experiments: Experiments
	mcpEnabled: boolean
	enableMcpServerCreation: boolean
	mode: Mode
	customModes: ModeConfig[]
	toolRequirements?: Record<string, boolean>
	cwd?: string
	telemetrySetting: TelemetrySetting
	telemetryKey?: string
	machineId?: string
	renderContext: "sidebar" | "editor"
	settingsImportedAt?: number
	historyPreviewCollapsed?: boolean
	showTaskTimeline?: boolean
	sendMessageOnEnter?: boolean
	hideCostBelowThreshold?: number
	cloudUserInfo: CloudUserInfo | null
	cloudIsAuthenticated: boolean
	cloudApiUrl?: string
	cloudOrganizations?: CloudOrganizationMembership[]
	sharingEnabled: boolean
	organizationAllowList: OrganizationAllowList
	organizationSettingsVersion?: number
	autoCondenseContext: boolean
	autoCondenseContextPercent: number
	marketplaceItems?: MarketplaceItem[]
	marketplaceInstalledMetadata?: {
		project: Record<string, any>
		global: Record<string, any>
	}
	profileThresholds: Record<string, number>
	hasOpenedModeSelector: boolean
	openRouterImageApiKey?: string
	kiloCodeImageApiKey?: string
	openRouterUseMiddleOutTransform?: boolean
	messageQueue?: QueuedMessage[]
	lastShownAnnouncementId?: string
	apiModelId?: string
	mcpServers?: McpServer[]
	hasSystemPromptOverride?: boolean
	mdmCompliant?: boolean
	remoteControlEnabled: boolean
	taskSyncEnabled: boolean
	featureRoomoteControlEnabled: boolean
	virtualQuotaActiveModel?: {
		id: string
		info: ModelInfo
	}
	showTimestamps?: boolean
}
export interface ClineSayTool {
	tool:
		| "editedExistingFile"
		| "appliedDiff"
		| "newFileCreated"
		| "codebaseSearch"
		| "readFile"
		| "fetchInstructions"
		| "listFilesTopLevel"
		| "listFilesRecursive"
		| "listCodeDefinitionNames"
		| "searchFiles"
		| "switchMode"
		| "newTask"
		| "finishTask"
		| "insertContent"
		| "generateImage"
		| "imageGenerated"
		| "runSlashCommand"
		| "updateTodoList"
		| "deleteFile"
	path?: string
	diff?: string
	content?: string
	diffStats?: {
		added: number
		removed: number
	}
	regex?: string
	filePattern?: string
	mode?: string
	reason?: string
	isOutsideWorkspace?: boolean
	isProtected?: boolean
	additionalFileCount?: number
	lineNumber?: number
	query?: string
	stats?: {
		files: number
		directories: number
		size: number
		isComplete: boolean
	}
	batchFiles?: Array<{
		path: string
		lineSnippet: string
		isOutsideWorkspace?: boolean
		key: string
		content?: string
	}>
	batchDiffs?: Array<{
		path: string
		changeCount: number
		key: string
		content: string
		diffStats?: {
			added: number
			removed: number
		}
		diffs?: Array<{
			content: string
			startLine?: number
		}>
	}>
	question?: string
	fastApplyResult?: {
		description?: string
		tokensIn?: number
		tokensOut?: number
		cost?: number
	}
	imageData?: string
	command?: string
	args?: string
	source?: string
	description?: string
}
export declare const browserActions: readonly [
	"launch",
	"click",
	"hover",
	"type",
	"scroll_down",
	"scroll_up",
	"resize",
	"close",
]
export type BrowserAction = (typeof browserActions)[number]
export interface ClineSayBrowserAction {
	action: BrowserAction
	coordinate?: string
	size?: string
	text?: string
}
export type BrowserActionResult = {
	screenshot?: string
	logs?: string
	currentUrl?: string
	currentMousePosition?: string
}
export interface ClineAskUseMcpServer {
	serverName: string
	type: "use_mcp_tool" | "access_mcp_resource"
	toolName?: string
	arguments?: string
	uri?: string
	response?: string
}
export interface ClineApiReqInfo {
	request?: string
	tokensIn?: number
	tokensOut?: number
	cacheWrites?: number
	cacheReads?: number
	cost?: number
	usageMissing?: boolean
	inferenceProvider?: string
	cancelReason?: ClineApiReqCancelReason
	streamingFailedMessage?: string
	apiProtocol?: "anthropic" | "openai"
}
export type ClineApiReqCancelReason = "streaming_failed" | "user_cancelled"
//# sourceMappingURL=ExtensionMessage.d.ts.map
