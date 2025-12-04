/**
 * Placeholders used to protect newlines within quoted strings during command parsing.
 * These constants are used by the protectNewlinesInQuotes function to temporarily replace
 * newlines that appear inside quotes, preventing them from being treated as command separators.
 * We use separate placeholders for \n and \r to preserve the original line ending type.
 */
export declare const NEWLINE_PLACEHOLDER = "___NEWLINE___"
export declare const CARRIAGE_RETURN_PLACEHOLDER = "___CARRIAGE_RETURN___"
/**
 * Protect newlines inside quoted strings by replacing them with placeholders.
 * This handles proper shell quoting rules where quotes can be concatenated.
 * Uses separate placeholders for \n and \r to preserve the original line ending type.
 *
 * Examples:
 * - "hello\nworld" -> newline is protected (inside double quotes)
 * - 'hello\nworld' -> newline is protected (inside single quotes)
 * - echo '"'A'"' -> A is NOT quoted (quote concatenation)
 * - "hello"world -> world is NOT quoted
 *
 * @param command - The command string to process
 * @param newlinePlaceholder - The placeholder string to use for \n characters
 * @param carriageReturnPlaceholder - The placeholder string to use for \r characters
 * @returns The command with newlines in quotes replaced by placeholders
 */
export declare function protectNewlinesInQuotes(
	command: string,
	newlinePlaceholder: string,
	carriageReturnPlaceholder: string,
): string
/**
 * Restore newlines from placeholders in a command string.
 *
 * @param command - The command string with placeholders
 * @param newlinePlaceholder - The placeholder string used for \n characters
 * @param carriageReturnPlaceholder - The placeholder string used for \r characters
 * @returns The command with placeholders restored to actual newlines
 */
export declare function restoreNewlinesFromPlaceholders(
	command: string,
	newlinePlaceholder: string,
	carriageReturnPlaceholder: string,
): string
//# sourceMappingURL=quote-protection.d.ts.map
