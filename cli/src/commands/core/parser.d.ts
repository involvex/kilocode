/**
 * Command parser - parses user input into commands and arguments
 */
import type { ParsedCommand } from "./types.js"
/**
 * Parse a command string into its components
 * Examples:
 *   "/help" -> { command: "help", args: [], options: {} }
 *   "/mode code" -> { command: "mode", args: ["code"], options: {} }
 *   "/settings --provider anthropic" -> { command: "settings", args: [], options: { provider: "anthropic" } }
 */
export declare function parseCommand(input: string): ParsedCommand | null
/**
 * Extract command name from input (without parsing full command)
 */
export declare function extractCommandName(input: string): string | null
//# sourceMappingURL=parser.d.ts.map
