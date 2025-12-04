import { type Socket, type SocketOptions, type ManagerOptions } from "socket.io-client"
import { ConnectionState, type RetryConfig } from "@roo-code/types"
export interface SocketTransportOptions {
	url: string
	socketOptions: Partial<ManagerOptions & SocketOptions>
	onConnect?: () => void | Promise<void>
	onDisconnect?: (reason: string) => void
	onReconnect?: () => void | Promise<void>
	logger?: {
		log: (message: string, ...args: unknown[]) => void
		error: (message: string, ...args: unknown[]) => void
		warn: (message: string, ...args: unknown[]) => void
	}
}
/**
 * Manages the WebSocket transport layer for the bridge system.
 * Handles connection lifecycle, retries, and reconnection logic.
 */
export declare class SocketTransport {
	private socket
	private connectionState
	private retryTimeout
	private isPreviouslyConnected
	private readonly retryConfig
	private readonly CONNECTION_TIMEOUT
	private readonly options
	constructor(options: SocketTransportOptions, retryConfig?: Partial<RetryConfig>)
	connect(): Promise<void>
	private _connect
	disconnect(): Promise<void>
	getSocket(): Socket | null
	getConnectionState(): ConnectionState
	isConnected(): boolean
	reconnect(): Promise<void>
}
//# sourceMappingURL=SocketTransport.d.ts.map
