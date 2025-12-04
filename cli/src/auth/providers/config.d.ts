/**
 * Providers that should NOT use the generic auth system
 * These have custom authentication flows that require special handling
 */
export declare const CUSTOM_AUTH_PROVIDERS: Set<string>
/**
 * Check if a provider should use generic auth
 * @param provider - Provider name or auth provider value to check
 * @returns True if provider should use the generic auth system
 */
export declare function shouldUseGenericAuth(provider: string): boolean
//# sourceMappingURL=config.d.ts.map
