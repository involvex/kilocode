/**
 * UI-specific state atoms
 * These atoms manage the command-based UI state including messages, input, and autocomplete
 */
import { atom } from "jotai"
import { atomWithReset } from "jotai/utils"
import { chatMessagesAtom } from "./extension.js"
import { splitMessages } from "../../ui/messages/utils/messageCompletion.js"
import { textBufferStringAtom, textBufferCursorAtom, setTextAtom, clearTextAtom } from "./textBuffer.js"
import { commitCompletionTimeout } from "../../parallel/parallel.js"
// ============================================================================
// Core UI State Atoms
// ============================================================================
/**
 * Atom to hold the message history displayed in the UI
 */
export const messagesAtom = atom([])
/**
 * Atom to track when messages have been reset/replaced
 * Increments each time replaceMessages is called to force Static component re-render
 */
export const refreshTerminalCounterAtom = atom(0)
export const messageResetCounterAtom = atom(0)
/**
 * Atom to track the cutoff timestamp for message display
 * Messages with timestamp <= this value will be hidden from display
 * Set to 0 to show all messages (default)
 * Set to Date.now() to hide all previous messages
 */
export const messageCutoffTimestampAtom = atom(0)
/**
 * Atom to hold UI error messages
 */
export const errorAtom = atom(null)
/**
 * Atom to track when parallel mode is committing changes
 * Used to disable input and show "Committing your changes..." message
 */
export const isCommittingParallelModeAtom = atom(false)
/**
 * Atom to track countdown timer for parallel mode commit (in seconds)
 * Starts at 60 and counts down to 0
 */
export const commitCountdownSecondsAtom = atomWithReset(commitCompletionTimeout / 1000)
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
export const isStreamingAtom = atom((get) => {
	const messages = get(chatMessagesAtom)
	if (messages.length === 0) {
		return false
	}
	const lastMessage = messages[messages.length - 1]
	if (!lastMessage) {
		return false
	}
	// Check if there's a tool currently asking for approval
	// If so, we're not streaming - we're waiting for user input
	const isLastAsk = lastMessage.type === "ask"
	if (isLastAsk && lastMessage.ask === "tool") {
		// Tool is asking for approval, not streaming
		return false
	}
	// Check if the last message is partial (still streaming)
	if (lastMessage.partial === true) {
		return true
	}
	// Check if there's an active API request without a cost (not finished)
	// Find the last api_req_started message
	for (let i = messages.length - 1; i >= 0; i--) {
		const msg = messages[i]
		if (msg?.say === "api_req_started") {
			try {
				const data = JSON.parse(msg.text || "{}")
				// If cost is undefined, the API request hasn't finished yet
				if (data.cost === undefined) {
					return true
				}
			} catch {
				// If we can't parse, assume not streaming
				return false
			}
			// Found an api_req_started with cost, so it's finished
			break
		}
	}
	return false
})
/**
 * Current input mode
 */
export const inputModeAtom = atom("normal")
/**
 * Cursor position for multiline editing
 * Derived from the text buffer state
 */
export const cursorPositionAtom = atom((get) => {
	const cursor = get(textBufferCursorAtom)
	return { row: cursor.row, col: cursor.column }
})
/**
 * Single selection index used by all modes (replaces multiple separate indexes)
 */
export const selectedIndexAtom = atom(0)
// ============================================================================
// Autocomplete State Atoms
// ============================================================================
/**
 * Derived atom to control autocomplete menu visibility
 * Automatically shows when text starts with "/"
 */
export const showAutocompleteAtom = atom((get) => {
	const text = get(textBufferStringAtom)
	return text.startsWith("/")
})
/**
 * Atom to hold command suggestions for autocomplete
 */
export const suggestionsAtom = atom([])
/**
 * Atom to hold argument suggestions for autocomplete
 */
export const argumentSuggestionsAtom = atom([])
/**
 * Atom to hold file mention suggestions for autocomplete
 */
export const fileMentionSuggestionsAtom = atom([])
/**
 * Atom to hold file mention context (when cursor is in @ mention)
 */
export const fileMentionContextAtom = atom(null)
/**
 * @deprecated Use selectedIndexAtom instead - this is now shared across all selection contexts
 * This atom is kept for backward compatibility but will be removed in a future version.
 */
export const selectedSuggestionIndexAtom = selectedIndexAtom
/**
 * Atom to hold followup suggestions
 */
export const followupSuggestionsAtom = atom([])
/**
 * Atom to control followup suggestions menu visibility
 */
