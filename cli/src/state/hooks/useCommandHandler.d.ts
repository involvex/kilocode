/**
 * Hook for handling command execution
 * Provides a high-level interface for executing commands with proper error handling
 */
/**
 * Return type for useCommandHandler hook
 */
export interface UseCommandHandlerReturn {
	/** Execute a command from input string */
	executeCommand: (input: string, onExit: () => void) => Promise<void>
	/** Whether a command is currently executing */
	isExecuting: boolean
}
/**
 * Hook that provides command execution functionality
 *
 * This hook encapsulates all the logic for parsing, validating, and executing commands,
 * including error handling and state management.
 *
 * @example
 * ```tsx
 * function CommandInput() {
 *   const { executeCommand, isExecuting } = useCommandHandler()
 *
 *   const handleSubmit = async (input: string) => {
 *     await executeCommand(input, () => console.log('Exit'))
 *   }
 *
 *   return (
 *     <input
 *       onSubmit={handleSubmit}
 *       disabled={isExecuting}
 *     />
 *   )
 * }
 * ```
 */
export declare function useCommandHandler(): UseCommandHandlerReturn
//# sourceMappingURL=useCommandHandler.d.ts.map
