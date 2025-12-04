export type LogLevel = "info" | "debug" | "error" | "warn"
export interface LogEntry {
	id: string
	ts: number
	level: LogLevel
	message: string
	source?: string
	context?: Record<string, unknown>
}
export interface LogFilter {
	levels?: LogLevel[]
	source?: string
	since?: number
}
/**
 * Singleton service for managing application logs with enhanced metadata
 */
export declare class LogsService {
	private static instance
	private logs
	private maxEntries
	private listeners
	private originalConsole
	private logFilePath
	private fileLoggingEnabled
	private constructor()
	/**
	 * Get the singleton instance of LogsService
	 */
	static getInstance(): LogsService
	/**
	 * Serialize context object, handling Error objects and circular references
	 */
	private serializeContext
	/**
	 * Add a log entry with the specified level
	 */
	private addLog
	/**
	 * Output log entry to console with appropriate formatting
	 * Uses original console methods to avoid circular dependency
	 */
	private outputToConsole
	/**
	 * Initialize file logging by ensuring the log directory exists
	 */
	private initializeFileLogging
	/**
	 * Format log entry for file output (same format as outputToConsole)
	 */
	private formatLogEntryForFile
	/**
	 * Write log entry to file asynchronously
	 */
	private writeToFile
	/**
	 * Log an info message
	 */
	info(message: string, source?: string, context?: Record<string, unknown>): void
	/**
	 * Log a debug message
	 */
	debug(message: string, source?: string, context?: Record<string, unknown>): void
	/**
	 * Log an error message
	 */
	error(message: string, source?: string, context?: Record<string, unknown>): void
	/**
	 * Log a warning message
	 */
	warn(message: string, source?: string, context?: Record<string, unknown>): void
	/**
	 * Get all logs with optional filtering
	 */
	getLogs(filter?: LogFilter): LogEntry[]
	/**
	 * Get logs count by level
	 */
	getLogCounts(): Record<LogLevel, number>
	/**
	 * Subscribe to new log entries
	 */
	subscribe(listener: (entry: LogEntry) => void): () => void
	/**
	 * Clear all logs
	 */
	clear(): void
	/**
	 * Set maximum number of log entries to keep
	 */
	setMaxEntries(max: number): void
	/**
	 * Get current configuration
	 */
	getConfig(): {
		maxEntries: number
		totalLogs: number
		fileLoggingEnabled: boolean
		logFilePath: string
	}
	/**
	 * Get the log file path
	 */
	getLogFilePath(): string
	/**
	 * Check if file logging is enabled
	 */
	isFileLoggingEnabled(): boolean
}
export declare const logs: LogsService
//# sourceMappingURL=logs.d.ts.map
