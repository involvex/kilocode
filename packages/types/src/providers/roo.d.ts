import { z } from "zod"
/**
 * Roo Code Cloud is a dynamic provider - models are loaded from the /v1/models API endpoint.
 * Default model ID used as fallback when no model is specified.
 */
export declare const rooDefaultModelId = "xai/grok-code-fast-1"
/**
 * Empty models object maintained for type compatibility.
 * All model data comes dynamically from the API.
 */
export declare const rooModels: {}
/**
 * Roo Code Cloud API response schemas
 */
export declare const RooPricingSchema: z.ZodObject<
	{
		input: z.ZodString
		output: z.ZodString
		input_cache_read: z.ZodOptional<z.ZodString>
		input_cache_write: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		input: string
		output: string
		input_cache_read?: string | undefined
		input_cache_write?: string | undefined
	},
	{
		input: string
		output: string
		input_cache_read?: string | undefined
		input_cache_write?: string | undefined
	}
>
export declare const RooModelSchema: z.ZodObject<
	{
		id: z.ZodString
		object: z.ZodLiteral<"model">
		created: z.ZodNumber
		owned_by: z.ZodString
		name: z.ZodString
		description: z.ZodString
		context_window: z.ZodNumber
		max_tokens: z.ZodNumber
		type: z.ZodLiteral<"language">
		tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		pricing: z.ZodObject<
			{
				input: z.ZodString
				output: z.ZodString
				input_cache_read: z.ZodOptional<z.ZodString>
				input_cache_write: z.ZodOptional<z.ZodString>
			},
			"strip",
			z.ZodTypeAny,
			{
				input: string
				output: string
				input_cache_read?: string | undefined
				input_cache_write?: string | undefined
			},
			{
				input: string
				output: string
				input_cache_read?: string | undefined
				input_cache_write?: string | undefined
			}
		>
		deprecated: z.ZodOptional<z.ZodBoolean>
	},
	"strip",
	z.ZodTypeAny,
	{
		object: "model"
		type: "language"
		id: string
		created: number
		name: string
		max_tokens: number
		description: string
		owned_by: string
		context_window: number
		pricing: {
			input: string
			output: string
			input_cache_read?: string | undefined
			input_cache_write?: string | undefined
		}
		deprecated?: boolean | undefined
		tags?: string[] | undefined
	},
	{
		object: "model"
		type: "language"
		id: string
		created: number
		name: string
		max_tokens: number
		description: string
		owned_by: string
		context_window: number
		pricing: {
			input: string
			output: string
			input_cache_read?: string | undefined
			input_cache_write?: string | undefined
		}
		deprecated?: boolean | undefined
		tags?: string[] | undefined
	}
>
export declare const RooModelsResponseSchema: z.ZodObject<
	{
		object: z.ZodLiteral<"list">
		data: z.ZodArray<
			z.ZodObject<
				{
					id: z.ZodString
					object: z.ZodLiteral<"model">
					created: z.ZodNumber
					owned_by: z.ZodString
					name: z.ZodString
					description: z.ZodString
					context_window: z.ZodNumber
					max_tokens: z.ZodNumber
					type: z.ZodLiteral<"language">
					tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
					pricing: z.ZodObject<
						{
							input: z.ZodString
							output: z.ZodString
							input_cache_read: z.ZodOptional<z.ZodString>
							input_cache_write: z.ZodOptional<z.ZodString>
						},
						"strip",
						z.ZodTypeAny,
						{
							input: string
							output: string
							input_cache_read?: string | undefined
							input_cache_write?: string | undefined
						},
						{
							input: string
							output: string
							input_cache_read?: string | undefined
							input_cache_write?: string | undefined
						}
					>
					deprecated: z.ZodOptional<z.ZodBoolean>
				},
				"strip",
				z.ZodTypeAny,
				{
					object: "model"
					type: "language"
					id: string
					created: number
					name: string
					max_tokens: number
					description: string
					owned_by: string
					context_window: number
					pricing: {
						input: string
						output: string
						input_cache_read?: string | undefined
						input_cache_write?: string | undefined
					}
					deprecated?: boolean | undefined
					tags?: string[] | undefined
				},
				{
					object: "model"
					type: "language"
					id: string
					created: number
					name: string
					max_tokens: number
					description: string
					owned_by: string
					context_window: number
					pricing: {
						input: string
						output: string
						input_cache_read?: string | undefined
						input_cache_write?: string | undefined
					}
					deprecated?: boolean | undefined
					tags?: string[] | undefined
				}
			>,
			"many"
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		object: "list"
		data: {
			object: "model"
			type: "language"
			id: string
			created: number
			name: string
			max_tokens: number
			description: string
			owned_by: string
			context_window: number
			pricing: {
				input: string
				output: string
				input_cache_read?: string | undefined
				input_cache_write?: string | undefined
			}
			deprecated?: boolean | undefined
			tags?: string[] | undefined
		}[]
	},
	{
		object: "list"
		data: {
			object: "model"
			type: "language"
			id: string
			created: number
			name: string
			max_tokens: number
			description: string
			owned_by: string
			context_window: number
			pricing: {
				input: string
				output: string
				input_cache_read?: string | undefined
				input_cache_write?: string | undefined
			}
			deprecated?: boolean | undefined
			tags?: string[] | undefined
		}[]
	}
>
export type RooModel = z.infer<typeof RooModelSchema>
export type RooModelsResponse = z.infer<typeof RooModelsResponseSchema>
//# sourceMappingURL=roo.d.ts.map
