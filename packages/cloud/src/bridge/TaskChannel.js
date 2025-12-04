import { RooCodeEventName, TaskBridgeEventName, TaskBridgeCommandName, TaskSocketEvents } from "@roo-code/types"
import { BaseChannel } from "./BaseChannel.js"
/**
 * Manages task-level communication channels.
 * Handles task subscriptions, messaging, and task-specific commands.
 */
export class TaskChannel extends BaseChannel {
	subscribedTasks = new Map()
	pendingTasks = new Map()
	taskListeners = new Map()
	eventMapping = [
		{
			from: RooCodeEventName.Message,
			to: TaskBridgeEventName.Message,
			createPayload: (task, data) => ({
				type: TaskBridgeEventName.Message,
				taskId: task.taskId,
				action: data.action,
				message: data.message,
			}),
		},
		{
			from: RooCodeEventName.TaskModeSwitched,
			to: TaskBridgeEventName.TaskModeSwitched,
			createPayload: (task, mode) => ({
				type: TaskBridgeEventName.TaskModeSwitched,
				taskId: task.taskId,
				mode,
			}),
		},
		{
			from: RooCodeEventName.TaskInteractive,
			to: TaskBridgeEventName.TaskInteractive,
			createPayload: (task, _taskId) => ({
				type: TaskBridgeEventName.TaskInteractive,
				taskId: task.taskId,
			}),
		},
	]
	constructor(options) {
		super(options)
	}
	async handleCommandImplementation(command) {
		const task = this.subscribedTasks.get(command.taskId)
		if (!task) {
			console.error(`[TaskChannel] Unable to find task ${command.taskId}`)
			return
		}
		switch (command.type) {
			case TaskBridgeCommandName.Message:
				console.log(
					`[TaskChannel] ${TaskBridgeCommandName.Message} ${command.taskId} -> submitUserMessage()`,
					command,
				)
				await task.submitUserMessage(
					command.payload.text,
					command.payload.images,
					command.payload.mode,
					command.payload.providerProfile,
				)
				break
			case TaskBridgeCommandName.ApproveAsk:
				console.log(
					`[TaskChannel] ${TaskBridgeCommandName.ApproveAsk} ${command.taskId} -> approveAsk()`,
					command,
				)
				task.approveAsk(command.payload)
				break
			case TaskBridgeCommandName.DenyAsk:
				console.log(`[TaskChannel] ${TaskBridgeCommandName.DenyAsk} ${command.taskId} -> denyAsk()`, command)
				task.denyAsk(command.payload)
				break
		}
	}
	async handleConnect(socket) {
		// Rejoin all subscribed tasks.
		for (const taskId of this.subscribedTasks.keys()) {
			await this.publish(TaskSocketEvents.JOIN, { taskId })
		}
		// Subscribe to any pending tasks.
		for (const task of this.pendingTasks.values()) {
			await this.subscribeToTask(task, socket)
		}
		this.pendingTasks.clear()
	}
	async handleReconnect(_socket) {
		// Rejoin all subscribed tasks.
		for (const taskId of this.subscribedTasks.keys()) {
			await this.publish(TaskSocketEvents.JOIN, { taskId })
		}
	}
	async handleCleanup(socket) {
		const unsubscribePromises = []
		for (const taskId of this.subscribedTasks.keys()) {
			unsubscribePromises.push(this.unsubscribeFromTask(taskId, socket))
		}
		await Promise.allSettled(unsubscribePromises)
		this.subscribedTasks.clear()
		this.taskListeners.clear()
		this.pendingTasks.clear()
	}
	/**
	 * Add a task to the pending queue (will be subscribed when connected).
	 */
	addPendingTask(task) {
		this.pendingTasks.set(task.taskId, task)
	}
	async subscribeToTask(task, _socket) {
		const taskId = task.taskId
		await this.publish(TaskSocketEvents.JOIN, { taskId }, (response) => {
			if (response.success) {
				console.log(`[TaskChannel#subscribeToTask] subscribed to ${taskId}`)
				this.subscribedTasks.set(taskId, task)
				this.setupTaskListeners(task)
			} else {
				console.error(`[TaskChannel#subscribeToTask] failed to subscribe to ${taskId}: ${response.error}`)
			}
		})
	}
	async unsubscribeFromTask(taskId, _socket) {
		const task = this.subscribedTasks.get(taskId)
		if (!task) {
			return
		}
		await this.publish(TaskSocketEvents.LEAVE, { taskId }, (response) => {
			if (response.success) {
				console.log(`[TaskChannel#unsubscribeFromTask] unsubscribed from ${taskId}`)
			} else {
				console.error(`[TaskChannel#unsubscribeFromTask] failed to unsubscribe from ${taskId}`)
			}
			// If we failed to unsubscribe then something is probably wrong and
			// we should still discard this task from `subscribedTasks`.
			this.removeTaskListeners(task)
			this.subscribedTasks.delete(taskId)
		})
	}
	setupTaskListeners(task) {
		if (this.taskListeners.has(task.taskId)) {
			console.warn(`[TaskChannel] Listeners already exist for task, removing old listeners for ${task.taskId}`)
			this.removeTaskListeners(task)
		}
		const listeners = new Map()
		this.eventMapping.forEach(({ from, to, createPayload }) => {
			const listener = (...args) => {
				const payload = createPayload(task, ...args)
				this.publish(TaskSocketEvents.EVENT, payload)
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			task.on(from, listener)
			listeners.set(to, listener)
		})
		this.taskListeners.set(task.taskId, listeners)
	}
	removeTaskListeners(task) {
		const listeners = this.taskListeners.get(task.taskId)
		if (!listeners) {
			return
		}
		this.eventMapping.forEach(({ from, to }) => {
			const listener = listeners.get(to)
			if (listener) {
				try {
					task.off(from, listener) // eslint-disable-line @typescript-eslint/no-explicit-any
				} catch (error) {
					console.error(
						`[TaskChannel] task.off(${from}) failed for task ${task.taskId}: ${error instanceof Error ? error.message : String(error)}`,
					)
				}
			}
		})
		this.taskListeners.delete(task.taskId)
	}
}
