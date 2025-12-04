/**
 * Hook for calculating context usage from chat messages
 */
import { type ContextUsage } from "../../utils/context.js"
import type { ExtensionChatMessage, ProviderSettings } from "../../types/messages.js"
/**
 * Hook to calculate context usage from chat messages
 * Memoizes the calculation to avoid re-computing on every render
 *
 * @param messages - Array of chat messages
 * @param apiConfig - API configuration containing model info
 * @returns Context usage information
 */
export declare function useContextUsage(
	messages: ExtensionChatMessage[],
	apiConfig: ProviderSettings | null,
): ContextUsage
//# sourceMappingURL=useContextUsage.d.ts.map
