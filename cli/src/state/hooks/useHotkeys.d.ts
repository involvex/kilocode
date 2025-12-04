/**
 * Hook for managing hotkey state and handlers
 */
export interface Hotkey {
	/** The key combination (e.g., "Ctrl+C", "Cmd+X") */
	keys: string
	/** Description of what the hotkey does */
	description: string
	/** Whether this is the primary/recommended action */
	primary?: boolean
}
export interface UseHotkeysReturn {
	/** List of currently available hotkeys */
	hotkeys: Hotkey[]
	/** Whether any hotkeys should be displayed */
	shouldShow: boolean
	/** The platform-specific modifier key (Cmd or Ctrl) */
	modifierKey: string
}
/**
 * Hook to manage and display context-aware hotkeys
 *
 * Returns different hotkeys based on the current UI state:
 * - When streaming: Shows cancel hotkey
 * - When approval pending: Shows approval hotkeys
 * - When followup suggestions visible: Shows navigation hotkeys
 * - When idle: Shows general command hotkeys
 */
export declare function useHotkeys(): UseHotkeysReturn
//# sourceMappingURL=useHotkeys.d.ts.map
