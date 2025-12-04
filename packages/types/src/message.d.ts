import { z } from "zod"
/**
 * ClineAsk
 */
/**
 * Array of possible ask types that the LLM can use to request user interaction or approval.
 * These represent different scenarios where the assistant needs user input to proceed.
 *
 * @constant
 * @readonly
 *
 * Ask type descriptions:
 * - `followup`: LLM asks a clarifying question to gather more information needed to complete the task
 * - `command`: Permission to execute a terminal/shell command
 * - `command_output`: Permission to read the output from a previously executed command
 * - `completion_result`: Task has been completed, awaiting user feedback or a new task
 * - `tool`: Permission to use a tool for file operations (read, write, search, etc.)
 * - `api_req_failed`: API request failed, asking user whether to retry
 * - `resume_task`: Confirmation needed to resume a previously paused task
 * - `resume_completed_task`: Confirmation needed to resume a task that was already marked as completed
 * - `mistake_limit_reached`: Too many errors encountered, needs user guidance on how to proceed
 * - `browser_action_launch`: Permission to open or interact with a browser
 * - `use_mcp_server`: Permission to use Model Context Protocol (MCP) server functionality
 * - `auto_approval_max_req_reached`: Auto-approval limit has been reached, manual approval required
 */
export declare const clineAsks: readonly [
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
	"payment_required_prompt",
	"invalid_model",
	"report_bug",
	"condense",
	"checkpoint_restore",
]
export declare const clineAskSchema: z.ZodEnum<
	[
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
		"payment_required_prompt",
		"invalid_model",
		"report_bug",
		"condense",
		"checkpoint_restore",
	]
>
export type ClineAsk = z.infer<typeof clineAskSchema>
/**
 * IdleAsk
 *
 * Asks that put the task into an "idle" state.
 */
export declare const idleAsks: readonly [
	"payment_required_prompt",
	"invalid_model",
	"completion_result",
	"api_req_failed",
	"resume_completed_task",
	"mistake_limit_reached",
	"auto_approval_max_req_reached",
]
export type IdleAsk = (typeof idleAsks)[number]
export declare function isIdleAsk(ask: ClineAsk): ask is IdleAsk
/**
 * ResumableAsk
 *
 * Asks that put the task into an "resumable" state.
 */
export declare const resumableAsks: readonly ["resume_task"]
export type ResumableAsk = (typeof resumableAsks)[number]
export declare function isResumableAsk(ask: ClineAsk): ask is ResumableAsk
/**
 * InteractiveAsk
 *
 * Asks that put the task into an "user interaction required" state.
 */
export declare const interactiveAsks: readonly [
	"report_bug",
	"condense",
	"checkpoint_restore",
	"followup",
	"command",
	"tool",
	"browser_action_launch",
	"use_mcp_server",
]
export type InteractiveAsk = (typeof interactiveAsks)[number]
export declare function isInteractiveAsk(ask: ClineAsk): ask is InteractiveAsk
/**
 * NonBlockingAsk
 *
 * Asks that are not associated with an actual approval, and are only used
 * to update chat messages.
 */
export declare const nonBlockingAsks: readonly ["command_output"]
export type NonBlockingAsk = (typeof nonBlockingAsks)[number]
export declare function isNonBlockingAsk(ask: ClineAsk): ask is NonBlockingAsk
/**
 * ClineSay
 */
/**
 * Array of possible say types that represent different kinds of messages the assistant can send.
 * These are used to categorize and handle various types of communication from the LLM to the user.
 *
 * @constant
 * @readonly
 *
 * Say type descriptions:
 * - `error`: General error message
 * - `api_req_started`: Indicates an API request has been initiated
 * - `api_req_finished`: Indicates an API request has completed successfully
 * - `api_req_retried`: Indicates an API request is being retried after a failure
 * - `api_req_retry_delayed`: Indicates an API request retry has been delayed
 * - `api_req_deleted`: Indicates an API request has been deleted/cancelled
 * - `text`: General text message or assistant response
 * - `reasoning`: Assistant's reasoning or thought process (often hidden from user)
 * - `completion_result`: Final result of task completion
 * - `user_feedback`: Message containing user feedback
 * - `user_feedback_diff`: Diff-formatted feedback from user showing requested changes
 * - `command_output`: Output from an executed command
 * - `shell_integration_warning`: Warning about shell integration issues or limitations
 * - `browser_action`: Action performed in the browser
 * - `browser_action_result`: Result of a browser action
 * - `mcp_server_request_started`: MCP server request has been initiated
 * - `mcp_server_response`: Response received from MCP server
 * - `subtask_result`: Result of a completed subtask
 * - `checkpoint_saved`: Indicates a checkpoint has been saved
 * - `rooignore_error`: Error related to .rooignore file processing
 * - `diff_error`: Error occurred while applying a diff/patch
 * - `condense_context`: Context condensation/summarization has started
 * - `condense_context_error`: Error occurred during context condensation
 * - `codebase_search_result`: Results from searching the codebase
 */
