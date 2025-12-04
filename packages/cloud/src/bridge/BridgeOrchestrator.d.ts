import { type TaskProviderLike, type TaskLike, type CloudUserInfo, ConnectionState } from "@roo-code/types"
export interface BridgeOrchestratorOptions {
	userId: string
	socketBridgeUrl: string
	token: string
	provider: TaskProviderLike
	sessionId: string
	isCloudAgent: boolean
}
/**
 * Central orchestrator for the extension bridge system.
 * Coordinates communication between the VSCode extension and web application
 * through WebSocket connections and manages extension/task channels.
 */
export declare class BridgeOrchestrator {
	private static instance
	private static pendingTask
	private readonly userId
	private readonly socketBridgeUrl
	private readonly token
	private readonly provider
	private readonly instanceId
	private readonly appProperties
	private readonly gitProperties?
	private readonly isCloudAgent?
	private socketTransport
	private extensionChannel
	private taskChannel
	private readonly MAX_RECONNECT_ATTEMPTS
	private readonly RECONNECT_DELAY
	private readonly RECONNECT_DELAY_MAX
	static getInstance(): BridgeOrchestrator | null
	static isEnabled(user: CloudUserInfo | null, remoteControlEnabled: boolean): boolean
	static connectOrDisconnect(
		userInfo: CloudUserInfo,
		remoteControlEnabled: boolean,
		options: BridgeOrchestratorOptions,
	): Promise<void>
	static connect(options: BridgeOrchestratorOptions): Promise<void>
	static disconnect(): Promise<void>
	/**
	 * @TODO: What if subtasks also get spawned? We'd probably want deferred
	 * subscriptions for those too.
	 */
	static subscribeToTask(task: TaskLike): Promise<void>
	private constructor()
	private setupSocketListeners
	private handleConnect
	private handleDisconnect
	private handleReconnect
	subscribeToTask(task: TaskLike): Promise<void>
	unsubscribeFromTask(taskId: string): Promise<void>
	get connectionState(): ConnectionState
	private connect
	disconnect(): Promise<void>
	reconnect(): Promise<void>
}
//# sourceMappingURL=BridgeOrchestrator.d.ts.map
