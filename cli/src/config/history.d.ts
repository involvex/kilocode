/**
 * History persistence module
 * Manages command history storage and retrieval
 * Follows the same pattern as config persistence
 */
export interface HistoryEntry {
	prompt: string
	timestamp: number
}
export interface HistoryData {
	version: "1.0.0"
	maxSize: number
	entries: HistoryEntry[]
}
export declare const HISTORY_DIR: string
export declare const HISTORY_FILE: string
export declare const DEFAULT_MAX_SIZE = 500
export declare function setHistoryPaths(dir: string, file: string): void
export declare function resetHistoryPaths(): void
/**
 * Ensure history directory exists
 */
export declare function ensureHistoryDir(): Promise<void>
/**
 * Check if history file exists
 */
export declare function historyExists(): Promise<boolean>
/**
 * Load history from disk
 * Returns default history if file doesn't exist or is invalid
 */
export declare function loadHistory(): Promise<HistoryData>
/**
 * Save history to disk
 */
export declare function saveHistory(data: HistoryData): Promise<void>
/**
 * Add entry to history
 * Avoids consecutive duplicates
 */
export declare function addEntry(data: HistoryData, prompt: string): HistoryData
/**
 * Clear all history
 */
export declare function clearHistory(): Promise<void>
/**
 * Get history file path
 */
export declare function getHistoryPath(): string
//# sourceMappingURL=history.d.ts.map
