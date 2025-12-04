import { z } from "zod"
/**
 * Kilo Code Organization Settings Schema
 * These settings control organization-level features and configurations
 */
export declare const KiloOrganizationSettingsSchema: z.ZodObject<
	{
		model_allow_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		provider_allow_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		default_model: z.ZodOptional<z.ZodString>
		data_collection: z.ZodOptional<z.ZodNullable<z.ZodEnum<["allow", "deny"]>>>
		enable_usage_limits: z.ZodOptional<z.ZodBoolean>
		code_indexing_enabled: z.ZodOptional<z.ZodBoolean>
	},
	"strip",
	z.ZodTypeAny,
	{
		model_allow_list?: string[] | undefined
		provider_allow_list?: string[] | undefined
		default_model?: string | undefined
		data_collection?: "allow" | "deny" | null | undefined
		enable_usage_limits?: boolean | undefined
		code_indexing_enabled?: boolean | undefined
	},
	{
		model_allow_list?: string[] | undefined
		provider_allow_list?: string[] | undefined
		default_model?: string | undefined
		data_collection?: "allow" | "deny" | null | undefined
		enable_usage_limits?: boolean | undefined
		code_indexing_enabled?: boolean | undefined
	}
>
export type KiloOrganizationSettings = z.infer<typeof KiloOrganizationSettingsSchema>
/**
 * Kilo Code Organization Schema
 * Represents the full organization object returned from the API
 */
export declare const KiloOrganizationSchema: z.ZodObject<
	{
		id: z.ZodString
		name: z.ZodString
		settings: z.ZodObject<
			{
				model_allow_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
				provider_allow_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
				default_model: z.ZodOptional<z.ZodString>
				data_collection: z.ZodOptional<z.ZodNullable<z.ZodEnum<["allow", "deny"]>>>
				enable_usage_limits: z.ZodOptional<z.ZodBoolean>
				code_indexing_enabled: z.ZodOptional<z.ZodBoolean>
			},
			"strip",
			z.ZodTypeAny,
			{
				model_allow_list?: string[] | undefined
				provider_allow_list?: string[] | undefined
				default_model?: string | undefined
				data_collection?: "allow" | "deny" | null | undefined
				enable_usage_limits?: boolean | undefined
				code_indexing_enabled?: boolean | undefined
			},
			{
				model_allow_list?: string[] | undefined
				provider_allow_list?: string[] | undefined
				default_model?: string | undefined
				data_collection?: "allow" | "deny" | null | undefined
				enable_usage_limits?: boolean | undefined
				code_indexing_enabled?: boolean | undefined
			}
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		id: string
		name: string
		settings: {
			model_allow_list?: string[] | undefined
			provider_allow_list?: string[] | undefined
			default_model?: string | undefined
			data_collection?: "allow" | "deny" | null | undefined
			enable_usage_limits?: boolean | undefined
			code_indexing_enabled?: boolean | undefined
		}
	},
	{
		id: string
		name: string
		settings: {
			model_allow_list?: string[] | undefined
			provider_allow_list?: string[] | undefined
			default_model?: string | undefined
			data_collection?: "allow" | "deny" | null | undefined
			enable_usage_limits?: boolean | undefined
			code_indexing_enabled?: boolean | undefined
		}
	}
>
export type KiloOrganization = z.infer<typeof KiloOrganizationSchema>
//# sourceMappingURL=organization.d.ts.map
