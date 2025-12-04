import type { Socket } from "socket.io-client"
import type { StaticAppProperties, GitProperties } from "@roo-code/types"
export interface BaseChannelOptions {
	instanceId: string
	appProperties: StaticAppProperties
	gitProperties?: GitProperties
	isCloudAgent: boolean
}
/**
 * Abstract base class for communication channels in the bridge system.
 * Provides common functionality for bidirectional communication between
 * the VSCode extension and web application.
 *
 * @template TCommand - Type of commands this channel can receive.
 * @template TEvent - Type of events this channel can publish.
 */
export declare abstract class BaseChannel<
	TCommand = unknown,
	TEventName extends string = string,
	TEventData = unknown,
> {
	protected socket: Socket | null
	protected readonly instanceId: string
	protected readonly appProperties: StaticAppProperties
	protected readonly gitProperties?: GitProperties
	protected readonly isCloudAgent: boolean
	constructor(options: BaseChannelOptions)
	/**
	 * Called when socket connects.
	 */
	onConnect(socket: Socket): Promise<void>
	/**
	 * Called when socket disconnects.
	 */
	onDisconnect(): void
	/**
	 * Called when socket reconnects.
	 */
	onReconnect(socket: Socket): Promise<void>
	/**
	 * Cleanup resources.
	 */
	cleanup(socket: Socket | null): Promise<void>
	/**
	 * Emit a socket event with error handling.
	 */
	protected publish<Params extends object>(
		eventName: TEventName,
		data: TEventData,
		callback?: (params: Params) => void,
	): boolean
	/**
	 * Handle incoming commands - template method that ensures common functionality
	 * is executed before subclass-specific logic.
	 *
	 * This method should be called by subclasses to handle commands.
	 * It will execute common functionality and then delegate to the abstract
	 * handleCommandImplementation method.
	 */
	handleCommand(command: TCommand): Promise<void>
	/**
	 * Handle command-specific logic - must be implemented by subclasses.
	 * This method is called after common functionality has been executed.
	 */
	protected abstract handleCommandImplementation(command: TCommand): Promise<void>
	/**
	 * Handle connection-specific logic.
	 */
	protected abstract handleConnect(socket: Socket): Promise<void>
	/**
	 * Handle disconnection-specific logic.
	 */
	protected handleDisconnect(): void
	/**
	 * Handle reconnection-specific logic.
	 */
	protected abstract handleReconnect(socket: Socket): Promise<void>
	/**
	 * Handle cleanup-specific logic.
	 */
	protected abstract handleCleanup(socket: Socket): Promise<void>
}
//# sourceMappingURL=BaseChannel.d.ts.map
