import type { Socket } from "socket.io-client"
import { type TaskLike, type TaskBridgeCommand, type TaskBridgeEvent, TaskSocketEvents } from "@roo-code/types"
import { type BaseChannelOptions, BaseChannel } from "./BaseChannel.js"
interface TaskChannelOptions extends BaseChannelOptions {}
/**
 * Manages task-level communication channels.
 * Handles task subscriptions, messaging, and task-specific commands.
 */
export declare class TaskChannel extends BaseChannel<
	TaskBridgeCommand,
	TaskSocketEvents,
	| TaskBridgeEvent
	| {
			taskId: string
	  }
> {
	private subscribedTasks
	private pendingTasks
	private taskListeners
	private readonly eventMapping
	constructor(options: TaskChannelOptions)
	protected handleCommandImplementation(command: TaskBridgeCommand): Promise<void>
	protected handleConnect(socket: Socket): Promise<void>
	protected handleReconnect(_socket: Socket): Promise<void>
	protected handleCleanup(socket: Socket): Promise<void>
	/**
	 * Add a task to the pending queue (will be subscribed when connected).
	 */
	addPendingTask(task: TaskLike): void
	subscribeToTask(task: TaskLike, _socket: Socket): Promise<void>
	unsubscribeFromTask(taskId: string, _socket: Socket): Promise<void>
	private setupTaskListeners
	private removeTaskListeners
}
export {}
//# sourceMappingURL=TaskChannel.d.ts.map
