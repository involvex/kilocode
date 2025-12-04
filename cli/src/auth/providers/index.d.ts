import type { AuthProvider } from "../types.js"
/**
 * Registry of all available authentication providers
 * Ordered by priority (most recommended first)
 */
export declare const authProviders: AuthProvider[]
/**
 * Get a provider by its value
 * @param value The provider value to look up
 * @returns The provider or undefined if not found
 */
export declare function getProviderByValue(value: string): AuthProvider | undefined
//# sourceMappingURL=index.d.ts.map
