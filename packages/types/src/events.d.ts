import { z } from "zod"
/**
 * RooCodeEventName
 */
export declare enum RooCodeEventName {
	TaskCreated = "taskCreated",
	TaskStarted = "taskStarted",
	TaskCompleted = "taskCompleted",
	TaskAborted = "taskAborted",
	TaskFocused = "taskFocused",
	TaskUnfocused = "taskUnfocused",
	TaskActive = "taskActive",
	TaskInteractive = "taskInteractive",
	TaskResumable = "taskResumable",
	TaskIdle = "taskIdle",
	TaskPaused = "taskPaused",
	TaskUnpaused = "taskUnpaused",
	TaskSpawned = "taskSpawned",
	Message = "message",
	TaskModeSwitched = "taskModeSwitched",
	TaskAskResponded = "taskAskResponded",
	TaskUserMessage = "taskUserMessage",
	TaskTokenUsageUpdated = "taskTokenUsageUpdated",
	TaskToolFailed = "taskToolFailed",
	ModeChanged = "modeChanged",
	ProviderProfileChanged = "providerProfileChanged",
	EvalPass = "evalPass",
	EvalFail = "evalFail",
}
/**
 * RooCodeEvents
 */
export declare const rooCodeEventsSchema: z.ZodObject<
	{
		taskCreated: z.ZodTuple<[z.ZodString], null>
		taskStarted: z.ZodTuple<[z.ZodString], null>
		taskCompleted: z.ZodTuple<
			[
				z.ZodString,
				z.ZodObject<
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
				>,
				z.ZodRecord<
					z.ZodEnum<
						[
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
							"edit_file",
							"new_rule",
							"report_bug",
							"condense",
							"delete_file",
							"update_todo_list",
							"run_slash_command",
							"generate_image",
						]
					>,
					z.ZodObject<
						{
							attempts: z.ZodNumber
							failures: z.ZodNumber
						},
						"strip",
						z.ZodTypeAny,
						{
							attempts: number
							failures: number
						},
						{
							attempts: number
							failures: number
						}
					>
				>,
				z.ZodObject<
					{
						isSubtask: z.ZodBoolean
					},
					"strip",
					z.ZodTypeAny,
					{
						isSubtask: boolean
					},
					{
						isSubtask: boolean
					}
				>,
			],
			null
		>
		taskAborted: z.ZodTuple<[z.ZodString], null>
		taskFocused: z.ZodTuple<[z.ZodString], null>
		taskUnfocused: z.ZodTuple<[z.ZodString], null>
		taskActive: z.ZodTuple<[z.ZodString], null>
		taskInteractive: z.ZodTuple<[z.ZodString], null>
		taskResumable: z.ZodTuple<[z.ZodString], null>
		taskIdle: z.ZodTuple<[z.ZodString], null>
		taskPaused: z.ZodTuple<[z.ZodString], null>
		taskUnpaused: z.ZodTuple<[z.ZodString], null>
		taskSpawned: z.ZodTuple<[z.ZodString, z.ZodString], null>
		message: z.ZodTuple<
			[
				z.ZodObject<
					{
						taskId: z.ZodString
						action: z.ZodUnion<[z.ZodLiteral<"created">, z.ZodLiteral<"updated">]>
						message: z.ZodObject<
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
								apiProtocol: z.ZodOptional<
									z.ZodUnion<[z.ZodLiteral<"openai">, z.ZodLiteral<"anthropic">]>
								>
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
					},
					"strip",
					z.ZodTypeAny,
					{
						message: {
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
						taskId: string
						action: "created" | "updated"
					},
					{
						message: {
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
						taskId: string
						action: "created" | "updated"
					}
				>,
			],
			null
		>
		taskModeSwitched: z.ZodTuple<[z.ZodString, z.ZodString], null>
		taskAskResponded: z.ZodTuple<[z.ZodString], null>
		taskUserMessage: z.ZodTuple<[z.ZodString], null>
		taskToolFailed: z.ZodTuple<
			[
				z.ZodString,
				z.ZodEnum<
					[
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
						"edit_file",
						"new_rule",
						"report_bug",
						"condense",
						"delete_file",
						"update_todo_list",
						"run_slash_command",
						"generate_image",
					]
				>,
				z.ZodString,
			],
			null
		>
		taskTokenUsageUpdated: z.ZodTuple<
			[
				z.ZodString,
				z.ZodObject<
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
				>,
			],
			null
		>
		modeChanged: z.ZodTuple<[z.ZodString], null>
		providerProfileChanged: z.ZodTuple<
			[
				z.ZodObject<
					{
						name: z.ZodString
						provider: z.ZodString
					},
					"strip",
					z.ZodTypeAny,
					{
						provider: string
						name: string
					},
					{
						provider: string
						name: string
					}
				>,
			],
			null
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		taskCreated: [string]
		taskStarted: [string]
		taskCompleted: [
			string,
			{
				totalTokensIn: number
				totalTokensOut: number
				totalCost: number
				contextTokens: number
				totalCacheWrites?: number | undefined
				totalCacheReads?: number | undefined
			},
			Partial<
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
			>,
			{
				isSubtask: boolean
			},
		]
		taskAborted: [string]
		taskFocused: [string]
		taskUnfocused: [string]
		taskActive: [string]
		taskInteractive: [string]
		taskResumable: [string]
		taskIdle: [string]
		taskPaused: [string]
		taskUnpaused: [string]
		taskSpawned: [string, string]
		message: [
			{
				message: {
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
				taskId: string
				action: "created" | "updated"
			},
		]
		taskModeSwitched: [string, string]
		taskAskResponded: [string]
		taskUserMessage: [string]
		taskTokenUsageUpdated: [
			string,
			{
				totalTokensIn: number
				totalTokensOut: number
				totalCost: number
				contextTokens: number
				totalCacheWrites?: number | undefined
				totalCacheReads?: number | undefined
			},
		]
		taskToolFailed: [
			string,
			(
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
				| "generate_image"
			),
			string,
		]
		modeChanged: [string]
		providerProfileChanged: [
			{
				provider: string
				name: string
			},
		]
	},
	{
		taskCreated: [string]
		taskStarted: [string]
		taskCompleted: [
			string,
			{
				totalTokensIn: number
				totalTokensOut: number
				totalCost: number
				contextTokens: number
				totalCacheWrites?: number | undefined
				totalCacheReads?: number | undefined
			},
			Partial<
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
			>,
			{
				isSubtask: boolean
			},
		]
		taskAborted: [string]
		taskFocused: [string]
		taskUnfocused: [string]
		taskActive: [string]
		taskInteractive: [string]
		taskResumable: [string]
		taskIdle: [string]
		taskPaused: [string]
		taskUnpaused: [string]
		taskSpawned: [string, string]
		message: [
			{
				message: {
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
				taskId: string
				action: "created" | "updated"
			},
		]
		taskModeSwitched: [string, string]
		taskAskResponded: [string]
		taskUserMessage: [string]
		taskTokenUsageUpdated: [
			string,
			{
				totalTokensIn: number
				totalTokensOut: number
				totalCost: number
				contextTokens: number
				totalCacheWrites?: number | undefined
				totalCacheReads?: number | undefined
			},
		]
		taskToolFailed: [
			string,
			(
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
				| "generate_image"
			),
			string,
		]
		modeChanged: [string]
		providerProfileChanged: [
			{
				provider: string
				name: string
			},
		]
	}
>
export type RooCodeEvents = z.infer<typeof rooCodeEventsSchema>
/**
 * TaskEvent
 */
export declare const taskEventSchema: z.ZodDiscriminatedUnion<
	"eventName",
	[
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskCreated>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskCreated
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskCreated
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskStarted>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskStarted
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskStarted
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskCompleted>
				payload: z.ZodTuple<
					[
						z.ZodString,
						z.ZodObject<
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
						>,
						z.ZodRecord<
							z.ZodEnum<
								[
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
									"edit_file",
									"new_rule",
									"report_bug",
									"condense",
									"delete_file",
									"update_todo_list",
									"run_slash_command",
									"generate_image",
								]
							>,
							z.ZodObject<
								{
									attempts: z.ZodNumber
									failures: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									attempts: number
									failures: number
								},
								{
									attempts: number
									failures: number
								}
							>
						>,
						z.ZodObject<
							{
								isSubtask: z.ZodBoolean
							},
							"strip",
							z.ZodTypeAny,
							{
								isSubtask: boolean
							},
							{
								isSubtask: boolean
							}
						>,
					],
					null
				>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskCompleted
				payload: [
					string,
					{
						totalTokensIn: number
						totalTokensOut: number
						totalCost: number
						contextTokens: number
						totalCacheWrites?: number | undefined
						totalCacheReads?: number | undefined
					},
					Partial<
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
					>,
					{
						isSubtask: boolean
					},
				]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskCompleted
				payload: [
					string,
					{
						totalTokensIn: number
						totalTokensOut: number
						totalCost: number
						contextTokens: number
						totalCacheWrites?: number | undefined
						totalCacheReads?: number | undefined
					},
					Partial<
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
					>,
					{
						isSubtask: boolean
					},
				]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskAborted>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskAborted
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskAborted
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskFocused>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskFocused
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskFocused
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskUnfocused>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskUnfocused
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskUnfocused
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskActive>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskActive
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskActive
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskInteractive>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskInteractive
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskInteractive
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskResumable>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskResumable
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskResumable
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskIdle>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskIdle
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskIdle
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskPaused>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskPaused
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskPaused
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskUnpaused>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskUnpaused
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskUnpaused
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskSpawned>
				payload: z.ZodTuple<[z.ZodString, z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskSpawned
				payload: [string, string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskSpawned
				payload: [string, string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.Message>
				payload: z.ZodTuple<
					[
						z.ZodObject<
							{
								taskId: z.ZodString
								action: z.ZodUnion<[z.ZodLiteral<"created">, z.ZodLiteral<"updated">]>
								message: z.ZodObject<
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
										apiProtocol: z.ZodOptional<
											z.ZodUnion<[z.ZodLiteral<"openai">, z.ZodLiteral<"anthropic">]>
										>
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
							},
							"strip",
							z.ZodTypeAny,
							{
								message: {
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
								taskId: string
								action: "created" | "updated"
							},
							{
								message: {
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
								taskId: string
								action: "created" | "updated"
							}
						>,
					],
					null
				>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.Message
				payload: [
					{
						message: {
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
						taskId: string
						action: "created" | "updated"
					},
				]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.Message
				payload: [
					{
						message: {
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
						taskId: string
						action: "created" | "updated"
					},
				]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskModeSwitched>
				payload: z.ZodTuple<[z.ZodString, z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskModeSwitched
				payload: [string, string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskModeSwitched
				payload: [string, string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskAskResponded>
				payload: z.ZodTuple<[z.ZodString], null>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskAskResponded
				payload: [string]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskAskResponded
				payload: [string]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskToolFailed>
				payload: z.ZodTuple<
					[
						z.ZodString,
						z.ZodEnum<
							[
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
								"edit_file",
								"new_rule",
								"report_bug",
								"condense",
								"delete_file",
								"update_todo_list",
								"run_slash_command",
								"generate_image",
							]
						>,
						z.ZodString,
					],
					null
				>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskToolFailed
				payload: [
					string,
					(
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
						| "generate_image"
					),
					string,
				]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskToolFailed
				payload: [
					string,
					(
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
						| "generate_image"
					),
					string,
				]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.TaskTokenUsageUpdated>
				payload: z.ZodTuple<
					[
						z.ZodString,
						z.ZodObject<
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
						>,
					],
					null
				>
				taskId: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				eventName: RooCodeEventName.TaskTokenUsageUpdated
				payload: [
					string,
					{
						totalTokensIn: number
						totalTokensOut: number
						totalCost: number
						contextTokens: number
						totalCacheWrites?: number | undefined
						totalCacheReads?: number | undefined
					},
				]
				taskId?: number | undefined
			},
			{
				eventName: RooCodeEventName.TaskTokenUsageUpdated
				payload: [
					string,
					{
						totalTokensIn: number
						totalTokensOut: number
						totalCost: number
						contextTokens: number
						totalCacheWrites?: number | undefined
						totalCacheReads?: number | undefined
					},
				]
				taskId?: number | undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.EvalPass>
				payload: z.ZodUndefined
				taskId: z.ZodNumber
			},
			"strip",
			z.ZodTypeAny,
			{
				taskId: number
				eventName: RooCodeEventName.EvalPass
				payload?: undefined
			},
			{
				taskId: number
				eventName: RooCodeEventName.EvalPass
				payload?: undefined
			}
		>,
		z.ZodObject<
			{
				eventName: z.ZodLiteral<RooCodeEventName.EvalFail>
				payload: z.ZodUndefined
				taskId: z.ZodNumber
			},
			"strip",
			z.ZodTypeAny,
			{
				taskId: number
				eventName: RooCodeEventName.EvalFail
				payload?: undefined
			},
			{
				taskId: number
				eventName: RooCodeEventName.EvalFail
				payload?: undefined
			}
		>,
	]
>
export type TaskEvent = z.infer<typeof taskEventSchema>
//# sourceMappingURL=events.d.ts.map
