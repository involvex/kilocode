/**
 * Provider credential validation utilities
 * Centralizes logic for checking provider-specific environment variables
 */
/**
 * Check if minimal environment configuration exists
 */
export declare function envConfigExists(): boolean
/**
 * Get list of missing required environment variables for a provider type
 * @param providerType - The provider type to check
 * @returns Array of missing environment variable names
 */
export declare function getMissingEnvVars(providerType: string): string[]
/**
 * Get list of required environment variables for a provider type
 * @param providerType - The provider type to check
 * @returns Array of required environment variable names
 */
export declare function getRequiredEnvVars(providerType: string): string[]
//# sourceMappingURL=provider-validation.d.ts.map
