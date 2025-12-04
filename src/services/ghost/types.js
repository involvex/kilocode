// ============================================================================
// Conversion Utilities
// ============================================================================
/**
 * Extract prefix and suffix from a document at a given position
 */
export function extractPrefixSuffix(document, position) {
	const offset = document.offsetAt(position)
	const text = document.getText()
	return {
		prefix: text.substring(0, offset),
		suffix: text.substring(offset),
	}
}
/**
 * Convert VSCode Position to our Position type
 */
export function vscodePositionToPosition(pos) {
	return {
		line: pos.line,
		character: pos.character,
	}
}
/**
 * Convert GhostSuggestionContext to AutocompleteInput
 */
export function contextToAutocompleteInput(context) {
	const position = context.range?.start ?? context.document.positionAt(0)
	const { prefix, suffix } = extractPrefixSuffix(context.document, position)
	// Get recently visited and edited ranges from context, with empty arrays as fallback
	const recentlyVisitedRanges = context.recentlyVisitedRanges ?? []
	const recentlyEditedRanges = context.recentlyEditedRanges ?? []
	return {
		isUntitledFile: context.document.isUntitled,
		completionId: crypto.randomUUID(),
		filepath: context.document.uri.fsPath,
		pos: vscodePositionToPosition(position),
		recentlyVisitedRanges,
		recentlyEditedRanges,
		manuallyPassFileContents: undefined,
		manuallyPassPrefix: prefix,
	}
}
//# sourceMappingURL=types.js.map
