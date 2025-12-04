import { createStore } from "jotai"
import { ExtensionService } from "./services/extension.js"
import type { CLIOptions } from "./types/cli.js"
/**
 * Main application class that orchestrates the CLI lifecycle
 */
export declare class CLI {
	private service
	private store
	private ui
	private options
	private isInitialized
	private sessionService
	constructor(options?: CLIOptions)
	/**
	 * Initialize the application
	 * - Creates ExtensionService
	 * - Sets up Jotai store
	 * - Initializes service through effects
	 */
	initialize(): Promise<void>
	/**
	 * Start the application
	 * - Initializes if not already done
	 * - Renders the UI
	 * - Waits for exit
	 */
	start(): Promise<void>
	/**
	 * Apply provider and model overrides from CLI options
	 */
	private applyProviderModelOverrides
	private isDisposing
	/**
	 * Dispose the application and clean up resources
	 * - Unmounts UI
	 * - Disposes service
	 * - Cleans up store
	 */
	dispose(signal?: string): Promise<void>
	/**
	 * Inject CLI configuration into the extension host
	 */
	private injectConfigurationToExtension
	/**
	 * Request router models from the extension
	 */
	private requestRouterModels
	/**
	 * Fetch notifications from Kilocode backend if provider is kilocode
	 */
	private fetchNotifications
	/**
	 * Resume the last conversation from the current workspace
	 */
	private resumeLastConversation
	/**
	 * Get the ExtensionService instance
	 */
	getService(): ExtensionService | null
	/**
	 * Get the Jotai store instance
	 */
	getStore(): ReturnType<typeof createStore> | null
	/**
	 * Check if the application is initialized
	 */
	isReady(): boolean
}
//# sourceMappingURL=cli.d.ts.map
