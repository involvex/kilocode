import { z } from "zod"
import { ModelInfo } from "@roo-code/types"
export declare const openRouterModelSchema: z.ZodObject<
	{
		id: z.ZodString
		name: z.ZodString
		description: z.ZodString
		created: z.ZodNumber
		context_length: z.ZodNumber
		pricing: z.ZodObject<
			{
				prompt: z.ZodOptional<z.ZodString>
				completion: z.ZodOptional<z.ZodString>
			},
			"strip",
			z.ZodTypeAny,
			{
				prompt?: string | undefined
				completion?: string | undefined
			},
			{
				prompt?: string | undefined
				completion?: string | undefined
			}
		>
		top_provider: z.ZodOptional<
			z.ZodObject<
				{
					max_completion_tokens: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
				},
				"strip",
				z.ZodTypeAny,
				{
					max_completion_tokens?: number | null | undefined
				},
				{
					max_completion_tokens?: number | null | undefined
				}
			>
		>
		architecture: z.ZodOptional<
			z.ZodObject<
				{
					input_modalities: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>
					output_modalities: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>
				},
				"strip",
				z.ZodTypeAny,
				{
					input_modalities?: string[] | null | undefined
					output_modalities?: string[] | null | undefined
				},
				{
					input_modalities?: string[] | null | undefined
					output_modalities?: string[] | null | undefined
				}
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		id: string
		created: number
		name: string
		description: string
		pricing: {
			prompt?: string | undefined
			completion?: string | undefined
		}
		context_length: number
		architecture?:
			| {
					input_modalities?: string[] | null | undefined
					output_modalities?: string[] | null | undefined
			  }
			| undefined
		top_provider?:
			| {
					max_completion_tokens?: number | null | undefined
			  }
			| undefined
	},
	{
		id: string
		created: number
		name: string
		description: string
		pricing: {
			prompt?: string | undefined
			completion?: string | undefined
		}
		context_length: number
		architecture?:
			| {
					input_modalities?: string[] | null | undefined
					output_modalities?: string[] | null | undefined
			  }
			| undefined
		top_provider?:
			| {
					max_completion_tokens?: number | null | undefined
			  }
			| undefined
	}
>
export type OpenRouterModel = z.infer<typeof openRouterModelSchema>
export type OpenRouterModelRecord = Record<
	string,
	OpenRouterModel & {
		modelInfo: ModelInfo
	}
>
export declare const getOpenRouterModels: () => Promise<OpenRouterModelRecord>
export declare const useOpenRouterModels: () => import("@tanstack/react-query").UseQueryResult<
	OpenRouterModelRecord,
	Error
>
//# sourceMappingURL=use-open-router-models.d.ts.map
