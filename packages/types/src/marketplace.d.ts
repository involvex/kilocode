import { z } from "zod"
/**
 * Schema for MCP parameter definitions
 */
export declare const mcpParameterSchema: z.ZodObject<
	{
		name: z.ZodString
		key: z.ZodString
		placeholder: z.ZodOptional<z.ZodString>
		optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
	},
	"strip",
	z.ZodTypeAny,
	{
		name: string
		key: string
		optional: boolean
		placeholder?: string | undefined
	},
	{
		name: string
		key: string
		placeholder?: string | undefined
		optional?: boolean | undefined
	}
>
export type McpParameter = z.infer<typeof mcpParameterSchema>
/**
 * Schema for MCP installation method with name
 */
export declare const mcpInstallationMethodSchema: z.ZodObject<
	{
		name: z.ZodString
		content: z.ZodString
		parameters: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						name: z.ZodString
						key: z.ZodString
						placeholder: z.ZodOptional<z.ZodString>
						optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
					},
					"strip",
					z.ZodTypeAny,
					{
						name: string
						key: string
						optional: boolean
						placeholder?: string | undefined
					},
					{
						name: string
						key: string
						placeholder?: string | undefined
						optional?: boolean | undefined
					}
				>,
				"many"
			>
		>
		prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
	},
	"strip",
	z.ZodTypeAny,
	{
		name: string
		content: string
		parameters?:
			| {
					name: string
					key: string
					optional: boolean
					placeholder?: string | undefined
			  }[]
			| undefined
		prerequisites?: string[] | undefined
	},
	{
		name: string
		content: string
		parameters?:
			| {
					name: string
					key: string
					placeholder?: string | undefined
					optional?: boolean | undefined
			  }[]
			| undefined
		prerequisites?: string[] | undefined
	}
>
export type McpInstallationMethod = z.infer<typeof mcpInstallationMethodSchema>
/**
 * Component type validation
 */
export declare const marketplaceItemTypeSchema: z.ZodEnum<["mode", "mcp"]>
export type MarketplaceItemType = z.infer<typeof marketplaceItemTypeSchema>
/**
 * Type-specific schemas for YAML parsing (without type field, added programmatically)
 */
export declare const modeMarketplaceItemSchema: z.ZodObject<
	{
		id: z.ZodString
		name: z.ZodString
		description: z.ZodString
		author: z.ZodOptional<z.ZodString>
		authorUrl: z.ZodOptional<z.ZodString>
		tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
	} & {
		content: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		id: string
		name: string
		description: string
		content: string
		tags?: string[] | undefined
		prerequisites?: string[] | undefined
		author?: string | undefined
		authorUrl?: string | undefined
	},
	{
		id: string
		name: string
		description: string
		content: string
		tags?: string[] | undefined
		prerequisites?: string[] | undefined
		author?: string | undefined
		authorUrl?: string | undefined
	}
>
export type ModeMarketplaceItem = z.infer<typeof modeMarketplaceItemSchema>
export declare const mcpMarketplaceItemSchema: z.ZodObject<
	{
		id: z.ZodString
		name: z.ZodString
		description: z.ZodString
		author: z.ZodOptional<z.ZodString>
		authorUrl: z.ZodOptional<z.ZodString>
		tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
	} & {
		url: z.ZodString
		content: z.ZodUnion<
			[
				z.ZodString,
				z.ZodArray<
					z.ZodObject<
						{
							name: z.ZodString
							content: z.ZodString
							parameters: z.ZodOptional<
								z.ZodArray<
									z.ZodObject<
										{
											name: z.ZodString
											key: z.ZodString
											placeholder: z.ZodOptional<z.ZodString>
											optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
										},
										"strip",
										z.ZodTypeAny,
										{
											name: string
											key: string
											optional: boolean
											placeholder?: string | undefined
										},
										{
											name: string
											key: string
											placeholder?: string | undefined
											optional?: boolean | undefined
										}
									>,
									"many"
								>
							>
							prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
						},
						"strip",
						z.ZodTypeAny,
						{
							name: string
							content: string
							parameters?:
								| {
										name: string
										key: string
										optional: boolean
										placeholder?: string | undefined
								  }[]
								| undefined
							prerequisites?: string[] | undefined
						},
						{
							name: string
							content: string
							parameters?:
								| {
										name: string
										key: string
										placeholder?: string | undefined
										optional?: boolean | undefined
								  }[]
								| undefined
							prerequisites?: string[] | undefined
						}
					>,
					"many"
				>,
			]
		>
		parameters: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						name: z.ZodString
						key: z.ZodString
						placeholder: z.ZodOptional<z.ZodString>
						optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
					},
					"strip",
					z.ZodTypeAny,
					{
						name: string
						key: string
						optional: boolean
						placeholder?: string | undefined
					},
					{
						name: string
						key: string
						placeholder?: string | undefined
						optional?: boolean | undefined
					}
				>,
				"many"
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		id: string
		name: string
		description: string
		url: string
		content:
			| string
			| {
					name: string
					content: string
					parameters?:
						| {
								name: string
								key: string
								optional: boolean
								placeholder?: string | undefined
						  }[]
						| undefined
					prerequisites?: string[] | undefined
			  }[]
		tags?: string[] | undefined
		parameters?:
			| {
					name: string
					key: string
					optional: boolean
					placeholder?: string | undefined
			  }[]
			| undefined
		prerequisites?: string[] | undefined
		author?: string | undefined
		authorUrl?: string | undefined
	},
	{
		id: string
		name: string
		description: string
		url: string
		content:
			| string
			| {
					name: string
					content: string
					parameters?:
						| {
								name: string
								key: string
								placeholder?: string | undefined
								optional?: boolean | undefined
						  }[]
						| undefined
					prerequisites?: string[] | undefined
			  }[]
		tags?: string[] | undefined
		parameters?:
			| {
					name: string
					key: string
					placeholder?: string | undefined
					optional?: boolean | undefined
			  }[]
			| undefined
		prerequisites?: string[] | undefined
		author?: string | undefined
		authorUrl?: string | undefined
	}