export const showFollowupSuggestionsAtom = atom(false)
/**
 * @deprecated Use selectedIndexAtom instead - this is now shared across all selection contexts
 * This atom is kept for backward compatibility but will be removed in a future version.
 * Note: The new selectedIndexAtom starts at 0, but followup mode logic handles -1 for "no selection"
 */
export const selectedFollowupIndexAtom = selectedIndexAtom
// ============================================================================
// Derived Atoms
// ============================================================================
/**
 * Derived atom to get the total count of suggestions (command, argument, or file mention)
 */
export const suggestionCountAtom = atom((get) => {
	const commandSuggestions = get(suggestionsAtom)
	const argumentSuggestions = get(argumentSuggestionsAtom)
	const fileMentionSuggestions = get(fileMentionSuggestionsAtom)
	if (fileMentionSuggestions.length > 0) return fileMentionSuggestions.length
	if (commandSuggestions.length > 0) return commandSuggestions.length
	return argumentSuggestions.length
})
/**
 * Derived atom to check if input is a command (starts with /)
 */
export const isCommandInputAtom = atom((get) => {
	const input = get(textBufferStringAtom)
	return input.startsWith("/")
})
/**
 * Derived atom to get the command query (input without the leading /)
 */
export const commandQueryAtom = atom((get) => {
	const input = get(textBufferStringAtom)
	return get(isCommandInputAtom) ? input.slice(1) : ""
})
/**
 * Derived atom to check if there are any messages
 */
export const hasMessagesAtom = atom((get) => {
	const messages = get(messagesAtom)
	return messages.length > 0
})
/**
 * Derived atom to get the last message
 */
export const lastMessageAtom = atom((get) => {
	const messages = get(messagesAtom)
	return messages.length > 0 ? (messages[messages.length - 1] ?? null) : null
})
/**
 * Derived atom to get the last ask message from extension messages
 * Returns the most recent ask message that requires user approval, or null if none exists
 */
export const lastAskMessageAtom = atom((get) => {
	const messages = get(chatMessagesAtom)
	// Ask types that require user approval
	const approvalAskTypes = [
		"tool",
		"command",
		"command_output",
		"browser_action_launch",
		"use_mcp_server",
		"payment_required_prompt",
		"checkpoint_restore",
	]
	const lastMessage = messages[messages.length - 1]
	if (
		lastMessage &&
		lastMessage.type === "ask" &&
		!lastMessage.isAnswered &&
		lastMessage.ask &&
		approvalAskTypes.includes(lastMessage.ask)
	) {
		// command_output asks can be partial (while command is running)
		// All other asks must be complete (not partial) to show approval
		if (lastMessage.ask === "command_output" || !lastMessage.partial) {
			return lastMessage
		}
	}
	return null
})
/**
 * Derived atom to check if there's an active error
 */
export const hasErrorAtom = atom((get) => {
	return get(errorAtom) !== null
})
// ============================================================================
// Action Atoms
// ============================================================================
/**
 * Action atom to add a message to the history
 */
export const addMessageAtom = atom(null, (get, set, message) => {
	const messages = get(messagesAtom)
	set(messagesAtom, [...messages, message])
})
/**
 * Action atom to clear all messages
 */
export const clearMessagesAtom = atom(null, (get, set) => {
	set(messagesAtom, [])
})
/**
 * Action atom to replace the entire message history
 * Increments the reset counter to force Static component re-render
 */
export const replaceMessagesAtom = atom(null, (get, set, messages) => {
	set(messageCutoffTimestampAtom, 0)
	set(messagesAtom, messages)
})
/**
 * Action atom to update the last message
 * Useful for streaming or partial updates
 */
export const updateLastMessageAtom = atom(null, (get, set, content) => {
	const messages = get(messagesAtom)
	if (messages.length === 0) return
	const lastMessage = messages[messages.length - 1]
	if (!lastMessage) return
	const updatedMessage = {
		id: lastMessage.id,
		type: lastMessage.type,
		ts: lastMessage.ts,
		content,
		partial: false,
	}
	const updatedMessages = [...messages.slice(0, -1), updatedMessage]
	set(messagesAtom, updatedMessages)
})
/**
 * Action atom to update the text buffer value
 */
export const updateTextBufferAtom = atom(null, (get, set, value) => {
	set(setTextAtom, value)
	// Reset selected index when input is a command
	const isCommand = value.startsWith("/")
	if (isCommand) {
		set(selectedIndexAtom, 0)
	}
})
export const refreshTerminalAtom = atom(null, (get, set) => {
	set(refreshTerminalCounterAtom, (prev) => prev + 1)
})
/**
 * Action atom to clear the text buffer
 */
