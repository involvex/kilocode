import { DEFAULT_MODES } from "@roo-code/types/cli"

export const DEFAULT_MODE_SLUG = "code"

import type { ModeConfig } from "@roo-code/types/cli"

/**
 * Get mode configuration by slug
 * @param slug - Mode slug
 * @param customModes - Array of custom modes
 * @returns Mode configuration or undefined
 */
export const getModeBySlug = (slug: string, customModes: ModeConfig[] = []) => {
	const allModes = [...DEFAULT_MODES, ...customModes]
	return allModes.find((mode) => mode.slug === slug)
}

/**
 * Get all available modes (default + custom)
 * @param customModes - Array of custom modes
 * @returns Array of all mode configurations
 */
export const getAllModes = (customModes: ModeConfig[] = []) => {
	return [...DEFAULT_MODES, ...customModes]
}

/**
 * Create mode items for selection components
 * @param modes - Array of mode configurations
 * @returns Array of mode items with label and value
 */
export const createModeItems = (modes: ModeConfig[]) => {
	return modes.map((mode) => ({
		label: `${mode.name} - ${mode.description || "No description"}`,
		value: mode.slug,
	}))
}
