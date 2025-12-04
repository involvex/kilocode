import { z } from "zod"
import { providerNames } from "./provider-settings.js"
import { clineMessageSchema } from "./message.js"
import { toolProtocolSchema } from "./tool.js" // kilocode_change
/**
 * TelemetrySetting
 */
export const telemetrySettings = ["unset", "enabled", "disabled"]
export const telemetrySettingsSchema = z.enum(telemetrySettings)
/**
 * TelemetryEventName
 */
export var TelemetryEventName
;(function (TelemetryEventName) {
	// kilocode_change start
	TelemetryEventName["COMMIT_MSG_GENERATED"] = "Commit Message Generated"
	TelemetryEventName["INLINE_ASSIST_QUICK_TASK"] = "Inline Assist Quick Task"
	TelemetryEventName["INLINE_ASSIST_AUTO_TASK"] = "Inline Assist Auto Task"
	TelemetryEventName["INLINE_ASSIST_ACCEPT_SUGGESTION"] = "Inline Assist Accept Suggestion"
	TelemetryEventName["INLINE_ASSIST_REJECT_SUGGESTION"] = "Inline Assist Reject Suggestion"
	TelemetryEventName["CHECKPOINT_FAILURE"] = "Checkpoint Failure"
	TelemetryEventName["TOOL_ERROR"] = "Tool Error"
	TelemetryEventName["MAX_COMPLETION_TOKENS_REACHED_ERROR"] = "Max Completion Tokens Reached Error"
	TelemetryEventName["NOTIFICATION_CLICKED"] = "Notification Clicked"
	TelemetryEventName["WEBVIEW_MEMORY_USAGE"] = "Webview Memory Usage"
	TelemetryEventName["MEMORY_WARNING_SHOWN"] = "Memory Warning Shown"
	TelemetryEventName["FREE_MODELS_LINK_CLICKED"] = "Free Models Link Clicked"
	TelemetryEventName["CREATE_ORGANIZATION_LINK_CLICKED"] = "Create Organization Link Clicked"
	TelemetryEventName["SUGGESTION_BUTTON_CLICKED"] = "Suggestion Button Clicked"
	TelemetryEventName["NO_ASSISTANT_MESSAGES"] = "No Assistant Messages"
	TelemetryEventName["AUTO_PURGE_STARTED"] = "Auto Purge Started"
	TelemetryEventName["AUTO_PURGE_COMPLETED"] = "Auto Purge Completed"
	TelemetryEventName["AUTO_PURGE_FAILED"] = "Auto Purge Failed"
	TelemetryEventName["MANUAL_PURGE_TRIGGERED"] = "Manual Purge Triggered"
	TelemetryEventName["GHOST_SERVICE_DISABLED"] = "Ghost Service Disabled"
	TelemetryEventName["ASK_APPROVAL"] = "Ask Approval"
	// kilocode_change end
	TelemetryEventName["TASK_CREATED"] = "Task Created"
	TelemetryEventName["TASK_RESTARTED"] = "Task Reopened"
	TelemetryEventName["TASK_COMPLETED"] = "Task Completed"
	TelemetryEventName["TASK_MESSAGE"] = "Task Message"
	TelemetryEventName["TASK_CONVERSATION_MESSAGE"] = "Conversation Message"
	TelemetryEventName["LLM_COMPLETION"] = "LLM Completion"
	TelemetryEventName["MODE_SWITCH"] = "Mode Switched"
	TelemetryEventName["MODE_SELECTOR_OPENED"] = "Mode Selector Opened"
	TelemetryEventName["TOOL_USED"] = "Tool Used"
	TelemetryEventName["CHECKPOINT_CREATED"] = "Checkpoint Created"
	TelemetryEventName["CHECKPOINT_RESTORED"] = "Checkpoint Restored"
	TelemetryEventName["CHECKPOINT_DIFFED"] = "Checkpoint Diffed"
	TelemetryEventName["TAB_SHOWN"] = "Tab Shown"
	TelemetryEventName["MODE_SETTINGS_CHANGED"] = "Mode Setting Changed"
	TelemetryEventName["CUSTOM_MODE_CREATED"] = "Custom Mode Created"
	TelemetryEventName["CONTEXT_CONDENSED"] = "Context Condensed"
	TelemetryEventName["SLIDING_WINDOW_TRUNCATION"] = "Sliding Window Truncation"
	TelemetryEventName["CODE_ACTION_USED"] = "Code Action Used"
	TelemetryEventName["PROMPT_ENHANCED"] = "Prompt Enhanced"
	TelemetryEventName["TITLE_BUTTON_CLICKED"] = "Title Button Clicked"
	TelemetryEventName["AUTHENTICATION_INITIATED"] = "Authentication Initiated"
	TelemetryEventName["MARKETPLACE_ITEM_INSTALLED"] = "Marketplace Item Installed"
	TelemetryEventName["MARKETPLACE_ITEM_REMOVED"] = "Marketplace Item Removed"
	TelemetryEventName["MARKETPLACE_TAB_VIEWED"] = "Marketplace Tab Viewed"
	TelemetryEventName["MARKETPLACE_INSTALL_BUTTON_CLICKED"] = "Marketplace Install Button Clicked"
	TelemetryEventName["SHARE_BUTTON_CLICKED"] = "Share Button Clicked"
	TelemetryEventName["SHARE_ORGANIZATION_CLICKED"] = "Share Organization Clicked"
	TelemetryEventName["SHARE_PUBLIC_CLICKED"] = "Share Public Clicked"
	TelemetryEventName["SHARE_CONNECT_TO_CLOUD_CLICKED"] = "Share Connect To Cloud Clicked"
	TelemetryEventName["ACCOUNT_CONNECT_CLICKED"] = "Account Connect Clicked"
	TelemetryEventName["ACCOUNT_CONNECT_SUCCESS"] = "Account Connect Success"
	TelemetryEventName["ACCOUNT_LOGOUT_CLICKED"] = "Account Logout Clicked"
	TelemetryEventName["ACCOUNT_LOGOUT_SUCCESS"] = "Account Logout Success"
	TelemetryEventName["FEATURED_PROVIDER_CLICKED"] = "Featured Provider Clicked"
	TelemetryEventName["UPSELL_DISMISSED"] = "Upsell Dismissed"
	TelemetryEventName["UPSELL_CLICKED"] = "Upsell Clicked"
	TelemetryEventName["SCHEMA_VALIDATION_ERROR"] = "Schema Validation Error"
	TelemetryEventName["DIFF_APPLICATION_ERROR"] = "Diff Application Error"
	TelemetryEventName["SHELL_INTEGRATION_ERROR"] = "Shell Integration Error"
	TelemetryEventName["CONSECUTIVE_MISTAKE_ERROR"] = "Consecutive Mistake Error"
	TelemetryEventName["CODE_INDEX_ERROR"] = "Code Index Error"
	TelemetryEventName["TELEMETRY_SETTINGS_CHANGED"] = "Telemetry Settings Changed"
})(TelemetryEventName || (TelemetryEventName = {}))
/**
 * TelemetryProperties
 */