export const clearTextBufferAtom = atom(null, (get, set) => {
	set(clearTextAtom)
	set(selectedIndexAtom, 0)
})
/**
 * Action atom to set command suggestions
 */
export const setSuggestionsAtom = atom(null, (get, set, suggestions) => {
	set(suggestionsAtom, suggestions)
	if (suggestions.length === 0) {
		set(selectedIndexAtom, -1)
	} else {
		set(selectedIndexAtom, 0)
	}
})
/**
 * Action atom to set argument suggestions
 */
export const setArgumentSuggestionsAtom = atom(null, (get, set, suggestions) => {
	set(argumentSuggestionsAtom, suggestions)
	if (suggestions.length === 0) {
		set(selectedIndexAtom, -1)
	} else {
		set(selectedIndexAtom, 0)
	}
})
/**
 * Action atom to set file mention suggestions
 */
export const setFileMentionSuggestionsAtom = atom(null, (get, set, suggestions) => {
	set(fileMentionSuggestionsAtom, suggestions)
	if (suggestions.length === 0) {
		set(selectedIndexAtom, -1)
	} else {
		set(selectedIndexAtom, 0)
	}
})
/**
 * Action atom to set file mention context
 */
export const setFileMentionContextAtom = atom(null, (get, set, context) => {
	set(fileMentionContextAtom, context)
})
/**
 * Action atom to clear file mention state
 */
export const clearFileMentionAtom = atom(null, (get, set) => {
	set(fileMentionSuggestionsAtom, [])
	set(fileMentionContextAtom, null)
})
/**
 * Action atom to select the next suggestion
 */
export const selectNextSuggestionAtom = atom(null, (get, set) => {
	const count = get(suggestionCountAtom)
	if (count === 0) return
	const currentIndex = get(selectedIndexAtom)
	const nextIndex = (currentIndex + 1) % count
	set(selectedIndexAtom, nextIndex)
})
/**
 * Action atom to select the previous suggestion
 */
export const selectPreviousSuggestionAtom = atom(null, (get, set) => {
	const count = get(suggestionCountAtom)
	if (count === 0) return
	const currentIndex = get(selectedIndexAtom)
	const prevIndex = currentIndex === 0 ? count - 1 : currentIndex - 1
	set(selectedIndexAtom, prevIndex)
})
/**
 * Action atom to set an error message
 * Auto-clears after 5 seconds
 */
export const setErrorAtom = atom(null, (get, set, error) => {
	set(errorAtom, error)
	// Auto-clear error after 5 seconds
	if (error) {
		setTimeout(() => {
			set(errorAtom, null)
		}, 5000)
	}
})
/**
 * Action atom to hide autocomplete by clearing the text buffer
 * Note: Autocomplete visibility is now derived from text buffer content
 * @deprecated This atom is kept for backward compatibility but may be removed
 */
export const hideAutocompleteAtom = atom(null, (get, set) => {
	set(clearTextAtom)
	set(selectedIndexAtom, 0)
})
/**
 * Action atom to show autocomplete
 * Note: Autocomplete visibility is now automatically derived from text buffer
 * This atom is kept for backward compatibility but has no effect
 * @deprecated This atom is kept for backward compatibility but may be removed
 */
export const showAutocompleteMenuAtom = atom(null, (_get, _set) => {
	// No-op: autocomplete visibility is now derived from text buffer
	// Kept for backward compatibility
})
/**
 * Action atom to get the currently selected suggestion
 */
export const getSelectedSuggestionAtom = atom((get) => {
	const commandSuggestions = get(suggestionsAtom)
	const argumentSuggestions = get(argumentSuggestionsAtom)
	const fileMentionSuggestions = get(fileMentionSuggestionsAtom)
	const selectedIndex = get(selectedIndexAtom)
	if (fileMentionSuggestions.length > 0) {
		return fileMentionSuggestions[selectedIndex] ?? null
	}
	if (commandSuggestions.length > 0) {
		return commandSuggestions[selectedIndex] ?? null
	}
	if (argumentSuggestions.length > 0) {
		return argumentSuggestions[selectedIndex] ?? null
	}
	return null
})
/**
 * Derived atom that merges CLI messages and extension messages chronologically
 * This provides a unified view of all messages for display
 * Filters out messages before the cutoff timestamp
 */
