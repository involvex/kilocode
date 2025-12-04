import { z } from "zod"
import { RooCodeEventName } from "./events.js"
import { TaskStatus, taskMetadataSchema } from "./task.js"
import { globalSettingsSchema } from "./global-settings.js"
import { providerSettingsWithIdSchema } from "./provider-settings.js"
import { mcpMarketplaceItemSchema } from "./marketplace.js"
import { clineMessageSchema, queuedMessageSchema, tokenUsageSchema } from "./message.js"
import { staticAppPropertiesSchema, gitPropertiesSchema } from "./telemetry.js"
/**
 * OrganizationAllowList
 */
export const organizationAllowListSchema = z.object({
	allowAll: z.boolean(),
	providers: z.record(
		z.object({
			allowAll: z.boolean(),
			models: z.array(z.string()).optional(),
		}),
	),
})
/**
 * OrganizationDefaultSettings
 */
export const organizationDefaultSettingsSchema = globalSettingsSchema
	.pick({
		enableCheckpoints: true,
		fuzzyMatchThreshold: true,
		maxOpenTabsContext: true,
		maxReadFileLine: true,
		maxWorkspaceFiles: true,
		showRooIgnoredFiles: true,
		terminalCommandDelay: true,
		terminalCompressProgressBar: true,
		terminalOutputLineLimit: true,
		terminalShellIntegrationDisabled: true,
		terminalShellIntegrationTimeout: true,
		terminalZshClearEolMark: true,
	})
	// Add stronger validations for some fields.
	.merge(
		z.object({
			maxOpenTabsContext: z.number().int().nonnegative().optional(),
			maxReadFileLine: z.number().int().gte(-1).optional(),
			maxWorkspaceFiles: z.number().int().nonnegative().optional(),
			terminalCommandDelay: z.number().int().nonnegative().optional(),
			terminalOutputLineLimit: z.number().int().nonnegative().optional(),
			terminalShellIntegrationTimeout: z.number().int().nonnegative().optional(),
		}),
	)
/**
 * OrganizationCloudSettings
 */
export const organizationCloudSettingsSchema = z.object({
	recordTaskMessages: z.boolean().optional(),
	enableTaskSharing: z.boolean().optional(),
	taskShareExpirationDays: z.number().int().positive().optional(),
	allowMembersViewAllTasks: z.boolean().optional(),
})
/**
 * OrganizationFeatures
 */
export const organizationFeaturesSchema = z.object({
	roomoteControlEnabled: z.boolean().optional(),
})
/**
 * OrganizationSettings
 */
export const organizationSettingsSchema = z.object({
	version: z.number(),
	cloudSettings: organizationCloudSettingsSchema.optional(),
	defaultSettings: organizationDefaultSettingsSchema,
	allowList: organizationAllowListSchema,
	features: organizationFeaturesSchema.optional(),
	hiddenMcps: z.array(z.string()).optional(),
	hideMarketplaceMcps: z.boolean().optional(),
	mcps: z.array(mcpMarketplaceItemSchema).optional(),
	providerProfiles: z.record(z.string(), providerSettingsWithIdSchema).optional(),
})
/**
 * User Settings Schemas
 */
export const userFeaturesSchema = z.object({
	roomoteControlEnabled: z.boolean().optional(),
})
export const userSettingsConfigSchema = z.object({
	extensionBridgeEnabled: z.boolean().optional(),
	taskSyncEnabled: z.boolean().optional(),
})
export const userSettingsDataSchema = z.object({
	features: userFeaturesSchema,
	settings: userSettingsConfigSchema,
	version: z.number(),
})
/**
 * Constants
 */
export const ORGANIZATION_ALLOW_ALL = {
	allowAll: true,
	providers: {},
}
export const ORGANIZATION_DEFAULT = {
	version: 0,
	cloudSettings: {
		recordTaskMessages: true,
		enableTaskSharing: true,
		taskShareExpirationDays: 30,
		allowMembersViewAllTasks: true,
	},
	defaultSettings: {},
	allowList: ORGANIZATION_ALLOW_ALL,
}
/**
 * ShareResponse
 */
export const shareResponseSchema = z.object({
	success: z.boolean(),
	shareUrl: z.string().optional(),
	error: z.string().optional(),
	isNewShare: z.boolean().optional(),
	manageUrl: z.string().optional(),
})
/**
 * ConnectionState
 */
export var ConnectionState
;(function (ConnectionState) {
	ConnectionState["DISCONNECTED"] = "disconnected"
	ConnectionState["CONNECTING"] = "connecting"
	ConnectionState["CONNECTED"] = "connected"
	ConnectionState["RETRYING"] = "retrying"
	ConnectionState["FAILED"] = "failed"
})(ConnectionState || (ConnectionState = {}))
/**
 * Constants
 */
