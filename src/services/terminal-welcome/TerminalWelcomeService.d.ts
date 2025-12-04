import * as vscode from "vscode"
/**
 * Service that displays welcome messages in newly opened terminals
 */
export declare class TerminalWelcomeService {
	private context
	private disposables
	private tipShownThisSession
	constructor(context: vscode.ExtensionContext)
	static register(context: vscode.ExtensionContext): void
	initialize(): void
	private handleTerminalOpened
	private showWelcomeMessage
	dispose(): void
}
//# sourceMappingURL=TerminalWelcomeService.d.ts.map
