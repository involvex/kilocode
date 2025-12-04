import { EventEmitter } from "events"
import { type IdentityInfo } from "./VSCode.js"
import type { ExtensionMessage, WebviewMessage, ExtensionState, ModeConfig } from "../types/messages.js"
export interface ExtensionHostOptions {
	workspacePath: string
	extensionBundlePath: string
	extensionRootPath: string
	identity?: IdentityInfo
	customModes?: ModeConfig[]
}
interface WebviewProvider {
	handleCLIMessage?: (message: WebviewMessage) => Promise<void>
	[key: string]: unknown
}
export interface ExtensionAPI {
	getState: () => ExtensionState | null
	sendMessage: (message: ExtensionMessage) => void
	updateState: (updates: Partial<ExtensionState>) => void
}
export declare class ExtensionHost extends EventEmitter {
	private options
	private isActivated
	private currentState
	private extensionModule
	private extensionAPI
	private vscodeAPI
	private webviewProviders
	private webviewInitialized
	private pendingMessages
	private isInitialSetup
	private originalConsole
	private lastWebviewLaunchTime
	private extensionHealth
	private unhandledRejectionHandler
	private uncaughtExceptionHandler
	constructor(options: ExtensionHostOptions)
	/**
	 * Setup global error handlers to catch unhandled errors from extension
	 */
	private setupGlobalErrorHandlers
	/**
	 * Remove global error handlers
	 */
	private removeGlobalErrorHandlers
	/**
	 * Safely execute an operation, catching and logging any errors without crashing the CLI
	 */
	private safeExecute
	/**
	 * Check if an error is expected (e.g., task abortion)
	 */
	private isExpectedError
	activate(): Promise<ExtensionAPI>
	deactivate(): Promise<void>
	sendWebviewMessage(message: WebviewMessage): Promise<void>
	private setupVSCodeAPIMock
	private setupConsoleInterception
	private restoreConsole
	private loadExtension
	private activateExtension
	private setupExtensionMessageListener
	private initializeState
	private handleWebviewLaunch
	/**
	 * Handle local state updates for CLI display purposes after forwarding to extension
	 */
	private handleLocalStateUpdates
	private broadcastStateUpdate
	getAPI(): ExtensionAPI
	/**
	 * Send configuration sync messages to the extension
	 * This is the shared logic used by both injectConfiguration and external sync calls
	 */
	syncConfigurationMessages(configState: Partial<ExtensionState>): Promise<void>
	/**
	 * Inject CLI configuration into the extension state
	 * This should be called after the CLI config is loaded
	 */
	injectConfiguration(configState: Partial<ExtensionState>): Promise<void>
	registerWebviewProvider(viewId: string, provider: WebviewProvider): void
	unregisterWebviewProvider(viewId: string): void
	/**
	 * Mark webview as ready and flush pending messages
	 * Called by VSCode mock after resolveWebviewView completes
	 */
	markWebviewReady(): void
	/**
	 * Flush all pending messages that were queued before webview was ready
	 */
	private flushPendingMessages
	/**
	 * Check if webview is ready to receive messages
	 */
	isWebviewReady(): boolean
	/**
	 * Check if this is the initial setup phase
	 */
	isInInitialSetup(): boolean
}
export declare function createExtensionHost(options: ExtensionHostOptions): ExtensionHost
export {}
//# sourceMappingURL=ExtensionHost.d.ts.map
