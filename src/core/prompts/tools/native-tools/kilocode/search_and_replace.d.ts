import z from "zod/v4"
export declare const SearchAndReplaceParametersSchema: z.ZodObject<
	{
		path: z.ZodString
		old_str: z.ZodString
		new_str: z.ZodString
	},
	z.core.$strip
>
export type SearchAndReplaceParameters = z.infer<typeof SearchAndReplaceParametersSchema>
declare const _default: {
	type: "function"
	function: {
		name: string
		description: string
		strict: true
		parameters: z.core.JSONSchema.JSONSchema
	}
}
export default _default
//# sourceMappingURL=search_and_replace.d.ts.map
