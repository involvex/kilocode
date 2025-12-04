import { EventEmitter } from "events"
import { ExtensionHost, ExtensionAPI } from "../host/ExtensionHost.js"
import { MessageBridge } from "../communication/ipc.js"
import type { ExtensionMessage, WebviewMessage, ExtensionState, ModeConfig } from "../types/messages.js"
import type { IdentityInfo } from "../host/VSCode.js"
/**
 * Configuration options for ExtensionService
 */
export interface ExtensionServiceOptions {
	/** Workspace directory path */
	workspace?: string
	/** Initial mode to start with */
	mode?: string
	/** Custom modes configuration */
	customModes?: ModeConfig[]
	/** Custom extension bundle path (for testing) */
	extensionBundlePath?: string
	/** Custom extension root path (for testing) */
	extensionRootPath?: string
	/** Identity information for VSCode environment */
	identity?: IdentityInfo
}
/**
 * Events emitted by ExtensionService
 */
export interface ExtensionServiceEvents {
	/** Emitted when extension host is activated and ready */
	ready: (api: ExtensionAPI) => void
	/** Emitted when extension state changes */
	stateChange: (state: ExtensionState) => void
	/** Emitted when a message is received from extension */
	message: (message: ExtensionMessage) => void
	/** Emitted when an error occurs */
	error: (error: Error) => void
	/** Emitted when a recoverable warning occurs */
	warning: (warning: { context: string; error: Error }) => void
	/** Emitted when service is disposed */
	disposed: () => void
}
/**
 * Stateless service layer for managing ExtensionHost and MessageBridge.
 * This service handles the lifecycle of the extension host and provides
 * an event-driven interface for communication between the extension and UI.
 *
 * Key responsibilities:
 * - Initialize and manage ExtensionHost lifecycle
 * - Handle message bridging between extension and UI
 * - Emit events for state changes
 * - Provide methods for sending messages
 * - Remain completely stateless (no UI concerns)
 *
 * @example
 * ```typescript
 * const service = new ExtensionService({ workspace: '/path/to/workspace' })
 *
 * service.on('ready', (api) => {
 *   console.log('Extension ready')
 * })
 *
 * service.on('stateChange', (state) => {
 *   // Update UI state atoms
 * })
 *
 * await service.initialize()
 * await service.sendWebviewMessage({ type: 'askResponse', text: 'Hello' })
 * ```
 */
export declare class ExtensionService extends EventEmitter {
	private extensionHost
	private messageBridge
	private options
	private isInitialized
	private isDisposed
	private isActivated
	constructor(options?: ExtensionServiceOptions)
	/**
	 * Setup all event handlers for extension host and message bridge
	 */
	private setupEventHandlers
	/**
	 * Handle TUI messages and return response
	 */
	private handleTUIMessage
	/**
	 * Initialize the extension service
	 * This activates the extension host and prepares the service for use
	 *
	 * @throws {Error} If initialization fails
	 */
	initialize(): Promise<void>
	/**
	 * Send a webview message to the extension
	 *
	 * @param message - The webview message to send
	 * @throws {Error} If service is not initialized or disposed
	 */
	sendWebviewMessage(message: WebviewMessage): Promise<void>
	/**
	 * Request a single completion from the extension
	 *
	 * @param prompt - The prompt text to complete
	 * @param timeoutMs - Request timeout in milliseconds (default: 60000)
	 * @returns Promise resolving to the completed text
	 */
	requestSingleCompletion(prompt: string, timeoutMs?: number): Promise<string>
	/**
	 * Get the current extension state
	 *
	 * @returns The current extension state or null if not available
	 */
	getState(): ExtensionState | null
	/**
	 * Get the message bridge instance
	 * This is useful for direct access to IPC channels
	 *
	 * @returns The message bridge instance
	 */
	getMessageBridge(): MessageBridge
	/**
	 * Get the extension host instance
	 * This is useful for advanced operations
	 *
	 * @returns The extension host instance
	 */
	getExtensionHost(): ExtensionHost
	/**
	 * Get the extension API
	 *
	 * @returns The extension API or null if not initialized
	 */
	getExtensionAPI(): ExtensionAPI | null
	/**
	 * Get the health status of the extension
	 *
	 * @returns The extension health status or null if not available
	 */
	getExtensionHealth(): {
		isHealthy: boolean
		errorCount: number
		lastError: Error | null
	} | null
	/**
	 * Check if the service is initialized and activated
	 */
	isReady(): boolean
	/**
	 * Dispose the extension service and clean up resources
	 * This deactivates the extension host and removes all listeners
	 */
	dispose(): Promise<void>
	/**
	 * Type-safe event emitter methods
	 */
	on<K extends keyof ExtensionServiceEvents>(event: K, listener: ExtensionServiceEvents[K]): this
	once<K extends keyof ExtensionServiceEvents>(event: K, listener: ExtensionServiceEvents[K]): this
	emit<K extends keyof ExtensionServiceEvents>(event: K, ...args: Parameters<ExtensionServiceEvents[K]>): boolean
	off<K extends keyof ExtensionServiceEvents>(event: K, listener: ExtensionServiceEvents[K]): this
}
/**
 * Factory function to create an ExtensionService instance
 *
 * @param options - Configuration options for the service
 * @returns A new ExtensionService instance
 */
export declare function createExtensionService(options?: ExtensionServiceOptions): ExtensionService
//# sourceMappingURL=extension.d.ts.map
