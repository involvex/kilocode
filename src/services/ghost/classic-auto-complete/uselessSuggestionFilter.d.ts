/**
 * Postprocesses a Ghost autocomplete suggestion using the continuedev postprocessing pipeline
 * and applies some of our own duplicate checks.
 *
 * @param params - Object containing suggestion parameters
 * @param params.suggestion - The suggested text to insert
 * @param params.prefix - The text before the cursor position
 * @param params.suffix - The text after the cursor position
 * @param params.model - The model string (e.g., "codestral", "qwen3", etc.)
 * @returns The processed suggestion text, or undefined if it should be filtered out
 */
export declare function postprocessGhostSuggestion(params: {
	suggestion: string
	prefix: string
	suffix: string
	model: string
}): string | undefined
//# sourceMappingURL=uselessSuggestionFilter.d.ts.map
