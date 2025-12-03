// src/auto-purge.ts
import { z } from "zod"
var autoPurgeSettingsSchema = z.object({
	enabled: z.boolean(),
	defaultRetentionDays: z.number().min(1),
	favoritedTaskRetentionDays: z.number().min(1).nullable(),
	// null = never purge
	completedTaskRetentionDays: z.number().min(1),
	incompleteTaskRetentionDays: z.number().min(1),
	lastRunTimestamp: z.number().optional(),
})
var TaskType = /* @__PURE__ */ ((TaskType2) => {
	TaskType2["FAVORITED"] = "favorited"
	TaskType2["COMPLETED"] = "completed"
	TaskType2["INCOMPLETE"] = "incomplete"
	TaskType2["REGULAR"] = "regular"
	return TaskType2
})(TaskType || {})

// src/cloud.ts
import { z as z19 } from "zod"

// src/events.ts
import { z as z5 } from "zod"

// src/message.ts
import { z as z3 } from "zod"

// src/kilocode/kilocode.ts
import { z as z2 } from "zod"
var ghostServiceSettingsSchema = z2
	.object({
		enableAutoTrigger: z2.boolean().optional(),
		enableQuickInlineTaskKeybinding: z2.boolean().optional(),
		enableSmartInlineTaskKeybinding: z2.boolean().optional(),
		useNewAutocomplete: z2.boolean().optional(),
		provider: z2.string().optional(),
		model: z2.string().optional(),
	})
	.optional()
var commitRangeSchema = z2.object({
	from: z2.string(),
	fromTimeStamp: z2.number().optional(),
	to: z2.string(),
})
var kiloCodeMetaDataSchema = z2.object({
	commitRange: commitRangeSchema.optional(),
})
var fastApplyModelSchema = z2.enum(["auto", "morph/morph-v3-fast", "morph/morph-v3-large", "relace/relace-apply-3"])
var fastApplyApiProviderSchema = z2.enum(["current", "morph", "kilocode", "openrouter"])
var DEFAULT_KILOCODE_BACKEND_URL = "https://kilo.ai"
function getKiloBaseUriFromToken(kilocodeToken) {
	if (kilocodeToken) {
		try {
			const payload_string = kilocodeToken.split(".")[1]
			if (!payload_string) return "https://api.kilo.ai"
			const payload_json =
				typeof atob !== "undefined" ? atob(payload_string) : Buffer.from(payload_string, "base64").toString()
			const payload = JSON.parse(payload_json)
			if (payload.env === "development") return "http://localhost:3000"
		} catch (_error) {
			console.warn("Failed to get base URL from Kilo Code token")
		}
	}
	return "https://api.kilo.ai"
}
function getKiloUrlFromToken(targetUrl, kilocodeToken) {
	const baseUrl = getKiloBaseUriFromToken(kilocodeToken)
	const target = new URL(targetUrl)
	const { protocol, host } = new URL(baseUrl)
	Object.assign(target, { protocol, host })
	return target.toString()
}
function getGlobalKilocodeBackendUrl() {
	return (
		(typeof window !== "undefined" ? window.KILOCODE_BACKEND_BASE_URL : void 0) ||
		process.env.KILOCODE_BACKEND_BASE_URL ||
		DEFAULT_KILOCODE_BACKEND_URL
	)
}
function getAppUrl(path = "") {
	return new URL(path, getGlobalKilocodeBackendUrl()).toString()
}
function getApiUrl(path = "") {
	const backend = getGlobalKilocodeBackendUrl()
	if (backend.includes("localhost")) {
		return new URL(path, backend).toString()
	}
	return new URL(path, "https://api.kilo.ai").toString()
}
function getExtensionConfigUrl() {
	try {
		const backend = getGlobalKilocodeBackendUrl()
		if (backend.includes("localhost")) {
			return getAppUrl("/extension-config.json")
		} else {
			return "https://api.kilo.ai/extension-config.json"
		}
	} catch (error) {
		console.warn("Failed to build extension config URL:", error)
		return "https://api.kilo.ai/extension-config.json"
	}
}

// src/message.ts
var clineAsks = [
	"followup",
	"command",
	"command_output",
	"completion_result",
	"tool",
	"api_req_failed",
	"resume_task",
	"resume_completed_task",
	"mistake_limit_reached",
	"browser_action_launch",
	"use_mcp_server",
	"auto_approval_max_req_reached",
	// kilocode_change start
	"payment_required_prompt",
	// Added for the low credits dialog
	"invalid_model",
	"report_bug",
	"condense",
	"checkpoint_restore",
	// Added for checkpoint restore approval
	// kilocode_change end
]
var clineAskSchema = z3.enum(clineAsks)
var idleAsks = [
	// kilocode_change start
	"payment_required_prompt",
	"invalid_model",
	// kilocode_change end
	"completion_result",
	"api_req_failed",
	"resume_completed_task",
	"mistake_limit_reached",
	"auto_approval_max_req_reached",
]
function isIdleAsk(ask) {
	return idleAsks.includes(ask)
}
var resumableAsks = ["resume_task"]
function isResumableAsk(ask) {
	return resumableAsks.includes(ask)
}
var interactiveAsks = [
	// kilocode_change start
	"report_bug",
	"condense",
	"checkpoint_restore",
	// kilocode_change end
	"followup",
	"command",
	"tool",
	"browser_action_launch",
	"use_mcp_server",
]
function isInteractiveAsk(ask) {
	return interactiveAsks.includes(ask)
}
var nonBlockingAsks = ["command_output"]
function isNonBlockingAsk(ask) {
	return nonBlockingAsks.includes(ask)
}
var clineSays = [
	"error",
	"api_req_started",
	"api_req_finished",
	"api_req_retried",
	"api_req_retry_delayed",
	"api_req_deleted",
	"text",
	"image",
	"reasoning",
	"completion_result",
	"user_feedback",
	"user_feedback_diff",
	"command_output",
	"shell_integration_warning",
	"browser_action",
	"browser_action_result",
	"mcp_server_request_started",
	"mcp_server_response",
	"subtask_result",
	"checkpoint_saved",
	"rooignore_error",
	"diff_error",
	"condense_context",
	"condense_context_error",
	"codebase_search_result",
	"user_edit_todos",
]
var clineSaySchema = z3.enum(clineSays)
var toolProgressStatusSchema = z3.object({
	icon: z3.string().optional(),
	text: z3.string().optional(),
})
var contextCondenseSchema = z3.object({
	cost: z3.number(),
	prevContextTokens: z3.number(),
	newContextTokens: z3.number(),
	summary: z3.string(),
})
var clineMessageSchema = z3.object({
	ts: z3.number(),
	type: z3.union([z3.literal("ask"), z3.literal("say")]),
	ask: clineAskSchema.optional(),
	say: clineSaySchema.optional(),
	text: z3.string().optional(),
	images: z3.array(z3.string()).optional(),
	partial: z3.boolean().optional(),
	reasoning: z3.string().optional(),
	conversationHistoryIndex: z3.number().optional(),
	checkpoint: z3.record(z3.string(), z3.unknown()).optional(),
	progressStatus: toolProgressStatusSchema.optional(),
	contextCondense: contextCondenseSchema.optional(),
	isProtected: z3.boolean().optional(),
	apiProtocol: z3.union([z3.literal("openai"), z3.literal("anthropic")]).optional(),
	isAnswered: z3.boolean().optional(),
	// kilocode_change start
	metadata: z3
		.object({
			kiloCode: kiloCodeMetaDataSchema.optional(),
		})
		.optional(),
	// kilocode_change end
})
var tokenUsageSchema = z3.object({
	totalTokensIn: z3.number(),
	totalTokensOut: z3.number(),
	totalCacheWrites: z3.number().optional(),
	totalCacheReads: z3.number().optional(),
	totalCost: z3.number(),
	contextTokens: z3.number(),
})
var queuedMessageSchema = z3.object({
	timestamp: z3.number(),
	id: z3.string(),
	text: z3.string(),
	images: z3.array(z3.string()).optional(),
})

// src/tool.ts
import { z as z4 } from "zod"
var toolGroups = ["read", "edit", "browser", "command", "mcp", "modes"]
var toolGroupsSchema = z4.enum(toolGroups)
var toolNames = [
	"execute_command",
	"read_file",
	"write_to_file",
	"apply_diff",
	"insert_content",
	"search_files",
	"list_files",
	"list_code_definition_names",
	"browser_action",
	"use_mcp_tool",
	"access_mcp_resource",
	"ask_followup_question",
	"attempt_completion",
	"switch_mode",
	"new_task",
	"fetch_instructions",
	"codebase_search",
	// kilocode_change start
	"edit_file",
	"new_rule",
	"report_bug",
	"condense",
	"delete_file",
	// kilocode_change end
	"update_todo_list",
	"run_slash_command",
	"generate_image",
]
var toolNamesSchema = z4.enum(toolNames)
var toolUsageSchema = z4.record(
	toolNamesSchema,
	z4.object({
		attempts: z4.number(),
		failures: z4.number(),
	}),
)
var TOOL_PROTOCOL = {
	XML: "xml",
	NATIVE: "native",
}
var toolProtocolSchema = z4.enum([TOOL_PROTOCOL.XML, TOOL_PROTOCOL.NATIVE])
function isNativeProtocol(protocol) {
	return protocol === TOOL_PROTOCOL.NATIVE
}
function getEffectiveProtocol(toolProtocol) {
	return toolProtocol || TOOL_PROTOCOL.XML
}

// src/events.ts
var RooCodeEventName = /* @__PURE__ */ ((RooCodeEventName2) => {
	RooCodeEventName2["TaskCreated"] = "taskCreated"
	RooCodeEventName2["TaskStarted"] = "taskStarted"
	RooCodeEventName2["TaskCompleted"] = "taskCompleted"
	RooCodeEventName2["TaskAborted"] = "taskAborted"
	RooCodeEventName2["TaskFocused"] = "taskFocused"
	RooCodeEventName2["TaskUnfocused"] = "taskUnfocused"
	RooCodeEventName2["TaskActive"] = "taskActive"
	RooCodeEventName2["TaskInteractive"] = "taskInteractive"
	RooCodeEventName2["TaskResumable"] = "taskResumable"
	RooCodeEventName2["TaskIdle"] = "taskIdle"
	RooCodeEventName2["TaskPaused"] = "taskPaused"
	RooCodeEventName2["TaskUnpaused"] = "taskUnpaused"
	RooCodeEventName2["TaskSpawned"] = "taskSpawned"
	RooCodeEventName2["Message"] = "message"
	RooCodeEventName2["TaskModeSwitched"] = "taskModeSwitched"
	RooCodeEventName2["TaskAskResponded"] = "taskAskResponded"
	RooCodeEventName2["TaskUserMessage"] = "taskUserMessage"
	RooCodeEventName2["TaskTokenUsageUpdated"] = "taskTokenUsageUpdated"
	RooCodeEventName2["TaskToolFailed"] = "taskToolFailed"
	RooCodeEventName2["ModeChanged"] = "modeChanged"
	RooCodeEventName2["ProviderProfileChanged"] = "providerProfileChanged"
	RooCodeEventName2["EvalPass"] = "evalPass"
	RooCodeEventName2["EvalFail"] = "evalFail"
	return RooCodeEventName2
})(RooCodeEventName || {})
var rooCodeEventsSchema = z5.object({
	["taskCreated" /* TaskCreated */]: z5.tuple([z5.string()]),
	["taskStarted" /* TaskStarted */]: z5.tuple([z5.string()]),
	["taskCompleted" /* TaskCompleted */]: z5.tuple([
		z5.string(),
		tokenUsageSchema,
		toolUsageSchema,
		z5.object({
			isSubtask: z5.boolean(),
		}),
	]),
	["taskAborted" /* TaskAborted */]: z5.tuple([z5.string()]),
	["taskFocused" /* TaskFocused */]: z5.tuple([z5.string()]),
	["taskUnfocused" /* TaskUnfocused */]: z5.tuple([z5.string()]),
	["taskActive" /* TaskActive */]: z5.tuple([z5.string()]),
	["taskInteractive" /* TaskInteractive */]: z5.tuple([z5.string()]),
	["taskResumable" /* TaskResumable */]: z5.tuple([z5.string()]),
	["taskIdle" /* TaskIdle */]: z5.tuple([z5.string()]),
	["taskPaused" /* TaskPaused */]: z5.tuple([z5.string()]),
	["taskUnpaused" /* TaskUnpaused */]: z5.tuple([z5.string()]),
	["taskSpawned" /* TaskSpawned */]: z5.tuple([z5.string(), z5.string()]),
	["message" /* Message */]: z5.tuple([
		z5.object({
			taskId: z5.string(),
			action: z5.union([z5.literal("created"), z5.literal("updated")]),
			message: clineMessageSchema,
		}),
	]),
	["taskModeSwitched" /* TaskModeSwitched */]: z5.tuple([z5.string(), z5.string()]),
	["taskAskResponded" /* TaskAskResponded */]: z5.tuple([z5.string()]),
	["taskUserMessage" /* TaskUserMessage */]: z5.tuple([z5.string()]),
	["taskToolFailed" /* TaskToolFailed */]: z5.tuple([z5.string(), toolNamesSchema, z5.string()]),
	["taskTokenUsageUpdated" /* TaskTokenUsageUpdated */]: z5.tuple([z5.string(), tokenUsageSchema]),
	["modeChanged" /* ModeChanged */]: z5.tuple([z5.string()]),
	["providerProfileChanged" /* ProviderProfileChanged */]: z5.tuple([
		z5.object({ name: z5.string(), provider: z5.string() }),
	]),
})
var taskEventSchema = z5.discriminatedUnion("eventName", [
	// Task Provider Lifecycle
	z5.object({
		eventName: z5.literal("taskCreated" /* TaskCreated */),
		payload: rooCodeEventsSchema.shape["taskCreated" /* TaskCreated */],
		taskId: z5.number().optional(),
	}),
	// Task Lifecycle
	z5.object({
		eventName: z5.literal("taskStarted" /* TaskStarted */),
		payload: rooCodeEventsSchema.shape["taskStarted" /* TaskStarted */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskCompleted" /* TaskCompleted */),
		payload: rooCodeEventsSchema.shape["taskCompleted" /* TaskCompleted */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskAborted" /* TaskAborted */),
		payload: rooCodeEventsSchema.shape["taskAborted" /* TaskAborted */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskFocused" /* TaskFocused */),
		payload: rooCodeEventsSchema.shape["taskFocused" /* TaskFocused */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskUnfocused" /* TaskUnfocused */),
		payload: rooCodeEventsSchema.shape["taskUnfocused" /* TaskUnfocused */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskActive" /* TaskActive */),
		payload: rooCodeEventsSchema.shape["taskActive" /* TaskActive */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskInteractive" /* TaskInteractive */),
		payload: rooCodeEventsSchema.shape["taskInteractive" /* TaskInteractive */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskResumable" /* TaskResumable */),
		payload: rooCodeEventsSchema.shape["taskResumable" /* TaskResumable */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskIdle" /* TaskIdle */),
		payload: rooCodeEventsSchema.shape["taskIdle" /* TaskIdle */],
		taskId: z5.number().optional(),
	}),
	// Subtask Lifecycle
	z5.object({
		eventName: z5.literal("taskPaused" /* TaskPaused */),
		payload: rooCodeEventsSchema.shape["taskPaused" /* TaskPaused */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskUnpaused" /* TaskUnpaused */),
		payload: rooCodeEventsSchema.shape["taskUnpaused" /* TaskUnpaused */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskSpawned" /* TaskSpawned */),
		payload: rooCodeEventsSchema.shape["taskSpawned" /* TaskSpawned */],
		taskId: z5.number().optional(),
	}),
	// Task Execution
	z5.object({
		eventName: z5.literal("message" /* Message */),
		payload: rooCodeEventsSchema.shape["message" /* Message */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskModeSwitched" /* TaskModeSwitched */),
		payload: rooCodeEventsSchema.shape["taskModeSwitched" /* TaskModeSwitched */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskAskResponded" /* TaskAskResponded */),
		payload: rooCodeEventsSchema.shape["taskAskResponded" /* TaskAskResponded */],
		taskId: z5.number().optional(),
	}),
	// Task Analytics
	z5.object({
		eventName: z5.literal("taskToolFailed" /* TaskToolFailed */),
		payload: rooCodeEventsSchema.shape["taskToolFailed" /* TaskToolFailed */],
		taskId: z5.number().optional(),
	}),
	z5.object({
		eventName: z5.literal("taskTokenUsageUpdated" /* TaskTokenUsageUpdated */),
		payload: rooCodeEventsSchema.shape["taskTokenUsageUpdated" /* TaskTokenUsageUpdated */],
		taskId: z5.number().optional(),
	}),
	// Evals
	z5.object({
		eventName: z5.literal("evalPass" /* EvalPass */),
		payload: z5.undefined(),
		taskId: z5.number(),
	}),
	z5.object({
		eventName: z5.literal("evalFail" /* EvalFail */),
		payload: z5.undefined(),
		taskId: z5.number(),
	}),
])

// src/task.ts
import { z as z6 } from "zod"
var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
	TaskStatus2["Running"] = "running"
	TaskStatus2["Interactive"] = "interactive"
	TaskStatus2["Resumable"] = "resumable"
	TaskStatus2["Idle"] = "idle"
	TaskStatus2["None"] = "none"
	return TaskStatus2
})(TaskStatus || {})
var taskMetadataSchema = z6.object({
	task: z6.string().optional(),
	images: z6.array(z6.string()).optional(),
})

// src/global-settings.ts
import { z as z17 } from "zod"

// src/provider-settings.ts
import { z as z11 } from "zod"

// src/model.ts
import { z as z7 } from "zod"
var reasoningEfforts = ["low", "medium", "high"]
var reasoningEffortsSchema = z7.enum(reasoningEfforts)
var reasoningEffortWithMinimalSchema = z7.union([reasoningEffortsSchema, z7.literal("minimal")])
var reasoningEffortsExtended = ["none", "minimal", "low", "medium", "high"]
var reasoningEffortExtendedSchema = z7.enum(reasoningEffortsExtended)
var reasoningEffortSettingValues = ["disable", "none", "minimal", "low", "medium", "high"]
var reasoningEffortSettingSchema = z7.enum(reasoningEffortSettingValues)
var verbosityLevels = ["low", "medium", "high"]
var verbosityLevelsSchema = z7.enum(verbosityLevels)
var serviceTiers = ["default", "flex", "priority"]
var serviceTierSchema = z7.enum(serviceTiers)
var modelParameters = ["max_tokens", "temperature", "reasoning", "include_reasoning"]
var modelParametersSchema = z7.enum(modelParameters)
var isModelParameter = (value) => modelParameters.includes(value)
var modelInfoSchema = z7.object({
	maxTokens: z7.number().nullish(),
	maxThinkingTokens: z7.number().nullish(),
	contextWindow: z7.number(),
	supportsImages: z7.boolean().optional(),
	supportsComputerUse: z7.boolean().optional(),
	// kilocode_change
	supportsPromptCache: z7.boolean(),
	// Optional default prompt cache retention policy for providers that support it.
	// When set to "24h", extended prompt caching will be requested; when omitted
	// or set to "in_memory", the default in‑memory cache is used.
	promptCacheRetention: z7.enum(["in_memory", "24h"]).optional(),
	// Capability flag to indicate whether the model supports an output verbosity parameter
	supportsVerbosity: z7.boolean().optional(),
	supportsReasoningBudget: z7.boolean().optional(),
	// Capability flag to indicate whether the model supports simple on/off binary reasoning
	supportsReasoningBinary: z7.boolean().optional(),
	// Capability flag to indicate whether the model supports temperature parameter
	supportsTemperature: z7.boolean().optional(),
	defaultTemperature: z7.number().optional(),
	requiredReasoningBudget: z7.boolean().optional(),
	supportsReasoningEffort: z7
		.union([z7.boolean(), z7.array(z7.enum(["disable", "none", "minimal", "low", "medium", "high"]))])
		.optional(),
	requiredReasoningEffort: z7.boolean().optional(),
	preserveReasoning: z7.boolean().optional(),
	supportedParameters: z7.array(modelParametersSchema).optional(),
	inputPrice: z7.number().optional(),
	outputPrice: z7.number().optional(),
	cacheWritesPrice: z7.number().optional(),
	cacheReadsPrice: z7.number().optional(),
	description: z7.string().optional(),
	// Default effort value for models that support reasoning effort
	reasoningEffort: reasoningEffortExtendedSchema.optional(),
	minTokensPerCachePoint: z7.number().optional(),
	maxCachePoints: z7.number().optional(),
	cachableFields: z7.array(z7.string()).optional(),
	// kilocode_change start
	displayName: z7.string().nullish(),
	preferredIndex: z7.number().nullish(),
	// kilocode_change end
	// Flag to indicate if the model is deprecated and should not be used
	deprecated: z7.boolean().optional(),
	// Flag to indicate if the model is free (no cost)
	isFree: z7.boolean().optional(),
	// Flag to indicate if the model supports native tool calling (OpenAI-style function calling)
	supportsNativeTools: z7.boolean().optional(),
	/**
	 * Service tiers with pricing information.
	 * Each tier can have a name (for OpenAI service tiers) and pricing overrides.
	 * The top-level input/output/cache* fields represent the default/standard tier.
	 */
	tiers: z7
		.array(
			z7.object({
				name: serviceTierSchema.optional(),
				// Service tier name (flex, priority, etc.)
				contextWindow: z7.number(),
				inputPrice: z7.number().optional(),
				outputPrice: z7.number().optional(),
				cacheWritesPrice: z7.number().optional(),
				cacheReadsPrice: z7.number().optional(),
			}),
		)
		.optional(),
})

// src/codebase-index.ts
import { z as z8 } from "zod"
var CODEBASE_INDEX_DEFAULTS = {
	MIN_SEARCH_RESULTS: 10,
	MAX_SEARCH_RESULTS: 200,
	DEFAULT_SEARCH_RESULTS: 50,
	SEARCH_RESULTS_STEP: 10,
	MIN_SEARCH_SCORE: 0,
	MAX_SEARCH_SCORE: 1,
	DEFAULT_SEARCH_MIN_SCORE: 0.4,
	SEARCH_SCORE_STEP: 0.05,
}
var codebaseIndexConfigSchema = z8.object({
	codebaseIndexEnabled: z8.boolean().optional(),
	codebaseIndexQdrantUrl: z8.string().optional(),
	codebaseIndexEmbedderProvider: z8
		.enum(["openai", "ollama", "openai-compatible", "gemini", "mistral", "vercel-ai-gateway", "openrouter"])
		.optional(),
	// kilocode_change start
	codebaseIndexVectorStoreProvider: z8.enum(["lancedb", "qdrant"]).optional(),
	codebaseIndexLancedbVectorStoreDirectory: z8.string().optional(),
	// kilocode_change end
	codebaseIndexEmbedderBaseUrl: z8.string().optional(),
	codebaseIndexEmbedderModelId: z8.string().optional(),
	codebaseIndexEmbedderModelDimension: z8.number().optional(),
	codebaseIndexSearchMinScore: z8.number().min(0).max(1).optional(),
	codebaseIndexSearchMaxResults: z8
		.number()
		.min(CODEBASE_INDEX_DEFAULTS.MIN_SEARCH_RESULTS)
		.max(CODEBASE_INDEX_DEFAULTS.MAX_SEARCH_RESULTS)
		.optional(),
	// OpenAI Compatible specific fields
	codebaseIndexOpenAiCompatibleBaseUrl: z8.string().optional(),
	codebaseIndexOpenAiCompatibleModelDimension: z8.number().optional(),
})
var codebaseIndexModelsSchema = z8.object({
	openai: z8.record(z8.string(), z8.object({ dimension: z8.number() })).optional(),
	ollama: z8.record(z8.string(), z8.object({ dimension: z8.number() })).optional(),
	"openai-compatible": z8.record(z8.string(), z8.object({ dimension: z8.number() })).optional(),
	gemini: z8.record(z8.string(), z8.object({ dimension: z8.number() })).optional(),
	mistral: z8.record(z8.string(), z8.object({ dimension: z8.number() })).optional(),
	"vercel-ai-gateway": z8.record(z8.string(), z8.object({ dimension: z8.number() })).optional(),
	openrouter: z8.record(z8.string(), z8.object({ dimension: z8.number() })).optional(),
})
var codebaseIndexProviderSchema = z8.object({
	codeIndexOpenAiKey: z8.string().optional(),
	codeIndexQdrantApiKey: z8.string().optional(),
	codebaseIndexOpenAiCompatibleBaseUrl: z8.string().optional(),
	codebaseIndexOpenAiCompatibleApiKey: z8.string().optional(),
	codebaseIndexOpenAiCompatibleModelDimension: z8.number().optional(),
	codebaseIndexGeminiApiKey: z8.string().optional(),
	codebaseIndexMistralApiKey: z8.string().optional(),
	codebaseIndexVercelAiGatewayApiKey: z8.string().optional(),
	codebaseIndexOpenRouterApiKey: z8.string().optional(),
})

// src/profile-type.ts
import { z as z9 } from "zod"
var profileTypes = ["chat", "autocomplete"]
var profileTypeSchema = z9.enum(profileTypes)
var DEFAULT_PROFILE_TYPE = "chat"

// src/providers/anthropic.ts
var anthropicDefaultModelId = "claude-sonnet-4-5"
var anthropicModels = {
	"claude-sonnet-4-5": {
		maxTokens: 64e3,
		// Overridden to 8k if `enableReasoningEffort` is false.
		contextWindow: 2e5,
		// Default 200K, extendable to 1M with beta flag 'context-1m-2025-08-07'
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		// $3 per million input tokens (≤200K context)
		outputPrice: 15,
		// $15 per million output tokens (≤200K context)
		cacheWritesPrice: 3.75,
		// $3.75 per million tokens
		cacheReadsPrice: 0.3,
		// $0.30 per million tokens
		supportsReasoningBudget: true,
		// Tiered pricing for extended context (requires beta flag 'context-1m-2025-08-07')
		tiers: [
			{
				contextWindow: 1e6,
				// 1M tokens with beta flag
				inputPrice: 6,
				// $6 per million input tokens (>200K context)
				outputPrice: 22.5,
				// $22.50 per million output tokens (>200K context)
				cacheWritesPrice: 7.5,
				// $7.50 per million tokens (>200K context)
				cacheReadsPrice: 0.6,
				// $0.60 per million tokens (>200K context)
			},
		],
	},
	"claude-sonnet-4-20250514": {
		maxTokens: 64e3,
		// Overridden to 8k if `enableReasoningEffort` is false.
		contextWindow: 2e5,
		// Default 200K, extendable to 1M with beta flag 'context-1m-2025-08-07'
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		// $3 per million input tokens (≤200K context)
		outputPrice: 15,
		// $15 per million output tokens (≤200K context)
		cacheWritesPrice: 3.75,
		// $3.75 per million tokens
		cacheReadsPrice: 0.3,
		// $0.30 per million tokens
		supportsReasoningBudget: true,
		// Tiered pricing for extended context (requires beta flag 'context-1m-2025-08-07')
		tiers: [
			{
				contextWindow: 1e6,
				// 1M tokens with beta flag
				inputPrice: 6,
				// $6 per million input tokens (>200K context)
				outputPrice: 22.5,
				// $22.50 per million output tokens (>200K context)
				cacheWritesPrice: 7.5,
				// $7.50 per million tokens (>200K context)
				cacheReadsPrice: 0.6,
				// $0.60 per million tokens (>200K context)
			},
		],
	},
	"claude-opus-4-5-20251101": {
		maxTokens: 32e3,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 5,
		outputPrice: 25,
		cacheWritesPrice: 6.25,
		cacheReadsPrice: 0.5,
		supportsReasoningBudget: true,
		supportsVerbosity: true,
		// kilocode_change
	},
	"claude-opus-4-1-20250805": {
		maxTokens: 32e3,
		// Overridden to 8k if `enableReasoningEffort` is false.
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		// $15 per million input tokens
		outputPrice: 75,
		// $75 per million output tokens
		cacheWritesPrice: 18.75,
		// $18.75 per million tokens
		cacheReadsPrice: 1.5,
		// $1.50 per million tokens
		supportsReasoningBudget: true,
	},
	"claude-opus-4-20250514": {
		maxTokens: 32e3,
		// Overridden to 8k if `enableReasoningEffort` is false.
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		// $15 per million input tokens
		outputPrice: 75,
		// $75 per million output tokens
		cacheWritesPrice: 18.75,
		// $18.75 per million tokens
		cacheReadsPrice: 1.5,
		// $1.50 per million tokens
		supportsReasoningBudget: true,
	},
	"claude-3-7-sonnet-20250219:thinking": {
		maxTokens: 128e3,
		// Unlocked by passing `beta` flag to the model. Otherwise, it's 64k.
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		// $3 per million input tokens
		outputPrice: 15,
		// $15 per million output tokens
		cacheWritesPrice: 3.75,
		// $3.75 per million tokens
		cacheReadsPrice: 0.3,
		// $0.30 per million tokens
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"claude-3-7-sonnet-20250219": {
		maxTokens: 8192,
		// Since we already have a `:thinking` virtual model we aren't setting `supportsReasoningBudget: true` here.
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		// $3 per million input tokens
		outputPrice: 15,
		// $15 per million output tokens
		cacheWritesPrice: 3.75,
		// $3.75 per million tokens
		cacheReadsPrice: 0.3,
		// $0.30 per million tokens
	},
	"claude-3-5-sonnet-20241022": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		// $3 per million input tokens
		outputPrice: 15,
		// $15 per million output tokens
		cacheWritesPrice: 3.75,
		// $3.75 per million tokens
		cacheReadsPrice: 0.3,
		// $0.30 per million tokens
	},
	"claude-3-5-haiku-20241022": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 1,
		outputPrice: 5,
		cacheWritesPrice: 1.25,
		cacheReadsPrice: 0.1,
	},
	"claude-3-opus-20240229": {
		maxTokens: 4096,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		outputPrice: 75,
		cacheWritesPrice: 18.75,
		cacheReadsPrice: 1.5,
	},
	"claude-3-haiku-20240307": {
		maxTokens: 4096,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.25,
		outputPrice: 1.25,
		cacheWritesPrice: 0.3,
		cacheReadsPrice: 0.03,
	},
	"claude-haiku-4-5-20251001": {
		maxTokens: 64e3,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1,
		outputPrice: 5,
		cacheWritesPrice: 1.25,
		cacheReadsPrice: 0.1,
		supportsReasoningBudget: true,
		description:
			"Claude Haiku 4.5 delivers near-frontier intelligence at lightning speeds with extended thinking, vision, and multilingual support.",
	},
}
var ANTHROPIC_DEFAULT_MAX_TOKENS = 8192

// src/providers/bedrock.ts
var bedrockDefaultModelId = "anthropic.claude-sonnet-4-5-20250929-v1:0"
var bedrockDefaultPromptRouterModelId = "anthropic.claude-3-sonnet-20240229-v1:0"
var bedrockModels = {
	"anthropic.claude-sonnet-4-5-20250929-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningBudget: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
		minTokensPerCachePoint: 1024,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"amazon.nova-pro-v1:0": {
		maxTokens: 5e3,
		contextWindow: 3e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.8,
		outputPrice: 3.2,
		cacheWritesPrice: 0.8,
		// per million tokens
		cacheReadsPrice: 0.2,
		// per million tokens
		minTokensPerCachePoint: 1,
		maxCachePoints: 1,
		cachableFields: ["system"],
	},
	"amazon.nova-pro-latency-optimized-v1:0": {
		maxTokens: 5e3,
		contextWindow: 3e5,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 1,
		outputPrice: 4,
		cacheWritesPrice: 1,
		// per million tokens
		cacheReadsPrice: 0.25,
		// per million tokens
		description: "Amazon Nova Pro with latency optimized inference",
	},
	"amazon.nova-lite-v1:0": {
		maxTokens: 5e3,
		contextWindow: 3e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.06,
		outputPrice: 0.24,
		cacheWritesPrice: 0.06,
		// per million tokens
		cacheReadsPrice: 0.015,
		// per million tokens
		minTokensPerCachePoint: 1,
		maxCachePoints: 1,
		cachableFields: ["system"],
	},
	"amazon.nova-micro-v1:0": {
		maxTokens: 5e3,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.035,
		outputPrice: 0.14,
		cacheWritesPrice: 0.035,
		// per million tokens
		cacheReadsPrice: 875e-5,
		// per million tokens
		minTokensPerCachePoint: 1,
		maxCachePoints: 1,
		cachableFields: ["system"],
	},
	"anthropic.claude-sonnet-4-20250514-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningBudget: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
		minTokensPerCachePoint: 1024,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"anthropic.claude-opus-4-1-20250805-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningBudget: true,
		inputPrice: 15,
		outputPrice: 75,
		cacheWritesPrice: 18.75,
		cacheReadsPrice: 1.5,
		minTokensPerCachePoint: 1024,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"anthropic.claude-opus-4-20250514-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningBudget: true,
		inputPrice: 15,
		outputPrice: 75,
		cacheWritesPrice: 18.75,
		cacheReadsPrice: 1.5,
		minTokensPerCachePoint: 1024,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"anthropic.claude-3-7-sonnet-20250219-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningBudget: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
		minTokensPerCachePoint: 1024,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"anthropic.claude-3-5-sonnet-20241022-v2:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
		minTokensPerCachePoint: 1024,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"anthropic.claude-3-5-haiku-20241022-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.8,
		outputPrice: 4,
		cacheWritesPrice: 1,
		cacheReadsPrice: 0.08,
		minTokensPerCachePoint: 2048,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"anthropic.claude-haiku-4-5-20251001-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningBudget: true,
		inputPrice: 1,
		outputPrice: 5,
		cacheWritesPrice: 1.25,
		// 5m cache writes
		cacheReadsPrice: 0.1,
		// cache hits / refreshes
		minTokensPerCachePoint: 2048,
		maxCachePoints: 4,
		cachableFields: ["system", "messages", "tools"],
	},
	"anthropic.claude-3-5-sonnet-20240620-v1:0": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 3,
		outputPrice: 15,
	},
	"anthropic.claude-3-opus-20240229-v1:0": {
		maxTokens: 4096,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 15,
		outputPrice: 75,
	},
	"anthropic.claude-3-sonnet-20240229-v1:0": {
		maxTokens: 4096,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 3,
		outputPrice: 15,
	},
	"anthropic.claude-3-haiku-20240307-v1:0": {
		maxTokens: 4096,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.25,
		outputPrice: 1.25,
	},
	"anthropic.claude-2-1-v1:0": {
		maxTokens: 4096,
		contextWindow: 1e5,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 8,
		outputPrice: 24,
		description: "Claude 2.1",
	},
	"anthropic.claude-2-0-v1:0": {
		maxTokens: 4096,
		contextWindow: 1e5,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 8,
		outputPrice: 24,
		description: "Claude 2.0",
	},
	"anthropic.claude-instant-v1:0": {
		maxTokens: 4096,
		contextWindow: 1e5,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.8,
		outputPrice: 2.4,
		description: "Claude Instant",
	},
	"deepseek.r1-v1:0": {
		maxTokens: 32768,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 1.35,
		outputPrice: 5.4,
	},
	"openai.gpt-oss-20b-1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.5,
		outputPrice: 1.5,
		description: "GPT-OSS 20B - Optimized for low latency and local/specialized use cases",
	},
	"openai.gpt-oss-120b-1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 2,
		outputPrice: 6,
		description: "GPT-OSS 120B - Production-ready, general-purpose, high-reasoning model",
	},
	"meta.llama3-3-70b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.72,
		outputPrice: 0.72,
		description: "Llama 3.3 Instruct (70B)",
	},
	"meta.llama3-2-90b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.72,
		outputPrice: 0.72,
		description: "Llama 3.2 Instruct (90B)",
	},
	"meta.llama3-2-11b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.16,
		outputPrice: 0.16,
		description: "Llama 3.2 Instruct (11B)",
	},
	"meta.llama3-2-3b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 0.15,
		description: "Llama 3.2 Instruct (3B)",
	},
	"meta.llama3-2-1b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		outputPrice: 0.1,
		description: "Llama 3.2 Instruct (1B)",
	},
	"meta.llama3-1-405b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 2.4,
		outputPrice: 2.4,
		description: "Llama 3.1 Instruct (405B)",
	},
	"meta.llama3-1-70b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.72,
		outputPrice: 0.72,
		description: "Llama 3.1 Instruct (70B)",
	},
	"meta.llama3-1-70b-instruct-latency-optimized-v1:0": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.9,
		outputPrice: 0.9,
		description: "Llama 3.1 Instruct (70B) (w/ latency optimized inference)",
	},
	"meta.llama3-1-8b-instruct-v1:0": {
		maxTokens: 8192,
		contextWindow: 8e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.22,
		outputPrice: 0.22,
		description: "Llama 3.1 Instruct (8B)",
	},
	"meta.llama3-70b-instruct-v1:0": {
		maxTokens: 2048,
		contextWindow: 8e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 2.65,
		outputPrice: 3.5,
	},
	"meta.llama3-8b-instruct-v1:0": {
		maxTokens: 2048,
		contextWindow: 4e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.3,
		outputPrice: 0.6,
	},
	"amazon.titan-text-lite-v1:0": {
		maxTokens: 4096,
		contextWindow: 8e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 0.2,
		description: "Amazon Titan Text Lite",
	},
	"amazon.titan-text-express-v1:0": {
		maxTokens: 4096,
		contextWindow: 8e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.2,
		outputPrice: 0.6,
		description: "Amazon Titan Text Express",
	},
	"amazon.titan-text-embeddings-v1:0": {
		maxTokens: 8192,
		contextWindow: 8e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		description: "Amazon Titan Text Embeddings",
	},
	"amazon.titan-text-embeddings-v2:0": {
		maxTokens: 8192,
		contextWindow: 8e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.02,
		description: "Amazon Titan Text Embeddings V2",
	},
}
var BEDROCK_DEFAULT_TEMPERATURE = 0.3
var BEDROCK_MAX_TOKENS = 4096
var BEDROCK_DEFAULT_CONTEXT = 128e3
var AWS_INFERENCE_PROFILE_MAPPING = [
	// Australia regions (Sydney and Melbourne) → au. inference profile (most specific - 14 chars)
	["ap-southeast-2", "au."],
	["ap-southeast-4", "au."],
	// Japan regions (Tokyo and Osaka) → jp. inference profile (13 chars)
	["ap-northeast-", "jp."],
	// US Government Cloud → ug. inference profile (7 chars)
	["us-gov-", "ug."],
	// Americas regions → us. inference profile (3 chars)
	["us-", "us."],
	// Europe regions → eu. inference profile (3 chars)
	["eu-", "eu."],
	// Asia Pacific regions → apac. inference profile (3 chars)
	["ap-", "apac."],
	// Canada regions → ca. inference profile (3 chars)
	["ca-", "ca."],
	// South America regions → sa. inference profile (3 chars)
	["sa-", "sa."],
]
var BEDROCK_REGIONS = [
	{ value: "us-east-1", label: "us-east-1" },
	{ value: "us-east-2", label: "us-east-2" },
	{ value: "us-west-1", label: "us-west-1" },
	{ value: "us-west-2", label: "us-west-2" },
	{ value: "ap-northeast-1", label: "ap-northeast-1" },
	{ value: "ap-northeast-2", label: "ap-northeast-2" },
	{ value: "ap-northeast-3", label: "ap-northeast-3" },
	{ value: "ap-south-1", label: "ap-south-1" },
	{ value: "ap-south-2", label: "ap-south-2" },
	{ value: "ap-southeast-1", label: "ap-southeast-1" },
	{ value: "ap-southeast-2", label: "ap-southeast-2" },
	{ value: "ap-east-1", label: "ap-east-1" },
	{ value: "eu-central-1", label: "eu-central-1" },
	{ value: "eu-central-2", label: "eu-central-2" },
	{ value: "eu-west-1", label: "eu-west-1" },
	{ value: "eu-west-2", label: "eu-west-2" },
	{ value: "eu-west-3", label: "eu-west-3" },
	{ value: "eu-north-1", label: "eu-north-1" },
	{ value: "eu-south-1", label: "eu-south-1" },
	{ value: "eu-south-2", label: "eu-south-2" },
	{ value: "ca-central-1", label: "ca-central-1" },
	{ value: "sa-east-1", label: "sa-east-1" },
	{ value: "us-gov-east-1", label: "us-gov-east-1" },
	{ value: "us-gov-west-1", label: "us-gov-west-1" },
].sort((a, b) => a.value.localeCompare(b.value))
var BEDROCK_1M_CONTEXT_MODEL_IDS = [
	"anthropic.claude-sonnet-4-20250514-v1:0",
	"anthropic.claude-sonnet-4-5-20250929-v1:0",
]
var BEDROCK_GLOBAL_INFERENCE_MODEL_IDS = [
	"anthropic.claude-sonnet-4-20250514-v1:0",
	"anthropic.claude-sonnet-4-5-20250929-v1:0",
	"anthropic.claude-haiku-4-5-20251001-v1:0",
]

