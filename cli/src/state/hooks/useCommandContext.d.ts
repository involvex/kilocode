/**
 * Hook for creating CommandContext objects
 * Encapsulates all dependencies needed for command execution
 */
import type { CommandContext } from "../../commands/core/types.js"
/**
 * Factory function type for creating CommandContext
 */
export type CommandContextFactory = (
	input: string,
	args: string[],
	options: Record<string, string | number | boolean>,
	onExit: () => void,
) => CommandContext
/**
 * Return type for useCommandContext hook
 */
export interface UseCommandContextReturn {
	/** Factory function to create CommandContext objects */
	createContext: CommandContextFactory
}
/**
 * Hook that provides a factory for creating CommandContext objects
 *
 * This hook encapsulates all the dependencies needed to create a CommandContext,
 * making it easier to test and reuse command execution logic.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { createContext } = useCommandContext()
 *
 *   const handleCommand = (input: string, args: string[], options: Record<string, any>) => {
 *     const context = createContext(input, args, options, onExit)
 *     await command.handler(context)
 *   }
 * }
 * ```
 */
export declare function useCommandContext(): UseCommandContextReturn
//# sourceMappingURL=useCommandContext.d.ts.map
