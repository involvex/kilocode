import { z } from "zod"
/**
 * ExperimentId
 */
const kilocodeExperimentIds = ["morphFastApply"]
export const experimentIds = [
	"powerSteering",
	"multiFileApplyDiff",
	"preventFocusDisruption",
	"imageGeneration",
	"runSlashCommand",
]
export const experimentIdsSchema = z.enum([...experimentIds, ...kilocodeExperimentIds])
/**
 * Experiments
 */
export const experimentsSchema = z.object({
	morphFastApply: z.boolean().optional(), // kilocode_change
	powerSteering: z.boolean().optional(),
	multiFileApplyDiff: z.boolean().optional(),
	preventFocusDisruption: z.boolean().optional(),
	imageGeneration: z.boolean().optional(),
	runSlashCommand: z.boolean().optional(),
})
