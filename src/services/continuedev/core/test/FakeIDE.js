export class FakeIDE {
	options
	/** Track calls to onDidChangeActiveTextEditor for assertions */
	activeTextEditorCallbacks = []
	constructor(options = {}) {
		this.options = options
	}
	async getIdeInfo() {
		return (
			this.options.ideInfo ?? {
				ideType: "vscode",
			}
		)
	}
	async getClipboardContent() {
		return (
			this.options.clipboardContent ?? {
				text: "",
				copiedAt: new Date().toISOString(),
			}
		)
	}
	async getUniqueId() {
		return this.options.uniqueId ?? "fake-unique-id"
	}
	async getWorkspaceDirs() {
		return this.options.workspaceDirs ?? ["/workspace"]
	}
	async fileExists(fileUri) {
		if (this.options.fileContents) {
			return this.options.fileContents.has(fileUri)
		}
		return false
	}
	async writeFile(_path, _contents) {
		// No-op by default, tests can override if needed
	}
	async saveFile(_fileUri) {
		// No-op by default, tests can override if needed
	}
	async readFile(fileUri) {
		if (this.options.fileContents) {
			return this.options.fileContents.get(fileUri) ?? ""
		}
		return ""
	}
	async readRangeInFile(_fileUri, _range) {
		// Simplified implementation - tests can override if needed
		return ""
	}
	async getOpenFiles() {
		return this.options.openFiles ?? []
	}
	async getCurrentFile() {
		return this.options.currentFile
	}
	async getFileStats(_files) {
		// Return empty map by default
		return {}
	}
	// LSP methods - return empty arrays by default
	async gotoDefinition(_location) {
		return []
	}
	async gotoTypeDefinition(_location) {
		return []
	}
	async getSignatureHelp(_location) {
		return null
	}
	async getReferences(_location) {
		return []
	}
	async getDocumentSymbols(_textDocumentIdentifier) {
		return []
	}
	// Callbacks
	onDidChangeActiveTextEditor(callback) {
		this.activeTextEditorCallbacks.push(callback)
	}
}
//# sourceMappingURL=FakeIDE.js.map
