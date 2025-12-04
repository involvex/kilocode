import { z } from "zod"
import type { HistoryItem } from "./history.js"
/**
 * Auto-purge configuration schema
 */
export declare const autoPurgeSettingsSchema: z.ZodObject<
	{
		enabled: z.ZodBoolean
		defaultRetentionDays: z.ZodNumber
		favoritedTaskRetentionDays: z.ZodNullable<z.ZodNumber>
		completedTaskRetentionDays: z.ZodNumber
		incompleteTaskRetentionDays: z.ZodNumber
		lastRunTimestamp: z.ZodOptional<z.ZodNumber>
	},
	"strip",
	z.ZodTypeAny,
	{
		enabled: boolean
		defaultRetentionDays: number
		favoritedTaskRetentionDays: number | null
		completedTaskRetentionDays: number
		incompleteTaskRetentionDays: number
		lastRunTimestamp?: number | undefined
	},
	{
		enabled: boolean
		defaultRetentionDays: number
		favoritedTaskRetentionDays: number | null
		completedTaskRetentionDays: number
		incompleteTaskRetentionDays: number
		lastRunTimestamp?: number | undefined
	}
>
export type AutoPurgeSettings = z.infer<typeof autoPurgeSettingsSchema>
/**
 * Task classification for purge policies
 */
export declare enum TaskType {
	FAVORITED = "favorited",
	COMPLETED = "completed",
	INCOMPLETE = "incomplete",
	REGULAR = "regular",
}
/**
 * Information about a task eligible for purging
 */
export interface TaskPurgeInfo {
	taskId: string
	historyItem: HistoryItem
	taskType: TaskType
	ageInDays: number
	shouldPurge: boolean
	retentionDays: number
	taskDirectoryPath: string
}
/**
 * Result of a purge operation
 */
export interface PurgeResult {
	totalTasksScanned: number
	tasksEligibleForPurge: number
	tasksSuccessfullyPurged: number
	tasksPurgeErrors: number
	diskSpaceFreedBytes: number
	errors: PurgeError[]
	duration: number
	timestamp: number
}
/**
 * Error information for failed purge operations
 */
export interface PurgeError {
	taskId: string
	error: string
	operation: "delete_files" | "remove_history" | "classify_task"
}
/**
 * Options for purge operations
 */
export interface PurgeOptions {
	dryRun?: boolean
	maxTasksToProcess?: number
	skipActiveTask?: boolean
}
/**
 * Statistics about task storage
 */
export interface TaskStorageStats {
	totalTasks: number
	totalSizeBytes: number
	tasksByType: Record<TaskType, number>
	oldestTaskTimestamp: number
	newestTaskTimestamp: number
}
//# sourceMappingURL=auto-purge.d.ts.map
