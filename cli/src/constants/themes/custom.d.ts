/**
 * Custom theme management utilities
 */
import type { Theme } from "../../types/theme.js"
import type { CLIConfig } from "../../config/types.js"
/**
 * Get all themes including custom ones from config
 */
export declare function getAllThemes(config: CLIConfig): Record<string, Theme>
/**
 * Check if a theme is a custom theme
 */
export declare function isCustomTheme(themeId: string, config: CLIConfig): boolean
/**
 * Add a custom theme to the configuration
 */
export declare function addCustomTheme(config: CLIConfig, themeId: string, theme: Theme): CLIConfig
/**
 * Remove a custom theme from the configuration
 */
export declare function removeCustomTheme(config: CLIConfig, themeId: string): CLIConfig
/**
 * Update a custom theme in the configuration
 */
export declare function updateCustomTheme(config: CLIConfig, themeId: string, theme: Partial<Theme>): CLIConfig
/**
 * Get all built-in theme IDs
 */
export declare function getBuiltinThemeIds(): string[]
/**
 * Check if a theme is a built-in theme
 */
export declare function isBuiltinTheme(themeId: string): boolean
//# sourceMappingURL=custom.d.ts.map
