import type { ProviderName } from "../../types/messages.js"
/**
 * Provider display labels mapping
 * Maps provider internal names to user-friendly display names
 */
export declare const PROVIDER_LABELS: Record<ProviderName, string>
/**
 * Provider list with value and label pairs
 * Used for selection components and dropdowns
 */
export declare const PROVIDER_OPTIONS: Array<{
	value: ProviderName
	label: string
}>
/**
 * Get provider display label by provider name
 * @param provider - Provider name or undefined
 * @returns User-friendly display name
 */
export declare const getProviderLabel: (provider: ProviderName | undefined) => string
//# sourceMappingURL=labels.d.ts.map
