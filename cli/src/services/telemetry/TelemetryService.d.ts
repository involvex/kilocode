/**
 * Telemetry Service
 * Singleton service that manages telemetry lifecycle and provides high-level tracking methods
 */
import type { CLIConfig } from "../../config/types.js"
/**
 * Telemetry Service
 * Provides a high-level API for tracking telemetry events throughout the CLI
 */
export declare class TelemetryService {
	private static instance
	private client
	private isInitialized
	private sessionStartTime
	private currentMode
	private currentCIMode
	private currentWorkspace
	private constructor()
	/**
	 * Get singleton instance
	 */
	static getInstance(): TelemetryService
	/**
	 * Initialize telemetry service
	 */
	initialize(
		config: CLIConfig,
		options: {
			workspace: string
			mode: string
			ciMode: boolean
		},
	): Promise<void>
	/**
	 * Shutdown telemetry service
	 */
	shutdown(): Promise<void>
	/**
	 * Update mode
	 */
	setMode(mode: string): void
	/**
	 * Update CI mode
	 */
	setCIMode(ciMode: boolean): void
	/**
	 * Update Kilocode user ID
	 */
	updateKilocodeUserId(kilocodeToken: string): Promise<void>
	/**
	 * Clear Kilocode user ID
	 */
	clearKilocodeUserId(): void
	private trackSessionStart
	private trackSessionEnd
	trackCommandExecuted(commandType: string, args: string[], executionTime: number, success: boolean): void
	trackCommandFailed(commandType: string, errorMessage: string): void
	trackUserMessageSent(messageLength: number, hasImages: boolean, isFollowup: boolean, taskId?: string): void
	trackAssistantMessageReceived(messageLength: number, taskId?: string): void
	trackTaskCreated(taskId: string): void
	trackTaskCompleted(taskId: string, duration: number, stats: Record<string, unknown>): void
	trackTaskFailed(taskId: string, errorMessage: string): void
	trackTaskCancelled(taskId: string): void
	trackConfigLoaded(config: CLIConfig): void
	trackConfigSaved(config: CLIConfig): void
	trackProviderChanged(previousProvider: string, newProvider: string, newModel?: string): void
	trackModeChanged(previousMode: string, newMode: string): void
	trackThemeChanged(previousTheme: string, newTheme: string): void
	trackToolExecuted(
		toolName: string,
		executionTime: number,
		success: boolean,
		metadata?: Record<string, unknown>,
	): void
	trackApprovalRequested(approvalType: string, toolName?: string): void
	trackApprovalAutoApproved(approvalType: string, toolName?: string, responseTime?: number): void
	trackApprovalAutoRejected(approvalType: string, toolName?: string): void
	trackApprovalManualApproved(approvalType: string, toolName?: string, responseTime?: number): void
	trackApprovalManualRejected(approvalType: string, toolName?: string, responseTime?: number): void
	trackError(errorType: string, errorMessage: string, errorStack?: string, isFatal?: boolean): void
	trackException(error: Error, context?: string, isFatal?: boolean): void
	trackApiRequest(provider: string, model: string, responseTime: number, tokens?: Record<string, unknown>): void
	sendPerformanceMetrics(): void
	trackExtensionInitialized(success: boolean): void
	trackExtensionMessageSent(messageType: string): void
	trackExtensionMessageReceived(messageType: string): void
	trackCIModeStarted(promptLength: number, timeoutSeconds?: number): void
	trackCIModeCompleted(stats: Record<string, unknown>): void
	trackCIModeTimeout(): void
	parallelModeStart: number
	trackParallelModeStarted(isExistingBranch: boolean, promptLength: number, timeoutSeconds?: number): void
	trackParallelModeCompleted(): void
	trackParallelModeErrored(errorMessage: string): void
	trackMCPToolUsed(
		serverName: string,
		toolName: string,
		executionTime: number,
		success: boolean,
		errorMessage?: string,
	): void
	trackMCPResourceAccessed(
		serverName: string,
		resourceUri: string,
		executionTime: number,
		success: boolean,
		errorMessage?: string,
	): void
	trackAuthTokenUpdated(success: boolean): void
	trackAuthFailed(errorMessage: string): void
	trackFeatureUsed(featureName: string, usageCount: number, firstUsed: boolean): void
	trackWorkflowPattern(patternType: string, commandSequence: string[], frequency: number, duration: number): void
	private anonymizeWorkspace
	private getToolCategory
	/**
	 * Check if telemetry is enabled
	 */
	isEnabled(): boolean
}
/**
 * Get the singleton telemetry service instance
 */
export declare function getTelemetryService(): TelemetryService
//# sourceMappingURL=TelemetryService.d.ts.map
