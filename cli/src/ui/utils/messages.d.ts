export declare const generateMessage: () => {
	id: string
	ts: number
}
/**
 * Generate user-friendly message for model fallback
 * @param params - Message parameters
 * @returns Formatted message for display
 */
export declare const generateModelFallbackMessage: (params: {
	previousModel: string
	newModel: string
	organizationName?: string
}) => {
	type: "system"
	content: string
	id: string
	ts: number
}
/**
 * Generate user-friendly message for mode fallback
 * @param params - Message parameters
 * @returns Formatted message for display
 */
export declare const generateModeFallbackMessage: (params: {
	previousMode: string
	newMode: string
	organizationName?: string
}) => {
	type: "system"
	content: string
	id: string
	ts: number
}
//# sourceMappingURL=messages.d.ts.map