// src/providers/cerebras.ts
var cerebrasDefaultModelId = "gpt-oss-120b"
var cerebrasModels = {
	"zai-glm-4.6": {
		maxTokens: 16384,
		// consistent with their other models
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Highly intelligent general purpose model with up to 1,000 tokens/s",
	},
	"qwen-3-coder-480b-free": {
		maxTokens: 4e4,
		contextWindow: 64e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"[SOON TO BE DEPRECATED] SOTA coding model with ~2000 tokens/s ($0 free tier)\n\n\u2022 Use this if you don't have a Cerebras subscription\n\u2022 64K context window\n\u2022 Rate limits: 150K TPM, 1M TPH/TPD, 10 RPM, 100 RPH/RPD\n\nUpgrade for higher limits: [https://cloud.cerebras.ai/?utm=roocode](https://cloud.cerebras.ai/?utm=roocode)",
	},
	"qwen-3-coder-480b": {
		maxTokens: 4e4,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"[SOON TO BE DEPRECATED] SOTA coding model with ~2000 tokens/s ($50/$250 paid tiers)\n\n\u2022 Use this if you have a Cerebras subscription\n\u2022 131K context window with higher rate limits",
	},
	"qwen-3-235b-a22b-instruct-2507": {
		maxTokens: 64e3,
		contextWindow: 64e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Intelligent model with ~1400 tokens/s",
	},
	"llama-3.3-70b": {
		maxTokens: 64e3,
		contextWindow: 64e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Powerful model with ~2600 tokens/s",
	},
	"qwen-3-32b": {
		maxTokens: 64e3,
		contextWindow: 64e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "SOTA coding performance with ~2500 tokens/s",
	},
	"qwen-3-235b-a22b-thinking-2507": {
		maxTokens: 4e4,
		contextWindow: 65e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "SOTA performance with ~1500 tokens/s",
		supportsReasoningEffort: true,
	},
	"gpt-oss-120b": {
		maxTokens: 8e3,
		contextWindow: 64e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"OpenAI GPT OSS model with ~2800 tokens/s\n\n\u2022 64K context window\n\u2022 Excels at efficient reasoning across science, math, and coding",
	},
}

// src/providers/chutes.ts
var chutesDefaultModelId = "deepseek-ai/DeepSeek-R1-0528"
var chutesModels = {
	"deepseek-ai/DeepSeek-R1-0528": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek R1 0528 model.",
	},
	"deepseek-ai/DeepSeek-R1": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek R1 model.",
	},
	"deepseek-ai/DeepSeek-V3": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek V3 model.",
	},
	"deepseek-ai/DeepSeek-V3.1": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek V3.1 model.",
	},
	"deepseek-ai/DeepSeek-V3.1-Terminus": {
		maxTokens: 163840,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.23,
		outputPrice: 0.9,
		description:
			"DeepSeek\u2011V3.1\u2011Terminus is an update to V3.1 that improves language consistency by reducing CN/EN mix\u2011ups and eliminating random characters, while strengthening agent capabilities with notably better Code Agent and Search Agent performance.",
	},
	"deepseek-ai/DeepSeek-V3.1-turbo": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 1,
		outputPrice: 3,
		description:
			"DeepSeek-V3.1-turbo is an FP8, speculative-decoding turbo variant optimized for ultra-fast single-shot queries (~200 TPS), with outputs close to the originals and solid function calling/reasoning/structured output, priced at $1/M input and $3/M output tokens, using 2\xD7 quota per request and not intended for bulk workloads.",
	},
	"deepseek-ai/DeepSeek-V3.2-Exp": {
		maxTokens: 163840,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.25,
		outputPrice: 0.35,
		description:
			"DeepSeek-V3.2-Exp is an experimental LLM that introduces DeepSeek Sparse Attention to improve long\u2011context training and inference efficiency while maintaining performance comparable to V3.1\u2011Terminus.",
	},
	"unsloth/Llama-3.3-70B-Instruct": {
		maxTokens: 32768,
		// From Groq
		contextWindow: 131072,
		// From Groq
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Unsloth Llama 3.3 70B Instruct model.",
	},
	"chutesai/Llama-4-Scout-17B-16E-Instruct": {
		maxTokens: 32768,
		contextWindow: 512e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "ChutesAI Llama 4 Scout 17B Instruct model, 512K context.",
	},
	"unsloth/Mistral-Nemo-Instruct-2407": {
		maxTokens: 32768,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Unsloth Mistral Nemo Instruct model.",
	},
	"unsloth/gemma-3-12b-it": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Unsloth Gemma 3 12B IT model.",
	},
	"NousResearch/DeepHermes-3-Llama-3-8B-Preview": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Nous DeepHermes 3 Llama 3 8B Preview model.",
	},
	"unsloth/gemma-3-4b-it": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Unsloth Gemma 3 4B IT model.",
	},
	"nvidia/Llama-3_3-Nemotron-Super-49B-v1": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Nvidia Llama 3.3 Nemotron Super 49B model.",
	},
	"nvidia/Llama-3_1-Nemotron-Ultra-253B-v1": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Nvidia Llama 3.1 Nemotron Ultra 253B model.",
	},
	"chutesai/Llama-4-Maverick-17B-128E-Instruct-FP8": {
		maxTokens: 32768,
		contextWindow: 256e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "ChutesAI Llama 4 Maverick 17B Instruct FP8 model.",
	},
	"deepseek-ai/DeepSeek-V3-Base": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek V3 Base model.",
	},
	"deepseek-ai/DeepSeek-R1-Zero": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek R1 Zero model.",
	},
	"deepseek-ai/DeepSeek-V3-0324": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek V3 (0324) model.",
	},
	"Qwen/Qwen3-235B-A22B-Instruct-2507": {
		maxTokens: 32768,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 235B A22B Instruct 2507 model with 262K context window.",
	},
	"Qwen/Qwen3-235B-A22B": {
		maxTokens: 32768,
		contextWindow: 40960,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 235B A22B model.",
	},
	"Qwen/Qwen3-32B": {
		maxTokens: 32768,
		contextWindow: 40960,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 32B model.",
	},
	"Qwen/Qwen3-30B-A3B": {
		maxTokens: 32768,
		contextWindow: 40960,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 30B A3B model.",
	},
	"Qwen/Qwen3-14B": {
		maxTokens: 32768,
		contextWindow: 40960,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 14B model.",
	},
	"Qwen/Qwen3-8B": {
		maxTokens: 32768,
		contextWindow: 40960,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 8B model.",
	},
	"microsoft/MAI-DS-R1-FP8": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Microsoft MAI-DS-R1 FP8 model.",
	},
	"tngtech/DeepSeek-R1T-Chimera": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "TNGTech DeepSeek R1T Chimera model.",
	},
	"zai-org/GLM-4.5-Air": {
		maxTokens: 32768,
		contextWindow: 151329,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"GLM-4.5-Air model with 151,329 token context window and 106B total parameters with 12B activated.",
	},
	"zai-org/GLM-4.5-FP8": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"GLM-4.5-FP8 model with 128k token context window, optimized for agent-based applications with MoE architecture.",
	},
	"zai-org/GLM-4.5-turbo": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 1,
		outputPrice: 3,
		description: "GLM-4.5-turbo model with 128K token context window, optimized for fast inference.",
	},
	"zai-org/GLM-4.6-FP8": {
		maxTokens: 32768,
		contextWindow: 202752,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"GLM-4.6 introduces major upgrades over GLM-4.5, including a longer 200K-token context window for complex tasks, stronger coding performance in benchmarks and real-world tools (such as Claude Code, Cline, Roo Code, and Kilo Code), improved reasoning with tool use during inference, more capable and efficient agent integration, and refined writing that better matches human style, readability, and natural role-play scenarios.",
	},
	"zai-org/GLM-4.6-turbo": {
		maxTokens: 202752,
		// From Chutes /v1/models: max_output_length
		contextWindow: 202752,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 1.15,
		outputPrice: 3.25,
		description: "GLM-4.6-turbo model with 200K-token context window, optimized for fast inference.",
	},
	"meituan-longcat/LongCat-Flash-Thinking-FP8": {
		maxTokens: 32768,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"LongCat Flash Thinking FP8 model with 128K context window, optimized for complex reasoning and coding tasks.",
	},
	"Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8": {
		maxTokens: 32768,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 Coder 480B A35B Instruct FP8 model, optimized for coding tasks.",
	},
	"moonshotai/Kimi-K2-Instruct-75k": {
		maxTokens: 32768,
		contextWindow: 75e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1481,
		outputPrice: 0.5926,
		description: "Moonshot AI Kimi K2 Instruct model with 75k context window.",
	},
	"moonshotai/Kimi-K2-Instruct-0905": {
		maxTokens: 32768,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1999,
		outputPrice: 0.8001,
		description: "Moonshot AI Kimi K2 Instruct 0905 model with 256k context window.",
	},
	"Qwen/Qwen3-235B-A22B-Thinking-2507": {
		maxTokens: 32768,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.077968332,
		outputPrice: 0.31202496,
		description: "Qwen3 235B A22B Thinking 2507 model with 262K context window.",
	},
	"Qwen/Qwen3-Next-80B-A3B-Instruct": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"Fast, stable instruction-tuned model optimized for complex tasks, RAG, and tool use without thinking traces.",
	},
	"Qwen/Qwen3-Next-80B-A3B-Thinking": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"Reasoning-first model with structured thinking traces for multi-step problems, math proofs, and code synthesis.",
	},
	"Qwen/Qwen3-VL-235B-A22B-Thinking": {
		maxTokens: 262144,
		contextWindow: 262144,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.16,
		outputPrice: 0.65,
		description:
			"Qwen3\u2011VL\u2011235B\u2011A22B\u2011Thinking is an open\u2011weight MoE vision\u2011language model (235B total, ~22B activated) optimized for deliberate multi\u2011step reasoning with strong text\u2011image\u2011video understanding and long\u2011context capabilities.",
	},
}
var chutesDefaultModelInfo = chutesModels[chutesDefaultModelId]

// src/providers/claude-code.ts
var VERTEX_DATE_PATTERN = /-(\d{8})$/
function convertModelNameForVertex(modelName) {
	return modelName.replace(VERTEX_DATE_PATTERN, "@$1")
}
var claudeCodeDefaultModelId = "claude-sonnet-4-5"
var CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS = 16e3
function getClaudeCodeModelId(baseModelId, useVertex = false) {
	return useVertex ? convertModelNameForVertex(baseModelId) : baseModelId
}
var claudeCodeModels = {
	"claude-sonnet-4-5": {
		...anthropicModels["claude-sonnet-4-5"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-sonnet-4-5-20250929[1m]": {
		...anthropicModels["claude-sonnet-4-5"],
		contextWindow: 1e6,
		// 1M token context window (requires [1m] suffix)
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-sonnet-4-20250514": {
		...anthropicModels["claude-sonnet-4-20250514"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-opus-4-5-20251101": {
		...anthropicModels["claude-opus-4-5-20251101"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-opus-4-1-20250805": {
		...anthropicModels["claude-opus-4-1-20250805"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-opus-4-20250514": {
		...anthropicModels["claude-opus-4-20250514"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-3-7-sonnet-20250219": {
		...anthropicModels["claude-3-7-sonnet-20250219"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-3-5-sonnet-20241022": {
		...anthropicModels["claude-3-5-sonnet-20241022"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-3-5-haiku-20241022": {
		...anthropicModels["claude-3-5-haiku-20241022"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-haiku-4-5-20251001": {
		...anthropicModels["claude-haiku-4-5-20251001"],
		supportsImages: false,
		supportsPromptCache: true,
		// Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
}

// src/providers/deepseek.ts
var deepSeekDefaultModelId = "deepseek-chat"
var deepSeekModels = {
	"deepseek-chat": {
		maxTokens: 8192,
		// 8K max output
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: true,
		// kilocode_change start pricing updated
		inputPrice: 0.28,
		// $0.28 per million tokens (cache miss) - Updated Oct 29, 2025
		outputPrice: 0.42,
		// $0.42 per million tokens - Updated Oct 29, 2025
		cacheWritesPrice: 0.28,
		// $0.28 per million tokens (cache miss) - Updated Oct 29, 2025
		cacheReadsPrice: 0.028,
		// $0.028 per million tokens (cache hit) - Updated Oct 29, 2025
		// kilocode_change end
		description: `DeepSeek-V3 achieves a significant breakthrough in inference speed over previous models. It tops the leaderboard among open-source models and rivals the most advanced closed-source models globally.`,
	},
	"deepseek-reasoner": {
		maxTokens: 65536,
		// 64K max output for reasoning mode
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: true,
		// kilocode_change start pricing updated
		inputPrice: 0.28,
		// $0.28 per million tokens (cache miss) - Updated Oct 29, 2025
		outputPrice: 0.42,
		// $0.42 per million tokens - Updated Oct 29, 2025
		cacheWritesPrice: 0.28,
		// $0.28 per million tokens (cache miss) - Updated Oct 29, 2025
		cacheReadsPrice: 0.028,
		// $0.028 per million tokens (cache hit) - Updated Oct 29, 2025
		// kilocode_change end
		description: `DeepSeek-R1 achieves performance comparable to OpenAI-o1 across math, code, and reasoning tasks. Supports Chain of Thought reasoning with up to 64K output tokens.`,
	},
}
var DEEP_SEEK_DEFAULT_TEMPERATURE = 0.6

// src/providers/doubao.ts
var doubaoDefaultModelId = "doubao-seed-code-preview-latest"
var doubaoModels = {
	"doubao-seed-1-6-250615": {
		maxTokens: 32768,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1e-4,
		// $0.0001 per million tokens (cache miss)
		outputPrice: 4e-4,
		// $0.0004 per million tokens
		cacheWritesPrice: 1e-4,
		// $0.0001 per million tokens (cache miss)
		cacheReadsPrice: 2e-5,
		// $0.00002 per million tokens (cache hit)
		description: `Doubao Seed 1.6 is a powerful model designed for high-performance tasks with extensive context handling.`,
	},
	"doubao-seed-1-6-thinking-250715": {
		maxTokens: 32768,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2e-4,
		// $0.0002 per million tokens
		outputPrice: 8e-4,
		// $0.0008 per million tokens
		cacheWritesPrice: 2e-4,
		// $0.0002 per million
		cacheReadsPrice: 4e-5,
		// $0.00004 per million tokens (cache hit)
		description: `Doubao Seed 1.6 Thinking is optimized for reasoning tasks, providing enhanced performance in complex problem-solving scenarios.`,
	},
	"doubao-seed-1-6-flash-250715": {
		maxTokens: 32768,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15e-5,
		// $0.00015 per million tokens
		outputPrice: 6e-4,
		// $0.0006 per million tokens
		cacheWritesPrice: 15e-5,
		// $0.00015 per million
		cacheReadsPrice: 3e-5,
		// $0.00003 per million tokens (cache hit)
		description: `Doubao Seed 1.6 Flash is tailored for speed and efficiency, making it ideal for applications requiring rapid responses.`,
	},
	// kilocode_change start
	"doubao-seed-code-preview-251028": {
		// https://www.volcengine.com/docs/82379/1925114
		// https://www.volcengine.com/docs/82379/1949118
		maxTokens: 32768,
		contextWindow: 256e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1687,
		// $0.1687 per million tokens
		outputPrice: 1.1247,
		// $1.1247 per million tokens
		cacheWritesPrice: 24e-4,
		// $0.0024 per million
		cacheReadsPrice: 0.0337,
		// $0.0337 per million tokens (cache hit)
		// The price is inaccurate because it's tiered based on the context window size and is billed in CNY. The exchange rate here is based on November 13, 2025.
		description: `Doubao-seed-code is an AI coding model specifically designed for real-world development scenarios, enhancing bug-fixing and front-end capabilities. It supports transparent input caching, reducing usage costs.`,
	},
	"doubao-seed-code-preview-latest": {
		// https://www.volcengine.com/docs/82379/1925114
		// https://www.volcengine.com/docs/82379/1949118
		maxTokens: 32768,
		contextWindow: 256e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1687,
		// $0.1687 per million tokens
		outputPrice: 1.1247,
		// $1.1247 per million tokens
		cacheWritesPrice: 24e-4,
		// $0.0024 per million
		cacheReadsPrice: 0.0337,
		// $0.0337 per million tokens (cache hit)
		// This price is invalid; this is a dedicated model ID for the "coding plan" subscription.
		description: `Doubao-seed-code is an AI coding model specifically designed for real-world development scenarios, enhancing bug-fixing and front-end capabilities. It supports transparent input caching, reducing usage costs.`,
	},
	// kilocode_change end
}
var doubaoDefaultModelInfo = doubaoModels[doubaoDefaultModelId]
var DOUBAO_API_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3"
var DOUBAO_API_CHAT_PATH = "/chat/completions"

// src/providers/featherless.ts
var featherlessModels = {
	"deepseek-ai/DeepSeek-V3-0324": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek V3 0324 model.",
	},
	"deepseek-ai/DeepSeek-R1-0528": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek R1 0528 model.",
	},
	"moonshotai/Kimi-K2-Instruct": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Kimi K2 Instruct model.",
	},
	"openai/gpt-oss-120b": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "GPT-OSS 120B model.",
	},
	"Qwen/Qwen3-Coder-480B-A35B-Instruct": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 Coder 480B A35B Instruct model.",
	},
}
var featherlessDefaultModelId = "deepseek-ai/DeepSeek-R1-0528"

// src/providers/fireworks.ts
var fireworksDefaultModelId = "accounts/fireworks/models/kimi-k2-instruct-0905"
var fireworksModels = {
	// kilocode_change start
	"accounts/fireworks/models/kimi-k2-thinking": {
		maxTokens: 4096,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.6,
		outputPrice: 2.5,
		description:
			"Kimi K2 Thinking is the latest, most capable version of open-source thinking model. Starting with Kimi K2, we built it as a thinking agent that reasons step-by-step while dynamically invoking tools.",
	},
	// kilocode_change end
	"accounts/fireworks/models/kimi-k2-instruct-0905": {
		maxTokens: 16384,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.6,
		outputPrice: 2.5,
		cacheReadsPrice: 0.15,
		description:
			"Kimi K2 model gets a new version update: Agentic coding: more accurate, better generalization across scaffolds. Frontend coding: improved aesthetics and functionalities on web, 3d, and other tasks. Context length: extended from 128k to 256k, providing better long-horizon support.",
	},
	"accounts/fireworks/models/kimi-k2-instruct": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.6,
		outputPrice: 2.5,
		description:
			"Kimi K2 is a state-of-the-art mixture-of-experts (MoE) language model with 32 billion activated parameters and 1 trillion total parameters. Trained with the Muon optimizer, Kimi K2 achieves exceptional performance across frontier knowledge, reasoning, and coding tasks while being meticulously optimized for agentic capabilities.",
	},
	"accounts/fireworks/models/minimax-m2": {
		maxTokens: 4096,
		contextWindow: 204800,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.3,
		outputPrice: 1.2,
		description:
			"MiniMax M2 is a high-performance language model with 204.8K context window, optimized for long-context understanding and generation tasks.",
	},
	"accounts/fireworks/models/qwen3-235b-a22b-instruct-2507": {
		maxTokens: 32768,
		contextWindow: 256e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.22,
		outputPrice: 0.88,
		description: "Latest Qwen3 thinking model, competitive against the best closed source models in Jul 2025.",
	},
	"accounts/fireworks/models/qwen3-coder-480b-a35b-instruct": {
		maxTokens: 32768,
		contextWindow: 256e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.45,
		outputPrice: 1.8,
		description: "Qwen3's most agentic code model to date.",
	},
	"accounts/fireworks/models/deepseek-r1-0528": {
		maxTokens: 20480,
		contextWindow: 16e4,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 3,
		outputPrice: 8,
		description:
			"05/28 updated checkpoint of Deepseek R1. Its overall performance is now approaching that of leading models, such as O3 and Gemini 2.5 Pro. Compared to the previous version, the upgraded model shows significant improvements in handling complex reasoning tasks, and this version also offers a reduced hallucination rate, enhanced support for function calling, and better experience for vibe coding. Note that fine-tuning for this model is only available through contacting fireworks at https://fireworks.ai/company/contact-us.",
	},
	"accounts/fireworks/models/deepseek-v3": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.9,
		outputPrice: 0.9,
		description:
			"A strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token from Deepseek. Note that fine-tuning for this model is only available through contacting fireworks at https://fireworks.ai/company/contact-us.",
	},
	"accounts/fireworks/models/deepseek-v3p1": {
		maxTokens: 16384,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.56,
		outputPrice: 1.68,
		description:
			"DeepSeek v3.1 is an improved version of the v3 model with enhanced performance, better reasoning capabilities, and improved code generation. This Mixture-of-Experts (MoE) model maintains the same 671B total parameters with 37B activated per token.",
	},
	"accounts/fireworks/models/glm-4p5": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.55,
		outputPrice: 2.19,
		description:
			"Z.ai GLM-4.5 with 355B total parameters and 32B active parameters. Features unified reasoning, coding, and intelligent agent capabilities.",
	},
	"accounts/fireworks/models/glm-4p5-air": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.55,
		outputPrice: 2.19,
		description:
			"Z.ai GLM-4.5-Air with 106B total parameters and 12B active parameters. Features unified reasoning, coding, and intelligent agent capabilities.",
	},
	"accounts/fireworks/models/glm-4p6": {
		maxTokens: 25344,
		contextWindow: 198e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.55,
		outputPrice: 2.19,
		description:
			"Z.ai GLM-4.6 is an advanced coding model with exceptional performance on complex programming tasks. Features improved reasoning capabilities and enhanced code generation quality, making it ideal for software development workflows.",
	},
	"accounts/fireworks/models/gpt-oss-20b": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.07,
		outputPrice: 0.3,
		description:
			"OpenAI gpt-oss-20b: Compact model for local/edge deployments. Optimized for low-latency and resource-constrained environments with chain-of-thought output, adjustable reasoning, and agentic workflows.",
	},
	"accounts/fireworks/models/gpt-oss-120b": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 0.6,
		description:
			"OpenAI gpt-oss-120b: Production-grade, general-purpose model that fits on a single H100 GPU. Features complex reasoning, configurable effort, full chain-of-thought transparency, and supports function calling, tool use, and structured outputs.",
	},
}

