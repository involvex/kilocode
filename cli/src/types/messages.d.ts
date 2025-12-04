import type {
	ProviderSettings,
	ProviderSettingsEntry,
	ProviderName,
	HistoryItem,
	ModeConfig,
	TodoItem,
	ClineMessage,
} from "@roo-code/types/cli"
export type {
	WebviewMessage,
	MaybeTypedWebviewMessage,
	UpdateGlobalStateMessage,
	ClineAskResponse,
	TaskHistoryRequestPayload,
} from "@roo/WebviewMessage"
import type { McpServer, McpTool, McpResource } from "@roo/mcp"
export type { McpServer, McpTool, McpResource }
import type { RouterName, ModelInfo, ModelRecord, RouterModels } from "../constants/providers/models.js"
export type { ProviderSettings, ProviderSettingsEntry, ProviderName, HistoryItem, ModeConfig, TodoItem }
export type ExtensionChatMessage = ClineMessage
export type { RouterName, ModelInfo, ModelRecord, RouterModels }
export interface ExtensionMessage {
	type: string
	action?: string
	text?: string
	state?: ExtensionState
	images?: string[]
	chatMessages?: ExtensionChatMessage[]
	values?: Record<string, unknown>
	[key: string]: unknown
}
export interface OrganizationAllowList {
	allowAll: boolean
	providers: Record<
		string,
		{
			allowAll: boolean
			models?: string[]
		}
	>
}
export interface ExtensionState {
	version: string
	apiConfiguration: ProviderSettings
	currentApiConfigName?: string
	listApiConfigMeta?: ProviderSettingsEntry[]
	chatMessages: ExtensionChatMessage[]
	clineMessages?: ExtensionChatMessage[]
	currentTaskItem?: HistoryItem
	currentTaskTodos?: TodoItem[]
	mode: string
	customModes: ModeConfig[]
	taskHistoryFullLength: number
	taskHistoryVersion: number
	mcpServers?: McpServer[]
	telemetrySetting: string
	renderContext: "sidebar" | "editor" | "cli"
	cwd?: string
	organizationAllowList?: OrganizationAllowList
	routerModels?: RouterModels
	[key: string]: unknown
}
export type Mode = string
//# sourceMappingURL=messages.d.ts.map