export const mergedMessagesAtom = atom((get) => {
	const cliMessages = get(messagesAtom)
	const extensionMessages = get(chatMessagesAtom)
	const cutoffTimestamp = get(messageCutoffTimestampAtom)
	// Convert to unified format
	const unified = [
		...cliMessages.map((msg) => ({ source: "cli", message: msg })),
		...extensionMessages.map((msg) => ({ source: "extension", message: msg })),
	]
	// Sort chronologically by timestamp
	const sorted = unified.sort((a, b) => {
		return a.message.ts - b.message.ts
	})
	// Filter out messages before the cutoff timestamp
	const filtered = sorted.filter((msg) => msg.message.ts > cutoffTimestamp)
	return filtered
})
// ============================================================================
// Followup Suggestions Action Atoms
// ============================================================================
/**
 * Action atom to set followup suggestions
 */
export const setFollowupSuggestionsAtom = atom(null, (get, set, suggestions) => {
	set(followupSuggestionsAtom, suggestions)
	set(showFollowupSuggestionsAtom, suggestions.length > 0)
	// Start with no selection (-1) so user can type custom response
	set(selectedIndexAtom, -1)
})
/**
 * Action atom to clear followup suggestions
 */
export const clearFollowupSuggestionsAtom = atom(null, (get, set) => {
	set(followupSuggestionsAtom, [])
	set(showFollowupSuggestionsAtom, false)
	set(selectedIndexAtom, -1)
})
/**
 * Action atom to select the next followup suggestion
 * Special behavior: if at last item, unselect (set to -1)
 */
export const selectNextFollowupAtom = atom(null, (get, set) => {
	const suggestions = get(followupSuggestionsAtom)
	if (suggestions.length === 0) return
	const currentIndex = get(selectedIndexAtom)
	// If no selection (-1), start at 0
	if (currentIndex === -1) {
		set(selectedIndexAtom, 0)
		return
	}
	// If at last item, unselect
	if (currentIndex === suggestions.length - 1) {
		set(selectedIndexAtom, -1)
		return
	}
	// Otherwise, move to next
	set(selectedIndexAtom, currentIndex + 1)
})
/**
 * Action atom to select the previous followup suggestion
 * Special behavior: if at index 0, unselect (set to -1)
 */
export const selectPreviousFollowupAtom = atom(null, (get, set) => {
	const suggestions = get(followupSuggestionsAtom)
	if (suggestions.length === 0) return
	const currentIndex = get(selectedIndexAtom)
	// If at first item (0), unselect
	if (currentIndex === 0) {
		set(selectedIndexAtom, -1)
		return
	}
	// If no selection (-1), go to last item
	if (currentIndex === -1) {
		set(selectedIndexAtom, suggestions.length - 1)
		return
	}
	// Otherwise, move to previous
	set(selectedIndexAtom, currentIndex - 1)
})
/**
 * Action atom to unselect followup suggestion
 */
export const unselectFollowupAtom = atom(null, (get, set) => {
	set(selectedIndexAtom, -1)
})
/**
 * Derived atom to get the currently selected followup suggestion
 */
export const getSelectedFollowupAtom = atom((get) => {
	const suggestions = get(followupSuggestionsAtom)
	const selectedIndex = get(selectedIndexAtom)
	if (selectedIndex === -1 || selectedIndex >= suggestions.length) {
		return null
	}
	return suggestions[selectedIndex] ?? null
})
/**
 * Derived atom to check if followup suggestions are active
 */
export const hasFollowupSuggestionsAtom = atom((get) => {
	return get(followupSuggestionsAtom).length > 0
})
/**
 * Action atom to set the message cutoff timestamp
 * Messages with timestamp <= this value will be hidden from display
 */
export const setMessageCutoffTimestampAtom = atom(null, (get, set, timestamp) => {
	set(messageCutoffTimestampAtom, timestamp)
})
/**
 * Action atom to reset the message cutoff timestamp to 0 (show all messages)
 */
export const resetMessageCutoffAtom = atom(null, (get, set) => {
	set(messageCutoffTimestampAtom, 0)
})
// ============================================================================
// Message Splitting Atoms (for Ink Static optimization)
// ============================================================================
/**
 * Derived atom that splits messages into static (complete) and dynamic (incomplete)
 * This enables Ink Static optimization by separating messages that won't change
 * from those that are still being updated
 */
export const splitMessagesAtom = atom((get) => {
	const allMessages = get(mergedMessagesAtom)
	return splitMessages(allMessages)
})
/**
 * Derived atom for static messages (complete, ready for static rendering)
 * These messages won't change and can be rendered once without re-rendering
 */
export const staticMessagesAtom = atom((get) => {
	const { staticMessages } = get(splitMessagesAtom)
	return staticMessages
})
/**
 * Derived atom for dynamic messages (incomplete, need active rendering)
 * These messages may still be updating and need to be re-rendered
 */
export const dynamicMessagesAtom = atom((get) => {
	const { dynamicMessages } = get(splitMessagesAtom)
	return dynamicMessages
})