// src/providers/gemini.ts
var geminiDefaultModelId = "gemini-3-pro-preview"
var geminiModels = {
	// Latest models (pointing to the most recent stable versions)
	"gemini-3-pro-preview": {
		maxTokens: 65536,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: true,
		reasoningEffort: "low",
		supportsTemperature: true,
		inputPrice: 4,
		outputPrice: 18,
		tiers: [
			{
				contextWindow: 2e5,
				inputPrice: 2,
				outputPrice: 12,
			},
			{
				contextWindow: Infinity,
				inputPrice: 4,
				outputPrice: 18,
			},
		],
	},
	"gemini-flash-latest": {
		maxTokens: 65536,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 2.5,
		cacheReadsPrice: 0.075,
		cacheWritesPrice: 1,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
	},
	"gemini-flash-lite-latest": {
		maxTokens: 65536,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.4,
		cacheReadsPrice: 0.025,
		cacheWritesPrice: 1,
		supportsReasoningBudget: true,
		maxThinkingTokens: 24576,
	},
	// 2.5 Flash models (09-2025 versions - most recent)
	"gemini-2.5-flash-preview-09-2025": {
		maxTokens: 65536,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 2.5,
		cacheReadsPrice: 0.075,
		cacheWritesPrice: 1,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
	},
	"gemini-2.5-flash-lite-preview-09-2025": {
		maxTokens: 65536,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.4,
		cacheReadsPrice: 0.025,
		cacheWritesPrice: 1,
		supportsReasoningBudget: true,
		maxThinkingTokens: 24576,
	},
	// 2.5 Flash models (06-17 version)
	"gemini-2.5-flash-lite-preview-06-17": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.4,
		cacheReadsPrice: 0.025,
		cacheWritesPrice: 1,
		supportsReasoningBudget: true,
		maxThinkingTokens: 24576,
	},
	// 2.5 Flash models (05-20 versions)
	"gemini-2.5-flash-preview-05-20:thinking": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.15,
		outputPrice: 3.5,
		cacheReadsPrice: 0.0375,
		cacheWritesPrice: 1,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"gemini-2.5-flash-preview-05-20": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.15,
		outputPrice: 0.6,
		cacheReadsPrice: 0.0375,
		cacheWritesPrice: 1,
	},
	// 2.5 Flash models (04-17 versions)
	"gemini-2.5-flash-preview-04-17:thinking": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 3.5,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"gemini-2.5-flash-preview-04-17": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 0.6,
	},
	// 2.5 Flash stable
	"gemini-2.5-flash": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 2.5,
		cacheReadsPrice: 0.075,
		cacheWritesPrice: 1,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
	},
	// 2.5 Pro models
	"gemini-2.5-pro-preview-06-05": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		// This is the pricing for prompts above 200k tokens.
		outputPrice: 15,
		cacheReadsPrice: 0.625,
		cacheWritesPrice: 4.5,
		maxThinkingTokens: 32768,
		supportsReasoningBudget: true,
		tiers: [
			{
				contextWindow: 2e5,
				inputPrice: 1.25,
				outputPrice: 10,
				cacheReadsPrice: 0.31,
			},
			{
				contextWindow: Infinity,
				inputPrice: 2.5,
				outputPrice: 15,
				cacheReadsPrice: 0.625,
			},
		],
	},
	"gemini-2.5-pro-preview-05-06": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		// This is the pricing for prompts above 200k tokens.
		outputPrice: 15,
		cacheReadsPrice: 0.625,
		cacheWritesPrice: 4.5,
		tiers: [
			{
				contextWindow: 2e5,
				inputPrice: 1.25,
				outputPrice: 10,
				cacheReadsPrice: 0.31,
			},
			{
				contextWindow: Infinity,
				inputPrice: 2.5,
				outputPrice: 15,
				cacheReadsPrice: 0.625,
			},
		],
	},
	"gemini-2.5-pro-preview-03-25": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		// This is the pricing for prompts above 200k tokens.
		outputPrice: 15,
		cacheReadsPrice: 0.625,
		cacheWritesPrice: 4.5,
		maxThinkingTokens: 32768,
		supportsReasoningBudget: true,
		tiers: [
			{
				contextWindow: 2e5,
				inputPrice: 1.25,
				outputPrice: 10,
				cacheReadsPrice: 0.31,
			},
			{
				contextWindow: Infinity,
				inputPrice: 2.5,
				outputPrice: 15,
				cacheReadsPrice: 0.625,
			},
		],
	},
	"gemini-2.5-pro-exp-03-25": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-2.5-pro": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		// This is the pricing for prompts above 200k tokens.
		outputPrice: 15,
		cacheReadsPrice: 0.625,
		cacheWritesPrice: 4.5,
		maxThinkingTokens: 32768,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
		tiers: [
			{
				contextWindow: 2e5,
				inputPrice: 1.25,
				outputPrice: 10,
				cacheReadsPrice: 0.31,
			},
			{
				contextWindow: Infinity,
				inputPrice: 2.5,
				outputPrice: 15,
				cacheReadsPrice: 0.625,
			},
		],
	},
	// 2.0 Flash models
	"gemini-2.0-flash-lite-preview-02-05": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-2.0-flash-thinking-exp-01-21": {
		maxTokens: 65536,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-2.0-flash-thinking-exp-1219": {
		maxTokens: 8192,
		contextWindow: 32767,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-2.0-flash-exp": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-2.0-flash-001": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.4,
		cacheReadsPrice: 0.025,
		cacheWritesPrice: 1,
	},
	// 2.0 Pro models
	"gemini-2.0-pro-exp-02-05": {
		maxTokens: 8192,
		contextWindow: 2097152,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	// 1.5 Flash models
	"gemini-1.5-flash-002": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.15,
		// This is the pricing for prompts above 128k tokens.
		outputPrice: 0.6,
		cacheReadsPrice: 0.0375,
		cacheWritesPrice: 1,
		tiers: [
			{
				contextWindow: 128e3,
				inputPrice: 0.075,
				outputPrice: 0.3,
				cacheReadsPrice: 0.01875,
			},
			{
				contextWindow: Infinity,
				inputPrice: 0.15,
				outputPrice: 0.6,
				cacheReadsPrice: 0.0375,
			},
		],
	},
	"gemini-1.5-flash-exp-0827": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-1.5-flash-8b-exp-0827": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	// 1.5 Pro models
	"gemini-1.5-pro-002": {
		maxTokens: 8192,
		contextWindow: 2097152,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-1.5-pro-exp-0827": {
		maxTokens: 8192,
		contextWindow: 2097152,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	// Experimental models
	"gemini-exp-1206": {
		maxTokens: 8192,
		contextWindow: 2097152,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
}

// src/providers/gemini-cli.ts
var geminiCliDefaultModelId = "gemini-2.5-flash"
var geminiCliModels = {
	"gemini-2.5-flash": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
	},
	"gemini-2.5-pro": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		maxThinkingTokens: 32768,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"gemini-3-pro-preview": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		supportsReasoningBudget: true,
		maxThinkingTokens: 64e3,
	},
}

// src/providers/ovhcloud.ts
var ovhCloudAiEndpointsDefaultModelId = "gpt-oss-120b"
var ovhCloudAiEndpointsDefaultModelInfo = {
	maxTokens: 131e3,
	contextWindow: 131e3,
	supportsImages: false,
	supportsPromptCache: false,
	inputPrice: 0.08,
	outputPrice: 0.4,
	description:
		"gpt-oss-120b is a cutting-edge model designed for high-level reasoning, instruction-following, and advanced agent capabilities.",
	supportsReasoningEffort: true,
}

// src/providers/synthetic.ts
var syntheticDefaultModelId = "hf:zai-org/GLM-4.6"
var syntheticModels = {
	"hf:zai-org/GLM-4.6": {
		maxTokens: 128e3,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.55,
		outputPrice: 2.19,
		description: "GLM-4.6",
		supportsComputerUse: false,
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		supportedParameters: [],
	},
}

// src/providers/inception.ts
var inceptionDefaultModelId = "mercury-coder"
var inceptionDefaultModelInfo = {
	maxTokens: 8192,
	contextWindow: 128e3,
	supportsImages: false,
	supportsPromptCache: false,
	inputPrice: 25e-8,
	outputPrice: 1e-6,
	cacheReadsPrice: 0,
	cacheWritesPrice: 0,
}

// src/providers/minimax.ts
var minimaxDefaultModelId = "MiniMax-M2"
var minimaxModels = {
	"MiniMax-M2": {
		maxTokens: 16384,
		contextWindow: 192e3,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 1.2,
		cacheWritesPrice: 0.375,
		cacheReadsPrice: 0.03,
		preserveReasoning: true,
		description:
			"MiniMax M2, a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed.",
	},
	"MiniMax-M2-Stable": {
		maxTokens: 16384,
		contextWindow: 192e3,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 1.2,
		cacheWritesPrice: 0.375,
		cacheReadsPrice: 0.03,
		preserveReasoning: true,
		description:
			"MiniMax M2 Stable (High Concurrency, Commercial Use), a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed.",
	},
}
var MINIMAX_DEFAULT_MAX_TOKENS = 16384
var MINIMAX_DEFAULT_TEMPERATURE = 1

// src/providers/glama.ts
var glamaDefaultModelId = "anthropic/claude-3-7-sonnet"
var glamaDefaultModelInfo = {
	maxTokens: 8192,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	inputPrice: 3,
	outputPrice: 15,
	cacheWritesPrice: 3.75,
	cacheReadsPrice: 0.3,
	description:
		"Claude 3.7 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities. It introduces a hybrid reasoning approach, allowing users to choose between rapid responses and extended, step-by-step processing for complex tasks. The model demonstrates notable improvements in coding, particularly in front-end development and full-stack updates, and excels in agentic workflows, where it can autonomously navigate multi-step processes. Claude 3.7 Sonnet maintains performance parity with its predecessor in standard mode while offering an extended reasoning mode for enhanced accuracy in math, coding, and instruction-following tasks. Read more at the [blog post here](https://www.anthropic.com/news/claude-3-7-sonnet)",
}
var GLAMA_DEFAULT_TEMPERATURE = 0

// src/providers/groq.ts
var groqDefaultModelId = "moonshotai/kimi-k2-instruct-0905"
var groqModels = {
	// Models based on API response: https://api.groq.com/openai/v1/models
	"llama-3.1-8b-instant": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.05,
		outputPrice: 0.08,
		description: "Meta Llama 3.1 8B Instant model, 128K context.",
	},
	"llama-3.3-70b-versatile": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.59,
		outputPrice: 0.79,
		description: "Meta Llama 3.3 70B Versatile model, 128K context.",
	},
	"meta-llama/llama-4-scout-17b-16e-instruct": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.11,
		outputPrice: 0.34,
		description: "Meta Llama 4 Scout 17B Instruct model, 128K context.",
	},
	"meta-llama/llama-4-maverick-17b-128e-instruct": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.2,
		outputPrice: 0.6,
		description: "Meta Llama 4 Maverick 17B Instruct model, 128K context.",
	},
	"mistral-saba-24b": {
		maxTokens: 8192,
		contextWindow: 32768,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.79,
		outputPrice: 0.79,
		description: "Mistral Saba 24B model, 32K context.",
	},
	"qwen-qwq-32b": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.29,
		outputPrice: 0.39,
		description: "Alibaba Qwen QwQ 32B model, 128K context.",
	},
	"qwen/qwen3-32b": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.29,
		outputPrice: 0.59,
		description: "Alibaba Qwen 3 32B model, 128K context.",
	},
	"deepseek-r1-distill-llama-70b": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.75,
		outputPrice: 0.99,
		description: "DeepSeek R1 Distill Llama 70B model, 128K context.",
	},
	"moonshotai/kimi-k2-instruct": {
		maxTokens: 16384,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 1,
		outputPrice: 3,
		cacheReadsPrice: 0.5,
		// 50% discount for cached input tokens
		description: "Moonshot AI Kimi K2 Instruct 1T model, 128K context.",
	},
	"moonshotai/kimi-k2-instruct-0905": {
		maxTokens: 16384,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.6,
		outputPrice: 2.5,
		cacheReadsPrice: 0.15,
		description:
			"Kimi K2 model gets a new version update: Agentic coding: more accurate, better generalization across scaffolds. Frontend coding: improved aesthetics and functionalities on web, 3d, and other tasks. Context length: extended from 128k to 256k, providing better long-horizon support.",
	},
	"openai/gpt-oss-120b": {
		maxTokens: 32766,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 0.75,
		description:
			"GPT-OSS 120B is OpenAI's flagship open source model, built on a Mixture-of-Experts (MoE) architecture with 20 billion parameters and 128 experts.",
	},
	"openai/gpt-oss-20b": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		outputPrice: 0.5,
		description:
			"GPT-OSS 20B is OpenAI's flagship open source model, built on a Mixture-of-Experts (MoE) architecture with 20 billion parameters and 32 experts.",
	},
}

// src/providers/huggingface.ts
var HUGGINGFACE_DEFAULT_MAX_TOKENS = 2048
var HUGGINGFACE_MAX_TOKENS_FALLBACK = 8192
var HUGGINGFACE_DEFAULT_CONTEXT_WINDOW = 128e3
var HUGGINGFACE_SLIDER_STEP = 256
var HUGGINGFACE_SLIDER_MIN = 1
var HUGGINGFACE_TEMPERATURE_MAX_VALUE = 2
var HUGGINGFACE_API_URL = "https://router.huggingface.co/v1/models?collection=roocode"
var HUGGINGFACE_CACHE_DURATION = 1e3 * 60 * 60

// src/providers/io-intelligence.ts
var ioIntelligenceDefaultModelId = "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8"
var ioIntelligenceDefaultBaseUrl = "https://api.intelligence.io.solutions/api/v1"
var IO_INTELLIGENCE_CACHE_DURATION = 1e3 * 60 * 60
var ioIntelligenceModels = {
	"deepseek-ai/DeepSeek-R1-0528": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: false,
		supportsPromptCache: false,
		description: "DeepSeek R1 reasoning model",
	},
	"meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8": {
		maxTokens: 8192,
		contextWindow: 43e4,
		supportsImages: true,
		supportsPromptCache: false,
		description: "Llama 4 Maverick 17B model",
	},
	"Intel/Qwen3-Coder-480B-A35B-Instruct-int4-mixed-ar": {
		maxTokens: 8192,
		contextWindow: 106e3,
		supportsImages: false,
		supportsPromptCache: false,
		description: "Qwen3 Coder 480B specialized for coding",
	},
	"openai/gpt-oss-120b": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		description: "OpenAI GPT-OSS 120B model",
	},
}

// src/providers/lite-llm.ts
var litellmDefaultModelId = "claude-3-7-sonnet-20250219"
var litellmDefaultModelInfo = {
	maxTokens: 8192,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	inputPrice: 3,
	outputPrice: 15,
	cacheWritesPrice: 3.75,
	cacheReadsPrice: 0.3,
}

// src/providers/lm-studio.ts
var LMSTUDIO_DEFAULT_TEMPERATURE = 0
var lMStudioDefaultModelId = "mistralai/devstral-small-2505"
var lMStudioDefaultModelInfo = {
	maxTokens: 8192,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	inputPrice: 0,
	outputPrice: 0,
	cacheWritesPrice: 0,
	cacheReadsPrice: 0,
	description: "LM Studio hosted models",
}

// src/providers/mistral.ts
var mistralDefaultModelId = "codestral-latest"
var mistralModels = {
	"magistral-medium-latest": {
		maxTokens: 8192,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2,
		outputPrice: 5,
	},
	"devstral-medium-latest": {
		maxTokens: 131e3,
		contextWindow: 131e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.4,
		outputPrice: 2,
	},
	"mistral-medium-latest": {
		maxTokens: 131e3,
		contextWindow: 131e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.4,
		outputPrice: 2,
	},
	"codestral-latest": {
		maxTokens: 256e3,
		contextWindow: 256e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.3,
		outputPrice: 0.9,
	},
	"mistral-large-latest": {
		maxTokens: 131e3,
		contextWindow: 131e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 2,
		outputPrice: 6,
	},
	"ministral-8b-latest": {
		maxTokens: 131e3,
		contextWindow: 131e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		outputPrice: 0.1,
	},
	"ministral-3b-latest": {
		maxTokens: 131e3,
		contextWindow: 131e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.04,
		outputPrice: 0.04,
	},
	"mistral-small-latest": {
		maxTokens: 32e3,
		contextWindow: 32e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.2,
		outputPrice: 0.6,
	},
	//kilocode_change
	"magistral-small-latest": {
		maxTokens: 40960,
		contextWindow: 40960,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.5,
		outputPrice: 1.5,
	},
	"devstral-small-latest": {
		maxTokens: 131e3,
		contextWindow: 131e3,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		outputPrice: 0.3,
	},
	// kilocode_change end
	"pixtral-large-latest": {
		maxTokens: 131e3,
		contextWindow: 131e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2,
		outputPrice: 6,
	},
}
var MISTRAL_DEFAULT_TEMPERATURE = 0

// src/providers/moonshot.ts
var moonshotDefaultModelId = "kimi-k2-thinking"
var moonshotModels = {
	"kimi-k2-0711-preview": {
		maxTokens: 32e3,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.6,
		// $0.60 per million tokens (cache miss)
		outputPrice: 2.5,
		// $2.50 per million tokens
		cacheWritesPrice: 0,
		// $0 per million tokens (cache miss)
		cacheReadsPrice: 0.15,
		// $0.15 per million tokens (cache hit)
		description: `Kimi K2 is a state-of-the-art mixture-of-experts (MoE) language model with 32 billion activated parameters and 1 trillion total parameters.`,
	},
	"kimi-k2-0905-preview": {
		maxTokens: 16384,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.6,
		outputPrice: 2.5,
		cacheReadsPrice: 0.15,
		description:
			"Kimi K2 model gets a new version update: Agentic coding: more accurate, better generalization across scaffolds. Frontend coding: improved aesthetics and functionalities on web, 3d, and other tasks. Context length: extended from 128k to 256k, providing better long-horizon support.",
	},
	"kimi-k2-turbo-preview": {
		maxTokens: 32e3,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 2.4,
		// $2.40 per million tokens (cache miss)
		outputPrice: 10,
		// $10.00 per million tokens
		cacheWritesPrice: 0,
		// $0 per million tokens (cache miss)
		cacheReadsPrice: 0.6,
		// $0.60 per million tokens (cache hit)
		description: `Kimi K2 Turbo is a high-speed version of the state-of-the-art Kimi K2 mixture-of-experts (MoE) language model, with the same 32 billion activated parameters and 1 trillion total parameters, optimized for output speeds of up to 60 tokens per second, peaking at 100 tokens per second.`,
	},
	"kimi-k2-thinking": {
		maxTokens: 16e3,
		// Recommended ≥ 16,000
		contextWindow: 262144,
		// 262,144 tokens
		supportsImages: false,
		// Text-only (no image/vision support)
		supportsPromptCache: true,
		inputPrice: 0.6,
		// $0.60 per million tokens (cache miss)
		outputPrice: 2.5,
		// $2.50 per million tokens
		cacheWritesPrice: 0,
		// $0 per million tokens (cache miss)
		cacheReadsPrice: 0.15,
		// $0.15 per million tokens (cache hit)
		supportsTemperature: true,
		// Default temperature: 1.0
		preserveReasoning: true,
		defaultTemperature: 1,
		description: `The kimi-k2-thinking model is a general-purpose agentic reasoning model developed by Moonshot AI. Thanks to its strength in deep reasoning and multi-turn tool use, it can solve even the hardest problems.`,
	},
}
var MOONSHOT_DEFAULT_TEMPERATURE = 0.6

// src/providers/nano-gpt.ts
var nanoGptDefaultModelId = "chatgpt-4o-latest"
var nanoGptDefaultModelInfo = {
	description: "OpenAI's affordable and intelligent small model for fast, lightweight tasks",
	contextWindow: 128e3,
	supportsPromptCache: false,
	inputPrice: 0.15,
	outputPrice: 0.6,
	maxTokens: 16384,
}

// src/providers/ollama.ts
var ollamaDefaultModelId = "devstral:24b"
var ollamaDefaultModelInfo = {
	maxTokens: 4096,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	inputPrice: 0,
	outputPrice: 0,
	cacheWritesPrice: 0,
	cacheReadsPrice: 0,
	description: "Ollama hosted models",
}