>
export type McpMarketplaceItem = z.infer<typeof mcpMarketplaceItemSchema>
/**
 * Unified marketplace item schema using discriminated union
 */
export declare const marketplaceItemSchema: z.ZodDiscriminatedUnion<
	"type",
	[
		z.ZodObject<
			{
				id: z.ZodString
				name: z.ZodString
				description: z.ZodString
				author: z.ZodOptional<z.ZodString>
				authorUrl: z.ZodOptional<z.ZodString>
				tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
				prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
			} & {
				content: z.ZodString
			} & {
				type: z.ZodLiteral<"mode">
			},
			"strip",
			z.ZodTypeAny,
			{
				type: "mode"
				id: string
				name: string
				description: string
				content: string
				tags?: string[] | undefined
				prerequisites?: string[] | undefined
				author?: string | undefined
				authorUrl?: string | undefined
			},
			{
				type: "mode"
				id: string
				name: string
				description: string
				content: string
				tags?: string[] | undefined
				prerequisites?: string[] | undefined
				author?: string | undefined
				authorUrl?: string | undefined
			}
		>,
		z.ZodObject<
			{
				id: z.ZodString
				name: z.ZodString
				description: z.ZodString
				author: z.ZodOptional<z.ZodString>
				authorUrl: z.ZodOptional<z.ZodString>
				tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
				prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
			} & {
				url: z.ZodString
				content: z.ZodUnion<
					[
						z.ZodString,
						z.ZodArray<
							z.ZodObject<
								{
									name: z.ZodString
									content: z.ZodString
									parameters: z.ZodOptional<
										z.ZodArray<
											z.ZodObject<
												{
													name: z.ZodString
													key: z.ZodString
													placeholder: z.ZodOptional<z.ZodString>
													optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
												},
												"strip",
												z.ZodTypeAny,
												{
													name: string
													key: string
													optional: boolean
													placeholder?: string | undefined
												},
												{
													name: string
													key: string
													placeholder?: string | undefined
													optional?: boolean | undefined
												}
											>,
											"many"
										>
									>
									prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
								},
								"strip",
								z.ZodTypeAny,
								{
									name: string
									content: string
									parameters?:
										| {
												name: string
												key: string
												optional: boolean
												placeholder?: string | undefined
										  }[]
										| undefined
									prerequisites?: string[] | undefined
								},
								{
									name: string
									content: string
									parameters?:
										| {
												name: string
												key: string
												placeholder?: string | undefined
												optional?: boolean | undefined
										  }[]
										| undefined
									prerequisites?: string[] | undefined
								}
							>,
							"many"
						>,
					]
				>
				parameters: z.ZodOptional<
					z.ZodArray<
						z.ZodObject<
							{
								name: z.ZodString
								key: z.ZodString
								placeholder: z.ZodOptional<z.ZodString>
								optional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>
							},
							"strip",
							z.ZodTypeAny,
							{
								name: string
								key: string
								optional: boolean
								placeholder?: string | undefined
							},
							{
								name: string
								key: string
								placeholder?: string | undefined
								optional?: boolean | undefined
							}
						>,
						"many"
					>
				>
			} & {
				type: z.ZodLiteral<"mcp">
			},
			"strip",
			z.ZodTypeAny,
			{
				type: "mcp"
				id: string
				name: string
				description: string
				url: string
				content:
					| string
					| {
							name: string
							content: string
							parameters?:
								| {
										name: string
										key: string
										optional: boolean
										placeholder?: string | undefined
								  }[]
								| undefined
							prerequisites?: string[] | undefined
					  }[]
				tags?: string[] | undefined
				parameters?:
					| {
							name: string
							key: string
							optional: boolean
							placeholder?: string | undefined
					  }[]
					| undefined
				prerequisites?: string[] | undefined
				author?: string | undefined
				authorUrl?: string | undefined
			},
			{
				type: "mcp"
				id: string
				name: string
				description: string
				url: string
				content:
					| string
					| {
							name: string
							content: string
							parameters?:
								| {
										name: string
										key: string
										placeholder?: string | undefined
										optional?: boolean | undefined
								  }[]
								| undefined
							prerequisites?: string[] | undefined
					  }[]
				tags?: string[] | undefined
				parameters?:
					| {
							name: string
							key: string
							placeholder?: string | undefined
							optional?: boolean | undefined
					  }[]
					| undefined
				prerequisites?: string[] | undefined
				author?: string | undefined
				authorUrl?: string | undefined
			}
		>,
	]
>
export type MarketplaceItem = z.infer<typeof marketplaceItemSchema>
/**
 * Installation options for marketplace items
 */
export declare const installMarketplaceItemOptionsSchema: z.ZodObject<
	{
		target: z.ZodDefault<z.ZodOptional<z.ZodEnum<["global", "project"]>>>
		parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>
	},
	"strip",
	z.ZodTypeAny,
	{
		target: "global" | "project"
		parameters?: Record<string, any> | undefined
	},
	{
		parameters?: Record<string, any> | undefined
		target?: "global" | "project" | undefined
	}
>
export type InstallMarketplaceItemOptions = z.infer<typeof installMarketplaceItemOptionsSchema>
//# sourceMappingURL=marketplace.d.ts.map
