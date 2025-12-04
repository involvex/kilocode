/**
 * Jotai atoms for centralized keyboard event state management
 */
import type { Key, KeypressHandler } from "../../types/keyboard.js"
import {
	shellModeActiveAtom,
	toggleShellModeAtom,
	navigateShellHistoryUpAtom,
	navigateShellHistoryDownAtom,
	executeShellCommandAtom,
} from "./shell.js"
export {
	shellModeActiveAtom,
	toggleShellModeAtom,
	navigateShellHistoryUpAtom,
	navigateShellHistoryDownAtom,
	executeShellCommandAtom,
}
/**
 * Set of all active keyboard event subscribers
 */
export declare const keyboardSubscribersAtom: import("jotai").PrimitiveAtom<Set<KeypressHandler>> & {
	init: Set<KeypressHandler>
}
/**
 * Whether raw mode is currently enabled for stdin
 */
export declare const rawModeEnabledAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Whether Kitty keyboard protocol is enabled
 */
export declare const kittyProtocolEnabledAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Debug mode for logging keystrokes
 */
export declare const debugKeystrokeLoggingAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Buffer for accumulating pasted text
 */
export declare const pasteBufferAtom: import("jotai").PrimitiveAtom<string> & {
	init: string
}
/**
 * Buffer for incomplete Kitty protocol sequences
 */
export declare const kittySequenceBufferAtom: import("jotai").PrimitiveAtom<string> & {
	init: string
}
/**
 * Buffer for detecting backslash+enter combination
 */
export declare const backslashBufferAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Whether we're currently in paste mode (between paste brackets)
 */
export declare const isPasteModeAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Whether we're waiting for Enter after backslash
 */
export declare const waitingForEnterAfterBackslashAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * The most recent key event (for debugging/display)
 */
export declare const currentKeyEventAtom: import("jotai").PrimitiveAtom<Key | null> & {
	init: Key | null
}
/**
 * History of recent key events (for debugging)
 */
export declare const keyEventHistoryAtom: import("jotai").PrimitiveAtom<Key[]> & {
	init: Key[]
}
/**
 * Maximum number of key events to keep in history
 */
export declare const MAX_KEY_EVENT_HISTORY = 50
/**
 * Number of active subscribers
 */
export declare const subscriberCountAtom: import("jotai").Atom<number>
/**
 * Whether any subscribers are active
 */
export declare const hasSubscribersAtom: import("jotai").Atom<boolean>
/**
 * Subscribe to keypress events
 * Returns an unsubscribe function
 */
export declare const subscribeToKeyboardAtom: import("jotai").WritableAtom<
	null,
	[handler: KeypressHandler],
	() => void
> & {
	init: null
}
/**
 * Unsubscribe from keypress events
 */
export declare const unsubscribeFromKeyboardAtom: import("jotai").WritableAtom<
	null,
	[handler: KeypressHandler],
	void
> & {
	init: null
}
/**
 * Broadcast a key event to all subscribers
 */
export declare const broadcastKeyEventAtom: import("jotai").WritableAtom<null, [key: Key], void> & {
	init: null
}
/**
 * Clear all keypress buffers
 */
export declare const clearBuffersAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Set paste mode
 */
export declare const setPasteModeAtom: import("jotai").WritableAtom<null, [isPaste: boolean], void> & {
	init: null
}
/**
 * Append to paste buffer
 */
export declare const appendToPasteBufferAtom: import("jotai").WritableAtom<null, [text: string], void> & {
	init: null
}
/**
 * Append to Kitty sequence buffer
 */
export declare const appendToKittyBufferAtom: import("jotai").WritableAtom<null, [text: string], void> & {
	init: null
}
/**
 * Clear Kitty sequence buffer
 */
export declare const clearKittyBufferAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Clear key event history
 */
export declare const clearKeyEventHistoryAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Enable/disable debug logging
 */
export declare const setDebugLoggingAtom: import("jotai").WritableAtom<null, [enabled: boolean], void> & {
	init: null
}
/**
 * Enable/disable Kitty protocol
 */
export declare const setKittyProtocolAtom: import("jotai").WritableAtom<null, [enabled: boolean], void> & {
	init: null
}
/**
 * Atom to store the submission callback
 * Components set this to their onSubmit handler
 * This is a regular read-write atom, not a write-only action atom
 *
 * IMPORTANT: We wrap this in an object to prevent Jotai from treating
 * the function as an updater function when setting the atom value
 */
export declare const submissionCallbackAtom: import("jotai").PrimitiveAtom<{
	callback: ((text: string) => void) | null
}> & {
	init: {
		callback: ((text: string) => void) | null
	}
}
/**
 * Atom to handle input submission
 * This is called when the user presses Enter to submit input
 */
export declare const submitInputAtom: import("jotai").WritableAtom<
	null,
	[text: string | Buffer<ArrayBufferLike>],
	void
> & {
	init: null
}
/**
 * Main keyboard handler that routes based on mode
 * This is the central keyboard handling atom that all key events go through
 */
export declare const keyboardHandlerAtom: import("jotai").WritableAtom<null, [key: Key], Promise<void>> & {
	init: null
}
/**
 * Setup atom that connects keyboard events to the centralized handler
 * Returns an unsubscribe function for cleanup
 */
export declare const setupKeyboardAtom: import("jotai").WritableAtom<null, [], () => void> & {
	init: null
}
//# sourceMappingURL=keyboard.d.ts.map