// src/providers/openai.ts
var openAiNativeDefaultModelId = "gpt-5.1"
var openAiNativeModels = {
	"gpt-5.1": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		promptCacheRetention: "24h",
		supportsReasoningEffort: ["none", "low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 1.25,
		outputPrice: 10,
		cacheReadsPrice: 0.125,
		supportsVerbosity: true,
		supportsTemperature: false,
		tiers: [
			{ name: "flex", contextWindow: 4e5, inputPrice: 0.625, outputPrice: 5, cacheReadsPrice: 0.0625 },
			{ name: "priority", contextWindow: 4e5, inputPrice: 2.5, outputPrice: 20, cacheReadsPrice: 0.25 },
		],
		description: "GPT-5.1: The best model for coding and agentic tasks across domains",
	},
	"gpt-5.1-codex": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		promptCacheRetention: "24h",
		supportsReasoningEffort: ["low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 1.25,
		outputPrice: 10,
		cacheReadsPrice: 0.125,
		supportsTemperature: false,
		tiers: [{ name: "priority", contextWindow: 4e5, inputPrice: 2.5, outputPrice: 20, cacheReadsPrice: 0.25 }],
		description: "GPT-5.1 Codex: A version of GPT-5.1 optimized for agentic coding in Codex",
	},
	"gpt-5.1-codex-mini": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		promptCacheRetention: "24h",
		supportsReasoningEffort: ["low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 0.25,
		outputPrice: 2,
		cacheReadsPrice: 0.025,
		supportsTemperature: false,
		description: "GPT-5.1 Codex mini: A version of GPT-5.1 optimized for agentic coding in Codex",
	},
	"gpt-5": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: ["minimal", "low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 1.25,
		outputPrice: 10,
		cacheReadsPrice: 0.125,
		supportsVerbosity: true,
		supportsTemperature: false,
		tiers: [
			{ name: "flex", contextWindow: 4e5, inputPrice: 0.625, outputPrice: 5, cacheReadsPrice: 0.0625 },
			{ name: "priority", contextWindow: 4e5, inputPrice: 2.5, outputPrice: 20, cacheReadsPrice: 0.25 },
		],
		description: "GPT-5: The best model for coding and agentic tasks across domains",
	},
	"gpt-5-mini": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: ["minimal", "low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 0.25,
		outputPrice: 2,
		cacheReadsPrice: 0.025,
		supportsVerbosity: true,
		supportsTemperature: false,
		tiers: [
			{ name: "flex", contextWindow: 4e5, inputPrice: 0.125, outputPrice: 1, cacheReadsPrice: 0.0125 },
			{ name: "priority", contextWindow: 4e5, inputPrice: 0.45, outputPrice: 3.6, cacheReadsPrice: 0.045 },
		],
		description: "GPT-5 Mini: A faster, more cost-efficient version of GPT-5 for well-defined tasks",
	},
	"gpt-5-codex": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: ["low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 1.25,
		outputPrice: 10,
		cacheReadsPrice: 0.125,
		supportsTemperature: false,
		tiers: [{ name: "priority", contextWindow: 4e5, inputPrice: 2.5, outputPrice: 20, cacheReadsPrice: 0.25 }],
		description: "GPT-5-Codex: A version of GPT-5 optimized for agentic coding in Codex",
	},
	"gpt-5-nano": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: ["minimal", "low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 0.05,
		outputPrice: 0.4,
		cacheReadsPrice: 5e-3,
		supportsVerbosity: true,
		supportsTemperature: false,
		tiers: [{ name: "flex", contextWindow: 4e5, inputPrice: 0.025, outputPrice: 0.2, cacheReadsPrice: 25e-4 }],
		description: "GPT-5 Nano: Fastest, most cost-efficient version of GPT-5",
	},
	"gpt-5-chat-latest": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1.25,
		outputPrice: 10,
		cacheReadsPrice: 0.125,
		description: "GPT-5 Chat: Optimized for conversational AI and non-reasoning tasks",
	},
	"gpt-4.1": {
		maxTokens: 32768,
		contextWindow: 1047576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2,
		outputPrice: 8,
		cacheReadsPrice: 0.5,
		supportsTemperature: true,
		tiers: [{ name: "priority", contextWindow: 1047576, inputPrice: 3.5, outputPrice: 14, cacheReadsPrice: 0.875 }],
	},
	"gpt-4.1-mini": {
		maxTokens: 32768,
		contextWindow: 1047576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.4,
		outputPrice: 1.6,
		cacheReadsPrice: 0.1,
		supportsTemperature: true,
		tiers: [
			{ name: "priority", contextWindow: 1047576, inputPrice: 0.7, outputPrice: 2.8, cacheReadsPrice: 0.175 },
		],
	},
	"gpt-4.1-nano": {
		maxTokens: 32768,
		contextWindow: 1047576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.4,
		cacheReadsPrice: 0.025,
		supportsTemperature: true,
		tiers: [{ name: "priority", contextWindow: 1047576, inputPrice: 0.2, outputPrice: 0.8, cacheReadsPrice: 0.05 }],
	},
	o3: {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2,
		outputPrice: 8,
		cacheReadsPrice: 0.5,
		supportsReasoningEffort: ["low", "medium", "high"],
		reasoningEffort: "medium",
		supportsTemperature: false,
		tiers: [
			{ name: "flex", contextWindow: 2e5, inputPrice: 1, outputPrice: 4, cacheReadsPrice: 0.25 },
			{ name: "priority", contextWindow: 2e5, inputPrice: 3.5, outputPrice: 14, cacheReadsPrice: 0.875 },
		],
	},
	"o3-high": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2,
		outputPrice: 8,
		cacheReadsPrice: 0.5,
		reasoningEffort: "high",
		supportsTemperature: false,
	},
	"o3-low": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2,
		outputPrice: 8,
		cacheReadsPrice: 0.5,
		reasoningEffort: "low",
		supportsTemperature: false,
	},
	"o4-mini": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.4,
		cacheReadsPrice: 0.275,
		supportsReasoningEffort: ["low", "medium", "high"],
		reasoningEffort: "medium",
		supportsTemperature: false,
		tiers: [
			{ name: "flex", contextWindow: 2e5, inputPrice: 0.55, outputPrice: 2.2, cacheReadsPrice: 0.138 },
			{ name: "priority", contextWindow: 2e5, inputPrice: 2, outputPrice: 8, cacheReadsPrice: 0.5 },
		],
	},
	"o4-mini-high": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.4,
		cacheReadsPrice: 0.275,
		reasoningEffort: "high",
		supportsTemperature: false,
	},
	"o4-mini-low": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.4,
		cacheReadsPrice: 0.275,
		reasoningEffort: "low",
		supportsTemperature: false,
	},
	"o3-mini": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.4,
		cacheReadsPrice: 0.55,
		supportsReasoningEffort: ["low", "medium", "high"],
		reasoningEffort: "medium",
		supportsTemperature: false,
	},
	"o3-mini-high": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.4,
		cacheReadsPrice: 0.55,
		reasoningEffort: "high",
		supportsTemperature: false,
	},
	"o3-mini-low": {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.4,
		cacheReadsPrice: 0.55,
		reasoningEffort: "low",
		supportsTemperature: false,
	},
	o1: {
		maxTokens: 1e5,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		outputPrice: 60,
		cacheReadsPrice: 7.5,
		supportsTemperature: false,
	},
	"o1-preview": {
		maxTokens: 32768,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		outputPrice: 60,
		cacheReadsPrice: 7.5,
		supportsTemperature: false,
	},
	"o1-mini": {
		maxTokens: 65536,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.4,
		cacheReadsPrice: 0.55,
		supportsTemperature: false,
	},
	"gpt-4o": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		outputPrice: 10,
		cacheReadsPrice: 1.25,
		supportsTemperature: true,
		tiers: [{ name: "priority", contextWindow: 128e3, inputPrice: 4.25, outputPrice: 17, cacheReadsPrice: 2.125 }],
	},
	"gpt-4o-mini": {
		maxTokens: 16384,
		contextWindow: 128e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.15,
		outputPrice: 0.6,
		cacheReadsPrice: 0.075,
		supportsTemperature: true,
		tiers: [{ name: "priority", contextWindow: 128e3, inputPrice: 0.25, outputPrice: 1, cacheReadsPrice: 0.125 }],
	},
	"codex-mini-latest": {
		maxTokens: 16384,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 1.5,
		outputPrice: 6,
		cacheReadsPrice: 0.375,
		supportsTemperature: false,
		description:
			"Codex Mini: Cloud-based software engineering agent powered by codex-1, a version of o3 optimized for coding tasks. Trained with reinforcement learning to generate human-style code, adhere to instructions, and iteratively run tests.",
	},
	// Dated clones (snapshots) preserved for backward compatibility
	"gpt-5-2025-08-07": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: ["minimal", "low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 1.25,
		outputPrice: 10,
		cacheReadsPrice: 0.125,
		supportsVerbosity: true,
		supportsTemperature: false,
		tiers: [
			{ name: "flex", contextWindow: 4e5, inputPrice: 0.625, outputPrice: 5, cacheReadsPrice: 0.0625 },
			{ name: "priority", contextWindow: 4e5, inputPrice: 2.5, outputPrice: 20, cacheReadsPrice: 0.25 },
		],
		description: "GPT-5: The best model for coding and agentic tasks across domains",
	},
	"gpt-5-mini-2025-08-07": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: ["minimal", "low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 0.25,
		outputPrice: 2,
		cacheReadsPrice: 0.025,
		supportsVerbosity: true,
		supportsTemperature: false,
		tiers: [
			{ name: "flex", contextWindow: 4e5, inputPrice: 0.125, outputPrice: 1, cacheReadsPrice: 0.0125 },
			{ name: "priority", contextWindow: 4e5, inputPrice: 0.45, outputPrice: 3.6, cacheReadsPrice: 0.045 },
		],
		description: "GPT-5 Mini: A faster, more cost-efficient version of GPT-5 for well-defined tasks",
	},
	"gpt-5-nano-2025-08-07": {
		maxTokens: 128e3,
		contextWindow: 4e5,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: ["minimal", "low", "medium", "high"],
		reasoningEffort: "medium",
		inputPrice: 0.05,
		outputPrice: 0.4,
		cacheReadsPrice: 5e-3,
		supportsVerbosity: true,
		supportsTemperature: false,
		tiers: [{ name: "flex", contextWindow: 4e5, inputPrice: 0.025, outputPrice: 0.2, cacheReadsPrice: 25e-4 }],
		description: "GPT-5 Nano: Fastest, most cost-efficient version of GPT-5",
	},
}
var openAiModelInfoSaneDefaults = {
	maxTokens: -1,
	contextWindow: 128e3,
	supportsImages: true,
	supportsPromptCache: false,
	inputPrice: 0,
	outputPrice: 0,
}
var azureOpenAiDefaultApiVersion = "2024-08-01-preview"
var OPENAI_NATIVE_DEFAULT_TEMPERATURE = 0
var OPENAI_AZURE_AI_INFERENCE_PATH = "/models/chat/completions"

// src/providers/openrouter.ts
var openRouterDefaultModelId = "anthropic/claude-sonnet-4.5"
var openRouterDefaultModelInfo = {
	maxTokens: 8192,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	supportsNativeTools: true,
	inputPrice: 3,
	outputPrice: 15,
	cacheWritesPrice: 3.75,
	cacheReadsPrice: 0.3,
	description:
		"Claude 3.7 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities. It introduces a hybrid reasoning approach, allowing users to choose between rapid responses and extended, step-by-step processing for complex tasks. The model demonstrates notable improvements in coding, particularly in front-end development and full-stack updates, and excels in agentic workflows, where it can autonomously navigate multi-step processes. Claude 3.7 Sonnet maintains performance parity with its predecessor in standard mode while offering an extended reasoning mode for enhanced accuracy in math, coding, and instruction-following tasks. Read more at the [blog post here](https://www.anthropic.com/news/claude-3-7-sonnet)",
}
var OPENROUTER_DEFAULT_PROVIDER_NAME = "[default]"
var OPEN_ROUTER_PROMPT_CACHING_MODELS = /* @__PURE__ */ new Set([
	"anthropic/claude-3-haiku",
	"anthropic/claude-3-haiku:beta",
	"anthropic/claude-3-opus",
	"anthropic/claude-3-opus:beta",
	"anthropic/claude-3-sonnet",
	"anthropic/claude-3-sonnet:beta",
	"anthropic/claude-3.5-haiku",
	"anthropic/claude-3.5-haiku-20241022",
	"anthropic/claude-3.5-haiku-20241022:beta",
	"anthropic/claude-3.5-haiku:beta",
	"anthropic/claude-3.5-sonnet",
	"anthropic/claude-3.5-sonnet-20240620",
	"anthropic/claude-3.5-sonnet-20240620:beta",
	"anthropic/claude-3.5-sonnet:beta",
	"anthropic/claude-3.7-sonnet",
	"anthropic/claude-3.7-sonnet:beta",
	"anthropic/claude-3.7-sonnet:thinking",
	"anthropic/claude-sonnet-4",
	"anthropic/claude-sonnet-4.5",
	"anthropic/claude-opus-4",
	"anthropic/claude-opus-4.1",
	"anthropic/claude-opus-4.5",
	"anthropic/claude-haiku-4.5",
	"google/gemini-2.5-flash-preview",
	"google/gemini-2.5-flash-preview:thinking",
	"google/gemini-2.5-flash-preview-05-20",
	"google/gemini-2.5-flash-preview-05-20:thinking",
	"google/gemini-2.5-flash",
	"google/gemini-2.5-flash-lite-preview-06-17",
	"google/gemini-2.0-flash-001",
	"google/gemini-flash-1.5",
	"google/gemini-flash-1.5-8b",
])
var OPEN_ROUTER_REQUIRED_REASONING_BUDGET_MODELS = /* @__PURE__ */ new Set([
	"anthropic/claude-3.7-sonnet:thinking",
	"google/gemini-2.5-pro",
	"google/gemini-2.5-flash-preview-05-20:thinking",
])
var OPEN_ROUTER_REASONING_BUDGET_MODELS = /* @__PURE__ */ new Set([
	"anthropic/claude-3.7-sonnet:beta",
	"anthropic/claude-opus-4",
	"anthropic/claude-opus-4.1",
	"anthropic/claude-opus-4.5",
	"anthropic/claude-sonnet-4",
	"anthropic/claude-sonnet-4.5",
	"anthropic/claude-haiku-4.5",
	"google/gemini-2.5-pro-preview",
	"google/gemini-2.5-pro",
	"google/gemini-2.5-flash-preview-05-20",
	"google/gemini-2.5-flash",
	"google/gemini-2.5-flash-lite-preview-06-17",
	// Also include the models that require the reasoning budget to be enabled
	// even though `OPEN_ROUTER_REQUIRED_REASONING_BUDGET_MODELS` takes precedence.
	"anthropic/claude-3.7-sonnet:thinking",
	"google/gemini-2.5-flash-preview-05-20:thinking",
])

// src/providers/qwen-code.ts
var qwenCodeDefaultModelId = "qwen3-coder-plus"
var qwenCodeModels = {
	"qwen3-coder-plus": {
		maxTokens: 65536,
		contextWindow: 1e6,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0,
		description: "Qwen3 Coder Plus - High-performance coding model with 1M context window for large codebases",
	},
	"qwen3-coder-flash": {
		maxTokens: 65536,
		contextWindow: 1e6,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0,
		description: "Qwen3 Coder Flash - Fast coding model with 1M context window optimized for speed",
	},
}

// src/providers/requesty.ts
var requestyDefaultModelId = "coding/claude-4-sonnet"
var requestyDefaultModelInfo = {
	maxTokens: 8192,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	inputPrice: 3,
	outputPrice: 15,
	cacheWritesPrice: 3.75,
	cacheReadsPrice: 0.3,
	description:
		"The best coding model, optimized by Requesty, and automatically routed to the fastest provider. Claude 4 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities.",
}

// src/providers/roo.ts
import { z as z10 } from "zod"
var rooDefaultModelId = "xai/grok-code-fast-1"
var rooModels = {}
var RooPricingSchema = z10.object({
	input: z10.string(),
	output: z10.string(),
	input_cache_read: z10.string().optional(),
	input_cache_write: z10.string().optional(),
})
var RooModelSchema = z10.object({
	id: z10.string(),
	object: z10.literal("model"),
	created: z10.number(),
	owned_by: z10.string(),
	name: z10.string(),
	description: z10.string(),
	context_window: z10.number(),
	max_tokens: z10.number(),
	type: z10.literal("language"),
	tags: z10.array(z10.string()).optional(),
	pricing: RooPricingSchema,
	deprecated: z10.boolean().optional(),
})
var RooModelsResponseSchema = z10.object({
	object: z10.literal("list"),
	data: z10.array(RooModelSchema),
})

// src/providers/sambanova.ts
var sambaNovaDefaultModelId = "Meta-Llama-3.3-70B-Instruct"
var sambaNovaModels = {
	"Meta-Llama-3.1-8B-Instruct": {
		maxTokens: 8192,
		contextWindow: 16384,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		outputPrice: 0.2,
		description: "Meta Llama 3.1 8B Instruct model with 16K context window.",
	},
	"Meta-Llama-3.3-70B-Instruct": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.6,
		outputPrice: 1.2,
		description: "Meta Llama 3.3 70B Instruct model with 128K context window.",
	},
	"DeepSeek-R1": {
		maxTokens: 8192,
		contextWindow: 32768,
		supportsImages: false,
		supportsPromptCache: false,
		supportsReasoningBudget: true,
		inputPrice: 5,
		outputPrice: 7,
		description: "DeepSeek R1 reasoning model with 32K context window.",
	},
	"DeepSeek-V3-0324": {
		maxTokens: 8192,
		contextWindow: 32768,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 3,
		outputPrice: 4.5,
		description: "DeepSeek V3 model with 32K context window.",
	},
	"DeepSeek-V3.1": {
		maxTokens: 8192,
		contextWindow: 32768,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 3,
		outputPrice: 4.5,
		description: "DeepSeek V3.1 model with 32K context window.",
	},
	"DeepSeek-R1-Distill-Llama-70B": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.7,
		outputPrice: 1.4,
		description: "DeepSeek R1 distilled Llama 70B model with 128K context window.",
	},
	"Llama-4-Maverick-17B-128E-Instruct": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.63,
		outputPrice: 1.8,
		description: "Meta Llama 4 Maverick 17B 128E Instruct model with 128K context window.",
	},
	"Llama-3.3-Swallow-70B-Instruct-v0.4": {
		maxTokens: 8192,
		contextWindow: 16384,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.6,
		outputPrice: 1.2,
		description: "Tokyotech Llama 3.3 Swallow 70B Instruct v0.4 model with 16K context window.",
	},
	"Qwen3-32B": {
		maxTokens: 8192,
		contextWindow: 8192,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.4,
		outputPrice: 0.8,
		description: "Alibaba Qwen 3 32B model with 8K context window.",
	},
	"gpt-oss-120b": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.22,
		outputPrice: 0.59,
		description: "OpenAI gpt oss 120b model with 128k context window.",
	},
}

// src/providers/unbound.ts
var unboundDefaultModelId = "anthropic/claude-sonnet-4-5"
var unboundDefaultModelInfo = {
	maxTokens: 8192,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	inputPrice: 3,
	outputPrice: 15,
	cacheWritesPrice: 3.75,
	cacheReadsPrice: 0.3,
}

// src/providers/vertex.ts
var vertexDefaultModelId = "claude-sonnet-4-5@20250929"
var vertexModels = {
	"gemini-3-pro-preview": {
		maxTokens: 65536,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		supportsReasoningEffort: true,
		reasoningEffort: "low",
		supportsTemperature: true,
		inputPrice: 4,
		outputPrice: 18,
		tiers: [
			{
				contextWindow: 2e5,
				inputPrice: 2,
				outputPrice: 12,
			},
			{
				contextWindow: Infinity,
				inputPrice: 4,
				outputPrice: 18,
			},
		],
	},
	"gemini-2.5-flash-preview-05-20:thinking": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.15,
		outputPrice: 3.5,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"gemini-2.5-flash-preview-05-20": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.15,
		outputPrice: 0.6,
	},
	"gemini-2.5-flash": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 2.5,
		cacheReadsPrice: 0.075,
		cacheWritesPrice: 1,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
	},
	"gemini-2.5-flash-preview-04-17:thinking": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 3.5,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"gemini-2.5-flash-preview-04-17": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 0.6,
	},
	"gemini-2.5-pro-preview-03-25": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		outputPrice: 15,
	},
	"gemini-2.5-pro-preview-05-06": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		outputPrice: 15,
	},
	"gemini-2.5-pro-preview-06-05": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		outputPrice: 15,
		maxThinkingTokens: 32768,
		supportsReasoningBudget: true,
	},
	"gemini-2.5-pro": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 2.5,
		outputPrice: 15,
		maxThinkingTokens: 32768,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
		tiers: [
			{
				contextWindow: 2e5,
				inputPrice: 1.25,
				outputPrice: 10,
				cacheReadsPrice: 0.31,
			},
			{
				contextWindow: Infinity,
				inputPrice: 2.5,
				outputPrice: 15,
				cacheReadsPrice: 0.625,
			},
		],
	},
	"gemini-2.5-pro-exp-03-25": {
		maxTokens: 65535,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-2.0-pro-exp-02-05": {
		maxTokens: 8192,
		contextWindow: 2097152,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-2.0-flash-001": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.15,
		outputPrice: 0.6,
	},
	"gemini-2.0-flash-lite-001": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.075,
		outputPrice: 0.3,
	},
	"gemini-2.0-flash-thinking-exp-01-21": {
		maxTokens: 8192,
		contextWindow: 32768,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
	},
	"gemini-1.5-flash-002": {
		maxTokens: 8192,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.075,
		outputPrice: 0.3,
	},
	"gemini-1.5-pro-002": {
		maxTokens: 8192,
		contextWindow: 2097152,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 1.25,
		outputPrice: 5,
	},
	"claude-sonnet-4@20250514": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
		supportsReasoningBudget: true,
	},
	"claude-sonnet-4-5@20250929": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
		supportsReasoningBudget: true,
	},
	"claude-haiku-4-5@20251001": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 1,
		outputPrice: 5,
		cacheWritesPrice: 1.25,
		cacheReadsPrice: 0.1,
		supportsReasoningBudget: true,
	},
	"claude-opus-4-5@20251101": {
		maxTokens: 64e3,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 5,
		outputPrice: 25,
		cacheWritesPrice: 6.25,
		cacheReadsPrice: 0.5,
		supportsReasoningBudget: true,
	},
	"claude-opus-4-1@20250805": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		outputPrice: 75,
		cacheWritesPrice: 18.75,
		cacheReadsPrice: 1.5,
		supportsReasoningBudget: true,
	},
	"claude-opus-4@20250514": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		outputPrice: 75,
		cacheWritesPrice: 18.75,
		cacheReadsPrice: 1.5,
	},
	"claude-3-7-sonnet@20250219:thinking": {
		maxTokens: 64e3,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"claude-3-7-sonnet@20250219": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
	},
	"claude-3-5-sonnet-v2@20241022": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
	},
	"claude-3-5-sonnet@20240620": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 3.75,
		cacheReadsPrice: 0.3,
	},
	"claude-3-5-haiku@20241022": {
		maxTokens: 8192,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 1,
		outputPrice: 5,
		cacheWritesPrice: 1.25,
		cacheReadsPrice: 0.1,
	},
	"claude-3-opus@20240229": {
		maxTokens: 4096,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 15,
		outputPrice: 75,
		cacheWritesPrice: 18.75,
		cacheReadsPrice: 1.5,
	},
	"claude-3-haiku@20240307": {
		maxTokens: 4096,
		contextWindow: 2e5,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.25,
		outputPrice: 1.25,
		cacheWritesPrice: 0.3,
		cacheReadsPrice: 0.03,
	},
	"gemini-2.5-flash-lite-preview-06-17": {
		maxTokens: 64e3,
		contextWindow: 1048576,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.4,
		cacheReadsPrice: 0.025,
		cacheWritesPrice: 1,
		maxThinkingTokens: 24576,
		supportsReasoningBudget: true,
	},
	"llama-4-maverick-17b-128e-instruct-maas": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.35,
		outputPrice: 1.15,
		description: "Meta Llama 4 Maverick 17B Instruct model, 128K context.",
	},
	"deepseek-r1-0528-maas": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 1.35,
		outputPrice: 5.4,
		description: "DeepSeek R1 (0528). Available in us-central1",
	},
	"deepseek-v3.1-maas": {
		maxTokens: 32768,
		contextWindow: 163840,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.6,
		outputPrice: 1.7,
		description: "DeepSeek V3.1. Available in us-west2",
	},
	"gpt-oss-120b-maas": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.15,
		outputPrice: 0.6,
		description: "OpenAI gpt-oss 120B. Available in us-central1",
	},
	"gpt-oss-20b-maas": {
		maxTokens: 32768,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.075,
		outputPrice: 0.3,
		description: "OpenAI gpt-oss 20B. Available in us-central1",
	},
	"qwen3-coder-480b-a35b-instruct-maas": {
		maxTokens: 32768,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 1,
		outputPrice: 4,
		description: "Qwen3 Coder 480B A35B Instruct. Available in us-south1",
	},
	"qwen3-235b-a22b-instruct-2507-maas": {
		maxTokens: 16384,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.25,
		outputPrice: 1,
		description: "Qwen3 235B A22B Instruct. Available in us-south1",
	},
}
var VERTEX_REGIONS = [
	{ value: "global", label: "global" },
	{ value: "us-central1", label: "us-central1" },
	{ value: "us-east1", label: "us-east1" },
	{ value: "us-east4", label: "us-east4" },
	{ value: "us-east5", label: "us-east5" },
	{ value: "us-south1", label: "us-south1" },
	{ value: "us-west1", label: "us-west1" },
	{ value: "us-west2", label: "us-west2" },
	{ value: "us-west3", label: "us-west3" },
	{ value: "us-west4", label: "us-west4" },
	{ value: "northamerica-northeast1", label: "northamerica-northeast1" },
	{ value: "northamerica-northeast2", label: "northamerica-northeast2" },
	{ value: "southamerica-east1", label: "southamerica-east1" },
	{ value: "europe-west1", label: "europe-west1" },
	{ value: "europe-west2", label: "europe-west2" },
	{ value: "europe-west3", label: "europe-west3" },
	{ value: "europe-west4", label: "europe-west4" },
	{ value: "europe-west6", label: "europe-west6" },
	{ value: "europe-central2", label: "europe-central2" },
	{ value: "asia-east1", label: "asia-east1" },
	{ value: "asia-east2", label: "asia-east2" },
	{ value: "asia-northeast1", label: "asia-northeast1" },
	{ value: "asia-northeast2", label: "asia-northeast2" },
	{ value: "asia-northeast3", label: "asia-northeast3" },
	{ value: "asia-south1", label: "asia-south1" },
	{ value: "asia-south2", label: "asia-south2" },
	{ value: "asia-southeast1", label: "asia-southeast1" },
	{ value: "asia-southeast2", label: "asia-southeast2" },
	{ value: "australia-southeast1", label: "australia-southeast1" },
	{ value: "australia-southeast2", label: "australia-southeast2" },
	{ value: "me-west1", label: "me-west1" },
	{ value: "me-central1", label: "me-central1" },
	{ value: "africa-south1", label: "africa-south1" },
]

// src/providers/kilocode-vscode-llm.ts
var vscodeLlmDefaultModelId = "claude-4-sonnet"
var vscodeLlmModels = {
	"gpt-3.5-turbo": {
		contextWindow: 16384,
		maxTokens: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-3.5-turbo",
		version: "gpt-3.5-turbo-0613",
		name: "GPT 3.5 Turbo",
		supportsToolCalling: true,
		maxInputTokens: 12288,
	},
	"gpt-4o-mini": {
		contextWindow: 128e3,
		maxTokens: 4096,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-4o-mini",
		version: "gpt-4o-mini-2024-07-18",
		name: "GPT-4o mini",
		supportsToolCalling: true,
		maxInputTokens: 12288,
	},
	"gpt-4": {
		contextWindow: 32768,
		maxTokens: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-4",
		version: "gpt-4-0613",
		name: "GPT 4",
		supportsToolCalling: true,
		maxInputTokens: 32768,
	},
	"gpt-4-0125-preview": {
		contextWindow: 128e3,
		maxTokens: 4096,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-4-turbo",
		version: "gpt-4-0125-preview",
		name: "GPT 4 Turbo",
		supportsToolCalling: true,
		maxInputTokens: 64e3,
	},
	"gpt-4o": {
		contextWindow: 128e3,
		maxTokens: 16384,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-4o",
		version: "gpt-4o-2024-11-20",
		name: "GPT-4o",
		supportsToolCalling: true,
		maxInputTokens: 64e3,
	},
	o1: {
		contextWindow: 19827,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "o1-ga",
		version: "o1-2024-12-17",
		name: "o1 (Preview)",
		supportsToolCalling: true,
		maxInputTokens: 19827,
	},
	"o3-mini": {
		contextWindow: 2e5,
		maxTokens: 1e5,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "o3-mini",
		version: "o3-mini-2025-01-31",
		name: "o3-mini",
		supportsToolCalling: true,
		maxInputTokens: 64e3,
	},
	"claude-3.5-sonnet": {
		contextWindow: 9e4,
		maxTokens: 8192,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "claude-3.5-sonnet",
		version: "claude-3.5-sonnet",
		name: "Claude 3.5 Sonnet",
		supportsToolCalling: true,
		maxInputTokens: 9e4,
	},
	"claude-4-sonnet": {
		contextWindow: 216e3,
		maxTokens: 16e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "claude-sonnet-4",
		version: "claude-sonnet-4",
		name: "Claude Sonnet 4",
		supportsToolCalling: true,
		maxInputTokens: 128e3,
	},
	"gemini-2.0-flash-001": {
		contextWindow: 1e6,
		maxTokens: 8192,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gemini-2.0-flash",
		version: "gemini-2.0-flash-001",
		name: "Gemini 2.0 Flash",
		supportsToolCalling: false,
		maxInputTokens: 128e3,
	},
	"gemini-2.5-pro": {
		contextWindow: 128e3,
		maxTokens: 64e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gemini-2.5-pro",
		version: "gemini-2.5-pro",
		name: "Gemini 2.5 Pro",
		supportsToolCalling: true,
		maxInputTokens: 128e3,
	},
	"o4-mini": {
		contextWindow: 2e5,
		maxTokens: 1e5,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "o4-mini",
		version: "o4-mini-2025-04-16",
		name: "o4-mini (Preview)",
		supportsToolCalling: true,
		maxInputTokens: 128e3,
	},
	"gpt-4.1": {
		contextWindow: 128e3,
		maxTokens: 16384,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-4.1",
		version: "gpt-4.1-2025-04-14",
		name: "GPT-4.1",
		supportsToolCalling: true,
		maxInputTokens: 128e3,
	},
	"gpt-5-mini": {
		contextWindow: 264e3,
		maxTokens: 127805,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-5-mini",
		version: "gpt-5-mini",
		name: "GPT-5 mini",
		supportsToolCalling: true,
		maxInputTokens: 128e3,
	},
	"gpt-5": {
		contextWindow: 264e3,
		maxTokens: 64e3,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		family: "gpt-5",
		version: "gpt-5",
		name: "GPT-5",
		supportsToolCalling: true,
		maxInputTokens: 128e3,
	},
}