export declare const clineSays: readonly [
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
export declare const clineSaySchema: z.ZodEnum<
	[
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
>
export type ClineSay = z.infer<typeof clineSaySchema>
/**
 * ToolProgressStatus
 */
export declare const toolProgressStatusSchema: z.ZodObject<
	{
		icon: z.ZodOptional<z.ZodString>
		text: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		text?: string | undefined
		icon?: string | undefined
	},
	{
		text?: string | undefined
		icon?: string | undefined
	}
>
export type ToolProgressStatus = z.infer<typeof toolProgressStatusSchema>
/**
 * ContextCondense
 */
export declare const contextCondenseSchema: z.ZodObject<
	{
		cost: z.ZodNumber
		prevContextTokens: z.ZodNumber
		newContextTokens: z.ZodNumber
		summary: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		cost: number
		prevContextTokens: number
		newContextTokens: number
		summary: string
	},
	{
		cost: number
		prevContextTokens: number
		newContextTokens: number
		summary: string
	}
>
export type ContextCondense = z.infer<typeof contextCondenseSchema>
/**
 * ClineMessage
 */
export declare const clineMessageSchema: z.ZodObject<
	{
		ts: z.ZodNumber
		type: z.ZodUnion<[z.ZodLiteral<"ask">, z.ZodLiteral<"say">]>
		ask: z.ZodOptional<
			z.ZodEnum<
				[
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
					"payment_required_prompt",
					"invalid_model",
					"report_bug",
					"condense",
					"checkpoint_restore",
				]
			>
		>
		say: z.ZodOptional<
			z.ZodEnum<
				[
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
			>
		>
		text: z.ZodOptional<z.ZodString>
		images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		partial: z.ZodOptional<z.ZodBoolean>
		reasoning: z.ZodOptional<z.ZodString>
		conversationHistoryIndex: z.ZodOptional<z.ZodNumber>
		checkpoint: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>
		progressStatus: z.ZodOptional<
			z.ZodObject<
				{
					icon: z.ZodOptional<z.ZodString>
					text: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					text?: string | undefined
					icon?: string | undefined
				},
				{
					text?: string | undefined
					icon?: string | undefined
				}
			>
		>
		contextCondense: z.ZodOptional<
			z.ZodObject<
				{
					cost: z.ZodNumber
					prevContextTokens: z.ZodNumber
					newContextTokens: z.ZodNumber
					summary: z.ZodString
				},
				"strip",
				z.ZodTypeAny,
				{
					cost: number
					prevContextTokens: number
					newContextTokens: number
					summary: string
				},
				{
					cost: number
					prevContextTokens: number
					newContextTokens: number
					summary: string
				}
			>
		>
		isProtected: z.ZodOptional<z.ZodBoolean>
		apiProtocol: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"openai">, z.ZodLiteral<"anthropic">]>>
		isAnswered: z.ZodOptional<z.ZodBoolean>
		metadata: z.ZodOptional<
			z.ZodObject<
				{
					kiloCode: z.ZodOptional<
						z.ZodObject<
							{
								commitRange: z.ZodOptional<
									z.ZodObject<
										{
											from: z.ZodString
											fromTimeStamp: z.ZodOptional<z.ZodNumber>
											to: z.ZodString
										},
										"strip",
										z.ZodTypeAny,
										{
											from: string
											to: string
											fromTimeStamp?: number | undefined
										},
										{
											from: string
											to: string
											fromTimeStamp?: number | undefined
										}
									>
								>
							},
							"strip",
							z.ZodTypeAny,
							{
								commitRange?:
									| {
											from: string
											to: string
											fromTimeStamp?: number | undefined
									  }
									| undefined
							},
							{
								commitRange?:
									| {
											from: string
											to: string
											fromTimeStamp?: number | undefined
									  }
									| undefined
							}
						>
					>
				},
				"strip",
				z.ZodTypeAny,
				{
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
				},
				{
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
			>
		>
	},
	"strip",
	z.ZodTypeAny,
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
	},
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
	}
>
export type ClineMessage = z.infer<typeof clineMessageSchema>
/**
 * TokenUsage
 */
export declare const tokenUsageSchema: z.ZodObject<
	{
		totalTokensIn: z.ZodNumber
		totalTokensOut: z.ZodNumber
		totalCacheWrites: z.ZodOptional<z.ZodNumber>
		totalCacheReads: z.ZodOptional<z.ZodNumber>
		totalCost: z.ZodNumber
		contextTokens: z.ZodNumber
	},
	"strip",
	z.ZodTypeAny,
	{
		totalTokensIn: number
		totalTokensOut: number
		totalCost: number
		contextTokens: number
		totalCacheWrites?: number | undefined
		totalCacheReads?: number | undefined
	},
	{
		totalTokensIn: number
		totalTokensOut: number
		totalCost: number
		contextTokens: number
		totalCacheWrites?: number | undefined
		totalCacheReads?: number | undefined
	}
>
export type TokenUsage = z.infer<typeof tokenUsageSchema>
/**
 * QueuedMessage
 */
export declare const queuedMessageSchema: z.ZodObject<
	{
		timestamp: z.ZodNumber
		id: z.ZodString
		text: z.ZodString
		images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
	},
	"strip",
	z.ZodTypeAny,
	{
		text: string
		timestamp: number
		id: string
		images?: string[] | undefined
	},
	{
		text: string
		timestamp: number
		id: string
		images?: string[] | undefined
	}
>
export type QueuedMessage = z.infer<typeof queuedMessageSchema>
//# sourceMappingURL=message.d.ts.map
