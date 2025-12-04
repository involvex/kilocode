import { z } from "zod"
import type { ModelInfo } from "@roo-code/types"
export declare const nanoGptModelSchema: z.ZodObject<
	{
		id: z.ZodString
		object: z.ZodOptional<z.ZodString>
		created: z.ZodOptional<z.ZodNumber>
		owned_by: z.ZodOptional<z.ZodString>
		name: z.ZodOptional<z.ZodString>
		description: z.ZodOptional<z.ZodString>
		context_length: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		capabilities: z.ZodOptional<
			z.ZodObject<
				{
					vision: z.ZodOptional<z.ZodBoolean>
				},
				"strip",
				z.ZodTypeAny,
				{
					vision?: boolean | undefined
				},
				{
					vision?: boolean | undefined
				}
			>
		>
		pricing: z.ZodOptional<
			z.ZodObject<
				{
					prompt: z.ZodOptional<z.ZodNumber>
					completion: z.ZodOptional<z.ZodNumber>
					currency: z.ZodOptional<z.ZodString>
					unit: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					prompt?: number | undefined
					completion?: number | undefined
					currency?: string | undefined
					unit?: string | undefined
				},
				{
					prompt?: number | undefined
					completion?: number | undefined
					currency?: string | undefined
					unit?: string | undefined
				}
			>
		>
		cost_estimate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		icon_url: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		id: string
		object?: string | undefined
		created?: number | undefined
		name?: string | undefined
		description?: string | undefined
		owned_by?: string | undefined
		pricing?:
			| {
					prompt?: number | undefined
					completion?: number | undefined
					currency?: string | undefined
					unit?: string | undefined
			  }
			| undefined
		capabilities?:
			| {
					vision?: boolean | undefined
			  }
			| undefined
		context_length?: number | null | undefined
		cost_estimate?: number | null | undefined
		icon_url?: string | undefined
	},
	{
		id: string
		object?: string | undefined
		created?: number | undefined
		name?: string | undefined
		description?: string | undefined
		owned_by?: string | undefined
		pricing?:
			| {
					prompt?: number | undefined
					completion?: number | undefined
					currency?: string | undefined
					unit?: string | undefined
			  }
			| undefined
		capabilities?:
			| {
					vision?: boolean | undefined
			  }
			| undefined
		context_length?: number | null | undefined
		cost_estimate?: number | null | undefined
		icon_url?: string | undefined
	}
>
export type NanoGptModel = z.infer<typeof nanoGptModelSchema>
/**
 * getNanoGptModels
 */
export declare function getNanoGptModels(options?: {
	nanoGptModelList?: "all" | "personalized" | "subscription"
	apiKey?: string
	headers?: Record<string, string>
}): Promise<Record<string, ModelInfo>>
/**
 * parseNanoGptModel
 *
 * Parses detailed model information from Nano-GPT API.
 * Pricing is in USD per million tokens.
 */
export declare const parseNanoGptModel: ({
	model,
	displayName,
}: {
	model: NanoGptModel
	displayName?: string
}) => ModelInfo
//# sourceMappingURL=nano-gpt.d.ts.map
