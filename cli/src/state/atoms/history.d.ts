/**
 * History state management atoms
 * Manages command history navigation and persistence
 */
import type { HistoryData, HistoryEntry } from "../../config/history.js"
/**
 * History data atom - holds all history entries
 */
export declare const historyDataAtom: import("jotai").PrimitiveAtom<HistoryData> & {
	init: HistoryData
}
/**
 * History navigation index
 * -1 means not in history mode
 * 0 means at the most recent entry
 * entries.length - 1 means at the oldest entry
 */
export declare const historyIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Whether we're currently in history navigation mode
 */
export declare const historyModeAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Original input before entering history mode
 * Used to restore when exiting history mode
 */
export declare const originalInputAtom: import("jotai").PrimitiveAtom<string> & {
	init: string
}
/**
 * Get all history entries
 */
export declare const historyEntriesAtom: import("jotai").Atom<HistoryEntry[]>
/**
 * Get current history entry based on navigation index
 * Returns null if not in history mode or index is invalid
 */
export declare const currentHistoryEntryAtom: import("jotai").Atom<HistoryEntry | null>
/**
 * Get the prompt text from current history entry
 */
export declare const currentHistoryCommandAtom: import("jotai").Atom<string>
/**
 * Check if we can navigate up (to older entries)
 */
export declare const canNavigateUpAtom: import("jotai").Atom<boolean>
/**
 * Check if we can navigate down (to newer entries)
 */
export declare const canNavigateDownAtom: import("jotai").Atom<boolean>
/**
 * Load history from disk
 */
export declare const loadHistoryAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Save history to disk
 */
export declare const saveHistoryAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Add command to history and save
 * Avoids consecutive duplicates
 */
export declare const addToHistoryAtom: import("jotai").WritableAtom<null, [prompt: string], Promise<void>> & {
	init: null
}
/**
 * Enter history mode and navigate to most recent entry
 * Should only be called when input is empty
 */
export declare const enterHistoryModeAtom: import("jotai").WritableAtom<
	null,
	[originalInput?: string | undefined],
	boolean
> & {
	init: null
}
/**
 * Exit history mode and restore original input
 */
export declare const exitHistoryModeAtom: import("jotai").WritableAtom<null, [], boolean> & {
	init: null
}
/**
 * Navigate up in history (to older entries)
 * Returns the prompt to display, or null if can't navigate
 */
export declare const navigateHistoryUpAtom: import("jotai").WritableAtom<null, [], string | null> & {
	init: null
}
/**
 * Navigate down in history (to newer entries)
 * Returns the prompt to display, or null if can't navigate
 */
export declare const navigateHistoryDownAtom: import("jotai").WritableAtom<null, [], string | null> & {
	init: null
}
/**
 * Reset history navigation state
 * Used when submitting a command from history
 */
export declare const resetHistoryNavigationAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
//# sourceMappingURL=history.d.ts.map
