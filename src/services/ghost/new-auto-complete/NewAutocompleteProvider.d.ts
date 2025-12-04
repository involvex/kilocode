import * as vscode from "vscode"
import { ClineProvider } from "../../../core/webview/ClineProvider"
export declare class NewAutocompleteProvider {
	private context
	private cline
	private completionProviderDisposable
	private readonly model
	private readonly providerSettingsManager
	private settings
	constructor(context: vscode.ExtensionContext, cline: ClineProvider)
	private saveSettings
	private loadCodeCompletion
	load(): Promise<void>
	disable(): Promise<void>
	enable(): Promise<void>
	private getCurrentModelName
	private getCurrentProviderName
	/**
	 * Dispose of all resources used by the NewAutocompleteProvider
	 */
	dispose(): void
}
//# sourceMappingURL=NewAutocompleteProvider.d.ts.map