// src/providers/xai.ts
var xaiDefaultModelId = "grok-code-fast-1"
var xaiModels = {
	"grok-code-fast-1": {
		maxTokens: 16384,
		contextWindow: 262144,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.2,
		outputPrice: 1.5,
		cacheWritesPrice: 0.02,
		cacheReadsPrice: 0.02,
		description: "xAI's Grok Code Fast model with 256K context window",
	},
	// kilocode_change start
	"grok-4-1-fast-reasoning": {
		maxTokens: 3e4,
		contextWindow: 2e6,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.4,
		// This is the pricing for prompts above 128K context
		outputPrice: 1,
		cacheReadsPrice: 0.05,
		description: "xAI's Grok-4-1-Fast model with reasonning and a 2M context window",
		tiers: [
			{
				contextWindow: 128e3,
				inputPrice: 0.2,
				outputPrice: 0.5,
				cacheReadsPrice: 0.05,
			},
			{
				contextWindow: Infinity,
				inputPrice: 0.4,
				outputPrice: 1,
				cacheReadsPrice: 0.05,
			},
		],
	},
	"grok-4-1-fast-non-reasoning": {
		maxTokens: 3e4,
		contextWindow: 2e6,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.4,
		// This is the pricing for prompts above 128K context
		outputPrice: 1,
		cacheReadsPrice: 0.05,
		description: "xAI's Grok-4-1-Fast model without reasonning and with a 2M context window",
		tiers: [
			{
				contextWindow: 128e3,
				inputPrice: 0.2,
				outputPrice: 0.5,
				cacheReadsPrice: 0.05,
			},
			{
				contextWindow: Infinity,
				inputPrice: 0.4,
				outputPrice: 1,
				cacheReadsPrice: 0.05,
			},
		],
	},
	// kilocode_change end
	"grok-4": {
		maxTokens: 8192,
		contextWindow: 256e3,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 0.75,
		cacheReadsPrice: 0.75,
		description: "xAI's Grok-4 model with 256K context window",
	},
	// kilocode_change start
	"grok-4-fast": {
		maxTokens: 3e4,
		contextWindow: 2e6,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.4,
		// This is the pricing for prompts above 128K context
		outputPrice: 1,
		cacheReadsPrice: 0.05,
		description: "xAI's Grok-4-Fast model with reasonning and a 2M context window",
		tiers: [
			{
				contextWindow: 128e3,
				inputPrice: 0.2,
				outputPrice: 0.5,
				cacheReadsPrice: 0.05,
			},
			{
				contextWindow: Infinity,
				inputPrice: 0.4,
				outputPrice: 1,
				cacheReadsPrice: 0.05,
			},
		],
	},
	"grok-4-fast-non-reasoning": {
		maxTokens: 3e4,
		contextWindow: 2e6,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.4,
		// This is the pricing for prompts above 128K context
		outputPrice: 1,
		cacheReadsPrice: 0.05,
		description: "xAI's Grok-4-Fast model without reasonning and with a 2M context window",
		tiers: [
			{
				contextWindow: 128e3,
				inputPrice: 0.2,
				outputPrice: 0.5,
				cacheReadsPrice: 0.05,
			},
			{
				contextWindow: Infinity,
				inputPrice: 0.4,
				outputPrice: 1,
				cacheReadsPrice: 0.05,
			},
		],
	},
	// kilocode_change end
	"grok-3": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 3,
		outputPrice: 15,
		cacheWritesPrice: 0.75,
		cacheReadsPrice: 0.75,
		description: "xAI's Grok-3 model with 128K context window",
	},
	"grok-3-fast": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 5,
		outputPrice: 25,
		cacheWritesPrice: 1.25,
		cacheReadsPrice: 1.25,
		description: "xAI's Grok-3 fast model with 128K context window",
	},
	"grok-3-mini": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 0.5,
		cacheWritesPrice: 0.07,
		cacheReadsPrice: 0.07,
		description: "xAI's Grok-3 mini model with 128K context window",
		supportsReasoningEffort: true,
	},
	"grok-3-mini-fast": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.6,
		outputPrice: 4,
		cacheWritesPrice: 0.15,
		cacheReadsPrice: 0.15,
		description: "xAI's Grok-3 mini fast model with 128K context window",
		supportsReasoningEffort: true,
	},
	"grok-2-1212": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 2,
		outputPrice: 10,
		description: "xAI's Grok-2 model (version 1212) with 128K context window",
	},
	"grok-2-vision-1212": {
		maxTokens: 8192,
		contextWindow: 32768,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2,
		outputPrice: 10,
		description: "xAI's Grok-2 Vision model (version 1212) with image support and 32K context window",
	},
}

// src/providers/vercel-ai-gateway.ts
var vercelAiGatewayDefaultModelId = "anthropic/claude-sonnet-4"
var VERCEL_AI_GATEWAY_PROMPT_CACHING_MODELS = /* @__PURE__ */ new Set([
	"anthropic/claude-3-haiku",
	"anthropic/claude-3-opus",
	"anthropic/claude-3.5-haiku",
	"anthropic/claude-3.5-sonnet",
	"anthropic/claude-3.7-sonnet",
	"anthropic/claude-opus-4",
	"anthropic/claude-opus-4.1",
	"anthropic/claude-sonnet-4",
	"openai/gpt-4.1",
	"openai/gpt-4.1-mini",
	"openai/gpt-4.1-nano",
	"openai/gpt-4o",
	"openai/gpt-4o-mini",
	"openai/gpt-5",
	"openai/gpt-5-mini",
	"openai/gpt-5-nano",
	"openai/o1",
	"openai/o3",
	"openai/o3-mini",
	"openai/o4-mini",
])
var VERCEL_AI_GATEWAY_VISION_ONLY_MODELS = /* @__PURE__ */ new Set([
	"alibaba/qwen-3-14b",
	"alibaba/qwen-3-235b",
	"alibaba/qwen-3-30b",
	"alibaba/qwen-3-32b",
	"alibaba/qwen3-coder",
	"amazon/nova-pro",
	"anthropic/claude-3.5-haiku",
	"google/gemini-1.5-flash-8b",
	"google/gemini-2.0-flash-thinking",
	"google/gemma-3-27b",
	"mistral/devstral-small",
	"xai/grok-vision-beta",
])
var VERCEL_AI_GATEWAY_VISION_AND_TOOLS_MODELS = /* @__PURE__ */ new Set([
	"amazon/nova-lite",
	"anthropic/claude-3-haiku",
	"anthropic/claude-3-opus",
	"anthropic/claude-3-sonnet",
	"anthropic/claude-3.5-sonnet",
	"anthropic/claude-3.7-sonnet",
	"anthropic/claude-opus-4",
	"anthropic/claude-opus-4.1",
	"anthropic/claude-sonnet-4",
	"google/gemini-1.5-flash",
	"google/gemini-1.5-pro",
	"google/gemini-2.0-flash",
	"google/gemini-2.0-flash-lite",
	"google/gemini-2.0-pro",
	"google/gemini-2.5-flash",
	"google/gemini-2.5-flash-lite",
	"google/gemini-2.5-pro",
	"google/gemini-exp",
	"meta/llama-3.2-11b",
	"meta/llama-3.2-90b",
	"meta/llama-3.3",
	"meta/llama-4-maverick",
	"meta/llama-4-scout",
	"mistral/pixtral-12b",
	"mistral/pixtral-large",
	"moonshotai/kimi-k2",
	"openai/gpt-4-turbo",
	"openai/gpt-4.1",
	"openai/gpt-4.1-mini",
	"openai/gpt-4.1-nano",
	"openai/gpt-4.5-preview",
	"openai/gpt-4o",
	"openai/gpt-4o-mini",
	"openai/gpt-oss-120b",
	"openai/gpt-oss-20b",
	"openai/o3",
	"openai/o3-pro",
	"openai/o4-mini",
	"vercel/v0-1.0-md",
	"xai/grok-2-vision",
	"zai/glm-4.5v",
])
var vercelAiGatewayDefaultModelInfo = {
	maxTokens: 64e3,
	contextWindow: 2e5,
	supportsImages: true,
	supportsPromptCache: true,
	inputPrice: 3,
	outputPrice: 15,
	cacheWritesPrice: 3.75,
	cacheReadsPrice: 0.3,
	description:
		"Claude Sonnet 4 significantly improves on Sonnet 3.7's industry-leading capabilities, excelling in coding with a state-of-the-art 72.7% on SWE-bench. The model balances performance and efficiency for internal and external use cases, with enhanced steerability for greater control over implementations. While not matching Opus 4 in most domains, it delivers an optimal mix of capability and practicality.",
}
var VERCEL_AI_GATEWAY_DEFAULT_TEMPERATURE = 0.7

// src/providers/zai.ts
var internationalZAiDefaultModelId = "glm-4.6"
var internationalZAiModels = {
	"glm-4.5": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		supportsReasoningBinary: true,
		inputPrice: 0.6,
		outputPrice: 2.2,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.11,
		description:
			"GLM-4.5 is Zhipu's latest featured model. Its comprehensive capabilities in reasoning, coding, and agent reach the state-of-the-art (SOTA) level among open-source models, with a context length of up to 128k.",
	},
	"glm-4.5-air": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.2,
		outputPrice: 1.1,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.03,
		description:
			"GLM-4.5-Air is the lightweight version of GLM-4.5. It balances performance and cost-effectiveness, and can flexibly switch to hybrid thinking models.",
	},
	"glm-4.5-x": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 2.2,
		outputPrice: 8.9,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.45,
		description:
			"GLM-4.5-X is a high-performance variant optimized for strong reasoning with ultra-fast responses.",
	},
	"glm-4.5-airx": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 1.1,
		outputPrice: 4.5,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.22,
		description: "GLM-4.5-AirX is a lightweight, ultra-fast variant delivering strong performance with lower cost.",
	},
	"glm-4.5-flash": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0,
		outputPrice: 0,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0,
		description: "GLM-4.5-Flash is a free, high-speed model excellent for reasoning, coding, and agentic tasks.",
	},
	"glm-4.5v": {
		maxTokens: 16384,
		contextWindow: 131072,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.6,
		outputPrice: 1.8,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.11,
		description:
			"GLM-4.5V is Z.AI's multimodal visual reasoning model (image/video/text/file input), optimized for GUI tasks, grounding, and document/video understanding.",
	},
	"glm-4.6": {
		maxTokens: 98304,
		contextWindow: 2e5,
		supportsImages: false,
		supportsPromptCache: true,
		supportsReasoningBinary: true,
		inputPrice: 0.6,
		outputPrice: 2.2,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.11,
		description:
			"GLM-4.6 is Zhipu's newest model with an extended context window of up to 200k tokens, providing enhanced capabilities for processing longer documents and conversations.",
	},
	"glm-4-32b-0414-128k": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		outputPrice: 0.1,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0,
		description: "GLM-4-32B is a 32 billion parameter model with 128k context length, optimized for efficiency.",
	},
}
var mainlandZAiDefaultModelId = "glm-4.6"
var mainlandZAiModels = {
	"glm-4.5": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		supportsReasoningBinary: true,
		inputPrice: 0.29,
		outputPrice: 1.14,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.057,
		description:
			"GLM-4.5 is Zhipu's latest featured model. Its comprehensive capabilities in reasoning, coding, and agent reach the state-of-the-art (SOTA) level among open-source models, with a context length of up to 128k.",
	},
	"glm-4.5-air": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.6,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.02,
		description:
			"GLM-4.5-Air is the lightweight version of GLM-4.5. It balances performance and cost-effectiveness, and can flexibly switch to hybrid thinking models.",
	},
	"glm-4.5-x": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.29,
		outputPrice: 1.14,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.057,
		description:
			"GLM-4.5-X is a high-performance variant optimized for strong reasoning with ultra-fast responses.",
	},
	"glm-4.5-airx": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.1,
		outputPrice: 0.6,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.02,
		description: "GLM-4.5-AirX is a lightweight, ultra-fast variant delivering strong performance with lower cost.",
	},
	"glm-4.5-flash": {
		maxTokens: 98304,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0,
		outputPrice: 0,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0,
		description: "GLM-4.5-Flash is a free, high-speed model excellent for reasoning, coding, and agentic tasks.",
	},
	"glm-4.5v": {
		maxTokens: 16384,
		contextWindow: 131072,
		supportsImages: true,
		supportsPromptCache: true,
		inputPrice: 0.29,
		outputPrice: 0.93,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.057,
		description:
			"GLM-4.5V is Z.AI's multimodal visual reasoning model (image/video/text/file input), optimized for GUI tasks, grounding, and document/video understanding.",
	},
	"glm-4.6": {
		maxTokens: 98304,
		contextWindow: 204800,
		supportsImages: false,
		supportsPromptCache: true,
		supportsReasoningBinary: true,
		inputPrice: 0.29,
		outputPrice: 1.14,
		cacheWritesPrice: 0,
		cacheReadsPrice: 0.057,
		description:
			"GLM-4.6 is Zhipu's newest model with an extended context window of up to 200k tokens, providing enhanced capabilities for processing longer documents and conversations.",
	},
}
var ZAI_DEFAULT_TEMPERATURE = 0.6
var zaiApiLineConfigs = {
	international_coding: {
		name: "International",
		baseUrl: "https://api.z.ai/api/coding/paas/v4",
		isChina: false,
	},
	china_coding: {
		name: "China",
		baseUrl: "https://open.bigmodel.cn/api/coding/paas/v4",
		isChina: true,
	},
}

// src/providers/deepinfra.ts
var deepInfraDefaultModelId = "Qwen/Qwen3-Coder-480B-A35B-Instruct-Turbo"
var deepInfraDefaultModelInfo = {
	maxTokens: 16384,
	contextWindow: 262144,
	supportsImages: false,
	supportsPromptCache: false,
	inputPrice: 0.3,
	outputPrice: 1.2,
	description: "Qwen 3 Coder 480B A35B Instruct Turbo model, 256K context.",
}

// src/providers/vscode-llm.ts
var vscodeLlmDefaultModelId2 = "claude-3.5-sonnet"

// src/providers/index.ts
function getProviderDefaultModelId(provider, options = { isChina: false }) {
	switch (provider) {
		case "openrouter":
			return openRouterDefaultModelId
		case "requesty":
			return requestyDefaultModelId
		case "glama":
			return glamaDefaultModelId
		case "unbound":
			return unboundDefaultModelId
		case "litellm":
			return litellmDefaultModelId
		case "xai":
			return xaiDefaultModelId
		case "groq":
			return groqDefaultModelId
		case "huggingface":
			return "meta-llama/Llama-3.3-70B-Instruct"
		case "chutes":
			return chutesDefaultModelId
		case "bedrock":
			return bedrockDefaultModelId
		case "vertex":
			return vertexDefaultModelId
		case "gemini":
			return geminiDefaultModelId
		case "deepseek":
			return deepSeekDefaultModelId
		case "doubao":
			return doubaoDefaultModelId
		case "moonshot":
			return moonshotDefaultModelId
		case "minimax":
			return minimaxDefaultModelId
		case "zai":
			return options?.isChina ? mainlandZAiDefaultModelId : internationalZAiDefaultModelId
		case "openai-native":
			return "gpt-4o"
		// Based on openai-native patterns
		case "mistral":
			return mistralDefaultModelId
		case "openai":
			return ""
		// OpenAI provider uses custom model configuration
		case "ollama":
			return ""
		// Ollama uses dynamic model selection
		case "lmstudio":
			return ""
		// LMStudio uses dynamic model selection
		case "deepinfra":
			return deepInfraDefaultModelId
		case "vscode-lm":
			return vscodeLlmDefaultModelId2
		case "claude-code":
			return claudeCodeDefaultModelId
		case "cerebras":
			return cerebrasDefaultModelId
		case "sambanova":
			return sambaNovaDefaultModelId
		case "fireworks":
			return fireworksDefaultModelId
		case "featherless":
			return featherlessDefaultModelId
		case "io-intelligence":
			return ioIntelligenceDefaultModelId
		case "roo":
			return rooDefaultModelId
		case "qwen-code":
			return qwenCodeDefaultModelId
		case "vercel-ai-gateway":
			return vercelAiGatewayDefaultModelId
		case "anthropic":
		case "gemini-cli":
		case "human-relay":
		case "fake-ai":
		default:
			return anthropicDefaultModelId
	}
}

// src/provider-settings.ts
var DEFAULT_CONSECUTIVE_MISTAKE_LIMIT = 3
var dynamicProviders = [
	"openrouter",
	"vercel-ai-gateway",
	"huggingface",
	"litellm",
	// kilocode_change start
	"kilocode",
	"ovhcloud",
	"gemini",
	"inception",
	"synthetic",
	"sap-ai-core",
	// kilocode_change end
	"deepinfra",
	"io-intelligence",
	"requesty",
	"unbound",
	"glama",
	"roo",
	"chutes",
	"nano-gpt",
	//kilocode_change
]
var isDynamicProvider = (key) => dynamicProviders.includes(key)
var localProviders = ["ollama", "lmstudio"]
var isLocalProvider = (key) => localProviders.includes(key)
var internalProviders = ["vscode-lm"]
var isInternalProvider = (key) => internalProviders.includes(key)
var customProviders = ["openai"]
var isCustomProvider = (key) => customProviders.includes(key)
var fauxProviders = ["fake-ai", "human-relay"]
var isFauxProvider = (key) => fauxProviders.includes(key)
var providerNames = [
	...dynamicProviders,
	...localProviders,
	...internalProviders,
	...customProviders,
	...fauxProviders,
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
	// kilocode_change start
	"kilocode",
	"minimax",
	"gemini-cli",
	"virtual-quota-fallback",
	"synthetic",
	"inception",
	// kilocode_change end
	"sambanova",
	"vertex",
	"xai",
	"zai",
]
var providerNamesSchema = z11.enum(providerNames)
var isProviderName = (key) => typeof key === "string" && providerNames.includes(key)
var providerSettingsEntrySchema = z11.object({
	id: z11.string(),
	name: z11.string(),
	apiProvider: providerNamesSchema.optional(),
	modelId: z11.string().optional(),
	profileType: profileTypeSchema.optional(),
	// kilocode_change - autocomplete profile type system
})
var baseProviderSettingsSchema = z11.object({
	profileType: profileTypeSchema.optional(),
	// kilocode_change - autocomplete profile type system
	includeMaxTokens: z11.boolean().optional(),
	diffEnabled: z11.boolean().optional(),
	todoListEnabled: z11.boolean().optional(),
	fuzzyMatchThreshold: z11.number().optional(),
	modelTemperature: z11.number().nullish(),
	rateLimitSeconds: z11.number().optional(),
	rateLimitAfter: z11.boolean().optional(),
	// kilocode_change
	consecutiveMistakeLimit: z11.number().min(0).optional(),
	// Model reasoning.
	enableReasoningEffort: z11.boolean().optional(),
	reasoningEffort: reasoningEffortSettingSchema.optional(),
	modelMaxTokens: z11.number().optional(),
	modelMaxThinkingTokens: z11.number().optional(),
	// Model verbosity.
	verbosity: verbosityLevelsSchema.optional(),
	toolStyle: z11.enum(["xml", "json"]).optional(),
	// kilocode_change
})
var apiModelIdProviderModelSchema = baseProviderSettingsSchema.extend({
	apiModelId: z11.string().optional(),
})
var anthropicSchema = apiModelIdProviderModelSchema.extend({
	apiKey: z11.string().optional(),
	anthropicBaseUrl: z11.string().optional(),
	anthropicUseAuthToken: z11.boolean().optional(),
	anthropicDeploymentName: z11.string().optional(),
	// kilocode_change
	anthropicBeta1MContext: z11.boolean().optional(),
	// Enable 'context-1m-2025-08-07' beta for 1M context window.
})
var claudeCodeSchema = apiModelIdProviderModelSchema.extend({
	claudeCodePath: z11.string().optional(),
	claudeCodeMaxOutputTokens: z11.number().int().min(1).max(2e5).optional(),
})
var glamaSchema = baseProviderSettingsSchema.extend({
	glamaModelId: z11.string().optional(),
	glamaApiKey: z11.string().optional(),
})
var nanoGptModelListSchema = z11.enum(["all", "personalized", "subscription"])
var nanoGptSchema = baseProviderSettingsSchema.extend({
	nanoGptApiKey: z11.string().optional(),
	nanoGptModelId: z11.string().optional(),
	nanoGptModelList: nanoGptModelListSchema.optional(),
})
var openRouterProviderDataCollectionSchema = z11.enum(["allow", "deny"])
var openRouterProviderSortSchema = z11.enum(["price", "throughput", "latency"])
var openRouterSchema = baseProviderSettingsSchema.extend({
	openRouterApiKey: z11.string().optional(),
	openRouterModelId: z11.string().optional(),
	openRouterBaseUrl: z11.string().optional(),
	openRouterSpecificProvider: z11.string().optional(),
	openRouterUseMiddleOutTransform: z11.boolean().optional(),
	// kilocode_change start
	openRouterProviderDataCollection: openRouterProviderDataCollectionSchema.optional(),
	openRouterProviderSort: openRouterProviderSortSchema.optional(),
	openRouterZdr: z11.boolean().optional(),
	// kilocode_change end
})
var bedrockSchema = apiModelIdProviderModelSchema.extend({
	awsAccessKey: z11.string().optional(),
	awsSecretKey: z11.string().optional(),
	awsSessionToken: z11.string().optional(),
	awsRegion: z11.string().optional(),
	awsUseCrossRegionInference: z11.boolean().optional(),
	awsUseGlobalInference: z11.boolean().optional(),
	// Enable Global Inference profile routing when supported
	awsUsePromptCache: z11.boolean().optional(),
	awsProfile: z11.string().optional(),
	awsUseProfile: z11.boolean().optional(),
	awsApiKey: z11.string().optional(),
	awsUseApiKey: z11.boolean().optional(),
	awsCustomArn: z11.string().optional(),
	awsModelContextWindow: z11.number().optional(),
	awsBedrockEndpointEnabled: z11.boolean().optional(),
	awsBedrockEndpoint: z11.string().optional(),
	awsBedrock1MContext: z11.boolean().optional(),
	// Enable 'context-1m-2025-08-07' beta for 1M context window.
})
var vertexSchema = apiModelIdProviderModelSchema.extend({
	vertexKeyFile: z11.string().optional(),
	vertexJsonCredentials: z11.string().optional(),
	vertexProjectId: z11.string().optional(),
	vertexRegion: z11.string().optional(),
	enableUrlContext: z11.boolean().optional(),
	enableGrounding: z11.boolean().optional(),
})
var openAiSchema = baseProviderSettingsSchema.extend({
	openAiBaseUrl: z11.string().optional(),
	openAiApiKey: z11.string().optional(),
	openAiLegacyFormat: z11.boolean().optional(),
	openAiR1FormatEnabled: z11.boolean().optional(),
	openAiModelId: z11.string().optional(),
	openAiCustomModelInfo: modelInfoSchema.nullish(),
	openAiUseAzure: z11.boolean().optional(),
	azureApiVersion: z11.string().optional(),
	openAiStreamingEnabled: z11.boolean().optional(),
	openAiHostHeader: z11.string().optional(),
	// Keep temporarily for backward compatibility during migration.
	openAiHeaders: z11.record(z11.string(), z11.string()).optional(),
})
var ollamaSchema = baseProviderSettingsSchema.extend({
	ollamaModelId: z11.string().optional(),
	ollamaBaseUrl: z11.string().optional(),
	ollamaApiKey: z11.string().optional(),
	ollamaNumCtx: z11.number().int().min(128).optional(),
})
var vsCodeLmSchema = baseProviderSettingsSchema.extend({
	vsCodeLmModelSelector: z11
		.object({
			vendor: z11.string().optional(),
			family: z11.string().optional(),
			version: z11.string().optional(),
			id: z11.string().optional(),
		})
		.optional(),
})
var lmStudioSchema = baseProviderSettingsSchema.extend({
	lmStudioModelId: z11.string().optional(),
	lmStudioBaseUrl: z11.string().optional(),
	lmStudioDraftModelId: z11.string().optional(),
	lmStudioSpeculativeDecodingEnabled: z11.boolean().optional(),
})
var geminiSchema = apiModelIdProviderModelSchema.extend({
	geminiApiKey: z11.string().optional(),
	googleGeminiBaseUrl: z11.string().optional(),
	enableUrlContext: z11.boolean().optional(),
	enableGrounding: z11.boolean().optional(),
})
var geminiCliSchema = apiModelIdProviderModelSchema.extend({
	geminiCliOAuthPath: z11.string().optional(),
	geminiCliProjectId: z11.string().optional(),
})
var openAiNativeSchema = apiModelIdProviderModelSchema.extend({
	openAiNativeApiKey: z11.string().optional(),
	openAiNativeBaseUrl: z11.string().optional(),
	// OpenAI Responses API service tier for openai-native provider only.
	// UI should only expose this when the selected model supports flex/priority.
	openAiNativeServiceTier: serviceTierSchema.optional(),
})
var mistralSchema = apiModelIdProviderModelSchema.extend({
	mistralApiKey: z11.string().optional(),
	mistralCodestralUrl: z11.string().optional(),
})
var deepSeekSchema = apiModelIdProviderModelSchema.extend({
	deepSeekBaseUrl: z11.string().optional(),
	deepSeekApiKey: z11.string().optional(),
})
var deepInfraSchema = apiModelIdProviderModelSchema.extend({
	deepInfraBaseUrl: z11.string().optional(),
	deepInfraApiKey: z11.string().optional(),
	deepInfraModelId: z11.string().optional(),
})
var doubaoSchema = apiModelIdProviderModelSchema.extend({
	doubaoBaseUrl: z11.string().optional(),
	doubaoApiKey: z11.string().optional(),
})
var moonshotSchema = apiModelIdProviderModelSchema.extend({
	moonshotBaseUrl: z11
		.union([z11.literal("https://api.moonshot.ai/v1"), z11.literal("https://api.moonshot.cn/v1")])
		.optional(),
	moonshotApiKey: z11.string().optional(),
})
var minimaxSchema = apiModelIdProviderModelSchema.extend({
	minimaxBaseUrl: z11
		.union([z11.literal("https://api.minimax.io/anthropic"), z11.literal("https://api.minimaxi.com/anthropic")])
		.optional(),
	minimaxApiKey: z11.string().optional(),
})
var unboundSchema = baseProviderSettingsSchema.extend({
	unboundApiKey: z11.string().optional(),
	unboundModelId: z11.string().optional(),
})
var requestySchema = baseProviderSettingsSchema.extend({
	requestyBaseUrl: z11.string().optional(),
	requestyApiKey: z11.string().optional(),
	requestyModelId: z11.string().optional(),
})
var humanRelaySchema = baseProviderSettingsSchema
var fakeAiSchema = baseProviderSettingsSchema.extend({
	fakeAi: z11.unknown().optional(),
})
var xaiSchema = apiModelIdProviderModelSchema.extend({
	xaiApiKey: z11.string().optional(),
})
var groqSchema = apiModelIdProviderModelSchema.extend({
	groqApiKey: z11.string().optional(),
})
var huggingFaceSchema = baseProviderSettingsSchema.extend({
	huggingFaceApiKey: z11.string().optional(),
	huggingFaceModelId: z11.string().optional(),
	huggingFaceInferenceProvider: z11.string().optional(),
})
var chutesSchema = apiModelIdProviderModelSchema.extend({
	chutesApiKey: z11.string().optional(),
})
var litellmSchema = baseProviderSettingsSchema.extend({
	litellmBaseUrl: z11.string().optional(),
	litellmApiKey: z11.string().optional(),
	litellmModelId: z11.string().optional(),
	litellmUsePromptCache: z11.boolean().optional(),
})
var cerebrasSchema = apiModelIdProviderModelSchema.extend({
	cerebrasApiKey: z11.string().optional(),
})
var sambaNovaSchema = apiModelIdProviderModelSchema.extend({
	sambaNovaApiKey: z11.string().optional(),
})
var inceptionSchema = apiModelIdProviderModelSchema.extend({
	inceptionLabsBaseUrl: z11.string().optional(),
	inceptionLabsApiKey: z11.string().optional(),
	inceptionLabsModelId: z11.string().optional(),
})
var ovhcloudSchema = baseProviderSettingsSchema.extend({
	ovhCloudAiEndpointsApiKey: z11.string().optional(),
	ovhCloudAiEndpointsModelId: z11.string().optional(),
	ovhCloudAiEndpointsBaseUrl: z11.string().optional(),
})
var kilocodeSchema = baseProviderSettingsSchema.extend({
	kilocodeToken: z11.string().optional(),
	kilocodeOrganizationId: z11.string().optional(),
	kilocodeModel: z11.string().optional(),
	openRouterSpecificProvider: z11.string().optional(),
	openRouterProviderDataCollection: openRouterProviderDataCollectionSchema.optional(),
	openRouterProviderSort: openRouterProviderSortSchema.optional(),
	openRouterZdr: z11.boolean().optional(),
	kilocodeTesterWarningsDisabledUntil: z11.number().optional(),
	// Timestamp for disabling KILOCODE-TESTER warnings
})
var virtualQuotaFallbackProfileDataSchema = z11.object({
	profileName: z11.string().optional(),
	profileId: z11.string().optional(),
	profileLimits: z11
		.object({
			tokensPerMinute: z11.coerce.number().optional(),
			tokensPerHour: z11.coerce.number().optional(),
			tokensPerDay: z11.coerce.number().optional(),
			requestsPerMinute: z11.coerce.number().optional(),
			requestsPerHour: z11.coerce.number().optional(),
			requestsPerDay: z11.coerce.number().optional(),
		})
		.optional(),
})
var virtualQuotaFallbackSchema = baseProviderSettingsSchema.extend({
	profiles: z11.array(virtualQuotaFallbackProfileDataSchema).optional(),
})
var zaiApiLineSchema = z11.enum(["international_coding", "china_coding"])
var zaiSchema = apiModelIdProviderModelSchema.extend({
	zaiApiKey: z11.string().optional(),
	zaiApiLine: zaiApiLineSchema.optional(),
})
var fireworksSchema = apiModelIdProviderModelSchema.extend({
	fireworksApiKey: z11.string().optional(),
})
var syntheticSchema = apiModelIdProviderModelSchema.extend({
	syntheticApiKey: z11.string().optional(),
})
var featherlessSchema = apiModelIdProviderModelSchema.extend({
	featherlessApiKey: z11.string().optional(),
})
var ioIntelligenceSchema = apiModelIdProviderModelSchema.extend({
	ioIntelligenceModelId: z11.string().optional(),
	ioIntelligenceApiKey: z11.string().optional(),
})
var qwenCodeSchema = apiModelIdProviderModelSchema.extend({
	qwenCodeOauthPath: z11.string().optional(),
})
var rooSchema = apiModelIdProviderModelSchema.extend({
	// No additional fields needed - uses cloud authentication.
})
var vercelAiGatewaySchema = baseProviderSettingsSchema.extend({
	vercelAiGatewayApiKey: z11.string().optional(),
	vercelAiGatewayModelId: z11.string().optional(),
})
var sapAiCoreSchema = baseProviderSettingsSchema.extend({
	sapAiCoreServiceKey: z11.string().optional(),
	sapAiCoreResourceGroup: z11.string().optional(),
	sapAiCoreUseOrchestration: z11.boolean().optional(),
	sapAiCoreModelId: z11.string().optional(),
	sapAiCoreDeploymentId: z11.string().optional(),
	sapAiCoreCustomModelInfo: modelInfoSchema.nullish(),
})
var defaultSchema = z11.object({
	apiProvider: z11.undefined(),
})
var providerSettingsSchemaDiscriminated = z11.discriminatedUnion("apiProvider", [
	anthropicSchema.merge(z11.object({ apiProvider: z11.literal("anthropic") })),
	claudeCodeSchema.merge(z11.object({ apiProvider: z11.literal("claude-code") })),
	glamaSchema.merge(z11.object({ apiProvider: z11.literal("glama") })),
	nanoGptSchema.merge(z11.object({ apiProvider: z11.literal("nano-gpt") })),
	// kilocode_change
	openRouterSchema.merge(z11.object({ apiProvider: z11.literal("openrouter") })),
	bedrockSchema.merge(z11.object({ apiProvider: z11.literal("bedrock") })),
	vertexSchema.merge(z11.object({ apiProvider: z11.literal("vertex") })),
	openAiSchema.merge(z11.object({ apiProvider: z11.literal("openai") })),
	ollamaSchema.merge(z11.object({ apiProvider: z11.literal("ollama") })),
	vsCodeLmSchema.merge(z11.object({ apiProvider: z11.literal("vscode-lm") })),
	lmStudioSchema.merge(z11.object({ apiProvider: z11.literal("lmstudio") })),
	geminiSchema.merge(z11.object({ apiProvider: z11.literal("gemini") })),
	openAiNativeSchema.merge(z11.object({ apiProvider: z11.literal("openai-native") })),
	ovhcloudSchema.merge(z11.object({ apiProvider: z11.literal("ovhcloud") })),
	// kilocode_change
	mistralSchema.merge(z11.object({ apiProvider: z11.literal("mistral") })),
	deepSeekSchema.merge(z11.object({ apiProvider: z11.literal("deepseek") })),
	deepInfraSchema.merge(z11.object({ apiProvider: z11.literal("deepinfra") })),
	doubaoSchema.merge(z11.object({ apiProvider: z11.literal("doubao") })),
	moonshotSchema.merge(z11.object({ apiProvider: z11.literal("moonshot") })),
	minimaxSchema.merge(z11.object({ apiProvider: z11.literal("minimax") })),
	unboundSchema.merge(z11.object({ apiProvider: z11.literal("unbound") })),
	requestySchema.merge(z11.object({ apiProvider: z11.literal("requesty") })),
	humanRelaySchema.merge(z11.object({ apiProvider: z11.literal("human-relay") })),
	fakeAiSchema.merge(z11.object({ apiProvider: z11.literal("fake-ai") })),
	xaiSchema.merge(z11.object({ apiProvider: z11.literal("xai") })),
	// kilocode_change start
	geminiCliSchema.merge(z11.object({ apiProvider: z11.literal("gemini-cli") })),
	kilocodeSchema.merge(z11.object({ apiProvider: z11.literal("kilocode") })),
	virtualQuotaFallbackSchema.merge(z11.object({ apiProvider: z11.literal("virtual-quota-fallback") })),
	syntheticSchema.merge(z11.object({ apiProvider: z11.literal("synthetic") })),
	inceptionSchema.merge(z11.object({ apiProvider: z11.literal("inception") })),
	// kilocode_change end
	groqSchema.merge(z11.object({ apiProvider: z11.literal("groq") })),
	huggingFaceSchema.merge(z11.object({ apiProvider: z11.literal("huggingface") })),
	chutesSchema.merge(z11.object({ apiProvider: z11.literal("chutes") })),
	litellmSchema.merge(z11.object({ apiProvider: z11.literal("litellm") })),
	cerebrasSchema.merge(z11.object({ apiProvider: z11.literal("cerebras") })),
	sambaNovaSchema.merge(z11.object({ apiProvider: z11.literal("sambanova") })),
	zaiSchema.merge(z11.object({ apiProvider: z11.literal("zai") })),
	fireworksSchema.merge(z11.object({ apiProvider: z11.literal("fireworks") })),
	featherlessSchema.merge(z11.object({ apiProvider: z11.literal("featherless") })),
	ioIntelligenceSchema.merge(z11.object({ apiProvider: z11.literal("io-intelligence") })),
	qwenCodeSchema.merge(z11.object({ apiProvider: z11.literal("qwen-code") })),
	rooSchema.merge(z11.object({ apiProvider: z11.literal("roo") })),
	vercelAiGatewaySchema.merge(z11.object({ apiProvider: z11.literal("vercel-ai-gateway") })),
	sapAiCoreSchema.merge(z11.object({ apiProvider: z11.literal("sap-ai-core") })),
	// kilocode_change
	defaultSchema,
])
var providerSettingsSchema = z11.object({
	apiProvider: providerNamesSchema.optional(),
	...anthropicSchema.shape,
	...claudeCodeSchema.shape,
	...glamaSchema.shape,
	...nanoGptSchema.shape,
	// kilocode_change
	...openRouterSchema.shape,
	...bedrockSchema.shape,
	...vertexSchema.shape,
	...openAiSchema.shape,
	...ollamaSchema.shape,
	...vsCodeLmSchema.shape,
	...lmStudioSchema.shape,
	...geminiSchema.shape,
	// kilocode_change start
	...geminiCliSchema.shape,
	...kilocodeSchema.shape,
	...virtualQuotaFallbackSchema.shape,
	...syntheticSchema.shape,
	...ovhcloudSchema.shape,
	...inceptionSchema.shape,
	// kilocode_change end
	...openAiNativeSchema.shape,
	...mistralSchema.shape,
	...deepSeekSchema.shape,
	...deepInfraSchema.shape,
	...doubaoSchema.shape,
	...moonshotSchema.shape,
	...minimaxSchema.shape,
	...unboundSchema.shape,
	...requestySchema.shape,
	...humanRelaySchema.shape,
	...fakeAiSchema.shape,
	...xaiSchema.shape,
	...groqSchema.shape,
	...huggingFaceSchema.shape,
	...chutesSchema.shape,
	...litellmSchema.shape,
	...cerebrasSchema.shape,
	...sambaNovaSchema.shape,
	...zaiSchema.shape,
	...fireworksSchema.shape,
	...featherlessSchema.shape,
	...ioIntelligenceSchema.shape,
	...qwenCodeSchema.shape,
	...rooSchema.shape,
	...vercelAiGatewaySchema.shape,
	...sapAiCoreSchema.shape,
	// kilocode_change
	...codebaseIndexProviderSchema.shape,
})
var providerSettingsWithIdSchema = providerSettingsSchema.extend({ id: z11.string().optional() })
var discriminatedProviderSettingsWithIdSchema = providerSettingsSchemaDiscriminated.and(
	z11.object({ id: z11.string().optional() }),
)
var PROVIDER_SETTINGS_KEYS = providerSettingsSchema.keyof().options
var modelIdKeys = [
	"apiModelId",
	"glamaModelId",
	"nanoGptModelId",
	// kilocode_change
	"openRouterModelId",
	"openAiModelId",
	"ollamaModelId",
	"lmStudioModelId",
	"lmStudioDraftModelId",
	"unboundModelId",
	"requestyModelId",
	"litellmModelId",
	"huggingFaceModelId",
	"ioIntelligenceModelId",
	"vercelAiGatewayModelId",
	"deepInfraModelId",
	"kilocodeModel",
	"ovhCloudAiEndpointsModelId",
	// kilocode_change
	"inceptionLabsModelId",
	// kilocode_change
	"sapAiCoreModelId",
	// kilocode_change
]
var getModelId = (settings) => {
	const modelIdKey = modelIdKeys.find((key) => settings[key])
	return modelIdKey ? settings[modelIdKey] : void 0
}
var isTypicalProvider = (key) =>
	isProviderName(key) && !isInternalProvider(key) && !isCustomProvider(key) && !isFauxProvider(key)
