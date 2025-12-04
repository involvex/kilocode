/**
 * Jotai atoms for shell mode state management
 */
/**
 * The workspace directory where shell commands should be executed
 */
export declare const workspacePathAtom: import("jotai").PrimitiveAtom<string | null> & {
	init: string | null
}
/**
 * Whether shell mode is currently active
 */
export declare const shellModeActiveAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Shell command history
 */
export declare const shellHistoryAtom: import("jotai").PrimitiveAtom<string[]> & {
	init: string[]
}
/**
 * Current shell history index (for navigation)
 */
export declare const shellHistoryIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Action atom to toggle shell mode
 * Only enters shell mode if input is empty, but always allows exiting
 */
export declare const toggleShellModeAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to add command to shell history
 */
export declare const addToShellHistoryAtom: import("jotai").WritableAtom<null, [command: string], void> & {
	init: null
}
/**
 * Action atom to navigate shell history up
 */
export declare const navigateShellHistoryUpAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to navigate shell history down
 */
export declare const navigateShellHistoryDownAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Action atom to execute shell command
 */
export declare const executeShellCommandAtom: import("jotai").WritableAtom<null, [command: string], Promise<void>> & {
	init: null
}
//# sourceMappingURL=shell.d.ts.map
