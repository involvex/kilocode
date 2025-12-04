import type { CLIConfig, ProviderConfig } from "./types.js"
export interface ValidationResult {
	valid: boolean
	errors?: string[]
}
export declare function validateConfig(config: unknown): Promise<ValidationResult>
/**
 * Validates provider-specific configuration based on provider type.
 * Note: Most validations (required fields, types, minLength) are now handled by schema.json.
 * This function validates business logic: selected providers must have non-empty required credentials.
 *
 * @param provider - The provider configuration to validate
 * @param isSelected - Whether this is the currently selected provider (requires non-empty credentials)
 */
export declare function validateProviderConfig(provider: ProviderConfig, isSelected?: boolean): ValidationResult
/**
 * Validates the selected provider in the config
 */
export declare function validateSelectedProvider(config: CLIConfig): ValidationResult
//# sourceMappingURL=validation.d.ts.map
