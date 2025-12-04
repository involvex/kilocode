import { z } from "zod"
import { clineMessageSchema, tokenUsageSchema } from "./message.js"
import { toolNamesSchema, toolUsageSchema } from "./tool.js"
/**
 * RooCodeEventName
 */
export var RooCodeEventName
;(function (RooCodeEventName) {
	// Task Provider Lifecycle
	RooCodeEventName["TaskCreated"] = "taskCreated"
	// Task Lifecycle
	RooCodeEventName["TaskStarted"] = "taskStarted"
	RooCodeEventName["TaskCompleted"] = "taskCompleted"
	RooCodeEventName["TaskAborted"] = "taskAborted"
	RooCodeEventName["TaskFocused"] = "taskFocused"
	RooCodeEventName["TaskUnfocused"] = "taskUnfocused"
	RooCodeEventName["TaskActive"] = "taskActive"
	RooCodeEventName["TaskInteractive"] = "taskInteractive"
	RooCodeEventName["TaskResumable"] = "taskResumable"
	RooCodeEventName["TaskIdle"] = "taskIdle"
	// Subtask Lifecycle
	RooCodeEventName["TaskPaused"] = "taskPaused"
	RooCodeEventName["TaskUnpaused"] = "taskUnpaused"
	RooCodeEventName["TaskSpawned"] = "taskSpawned"
	// Task Execution
	RooCodeEventName["Message"] = "message"
	RooCodeEventName["TaskModeSwitched"] = "taskModeSwitched"
	RooCodeEventName["TaskAskResponded"] = "taskAskResponded"
	RooCodeEventName["TaskUserMessage"] = "taskUserMessage"
	// Task Analytics
	RooCodeEventName["TaskTokenUsageUpdated"] = "taskTokenUsageUpdated"
	RooCodeEventName["TaskToolFailed"] = "taskToolFailed"
	// Configuration Changes
	RooCodeEventName["ModeChanged"] = "modeChanged"
	RooCodeEventName["ProviderProfileChanged"] = "providerProfileChanged"
	// Evals
	RooCodeEventName["EvalPass"] = "evalPass"
	RooCodeEventName["EvalFail"] = "evalFail"
})(RooCodeEventName || (RooCodeEventName = {}))
/**
 * RooCodeEvents
 */
export const rooCodeEventsSchema = z.object({
	[RooCodeEventName.TaskCreated]: z.tuple([z.string()]),
	[RooCodeEventName.TaskStarted]: z.tuple([z.string()]),
	[RooCodeEventName.TaskCompleted]: z.tuple([
		z.string(),
		tokenUsageSchema,
		toolUsageSchema,
		z.object({
			isSubtask: z.boolean(),
		}),
	]),
	[RooCodeEventName.TaskAborted]: z.tuple([z.string()]),
	[RooCodeEventName.TaskFocused]: z.tuple([z.string()]),
	[RooCodeEventName.TaskUnfocused]: z.tuple([z.string()]),
	[RooCodeEventName.TaskActive]: z.tuple([z.string()]),
	[RooCodeEventName.TaskInteractive]: z.tuple([z.string()]),
	[RooCodeEventName.TaskResumable]: z.tuple([z.string()]),
	[RooCodeEventName.TaskIdle]: z.tuple([z.string()]),
	[RooCodeEventName.TaskPaused]: z.tuple([z.string()]),
	[RooCodeEventName.TaskUnpaused]: z.tuple([z.string()]),
	[RooCodeEventName.TaskSpawned]: z.tuple([z.string(), z.string()]),
	[RooCodeEventName.Message]: z.tuple([
		z.object({
			taskId: z.string(),
			action: z.union([z.literal("created"), z.literal("updated")]),
			message: clineMessageSchema,
		}),
	]),
	[RooCodeEventName.TaskModeSwitched]: z.tuple([z.string(), z.string()]),
	[RooCodeEventName.TaskAskResponded]: z.tuple([z.string()]),
	[RooCodeEventName.TaskUserMessage]: z.tuple([z.string()]),
	[RooCodeEventName.TaskToolFailed]: z.tuple([z.string(), toolNamesSchema, z.string()]),
	[RooCodeEventName.TaskTokenUsageUpdated]: z.tuple([z.string(), tokenUsageSchema]),
	[RooCodeEventName.ModeChanged]: z.tuple([z.string()]),
	[RooCodeEventName.ProviderProfileChanged]: z.tuple([z.object({ name: z.string(), provider: z.string() })]),
})
/**
 * TaskEvent
 */
export const taskEventSchema = z.discriminatedUnion("eventName", [
	// Task Provider Lifecycle
	z.object({
		eventName: z.literal(RooCodeEventName.TaskCreated),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskCreated],
		taskId: z.number().optional(),
	}),
	// Task Lifecycle
	z.object({
		eventName: z.literal(RooCodeEventName.TaskStarted),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskStarted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskCompleted),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskCompleted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskAborted),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskAborted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskFocused),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskFocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskUnfocused),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskUnfocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskActive),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskActive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskInteractive),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskInteractive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskResumable),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskResumable],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskIdle),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskIdle],
		taskId: z.number().optional(),
	}),
	// Subtask Lifecycle
	z.object({
		eventName: z.literal(RooCodeEventName.TaskPaused),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskPaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskUnpaused),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskUnpaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskSpawned),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskSpawned],
		taskId: z.number().optional(),
	}),
	// Task Execution
	z.object({
		eventName: z.literal(RooCodeEventName.Message),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.Message],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskModeSwitched),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskModeSwitched],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskAskResponded),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskAskResponded],
		taskId: z.number().optional(),
	}),
	// Task Analytics
	z.object({
		eventName: z.literal(RooCodeEventName.TaskToolFailed),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskToolFailed],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.TaskTokenUsageUpdated),
		payload: rooCodeEventsSchema.shape[RooCodeEventName.TaskTokenUsageUpdated],
		taskId: z.number().optional(),
	}),
	// Evals
	z.object({
		eventName: z.literal(RooCodeEventName.EvalPass),
		payload: z.undefined(),
		taskId: z.number(),
	}),
	z.object({
		eventName: z.literal(RooCodeEventName.EvalFail),
		payload: z.undefined(),
		taskId: z.number(),
	}),
])
