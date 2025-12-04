/**
 * Command Executor Service
 * Pure utility functions for command execution logic
 */
import type { Command, CommandContext, ParsedCommand } from "../commands/core/types.js"
/**
 * Result of command validation
 */
export interface CommandValidationResult {
	valid: boolean
	error?: string
	command?: Command
	parsed?: ParsedCommand
}
/**
 * Result of command execution
 */
export interface CommandExecutionResult {
	success: boolean
	error?: string
}
/**
 * Validate a command input string
 *
 * @param input - The raw input string to validate
 * @returns Validation result with command and parsed data if valid
 */
export declare function validateCommand(input: string): CommandValidationResult
/**
 * Execute a command with the provided context
 *
 * @param command - The command to execute
 * @param context - The command context
 * @returns Execution result
 */
export declare function executeCommandWithContext(
	command: Command,
	context: CommandContext,
): Promise<CommandExecutionResult>
/**
 * Parse and validate command input
 *
 * @param input - The raw input string
 * @returns Parsed command or null if not a valid command
 */
export declare function parseCommandInput(input: string): ParsedCommand | null
/**
 * Check if a command requires arguments
 *
 * @param command - The command to check
 * @returns True if the command has required arguments
 */
export declare function hasRequiredArguments(command: Command): boolean
/**
 * Validate command arguments
 *
 * @param command - The command to validate against
 * @param args - The provided arguments
 * @returns Validation result
 */
export declare function validateArguments(
	command: Command,
	args: string[],
): {
	valid: boolean
	error?: string
}
/**
 * Format command error message
 *
 * @param command - The command that failed
 * @param error - The error that occurred
 * @returns Formatted error message
 */
export declare function formatCommandError(command: Command, error: string): string
/**
 * Get command usage string
 *
 * @param command - The command to get usage for
 * @returns Formatted usage string
 */
export declare function getCommandUsage(command: Command): string
/**
 * Check if input is a complete command
 *
 * @param input - The input to check
 * @returns True if the input is a complete command
 */
export declare function isCompleteCommand(input: string): boolean
//# sourceMappingURL=commandExecutor.d.ts.map