var modelIdKeysByProvider = {
	anthropic: "apiModelId",
	"claude-code": "apiModelId",
	glama: "glamaModelId",
	"nano-gpt": "nanoGptModelId",
	// kilocode_change
	openrouter: "openRouterModelId",
	kilocode: "kilocodeModel",
	bedrock: "apiModelId",
	vertex: "apiModelId",
	"openai-native": "openAiModelId",
	ollama: "ollamaModelId",
	lmstudio: "lmStudioModelId",
	gemini: "apiModelId",
	"gemini-cli": "apiModelId",
	mistral: "apiModelId",
	moonshot: "apiModelId",
	minimax: "apiModelId",
	deepseek: "apiModelId",
	deepinfra: "deepInfraModelId",
	doubao: "apiModelId",
	"qwen-code": "apiModelId",
	unbound: "unboundModelId",
	requesty: "requestyModelId",
	xai: "apiModelId",
	// kilocode_change start
	synthetic: "apiModelId",
	ovhcloud: "ovhCloudAiEndpointsModelId",
	inception: "inceptionLabsModelId",
	"sap-ai-core": "sapAiCoreModelId",
	// kilocode_change end
	groq: "apiModelId",
	chutes: "apiModelId",
	litellm: "litellmModelId",
	huggingface: "huggingFaceModelId",
	cerebras: "apiModelId",
	sambanova: "apiModelId",
	zai: "apiModelId",
	fireworks: "apiModelId",
	featherless: "apiModelId",
	"io-intelligence": "ioIntelligenceModelId",
	roo: "apiModelId",
	"vercel-ai-gateway": "vercelAiGatewayModelId",
	"virtual-quota-fallback": "apiModelId",
}
var ANTHROPIC_STYLE_PROVIDERS = ["anthropic", "claude-code", "bedrock"]
var getApiProtocol = (provider, modelId) => {
	if (provider && ANTHROPIC_STYLE_PROVIDERS.includes(provider)) {
		return "anthropic"
	}
	if (provider && provider === "vertex" && modelId && modelId.toLowerCase().includes("claude")) {
		return "anthropic"
	}
	if (
		provider &&
		["vercel-ai-gateway", "roo"].includes(provider) &&
		modelId &&
		modelId.toLowerCase().startsWith("anthropic/")
	) {
		return "anthropic"
	}
	return "openai"
}
var MODELS_BY_PROVIDER = {
	anthropic: {
		id: "anthropic",
		label: "Anthropic",
		models: Object.keys(anthropicModels),
	},
	bedrock: {
		id: "bedrock",
		label: "Amazon Bedrock",
		models: Object.keys(bedrockModels),
	},
	cerebras: {
		id: "cerebras",
		label: "Cerebras",
		models: Object.keys(cerebrasModels),
	},
	"claude-code": { id: "claude-code", label: "Claude Code", models: Object.keys(claudeCodeModels) },
	deepseek: {
		id: "deepseek",
		label: "DeepSeek",
		models: Object.keys(deepSeekModels),
	},
	doubao: { id: "doubao", label: "Doubao", models: Object.keys(doubaoModels) },
	featherless: {
		id: "featherless",
		label: "Featherless",
		models: Object.keys(featherlessModels),
	},
	fireworks: {
		id: "fireworks",
		label: "Fireworks",
		models: Object.keys(fireworksModels),
	},
	// kilocode_change start
	synthetic: {
		id: "synthetic",
		label: "Synthetic",
		models: Object.keys(syntheticModels),
	},
	//gemini: {
	//	id: "gemini",
	//	label: "Google Gemini",
	//	models: Object.keys(geminiModels),
	//},
	// kilocode_change end
	groq: { id: "groq", label: "Groq", models: Object.keys(groqModels) },
	"io-intelligence": {
		id: "io-intelligence",
		label: "IO Intelligence",
		models: Object.keys(ioIntelligenceModels),
	},
	mistral: {
		id: "mistral",
		label: "Mistral",
		models: Object.keys(mistralModels),
	},
	moonshot: {
		id: "moonshot",
		label: "Moonshot",
		models: Object.keys(moonshotModels),
	},
	minimax: {
		id: "minimax",
		label: "MiniMax",
		models: Object.keys(minimaxModels),
	},
	"openai-native": {
		id: "openai-native",
		label: "OpenAI",
		models: Object.keys(openAiNativeModels),
	},
	"qwen-code": { id: "qwen-code", label: "Qwen Code", models: Object.keys(qwenCodeModels) },
	roo: { id: "roo", label: "Roo Code Cloud", models: [] },
	sambanova: {
		id: "sambanova",
		label: "SambaNova",
		models: Object.keys(sambaNovaModels),
	},
	vertex: {
		id: "vertex",
		label: "GCP Vertex AI",
		models: Object.keys(vertexModels),
	},
	"vscode-lm": {
		id: "vscode-lm",
		label: "VS Code LM API",
		models: Object.keys(vscodeLlmModels),
	},
	xai: { id: "xai", label: "xAI (Grok)", models: Object.keys(xaiModels) },
	zai: { id: "zai", label: "Zai", models: Object.keys(internationalZAiModels) },
	// Dynamic providers; models pulled from remote APIs.
	glama: { id: "glama", label: "Glama", models: [] },
	"nano-gpt": { id: "nano-gpt", label: "Nano-GPT", models: [] },
	// kilocode_change
	huggingface: { id: "huggingface", label: "Hugging Face", models: [] },
	litellm: { id: "litellm", label: "LiteLLM", models: [] },
	openrouter: { id: "openrouter", label: "OpenRouter", models: [] },
	requesty: { id: "requesty", label: "Requesty", models: [] },
	unbound: { id: "unbound", label: "Unbound", models: [] },
	"sap-ai-core": { id: "sap-ai-core", label: "SAP AI Core", models: [] },
	// kilocode_change
	// kilocode_change start
	ovhcloud: { id: "ovhcloud", label: "OVHcloud AI Endpoints", models: [] },
	inception: { id: "inception", label: "Inception", models: [] },
	kilocode: { id: "kilocode", label: "Kilocode", models: [] },
	"virtual-quota-fallback": { id: "virtual-quota-fallback", label: "Virtual Quota Fallback", models: [] },
	// kilocode_change end
	deepinfra: { id: "deepinfra", label: "DeepInfra", models: [] },
	"vercel-ai-gateway": { id: "vercel-ai-gateway", label: "Vercel AI Gateway", models: [] },
	chutes: { id: "chutes", label: "Chutes AI", models: [] },
	// Local providers; models discovered from localhost endpoints.
	lmstudio: { id: "lmstudio", label: "LM Studio", models: [] },
	ollama: { id: "ollama", label: "Ollama", models: [] },
}

// src/history.ts
import { z as z12 } from "zod"
var historyItemSchema = z12.object({
	id: z12.string(),
	rootTaskId: z12.string().optional(),
	parentTaskId: z12.string().optional(),
	number: z12.number(),
	ts: z12.number(),
	task: z12.string(),
	tokensIn: z12.number(),
	tokensOut: z12.number(),
	cacheWrites: z12.number().optional(),
	cacheReads: z12.number().optional(),
	totalCost: z12.number(),
	size: z12.number().optional(),
	workspace: z12.string().optional(),
	isFavorited: z12.boolean().optional(),
	// kilocode_change
	fileNotfound: z12.boolean().optional(),
	// kilocode_change
	mode: z12.string().optional(),
})

// src/experiment.ts
import { z as z13 } from "zod"
var kilocodeExperimentIds = ["morphFastApply"]
var experimentIds = [
	"powerSteering",
	"multiFileApplyDiff",
	"preventFocusDisruption",
	"imageGeneration",
	"runSlashCommand",
]
var experimentIdsSchema = z13.enum([...experimentIds, ...kilocodeExperimentIds])
var experimentsSchema = z13.object({
	morphFastApply: z13.boolean().optional(),
	// kilocode_change
	powerSteering: z13.boolean().optional(),
	multiFileApplyDiff: z13.boolean().optional(),
	preventFocusDisruption: z13.boolean().optional(),
	imageGeneration: z13.boolean().optional(),
	runSlashCommand: z13.boolean().optional(),
})

// src/telemetry.ts
import { z as z14 } from "zod"
var telemetrySettings = ["unset", "enabled", "disabled"]
var telemetrySettingsSchema = z14.enum(telemetrySettings)
var TelemetryEventName = /* @__PURE__ */ ((TelemetryEventName2) => {
	TelemetryEventName2["COMMIT_MSG_GENERATED"] = "Commit Message Generated"
	TelemetryEventName2["INLINE_ASSIST_QUICK_TASK"] = "Inline Assist Quick Task"
	TelemetryEventName2["INLINE_ASSIST_AUTO_TASK"] = "Inline Assist Auto Task"
	TelemetryEventName2["INLINE_ASSIST_ACCEPT_SUGGESTION"] = "Inline Assist Accept Suggestion"
	TelemetryEventName2["INLINE_ASSIST_REJECT_SUGGESTION"] = "Inline Assist Reject Suggestion"
	TelemetryEventName2["CHECKPOINT_FAILURE"] = "Checkpoint Failure"
	TelemetryEventName2["TOOL_ERROR"] = "Tool Error"
	TelemetryEventName2["MAX_COMPLETION_TOKENS_REACHED_ERROR"] = "Max Completion Tokens Reached Error"
	TelemetryEventName2["NOTIFICATION_CLICKED"] = "Notification Clicked"
	TelemetryEventName2["WEBVIEW_MEMORY_USAGE"] = "Webview Memory Usage"
	TelemetryEventName2["MEMORY_WARNING_SHOWN"] = "Memory Warning Shown"
	TelemetryEventName2["FREE_MODELS_LINK_CLICKED"] = "Free Models Link Clicked"
	TelemetryEventName2["CREATE_ORGANIZATION_LINK_CLICKED"] = "Create Organization Link Clicked"
	TelemetryEventName2["SUGGESTION_BUTTON_CLICKED"] = "Suggestion Button Clicked"
	TelemetryEventName2["NO_ASSISTANT_MESSAGES"] = "No Assistant Messages"
	TelemetryEventName2["AUTO_PURGE_STARTED"] = "Auto Purge Started"
	TelemetryEventName2["AUTO_PURGE_COMPLETED"] = "Auto Purge Completed"
	TelemetryEventName2["AUTO_PURGE_FAILED"] = "Auto Purge Failed"
	TelemetryEventName2["MANUAL_PURGE_TRIGGERED"] = "Manual Purge Triggered"
	TelemetryEventName2["GHOST_SERVICE_DISABLED"] = "Ghost Service Disabled"
	TelemetryEventName2["ASK_APPROVAL"] = "Ask Approval"
	TelemetryEventName2["TASK_CREATED"] = "Task Created"
	TelemetryEventName2["TASK_RESTARTED"] = "Task Reopened"
	TelemetryEventName2["TASK_COMPLETED"] = "Task Completed"
	TelemetryEventName2["TASK_MESSAGE"] = "Task Message"
	TelemetryEventName2["TASK_CONVERSATION_MESSAGE"] = "Conversation Message"
	TelemetryEventName2["LLM_COMPLETION"] = "LLM Completion"
	TelemetryEventName2["MODE_SWITCH"] = "Mode Switched"
	TelemetryEventName2["MODE_SELECTOR_OPENED"] = "Mode Selector Opened"
	TelemetryEventName2["TOOL_USED"] = "Tool Used"
	TelemetryEventName2["CHECKPOINT_CREATED"] = "Checkpoint Created"
	TelemetryEventName2["CHECKPOINT_RESTORED"] = "Checkpoint Restored"
	TelemetryEventName2["CHECKPOINT_DIFFED"] = "Checkpoint Diffed"
	TelemetryEventName2["TAB_SHOWN"] = "Tab Shown"
	TelemetryEventName2["MODE_SETTINGS_CHANGED"] = "Mode Setting Changed"
	TelemetryEventName2["CUSTOM_MODE_CREATED"] = "Custom Mode Created"
	TelemetryEventName2["CONTEXT_CONDENSED"] = "Context Condensed"
	TelemetryEventName2["SLIDING_WINDOW_TRUNCATION"] = "Sliding Window Truncation"
	TelemetryEventName2["CODE_ACTION_USED"] = "Code Action Used"
	TelemetryEventName2["PROMPT_ENHANCED"] = "Prompt Enhanced"
	TelemetryEventName2["TITLE_BUTTON_CLICKED"] = "Title Button Clicked"
	TelemetryEventName2["AUTHENTICATION_INITIATED"] = "Authentication Initiated"
	TelemetryEventName2["MARKETPLACE_ITEM_INSTALLED"] = "Marketplace Item Installed"
	TelemetryEventName2["MARKETPLACE_ITEM_REMOVED"] = "Marketplace Item Removed"
	TelemetryEventName2["MARKETPLACE_TAB_VIEWED"] = "Marketplace Tab Viewed"
	TelemetryEventName2["MARKETPLACE_INSTALL_BUTTON_CLICKED"] = "Marketplace Install Button Clicked"
	TelemetryEventName2["SHARE_BUTTON_CLICKED"] = "Share Button Clicked"
	TelemetryEventName2["SHARE_ORGANIZATION_CLICKED"] = "Share Organization Clicked"
	TelemetryEventName2["SHARE_PUBLIC_CLICKED"] = "Share Public Clicked"
	TelemetryEventName2["SHARE_CONNECT_TO_CLOUD_CLICKED"] = "Share Connect To Cloud Clicked"
	TelemetryEventName2["ACCOUNT_CONNECT_CLICKED"] = "Account Connect Clicked"
	TelemetryEventName2["ACCOUNT_CONNECT_SUCCESS"] = "Account Connect Success"
	TelemetryEventName2["ACCOUNT_LOGOUT_CLICKED"] = "Account Logout Clicked"
	TelemetryEventName2["ACCOUNT_LOGOUT_SUCCESS"] = "Account Logout Success"
	TelemetryEventName2["FEATURED_PROVIDER_CLICKED"] = "Featured Provider Clicked"
	TelemetryEventName2["UPSELL_DISMISSED"] = "Upsell Dismissed"
	TelemetryEventName2["UPSELL_CLICKED"] = "Upsell Clicked"
	TelemetryEventName2["SCHEMA_VALIDATION_ERROR"] = "Schema Validation Error"
	TelemetryEventName2["DIFF_APPLICATION_ERROR"] = "Diff Application Error"
	TelemetryEventName2["SHELL_INTEGRATION_ERROR"] = "Shell Integration Error"
	TelemetryEventName2["CONSECUTIVE_MISTAKE_ERROR"] = "Consecutive Mistake Error"
	TelemetryEventName2["CODE_INDEX_ERROR"] = "Code Index Error"
	TelemetryEventName2["TELEMETRY_SETTINGS_CHANGED"] = "Telemetry Settings Changed"
	return TelemetryEventName2
})(TelemetryEventName || {})
var staticAppPropertiesSchema = z14.object({
	appName: z14.string(),
	appVersion: z14.string(),
	vscodeVersion: z14.string(),
	platform: z14.string(),
	editorName: z14.string(),
	wrapped: z14.boolean(),
	// kilocode_change
	wrapper: z14.string().nullable(),
	// kilocode_change
	wrapperTitle: z14.string().nullable(),
	// kilocode_change
	wrapperCode: z14.string().nullable(),
	// kilocode_change
	wrapperVersion: z14.string().nullable(),
	// kilocode_change
	hostname: z14.string().optional(),
})
var dynamicAppPropertiesSchema = z14.object({
	language: z14.string(),
	mode: z14.string(),
})
var cloudAppPropertiesSchema = z14.object({
	cloudIsAuthenticated: z14.boolean().optional(),
})
var appPropertiesSchema = z14.object({
	...staticAppPropertiesSchema.shape,
	...dynamicAppPropertiesSchema.shape,
	...cloudAppPropertiesSchema.shape,
})
var taskPropertiesSchema = z14.object({
	taskId: z14.string().optional(),
	parentTaskId: z14.string().optional(),
	apiProvider: z14.enum(providerNames).optional(),
	modelId: z14.string().optional(),
	diffStrategy: z14.string().optional(),
	isSubtask: z14.boolean().optional(),
	todos: z14
		.object({
			total: z14.number(),
			completed: z14.number(),
			inProgress: z14.number(),
			pending: z14.number(),
		})
		.optional(),
	// kilocode_change start
	currentTaskSize: z14.number().optional(),
	taskHistorySize: z14.number().optional(),
	toolStyle: toolProtocolSchema.optional(),
	// kilocode_change end
})
var gitPropertiesSchema = z14.object({
	repositoryUrl: z14.string().optional(),
	repositoryName: z14.string().optional(),
	defaultBranch: z14.string().optional(),
})
var telemetryPropertiesSchema = z14.object({
	...appPropertiesSchema.shape,
	...taskPropertiesSchema.shape,
	...gitPropertiesSchema.shape,
})
var rooCodeTelemetryEventSchema = z14.discriminatedUnion("type", [
	z14.object({
		type: z14.enum([
			// kilocode_change start
			"Commit Message Generated" /* COMMIT_MSG_GENERATED */,
			// kilocode_change
			"Inline Assist Quick Task" /* INLINE_ASSIST_QUICK_TASK */,
			// kilocode_change
			"Inline Assist Auto Task" /* INLINE_ASSIST_AUTO_TASK */,
			// kilocode_change
			"Inline Assist Accept Suggestion" /* INLINE_ASSIST_ACCEPT_SUGGESTION */,
			// kilocode_change
			"Inline Assist Reject Suggestion" /* INLINE_ASSIST_REJECT_SUGGESTION */,
			// kilocode_change
			"Webview Memory Usage" /* WEBVIEW_MEMORY_USAGE */,
			// kilocode_change
			"Auto Purge Started" /* AUTO_PURGE_STARTED */,
			// kilocode_change
			"Auto Purge Completed" /* AUTO_PURGE_COMPLETED */,
			// kilocode_change
			"Auto Purge Failed" /* AUTO_PURGE_FAILED */,
			// kilocode_change
			"Manual Purge Triggered" /* MANUAL_PURGE_TRIGGERED */,
			// kilocode_change
			"Ghost Service Disabled" /* GHOST_SERVICE_DISABLED */,
			// kilocode_change
			// kilocode_change end
			"Task Created" /* TASK_CREATED */,
			"Task Reopened" /* TASK_RESTARTED */,
			"Task Completed" /* TASK_COMPLETED */,
			"Conversation Message" /* TASK_CONVERSATION_MESSAGE */,
			"Mode Switched" /* MODE_SWITCH */,
			"Mode Selector Opened" /* MODE_SELECTOR_OPENED */,
			"Tool Used" /* TOOL_USED */,
			"Checkpoint Created" /* CHECKPOINT_CREATED */,
			"Checkpoint Restored" /* CHECKPOINT_RESTORED */,
			"Checkpoint Diffed" /* CHECKPOINT_DIFFED */,
			"Code Action Used" /* CODE_ACTION_USED */,
			"Prompt Enhanced" /* PROMPT_ENHANCED */,
			"Title Button Clicked" /* TITLE_BUTTON_CLICKED */,
			"Authentication Initiated" /* AUTHENTICATION_INITIATED */,
			"Marketplace Item Installed" /* MARKETPLACE_ITEM_INSTALLED */,
			"Marketplace Item Removed" /* MARKETPLACE_ITEM_REMOVED */,
			"Marketplace Tab Viewed" /* MARKETPLACE_TAB_VIEWED */,
			"Marketplace Install Button Clicked" /* MARKETPLACE_INSTALL_BUTTON_CLICKED */,
			"Share Button Clicked" /* SHARE_BUTTON_CLICKED */,
			"Share Organization Clicked" /* SHARE_ORGANIZATION_CLICKED */,
			"Share Public Clicked" /* SHARE_PUBLIC_CLICKED */,
			"Share Connect To Cloud Clicked" /* SHARE_CONNECT_TO_CLOUD_CLICKED */,
			"Account Connect Clicked" /* ACCOUNT_CONNECT_CLICKED */,
			"Account Connect Success" /* ACCOUNT_CONNECT_SUCCESS */,
			"Account Logout Clicked" /* ACCOUNT_LOGOUT_CLICKED */,
			"Account Logout Success" /* ACCOUNT_LOGOUT_SUCCESS */,
			"Featured Provider Clicked" /* FEATURED_PROVIDER_CLICKED */,
			"Upsell Dismissed" /* UPSELL_DISMISSED */,
			"Upsell Clicked" /* UPSELL_CLICKED */,
			"Schema Validation Error" /* SCHEMA_VALIDATION_ERROR */,
			"Diff Application Error" /* DIFF_APPLICATION_ERROR */,
			"Shell Integration Error" /* SHELL_INTEGRATION_ERROR */,
			"Consecutive Mistake Error" /* CONSECUTIVE_MISTAKE_ERROR */,
			"Code Index Error" /* CODE_INDEX_ERROR */,
			"Context Condensed" /* CONTEXT_CONDENSED */,
			"Sliding Window Truncation" /* SLIDING_WINDOW_TRUNCATION */,
			"Tab Shown" /* TAB_SHOWN */,
			"Mode Setting Changed" /* MODE_SETTINGS_CHANGED */,
			"Custom Mode Created" /* CUSTOM_MODE_CREATED */,
		]),
		properties: telemetryPropertiesSchema,
	}),
	z14.object({
		type: z14.literal("Telemetry Settings Changed" /* TELEMETRY_SETTINGS_CHANGED */),
		properties: z14.object({
			...telemetryPropertiesSchema.shape,
			previousSetting: telemetrySettingsSchema,
			newSetting: telemetrySettingsSchema,
		}),
	}),
	z14.object({
		type: z14.literal("Task Message" /* TASK_MESSAGE */),
		properties: z14.object({
			...telemetryPropertiesSchema.shape,
			taskId: z14.string(),
			message: clineMessageSchema,
		}),
	}),
	z14.object({
		type: z14.literal("LLM Completion" /* LLM_COMPLETION */),
		properties: z14.object({
			...telemetryPropertiesSchema.shape,
			inputTokens: z14.number(),
			outputTokens: z14.number(),
			cacheReadTokens: z14.number().optional(),
			cacheWriteTokens: z14.number().optional(),
			cost: z14.number().optional(),
		}),
	}),
])

