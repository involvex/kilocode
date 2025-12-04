import { TelemetryEventName } from "@roo-code/types"
/**
 * TelemetryService wrapper class that defers initialization.
 * This ensures that we only create the various clients after environment
 * variables are loaded.
 */
export class TelemetryService {
	clients
	constructor(clients) {
		this.clients = clients
	}
	register(client) {
		this.clients.push(client)
	}
	/**
	 * Sets the ClineProvider reference to use for global properties
	 * @param provider A ClineProvider instance to use
	 */
	setProvider(provider) {
		// If client is initialized, pass the provider reference.
		if (this.isReady) {
			this.clients.forEach((client) => client.setProvider(provider))
		}
	}
	/**
	 * Base method for all telemetry operations
	 * Checks if the service is initialized before performing any operation
	 * @returns Whether the service is ready to use
	 */
	get isReady() {
		return this.clients.length > 0
	}
	/**
	 * Updates the telemetry state based on user preferences and VSCode settings
	 * @param isOptedIn Whether the user is opted into telemetry
	 */
	updateTelemetryState(isOptedIn) {
		if (!this.isReady) {
			return
		}
		this.clients.forEach((client) => client.updateTelemetryState(isOptedIn))
	}
	// kilocode_change start
	captureException(error, properties) {
		this.clients.forEach((client) => client.captureException(error, properties))
	}
	async updateIdentity(kilocodeToken) {
		for (const client of this.clients) {
			await client.updateIdentity(kilocodeToken)
		}
	}
	// kilocode_change end
	/**
	 * Generic method to capture any type of event with specified properties
	 * @param eventName The event name to capture
	 * @param properties The event properties
	 */
	captureEvent(eventName, properties) {
		if (!this.isReady) {
			return
		}
		this.clients.forEach((client) => client.capture({ event: eventName, properties }))
	}
	captureTaskCreated(taskId) {
		this.captureEvent(TelemetryEventName.TASK_CREATED, { taskId })
	}
	captureTaskRestarted(taskId) {
		this.captureEvent(TelemetryEventName.TASK_RESTARTED, { taskId })
	}
	captureTaskCompleted(taskId) {
		this.captureEvent(TelemetryEventName.TASK_COMPLETED, { taskId })
	}
	captureConversationMessage(taskId, source) {
		this.captureEvent(TelemetryEventName.TASK_CONVERSATION_MESSAGE, { taskId, source })
	}
	captureLlmCompletion(taskId, properties) {
		this.captureEvent(TelemetryEventName.LLM_COMPLETION, { taskId, ...properties })
	}
	captureModeSwitch(taskId, newMode) {
		this.captureEvent(TelemetryEventName.MODE_SWITCH, { taskId, newMode })
	}
	captureToolUsage(taskId, tool) {
		this.captureEvent(TelemetryEventName.TOOL_USED, { taskId, tool })
	}
	captureCheckpointCreated(taskId) {
		this.captureEvent(TelemetryEventName.CHECKPOINT_CREATED, { taskId })
	}
	captureCheckpointDiffed(taskId) {
		this.captureEvent(TelemetryEventName.CHECKPOINT_DIFFED, { taskId })
	}
	captureCheckpointRestored(taskId) {
		this.captureEvent(TelemetryEventName.CHECKPOINT_RESTORED, { taskId })
	}
	captureContextCondensed(taskId, isAutomaticTrigger, usedCustomPrompt, usedCustomApiHandler) {
		this.captureEvent(TelemetryEventName.CONTEXT_CONDENSED, {
			taskId,
			isAutomaticTrigger,
			...(usedCustomPrompt !== undefined && { usedCustomPrompt }),
			...(usedCustomApiHandler !== undefined && { usedCustomApiHandler }),
		})
	}
	captureSlidingWindowTruncation(taskId) {
		this.captureEvent(TelemetryEventName.SLIDING_WINDOW_TRUNCATION, { taskId })
	}
	captureCodeActionUsed(actionType) {
		this.captureEvent(TelemetryEventName.CODE_ACTION_USED, { actionType })
	}
	capturePromptEnhanced(taskId) {
		this.captureEvent(TelemetryEventName.PROMPT_ENHANCED, { ...(taskId && { taskId }) })
	}
	captureSchemaValidationError({ schemaName, error }) {
		// https://zod.dev/ERROR_HANDLING?id=formatting-errors
		this.captureEvent(TelemetryEventName.SCHEMA_VALIDATION_ERROR, { schemaName, error: error.format() })
	}
	captureDiffApplicationError(taskId, consecutiveMistakeCount) {
		this.captureEvent(TelemetryEventName.DIFF_APPLICATION_ERROR, { taskId, consecutiveMistakeCount })
	}
	captureShellIntegrationError(taskId) {
		this.captureEvent(TelemetryEventName.SHELL_INTEGRATION_ERROR, { taskId })
	}
	captureConsecutiveMistakeError(taskId) {
		this.captureEvent(TelemetryEventName.CONSECUTIVE_MISTAKE_ERROR, { taskId })
	}
	/**
	 * Captures when a tab is shown due to user action
	 * @param tab The tab that was shown
	 */
	captureTabShown(tab) {
		this.captureEvent(TelemetryEventName.TAB_SHOWN, { tab })
	}
	/**
	 * Captures when a setting is changed in ModesView
	 * @param settingName The name of the setting that was changed
	 */
	captureModeSettingChanged(settingName) {
		this.captureEvent(TelemetryEventName.MODE_SETTINGS_CHANGED, { settingName })
	}
	/**
	 * Captures when a user creates a new custom mode
	 * @param modeSlug The slug of the custom mode
	 * @param modeName The name of the custom mode
	 */
	captureCustomModeCreated(modeSlug, modeName) {
		this.captureEvent(TelemetryEventName.CUSTOM_MODE_CREATED, { modeSlug, modeName })
	}
	/**
	 * Captures a marketplace item installation event
	 * @param itemId The unique identifier of the marketplace item
	 * @param itemType The type of item (mode or mcp)
	 * @param itemName The human-readable name of the item
	 * @param target The installation target (project or global)
	 * @param properties Additional properties like hasParameters, installationMethod
	 */
	captureMarketplaceItemInstalled(itemId, itemType, itemName, target, properties) {
		this.captureEvent(TelemetryEventName.MARKETPLACE_ITEM_INSTALLED, {
			itemId,
			itemType,
			itemName,
			target,
			...(properties || {}),
		})
	}
	/**
	 * Captures a marketplace item removal event
	 * @param itemId The unique identifier of the marketplace item
	 * @param itemType The type of item (mode or mcp)
	 * @param itemName The human-readable name of the item
	 * @param target The removal target (project or global)
	 */
	captureMarketplaceItemRemoved(itemId, itemType, itemName, target) {
		this.captureEvent(TelemetryEventName.MARKETPLACE_ITEM_REMOVED, {
			itemId,
			itemType,
			itemName,
			target,
		})
	}
	/**
	 * Captures a title button click event
	 * @param button The button that was clicked
	 */
	captureTitleButtonClicked(button) {
		this.captureEvent(TelemetryEventName.TITLE_BUTTON_CLICKED, { button })
	}
	/**
	 * Captures when telemetry settings are changed
	 * @param previousSetting The previous telemetry setting
	 * @param newSetting The new telemetry setting
	 */
	captureTelemetrySettingsChanged(previousSetting, newSetting) {
		this.captureEvent(TelemetryEventName.TELEMETRY_SETTINGS_CHANGED, {
			previousSetting,
			newSetting,
		})
	}
	/**
	 * Checks if telemetry is currently enabled
	 * @returns Whether telemetry is enabled
	 */
	isTelemetryEnabled() {
		return this.isReady && this.clients.some((client) => client.isTelemetryEnabled())
	}
	async shutdown() {
		if (!this.isReady) {
			return
		}
		this.clients.forEach((client) => client.shutdown())
	}
	static _instance = null
	static createInstance(clients = []) {
		if (this._instance) {
			throw new Error("TelemetryService instance already created")
		}
		this._instance = new TelemetryService(clients)
		return this._instance
	}
	static get instance() {
		if (!this._instance) {
			throw new Error("TelemetryService not initialized")
		}
		return this._instance
	}
	static hasInstance() {
		return this._instance !== null
	}
}
