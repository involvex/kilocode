import * as vscode from "vscode"
import { MockTextDocument } from "../../mocking/MockTextDocument"
/**
 * Mock implementation of the key VSCode workspace APIs needed for testing GhostWorkspaceEdit
 */
export declare class MockWorkspace {
	private documents
	private appliedEdits
	addDocument(uri: vscode.Uri, content: string): MockTextDocument
	openTextDocument(uri: vscode.Uri): Promise<vscode.TextDocument>
	applyEdit(workspaceEdit: vscode.WorkspaceEdit): Promise<boolean>
	private applyTextEditsToDocument
	getDocumentContent(uri: vscode.Uri): string
	getAppliedEdits(): vscode.WorkspaceEdit[]
	clear(): void
}
//# sourceMappingURL=MockWorkspace.d.ts.map
