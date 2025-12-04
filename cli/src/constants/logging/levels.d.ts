import type { LogLevel } from "../../services/logs.js"
/**
 * Log level color mappings for display
 * Maps log levels to their corresponding colors
 */
export declare const LOG_LEVEL_COLORS: Record<LogLevel, string>
/**
 * Log level icon mappings for display
 * Maps log levels to their corresponding emoji icons
 */
export declare const LOG_LEVEL_ICONS: Record<LogLevel, string>
/**
 * All available log levels in order of severity
 */
export declare const LOG_LEVELS: LogLevel[]
/**
 * Default log levels that are enabled by default
 */
export declare const DEFAULT_LOG_LEVELS: Set<LogLevel>
/**
 * Log level display configuration
 */
export interface LogLevelConfig {
	level: LogLevel
	color: string
	icon: string
	label: string
}
/**
 * Get log level configuration
 * @param level - Log level
 * @returns Configuration object with color, icon, and label
 */
export declare const getLogLevelConfig: (level: LogLevel) => LogLevelConfig
/**
 * Get all log level configurations
 * @returns Array of all log level configurations
 */
export declare const getAllLogLevelConfigs: () => LogLevelConfig[]
//# sourceMappingURL=levels.d.ts.map
