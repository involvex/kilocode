import type { AgentPageContent } from "./agent-page-content"
/**
 * Selects the appropriate content variant based on the query parameter.
 *
 * @param searchParams - The search parameters from the page props
 * @param variants - A record mapping variant letters to content objects
 * @returns The selected content variant, defaulting to variant 'A' if not found or invalid
 *
 * @example
 * ```tsx
 * const content = getContentVariant(searchParams, {
 *   A: contentA,
 *   B: contentB,
 *   C: contentC,
 * })
 * ```
 */
export declare function getContentVariant(
	searchParams: {
		v?: string
	},
	variants: Record<string, AgentPageContent>,
): AgentPageContent
//# sourceMappingURL=getContentVariant.d.ts.map
