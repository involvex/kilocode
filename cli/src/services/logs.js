import { appendFileSync } from "fs"
import * as fs from "fs-extra"
import * as path from "path"
import { KiloCodePaths } from "../utils/paths.js"
import { safeStringify } from "../utils/safe-stringify.js"
/**
 * Singleton service for managing application logs with enhanced metadata
 */
export class LogsService {
	static instance = null
	logs = []
	maxEntries = 1000
	listeners = []
	originalConsole = null
	logFilePath
	fileLoggingEnabled = true
	constructor() {
		// Private constructor for singleton pattern
		// Store original console methods before any interception
		this.originalConsole = {
			log: console.log,
			error: console.error,
			warn: console.warn,
			debug: console.debug,
			info: console.info,
		}
		// Initialize file logging - use centralized logs directory
		this.logFilePath = path.join(KiloCodePaths.getLogsDir(), "cli.txt")
		// Initialize file logging asynchronously (don't await to avoid blocking constructor)
		this.initializeFileLogging().catch(() => {
			// Error handling is done within initializeFileLogging
		})
	}
	/**
	 * Get the singleton instance of LogsService
	 */
	static getInstance() {
		if (!LogsService.instance) {
			LogsService.instance = new LogsService()
		}
		return LogsService.instance
	}
	/**
	 * Serialize context object, handling Error objects and circular references
	 */
	serializeContext(context) {
		if (!context) {
			return undefined
		}
		return safeStringify(context)
	}
	/**
	 * Add a log entry with the specified level
	 */
	addLog(level, message, source, context) {
		// Serialize context to handle Error objects properly
		const serializedContext = this.serializeContext(context)
		const entry = {
			id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			ts: Date.now(),
			level,
			message,
			...(source && { source }),
			...(serializedContext && { context: serializedContext }),
		}
		// Add to logs array
		this.logs.unshift(entry) // Add to beginning for newest-first order
		// Maintain max entries limit
		if (this.logs.length > this.maxEntries) {
			this.logs = this.logs.slice(0, this.maxEntries)
		}
		// Notify listeners
		this.listeners.forEach((listener) => listener(entry))
		// Write to file asynchronously (don't await to avoid blocking)
		this.writeToFile(entry).catch(() => {
			// Error handling is done within writeToFile
		})
		// Also output to console for development
		// this.outputToConsole(entry)
	}
	/**
	 * Output log entry to console with appropriate formatting
	 * Uses original console methods to avoid circular dependency
	 */
	outputToConsole(entry) {
		// GUARD: Prevent recursive logging by checking if we're already in a logging call
		if (this._isLogging) {
			return
		}
		// Use original console methods to prevent circular dependency
		if (!this.originalConsole) {
			// Fallback: if original console not available, skip console output
			return
		}
		// Set flag to prevent recursion
		this._isLogging = true
		try {
			const ts = new Date(entry.ts).toISOString()
			const source = entry.source ? `[${entry.source}]` : ""
			const prefix = `${ts} ${source}`
			// DIAGNOSTIC: Check if our "original" console methods are actually original
			const isOriginalConsole = this.originalConsole.error.toString().includes("[native code]")
			if (!isOriginalConsole) {
				// Our "original" console is actually intercepted - skip to prevent loop
				return
			}
			switch (entry.level) {
				case "error":
					this.originalConsole.error(`${prefix} ERROR:`, entry.message, entry.context || "")
					break
				case "warn":
					this.originalConsole.warn(`${prefix} WARN:`, entry.message, entry.context || "")
					break
				case "debug":
					this.originalConsole.debug(`${prefix} DEBUG:`, entry.message, entry.context || "")
					break
				case "info":
				default:
					this.originalConsole.log(`${prefix} INFO:`, entry.message, entry.context || "")
					break
			}
		} finally {
			// Always clear the flag
			this._isLogging = false
		}
	}
	/**
	 * Initialize file logging by ensuring the log directory exists
	 */
	async initializeFileLogging() {
		try {
			const logDir = path.dirname(this.logFilePath)
			await fs.ensureDir(logDir)
		} catch (error) {
			// Disable file logging if initialization fails
			this.fileLoggingEnabled = false
			// Use original console to avoid circular dependency
			if (this.originalConsole) {
				this.originalConsole.error("Failed to initialize file logging:", error)
			}
		}
	}
	/**
	 * Format log entry for file output (same format as outputToConsole)
	 */
	formatLogEntryForFile(entry) {
		const ts = new Date(entry.ts).toISOString()
		const source = entry.source ? `[${entry.source}]` : ""
		const prefix = `${ts} ${source}`
		// Use safe stringify to handle circular references
		let contextStr = ""
		if (entry.context) {
			try {
				const safeContext = safeStringify(entry.context)
				contextStr = ` ${JSON.stringify(safeContext)}`
			} catch (_error) {
				// Fallback if even safe stringify fails
				contextStr = " [Context serialization failed]"
			}
		}
		switch (entry.level) {
			case "error":
				return `${prefix} ERROR: ${entry.message}${contextStr}`
			case "warn":
				return `${prefix} WARN: ${entry.message}${contextStr}`
			case "debug":
				return `${prefix} DEBUG: ${entry.message}${contextStr}`
			case "info":
			default:
				return `${prefix} INFO: ${entry.message}${contextStr}`
		}
	}
	/**
	 * Write log entry to file asynchronously
	 */
	async writeToFile(entry) {
		if (!this.fileLoggingEnabled) {
			return
		}
		try {
			// Ensure directory exists before writing (synchronous to avoid race conditions)
			const logDir = path.dirname(this.logFilePath)
			fs.ensureDirSync(logDir)
			const logLine = this.formatLogEntryForFile(entry) + "\n"
			appendFileSync(this.logFilePath, logLine, "utf8")
		} catch (error) {
			// Disable file logging on write errors to prevent spam
			this.fileLoggingEnabled = false
			// Use original console to avoid circular dependency
			if (this.originalConsole) {
				this.originalConsole.error("Failed to write to log file:", error)
			}
		}
	}
	/**
	 * Log an info message
	 */
	info(message, source, context) {
		this.addLog("info", message, source, context)
	}
	/**
	 * Log a debug message
	 */
	debug(message, source, context) {
		this.addLog("debug", message, source, context)
	}
	/**
	 * Log an error message
	 */
	error(message, source, context) {
		this.addLog("error", message, source, context)
	}
	/**
	 * Log a warning message
	 */
	warn(message, source, context) {
		this.addLog("warn", message, source, context)
	}
	/**
	 * Get all logs with optional filtering
	 */
	getLogs(filter) {
		let filteredLogs = [...this.logs]
		if (filter) {
			if (filter.levels && filter.levels.length > 0) {
				filteredLogs = filteredLogs.filter((log) => filter.levels.includes(log.level))
			}
			if (filter.source) {
				filteredLogs = filteredLogs.filter((log) => log.source?.includes(filter.source))
			}
			if (filter.since) {
				filteredLogs = filteredLogs.filter((log) => log.ts >= filter.since)
			}
		}
		return filteredLogs
	}
	/**
	 * Get logs count by level
	 */
	getLogCounts() {
		const counts = {
			info: 0,
			debug: 0,
			error: 0,
			warn: 0,
		}
		this.logs.forEach((log) => {
			counts[log.level]++
		})
		return counts
	}
	/**
	 * Subscribe to new log entries
	 */
	subscribe(listener) {
		this.listeners.push(listener)
		// Return unsubscribe function
		return () => {
			const index = this.listeners.indexOf(listener)
			if (index > -1) {
				this.listeners.splice(index, 1)
			}
		}
	}
	/**
	 * Clear all logs
	 */
	clear() {
		this.logs = []
	}
	/**
	 * Set maximum number of log entries to keep
	 */
	setMaxEntries(max) {
		this.maxEntries = max
		if (this.logs.length > max) {
			this.logs = this.logs.slice(0, max)
		}
	}
	/**
	 * Get current configuration
	 */
	getConfig() {
		return {
			maxEntries: this.maxEntries,
			totalLogs: this.logs.length,
			fileLoggingEnabled: this.fileLoggingEnabled,
			logFilePath: this.logFilePath,
		}
	}
	/**
	 * Get the log file path
	 */
	getLogFilePath() {
		return this.logFilePath
	}
	/**
	 * Check if file logging is enabled
	 */
	isFileLoggingEnabled() {
		return this.fileLoggingEnabled
	}
}
// Export singleton instance for easy access
export const logs = LogsService.getInstance()
