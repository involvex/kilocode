import { ZodError } from "zod"
import {
	type TelemetryClient,
	type TelemetryPropertiesProvider,
	TelemetryEventName,
	type TelemetrySetting,
} from "@roo-code/types"
/**
 * TelemetryService wrapper class that defers initialization.
 * This ensures that we only create the various clients after environment
 * variables are loaded.
 */
export declare class TelemetryService {
	private clients
	constructor(clients: TelemetryClient[])
	register(client: TelemetryClient): void
	/**
	 * Sets the ClineProvider reference to use for global properties
	 * @param provider A ClineProvider instance to use
	 */
	setProvider(provider: TelemetryPropertiesProvider): void
	/**
	 * Base method for all telemetry operations
	 * Checks if the service is initialized before performing any operation
	 * @returns Whether the service is ready to use
	 */
	private get isReady()
	/**
	 * Updates the telemetry state based on user preferences and VSCode settings
	 * @param isOptedIn Whether the user is opted into telemetry
	 */
	updateTelemetryState(isOptedIn: boolean): void
	captureException(error: Error, properties?: Record<string | number, unknown>): void
	updateIdentity(kilocodeToken: string): Promise<void>
	/**
	 * Generic method to capture any type of event with specified properties
	 * @param eventName The event name to capture
	 * @param properties The event properties
	 */
	captureEvent(eventName: TelemetryEventName, properties?: Record<string, unknown>): void
	captureTaskCreated(taskId: string): void
	captureTaskRestarted(taskId: string): void
	captureTaskCompleted(taskId: string): void
	captureConversationMessage(taskId: string, source: "user" | "assistant"): void
	captureLlmCompletion(
		taskId: string,
		properties: {
			inputTokens: number
			outputTokens: number
			cacheWriteTokens: number
			cacheReadTokens: number
			cost?: number
			completionTime?: number
			inferenceProvider?: string
		},
	): void
	captureModeSwitch(taskId: string, newMode: string): void
	captureToolUsage(taskId: string, tool: string): void
	captureCheckpointCreated(taskId: string): void
	captureCheckpointDiffed(taskId: string): void
	captureCheckpointRestored(taskId: string): void
	captureContextCondensed(
		taskId: string,
		isAutomaticTrigger: boolean,
		usedCustomPrompt?: boolean,
		usedCustomApiHandler?: boolean,
	): void
	captureSlidingWindowTruncation(taskId: string): void
	captureCodeActionUsed(actionType: string): void
	capturePromptEnhanced(taskId?: string): void
	captureSchemaValidationError({ schemaName, error }: { schemaName: string; error: ZodError }): void
	captureDiffApplicationError(taskId: string, consecutiveMistakeCount: number): void
	captureShellIntegrationError(taskId: string): void
	captureConsecutiveMistakeError(taskId: string): void
	/**
	 * Captures when a tab is shown due to user action
	 * @param tab The tab that was shown
	 */
	captureTabShown(tab: string): void
	/**
	 * Captures when a setting is changed in ModesView
	 * @param settingName The name of the setting that was changed
	 */
	captureModeSettingChanged(settingName: string): void
	/**
	 * Captures when a user creates a new custom mode
	 * @param modeSlug The slug of the custom mode
	 * @param modeName The name of the custom mode
	 */
	captureCustomModeCreated(modeSlug: string, modeName: string): void
	/**
	 * Captures a marketplace item installation event
	 * @param itemId The unique identifier of the marketplace item
	 * @param itemType The type of item (mode or mcp)
	 * @param itemName The human-readable name of the item
	 * @param target The installation target (project or global)
	 * @param properties Additional properties like hasParameters, installationMethod
	 */
	captureMarketplaceItemInstalled(
		itemId: string,
		itemType: string,
		itemName: string,
		target: string,
		properties?: Record<string, unknown>,
	): void
	/**
	 * Captures a marketplace item removal event
	 * @param itemId The unique identifier of the marketplace item
	 * @param itemType The type of item (mode or mcp)
	 * @param itemName The human-readable name of the item
	 * @param target The removal target (project or global)
	 */
	captureMarketplaceItemRemoved(itemId: string, itemType: string, itemName: string, target: string): void
	/**
	 * Captures a title button click event
	 * @param button The button that was clicked
	 */
	captureTitleButtonClicked(button: string): void
	/**
	 * Captures when telemetry settings are changed
	 * @param previousSetting The previous telemetry setting
	 * @param newSetting The new telemetry setting
	 */
	captureTelemetrySettingsChanged(previousSetting: TelemetrySetting, newSetting: TelemetrySetting): void
	/**
	 * Checks if telemetry is currently enabled
	 * @returns Whether telemetry is enabled
	 */
	isTelemetryEnabled(): boolean
	shutdown(): Promise<void>
	private static _instance
	static createInstance(clients?: TelemetryClient[]): TelemetryService
	static get instance(): TelemetryService
	static hasInstance(): boolean
}
//# sourceMappingURL=TelemetryService.d.ts.map
