/**
 * UI-specific state atoms
 * These atoms manage the command-based UI state including messages, input, and autocomplete
 */
import type { CliMessage } from "../../types/cli.js"
import type { ExtensionChatMessage } from "../../types/messages.js"
import type {
	CommandSuggestion,
	ArgumentSuggestion,
	FileMentionSuggestion,
	FileMentionContext,
} from "../../services/autocomplete.js"
/**
 * Unified message type that can represent both CLI and extension messages
 */
export type UnifiedMessage =
	| {
			source: "cli"
			message: CliMessage
	  }
	| {
			source: "extension"
			message: ExtensionChatMessage
	  }
/**
 * Atom to hold the message history displayed in the UI
 */
export declare const messagesAtom: import("jotai").PrimitiveAtom<CliMessage[]> & {
	init: CliMessage[]
}
/**
 * Atom to track when messages have been reset/replaced
 * Increments each time replaceMessages is called to force Static component re-render
 */
export declare const refreshTerminalCounterAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
export declare const messageResetCounterAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Atom to track the cutoff timestamp for message display
 * Messages with timestamp <= this value will be hidden from display
 * Set to 0 to show all messages (default)
 * Set to Date.now() to hide all previous messages
 */
export declare const messageCutoffTimestampAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Atom to hold UI error messages
 */
export declare const errorAtom: import("jotai").PrimitiveAtom<string | null> & {
	init: string | null
}
/**
 * Atom to track when parallel mode is committing changes
 * Used to disable input and show "Committing your changes..." message
 */
export declare const isCommittingParallelModeAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Atom to track countdown timer for parallel mode commit (in seconds)
 * Starts at 60 and counts down to 0
 */
export declare const commitCountdownSecondsAtom: import("jotai").WritableAtom<
	number,
	[number | typeof import("jotai/utils").RESET | ((prev: number) => number | typeof import("jotai/utils").RESET)],
	void
> & {
	init: number
}
/**
 * Derived atom to check if the extension is currently streaming/processing
 * This mimics the webview's isStreaming logic from ChatView.tsx (lines 550-592)
 *
 * Returns true when:
 * - The last message is partial (still being streamed)
 * - There's an active API request that hasn't finished yet (no cost field)
 *
 * Returns false when:
 * - There's a tool currently asking for approval (waiting for user input)
 * - No messages exist
 * - All messages are complete
 */
export declare const isStreamingAtom: import("jotai").Atom<boolean>
/**
 * Input mode determines keyboard behavior
 */
export type InputMode = "normal" | "approval" | "autocomplete" | "followup" | "history" | "shell"
/**
 * Current input mode
 */
export declare const inputModeAtom: import("jotai").PrimitiveAtom<InputMode> & {
	init: InputMode
}
/**
 * Cursor position for multiline editing
 * Derived from the text buffer state
 */
export declare const cursorPositionAtom: import("jotai").Atom<{
	row: number
	col: number
}>
/**
 * Single selection index used by all modes (replaces multiple separate indexes)
 */
export declare const selectedIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Derived atom to control autocomplete menu visibility
 * Automatically shows when text starts with "/"
 */
export declare const showAutocompleteAtom: import("jotai").Atom<boolean>
/**
 * Atom to hold command suggestions for autocomplete
 */
export declare const suggestionsAtom: import("jotai").PrimitiveAtom<CommandSuggestion[]> & {
	init: CommandSuggestion[]
}
/**
 * Atom to hold argument suggestions for autocomplete
 */
export declare const argumentSuggestionsAtom: import("jotai").PrimitiveAtom<ArgumentSuggestion[]> & {
	init: ArgumentSuggestion[]
}
/**
 * Atom to hold file mention suggestions for autocomplete
 */
export declare const fileMentionSuggestionsAtom: import("jotai").PrimitiveAtom<FileMentionSuggestion[]> & {
	init: FileMentionSuggestion[]
}
/**
 * Atom to hold file mention context (when cursor is in @ mention)
 */
export declare const fileMentionContextAtom: import("jotai").PrimitiveAtom<FileMentionContext | null> & {
	init: FileMentionContext | null
}
/**
 * @deprecated Use selectedIndexAtom instead - this is now shared across all selection contexts
 * This atom is kept for backward compatibility but will be removed in a future version.
 */
export declare const selectedSuggestionIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Followup suggestion structure
 */
export interface FollowupSuggestion {
	answer: string
	mode?: string
}
/**
 * Atom to hold followup suggestions
 */
export declare const followupSuggestionsAtom: import("jotai").PrimitiveAtom<FollowupSuggestion[]> & {
	init: FollowupSuggestion[]
}
/**
 * Atom to control followup suggestions menu visibility
 */
export declare const showFollowupSuggestionsAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * @deprecated Use selectedIndexAtom instead - this is now shared across all selection contexts
 * This atom is kept for backward compatibility but will be removed in a future version.
 * Note: The new selectedIndexAtom starts at 0, but followup mode logic handles -1 for "no selection"
 */
export declare const selectedFollowupIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Derived atom to get the total count of suggestions (command, argument, or file mention)
 */
export declare const suggestionCountAtom: import("jotai").Atom<number>
/**
 * Derived atom to check if input is a command (starts with /)
 */
export declare const isCommandInputAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get the command query (input without the leading /)
 */
export declare const commandQueryAtom: import("jotai").Atom<string>
/**
 * Derived atom to check if there are any messages
 */
export declare const hasMessagesAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get the last message
 */
export declare const lastMessageAtom: import("jotai").Atom<CliMessage | null>
/**
 * Derived atom to get the last ask message from extension messages
 * Returns the most recent ask message that requires user approval, or null if none exists
 */
