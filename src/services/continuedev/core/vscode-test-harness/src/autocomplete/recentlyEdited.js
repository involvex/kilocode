import { getSymbolsForSnippet } from "../../../autocomplete/context/ranking"
import * as vscode from "vscode"
export class RecentlyEditedTracker {
	ide
	static staleTime = 1000 * 60 * 2
	static maxRecentlyEditedRanges = 3
	recentlyEditedRanges = []
	recentlyEditedDocuments = []
	static maxRecentlyEditedDocuments = 10
	disposable
	cleanupInterval
	constructor(ide) {
		this.ide = ide
		this.disposable = vscode.workspace.onDidChangeTextDocument((event) => {
			event.contentChanges.forEach((change) => {
				const editedRange = {
					uri: event.document.uri,
					range: new vscode.Range(
						new vscode.Position(change.range.start.line, 0),
						new vscode.Position(change.range.end.line + 1, 0),
					),
					timestamp: Date.now(),
				}
				this.insertRange(editedRange)
			})
			this.insertDocument(event.document.uri)
		})
		this.cleanupInterval = setInterval(() => {
			this.removeOldEntries()
		}, 1000 * 15)
	}
	async insertRange(editedRange) {
		if (editedRange.uri.scheme !== "file") {
			return
		}
		// Check for overlap with any existing ranges
		for (let i = 0; i < this.recentlyEditedRanges.length; i++) {
			let range = this.recentlyEditedRanges[i]
			if (range.range.intersection(editedRange.range)) {
				const union = range.range.union(editedRange.range)
				const contents = await this._getContentsForRange({
					...range,
					range: union,
				})
				range = {
					...range,
					range: union,
					lines: contents.split("\n"),
					symbols: getSymbolsForSnippet(contents),
				}
				this.recentlyEditedRanges[i] = range
				return
			}
		}
		// Otherwise, just add the new and maintain max size
		const contents = await this._getContentsForRange(editedRange)
		const newLength = this.recentlyEditedRanges.unshift({
			...editedRange,
			lines: contents.split("\n"),
			symbols: getSymbolsForSnippet(contents),
		})
		if (newLength >= RecentlyEditedTracker.maxRecentlyEditedRanges) {
			this.recentlyEditedRanges = this.recentlyEditedRanges.slice(
				0,
				RecentlyEditedTracker.maxRecentlyEditedRanges,
			)
		}
	}
	insertDocument(uri) {
		// Don't add a duplicate
		if (this.recentlyEditedDocuments.some((doc) => doc.uri === uri)) {
			return
		}
		const newLength = this.recentlyEditedDocuments.unshift({
			uri,
			timestamp: Date.now(),
		})
		if (newLength >= RecentlyEditedTracker.maxRecentlyEditedDocuments) {
			this.recentlyEditedDocuments = this.recentlyEditedDocuments.slice(
				0,
				RecentlyEditedTracker.maxRecentlyEditedDocuments,
			)
		}
	}
	removeOldEntries() {
		this.recentlyEditedRanges = this.recentlyEditedRanges.filter(
			(entry) => entry.timestamp > Date.now() - RecentlyEditedTracker.staleTime,
		)
	}
	async _getContentsForRange(entry) {
		const content = await this.ide.readFile(entry.uri.toString())
		if (content === null) {
			return ""
		}
		return content
			.toString()
			.split("\n")
			.slice(entry.range.start.line, entry.range.end.line + 1)
			.join("\n")
	}
	async getRecentlyEditedRanges() {
		return this.recentlyEditedRanges.map((entry) => {
			return {
				...entry,
				filepath: entry.uri.toString(),
			}
		})
	}
	dispose() {
		this.disposable?.dispose()
		if (this.cleanupInterval) {
			clearInterval(this.cleanupInterval)
		}
		this.recentlyEditedRanges = []
		this.recentlyEditedDocuments = []
	}
}
//# sourceMappingURL=recentlyEdited.js.map