export const staticAppPropertiesSchema = z.object({
	appName: z.string(),
	appVersion: z.string(),
	vscodeVersion: z.string(),
	platform: z.string(),
	editorName: z.string(),
	wrapped: z.boolean(), // kilocode_change
	wrapper: z.string().nullable(), // kilocode_change
	wrapperTitle: z.string().nullable(), // kilocode_change
	wrapperCode: z.string().nullable(), // kilocode_change
	wrapperVersion: z.string().nullable(), // kilocode_change
	hostname: z.string().optional(),
})
export const dynamicAppPropertiesSchema = z.object({
	language: z.string(),
	mode: z.string(),
})
export const cloudAppPropertiesSchema = z.object({
	cloudIsAuthenticated: z.boolean().optional(),
})
export const appPropertiesSchema = z.object({
	...staticAppPropertiesSchema.shape,
	...dynamicAppPropertiesSchema.shape,
	...cloudAppPropertiesSchema.shape,
})
export const taskPropertiesSchema = z.object({
	taskId: z.string().optional(),
	parentTaskId: z.string().optional(),
	apiProvider: z.enum(providerNames).optional(),
	modelId: z.string().optional(),
	diffStrategy: z.string().optional(),
	isSubtask: z.boolean().optional(),
	todos: z
		.object({
			total: z.number(),
			completed: z.number(),
			inProgress: z.number(),
			pending: z.number(),
		})
		.optional(),
	// kilocode_change start
	currentTaskSize: z.number().optional(),
	taskHistorySize: z.number().optional(),
	toolStyle: toolProtocolSchema.optional(),
	// kilocode_change end
})
export const gitPropertiesSchema = z.object({
	repositoryUrl: z.string().optional(),
	repositoryName: z.string().optional(),
	defaultBranch: z.string().optional(),
})
export const telemetryPropertiesSchema = z.object({
	...appPropertiesSchema.shape,
	...taskPropertiesSchema.shape,
	...gitPropertiesSchema.shape,
})
/**
 * RooCodeTelemetryEvent
 */
export const rooCodeTelemetryEventSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.enum([
			// kilocode_change start
			TelemetryEventName.COMMIT_MSG_GENERATED, // kilocode_change
			TelemetryEventName.INLINE_ASSIST_QUICK_TASK, // kilocode_change
			TelemetryEventName.INLINE_ASSIST_AUTO_TASK, // kilocode_change
			TelemetryEventName.INLINE_ASSIST_ACCEPT_SUGGESTION, // kilocode_change
			TelemetryEventName.INLINE_ASSIST_REJECT_SUGGESTION, // kilocode_change
			TelemetryEventName.WEBVIEW_MEMORY_USAGE, // kilocode_change
			TelemetryEventName.AUTO_PURGE_STARTED, // kilocode_change
			TelemetryEventName.AUTO_PURGE_COMPLETED, // kilocode_change
			TelemetryEventName.AUTO_PURGE_FAILED, // kilocode_change
			TelemetryEventName.MANUAL_PURGE_TRIGGERED, // kilocode_change
			TelemetryEventName.GHOST_SERVICE_DISABLED, // kilocode_change
			// kilocode_change end
			TelemetryEventName.TASK_CREATED,
			TelemetryEventName.TASK_RESTARTED,
			TelemetryEventName.TASK_COMPLETED,
			TelemetryEventName.TASK_CONVERSATION_MESSAGE,
			TelemetryEventName.MODE_SWITCH,
			TelemetryEventName.MODE_SELECTOR_OPENED,
			TelemetryEventName.TOOL_USED,
			TelemetryEventName.CHECKPOINT_CREATED,
			TelemetryEventName.CHECKPOINT_RESTORED,
			TelemetryEventName.CHECKPOINT_DIFFED,
			TelemetryEventName.CODE_ACTION_USED,
			TelemetryEventName.PROMPT_ENHANCED,
			TelemetryEventName.TITLE_BUTTON_CLICKED,
			TelemetryEventName.AUTHENTICATION_INITIATED,
			TelemetryEventName.MARKETPLACE_ITEM_INSTALLED,
			TelemetryEventName.MARKETPLACE_ITEM_REMOVED,
			TelemetryEventName.MARKETPLACE_TAB_VIEWED,
			TelemetryEventName.MARKETPLACE_INSTALL_BUTTON_CLICKED,
			TelemetryEventName.SHARE_BUTTON_CLICKED,
			TelemetryEventName.SHARE_ORGANIZATION_CLICKED,
			TelemetryEventName.SHARE_PUBLIC_CLICKED,
			TelemetryEventName.SHARE_CONNECT_TO_CLOUD_CLICKED,
			TelemetryEventName.ACCOUNT_CONNECT_CLICKED,
			TelemetryEventName.ACCOUNT_CONNECT_SUCCESS,
			TelemetryEventName.ACCOUNT_LOGOUT_CLICKED,
			TelemetryEventName.ACCOUNT_LOGOUT_SUCCESS,
			TelemetryEventName.FEATURED_PROVIDER_CLICKED,
			TelemetryEventName.UPSELL_DISMISSED,
			TelemetryEventName.UPSELL_CLICKED,
			TelemetryEventName.SCHEMA_VALIDATION_ERROR,
			TelemetryEventName.DIFF_APPLICATION_ERROR,
			TelemetryEventName.SHELL_INTEGRATION_ERROR,
			TelemetryEventName.CONSECUTIVE_MISTAKE_ERROR,
			TelemetryEventName.CODE_INDEX_ERROR,
			TelemetryEventName.CONTEXT_CONDENSED,
			TelemetryEventName.SLIDING_WINDOW_TRUNCATION,
			TelemetryEventName.TAB_SHOWN,
			TelemetryEventName.MODE_SETTINGS_CHANGED,
			TelemetryEventName.CUSTOM_MODE_CREATED,
		]),
		properties: telemetryPropertiesSchema,
	}),
	z.object({
		type: z.literal(TelemetryEventName.TELEMETRY_SETTINGS_CHANGED),
		properties: z.object({
			...telemetryPropertiesSchema.shape,
			previousSetting: telemetrySettingsSchema,
			newSetting: telemetrySettingsSchema,
		}),
	}),
	z.object({
		type: z.literal(TelemetryEventName.TASK_MESSAGE),
		properties: z.object({
			...telemetryPropertiesSchema.shape,
			taskId: z.string(),
			message: clineMessageSchema,
		}),
	}),
	z.object({
		type: z.literal(TelemetryEventName.LLM_COMPLETION),
		properties: z.object({
			...telemetryPropertiesSchema.shape,
			inputTokens: z.number(),
			outputTokens: z.number(),
			cacheReadTokens: z.number().optional(),
			cacheWriteTokens: z.number().optional(),
			cost: z.number().optional(),
		}),
	}),
])
