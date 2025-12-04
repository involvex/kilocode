/**
 * Telemetry Client
 * Standalone PostHog client implementation for CLI telemetry
 */
import { TelemetryEvent } from "./events.js"
import { type UserIdentity } from "./identity.js"
/**
 * Telemetry Client configuration
 */
export interface TelemetryConfig {
	enabled: boolean
	apiKey: string
	host: string
	debug?: boolean
	batchSize?: number
	flushInterval?: number
	maxRetries?: number
}
/**
 * Telemetry Client
 * Handles all telemetry operations for the CLI application
 */
export declare class TelemetryClient {
	private client
	private config
	private identity
	private eventQueue
	private flushTimer
	private isShuttingDown
	private performanceMetrics
	constructor(config: TelemetryConfig)
	/**
	 * Initialize PostHog client
	 */
	private initializeClient
	/**
	 * Set user identity
	 */
	setIdentity(identity: UserIdentity): void
	/**
	 * Update Kilocode user ID
	 */
	updateKilocodeUserId(kilocodeToken: string): Promise<void>
	/**
	 * Clear Kilocode user ID
	 */
	clearKilocodeUserId(): void
	/**
	 * Capture a telemetry event
	 */
	capture(event: TelemetryEvent, properties?: Record<string, unknown>): void
	/**
	 * Capture an exception
	 */
	captureException(error: Error, properties?: Record<string, unknown>): void
	/**
	 * Track command execution
	 */
	trackCommand(commandType: string, executionTime: number, success: boolean): void
	/**
	 * Track API request
	 */
	trackApiRequest(provider: string, model: string, responseTime: number, tokens?: Record<string, unknown>): void
	/**
	 * Track tool execution
	 */
	trackToolExecution(toolName: string, executionTime: number, success: boolean): void
	/**
	 * Track file operation
	 */
	trackFileOperation(): void
	/**
	 * Get performance metrics
	 */
	getPerformanceMetrics(): Record<string, unknown>
	/**
	 * Send performance metrics
	 */
	sendPerformanceMetrics(): void
	/**
	 * Flush queued events
	 */
	flush(): Promise<void>
	/**
	 * Shutdown telemetry client
	 */
	shutdown(): Promise<void>
	/**
	 * Get base properties for all events
	 */
	private getBaseProperties
	/**
	 * Get distinct ID for PostHog
	 */
	private getDistinctId
	/**
	 * Get CLI version
	 */
	private getCLIVersion
	/**
	 * Get tool category from tool name
	 */
	private getToolCategory
	/**
	 * Calculate average of an array of numbers
	 */
	private calculateAverage
	/**
	 * Start flush timer
	 */
	private startFlushTimer
	/**
	 * Check if telemetry is enabled
	 */
	isEnabled(): boolean
}
//# sourceMappingURL=TelemetryClient.d.ts.map
