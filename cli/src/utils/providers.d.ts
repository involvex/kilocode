import type { ProviderName } from "../types/messages.js"
/**
 * Get the selected model ID for a given provider from the API configuration
 * This handles the different field names used by different providers
 *
 * @param provider - The provider name
 * @param apiConfiguration - The API configuration object
 * @returns The selected model ID or "unknown" if not found
 */
export declare const getSelectedModelId: (
	provider: ProviderName | string,
	apiConfiguration: Record<string, unknown> | undefined,
) => string
//# sourceMappingURL=providers.d.ts.map
