import { z } from "zod"
/**
 * GroupOptions
 */
export declare const groupOptionsSchema: z.ZodObject<
	{
		fileRegex: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>
		description: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		description?: string | undefined
		fileRegex?: string | undefined
	},
	{
		description?: string | undefined
		fileRegex?: string | undefined
	}
>
export type GroupOptions = z.infer<typeof groupOptionsSchema>
/**
 * GroupEntry
 */
export declare const groupEntrySchema: z.ZodUnion<
	[
		z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
		z.ZodTuple<
			[
				z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
				z.ZodObject<
					{
						fileRegex: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>
						description: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
						description?: string | undefined
						fileRegex?: string | undefined
					},
					{
						description?: string | undefined
						fileRegex?: string | undefined
					}
				>,
			],
			null
		>,
	]
>
export type GroupEntry = z.infer<typeof groupEntrySchema>
export declare const modeConfigSchema: z.ZodObject<
	{
		slug: z.ZodString
		name: z.ZodString
		roleDefinition: z.ZodString
		whenToUse: z.ZodOptional<z.ZodString>
		description: z.ZodOptional<z.ZodString>
		customInstructions: z.ZodOptional<z.ZodString>
		groups: z.ZodEffects<
			z.ZodArray<
				z.ZodUnion<
					[
						z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
						z.ZodTuple<
							[
								z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
								z.ZodObject<
									{
										fileRegex: z.ZodEffects<
											z.ZodOptional<z.ZodString>,
											string | undefined,
											string | undefined
										>
										description: z.ZodOptional<z.ZodString>
									},
									"strip",
									z.ZodTypeAny,
									{
										description?: string | undefined
										fileRegex?: string | undefined
									},
									{
										description?: string | undefined
										fileRegex?: string | undefined
									}
								>,
							],
							null
						>,
					]
				>,
				"many"
			>,
			(
				| "command"
				| "read"
				| "edit"
				| "browser"
				| "mcp"
				| "modes"
				| [
						"command" | "read" | "edit" | "browser" | "mcp" | "modes",
						{
							description?: string | undefined
							fileRegex?: string | undefined
						},
				  ]
			)[],
			(
				| "command"
				| "read"
				| "edit"
				| "browser"
				| "mcp"
				| "modes"
				| [
						"command" | "read" | "edit" | "browser" | "mcp" | "modes",
						{
							description?: string | undefined
							fileRegex?: string | undefined
						},
				  ]
			)[]
		>
		source: z.ZodOptional<z.ZodEnum<["global", "project", "organization"]>>
		iconName: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		name: string
		slug: string
		roleDefinition: string
		groups: (
			| "command"
			| "read"
			| "edit"
			| "browser"
			| "mcp"
			| "modes"
			| [
					"command" | "read" | "edit" | "browser" | "mcp" | "modes",
					{
						description?: string | undefined
						fileRegex?: string | undefined
					},
			  ]
		)[]
		description?: string | undefined
		whenToUse?: string | undefined
		customInstructions?: string | undefined
		source?: "global" | "project" | "organization" | undefined
		iconName?: string | undefined
	},
	{
		name: string
		slug: string
		roleDefinition: string
		groups: (
			| "command"
			| "read"
			| "edit"
			| "browser"
			| "mcp"
			| "modes"
			| [
					"command" | "read" | "edit" | "browser" | "mcp" | "modes",
					{
						description?: string | undefined
						fileRegex?: string | undefined
					},
			  ]
		)[]
		description?: string | undefined
		whenToUse?: string | undefined
		customInstructions?: string | undefined
		source?: "global" | "project" | "organization" | undefined
		iconName?: string | undefined
	}
>
export type ModeConfig = z.infer<typeof modeConfigSchema>
/**
 * CustomModesSettings
 */