// src/mode.ts
import { z as z15 } from "zod"
var groupOptionsSchema = z15.object({
	fileRegex: z15
		.string()
		.optional()
		.refine(
			(pattern) => {
				if (!pattern) {
					return true
				}
				try {
					new RegExp(pattern)
					return true
				} catch {
					return false
				}
			},
			{ message: "Invalid regular expression pattern" },
		),
	description: z15.string().optional(),
})
var groupEntrySchema = z15.union([toolGroupsSchema, z15.tuple([toolGroupsSchema, groupOptionsSchema])])
var groupEntryArraySchema = z15.array(groupEntrySchema).refine(
	(groups) => {
		const seen = /* @__PURE__ */ new Set()
		return groups.every((group) => {
			const groupName = Array.isArray(group) ? group[0] : group
			if (seen.has(groupName)) {
				return false
			}
			seen.add(groupName)
			return true
		})
	},
	{ message: "Duplicate groups are not allowed" },
)
var modeConfigSchema = z15.object({
	slug: z15.string().regex(/^[a-zA-Z0-9-]+$/, "Slug must contain only letters numbers and dashes"),
	name: z15.string().min(1, "Name is required"),
	roleDefinition: z15.string().min(1, "Role definition is required"),
	whenToUse: z15.string().optional(),
	description: z15.string().optional(),
	customInstructions: z15.string().optional(),
	groups: groupEntryArraySchema,
	source: z15.enum(["global", "project", "organization"]).optional(),
	// kilocode_change: Added "organization" source
	iconName: z15.string().optional(),
	// kilocode_change
})
var customModesSettingsSchema = z15.object({
	customModes: z15.array(modeConfigSchema).refine(
		(modes) => {
			const slugs = /* @__PURE__ */ new Set()
			return modes.every((mode) => {
				if (slugs.has(mode.slug)) {
					return false
				}
				slugs.add(mode.slug)
				return true
			})
		},
		{
			message: "Duplicate mode slugs are not allowed",
		},
	),
})
var promptComponentSchema = z15.object({
	roleDefinition: z15.string().optional(),
	whenToUse: z15.string().optional(),
	description: z15.string().optional(),
	customInstructions: z15.string().optional(),
})
var customModePromptsSchema = z15.record(z15.string(), promptComponentSchema.optional())
var customSupportPromptsSchema = z15.record(z15.string(), z15.string().optional())
var DEFAULT_MODES = [
	{
		slug: "architect",
		// kilocode_change start
		name: "Architect",
		iconName: "codicon-type-hierarchy-sub",
		// kilocode_change end
		roleDefinition:
			"You are Kilo Code, an experienced technical leader who is inquisitive and an excellent planner. Your goal is to gather information and get context to create a detailed plan for accomplishing the user's task, which the user will review and approve before they switch into another mode to implement the solution.",
		whenToUse:
			"Use this mode when you need to plan, design, or strategize before implementation. Perfect for breaking down complex problems, creating technical specifications, designing system architecture, or brainstorming solutions before coding.",
		description: "Plan and design before implementation",
		groups: ["read", ["edit", { fileRegex: "\\.md$", description: "Markdown files only" }], "browser", "mcp"],
		customInstructions:
			"1. Do some information gathering (using provided tools) to get more context about the task.\n\n2. You should also ask the user clarifying questions to get a better understanding of the task.\n\n3. Once you've gained more context about the user's request, break down the task into clear, actionable steps and create a todo list using the `update_todo_list` tool. Each todo item should be:\n   - Specific and actionable\n   - Listed in logical execution order\n   - Focused on a single, well-defined outcome\n   - Clear enough that another mode could execute it independently\n\n   **Note:** If the `update_todo_list` tool is not available, write the plan to a markdown file (e.g., `plan.md` or `todo.md`) instead.\n\n4. As you gather more information or discover new requirements, update the todo list to reflect the current understanding of what needs to be accomplished.\n\n5. Ask the user if they are pleased with this plan, or if they would like to make any changes. Think of this as a brainstorming session where you can discuss the task and refine the todo list.\n\n6. Include Mermaid diagrams if they help clarify complex workflows or system architecture. Please avoid using double quotes (\"\") and parentheses () inside square brackets ([]) in Mermaid diagrams, as this can cause parsing errors.\n\n7. Use the switch_mode tool to request that the user switch to another mode to implement the solution.\n\n**IMPORTANT: Focus on creating clear, actionable todo lists rather than lengthy markdown documents. Use the todo list as your primary planning tool to track and organize the work that needs to be done.**",
	},
	{
		slug: "code",
		// kilocode_change start
		name: "Code",
		iconName: "codicon-code",
		// kilocode_change end
		roleDefinition:
			"You are Kilo Code, a highly skilled software engineer with extensive knowledge in many programming languages, frameworks, design patterns, and best practices.",
		whenToUse:
			"Use this mode when you need to write, modify, or refactor code. Ideal for implementing features, fixing bugs, creating new files, or making code improvements across any programming language or framework.",
		description: "Write, modify, and refactor code",
		groups: ["read", "edit", "browser", "command", "mcp"],
	},
	{
		slug: "ask",
		// kilocode_change start
		name: "Ask",
		iconName: "codicon-question",
		// kilocode_change end
		roleDefinition:
			"You are Kilo Code, a knowledgeable technical assistant focused on answering questions and providing information about software development, technology, and related topics.",
		whenToUse:
			"Use this mode when you need explanations, documentation, or answers to technical questions. Best for understanding concepts, analyzing existing code, getting recommendations, or learning about technologies without making changes.",
		description: "Get answers and explanations",
		groups: ["read", "browser", "mcp"],
		customInstructions:
			"You can analyze code, explain concepts, and access external resources. Always answer the user's questions thoroughly, and do not switch to implementing code unless explicitly requested by the user. Include Mermaid diagrams when they clarify your response.",
	},
	{
		slug: "debug",
		// kilocode_change start
		name: "Debug",
		iconName: "codicon-bug",
		// kilocode_change end
		roleDefinition:
			"You are Kilo Code, an expert software debugger specializing in systematic problem diagnosis and resolution.",
		whenToUse:
			"Use this mode when you're troubleshooting issues, investigating errors, or diagnosing problems. Specialized in systematic debugging, adding logging, analyzing stack traces, and identifying root causes before applying fixes.",
		description: "Diagnose and fix software issues",
		groups: ["read", "edit", "browser", "command", "mcp"],
		customInstructions:
			"Reflect on 5-7 different possible sources of the problem, distill those down to 1-2 most likely sources, and then add logs to validate your assumptions. Explicitly ask the user to confirm the diagnosis before fixing the problem.",
	},
	{
		slug: "orchestrator",
		// kilocode_change start
		name: "Orchestrator",
		iconName: "codicon-run-all",
		// kilocode_change end
		roleDefinition:
			"You are Kilo Code, a strategic workflow orchestrator who coordinates complex tasks by delegating them to appropriate specialized modes. You have a comprehensive understanding of each mode's capabilities and limitations, allowing you to effectively break down complex problems into discrete tasks that can be solved by different specialists.",
		whenToUse:
			"Use this mode for complex, multi-step projects that require coordination across different specialties. Ideal when you need to break down large tasks into subtasks, manage workflows, or coordinate work that spans multiple domains or expertise areas.",
		description: "Coordinate tasks across multiple modes",
		groups: [],
		customInstructions:
			"Your role is to coordinate complex workflows by delegating tasks to specialized modes. As an orchestrator, you should:\n\n1. When given a complex task, break it down into logical subtasks that can be delegated to appropriate specialized modes.\n\n2. For each subtask, use the `new_task` tool to delegate. Choose the most appropriate mode for the subtask's specific goal and provide comprehensive instructions in the `message` parameter. These instructions must include:\n    *   All necessary context from the parent task or previous subtasks required to complete the work.\n    *   A clearly defined scope, specifying exactly what the subtask should accomplish.\n    *   An explicit statement that the subtask should *only* perform the work outlined in these instructions and not deviate.\n    *   An instruction for the subtask to signal completion by using the `attempt_completion` tool, providing a concise yet thorough summary of the outcome in the `result` parameter, keeping in mind that this summary will be the source of truth used to keep track of what was completed on this project.\n    *   A statement that these specific instructions supersede any conflicting general instructions the subtask's mode might have.\n\n3. Track and manage the progress of all subtasks. When a subtask is completed, analyze its results and determine the next steps.\n\n4. Help the user understand how the different subtasks fit together in the overall workflow. Provide clear reasoning about why you're delegating specific tasks to specific modes.\n\n5. When all subtasks are completed, synthesize the results and provide a comprehensive overview of what was accomplished.\n\n6. Ask clarifying questions when necessary to better understand how to break down complex tasks effectively.\n\n7. Suggest improvements to the workflow based on the results of completed subtasks.\n\nUse subtasks to maintain clarity. If a request significantly shifts focus or requires a different expertise (mode), consider creating a subtask rather than overloading the current one.",
	},
]

// src/vscode.ts
import { z as z16 } from "zod"

// src/kilocode/kiloLanguages.ts
var kiloLanguages = ["ar", "cs", "th", "uk"]

// src/vscode.ts
var kiloCodeActionIds = ["addToContextAndFocus"]
var codeActionIds = [
	...kiloCodeActionIds,
	// kilocode_change
	"explainCode",
	"fixCode",
	"improveCode",
	"addToContext",
	"newTask",
]
var terminalActionIds = ["terminalAddToContext", "terminalFixCommand", "terminalExplainCommand"]
var commandIds = [
	"activationCompleted",
	"plusButtonClicked",
	"promptsButtonClicked",
	"mcpButtonClicked",
	"historyButtonClicked",
	"marketplaceButtonClicked",
	"popoutButtonClicked",
	"cloudButtonClicked",
	"settingsButtonClicked",
	"openInNewTab",
	"showHumanRelayDialog",
	"registerHumanRelayCallback",
	"unregisterHumanRelayCallback",
	"handleHumanRelayResponse",
	"newTask",
	"setCustomStoragePath",
	"importSettings",
	// "focusInput", // kilocode_change
	"acceptInput",
	"profileButtonClicked",
	// kilocode_change
	"helpButtonClicked",
	// kilocode_change
	"focusChatInput",
	// kilocode_change
	"importSettings",
	// kilocode_change
	"exportSettings",
	// kilocode_change
	"generateTerminalCommand",
	// kilocode_change
	"handleExternalUri",
	// kilocode_change - for JetBrains plugin URL forwarding
	"focusPanel",
	"toggleAutoApprove",
]
var languages = [
	...kiloLanguages,
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
var languagesSchema = z16.enum(languages)
var isLanguage = (value) => languages.includes(value)

// src/global-settings.ts
var DEFAULT_WRITE_DELAY_MS = 1e3
var DEFAULT_TERMINAL_OUTPUT_CHARACTER_LIMIT = 5e4
var MIN_CHECKPOINT_TIMEOUT_SECONDS = 10
var MAX_CHECKPOINT_TIMEOUT_SECONDS = 60
var DEFAULT_CHECKPOINT_TIMEOUT_SECONDS = 15
var globalSettingsSchema = z17.object({
	currentApiConfigName: z17.string().optional(),
	listApiConfigMeta: z17.array(providerSettingsEntrySchema).optional(),
	pinnedApiConfigs: z17.record(z17.string(), z17.boolean()).optional(),
	lastShownAnnouncementId: z17.string().optional(),
	customInstructions: z17.string().optional(),
	taskHistory: z17.array(historyItemSchema).optional(),
	dismissedUpsells: z17.array(z17.string()).optional(),
	// Image generation settings (experimental) - flattened for simplicity
	openRouterImageApiKey: z17.string().optional(),
	openRouterImageGenerationSelectedModel: z17.string().optional(),
	kiloCodeImageApiKey: z17.string().optional(),
	condensingApiConfigId: z17.string().optional(),
	customCondensingPrompt: z17.string().optional(),
	autoApprovalEnabled: z17.boolean().optional(),
	yoloMode: z17.boolean().optional(),
	// kilocode_change
	yoloGatekeeperApiConfigId: z17.string().optional(),
	// kilocode_change: AI gatekeeper for YOLO mode
	alwaysAllowReadOnly: z17.boolean().optional(),
	alwaysAllowReadOnlyOutsideWorkspace: z17.boolean().optional(),
	alwaysAllowWrite: z17.boolean().optional(),
	alwaysAllowWriteOutsideWorkspace: z17.boolean().optional(),
	alwaysAllowWriteProtected: z17.boolean().optional(),
	writeDelayMs: z17.number().min(0).optional(),
	alwaysAllowBrowser: z17.boolean().optional(),
	alwaysApproveResubmit: z17.boolean().optional(),
	requestDelaySeconds: z17.number().optional(),
	alwaysAllowMcp: z17.boolean().optional(),
	alwaysAllowModeSwitch: z17.boolean().optional(),
	alwaysAllowSubtasks: z17.boolean().optional(),
	alwaysAllowExecute: z17.boolean().optional(),
	alwaysAllowFollowupQuestions: z17.boolean().optional(),
	followupAutoApproveTimeoutMs: z17.number().optional(),
	alwaysAllowUpdateTodoList: z17.boolean().optional(),
	allowedCommands: z17.array(z17.string()).optional(),
	deniedCommands: z17.array(z17.string()).optional(),
	commandExecutionTimeout: z17.number().optional(),
	commandTimeoutAllowlist: z17.array(z17.string()).optional(),
	preventCompletionWithOpenTodos: z17.boolean().optional(),
	allowedMaxRequests: z17.number().nullish(),
	allowedMaxCost: z17.number().nullish(),
	autoCondenseContext: z17.boolean().optional(),
	autoCondenseContextPercent: z17.number().optional(),
	maxConcurrentFileReads: z17.number().optional(),
	allowVeryLargeReads: z17.boolean().optional(),
	// kilocode_change
	/**
	 * Whether to include current time in the environment details
	 * @default true
	 */
	includeCurrentTime: z17.boolean().optional(),
	/**
	 * Whether to include current cost in the environment details
	 * @default true
	 */
	includeCurrentCost: z17.boolean().optional(),
	/**
	 * Whether to include diagnostic messages (errors, warnings) in tool outputs
	 * @default true
	 */
	includeDiagnosticMessages: z17.boolean().optional(),
	/**
	 * Maximum number of diagnostic messages to include in tool outputs
	 * @default 50
	 */
	maxDiagnosticMessages: z17.number().optional(),
	browserToolEnabled: z17.boolean().optional(),
	browserViewportSize: z17.string().optional(),
	showAutoApproveMenu: z17.boolean().optional(),
	// kilocode_change
	showTaskTimeline: z17.boolean().optional(),
	// kilocode_change
	sendMessageOnEnter: z17.boolean().optional(),
	// kilocode_change: Enter key behavior
	showTimestamps: z17.boolean().optional(),
	// kilocode_change
	hideCostBelowThreshold: z17.number().min(0).optional(),
	// kilocode_change
	localWorkflowToggles: z17.record(z17.string(), z17.boolean()).optional(),
	// kilocode_change
	globalWorkflowToggles: z17.record(z17.string(), z17.boolean()).optional(),
	// kilocode_change
	localRulesToggles: z17.record(z17.string(), z17.boolean()).optional(),
	// kilocode_change
	globalRulesToggles: z17.record(z17.string(), z17.boolean()).optional(),
	// kilocode_change
	screenshotQuality: z17.number().optional(),
	remoteBrowserEnabled: z17.boolean().optional(),
	remoteBrowserHost: z17.string().optional(),
	cachedChromeHostUrl: z17.string().optional(),
	enableCheckpoints: z17.boolean().optional(),
	checkpointTimeout: z17
		.number()
		.int()
		.min(MIN_CHECKPOINT_TIMEOUT_SECONDS)
		.max(MAX_CHECKPOINT_TIMEOUT_SECONDS)
		.optional(),
	// kilocode_change start - Auto-purge settings
	autoPurgeEnabled: z17.boolean().optional(),
	autoPurgeDefaultRetentionDays: z17.number().min(1).optional(),
	autoPurgeFavoritedTaskRetentionDays: z17.number().min(1).nullable().optional(),
	autoPurgeCompletedTaskRetentionDays: z17.number().min(1).optional(),
	autoPurgeIncompleteTaskRetentionDays: z17.number().min(1).optional(),
	autoPurgeLastRunTimestamp: z17.number().optional(),
	// kilocode_change end
	ttsEnabled: z17.boolean().optional(),
	ttsSpeed: z17.number().optional(),
	soundEnabled: z17.boolean().optional(),
	soundVolume: z17.number().optional(),
	systemNotificationsEnabled: z17.boolean().optional(),
	// kilocode_change
	maxOpenTabsContext: z17.number().optional(),
	maxWorkspaceFiles: z17.number().optional(),
	showRooIgnoredFiles: z17.boolean().optional(),
	maxReadFileLine: z17.number().optional(),
	maxImageFileSize: z17.number().optional(),
	maxTotalImageSize: z17.number().optional(),
	terminalOutputLineLimit: z17.number().optional(),
	terminalOutputCharacterLimit: z17.number().optional(),
	terminalShellIntegrationTimeout: z17.number().optional(),
	terminalShellIntegrationDisabled: z17.boolean().optional(),
	terminalCommandDelay: z17.number().optional(),
	terminalPowershellCounter: z17.boolean().optional(),
	terminalZshClearEolMark: z17.boolean().optional(),
	terminalZshOhMy: z17.boolean().optional(),
	terminalZshP10k: z17.boolean().optional(),
	terminalZdotdir: z17.boolean().optional(),
	terminalCompressProgressBar: z17.boolean().optional(),
	diagnosticsEnabled: z17.boolean().optional(),
	rateLimitSeconds: z17.number().optional(),
	diffEnabled: z17.boolean().optional(),
	fuzzyMatchThreshold: z17.number().optional(),
	experiments: experimentsSchema.optional(),
	// kilocode_change start: Morph fast apply
	morphApiKey: z17.string().optional(),
	fastApplyModel: fastApplyModelSchema.optional(),
	fastApplyApiProvider: fastApplyApiProviderSchema.optional(),
	// kilocode_change end
	codebaseIndexModels: codebaseIndexModelsSchema.optional(),
	codebaseIndexConfig: codebaseIndexConfigSchema.optional(),
	language: languagesSchema.optional(),
	telemetrySetting: telemetrySettingsSchema.optional(),
	mcpEnabled: z17.boolean().optional(),
	enableMcpServerCreation: z17.boolean().optional(),
	mcpMarketplaceCatalog: z17.any().optional(),
	// kilocode_change: MCP marketplace catalog
	mode: z17.string().optional(),
	modeApiConfigs: z17.record(z17.string(), z17.string()).optional(),
	customModes: z17.array(modeConfigSchema).optional(),
	customModePrompts: customModePromptsSchema.optional(),
	customSupportPrompts: customSupportPromptsSchema.optional(),
	enhancementApiConfigId: z17.string().optional(),
	dismissedNotificationIds: z17.string().array().optional(),
	// kilocode_change
	commitMessageApiConfigId: z17.string().optional(),
	// kilocode_change
	terminalCommandApiConfigId: z17.string().optional(),
	// kilocode_change
	ghostServiceSettings: ghostServiceSettingsSchema,
	// kilocode_change
	hasPerformedOrganizationAutoSwitch: z17.boolean().optional(),
	// kilocode_change
	includeTaskHistoryInEnhance: z17.boolean().optional(),
	historyPreviewCollapsed: z17.boolean().optional(),
	reasoningBlockCollapsed: z17.boolean().optional(),
	profileThresholds: z17.record(z17.string(), z17.number()).optional(),
	hasOpenedModeSelector: z17.boolean().optional(),
	lastModeExportPath: z17.string().optional(),
	lastModeImportPath: z17.string().optional(),
})
var GLOBAL_SETTINGS_KEYS = globalSettingsSchema.keyof().options
var rooCodeSettingsSchema = providerSettingsSchema.merge(globalSettingsSchema)
var SECRET_STATE_KEYS = [
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
	// kilocode_change start
	"minimaxApiKey",
	"kilocodeToken",
	"syntheticApiKey",
	"ovhCloudAiEndpointsApiKey",
	"inceptionLabsApiKey",
	// kilocode_change end
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
	// kilocode_change
]
var GLOBAL_SECRET_KEYS = [
	"openRouterImageApiKey",
	// For image generation
	"kiloCodeImageApiKey",
]
var isSecretStateKey = (key) => SECRET_STATE_KEYS.includes(key) || GLOBAL_SECRET_KEYS.includes(key)
var GLOBAL_STATE_KEYS = [...GLOBAL_SETTINGS_KEYS, ...PROVIDER_SETTINGS_KEYS].filter((key) => !isSecretStateKey(key))
var isGlobalStateKey = (key) => GLOBAL_STATE_KEYS.includes(key)
var EVALS_SETTINGS = {
	apiProvider: "openrouter",
	openRouterUseMiddleOutTransform: false,
	lastShownAnnouncementId: "jul-09-2025-3-23-0",
	pinnedApiConfigs: {},
	autoApprovalEnabled: true,
	alwaysAllowReadOnly: true,
	alwaysAllowReadOnlyOutsideWorkspace: false,
	alwaysAllowWrite: true,
	alwaysAllowWriteOutsideWorkspace: false,
	alwaysAllowWriteProtected: false,
	writeDelayMs: 1e3,
	alwaysAllowBrowser: true,
	alwaysApproveResubmit: true,
	requestDelaySeconds: 10,
	alwaysAllowMcp: true,
	alwaysAllowModeSwitch: true,
	alwaysAllowSubtasks: true,
	alwaysAllowExecute: true,
	alwaysAllowFollowupQuestions: true,
	alwaysAllowUpdateTodoList: true,
	followupAutoApproveTimeoutMs: 0,
	allowedCommands: ["*"],
	commandExecutionTimeout: 20,
	commandTimeoutAllowlist: [],
	preventCompletionWithOpenTodos: false,
	browserToolEnabled: false,
	browserViewportSize: "900x600",
	screenshotQuality: 75,
	remoteBrowserEnabled: false,
	ttsEnabled: false,
	ttsSpeed: 1,
	soundEnabled: false,
	soundVolume: 0.5,
	dismissedNotificationIds: [],
	// kilocode_change
	systemNotificationsEnabled: true,
	// kilocode_change
	ghostServiceSettings: {},
	// kilocode_change
	terminalOutputLineLimit: 500,
	terminalOutputCharacterLimit: DEFAULT_TERMINAL_OUTPUT_CHARACTER_LIMIT,
	terminalShellIntegrationTimeout: 3e4,
	terminalCommandDelay: 0,
	terminalPowershellCounter: false,
	terminalZshOhMy: true,
	terminalZshClearEolMark: true,
	terminalZshP10k: false,
	terminalZdotdir: true,
	terminalCompressProgressBar: true,
	terminalShellIntegrationDisabled: true,
	diagnosticsEnabled: true,
	diffEnabled: true,
	fuzzyMatchThreshold: 1,
	enableCheckpoints: false,
	// kilocode_change start - Auto-purge defaults
	autoPurgeEnabled: false,
	autoPurgeDefaultRetentionDays: 30,
	autoPurgeFavoritedTaskRetentionDays: null,
	// null = never purge
	autoPurgeCompletedTaskRetentionDays: 30,
	autoPurgeIncompleteTaskRetentionDays: 7,
	// kilocode_change end
	rateLimitSeconds: 0,
	maxOpenTabsContext: 20,
	maxWorkspaceFiles: 200,
	showRooIgnoredFiles: true,
	maxReadFileLine: -1,
	// -1 to enable full file reading.
	includeDiagnosticMessages: true,
	maxDiagnosticMessages: 50,
	language: "en",
	telemetrySetting: "enabled",
	mcpEnabled: false,
	mode: "code",
	// "architect",
	customModes: [],
}
var EVALS_TIMEOUT = 5 * 60 * 1e3

// src/marketplace.ts
import { z as z18 } from "zod"
var mcpParameterSchema = z18.object({
	name: z18.string().min(1),
	key: z18.string().min(1),
	placeholder: z18.string().optional(),
	optional: z18.boolean().optional().default(false),
})
var mcpInstallationMethodSchema = z18.object({
	name: z18.string().min(1),
	content: z18.string().min(1),
	parameters: z18.array(mcpParameterSchema).optional(),
	prerequisites: z18.array(z18.string()).optional(),
})
var marketplaceItemTypeSchema = z18.enum(["mode", "mcp"])
var baseMarketplaceItemSchema = z18.object({
	id: z18.string().min(1),
	name: z18.string().min(1, "Name is required"),
	description: z18.string(),
	author: z18.string().optional(),
	authorUrl: z18.string().url("Author URL must be a valid URL").optional(),
	tags: z18.array(z18.string()).optional(),
	prerequisites: z18.array(z18.string()).optional(),
})
var modeMarketplaceItemSchema = baseMarketplaceItemSchema.extend({
	content: z18.string().min(1),
	// YAML content for modes
})
var mcpMarketplaceItemSchema = baseMarketplaceItemSchema.extend({
	url: z18.string().url(),
	// Required url field
	content: z18.union([z18.string().min(1), z18.array(mcpInstallationMethodSchema)]),
	// Single config or array of methods
	parameters: z18.array(mcpParameterSchema).optional(),
})
var marketplaceItemSchema = z18.discriminatedUnion("type", [
	// Mode marketplace item
	modeMarketplaceItemSchema.extend({
		type: z18.literal("mode"),
	}),
	// MCP marketplace item
	mcpMarketplaceItemSchema.extend({
		type: z18.literal("mcp"),
	}),
])
var installMarketplaceItemOptionsSchema = z18.object({
	target: z18.enum(["global", "project"]).optional().default("project"),
	parameters: z18.record(z18.string(), z18.any()).optional(),
})

// src/cloud.ts
var organizationAllowListSchema = z19.object({
	allowAll: z19.boolean(),
	providers: z19.record(
		z19.object({
			allowAll: z19.boolean(),
			models: z19.array(z19.string()).optional(),
		}),
	),
})
var organizationDefaultSettingsSchema = globalSettingsSchema
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
	.merge(
		z19.object({
			maxOpenTabsContext: z19.number().int().nonnegative().optional(),
			maxReadFileLine: z19.number().int().gte(-1).optional(),
			maxWorkspaceFiles: z19.number().int().nonnegative().optional(),
			terminalCommandDelay: z19.number().int().nonnegative().optional(),
			terminalOutputLineLimit: z19.number().int().nonnegative().optional(),
			terminalShellIntegrationTimeout: z19.number().int().nonnegative().optional(),
		}),
	)
var organizationCloudSettingsSchema = z19.object({
	recordTaskMessages: z19.boolean().optional(),
	enableTaskSharing: z19.boolean().optional(),
	taskShareExpirationDays: z19.number().int().positive().optional(),
	allowMembersViewAllTasks: z19.boolean().optional(),
})
var organizationFeaturesSchema = z19.object({
	roomoteControlEnabled: z19.boolean().optional(),
})
var organizationSettingsSchema = z19.object({
	version: z19.number(),
	cloudSettings: organizationCloudSettingsSchema.optional(),
	defaultSettings: organizationDefaultSettingsSchema,
	allowList: organizationAllowListSchema,
	features: organizationFeaturesSchema.optional(),
	hiddenMcps: z19.array(z19.string()).optional(),
	hideMarketplaceMcps: z19.boolean().optional(),
	mcps: z19.array(mcpMarketplaceItemSchema).optional(),
	providerProfiles: z19.record(z19.string(), providerSettingsWithIdSchema).optional(),
})
var userFeaturesSchema = z19.object({
	roomoteControlEnabled: z19.boolean().optional(),
})
var userSettingsConfigSchema = z19.object({
	extensionBridgeEnabled: z19.boolean().optional(),
	taskSyncEnabled: z19.boolean().optional(),
})
var userSettingsDataSchema = z19.object({
	features: userFeaturesSchema,
	settings: userSettingsConfigSchema,
	version: z19.number(),
})
var ORGANIZATION_ALLOW_ALL = {
	allowAll: true,
	providers: {},
}
var ORGANIZATION_DEFAULT = {
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
var shareResponseSchema = z19.object({
	success: z19.boolean(),
	shareUrl: z19.string().optional(),
	error: z19.string().optional(),
	isNewShare: z19.boolean().optional(),
	manageUrl: z19.string().optional(),
})
var ConnectionState = /* @__PURE__ */ ((ConnectionState2) => {
	ConnectionState2["DISCONNECTED"] = "disconnected"
	ConnectionState2["CONNECTING"] = "connecting"
	ConnectionState2["CONNECTED"] = "connected"
	ConnectionState2["RETRYING"] = "retrying"
	ConnectionState2["FAILED"] = "failed"
	return ConnectionState2
})(ConnectionState || {})
var HEARTBEAT_INTERVAL_MS = 2e4
var INSTANCE_TTL_SECONDS = 60
var extensionTaskSchema = z19.object({
	taskId: z19.string(),
	taskStatus: z19.nativeEnum(TaskStatus),
	taskAsk: clineMessageSchema.optional(),
	queuedMessages: z19.array(queuedMessageSchema).optional(),
	parentTaskId: z19.string().optional(),
	childTaskId: z19.string().optional(),
	tokenUsage: tokenUsageSchema.optional(),
	...taskMetadataSchema.shape,
})
var extensionInstanceSchema = z19.object({
	instanceId: z19.string(),
	userId: z19.string(),
	workspacePath: z19.string(),
	appProperties: staticAppPropertiesSchema,
	gitProperties: gitPropertiesSchema.optional(),
	lastHeartbeat: z19.coerce.number(),
	task: extensionTaskSchema,
	taskAsk: clineMessageSchema.optional(),
	taskHistory: z19.array(z19.string()),
	mode: z19.string().optional(),
	modes: z19.array(z19.object({ slug: z19.string(), name: z19.string() })).optional(),
	providerProfile: z19.string().optional(),
	providerProfiles: z19.array(z19.object({ name: z19.string(), provider: z19.string().optional() })).optional(),
	isCloudAgent: z19.boolean().optional(),
})
var ExtensionBridgeEventName = ((ExtensionBridgeEventName2) => {
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskCreated"] = "taskCreated") /* TaskCreated */] =
		"TaskCreated"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskStarted"] = "taskStarted") /* TaskStarted */] =
		"TaskStarted"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskCompleted"] = "taskCompleted") /* TaskCompleted */] =
		"TaskCompleted"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskAborted"] = "taskAborted") /* TaskAborted */] =
		"TaskAborted"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskFocused"] = "taskFocused") /* TaskFocused */] =
		"TaskFocused"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskUnfocused"] = "taskUnfocused") /* TaskUnfocused */] =
		"TaskUnfocused"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskActive"] = "taskActive") /* TaskActive */] = "TaskActive"
	ExtensionBridgeEventName2[
		(ExtensionBridgeEventName2["TaskInteractive"] = "taskInteractive") /* TaskInteractive */
	] = "TaskInteractive"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskResumable"] = "taskResumable") /* TaskResumable */] =
		"TaskResumable"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskIdle"] = "taskIdle") /* TaskIdle */] = "TaskIdle"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskPaused"] = "taskPaused") /* TaskPaused */] = "TaskPaused"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskUnpaused"] = "taskUnpaused") /* TaskUnpaused */] =
		"TaskUnpaused"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["TaskSpawned"] = "taskSpawned") /* TaskSpawned */] =
		"TaskSpawned"
	ExtensionBridgeEventName2[
		(ExtensionBridgeEventName2["TaskUserMessage"] = "taskUserMessage") /* TaskUserMessage */
	] = "TaskUserMessage"
	ExtensionBridgeEventName2[
		(ExtensionBridgeEventName2["TaskTokenUsageUpdated"] = "taskTokenUsageUpdated") /* TaskTokenUsageUpdated */
	] = "TaskTokenUsageUpdated"
	ExtensionBridgeEventName2[(ExtensionBridgeEventName2["ModeChanged"] = "modeChanged") /* ModeChanged */] =
		"ModeChanged"
	ExtensionBridgeEventName2[
		(ExtensionBridgeEventName2["ProviderProfileChanged"] = "providerProfileChanged") /* ProviderProfileChanged */
	] = "ProviderProfileChanged"
	ExtensionBridgeEventName2["InstanceRegistered"] = "instance_registered"
	ExtensionBridgeEventName2["InstanceUnregistered"] = "instance_unregistered"
	ExtensionBridgeEventName2["HeartbeatUpdated"] = "heartbeat_updated"
	return ExtensionBridgeEventName2
})(ExtensionBridgeEventName || {})
var extensionBridgeEventSchema = z19.discriminatedUnion("type", [
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskCreated),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskStarted),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskCompleted),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskAborted),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskFocused),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskUnfocused),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskActive),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskInteractive),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskResumable),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskIdle),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskPaused),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskUnpaused),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskSpawned),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskUserMessage),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.TaskTokenUsageUpdated),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.ModeChanged),
		instance: extensionInstanceSchema,
		mode: z19.string(),
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal(ExtensionBridgeEventName.ProviderProfileChanged),
		instance: extensionInstanceSchema,
		providerProfile: z19.object({ name: z19.string(), provider: z19.string().optional() }),
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal("instance_registered" /* InstanceRegistered */),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal("instance_unregistered" /* InstanceUnregistered */),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal("heartbeat_updated" /* HeartbeatUpdated */),
		instance: extensionInstanceSchema,
		timestamp: z19.number(),
	}),
])
var ExtensionBridgeCommandName = /* @__PURE__ */ ((ExtensionBridgeCommandName2) => {
	ExtensionBridgeCommandName2["StartTask"] = "start_task"
	ExtensionBridgeCommandName2["StopTask"] = "stop_task"
	ExtensionBridgeCommandName2["ResumeTask"] = "resume_task"
	return ExtensionBridgeCommandName2
})(ExtensionBridgeCommandName || {})
var extensionBridgeCommandSchema = z19.discriminatedUnion("type", [
	z19.object({
		type: z19.literal("start_task" /* StartTask */),
		instanceId: z19.string(),
		payload: z19.object({
			text: z19.string(),
			images: z19.array(z19.string()).optional(),
			mode: z19.string().optional(),
			providerProfile: z19.string().optional(),
		}),
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal("stop_task" /* StopTask */),
		instanceId: z19.string(),
		payload: z19.object({ taskId: z19.string() }),
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal("resume_task" /* ResumeTask */),
		instanceId: z19.string(),
		payload: z19.object({ taskId: z19.string() }),
		timestamp: z19.number(),
	}),
])
var TaskBridgeEventName = ((TaskBridgeEventName2) => {
	TaskBridgeEventName2[(TaskBridgeEventName2["Message"] = "message") /* Message */] = "Message"
	TaskBridgeEventName2[(TaskBridgeEventName2["TaskModeSwitched"] = "taskModeSwitched") /* TaskModeSwitched */] =
		"TaskModeSwitched"
	TaskBridgeEventName2[(TaskBridgeEventName2["TaskInteractive"] = "taskInteractive") /* TaskInteractive */] =
		"TaskInteractive"
	return TaskBridgeEventName2
})(TaskBridgeEventName || {})
var taskBridgeEventSchema = z19.discriminatedUnion("type", [
	z19.object({
		type: z19.literal(TaskBridgeEventName.Message),
		taskId: z19.string(),
		action: z19.string(),
		message: clineMessageSchema,
	}),
	z19.object({
		type: z19.literal(TaskBridgeEventName.TaskModeSwitched),
		taskId: z19.string(),
		mode: z19.string(),
	}),
	z19.object({
		type: z19.literal(TaskBridgeEventName.TaskInteractive),
		taskId: z19.string(),
	}),
])
var TaskBridgeCommandName = /* @__PURE__ */ ((TaskBridgeCommandName2) => {
	TaskBridgeCommandName2["Message"] = "message"
	TaskBridgeCommandName2["ApproveAsk"] = "approve_ask"
	TaskBridgeCommandName2["DenyAsk"] = "deny_ask"
	return TaskBridgeCommandName2
})(TaskBridgeCommandName || {})
var taskBridgeCommandSchema = z19.discriminatedUnion("type", [
	z19.object({
		type: z19.literal("message" /* Message */),
		taskId: z19.string(),
		payload: z19.object({
			text: z19.string(),
			images: z19.array(z19.string()).optional(),
			mode: z19.string().optional(),
			providerProfile: z19.string().optional(),
		}),
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal("approve_ask" /* ApproveAsk */),
		taskId: z19.string(),
		payload: z19.object({
			text: z19.string().optional(),
			images: z19.array(z19.string()).optional(),
		}),
		timestamp: z19.number(),
	}),
	z19.object({
		type: z19.literal("deny_ask" /* DenyAsk */),
		taskId: z19.string(),
		payload: z19.object({
			text: z19.string().optional(),
			images: z19.array(z19.string()).optional(),
		}),
		timestamp: z19.number(),
	}),
])
var ExtensionSocketEvents = /* @__PURE__ */ ((ExtensionSocketEvents2) => {
	ExtensionSocketEvents2["CONNECTED"] = "extension:connected"
	ExtensionSocketEvents2["REGISTER"] = "extension:register"
	ExtensionSocketEvents2["UNREGISTER"] = "extension:unregister"
	ExtensionSocketEvents2["HEARTBEAT"] = "extension:heartbeat"
	ExtensionSocketEvents2["EVENT"] = "extension:event"
	ExtensionSocketEvents2["RELAYED_EVENT"] = "extension:relayed_event"
	ExtensionSocketEvents2["COMMAND"] = "extension:command"
	ExtensionSocketEvents2["RELAYED_COMMAND"] = "extension:relayed_command"
	return ExtensionSocketEvents2
})(ExtensionSocketEvents || {})
var TaskSocketEvents = /* @__PURE__ */ ((TaskSocketEvents2) => {
	TaskSocketEvents2["JOIN"] = "task:join"
	TaskSocketEvents2["LEAVE"] = "task:leave"
	TaskSocketEvents2["EVENT"] = "task:event"
	TaskSocketEvents2["RELAYED_EVENT"] = "task:relayed_event"
	TaskSocketEvents2["COMMAND"] = "task:command"
	TaskSocketEvents2["RELAYED_COMMAND"] = "task:relayed_command"
	return TaskSocketEvents2
})(TaskSocketEvents || {})
var usageStatsSchema = z19.object({
	success: z19.boolean(),
	data: z19.object({
		dates: z19.array(z19.string()),
		// Array of date strings
		tasks: z19.array(z19.number()),
		// Array of task counts
		tokens: z19.array(z19.number()),
		// Array of token counts
		costs: z19.array(z19.number()),
		// Array of costs in USD
		totals: z19.object({
			tasks: z19.number(),
			tokens: z19.number(),
			cost: z19.number(),
			// Total cost in USD
		}),
	}),
	period: z19.number(),
	// Period in days (e.g., 30)
})

