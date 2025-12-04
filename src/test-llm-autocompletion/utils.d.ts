import { GhostSuggestionContext } from "../services/ghost/types.js"
/**
 * Extract file extension from test case name
 * e.g., "class-constructor.rb" -> ".rb"
 * e.g., "class-constructor" -> ".js"
 */
export declare function getFileExtensionFromTestName(testCaseName: string): string
/**
 * Map file extension to VSCode languageId
 */
export declare function getLanguageIdFromExtension(extension: string): string
/**
 * Converts test input to GhostSuggestionContext
 * Extracts cursor position from CURSOR_MARKER in the code
 */
export declare function createContext(code: string, testCaseName: string): GhostSuggestionContext
//# sourceMappingURL=utils.d.ts.map
