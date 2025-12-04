import * as fs from "node:fs"
import { fileURLToPath } from "node:url"
class FileSystemIde {
	workspaceDir
	constructor(workspaceDir) {
		this.workspaceDir = workspaceDir
	}
	fileExists(fileUri) {
		const filepath = fileURLToPath(fileUri)
		return Promise.resolve(fs.existsSync(filepath))
	}
	gotoDefinition(_location) {
		return Promise.resolve([])
	}
	gotoTypeDefinition(_location) {
		return Promise.resolve([])
	}
	getSignatureHelp(_location) {
		return Promise.resolve(null)
	}
	getReferences(_location) {
		return Promise.resolve([])
	}
	getDocumentSymbols(_fileUri) {
		return Promise.resolve([])
	}
	onDidChangeActiveTextEditor(_callback) {
		return
	}
	async getFileStats(fileUris) {
		const result = {}
		for (const uri of fileUris) {
			try {
				const filepath = fileURLToPath(uri)
				const stats = fs.statSync(filepath)
				result[uri] = {
					lastModified: stats.mtimeMs,
					size: stats.size,
				}
			} catch (error) {
				console.error(`Error getting last modified time for ${uri}:`, error)
			}
		}
		return result
	}
	getIdeInfo() {
		return Promise.resolve({
			ideType: "vscode",
			name: "na",
			version: "0.1",
			remoteName: "na",
			extensionVersion: "na",
			isPrerelease: false,
		})
	}
	readRangeInFile(_fileUri, _range) {
		return Promise.resolve("")
	}
	getUniqueId() {
		return Promise.resolve("NOT_UNIQUE")
	}
	getClipboardContent() {
		return Promise.resolve({ text: "", copiedAt: new Date().toISOString() })
	}
	getWorkspaceDirs() {
		return Promise.resolve([this.workspaceDir])
	}
	writeFile(fileUri, contents) {
		const filepath = fileURLToPath(fileUri)
		return new Promise((resolve, reject) => {
			fs.writeFile(filepath, contents, (err) => {
				if (err) {
					reject(err)
				}
				resolve()
			})
		})
	}
	saveFile(_fileUri) {
		return Promise.resolve()
	}
	readFile(fileUri) {
		const filepath = fileURLToPath(fileUri)
		return new Promise((resolve, reject) => {
			fs.readFile(filepath, "utf8", (err, contents) => {
				if (err) {
					reject(err)
				}
				resolve(contents)
			})
		})
	}
	getCurrentFile() {
		return Promise.resolve(undefined)
	}
	getOpenFiles() {
		return Promise.resolve([])
	}
}
export { FileSystemIde }
//# sourceMappingURL=filesystem.js.map