// src/cookie-consent.ts
var CONSENT_COOKIE_NAME = "roo-code-cookie-consent"
var COOKIE_CONSENT_EVENTS = {
	CHANGED: "cookieConsentChanged",
}

// src/feature-flags.ts
var MODEL_SELECTION_ENABLED = process.env.NODE_ENV === "development"

// src/followup.ts
import { z as z20 } from "zod"
var suggestionItemSchema = z20.object({
	answer: z20.string(),
	mode: z20.string().optional(),
})
var followUpDataSchema = z20.object({
	question: z20.string().optional(),
	suggest: z20.array(suggestionItemSchema).optional(),
})

// src/ipc.ts
import { z as z21 } from "zod"
var IpcMessageType = /* @__PURE__ */ ((IpcMessageType2) => {
	IpcMessageType2["Connect"] = "Connect"
	IpcMessageType2["Disconnect"] = "Disconnect"
	IpcMessageType2["Ack"] = "Ack"
	IpcMessageType2["TaskCommand"] = "TaskCommand"
	IpcMessageType2["TaskEvent"] = "TaskEvent"
	return IpcMessageType2
})(IpcMessageType || {})
var IpcOrigin = /* @__PURE__ */ ((IpcOrigin2) => {
	IpcOrigin2["Client"] = "client"
	IpcOrigin2["Server"] = "server"
	return IpcOrigin2
})(IpcOrigin || {})
var ackSchema = z21.object({
	clientId: z21.string(),
	pid: z21.number(),
	ppid: z21.number(),
})
var TaskCommandName = /* @__PURE__ */ ((TaskCommandName2) => {
	TaskCommandName2["StartNewTask"] = "StartNewTask"
	TaskCommandName2["CancelTask"] = "CancelTask"
	TaskCommandName2["CloseTask"] = "CloseTask"
	TaskCommandName2["ResumeTask"] = "ResumeTask"
	TaskCommandName2["SendMessage"] = "SendMessage"
	return TaskCommandName2
})(TaskCommandName || {})
var taskCommandSchema = z21.discriminatedUnion("commandName", [
	z21.object({
		commandName: z21.literal("StartNewTask" /* StartNewTask */),
		data: z21.object({
			configuration: rooCodeSettingsSchema,
			text: z21.string(),
			images: z21.array(z21.string()).optional(),
			newTab: z21.boolean().optional(),
		}),
	}),
	z21.object({
		commandName: z21.literal("CancelTask" /* CancelTask */),
		data: z21.string(),
	}),
	z21.object({
		commandName: z21.literal("CloseTask" /* CloseTask */),
		data: z21.string(),
	}),
	z21.object({
		commandName: z21.literal("ResumeTask" /* ResumeTask */),
		data: z21.string(),
	}),
	z21.object({
		commandName: z21.literal("SendMessage" /* SendMessage */),
		data: z21.object({
			text: z21.string().optional(),
			images: z21.array(z21.string()).optional(),
		}),
	}),
])
var ipcMessageSchema = z21.discriminatedUnion("type", [
	z21.object({
		type: z21.literal("Ack" /* Ack */),
		origin: z21.literal("server" /* Server */),
		data: ackSchema,
	}),
	z21.object({
		type: z21.literal("TaskCommand" /* TaskCommand */),
		origin: z21.literal("client" /* Client */),
		clientId: z21.string(),
		data: taskCommandSchema,
	}),
	z21.object({
		type: z21.literal("TaskEvent" /* TaskEvent */),
		origin: z21.literal("server" /* Server */),
		relayClientId: z21.string().optional(),
		data: taskEventSchema,
	}),
])

// src/mcp.ts
import { z as z22 } from "zod"
var mcpExecutionStatusSchema = z22.discriminatedUnion("status", [
	z22.object({
		executionId: z22.string(),
		status: z22.literal("started"),
		serverName: z22.string(),
		toolName: z22.string(),
	}),
	z22.object({
		executionId: z22.string(),
		status: z22.literal("output"),
		response: z22.string(),
	}),
	z22.object({
		executionId: z22.string(),
		status: z22.literal("completed"),
		response: z22.string().optional(),
	}),
	z22.object({
		executionId: z22.string(),
		status: z22.literal("error"),
		error: z22.string().optional(),
	}),
])

// src/single-file-read-models.ts
function shouldUseSingleFileRead(_modelId) {
	return false
}

// src/todo.ts
import { z as z23 } from "zod"
var todoStatusSchema = z23.enum(["pending", "in_progress", "completed"])
var todoItemSchema = z23.object({
	id: z23.string(),
	content: z23.string(),
	status: todoStatusSchema,
})

// src/terminal.ts
import { z as z24 } from "zod"
var commandExecutionStatusSchema = z24.discriminatedUnion("status", [
	z24.object({
		executionId: z24.string(),
		status: z24.literal("started"),
		pid: z24.number().optional(),
		command: z24.string(),
	}),
	z24.object({
		executionId: z24.string(),
		status: z24.literal("output"),
		output: z24.string(),
	}),
	z24.object({
		executionId: z24.string(),
		status: z24.literal("exited"),
		exitCode: z24.number().optional(),
	}),
	z24.object({
		executionId: z24.string(),
		status: z24.literal("fallback"),
	}),
	z24.object({
		executionId: z24.string(),
		status: z24.literal("timeout"),
	}),
])

// src/kilocode/nativeFunctionCallingProviders.ts
var nativeFunctionCallingProviders = [
	"openrouter",
	"kilocode",
	"openai",
	"lmstudio",
	"chutes",
	"deepinfra",
	"xai",
	"zai",
	"synthetic",
	"human-relay",
	"qwen-code",
	"inception",
	"litellm",
	"minimax",
	"anthropic",
	"moonshot",
]
export {
	ANTHROPIC_DEFAULT_MAX_TOKENS,
	ANTHROPIC_STYLE_PROVIDERS,
	AWS_INFERENCE_PROFILE_MAPPING,
	BEDROCK_1M_CONTEXT_MODEL_IDS,
	BEDROCK_DEFAULT_CONTEXT,
	BEDROCK_DEFAULT_TEMPERATURE,
	BEDROCK_GLOBAL_INFERENCE_MODEL_IDS,
	BEDROCK_MAX_TOKENS,
	BEDROCK_REGIONS,
	CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS,
	CODEBASE_INDEX_DEFAULTS,
	CONSENT_COOKIE_NAME,
	COOKIE_CONSENT_EVENTS,
	ConnectionState,
	DEEP_SEEK_DEFAULT_TEMPERATURE,
	DEFAULT_CHECKPOINT_TIMEOUT_SECONDS,
	DEFAULT_CONSECUTIVE_MISTAKE_LIMIT,
	DEFAULT_KILOCODE_BACKEND_URL,
	DEFAULT_MODES,
	DEFAULT_PROFILE_TYPE,
	DEFAULT_TERMINAL_OUTPUT_CHARACTER_LIMIT,
	DEFAULT_WRITE_DELAY_MS,
	DOUBAO_API_BASE_URL,
	DOUBAO_API_CHAT_PATH,
	EVALS_SETTINGS,
	EVALS_TIMEOUT,
	ExtensionBridgeCommandName,
	ExtensionBridgeEventName,
	ExtensionSocketEvents,
	GLAMA_DEFAULT_TEMPERATURE,
	GLOBAL_SECRET_KEYS,
	GLOBAL_SETTINGS_KEYS,
	GLOBAL_STATE_KEYS,
	HEARTBEAT_INTERVAL_MS,
	HUGGINGFACE_API_URL,
	HUGGINGFACE_CACHE_DURATION,
	HUGGINGFACE_DEFAULT_CONTEXT_WINDOW,
	HUGGINGFACE_DEFAULT_MAX_TOKENS,
	HUGGINGFACE_MAX_TOKENS_FALLBACK,
	HUGGINGFACE_SLIDER_MIN,
	HUGGINGFACE_SLIDER_STEP,
	HUGGINGFACE_TEMPERATURE_MAX_VALUE,
	INSTANCE_TTL_SECONDS,
	IO_INTELLIGENCE_CACHE_DURATION,
	IpcMessageType,
	IpcOrigin,
	LMSTUDIO_DEFAULT_TEMPERATURE,
	MAX_CHECKPOINT_TIMEOUT_SECONDS,
	MINIMAX_DEFAULT_MAX_TOKENS,
	MINIMAX_DEFAULT_TEMPERATURE,
	MIN_CHECKPOINT_TIMEOUT_SECONDS,
	MISTRAL_DEFAULT_TEMPERATURE,
	MODELS_BY_PROVIDER,
	MODEL_SELECTION_ENABLED,
	MOONSHOT_DEFAULT_TEMPERATURE,
	OPENAI_AZURE_AI_INFERENCE_PATH,
	OPENAI_NATIVE_DEFAULT_TEMPERATURE,
	OPENROUTER_DEFAULT_PROVIDER_NAME,
	OPEN_ROUTER_PROMPT_CACHING_MODELS,
	OPEN_ROUTER_REASONING_BUDGET_MODELS,
	OPEN_ROUTER_REQUIRED_REASONING_BUDGET_MODELS,
	ORGANIZATION_ALLOW_ALL,
	ORGANIZATION_DEFAULT,
	PROVIDER_SETTINGS_KEYS,
	RooCodeEventName,
	RooModelSchema,
	RooModelsResponseSchema,
	RooPricingSchema,
	SECRET_STATE_KEYS,
	TOOL_PROTOCOL,
	TaskBridgeCommandName,
	TaskBridgeEventName,
	TaskCommandName,
	TaskSocketEvents,
	TaskStatus,
	TaskType,
	TelemetryEventName,
	VERCEL_AI_GATEWAY_DEFAULT_TEMPERATURE,
	VERCEL_AI_GATEWAY_PROMPT_CACHING_MODELS,
	VERCEL_AI_GATEWAY_VISION_AND_TOOLS_MODELS,
	VERCEL_AI_GATEWAY_VISION_ONLY_MODELS,
	VERTEX_REGIONS,
	ZAI_DEFAULT_TEMPERATURE,
	ackSchema,
	anthropicDefaultModelId,
	anthropicModels,
	appPropertiesSchema,
	autoPurgeSettingsSchema,
	azureOpenAiDefaultApiVersion,
	bedrockDefaultModelId,
	bedrockDefaultPromptRouterModelId,
	bedrockModels,
	cerebrasDefaultModelId,
	cerebrasModels,
	chutesDefaultModelId,
	chutesDefaultModelInfo,
	chutesModels,
	claudeCodeDefaultModelId,
	claudeCodeModels,
	clineAskSchema,
	clineAsks,
	clineMessageSchema,
	clineSaySchema,
	clineSays,
	cloudAppPropertiesSchema,
	codeActionIds,
	codebaseIndexConfigSchema,
	codebaseIndexModelsSchema,
	codebaseIndexProviderSchema,
	commandExecutionStatusSchema,
	commandIds,
	commitRangeSchema,
	contextCondenseSchema,
	convertModelNameForVertex,
	customModePromptsSchema,
	customModesSettingsSchema,
	customProviders,
	customSupportPromptsSchema,
	deepInfraDefaultModelId,
	deepInfraDefaultModelInfo,
	deepSeekDefaultModelId,
	deepSeekModels,
	discriminatedProviderSettingsWithIdSchema,
	doubaoDefaultModelId,
	doubaoDefaultModelInfo,
	doubaoModels,
	dynamicAppPropertiesSchema,
	dynamicProviders,
	experimentIds,
	experimentIdsSchema,
	experimentsSchema,
	extensionBridgeCommandSchema,
	extensionBridgeEventSchema,
	extensionInstanceSchema,
	fastApplyApiProviderSchema,
	fastApplyModelSchema,
	fauxProviders,
	featherlessDefaultModelId,
	featherlessModels,
	fireworksDefaultModelId,
	fireworksModels,
	followUpDataSchema,
	geminiCliDefaultModelId,
	geminiCliModels,
	geminiDefaultModelId,
	geminiModels,
	getApiProtocol,
	getApiUrl,
	getAppUrl,
	getClaudeCodeModelId,
	getEffectiveProtocol,
	getExtensionConfigUrl,
	getKiloBaseUriFromToken,
	getKiloUrlFromToken,
	getModelId,
	getProviderDefaultModelId,
	ghostServiceSettingsSchema,
	gitPropertiesSchema,
	glamaDefaultModelId,
	glamaDefaultModelInfo,
	globalSettingsSchema,
	groqDefaultModelId,
	groqModels,
	groupEntrySchema,
	groupOptionsSchema,
	historyItemSchema,
	idleAsks,
	inceptionDefaultModelId,
	inceptionDefaultModelInfo,
	installMarketplaceItemOptionsSchema,
	interactiveAsks,
	internalProviders,
	internationalZAiDefaultModelId,
	internationalZAiModels,
	ioIntelligenceDefaultBaseUrl,
	ioIntelligenceDefaultModelId,
	ioIntelligenceModels,
	ipcMessageSchema,
	isCustomProvider,
	isDynamicProvider,
	isFauxProvider,
	isGlobalStateKey,
	isIdleAsk,
	isInteractiveAsk,
	isInternalProvider,
	isLanguage,
	isLocalProvider,
	isModelParameter,
	isNativeProtocol,
	isNonBlockingAsk,
	isProviderName,
	isResumableAsk,
	isSecretStateKey,
	isTypicalProvider,
	kiloCodeActionIds,
	kiloCodeMetaDataSchema,
	lMStudioDefaultModelId,
	lMStudioDefaultModelInfo,
	languages,
	languagesSchema,
	litellmDefaultModelId,
	litellmDefaultModelInfo,
	localProviders,
	mainlandZAiDefaultModelId,
	mainlandZAiModels,
	marketplaceItemSchema,
	marketplaceItemTypeSchema,
	mcpExecutionStatusSchema,
	mcpInstallationMethodSchema,
	mcpMarketplaceItemSchema,
	mcpParameterSchema,
	minimaxDefaultModelId,
	minimaxModels,
	mistralDefaultModelId,
	mistralModels,
	modeConfigSchema,
	modeMarketplaceItemSchema,
	modelIdKeys,
	modelIdKeysByProvider,
	modelInfoSchema,
	modelParameters,
	modelParametersSchema,
	moonshotDefaultModelId,
	moonshotModels,
	nanoGptDefaultModelId,
	nanoGptDefaultModelInfo,
	nanoGptModelListSchema,
	nativeFunctionCallingProviders,
	nonBlockingAsks,
	ollamaDefaultModelId,
	ollamaDefaultModelInfo,
	openAiModelInfoSaneDefaults,
	openAiNativeDefaultModelId,
	openAiNativeModels,
	openRouterDefaultModelId,
	openRouterDefaultModelInfo,
	openRouterProviderDataCollectionSchema,
	openRouterProviderSortSchema,
	organizationAllowListSchema,
	organizationCloudSettingsSchema,
	organizationDefaultSettingsSchema,
	organizationFeaturesSchema,
	organizationSettingsSchema,
	ovhCloudAiEndpointsDefaultModelId,
	ovhCloudAiEndpointsDefaultModelInfo,
	profileTypeSchema,
	profileTypes,
	promptComponentSchema,
	providerNames,
	providerNamesSchema,
	providerSettingsEntrySchema,
	providerSettingsSchema,
	providerSettingsSchemaDiscriminated,
	providerSettingsWithIdSchema,
	queuedMessageSchema,
	qwenCodeDefaultModelId,
	qwenCodeModels,
	reasoningEffortExtendedSchema,
	reasoningEffortSettingSchema,
	reasoningEffortSettingValues,
	reasoningEffortWithMinimalSchema,
	reasoningEfforts,
	reasoningEffortsExtended,
	reasoningEffortsSchema,
	requestyDefaultModelId,
	requestyDefaultModelInfo,
	resumableAsks,
	rooCodeEventsSchema,
	rooCodeSettingsSchema,
	rooCodeTelemetryEventSchema,
	rooDefaultModelId,
	rooModels,
	sambaNovaDefaultModelId,
	sambaNovaModels,
	serviceTierSchema,
	serviceTiers,
	shareResponseSchema,
	shouldUseSingleFileRead,
	staticAppPropertiesSchema,
	suggestionItemSchema,
	syntheticDefaultModelId,
	syntheticModels,
	taskBridgeCommandSchema,
	taskBridgeEventSchema,
	taskCommandSchema,
	taskEventSchema,
	taskMetadataSchema,
	taskPropertiesSchema,
	telemetryPropertiesSchema,
	telemetrySettings,
	telemetrySettingsSchema,
	terminalActionIds,
	todoItemSchema,
	todoStatusSchema,
	tokenUsageSchema,
	toolGroups,
	toolGroupsSchema,
	toolNames,
	toolNamesSchema,
	toolProgressStatusSchema,
	toolProtocolSchema,
	toolUsageSchema,
	unboundDefaultModelId,
	unboundDefaultModelInfo,
	usageStatsSchema,
	userFeaturesSchema,
	userSettingsConfigSchema,
	userSettingsDataSchema,
	verbosityLevels,
	verbosityLevelsSchema,
	vercelAiGatewayDefaultModelId,
	vercelAiGatewayDefaultModelInfo,
	vertexDefaultModelId,
	vertexModels,
	virtualQuotaFallbackProfileDataSchema,
	vscodeLlmDefaultModelId,
	vscodeLlmModels,
	xaiDefaultModelId,
	xaiModels,
	zaiApiLineConfigs,
	zaiApiLineSchema,
}
//# sourceMappingURL=index.js.map
