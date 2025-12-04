import { AutocompleteSnippetType } from "../../../autocomplete/snippets/types"
import { isSecurityConcern } from "../../../indexing/ignore"
import { LRUCache } from "lru-cache"
import * as vscode from "vscode"
/**
 * Service to keep track of recently visited ranges in files.
 */
export class RecentlyVisitedRangesService {
	ide
	cache
	// Default value, we override in initWithPostHog
	numSurroundingLines = 20
	maxRecentFiles = 3
	maxSnippetsPerFile = 3
	isEnabled = true
	disposable
	constructor(ide) {
		this.ide = ide
		this.cache = new LRUCache({
			max: this.maxRecentFiles,
		})
		void this.initWithPostHog()
	}
	async initWithPostHog() {
		const recentlyVisitedRangesNumSurroundingLinesOptions = [null, 5, 10, 15, 20] // was feature flagged
		const recentlyVisitedRangesNumSurroundingLines = recentlyVisitedRangesNumSurroundingLinesOptions[0]
		if (recentlyVisitedRangesNumSurroundingLines) {
			this.isEnabled = true
			this.numSurroundingLines = recentlyVisitedRangesNumSurroundingLines
		}
		this.disposable = vscode.window.onDidChangeTextEditorSelection(this.cacheCurrentSelectionContext)
	}
	cacheCurrentSelectionContext = async (event) => {
		const fsPath = event.textEditor.document.fileName
		if (isSecurityConcern(fsPath)) {
			return
		}
		const filepath = event.textEditor.document.uri.toString()
		const line = event.selections[0].active.line
		const startLine = Math.max(0, line - this.numSurroundingLines)
		const endLine = Math.min(line + this.numSurroundingLines, event.textEditor.document.lineCount - 1)
		try {
			const fileContents = await this.ide.readFile(filepath)
			const lines = fileContents.split("\n")
			const relevantLines = lines
				.slice(startLine, endLine + 1)
				.join("\n")
				.trim()
			const snippet = {
				filepath,
				content: relevantLines,
				type: AutocompleteSnippetType.Code,
				timestamp: Date.now(),
			}
			const existing = this.cache.get(filepath) || []
			const newSnippets = [...existing, snippet]
				.sort((a, b) => b.timestamp - a.timestamp)
				.slice(0, this.maxSnippetsPerFile)
			this.cache.set(filepath, newSnippets)
		} catch (err) {
			console.error("Error caching recently visited ranges for autocomplete: ", err)
			return
		}
	}
	/**
	 * Returns up to {@link maxSnippetsPerFile} snippets from the {@link maxRecentFiles} most recently visited files.
	 * Excludes snippets from the currently active file.
	 * @returns Array of code snippets from recently visited files
	 */
	getSnippets() {
		if (!this.isEnabled) {
			return []
		}
		const currentFilepath = vscode.window.activeTextEditor?.document.uri.toString()
		let allSnippets = []
		// Get most recent snippets from each file in cache
		for (const filepath of Array.from(this.cache.keys())) {
			const snippets = (this.cache.get(filepath) || [])
				.sort((a, b) => b.timestamp - a.timestamp)
				.slice(0, this.maxSnippetsPerFile)
			allSnippets = [...allSnippets, ...snippets]
		}
		return allSnippets
			.filter(
				(s) =>
					!currentFilepath ||
					(s.filepath !== currentFilepath &&
						// Exclude Continue's own output as it makes it super-hard for users to test the autocomplete feature
						// while looking at the prompts in the Continue's output
						!s.filepath.startsWith("output:extension-output-Continue.continue")),
			)
			.sort((a, b) => b.timestamp - a.timestamp)
			.map(({ timestamp: _timestamp, ...snippet }) => snippet)
	}
	dispose() {
		this.disposable?.dispose()
		this.cache.clear()
	}
}
//# sourceMappingURL=RecentlyVisitedRangesService.js.map
