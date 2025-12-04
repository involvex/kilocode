import * as vscode from "vscode"
import { IDE } from "../../../"
export declare enum HandlerPriority {
	CRITICAL = 5,
	HIGH = 4,
	NORMAL = 3,
	LOW = 2,
	FALLBACK = 1,
}
interface StateSnapshot {
	nextEditWindowAccepted: boolean
	jumpInProgress: boolean
	jumpJustAccepted: boolean
	lastDocumentChangeTime: number
	isTypingSession: boolean
	document?: vscode.TextDocument
	cursorPosition?: vscode.Position
}
type SelectionChangeHandler = (e: vscode.TextEditorSelectionChangeEvent, state: StateSnapshot) => Promise<boolean>
/**
 * SelectionChangeManager handles cursor movement events in a coordinated way
 * to prevent race conditions and ensure consistent behavior across features.
 *
 * Case 1: User just moves the cursor around.
 * - vscode fires onDidChangeTextEditorSelection.
 * - State is captured. All fields in StateSnapshot are false.
 * - All registered handlers return false.
 * - Fallback handler runs, deleting the chain.
 *
 * Case 2: User accepts a next edit suggestion from a window.
 * - vscode fires onDidChangeTextEditorSelection.
 * - State is captured. nextEditWindowAccepted is true.
 * - NextEditWindowManager's handler returns true.
 * - No other handlers run, and edit chain is preserved.
 *
 * Case 3: User accepts a next edit suggestion from a ghost text.
 * - vscode fires onDidChangeTextEditorSelection.
 * - State is captured with document and cursorPosition.
 * - GhostTextTracker's handler checks if ghost text was accepted at that position.
 * - If accepted, handler returns true and edit chain is preserved.
 *
 * Case 4: User is actively typing code.
 * - Each keystroke triggers documentChanged() to update lastDocumentChangeTime.
 * - When cursor moves due to typing, onDidChangeTextEditorSelection fires.
 * - State is captured with isTypingSession=true and recent lastDocumentChangeTime.
 * - Typing session handler detects time since last edit is < TYPING_DELAY.
 * - Handler returns true, preserving the edit chain during typing.
 *
 * Case 5: User performs a jump operation.
 * - Jump is initiated, setting jumpInProgress to true.
 * - When cursor position changes due to jump, onDidChangeTextEditorSelection fires.
 * - State is captured with jumpInProgress=true.
 * - JumpManager's handler returns true, preserving the edit chain.
 *
 * Case 6: User just completed a jump operation.
 * - Jump completes, setting jumpJustAccepted to true.
 * - onDidChangeTextEditorSelection fires for the final position.
 * - State is captured with jumpJustAccepted=true.
 * - JumpManager's handler returns true, preserving the edit chain.
 *
 * Case 7: Rapid cursor movements (debouncing).
 * - User rapidly moves cursor (e.g., holding an arrow key).
 * - Multiple onDidChangeTextEditorSelection events fire in quick succession.
 * - Events within DEBOUNCE_DELAY of each other are queued.
 * - Only the most recent event in a rapid sequence gets processed.
 * - Prevents performance issues from too many events.
 *
 * Case 8: Event processing timeout.
 * - An event handler takes longer than PROCESSING_TIMEOUT.
 * - The timeout promise resolves first, throwing an error.
 * - Error is caught, processing state is reset to prevent deadlocks.
 * - System can continue processing the next event.
 * - NOTE: At the current moment, there should not be any deadlocks, but I'm just making sure.
 *
 * Case 9: Error in handler.
 * - One of the handlers throws an exception.
 * - The error is caught and logged.
 * - Processing continues with the next handler rather than failing completely.
 * - Ensures stability even when individual handlers have problems.
 *
 * Case 10: Multiple queued events.
 * - An event is being processed when new events arrive.
 * - New events are added to eventQueue.
 * - After current event is processed, queued events are handled sequentially.
 * - Ensures all events are processed in the order they were received.
 * - NOTE: I'm not sure if we even want to queue these events...
 *
 * Case n: Other cases that I didn't catch.
 */
export declare class SelectionChangeManager {
	private static instance
	private listeners
	private ide
	private usingFullFileDiff
	private eventQueue
	private lastEventTime
	private isProcessingEvent
	private processingTimeout
	private readonly DEBOUNCE_DELAY
	private readonly PROCESSING_TIMEOUT
	private isTypingSession
	private typingTimer
	private lastDocumentChangeTime
	private readonly TYPING_SESSION_TIMEOUT
	private constructor()
	static getInstance(): SelectionChangeManager
	initialize(ide: IDE, usingFullFileDiff: boolean): void
	/**
	 * Updates this class's usingFullFileDiff flag.
	 * @param usingFullFileDiff New value to set.
	 */
	updateUsingFullFileDiff(usingFullFileDiff: boolean): void
	documentChanged(): void
	private resetTypingSession
	/**
	 * Register a listener for the selection change event.
	 * @param id Unique id for this handler.
	 * @param handler Function to handle the event.
	 * @param priority Higher priority runs first.
	 * @returns Function to unregister this listener.
	 */
	registerListener(id: string, handler: SelectionChangeHandler, priority?: HandlerPriority): () => void
	/**
	 * Handle a given selection change event.
	 * @param e THe selection change event.
	 */
	handleSelectionChange(e: vscode.TextEditorSelectionChangeEvent): Promise<void>
	/**
	 * Process a given event with a timeout.
	 * This is in attempt to prevent deadlocks between events.
	 * @param e The selection change event.
	 */
	private processEventWithTimeout
	/**
	 * Core event processing logic.
	 * @param e The selection change event.
	 */
	private processEvent
	private captureState
	private defaultFallbackHandler
}
export {}
//# sourceMappingURL=SelectionChangeManager.d.ts.map
