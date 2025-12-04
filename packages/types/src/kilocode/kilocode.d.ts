import { z } from "zod"
declare global {
	interface Window {
		KILOCODE_BACKEND_BASE_URL: string | undefined
	}
}
export declare const ghostServiceSettingsSchema: z.ZodOptional<
	z.ZodObject<
		{
			enableAutoTrigger: z.ZodOptional<z.ZodBoolean>
			enableQuickInlineTaskKeybinding: z.ZodOptional<z.ZodBoolean>
			enableSmartInlineTaskKeybinding: z.ZodOptional<z.ZodBoolean>
			useNewAutocomplete: z.ZodOptional<z.ZodBoolean>
			provider: z.ZodOptional<z.ZodString>
			model: z.ZodOptional<z.ZodString>
		},
		"strip",
		z.ZodTypeAny,
		{
			enableAutoTrigger?: boolean | undefined
			enableQuickInlineTaskKeybinding?: boolean | undefined
			enableSmartInlineTaskKeybinding?: boolean | undefined
			useNewAutocomplete?: boolean | undefined
			provider?: string | undefined
			model?: string | undefined
		},
		{
			enableAutoTrigger?: boolean | undefined
			enableQuickInlineTaskKeybinding?: boolean | undefined
			enableSmartInlineTaskKeybinding?: boolean | undefined
			useNewAutocomplete?: boolean | undefined
			provider?: string | undefined
			model?: string | undefined
		}
	>
>
export type GhostServiceSettings = z.infer<typeof ghostServiceSettingsSchema>
export declare const commitRangeSchema: z.ZodObject<
	{
		from: z.ZodString
		fromTimeStamp: z.ZodOptional<z.ZodNumber>
		to: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		from: string
		to: string
		fromTimeStamp?: number | undefined
	},
	{
		from: string
		to: string
		fromTimeStamp?: number | undefined
	}
>
export type CommitRange = z.infer<typeof commitRangeSchema>
export declare const kiloCodeMetaDataSchema: z.ZodObject<
	{
		commitRange: z.ZodOptional<
			z.ZodObject<
				{
					from: z.ZodString
					fromTimeStamp: z.ZodOptional<z.ZodNumber>
					to: z.ZodString
				},
				"strip",
				z.ZodTypeAny,
				{
					from: string
					to: string
					fromTimeStamp?: number | undefined
				},
				{
					from: string
					to: string
					fromTimeStamp?: number | undefined
				}
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		commitRange?:
			| {
					from: string
					to: string
					fromTimeStamp?: number | undefined
			  }
			| undefined
	},
	{
		commitRange?:
			| {
					from: string
					to: string
					fromTimeStamp?: number | undefined
			  }
			| undefined
	}
>
export type KiloCodeMetaData = z.infer<typeof kiloCodeMetaDataSchema>
export declare const fastApplyModelSchema: z.ZodEnum<
	["auto", "morph/morph-v3-fast", "morph/morph-v3-large", "relace/relace-apply-3"]
>
export type FastApplyModel = z.infer<typeof fastApplyModelSchema>
export declare const fastApplyApiProviderSchema: z.ZodEnum<["current", "morph", "kilocode", "openrouter"]>
export type FastApplyApiProvider = z.infer<typeof fastApplyApiProviderSchema>
export declare const DEFAULT_KILOCODE_BACKEND_URL = "https://kilo.ai"
export declare function getKiloBaseUriFromToken(kilocodeToken?: string): "https://api.kilo.ai" | "http://localhost:3000"
/**
 * Helper function that combines token-based base URL resolution with URL construction.
 * Takes a token and a full URL, uses the token to get the appropriate base URL,
 * then constructs the final URL by replacing the domain in the target URL.
 *
 * @param targetUrl The target URL to transform
 * @param kilocodeToken The KiloCode authentication token
 * @returns Fully constructed KiloCode URL with proper backend mapping based on token
 */
export declare function getKiloUrlFromToken(targetUrl: string, kilocodeToken?: string): string
/**
 * Gets the app/web URL for the current environment.
 * In development: http://localhost:3000
 * In production: https://kilocode.ai
 */
export declare function getAppUrl(path?: string): string
/**
 * Gets the API URL for the current environment.
 * Respects KILOCODE_BACKEND_BASE_URL environment variable for local development.
 * In development: http://localhost:3000
 * In production: https://api.kilocode.ai
 */
export declare function getApiUrl(path?: string): string
/**
 * Gets the extension config URL, which uses a legacy subdomain structure.
 * In development: http://localhost:3000/extension-config.json
 * In production: https://api.kilocode.ai/extension-config.json
 */
export declare function getExtensionConfigUrl(): string
//# sourceMappingURL=kilocode.d.ts.map
