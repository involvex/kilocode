import { EventEmitter } from "events"
import type { ExtensionMessage, WebviewMessage } from "../types/messages.js"
export interface IPCMessage {
	id: string
	type: "request" | "response" | "event"
	data: unknown
	ts: number
}
export interface IPCOptions {
	timeout?: number
	enableLogging?: boolean
}
/**
 * Inter-Process Communication layer for CLI <-> Extension Host communication
 * Replicates the webview message passing pattern used in the VSCode extension
 */
export declare class IPCChannel extends EventEmitter {
	private pendingRequests
	private messageId
	private options
	constructor(options?: IPCOptions)
	/**
	 * Send a request message and wait for response
	 */
	request<T = unknown>(data: unknown): Promise<T>
	/**
	 * Send a response to a request
	 */
	respond(requestId: string, data: unknown): void
	/**
	 * Send an event message (no response expected)
	 */
	event(data: unknown): void
	/**
	 * Handle incoming messages
	 */
	handleMessage(message: IPCMessage): void
	private handleResponse
	private generateMessageId
	dispose(): void
}
/**
 * Message bridge that connects TUI and Extension Host
 * Handles bidirectional communication and message routing
 */
export declare class MessageBridge extends EventEmitter {
	private tuiChannel
	private extensionChannel
	constructor(options?: IPCOptions)
	/**
	 * Get the TUI-side IPC channel
	 */
	getTUIChannel(): IPCChannel
	/**
	 * Get the Extension-side IPC channel
	 */
	getExtensionChannel(): IPCChannel
	/**
	 * Send a webview message from TUI to extension
	 */
	sendWebviewMessage(message: WebviewMessage): Promise<unknown>
	/**
	 * Send an extension message from extension to TUI
	 */
	sendExtensionMessage(message: ExtensionMessage): Promise<void>
	dispose(): void
}
export declare function createMessageBridge(options?: IPCOptions): MessageBridge
//# sourceMappingURL=ipc.d.ts.map
