import { EventEmitter } from "events"
import { createExtensionHost } from "../host/ExtensionHost.js"
import { createMessageBridge } from "../communication/ipc.js"
import { logs } from "./logs.js"
import { resolveExtensionPaths } from "../utils/extension-paths.js"
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
export class ExtensionService extends EventEmitter {
	extensionHost
	messageBridge
	options
	isInitialized = false
	isDisposed = false
	isActivated = false
	constructor(options = {}) {
		super()
		// Resolve extension paths
		const extensionPaths = resolveExtensionPaths()
		// Set default options
		this.options = {
			workspace: options.workspace || process.cwd(),
			mode: options.mode || "code",
			extensionBundlePath: options.extensionBundlePath || extensionPaths.extensionBundlePath,
			extensionRootPath: options.extensionRootPath || extensionPaths.extensionRootPath,
			...(options.identity && { identity: options.identity }),
			...(options.customModes && { customModes: options.customModes }),
		}
		// Create extension host
		const hostOptions = {
			workspacePath: this.options.workspace,
			extensionBundlePath: this.options.extensionBundlePath,
			extensionRootPath: this.options.extensionRootPath,
		}
		if (this.options.identity) {
			hostOptions.identity = this.options.identity
		}
		if (this.options.customModes) {
			hostOptions.customModes = this.options.customModes
		}
		this.extensionHost = createExtensionHost(hostOptions)
		// Create message bridge
		this.messageBridge = createMessageBridge({
			enableLogging: false,
		})
		// Setup event handlers
		this.setupEventHandlers()
	}
	/**
	 * Setup all event handlers for extension host and message bridge
	 */
	setupEventHandlers() {
		// Extension host events
		this.extensionHost.on("activated", (api) => {
			logs.info("Extension host activated", "ExtensionService")
			this.isActivated = true
			this.emit("ready", api)
		})
		// Handle new extension-error events (non-fatal errors from extension)
		this.extensionHost.on("extension-error", (errorEvent) => {
			const { context, error, recoverable } = errorEvent
			if (recoverable) {
				logs.warn(`Recoverable extension error in ${context}`, "ExtensionService", { error })
				// Emit warning event instead of error to prevent crashes
				this.emit("warning", { context, error })
			} else {
				logs.error(`Critical extension error in ${context}`, "ExtensionService", { error })
				// Still emit error but don't crash
				this.emit("error", error)
			}
		})
		// Keep backward compatibility for "error" events but don't propagate to prevent crashes
		this.extensionHost.on("error", (error) => {
			logs.error("Extension host error (legacy)", "ExtensionService", { error })
			// Don't re-emit to prevent crashes
		})
		// Forward extension messages to message bridge and emit as events
		this.extensionHost.on("message", (message) => {
			// Send to message bridge for TUI consumption
			this.messageBridge.sendExtensionMessage(message)
			// Emit as event for direct consumption
			this.emit("message", message)
			// Emit state change events for state messages
			if (message.type === "state" && message.state) {
				this.emit("stateChange", message.state)
			}
		})
		// Setup proper message routing to avoid IPC timeouts
		this.messageBridge.getTUIChannel().on("message", async (ipcMessage) => {
			if (ipcMessage.type === "request") {
				try {
					const response = await this.handleTUIMessage(ipcMessage.data)
					this.messageBridge.getExtensionChannel().respond(ipcMessage.id, response)
				} catch (error) {
					this.messageBridge.getExtensionChannel().respond(ipcMessage.id, {
						error: error instanceof Error ? error.message : "Unknown error",
					})
				}
			}
		})
	}
	/**
	 * Handle TUI messages and return response
	 */
	async handleTUIMessage(data) {
		try {
			if (typeof data === "object" && data !== null && "type" in data) {
				const typedData = data
				if (typedData.type === "webviewMessage" && typedData.payload) {
					await this.extensionHost.sendWebviewMessage(typedData.payload)
					return { success: true }
				}
			}
			return { success: true }
		} catch (error) {
			logs.error("Error handling TUI message", "ExtensionService", { error })
			return { error: error instanceof Error ? error.message : "Unknown error" }
		}
	}
	/**
	 * Initialize the extension service
	 * This activates the extension host and prepares the service for use
	 *
	 * @throws {Error} If initialization fails
	 */
	async initialize() {
		if (this.isInitialized) {
			logs.warn("Extension service already initialized", "ExtensionService")
			return
		}
		if (this.isDisposed) {
			throw new Error("Cannot initialize disposed ExtensionService")
		}
		try {
			logs.info("Initializing Extension Service...", "ExtensionService")
			// Activate extension host
			await this.extensionHost.activate()
			this.isInitialized = true
			logs.info("Extension Service initialized successfully", "ExtensionService")
		} catch (error) {
			logs.error("Failed to initialize Extension Service", "ExtensionService", { error })
			throw error
		}
	}
	/**
	 * Send a webview message to the extension
	 *
	 * @param message - The webview message to send
	 * @throws {Error} If service is not initialized or disposed
	 */
	async sendWebviewMessage(message) {
		if (!this.isInitialized) {
			throw new Error("ExtensionService not initialized. Call initialize() first.")
		}
		if (!this.isActivated) {
			throw new Error("ExtensionService not ready. Extension host not activated yet.")
		}
		if (this.isDisposed) {
			throw new Error("Cannot send message on disposed ExtensionService")
		}
		try {
			await this.messageBridge.sendWebviewMessage(message)
		} catch (error) {
			logs.error("Error sending webview message", "ExtensionService", { error })
			throw error
		}
	}
	/**
	 * Request a single completion from the extension
	 *
	 * @param prompt - The prompt text to complete
	 * @param timeoutMs - Request timeout in milliseconds (default: 60000)
	 * @returns Promise resolving to the completed text
	 */
	async requestSingleCompletion(prompt, timeoutMs = 60000) {
		if (!this.isReady()) {
			throw new Error("ExtensionService not ready")
		}
		const completionRequestId = crypto.randomUUID()
		return new Promise((resolve, reject) => {
			// Setup timeout
			const timeoutId = setTimeout(() => {
				this.off("message", messageHandler)
				reject(new Error("Single completion request timed out"))
			}, timeoutMs)
			// Setup message handler
			const messageHandler = (message) => {
				if (message.type === "singleCompletionResult" && message.completionRequestId === completionRequestId) {
					clearTimeout(timeoutId)
					this.off("message", messageHandler)
					if (message.success && typeof message.completionText === "string") {
						resolve(message.completionText)
					} else {
						const errorMessage =
							typeof message.completionError === "string" ? message.completionError : "Unknown error"
						reject(new Error(errorMessage))
					}
				}
			}
			this.on("message", messageHandler)
			// Send request
			this.sendWebviewMessage({
				type: "singleCompletion",
				text: prompt,
				completionRequestId,
			}).catch((error) => {
				clearTimeout(timeoutId)
				this.off("message", messageHandler)
				reject(error)
			})
		})
	}
	/**
	 * Get the current extension state
	 *
	 * @returns The current extension state or null if not available
	 */
	getState() {
		if (!this.isInitialized) {
			return null
		}
		const api = this.extensionHost.getAPI()
		return api.getState()
	}
	/**
	 * Get the message bridge instance
	 * This is useful for direct access to IPC channels
	 *
	 * @returns The message bridge instance
	 */
	getMessageBridge() {
		return this.messageBridge
	}
	/**
	 * Get the extension host instance
	 * This is useful for advanced operations
	 *
	 * @returns The extension host instance
	 */
	getExtensionHost() {
		return this.extensionHost
	}
	/**
	 * Get the extension API
	 *
	 * @returns The extension API or null if not initialized
	 */
	getExtensionAPI() {
		if (!this.isInitialized) {
			return null
		}
		return this.extensionHost.getAPI()
	}
	/**
	 * Get the health status of the extension
	 *
	 * @returns The extension health status or null if not available
	 */
	getExtensionHealth() {
		if (!this.extensionHost) {
			return null
		}
		return this.extensionHost.extensionHealth || null
	}
	/**
	 * Check if the service is initialized and activated
	 */
	isReady() {
		return this.isInitialized && this.isActivated && !this.isDisposed
	}
	/**
	 * Dispose the extension service and clean up resources
	 * This deactivates the extension host and removes all listeners
	 */
	async dispose() {
		if (this.isDisposed) {
			logs.warn("Extension service already disposed", "ExtensionService")
			return
		}
		try {
			logs.info("Disposing Extension Service...", "ExtensionService")
			// Dispose message bridge
			this.messageBridge.dispose()
			// Deactivate extension host
			await this.extensionHost.deactivate()
			// Remove all listeners
			this.removeAllListeners()
			this.isDisposed = true
			this.isInitialized = false
			this.isActivated = false
			// Emit disposed event
			this.emit("disposed")
			logs.info("Extension Service disposed", "ExtensionService")
		} catch (error) {
			logs.error("Error disposing Extension Service", "ExtensionService", { error })
			throw error
		}
	}
	/**
	 * Type-safe event emitter methods
	 */
	on(event, listener) {
		return super.on(event, listener)
	}
	once(event, listener) {
		return super.once(event, listener)
	}
	emit(event, ...args) {
		return super.emit(event, ...args)
	}
	off(event, listener) {
		return super.off(event, listener)
	}
}
/**
 * Factory function to create an ExtensionService instance
 *
 * @param options - Configuration options for the service
 * @returns A new ExtensionService instance
 */
export function createExtensionService(options = {}) {
	return new ExtensionService(options)
}