export const HEARTBEAT_INTERVAL_MS = 20_000
export const INSTANCE_TTL_SECONDS = 60
/**
 * ExtensionTask
 */
const extensionTaskSchema = z.object({
	taskId: z.string(),
	taskStatus: z.nativeEnum(TaskStatus),
	taskAsk: clineMessageSchema.optional(),
	queuedMessages: z.array(queuedMessageSchema).optional(),
	parentTaskId: z.string().optional(),
	childTaskId: z.string().optional(),
	tokenUsage: tokenUsageSchema.optional(),
	...taskMetadataSchema.shape,
})
/**
 * ExtensionInstance
 */
export const extensionInstanceSchema = z.object({
	instanceId: z.string(),
	userId: z.string(),
	workspacePath: z.string(),
	appProperties: staticAppPropertiesSchema,
	gitProperties: gitPropertiesSchema.optional(),
	lastHeartbeat: z.coerce.number(),
	task: extensionTaskSchema,
	taskAsk: clineMessageSchema.optional(),
	taskHistory: z.array(z.string()),
	mode: z.string().optional(),
	modes: z.array(z.object({ slug: z.string(), name: z.string() })).optional(),
	providerProfile: z.string().optional(),
	providerProfiles: z.array(z.object({ name: z.string(), provider: z.string().optional() })).optional(),
	isCloudAgent: z.boolean().optional(),
})
/**
 * ExtensionBridgeEvent
 */
export var ExtensionBridgeEventName
;(function (ExtensionBridgeEventName) {
	ExtensionBridgeEventName["TaskCreated"] = "taskCreated"
	ExtensionBridgeEventName["TaskStarted"] = "taskStarted"
	ExtensionBridgeEventName["TaskCompleted"] = "taskCompleted"
	ExtensionBridgeEventName["TaskAborted"] = "taskAborted"
	ExtensionBridgeEventName["TaskFocused"] = "taskFocused"
	ExtensionBridgeEventName["TaskUnfocused"] = "taskUnfocused"
	ExtensionBridgeEventName["TaskActive"] = "taskActive"
	ExtensionBridgeEventName["TaskInteractive"] = "taskInteractive"
	ExtensionBridgeEventName["TaskResumable"] = "taskResumable"
	ExtensionBridgeEventName["TaskIdle"] = "taskIdle"
	ExtensionBridgeEventName["TaskPaused"] = "taskPaused"
	ExtensionBridgeEventName["TaskUnpaused"] = "taskUnpaused"
	ExtensionBridgeEventName["TaskSpawned"] = "taskSpawned"
	ExtensionBridgeEventName["TaskUserMessage"] = "taskUserMessage"
	ExtensionBridgeEventName["TaskTokenUsageUpdated"] = "taskTokenUsageUpdated"
	ExtensionBridgeEventName["ModeChanged"] = "modeChanged"
	ExtensionBridgeEventName["ProviderProfileChanged"] = "providerProfileChanged"
	ExtensionBridgeEventName["InstanceRegistered"] = "instance_registered"
	ExtensionBridgeEventName["InstanceUnregistered"] = "instance_unregistered"
	ExtensionBridgeEventName["HeartbeatUpdated"] = "heartbeat_updated"
})(ExtensionBridgeEventName || (ExtensionBridgeEventName = {}))
export const extensionBridgeEventSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskCreated),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskStarted),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskCompleted),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskAborted),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskFocused),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskUnfocused),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskActive),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskInteractive),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskResumable),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskIdle),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskPaused),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskUnpaused),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskSpawned),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskUserMessage),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.TaskTokenUsageUpdated),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.ModeChanged),
		instance: extensionInstanceSchema,
		mode: z.string(),
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.ProviderProfileChanged),
		instance: extensionInstanceSchema,
		providerProfile: z.object({ name: z.string(), provider: z.string().optional() }),
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.InstanceRegistered),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.InstanceUnregistered),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeEventName.HeartbeatUpdated),
		instance: extensionInstanceSchema,
		timestamp: z.number(),
	}),
])
/**
 * ExtensionBridgeCommand
 */
