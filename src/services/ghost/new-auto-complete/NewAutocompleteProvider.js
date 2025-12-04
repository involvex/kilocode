import * as vscode from "vscode"
import { NewAutocompleteModel } from "./NewAutocompleteModel"
import { ContextProxy } from "../../../core/config/ContextProxy"
import { ProviderSettingsManager } from "../../../core/config/ProviderSettingsManager"
import { MinimalConfigProvider } from "../../continuedev/core/autocomplete/MinimalConfig"
import { VsCodeIde } from "../../continuedev/core/vscode-test-harness/src/VSCodeIde"
import { ContinueCompletionProvider } from "../../continuedev/core/vscode-test-harness/src/autocomplete/completionProvider"
export class NewAutocompleteProvider {
	context
	cline
	completionProviderDisposable = null
	model
	providerSettingsManager
	settings = null
	constructor(context, cline) {
		this.context = context
		this.cline = cline
		this.providerSettingsManager = new ProviderSettingsManager(context)
		this.model = new NewAutocompleteModel()
	}
	async saveSettings() {
		if (!this.settings) {
			return
		}
		const settingsWithModelInfo = {
			...this.settings,
			provider: this.getCurrentProviderName(),
			model: this.getCurrentModelName(),
		}
		await ContextProxy.instance.setValues({ ghostServiceSettings: settingsWithModelInfo })
		await this.cline.postStateToWebview()
	}
	async loadCodeCompletion() {
		try {
			// Dispose any existing registration up front to keep logic centralized
			this.dispose()
			// Decide whether the provider should be registered at all based on settings
			if (!this.settings?.enableAutoTrigger) {
				return
			}
			// The model.reload() has already loaded the profile, so we can get the ILLM
			const llm = this.model.getILLM()
			if (!llm) {
				console.warn("[NewAutocompleteProvider] No valid autocomplete provider found")
				return
			}
			const minimalConfigProvider = new MinimalConfigProvider({
				selectedModelByRole: {
					autocomplete: llm,
				},
			})
			const ide = new VsCodeIde(this.context)
			const usingFullFileDiff = false
			const continueProvider = new ContinueCompletionProvider(minimalConfigProvider, ide, usingFullFileDiff)
			// Register provider and hold onto disposable to prevent duplicates
			this.completionProviderDisposable = vscode.languages.registerInlineCompletionItemProvider(
				[{ pattern: "**" }],
				continueProvider,
			)
			this.context.subscriptions.push(this.completionProviderDisposable)
			console.log("[NewAutocompleteProvider] Successfully registered autocomplete")
		} catch (error) {
			console.error("[NewAutocompleteProvider] Error loading code completion:", error)
		}
	}
	async load() {
		this.settings = ContextProxy.instance.getGlobalState("ghostServiceSettings")
		await this.model.reload(this.providerSettingsManager)
		await this.saveSettings()
		this.loadCodeCompletion()
	}
	async disable() {
		this.settings = {
			...this.settings,
			enableAutoTrigger: false,
			enableSmartInlineTaskKeybinding: false,
			enableQuickInlineTaskKeybinding: false,
		}
		await this.saveSettings()
		await this.load()
	}
	async enable() {
		this.settings = {
			...this.settings,
			enableAutoTrigger: true,
			enableSmartInlineTaskKeybinding: true,
			enableQuickInlineTaskKeybinding: true,
		}
		await this.saveSettings()
		await this.load()
	}
	getCurrentModelName() {
		if (!this.model.loaded) {
			return "loading..."
		}
		return this.model.getModelName() ?? "unknown"
	}
	getCurrentProviderName() {
		if (!this.model.loaded) {
			return "loading..."
		}
		return this.model.getProviderDisplayName() ?? "unknown"
	}
	/**
	 * Dispose of all resources used by the NewAutocompleteProvider
	 */
	dispose() {
		if (this.completionProviderDisposable) {
			this.completionProviderDisposable.dispose()
			this.completionProviderDisposable = null
		}
	}
}
//# sourceMappingURL=NewAutocompleteProvider.js.map