export declare const lastAskMessageAtom: import("jotai").Atom<{
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
} | null>
/**
 * Derived atom to check if there's an active error
 */
export declare const hasErrorAtom: import("jotai").Atom<boolean>
/**
 * Action atom to add a message to the history
 */
export declare const addMessageAtom: import("jotai").WritableAtom<null, [message: CliMessage], void> & {
	init: null
}
/**
 * Action atom to clear all messages
 */
export declare const clearMessagesAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to replace the entire message history
 * Increments the reset counter to force Static component re-render
 */
export declare const replaceMessagesAtom: import("jotai").WritableAtom<null, [messages: CliMessage[]], void> & {
	init: null
}
/**
 * Action atom to update the last message
 * Useful for streaming or partial updates
 */
export declare const updateLastMessageAtom: import("jotai").WritableAtom<null, [content: string], void> & {
	init: null
}
/**
 * Action atom to update the text buffer value
 */
export declare const updateTextBufferAtom: import("jotai").WritableAtom<null, [value: string], void> & {
	init: null
}
export declare const refreshTerminalAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to clear the text buffer
 */
export declare const clearTextBufferAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to set command suggestions
 */
export declare const setSuggestionsAtom: import("jotai").WritableAtom<
	null,
	[suggestions: CommandSuggestion[]],
	void
> & {
	init: null
}
/**
 * Action atom to set argument suggestions
 */
export declare const setArgumentSuggestionsAtom: import("jotai").WritableAtom<
	null,
	[suggestions: ArgumentSuggestion[]],
	void
> & {
	init: null
}
/**
 * Action atom to set file mention suggestions
 */
export declare const setFileMentionSuggestionsAtom: import("jotai").WritableAtom<
	null,
	[suggestions: FileMentionSuggestion[]],
	void
> & {
	init: null
}
/**
 * Action atom to set file mention context
 */
export declare const setFileMentionContextAtom: import("jotai").WritableAtom<
	null,
	[context: FileMentionContext | null],
	void
> & {
	init: null
}
/**
 * Action atom to clear file mention state
 */
export declare const clearFileMentionAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to select the next suggestion
 */
export declare const selectNextSuggestionAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to select the previous suggestion
 */
export declare const selectPreviousSuggestionAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to set an error message
 * Auto-clears after 5 seconds
 */
export declare const setErrorAtom: import("jotai").WritableAtom<null, [error: string | null], void> & {
	init: null
}
/**
 * Action atom to hide autocomplete by clearing the text buffer
 * Note: Autocomplete visibility is now derived from text buffer content
 * @deprecated This atom is kept for backward compatibility but may be removed
 */
export declare const hideAutocompleteAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to show autocomplete
 * Note: Autocomplete visibility is now automatically derived from text buffer
 * This atom is kept for backward compatibility but has no effect
 * @deprecated This atom is kept for backward compatibility but may be removed
 */
export declare const showAutocompleteMenuAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to get the currently selected suggestion
 */
export declare const getSelectedSuggestionAtom: import("jotai").Atom<
	ArgumentSuggestion | CommandSuggestion | FileMentionSuggestion | null
>
/**
 * Derived atom that merges CLI messages and extension messages chronologically
 * This provides a unified view of all messages for display
 * Filters out messages before the cutoff timestamp
 */
export declare const mergedMessagesAtom: import("jotai").Atom<UnifiedMessage[]>
/**
 * Action atom to set followup suggestions
 */
export declare const setFollowupSuggestionsAtom: import("jotai").WritableAtom<
	null,
	[suggestions: FollowupSuggestion[]],
	void
> & {
	init: null
}
/**
 * Action atom to clear followup suggestions
 */
export declare const clearFollowupSuggestionsAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to select the next followup suggestion
 * Special behavior: if at last item, unselect (set to -1)
 */
export declare const selectNextFollowupAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to select the previous followup suggestion
 * Special behavior: if at index 0, unselect (set to -1)
 */
export declare const selectPreviousFollowupAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to unselect followup suggestion
 */
export declare const unselectFollowupAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Derived atom to get the currently selected followup suggestion
 */
export declare const getSelectedFollowupAtom: import("jotai").Atom<FollowupSuggestion | null>
/**
 * Derived atom to check if followup suggestions are active
 */
export declare const hasFollowupSuggestionsAtom: import("jotai").Atom<boolean>
/**
 * Action atom to set the message cutoff timestamp
 * Messages with timestamp <= this value will be hidden from display
 */
export declare const setMessageCutoffTimestampAtom: import("jotai").WritableAtom<null, [timestamp: number], void> & {
	init: null
}
/**
 * Action atom to reset the message cutoff timestamp to 0 (show all messages)
 */
export declare const resetMessageCutoffAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Derived atom that splits messages into static (complete) and dynamic (incomplete)
 * This enables Ink Static optimization by separating messages that won't change
 * from those that are still being updated
 */
export declare const splitMessagesAtom: import("jotai").Atom<{
	staticMessages: UnifiedMessage[]
	dynamicMessages: UnifiedMessage[]
}>
/**
 * Derived atom for static messages (complete, ready for static rendering)
 * These messages won't change and can be rendered once without re-rendering
 */
export declare const staticMessagesAtom: import("jotai").Atom<UnifiedMessage[]>
/**
 * Derived atom for dynamic messages (incomplete, need active rendering)
 * These messages may still be updating and need to be re-rendered
 */
export declare const dynamicMessagesAtom: import("jotai").Atom<UnifiedMessage[]>
//# sourceMappingURL=ui.d.ts.map