export var ExtensionBridgeCommandName
;(function (ExtensionBridgeCommandName) {
	ExtensionBridgeCommandName["StartTask"] = "start_task"
	ExtensionBridgeCommandName["StopTask"] = "stop_task"
	ExtensionBridgeCommandName["ResumeTask"] = "resume_task"
})(ExtensionBridgeCommandName || (ExtensionBridgeCommandName = {}))
export const extensionBridgeCommandSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal(ExtensionBridgeCommandName.StartTask),
		instanceId: z.string(),
		payload: z.object({
			text: z.string(),
			images: z.array(z.string()).optional(),
			mode: z.string().optional(),
			providerProfile: z.string().optional(),
		}),
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeCommandName.StopTask),
		instanceId: z.string(),
		payload: z.object({ taskId: z.string() }),
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(ExtensionBridgeCommandName.ResumeTask),
		instanceId: z.string(),
		payload: z.object({ taskId: z.string() }),
		timestamp: z.number(),
	}),
])
/**
 * TaskBridgeEvent
 */
export var TaskBridgeEventName
;(function (TaskBridgeEventName) {
	TaskBridgeEventName["Message"] = "message"
	TaskBridgeEventName["TaskModeSwitched"] = "taskModeSwitched"
	TaskBridgeEventName["TaskInteractive"] = "taskInteractive"
})(TaskBridgeEventName || (TaskBridgeEventName = {}))
export const taskBridgeEventSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal(TaskBridgeEventName.Message),
		taskId: z.string(),
		action: z.string(),
		message: clineMessageSchema,
	}),
	z.object({
		type: z.literal(TaskBridgeEventName.TaskModeSwitched),
		taskId: z.string(),
		mode: z.string(),
	}),
	z.object({
		type: z.literal(TaskBridgeEventName.TaskInteractive),
		taskId: z.string(),
	}),
])
/**
 * TaskBridgeCommand
 */
export var TaskBridgeCommandName
;(function (TaskBridgeCommandName) {
	TaskBridgeCommandName["Message"] = "message"
	TaskBridgeCommandName["ApproveAsk"] = "approve_ask"
	TaskBridgeCommandName["DenyAsk"] = "deny_ask"
})(TaskBridgeCommandName || (TaskBridgeCommandName = {}))
export const taskBridgeCommandSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal(TaskBridgeCommandName.Message),
		taskId: z.string(),
		payload: z.object({
			text: z.string(),
			images: z.array(z.string()).optional(),
			mode: z.string().optional(),
			providerProfile: z.string().optional(),
		}),
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(TaskBridgeCommandName.ApproveAsk),
		taskId: z.string(),
		payload: z.object({
			text: z.string().optional(),
			images: z.array(z.string()).optional(),
		}),
		timestamp: z.number(),
	}),
	z.object({
		type: z.literal(TaskBridgeCommandName.DenyAsk),
		taskId: z.string(),
		payload: z.object({
			text: z.string().optional(),
			images: z.array(z.string()).optional(),
		}),
		timestamp: z.number(),
	}),
])
/**
 * ExtensionSocketEvents
 */
export var ExtensionSocketEvents
;(function (ExtensionSocketEvents) {
	ExtensionSocketEvents["CONNECTED"] = "extension:connected"
	ExtensionSocketEvents["REGISTER"] = "extension:register"
	ExtensionSocketEvents["UNREGISTER"] = "extension:unregister"
	ExtensionSocketEvents["HEARTBEAT"] = "extension:heartbeat"
	ExtensionSocketEvents["EVENT"] = "extension:event"
	ExtensionSocketEvents["RELAYED_EVENT"] = "extension:relayed_event"
	ExtensionSocketEvents["COMMAND"] = "extension:command"
	ExtensionSocketEvents["RELAYED_COMMAND"] = "extension:relayed_command"
})(ExtensionSocketEvents || (ExtensionSocketEvents = {}))
/**
 * TaskSocketEvents
 */
export var TaskSocketEvents
;(function (TaskSocketEvents) {
	TaskSocketEvents["JOIN"] = "task:join"
	TaskSocketEvents["LEAVE"] = "task:leave"
	TaskSocketEvents["EVENT"] = "task:event"
	TaskSocketEvents["RELAYED_EVENT"] = "task:relayed_event"
	TaskSocketEvents["COMMAND"] = "task:command"
	TaskSocketEvents["RELAYED_COMMAND"] = "task:relayed_command"
})(TaskSocketEvents || (TaskSocketEvents = {}))
/**
 * UsageStats
 */
export const usageStatsSchema = z.object({
	success: z.boolean(),
	data: z.object({
		dates: z.array(z.string()), // Array of date strings
		tasks: z.array(z.number()), // Array of task counts
		tokens: z.array(z.number()), // Array of token counts
		costs: z.array(z.number()), // Array of costs in USD
		totals: z.object({
			tasks: z.number(),
			tokens: z.number(),
			cost: z.number(), // Total cost in USD
		}),
	}),
	period: z.number(), // Period in days (e.g., 30)
})
