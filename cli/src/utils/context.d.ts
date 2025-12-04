/**
 * Context usage calculation utilities
 */
import type { ExtensionChatMessage, ProviderSettings } from "../types/messages.js"
import type { RouterModels } from "../constants/providers/models.js"
export interface ContextUsage {
	percentage: number
	tokensUsed: number
	maxTokens: number
	reservedForOutput: number
	availableSize: number
}
export interface TokenDistribution {
	currentPercent: number
	reservedPercent: number
	availablePercent: number
	reservedForOutput: number
	availableSize: number
}
/**
 * Calculate token distribution within the context window
 * This matches the webview's calculateTokenDistribution function
 */
export declare function calculateTokenDistribution(
	contextWindow: number,
	contextTokens: number,
	maxTokens?: number,
): TokenDistribution
/**
 * Calculate context usage from chat messages
 * This now uses actual token counts from API responses, matching the webview implementation
 * @param messages - Array of chat messages
 * @param apiConfig - API configuration containing model info
 * @returns Context usage information
 */
export declare function calculateContextUsage(
	messages: ExtensionChatMessage[],
	apiConfig: ProviderSettings | null,
	routerModels?: RouterModels | null,
): ContextUsage
/**
 * Get a color for the context percentage
 * @param percentage - Context usage percentage (0-100)
 * @returns Color name for Ink Text component
 */
export declare function getContextColor(percentage: number): string
/**
 * Format the context usage for display
 * @param usage - Context usage information
 * @returns Formatted string
 */
export declare function formatContextUsage(usage: ContextUsage): string
//# sourceMappingURL=context.d.ts.map
