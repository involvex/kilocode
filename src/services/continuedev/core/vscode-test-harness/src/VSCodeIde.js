import * as vscode from "vscode"
import * as URI from "uri-js"
import { executeGotoProvider, executeSignatureHelpProvider, executeSymbolProvider } from "./autocomplete/lsp"
async function stat(uri) {
	try {
		return await vscode.workspace.fs.stat(uri)
	} catch {
		return null
	}
}
function areEqualURIs(uri1, uri2) {
	return URI.equal(uri1.toString(), uri2.toString())
}
async function readFile(uri) {
	const openDocuments = vscode.workspace.textDocuments
	for (const document of openDocuments) {
		if (areEqualURIs(document.uri, uri)) {
			// Found an open document with this URI.
			// Return its current content (including any unsaved changes) as Uint8Array.
			const docText = document.getText()
			return new Uint8Array(Buffer.from(docText, "utf8"))
		}
	}
	try {
		return await vscode.workspace.fs.readFile(uri)
	} catch {
		return null
	}
}
function documentIsCode(uri) {
	return uri.scheme === "file" || uri.scheme === "vscode-remote"
}
export class VsCodeIde {
	context
	static MAX_BYTES = 100000
	constructor(context) {
		this.context = context
	}
	getIdeInfo() {
		return Promise.resolve({
			ideType: "vscode",
			// name: vscode.env.appName,
			// version: vscode.version,
			// remoteName: vscode.env.remoteName || "local",
			// extensionVersion: getExtensionVersion(),
			// isPrerelease: isExtensionPrerelease(),
		})
	}
	async getClipboardContent() {
		return {
			text: await vscode.env.clipboard.readText(),
			copiedAt: new Date().toISOString(),
		}
	}
	getUniqueId() {
		return Promise.resolve(vscode.env.machineId)
	}
	_workspaceDirectories = undefined
	async getWorkspaceDirs() {
		if (!this._workspaceDirectories) {
			this._workspaceDirectories = vscode.workspace.workspaceFolders?.map((folder) => folder.uri)
		}
		return this._workspaceDirectories?.map((uri) => uri.toString()) ?? []
	}
	async fileExists(fileUri) {
		try {
			await stat(vscode.Uri.file(fileUri))
			return true
		} catch {
			console.error(`File does not exist: ${fileUri}`)
			return false
		}
	}
	async writeFile(path, contents) {
		await vscode.workspace.fs.writeFile(vscode.Uri.file(path), Buffer.from(contents))
	}
	async saveFile(fileUri) {
		console.log(`Saving file: ${fileUri}`)
		const uri = vscode.Uri.parse(fileUri)
		vscode.window.visibleTextEditors.forEach(async (editor) => {
			if (areEqualURIs(uri, editor.document.uri)) {
				await editor.document.save()
			}
		})
	}
	async readFile(fileUri) {
		try {
			const uri = vscode.Uri.parse(fileUri)
			// First, check whether it's a notebook document
			// Need to iterate over the cells to get full contents
			const notebook =
				vscode.workspace.notebookDocuments.find((doc) => URI.equal(doc.uri.toString(), uri.toString())) ??
				(uri.path.endsWith("ipynb") ? await vscode.workspace.openNotebookDocument(uri) : undefined)
			if (notebook) {
				return notebook
					.getCells()
					.map((cell) => cell.document.getText())
					.join("\n\n")
			}
			// Check whether it's an open document
			const openTextDocument = vscode.workspace.textDocuments.find((doc) =>
				URI.equal(doc.uri.toString(), uri.toString()),
			)
			if (openTextDocument !== undefined) {
				return openTextDocument.getText()
			}
			const fileStats = await stat(uri)
			if (fileStats === null || fileStats.size > 10 * VsCodeIde.MAX_BYTES) {
				return ""
			}
			const bytes = await readFile(uri)
			if (bytes === null) {
				return ""
			}
			// Truncate the buffer to the first MAX_BYTES
			const truncatedBytes = bytes.slice(0, VsCodeIde.MAX_BYTES)
			const contents = new TextDecoder().decode(truncatedBytes)
			return contents
		} catch (e) {
			return ""
		}
	}
	async readRangeInFile(fileUri, range) {
		const buffer = await readFile(vscode.Uri.parse(fileUri))
		if (buffer === null) {
			return ""
		}
		const contents = new TextDecoder().decode(buffer)
		const lines = contents.split("\n")
		return `${lines.slice(range.start.line, range.end.line).join("\n")}\n${lines[range.end.line < lines.length - 1 ? range.end.line : lines.length - 1].slice(0, range.end.character)}`
	}
	async getOpenFiles() {
		return vscode.window.tabGroups.all
			.flatMap((group) => group.tabs)
			.filter((tab) => tab.input instanceof vscode.TabInputText && documentIsCode(tab.input.uri))
			.map((tab) => tab.input.uri.toString())
	}
	async getCurrentFile() {
		if (!vscode.window.activeTextEditor) {
			return undefined
		}
		return {
			isUntitled: vscode.window.activeTextEditor.document.isUntitled,
			path: vscode.window.activeTextEditor.document.uri.toString(),
			contents: vscode.window.activeTextEditor.document.getText(),
		}
	}
	async getFileStats(files) {
		const pathToLastModified = {}
		await Promise.all(
			files.map(async (file) => {
				const statx = await stat(vscode.Uri.parse(file))
				pathToLastModified[file] = {
					lastModified: statx.mtime,
					size: statx.size,
				}
			}),
		)
		return pathToLastModified
	}
	async gotoDefinition(location) {
		const result = await executeGotoProvider({
			uri: vscode.Uri.parse(location.filepath),
			line: location.position.line,
			character: location.position.character,
			name: "vscode.executeDefinitionProvider",
		})
		return result
	}
	async gotoTypeDefinition(location) {
		const result = await executeGotoProvider({
			uri: vscode.Uri.parse(location.filepath),
			line: location.position.line,
			character: location.position.character,
			name: "vscode.executeTypeDefinitionProvider",
		})
		return result
	}
	async getSignatureHelp(location) {
		const result = await executeSignatureHelpProvider({
			uri: vscode.Uri.parse(location.filepath),
			line: location.position.line,
			character: location.position.character,
			name: "vscode.executeSignatureHelpProvider",
		})
		return result
	}
	async getReferences(location) {
		const result = await executeGotoProvider({
			uri: vscode.Uri.parse(location.filepath),
			line: location.position.line,
			character: location.position.character,
			name: "vscode.executeReferenceProvider",
		})
		return result
	}
	async getDocumentSymbols(textDocumentIdentifier) {
		const result = await executeSymbolProvider({
			uri: vscode.Uri.parse(textDocumentIdentifier),
			name: "vscode.executeDocumentSymbolProvider",
		})
		return result
	}
	onDidChangeActiveTextEditor(callback) {
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor) {
				callback(editor.document.uri.toString())
			}
		})
	}
}
//# sourceMappingURL=VSCodeIde.js.map
