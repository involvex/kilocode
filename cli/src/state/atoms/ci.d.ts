/**
 * CI mode atoms for managing CI-specific state
 * These atoms track CI mode status and exit conditions
 */
/**
 * Atom to track if CI mode is active
 */
export declare const ciModeAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Atom to store the timeout value in seconds (if provided)
 */
export declare const ciTimeoutAtom: import("jotai").PrimitiveAtom<number | undefined> & {
	init: number | undefined
}
/**
 * Atom to track if completion_result message was received
 */
export declare const ciCompletionDetectedAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Atom to track if command/message execution has finished
 */
export declare const ciCommandFinishedAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Atom to store the exit reason
 */
export declare const ciExitReasonAtom: import("jotai").PrimitiveAtom<
	"completion_result" | "timeout" | "command_finished" | null
> & {
	init: "completion_result" | "timeout" | "command_finished" | null
}
/**
 * Action atom to set CI mode configuration
 */
export declare const setCIModeAtom: import("jotai").WritableAtom<
	null,
	[
		config: {
			enabled: boolean
			timeout?: number
		},
	],
	void
> & {
	init: null
}
/**
 * Action atom to reset CI state
 */
export declare const resetCIStateAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
//# sourceMappingURL=ci.d.ts.map