export declare const customModesSettingsSchema: z.ZodObject<
	{
		customModes: z.ZodEffects<
			z.ZodArray<
				z.ZodObject<
					{
						slug: z.ZodString
						name: z.ZodString
						roleDefinition: z.ZodString
						whenToUse: z.ZodOptional<z.ZodString>
						description: z.ZodOptional<z.ZodString>
						customInstructions: z.ZodOptional<z.ZodString>
						groups: z.ZodEffects<
							z.ZodArray<
								z.ZodUnion<
									[
										z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
										z.ZodTuple<
											[
												z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>,
												z.ZodObject<
													{
														fileRegex: z.ZodEffects<
															z.ZodOptional<z.ZodString>,
															string | undefined,
															string | undefined
														>
														description: z.ZodOptional<z.ZodString>
													},
													"strip",
													z.ZodTypeAny,
													{
														description?: string | undefined
														fileRegex?: string | undefined
													},
													{
														description?: string | undefined
														fileRegex?: string | undefined
													}
												>,
											],
											null
										>,
									]
								>,
								"many"
							>,
							(
								| "command"
								| "read"
								| "edit"
								| "browser"
								| "mcp"
								| "modes"
								| [
										"command" | "read" | "edit" | "browser" | "mcp" | "modes",
										{
											description?: string | undefined
											fileRegex?: string | undefined
										},
								  ]
							)[],
							(
								| "command"
								| "read"
								| "edit"
								| "browser"
								| "mcp"
								| "modes"
								| [
										"command" | "read" | "edit" | "browser" | "mcp" | "modes",
										{
											description?: string | undefined
											fileRegex?: string | undefined
										},
								  ]
							)[]
						>
						source: z.ZodOptional<z.ZodEnum<["global", "project", "organization"]>>
						iconName: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
						name: string
						slug: string
						roleDefinition: string
						groups: (
							| "command"
							| "read"
							| "edit"
							| "browser"
							| "mcp"
							| "modes"
							| [
									"command" | "read" | "edit" | "browser" | "mcp" | "modes",
									{
										description?: string | undefined
										fileRegex?: string | undefined
									},
							  ]
						)[]
						description?: string | undefined
						whenToUse?: string | undefined
						customInstructions?: string | undefined
						source?: "global" | "project" | "organization" | undefined
						iconName?: string | undefined
					},
					{
						name: string
						slug: string
						roleDefinition: string
						groups: (
							| "command"
							| "read"
							| "edit"
							| "browser"
							| "mcp"
							| "modes"
							| [
									"command" | "read" | "edit" | "browser" | "mcp" | "modes",
									{
										description?: string | undefined
										fileRegex?: string | undefined
									},
							  ]
						)[]
						description?: string | undefined
						whenToUse?: string | undefined
						customInstructions?: string | undefined
						source?: "global" | "project" | "organization" | undefined
						iconName?: string | undefined
					}
				>,
				"many"
			>,
			{
				name: string
				slug: string
				roleDefinition: string
				groups: (
					| "command"
					| "read"
					| "edit"
					| "browser"
					| "mcp"
					| "modes"
					| [
							"command" | "read" | "edit" | "browser" | "mcp" | "modes",
							{
								description?: string | undefined
								fileRegex?: string | undefined
							},
					  ]
				)[]
				description?: string | undefined
				whenToUse?: string | undefined
				customInstructions?: string | undefined
				source?: "global" | "project" | "organization" | undefined
				iconName?: string | undefined
			}[],
			{
				name: string
				slug: string
				roleDefinition: string
				groups: (
					| "command"
					| "read"
					| "edit"
					| "browser"
					| "mcp"
					| "modes"
					| [
							"command" | "read" | "edit" | "browser" | "mcp" | "modes",
							{
								description?: string | undefined
								fileRegex?: string | undefined
							},
					  ]
				)[]
				description?: string | undefined
				whenToUse?: string | undefined
				customInstructions?: string | undefined
				source?: "global" | "project" | "organization" | undefined
				iconName?: string | undefined
			}[]
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		customModes: {
			name: string
			slug: string
			roleDefinition: string
			groups: (
				| "command"
				| "read"
				| "edit"
				| "browser"
				| "mcp"
				| "modes"
				| [
						"command" | "read" | "edit" | "browser" | "mcp" | "modes",
						{
							description?: string | undefined
							fileRegex?: string | undefined
						},
				  ]
			)[]
			description?: string | undefined
			whenToUse?: string | undefined
			customInstructions?: string | undefined
			source?: "global" | "project" | "organization" | undefined
			iconName?: string | undefined
		}[]
	},
	{
		customModes: {
			name: string
			slug: string
			roleDefinition: string
			groups: (
				| "command"
				| "read"
				| "edit"
				| "browser"
				| "mcp"
				| "modes"
				| [
						"command" | "read" | "edit" | "browser" | "mcp" | "modes",
						{
							description?: string | undefined
							fileRegex?: string | undefined
						},
				  ]
			)[]
			description?: string | undefined
			whenToUse?: string | undefined
			customInstructions?: string | undefined
			source?: "global" | "project" | "organization" | undefined
			iconName?: string | undefined
		}[]
	}
>
export type CustomModesSettings = z.infer<typeof customModesSettingsSchema>
/**
 * PromptComponent
 */
export declare const promptComponentSchema: z.ZodObject<
	{
		roleDefinition: z.ZodOptional<z.ZodString>
		whenToUse: z.ZodOptional<z.ZodString>
		description: z.ZodOptional<z.ZodString>
		customInstructions: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		description?: string | undefined
		roleDefinition?: string | undefined
		whenToUse?: string | undefined
		customInstructions?: string | undefined
	},
	{
		description?: string | undefined
		roleDefinition?: string | undefined
		whenToUse?: string | undefined
		customInstructions?: string | undefined
	}
>
export type PromptComponent = z.infer<typeof promptComponentSchema>
/**
 * CustomModePrompts
 */
export declare const customModePromptsSchema: z.ZodRecord<
	z.ZodString,
	z.ZodOptional<
		z.ZodObject<
			{
				roleDefinition: z.ZodOptional<z.ZodString>
				whenToUse: z.ZodOptional<z.ZodString>
				description: z.ZodOptional<z.ZodString>
				customInstructions: z.ZodOptional<z.ZodString>
			},
			"strip",
			z.ZodTypeAny,
			{
				description?: string | undefined
				roleDefinition?: string | undefined
				whenToUse?: string | undefined
				customInstructions?: string | undefined
			},
			{
				description?: string | undefined
				roleDefinition?: string | undefined
				whenToUse?: string | undefined
				customInstructions?: string | undefined
			}
		>
	>
>
export type CustomModePrompts = z.infer<typeof customModePromptsSchema>
/**
 * CustomSupportPrompts
 */
export declare const customSupportPromptsSchema: z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodString>>
export type CustomSupportPrompts = z.infer<typeof customSupportPromptsSchema>
/**
 * DEFAULT_MODES
 */
export declare const DEFAULT_MODES: readonly ModeConfig[]
//# sourceMappingURL=mode.d.ts.map
