/**
 * Approval option interface
 */
export interface ApprovalOption {
	label: string
	action: "approve" | "reject" | "approve-and-remember"
	hotkey: string
	color: "green" | "red"
	/** Command pattern to remember (for approve-and-remember action) */
	commandPattern?: string
	/** Unique key for React rendering (combines action + pattern) */
	key?: string
}
/**
 * Approval processing state to track ongoing operations
 */
interface ApprovalProcessingState {
	/** Whether an approval/rejection is currently being processed */
	isProcessing: boolean
	/** Timestamp of the message being processed */
	processingTs?: number
	/** Type of operation being processed */
	operation?: "approve" | "reject"
}
/**
 * Atom to hold the message currently awaiting approval
 */
export declare const pendingApprovalAtom: import("jotai").PrimitiveAtom<{
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
} | null> & {
	init: {
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
	} | null
}
/**
 * Atom to track approval processing state (prevents duplicate operations)
 */
export declare const approvalProcessingAtom: import("jotai").PrimitiveAtom<ApprovalProcessingState> & {
	init: ApprovalProcessingState
}
/**
 * @deprecated Use selectedIndexAtom from ui.ts instead
 */
export declare const selectedApprovalIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Atom to track when approval was set (for delay logic)
 */
export declare const approvalSetTimestampAtom: import("jotai").PrimitiveAtom<number | null> & {
	init: number | null
}
/**
 * Derived atom to check if there's a pending approval
 */
export declare const isApprovalPendingAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get approval options based on the pending message type
 * Note: This atom recalculates whenever the pending message changes OR when
 * the message text/partial status changes (for streaming messages)
 */
export declare const approvalOptionsAtom: import("jotai").Atom<ApprovalOption[]>
/**
 * Action atom to set the pending approval message
 * This is an atomic operation that ensures proper state transitions
 */
export declare const setPendingApprovalAtom: import("jotai").WritableAtom<
	null,
	[
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
		} | null,
	],
	void
> & {
	init: null
}
/**
 * Action atom to clear the pending approval
 * This is an atomic operation that ensures proper cleanup
 */
export declare const clearPendingApprovalAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to start processing an approval/rejection
 * This prevents duplicate operations by marking the message as being processed
 */
export declare const startApprovalProcessingAtom: import("jotai").WritableAtom<
	null,
	[operation: "reject" | "approve"],
	boolean
> & {
	init: null
}
/**
 * Action atom to complete approval/rejection processing
 * This clears both the pending approval and processing state atomically
 */
export declare const completeApprovalProcessingAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to select the next approval option
 */
export declare const selectNextApprovalAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to select the previous approval option
 */
export declare const selectPreviousApprovalAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Derived atom to get the currently selected approval option
 */
export declare const selectedApprovalOptionAtom: import("jotai").Atom<ApprovalOption | null>
/**
 * Atom to store the approve callback
 * The hook sets this to its approve function
 */
export declare const approveCallbackAtom: import("jotai").PrimitiveAtom<(() => Promise<void>) | null> & {
	init: (() => Promise<void>) | null
}
/**
 * Atom to store the reject callback
 * The hook sets this to its reject function
 */
export declare const rejectCallbackAtom: import("jotai").PrimitiveAtom<(() => Promise<void>) | null> & {
	init: (() => Promise<void>) | null
}
/**
 * Atom to store the executeSelected callback
 * The hook sets this to its executeSelected function
 */
export declare const executeSelectedCallbackAtom: import("jotai").PrimitiveAtom<(() => Promise<void>) | null> & {
	init: (() => Promise<void>) | null
}
/**
 * Atom to store the sendTerminalOperation callback
 * The hook sets this to its sendTerminalOperation function
 */
export declare const sendTerminalOperationCallbackAtom: import("jotai").PrimitiveAtom<
	((operation: "continue" | "abort") => Promise<void>) | null
> & {
	init: ((operation: "continue" | "abort") => Promise<void>) | null
}
/**
 * Action atom to approve the pending request
 * Calls the callback set by the hook
 */
export declare const approveAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to reject the pending request
 * Calls the callback set by the hook
 */
export declare const rejectAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to execute the currently selected option
 * Calls the callback set by the hook
 */
export declare const executeSelectedAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to send terminal operation (continue or abort)
 * Calls the callback set by the hook
 */
export declare const sendTerminalOperationAtom: import("jotai").WritableAtom<
	null,
	[operation: "continue" | "abort"],
	Promise<void>
> & {
	init: null
}
export {}
//# sourceMappingURL=approval.d.ts.map
