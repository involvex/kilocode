import * as vscode from "vscode"
export declare class GhostCodeActionProvider implements vscode.CodeActionProvider {
	readonly providedCodeActionKinds: {
		quickfix: vscode.CodeActionKind
	}
	provideCodeActions(
		document: vscode.TextDocument,
		range: vscode.Range | vscode.Selection,
		_context: vscode.CodeActionContext,
		_token: vscode.CancellationToken,
	): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]>
	resolveCodeAction(codeAction: vscode.CodeAction, token: vscode.CancellationToken): Promise<vscode.CodeAction>
}
//# sourceMappingURL=GhostCodeActionProvider.d.ts.map
