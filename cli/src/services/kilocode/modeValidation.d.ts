/**
 * Mode validation service for Kilocode provider
 * Validates mode availability against organization-specific mode lists
 */
import type { ModeConfig } from "../../types/messages.js"
/**
 * Default fallback mode when current mode is not available
 */
export declare const DEFAULT_FALLBACK_MODE = "code"
/**
 * Validate if a mode is available in the current mode list
 * @param modeSlug - The mode slug to validate
 * @param customModes - The organization's custom modes
 * @returns true if the mode is available, false otherwise
 */
export declare function validateModeAvailability(modeSlug: string, customModes: ModeConfig[]): boolean
/**
 * Get the fallback mode when current mode is not available
 * @returns The default fallback mode slug
 */
export declare function getFallbackMode(): string
/**
 * Get fallback result with organization context
 * @param currentMode - The current mode that is not available
 * @param customModes - The available custom modes
 * @returns Object with fallback mode and whether fallback was needed
 */
export declare function getModeValidationResult(
	currentMode: string,
	customModes: ModeConfig[],
): {
	isValid: boolean
	fallbackMode: string | null
}
//# sourceMappingURL=modeValidation.d.ts.map
