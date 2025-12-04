/**
 * Unified Autocomplete Engine
 * Provides command and argument suggestions based on user input
 */
import type { Command, ArgumentSuggestion, InputState, ArgumentProviderCommandContext } from "../commands/core/types.js"
export interface CommandSuggestion {
	command: Command
	matchScore: number
	highlightedName: string
}
export type { ArgumentSuggestion }
/**
 * File mention suggestion interface
 */
export interface FileMentionSuggestion {
	/** Relative path from workspace root */
	value: string
	/** Additional description or full path */
	description?: string
	/** Match score for sorting */
	matchScore: number
	/** Highlighted value for display */
	highlightedValue: string
	/** Type of file entry */
	type: "file" | "folder"
	/** Loading state */
	loading?: boolean
	/** Error message if any */
	error?: string
}
/**
 * File mention context detected in text
 */
export interface FileMentionContext {
	/** Whether cursor is in a file mention */
	isInMention: boolean
	/** Start position of the @ symbol */
	mentionStart: number
	/** Query string after @ */
	query: string
}
/**
 * Get command suggestions based on input
 */
export declare function getSuggestions(input: string): CommandSuggestion[]
/**
 * Get the best matching command for a query
 */
export declare function getBestMatch(input: string): Command | null
/**
 * Check if input looks like a command
 */
export declare function isCommandInput(input: string): boolean
/**
 * Get command name from input
 */
export declare function getCommandFromInput(input: string): string | null
/**
 * Detect what the user is currently typing
 */
export declare function detectInputState(input: string): InputState
/**
 * Get argument suggestions for current input
 */
export declare function getArgumentSuggestions(
	input: string,
	commandContext?: ArgumentProviderCommandContext,
): Promise<ArgumentSuggestion[]>
/**
 * Clear argument suggestion cache
 */
export declare function clearArgumentCache(): void
/**
 * Detect if cursor is within a file mention context
 * Scans backward from cursor position to find '@' symbol
 * @param text Full text buffer
 * @param cursorPosition Current cursor position
 * @returns File mention context or null if not in mention
 */
export declare function detectFileMentionContext(text: string, cursorPosition: number): FileMentionContext | null
/**
 * Get file mention suggestions based on query
 * @param query Search query (text after @)
 * @param cwd Current working directory (workspace root)
 * @param maxResults Maximum number of results (default: 50)
 * @returns Array of file mention suggestions
 */
export declare function getFileMentionSuggestions(
	query: string,
	cwd: string,
	maxResults?: number,
): Promise<FileMentionSuggestion[]>
/**
 * Get all suggestions (commands, arguments, or file mentions) based on input state
 * @param input Current input text
 * @param cursorPosition Current cursor position (required for file mention detection)
 * @param commandContext Optional command context for argument providers
 * @param cwd Current working directory for file suggestions
 */
export declare function getAllSuggestions(
	input: string,
	cursorPosition: number,
	commandContext?: ArgumentProviderCommandContext,
	cwd?: string,
): Promise<
	| {
			type: "command"
			suggestions: CommandSuggestion[]
	  }
	| {
			type: "argument"
			suggestions: ArgumentSuggestion[]
	  }
	| {
			type: "file-mention"
			suggestions: FileMentionSuggestion[]
	  }
	| {
			type: "none"
			suggestions: []
	  }
>
//# sourceMappingURL=autocomplete.d.ts.map
