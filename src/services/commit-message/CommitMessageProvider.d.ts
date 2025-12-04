import * as vscode from "vscode"
/**
 * Orchestrates commit message generation by routing requests to appropriate adapters.
 * This class handles command registration and coordinates between VSCode and JetBrains adapters.
 */
export declare class CommitMessageProvider implements vscode.Disposable {
	private context
	private outputChannel
	private generator
	private vscodeAdapter
	private jetbrainsAdapter
	constructor(context: vscode.ExtensionContext, outputChannel: vscode.OutputChannel)
	/**
	 * Activate the commit message service by registering commands.
	 */
	activate(): Promise<void>
	/**
	 * Handle VSCode-specific command by converting VSCode inputs to generic request.
	 */
	private handleVSCodeCommand
	/**
	 * Handle JetBrains-specific command by creating request from provided args.
	 */
	private handleJetBrainsCommand
	/**
	 * Determine the workspace path from the provided URI or current workspace.
	 */
	private determineWorkspacePath
	/**
	 * Dispose resources and cleanup.
	 */
	dispose(): void
}
//# sourceMappingURL=CommitMessageProvider.d.ts.map
