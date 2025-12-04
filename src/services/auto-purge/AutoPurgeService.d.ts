import {
	type AutoPurgeSettings,
	type TaskPurgeInfo,
	type PurgeResult,
	TaskType,
	type PurgeOptions,
	type HistoryItem,
} from "@roo-code/types"
/**
 * Service responsible for automatically purging old tasks to manage disk usage
 */
export declare class AutoPurgeService {
	private readonly globalStoragePath
	constructor(globalStoragePath: string)
	/**
	 * Main method to purge old tasks based on settings
	 */
	purgeOldTasks(
		settings: AutoPurgeSettings,
		taskHistory: HistoryItem[],
		currentTaskId?: string,
		options?: PurgeOptions,
		onTaskPurged?: (taskId: string) => Promise<void>,
	): Promise<PurgeResult>
	/**
	 * Get all tasks that are eligible for purging based on settings
	 */
	getTasksEligibleForPurge(
		settings: AutoPurgeSettings,
		taskHistory: HistoryItem[],
		currentTaskId?: string,
		options?: PurgeOptions,
	): Promise<TaskPurgeInfo[]>
	/**
	 * Classify a task based on its properties and completion status
	 */
	private classifyTask
	/**
	 * Check if a task is completed by examining its messages for completion_result
	 */
	private checkTaskCompletion
	/**
	 * Get retention days for a specific task type
	 */
	private getRetentionDaysForTaskType
	/**
	 * Delete all files associated with a task
	 */
	private deleteTaskFiles
	/**
	 * Get the size of a task directory in bytes
	 */
	private getTaskSizeBytes
	/**
	 * Check if a task is currently active/running
	 */
	private isTaskActive
	/**
	 * Get storage statistics for all tasks
	 */
	getTaskStorageStats(taskHistory: HistoryItem[]): Promise<{
		totalTasks: number
		totalSizeBytes: number
		tasksByType: Record<TaskType, number>
		oldestTaskTimestamp: number
		newestTaskTimestamp: number
	}>
}
//# sourceMappingURL=AutoPurgeService.d.ts.map
