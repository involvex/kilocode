/**
 * Key parsing utilities for terminal input
 * Handles Kitty protocol, legacy ANSI sequences, and special key combinations
 */
import type { Key, ReadlineKey } from "../../types/keyboard.js"
/**
 * Result of parsing a key sequence
 */
export interface ParseResult {
	key: Key | null
	consumedLength: number
}
/**
 * Parse a single complete Kitty sequence from the buffer
 * Returns the parsed key and number of characters consumed
 */
export declare function parseKittySequence(buffer: string): ParseResult
/**
 * Check if a sequence is a paste mode boundary
 */
export declare function isPasteModeBoundary(sequence: string): {
	isStart: boolean
	isEnd: boolean
}
/**
 * Check if a sequence is a focus event
 */
export declare function isFocusEvent(sequence: string): {
	isFocusIn: boolean
	isFocusOut: boolean
}
/**
 * Map macOS Alt key characters to their corresponding letters
 */
export declare function mapAltKeyCharacter(char: string): string | null
/**
 * Parse a simple key from readline's keypress event
 */
export declare function parseReadlineKey(key: ReadlineKey): Key
/**
 * Create a paste event key
 */
export declare function createPasteKey(text: string): Key
/**
 * Create a special event key (for internal use)
 */
export declare function createSpecialKey(name: string, sequence?: string): Key
//# sourceMappingURL=keyParsing.d.ts.map
