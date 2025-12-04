/**
 * Unified Theme System for Kilo Code CLI
 *
 * This module provides a centralized theme structure that consolidates
 * color usage across all UI components into semantic categories.
 *
 * @see THEME_PLAN.md for detailed design documentation
 */
import type { Theme, ThemeId } from "../../types/theme.js"
import type { CLIConfig } from "../../config/types.js"
/**
 * Get a theme by ID (supports custom themes from config)
 * @param themeId - The theme identifier
 * @param config - Optional config containing custom themes
 * @returns The requested theme, or dark theme as fallback
 */
export declare function getThemeById(themeId: ThemeId, config?: CLIConfig): Theme
/**
 * Get all available theme IDs
 * @param config - Optional config containing custom themes
 * @returns Array of theme identifiers sorted by type then alphabetically
 */
export declare function getAvailableThemes(config?: CLIConfig): ThemeId[]
/**
 * Check if a theme ID is valid
 * @param themeId - The theme identifier to check
 * @param config - Optional config containing custom themes
 * @returns True if the theme exists
 */
export declare function isValidThemeId(themeId: string, config?: CLIConfig): themeId is ThemeId
export type { Theme, ThemeId } from "../../types/theme.js"
export { darkTheme } from "./dark.js"
export { lightTheme } from "./light.js"
export { alphaTheme } from "./alpha.js"
export { draculaTheme } from "./dracula.js"
export { atomOneDarkTheme } from "./atom-one-dark.js"
export { ayuDarkTheme } from "./ayu-dark.js"
export { githubDarkTheme } from "./github-dark.js"
export { githubLightTheme } from "./github-light.js"
export { googleCodeTheme } from "./googlecode.js"
export { xcodeTheme } from "./xcode.js"
export { shadesOfPurpleTheme } from "./shades-of-purple.js"
export { ayuLightTheme } from "./ayu-light.js"
export { ansiTheme } from "./ansi.js"
export { ansiLightTheme } from "./ansi-light.js"
//# sourceMappingURL=index.d.ts.map
