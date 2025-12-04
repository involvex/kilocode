import { HoleFiller, parseGhostResponse } from "../services/ghost/classic-auto-complete/HoleFiller.js"
import * as vscode from "vscode"
import crypto from "crypto"
import { createContext } from "./utils.js"
// Mock context provider for standalone testing
function createMockContextProvider(prefix, suffix, filepath) {
	return {
		getProcessedSnippets: async () => ({
			filepathUri: `file://${filepath}`,
			helper: {
				filepath: `file://${filepath}`,
				lang: { name: "typescript", singleLineComment: "//" },
				prunedPrefix: prefix,
				prunedSuffix: suffix,
			},
			snippetsWithUris: [],
			workspaceDirs: [],
		}),
	}
}
export class HoleFillerTester {
	llmClient
	constructor(llmClient) {
		this.llmClient = llmClient
	}
	async getCompletion(code, testCaseName = "test") {
		const context = createContext(code, testCaseName)
		const position = context.range?.start ?? new vscode.Position(0, 0)
		const offset = context.document.offsetAt(position)
		const text = context.document.getText()
		const prefix = text.substring(0, offset)
		const suffix = text.substring(offset)
		const languageId = context.document.languageId || "javascript"
		const filepath = context.document.uri.fsPath
		// Create a mock context provider with the current prefix/suffix
		const mockContextProvider = createMockContextProvider(prefix, suffix, filepath)
		const holeFiller = new HoleFiller(mockContextProvider)
		const autocompleteInput = {
			isUntitledFile: false,
			completionId: crypto.randomUUID(),
			filepath,
			pos: { line: position.line, character: position.character },
			recentlyVisitedRanges: [],
			recentlyEditedRanges: [],
		}
		const { systemPrompt, userPrompt } = await holeFiller.getPrompts(autocompleteInput, languageId)
		const response = await this.llmClient.sendPrompt(systemPrompt, userPrompt)
		const parseResult = parseGhostResponse(response.content, prefix, suffix)
		const completion = parseResult.text
		return {
			prefix,
			completion,
			suffix,
		}
	}
	getName() {
		return "hole-filler"
	}
}
//# sourceMappingURL=hole-filler-tester.js.map
