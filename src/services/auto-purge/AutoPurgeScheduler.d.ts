import { type AutoPurgeSettings, type HistoryItem } from "@roo-code/types"
/**
 * Scheduler for automatic task purging operations
 */
export declare class AutoPurgeScheduler {
	private readonly autoPurgeService
	private scheduledTimeout?
	private isRunning
	private static readonly PURGE_INTERVAL_MS
	private static readonly STARTUP_DELAY_MS
	constructor(globalStoragePath: string)
	/**
	 * Start the auto-purge scheduler
	 */
	start(
		getSettings: () => Promise<AutoPurgeSettings>,
		getTaskHistory: () => Promise<HistoryItem[]>,
		getCurrentTaskId?: () => string | undefined,
		onTaskPurged?: (taskId: string) => Promise<void>,
	): void
	/**
	 * Stop the auto-purge scheduler
	 */
	stop(): void
	/**
	 * Manually trigger a purge operation
	 */
	triggerManualPurge(
		settings: AutoPurgeSettings,
		taskHistory: HistoryItem[],
		currentTaskId?: string,
		onTaskPurged?: (taskId: string) => Promise<void>,
	): Promise<void>
	/**
	 * Run the scheduled purge check
	 */
	private runScheduledPurge
	/**
	 * Execute the actual purge operation
	 */
	private executePurge
	/**
	 * Schedule the next purge check
	 */
	private scheduleNext
	/**
	 * Get the status of the scheduler
	 */
	getStatus(): {
		isRunning: boolean
		isScheduled: boolean
		nextRunTime?: number
	}
}
//# sourceMappingURL=AutoPurgeScheduler.d.ts.map
