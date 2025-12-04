/**
 * Command registry - manages all available commands
 */
import type { Command } from "./types.js"
declare class CommandRegistry {
	private commands
	private aliases
	/**
	 * Register a new command
	 */
	register(command: Command): void
	/**
	 * Get a command by name or alias
	 */
	get(nameOrAlias: string): Command | undefined
	/**
	 * Get all registered commands
	 */
	getAll(): Command[]
	/**
	 * Get commands by category
	 */
	getByCategory(category: Command["category"]): Command[]
	/**
	 * Search commands by query (fuzzy match on name and description)
	 */
	search(query: string): Command[]
	/**
	 * Check if a command exists
	 */
	has(nameOrAlias: string): boolean
	/**
	 * Clear all commands
	 */
	clear(): void
}
export declare const commandRegistry: CommandRegistry
export { CommandRegistry }
//# sourceMappingURL=registry.d.ts.map
