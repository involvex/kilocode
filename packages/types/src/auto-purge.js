// kilocode_change - file added
import { z } from "zod"
/**
 * Auto-purge configuration schema
 */
export const autoPurgeSettingsSchema = z.object({
	enabled: z.boolean(),
	defaultRetentionDays: z.number().min(1),
	favoritedTaskRetentionDays: z.number().min(1).nullable(), // null = never purge
	completedTaskRetentionDays: z.number().min(1),
	incompleteTaskRetentionDays: z.number().min(1),
	lastRunTimestamp: z.number().optional(),
})
/**
 * Task classification for purge policies
 */
export var TaskType
;(function (TaskType) {
	TaskType["FAVORITED"] = "favorited"
	TaskType["COMPLETED"] = "completed"
	TaskType["INCOMPLETE"] = "incomplete"
	TaskType["REGULAR"] = "regular"
})(TaskType || (TaskType = {}))
