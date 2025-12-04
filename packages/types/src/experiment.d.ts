import { z } from "zod"
export declare const experimentIds: readonly [
	"powerSteering",
	"multiFileApplyDiff",
	"preventFocusDisruption",
	"imageGeneration",
	"runSlashCommand",
]
export declare const experimentIdsSchema: z.ZodEnum<
	[
		"powerSteering",
		"multiFileApplyDiff",
		"preventFocusDisruption",
		"imageGeneration",
		"runSlashCommand",
		"morphFastApply",
	]
>
export type ExperimentId = z.infer<typeof experimentIdsSchema>
/**
 * Experiments
 */
export declare const experimentsSchema: z.ZodObject<
	{
		morphFastApply: z.ZodOptional<z.ZodBoolean>
		powerSteering: z.ZodOptional<z.ZodBoolean>
		multiFileApplyDiff: z.ZodOptional<z.ZodBoolean>
		preventFocusDisruption: z.ZodOptional<z.ZodBoolean>
		imageGeneration: z.ZodOptional<z.ZodBoolean>
		runSlashCommand: z.ZodOptional<z.ZodBoolean>
	},
	"strip",
	z.ZodTypeAny,
	{
		morphFastApply?: boolean | undefined
		powerSteering?: boolean | undefined
		multiFileApplyDiff?: boolean | undefined
		preventFocusDisruption?: boolean | undefined
		imageGeneration?: boolean | undefined
		runSlashCommand?: boolean | undefined
	},
	{
		morphFastApply?: boolean | undefined
		powerSteering?: boolean | undefined
		multiFileApplyDiff?: boolean | undefined
		preventFocusDisruption?: boolean | undefined
		imageGeneration?: boolean | undefined
		runSlashCommand?: boolean | undefined
	}
>
export type Experiments = z.infer<typeof experimentsSchema>
//# sourceMappingURL=experiment.d.ts.map
