import type { ModeConfig } from "../../types/messages.js"
/**
 * Default mode
 */
export declare const DEFAULT_MODES: readonly {
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
export declare const DEFAULT_MODE_SLUG = "code"
/**
 * Get mode configuration by slug
 * @param slug - Mode slug
 * @param customModes - Array of custom modes
 * @returns Mode configuration or undefined
 */
export declare const getModeBySlug: (slug: string, customModes?: ModeConfig[]) => ModeConfig | undefined
/**
 * Get all available modes (default + custom)
 * @param customModes - Array of custom modes
 * @returns Array of all mode configurations
 */
export declare const getAllModes: (customModes?: ModeConfig[]) => ModeConfig[]
/**
 * Create mode items for selection components
 * @param modes - Array of mode configurations
 * @returns Array of mode items with label and value
 */
export declare const createModeItems: (modes: ModeConfig[]) => {
	label: string
	value: string
}[]
//# sourceMappingURL=defaults.d.ts.map
