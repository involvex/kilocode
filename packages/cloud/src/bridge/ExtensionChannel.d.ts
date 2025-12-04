import type { Socket } from "socket.io-client"
import {
	type TaskProviderLike,
	type ExtensionInstance,
	type ExtensionBridgeCommand,
	type ExtensionBridgeEvent,
	ExtensionSocketEvents,
} from "@roo-code/types"
import { type BaseChannelOptions, BaseChannel } from "./BaseChannel.js"
interface ExtensionChannelOptions extends BaseChannelOptions {
	userId: string
	provider: TaskProviderLike
}
/**
 * Manages the extension-level communication channel.
 * Handles extension registration, heartbeat, and extension-specific commands.
 */
export declare class ExtensionChannel extends BaseChannel<
	ExtensionBridgeCommand,
	ExtensionSocketEvents,
	ExtensionBridgeEvent | ExtensionInstance
> {
	private userId
	private provider
	private extensionInstance
	private heartbeatInterval
	private eventListeners
	constructor(options: ExtensionChannelOptions)
	protected handleCommandImplementation(command: ExtensionBridgeCommand): Promise<void>
	protected handleConnect(socket: Socket): Promise<void>
	protected handleReconnect(socket: Socket): Promise<void>
	protected handleDisconnect(): void
	protected handleCleanup(socket: Socket): Promise<void>
	private registerInstance
	private unregisterInstance
	private startHeartbeat
	private stopHeartbeat
	private setupListeners
	private cleanupListeners
	private updateInstance
}
export {}
//# sourceMappingURL=ExtensionChannel.d.ts.map
