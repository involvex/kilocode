/**
 * Custom theme management utilities
 */
import {
	darkTheme,
	lightTheme,
	alphaTheme,
	draculaTheme,
	atomOneDarkTheme,
	ayuDarkTheme,
	githubDarkTheme,
	githubLightTheme,
	googleCodeTheme,
	xcodeTheme,
	shadesOfPurpleTheme,
	ayuLightTheme,
	ansiTheme,
	ansiLightTheme,
} from "./index.js"
/**
 * Get all themes including custom ones from config
 */
export function getAllThemes(config) {
	const builtInThemes = {
		dark: darkTheme,
		light: lightTheme,
		alpha: alphaTheme,
		dracula: draculaTheme,
		"atom-one-dark": atomOneDarkTheme,
		"ayu-dark": ayuDarkTheme,
		"github-dark": githubDarkTheme,
		"github-light": githubLightTheme,
		googlecode: googleCodeTheme,
		xcode: xcodeTheme,
		"shades-of-purple": shadesOfPurpleTheme,
		"ayu-light": ayuLightTheme,
		ansi: ansiTheme,
		"ansi-light": ansiLightTheme,
	}
	// Merge custom themes
	const customThemes = config.customThemes || {}
	return { ...builtInThemes, ...customThemes }
}
/**
 * Check if a theme is a custom theme
 */
export function isCustomTheme(themeId, config) {
	return !!(config.customThemes && config.customThemes[themeId])
}
/**
 * Add a custom theme to the configuration
 */
export function addCustomTheme(config, themeId, theme) {
	// Validate that the theme object conforms to the Theme interface
	if (!theme || typeof theme !== "object") {
		throw new Error("Invalid theme: theme must be an object")
	}
	// Check for required properties
	const requiredProps = [
		"id",
		"name",
		"type",
		"brand",
		"semantic",
		"interactive",
		"messages",
		"actions",
		"code",
		"ui",
		"status",
	]
	for (const prop of requiredProps) {
		if (!(prop in theme)) {
			throw new Error(`Invalid theme: missing required property '${prop}'`)
		}
	}
	// Check that themeId is a non-empty string
	if (!themeId || typeof themeId !== "string") {
		throw new Error("Invalid theme ID: theme ID must be a non-empty string")
	}
	if (!config.customThemes) {
		config.customThemes = {}
	}
	return {
		...config,
		customThemes: {
			...config.customThemes,
			[themeId]: {
				...theme,
				id: themeId, // Ensure the ID matches the key
				type: "custom", // Always set custom themes to "custom" type
			},
		},
	}
}
/**
 * Remove a custom theme from the configuration
 */
export function removeCustomTheme(config, themeId) {
	if (!config.customThemes || !config.customThemes[themeId]) {
		return config
	}
	const { [themeId]: _removed, ...remainingThemes } = config.customThemes
	return {
		...config,
		customThemes: remainingThemes,
	}
}
/**
 * Update a custom theme in the configuration
 */
export function updateCustomTheme(config, themeId, theme) {
	if (!config.customThemes || !config.customThemes[themeId]) {
		return config
	}
	return {
		...config,
		customThemes: {
			...config.customThemes,
			[themeId]: {
				...config.customThemes[themeId],
				...theme,
				id: themeId, // Ensure the ID is preserved
				type: "custom", // Always ensure custom themes have "custom" type
			},
		},
	}
}
/**
 * Get all built-in theme IDs
 */
export function getBuiltinThemeIds() {
	return [
		"dark",
		"light",
		"alpha",
		"ansi",
		"ansi-light",
		"atom-one-dark",
		"ayu-dark",
		"ayu-light",
		"dracula",
		"github-dark",
		"github-light",
		"googlecode",
		"shades-of-purple",
		"xcode",
	]
}
/**
 * Check if a theme is a built-in theme
 */
export function isBuiltinTheme(themeId) {
	return getBuiltinThemeIds().includes(themeId)
}
