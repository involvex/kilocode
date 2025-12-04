import * as vscode from "vscode"
import { createContext } from "./utils.js"
export class FimTester {
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
		const fimResponse = await this.llmClient.sendFimCompletion(prefix, suffix)
		const completion = fimResponse.completion
		return {
			prefix,
			completion,
			suffix,
		}
	}
	getName() {
		return "fim"
	}
}
//# sourceMappingURL=fim-tester.js.map
