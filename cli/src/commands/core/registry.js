/**
 * Command registry - manages all available commands
 */
class CommandRegistry {
	commands = new Map()
	aliases = new Map()
	/**
	 * Register a new command
	 */
	register(command) {
		this.commands.set(command.name, command)
		// Register aliases
		for (const alias of command.aliases) {
			this.aliases.set(alias, command.name)
		}
	}
	/**
	 * Get a command by name or alias
	 */
	get(nameOrAlias) {
		// Try direct lookup
		const command = this.commands.get(nameOrAlias)
		if (command) {
			return command
		}
		// Try alias lookup
		const commandName = this.aliases.get(nameOrAlias)
		if (commandName) {
			return this.commands.get(commandName)
		}
		return undefined
	}
	/**
	 * Get all registered commands
	 */
	getAll() {
		return Array.from(this.commands.values())
	}
	/**
	 * Get commands by category
	 */
	getByCategory(category) {
		return this.getAll().filter((cmd) => cmd.category === category)
	}
	/**
	 * Search commands by query (fuzzy match on name and description)
	 */
	search(query) {
		const lowerQuery = query.toLowerCase()
		return this.getAll().filter((cmd) => {
			return (
				cmd.name.toLowerCase().includes(lowerQuery) ||
				cmd.description.toLowerCase().includes(lowerQuery) ||
				cmd.aliases.some((alias) => alias.toLowerCase().includes(lowerQuery))
			)
		})
	}
	/**
	 * Check if a command exists
	 */
	has(nameOrAlias) {
		return this.commands.has(nameOrAlias) || this.aliases.has(nameOrAlias)
	}
	/**
	 * Clear all commands
	 */
	clear() {
		this.commands.clear()
		this.aliases.clear()
	}
}
// Export singleton instance
export const commandRegistry = new CommandRegistry()
// Export class for testing
export { CommandRegistry }
