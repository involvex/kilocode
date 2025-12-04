/**
 * Check if the Kilocode account has a positive balance
 * @param kilocodeToken - The Kilocode JWT token
 * @param kilocodeOrganizationId - Optional organization ID to include in headers
 * @returns Promise<boolean> - True if balance > 0, false otherwise
 */
export declare function checkKilocodeBalance(kilocodeToken: string, kilocodeOrganizationId?: string): Promise<boolean>
export declare const AUTOCOMPLETE_PROVIDER_MODELS: Map<
	"kilocode" | "openrouter" | "mistral" | "bedrock",
	"codestral-latest" | "mistralai/codestral-2508" | "mistral.codestral-2508-v1:0"
>
export type AutocompleteProviderKey = typeof AUTOCOMPLETE_PROVIDER_MODELS extends Map<infer K, any> ? K : never
//# sourceMappingURL=kilocode-utils.d.ts.map
