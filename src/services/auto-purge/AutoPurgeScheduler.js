import * as vscode from "vscode"
import { AutoPurgeService } from "./AutoPurgeService"
import { TelemetryEventName } from "@roo-code/types"
import { TelemetryService } from "@roo-code/telemetry"
/**
 * Scheduler for automatic task purging operations
 */
export class AutoPurgeScheduler {
	autoPurgeService
	scheduledTimeout
	isRunning = false
	// Run purge check daily (24 hours)
	static PURGE_INTERVAL_MS = 24 * 60 * 60 * 1000
	// Wait 30 seconds after startup before first check
	static STARTUP_DELAY_MS = 30 * 1000
	constructor(globalStoragePath) {
		this.autoPurgeService = new AutoPurgeService(globalStoragePath)
	}
	/**
	 * Start the auto-purge scheduler
	 */
	start(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged) {
		console.log("[AutoPurgeScheduler] Starting scheduler")
		// Schedule initial check after startup delay
		this.scheduledTimeout = setTimeout(() => {
			this.runScheduledPurge(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged)
		}, AutoPurgeScheduler.STARTUP_DELAY_MS)
	}
	/**
	 * Stop the auto-purge scheduler
	 */
	stop() {
		console.log("[AutoPurgeScheduler] Stopping scheduler")
		if (this.scheduledTimeout) {
			clearTimeout(this.scheduledTimeout)
			this.scheduledTimeout = undefined
		}
	}
	/**
	 * Manually trigger a purge operation
	 */
	async triggerManualPurge(settings, taskHistory, currentTaskId, onTaskPurged) {
		if (this.isRunning) {
			console.log("[AutoPurgeScheduler] Purge already running, skipping manual trigger")
			return
		}
		console.log("[AutoPurgeScheduler] Manual purge triggered")
		TelemetryService.instance.captureEvent(TelemetryEventName.MANUAL_PURGE_TRIGGERED, {
			totalTasks: taskHistory.length,
		})
		await this.executePurge(settings, taskHistory, currentTaskId, false, onTaskPurged)
	}
	/**
	 * Run the scheduled purge check
	 */
	async runScheduledPurge(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged) {
		try {
			const settings = await getSettings()
			// Check if auto-purge is enabled
			if (!settings.enabled) {
				console.log("[AutoPurgeScheduler] Auto-purge disabled, skipping")
				this.scheduleNext(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged)
				return
			}
			// Check if enough time has passed since last purge
			const now = Date.now()
			const lastRun = settings.lastRunTimestamp || 0
			const timeSinceLastRun = now - lastRun
			// Only run if it's been at least 23 hours since last run (allow some flexibility)
			const minTimeBetweenRuns = 23 * 60 * 60 * 1000
			if (timeSinceLastRun < minTimeBetweenRuns) {
				console.log(
					`[AutoPurgeScheduler] Too soon since last run (${Math.round(timeSinceLastRun / (60 * 60 * 1000))} hours ago), skipping`,
				)
				this.scheduleNext(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged)
				return
			}
			const taskHistory = await getTaskHistory()
			const currentTaskId = getCurrentTaskId?.()
			await this.executePurge(settings, taskHistory, currentTaskId, true, onTaskPurged)
		} catch (error) {
			console.error("[AutoPurgeScheduler] Error in scheduled purge:", error)
			TelemetryService.instance.captureEvent(TelemetryEventName.AUTO_PURGE_FAILED, {
				error: error instanceof Error ? error.message : String(error),
				scheduled: true,
			})
		} finally {
			// Schedule next run
			this.scheduleNext(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged)
		}
	}
	/**
	 * Execute the actual purge operation
	 */
	async executePurge(settings, taskHistory, currentTaskId, isScheduled = false, onTaskPurged) {
		if (this.isRunning) {
			console.log("[AutoPurgeScheduler] Purge already running, skipping")
			return
		}
		this.isRunning = true
		try {
			TelemetryService.instance.captureEvent(TelemetryEventName.AUTO_PURGE_STARTED, {
				totalTasks: taskHistory.length,
				scheduled: isScheduled,
			})
			const result = await this.autoPurgeService.purgeOldTasks(
				settings,
				taskHistory,
				currentTaskId,
				{
					skipActiveTask: true,
					maxTasksToProcess: 100, // Limit to prevent excessive processing
				},
				onTaskPurged,
			)
			console.log(
				`[AutoPurgeScheduler] Purge completed: ${result.tasksSuccessfullyPurged} tasks purged, ${result.diskSpaceFreedBytes} bytes freed`,
			)
			// Show notification if significant cleanup occurred
			if (result.tasksSuccessfullyPurged > 0) {
				const freedMB = Math.round(result.diskSpaceFreedBytes / (1024 * 1024))
				const message = `Auto-purge cleaned up ${result.tasksSuccessfullyPurged} old tasks, freeing ${freedMB} MB of disk space.`
				vscode.window.showInformationMessage(message)
			}
		} catch (error) {
			console.error("[AutoPurgeScheduler] Purge execution failed:", error)
			throw error
		} finally {
			this.isRunning = false
		}
	}
	/**
	 * Schedule the next purge check
	 */
	scheduleNext(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged) {
		this.scheduledTimeout = setTimeout(() => {
			this.runScheduledPurge(getSettings, getTaskHistory, getCurrentTaskId, onTaskPurged)
		}, AutoPurgeScheduler.PURGE_INTERVAL_MS)
		console.log(
			`[AutoPurgeScheduler] Next purge check scheduled in ${AutoPurgeScheduler.PURGE_INTERVAL_MS / (60 * 60 * 1000)} hours`,
		)
	}
	/**
	 * Get the status of the scheduler
	 */
	getStatus() {
		return {
			isRunning: this.isRunning,
			isScheduled: !!this.scheduledTimeout,
			nextRunTime: this.scheduledTimeout ? Date.now() + AutoPurgeScheduler.PURGE_INTERVAL_MS : undefined,
		}
	}
}
//# sourceMappingURL=AutoPurgeScheduler.js.map
