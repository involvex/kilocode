import * as vscode from "vscode"
import { GhostCodeActionProvider } from "./GhostCodeActionProvider"
import { GhostInlineCompletionProvider } from "./classic-auto-complete/GhostInlineCompletionProvider"
import { ClineProvider } from "../../core/webview/ClineProvider"
export declare class GhostServiceManager {
	private readonly model
	private readonly cline
	private readonly context
	private settings
	private taskId
	private statusBar
	private sessionCost
	private completionCount
	private sessionStartTime
	readonly codeActionProvider: GhostCodeActionProvider
	readonly inlineCompletionProvider: GhostInlineCompletionProvider
	private newAutocompleteProvider
	private inlineCompletionProviderDisposable
	constructor(context: vscode.ExtensionContext, cline: ClineProvider)
	load(): Promise<void>
	private updateInlineCompletionProviderRegistration
	disable(): Promise<void>
	codeSuggestion(): Promise<void>
	private updateGlobalContext
	private initializeStatusBar
	private getCurrentModelName
	private getCurrentProviderName
	private hasValidApiToken
	private updateCostTracking
	private updateStatusBar
	showIncompatibilityExtensionPopup(): Promise<void>
	/**
	 * Dispose of all resources used by the GhostServiceManager
	 */
	dispose(): void
}
//# sourceMappingURL=GhostServiceManager.d.ts.map
