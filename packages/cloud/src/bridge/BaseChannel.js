import * as vscode from "vscode"
/**
 * Abstract base class for communication channels in the bridge system.
 * Provides common functionality for bidirectional communication between
 * the VSCode extension and web application.
 *
 * @template TCommand - Type of commands this channel can receive.
 * @template TEvent - Type of events this channel can publish.
 */
export class BaseChannel {
	socket = null
	instanceId
	appProperties
	gitProperties
	isCloudAgent
	constructor(options) {
		this.instanceId = options.instanceId
		this.appProperties = options.appProperties
		this.gitProperties = options.gitProperties
		this.isCloudAgent = options.isCloudAgent
	}
	/**
	 * Called when socket connects.
	 */
	async onConnect(socket) {
		this.socket = socket
		await this.handleConnect(socket)
	}
	/**
	 * Called when socket disconnects.
	 */
	onDisconnect() {
		this.socket = null
		this.handleDisconnect()
	}
	/**
	 * Called when socket reconnects.
	 */
	async onReconnect(socket) {
		this.socket = socket
		await this.handleReconnect(socket)
	}
	/**
	 * Cleanup resources.
	 */
	async cleanup(socket) {
		if (socket) {
			await this.handleCleanup(socket)
		}
		this.socket = null
	}
	/**
	 * Emit a socket event with error handling.
	 */
	publish(eventName, data, callback) {
		if (!this.socket) {
			console.error(`[${this.constructor.name}#emit] socket not available for ${eventName}`)
			return false
		}
		try {
			// console.log(`[${this.constructor.name}#emit] emit() -> ${eventName}`, data)
			this.socket.emit(eventName, data, callback)
			return true
		} catch (error) {
			console.error(
				`[${this.constructor.name}#emit] emit() failed -> ${eventName}: ${error instanceof Error ? error.message : String(error)}`,
			)
			return false
		}
	}
	/**
	 * Handle incoming commands - template method that ensures common functionality
	 * is executed before subclass-specific logic.
	 *
	 * This method should be called by subclasses to handle commands.
	 * It will execute common functionality and then delegate to the abstract
	 * handleCommandImplementation method.
	 */
	async handleCommand(command) {
		// Common functionality: focus the sidebar.
		await vscode.commands.executeCommand(`${this.appProperties.appName}.SidebarProvider.focus`)
		// Delegate to subclass-specific implementation.
		await this.handleCommandImplementation(command)
	}
	/**
	 * Handle disconnection-specific logic.
	 */
	handleDisconnect() {
		// Default implementation - can be overridden.
	}
}
