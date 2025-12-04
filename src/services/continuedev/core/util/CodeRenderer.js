export class CodeRenderer {
	static instance
	static getInstance() {
		if (!CodeRenderer.instance) {
			CodeRenderer.instance = new CodeRenderer()
		}
		return CodeRenderer.instance
	}
	async setTheme(_theme) {
		// No-op stub
	}
	async getDataUri(_text, _languageId, _options, _currLineOffsetFromTop, _newDiffLines, _diffChars) {
		// Return empty data URI as stub
		return "data:image/svg+xml;base64,"
	}
}
//# sourceMappingURL=CodeRenderer.js.map
