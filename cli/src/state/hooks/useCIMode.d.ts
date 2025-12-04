/**
 * Hook for managing CI mode behavior and exit logic
 * Handles automatic exit when completion conditions are met
 */
/**
 * Options for useCIMode hook
 */
export interface UseCIModeOptions {
	/** Whether CI mode is enabled */
	enabled: boolean
	/** Optional timeout in seconds */
	timeout?: number
	/** Callback to execute when exit conditions are met */
	onExit: () => void
}
/**
 * Return type for useCIMode hook
 */
export interface UseCIModeReturn {
	/** Whether CI mode is active */
	isCIMode: boolean
	/** Whether the CLI should exit */
	shouldExit: boolean
	/** The reason for exiting */
	exitReason: "completion_result" | "command_finished" | "timeout" | null
	/** Mark command execution as finished */
	markCommandFinished: () => void
}
/**
 * Hook for managing CI mode behavior
 *
 * This hook monitors for exit conditions in CI mode:
 * 1. completion_result message received from extension
 * 2. Command/message execution finished
 * 3. Timeout reached (if configured)
 *
 * When any condition is met, it triggers the onExit callback after a brief cleanup delay.
 *
 * @example
 * ```tsx
 * function MyComponent({ options, onExit }) {
 *   const { shouldExit, exitReason } = useCIMode({
 *     enabled: options.ci,
 *     timeout: options.timeout,
 *     onExit: onExit
 *   })
 *
 *   useEffect(() => {
 *     if (shouldExit) {
 *       console.log(`Exiting: ${exitReason}`)
 *       setTimeout(() => onExit(), 100)
 *     }
 *   }, [shouldExit, exitReason, onExit])
 * }
 * ```
 */
export declare function useCIMode(options: UseCIModeOptions): UseCIModeReturn
//# sourceMappingURL=useCIMode.d.ts.map
