import * as vscode from "vscode"
import { VsCodeIde } from "../../continuedev/core/vscode-test-harness/src/VSCodeIde"
import { AutocompleteInput } from "../types"
import { GhostModel } from "../GhostModel"
import { RooIgnoreController } from "../../../core/ignore/RooIgnoreController"
import { AutocompleteSnippet } from "../../continuedev/core/autocomplete/snippets/types"
export declare class GhostContextProvider {
	private contextService
	private ide
	private model
	private ignoreController?
	constructor(context: vscode.ExtensionContext, model: GhostModel, ignoreController?: Promise<RooIgnoreController>)
	/**
	 * Get the IDE instance for use by tracking services
	 */
	getIde(): VsCodeIde
	private uriToFsPath
	private hasFilepath
	private filterSnippetsByAccess
	getProcessedSnippets(
		autocompleteInput: AutocompleteInput,
		filepath: string,
	): Promise<{
		filepathUri: string
		helper: any
		snippetsWithUris: AutocompleteSnippet[]
		workspaceDirs: string[]
	}>
}
//# sourceMappingURL=GhostContextProvider.d.ts.map
