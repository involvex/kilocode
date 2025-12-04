/**
 * Minimal configuration for autocomplete and NextEdit features.
 * This replaces the complex ConfigHandler system with simple hardcoded defaults.
 *
 * Analysis of ConfigHandler usage:
 * - CompletionProvider needs: config.tabAutocompleteOptions, config.experimental.enableStaticContextualization, currentProfile.profileType
 * - NextEditProvider needs: config.tabAutocompleteOptions, currentProfile.profileType
 * - NextEdit context fetching needs: config.modelsByRole, config.selectedModelByRole
 *
 * The profileType is only used for logging/telemetry, so we can set it to undefined for a minimal extraction.
 */
import { ILLM, TabAutocompleteOptions } from "../index.js"
interface MinimalConfig {
	tabAutocompleteOptions?: TabAutocompleteOptions
	experimental?: {
		enableStaticContextualization?: boolean
	}
	modelsByRole?: {
		autocomplete?: ILLM[]
	}
	selectedModelByRole?: {
		autocomplete?: ILLM
		edit?: ILLM
		chat?: ILLM
		rerank?: ILLM
	}
	rules?: unknown[]
}
interface MinimalProfile {
	profileDescription: {
		profileType?: "control-plane" | "local" | "platform"
	}
}
/**
 * Simple config provider that replaces ConfigHandler for autocomplete/NextEdit.
 * Returns hardcoded configuration without dependencies on control-plane.
 */
export declare class MinimalConfigProvider {
	private config
	currentProfile: MinimalProfile | undefined
	constructor(config?: Partial<MinimalConfig>)
	/**
	 * Returns the config in the same shape as ConfigHandler.loadConfig()
	 * This maintains API compatibility with existing code.
	 */
	loadConfig(): Promise<{
		config: MinimalConfig
	}>
	/**
	 * Get autocomplete options directly
	 */
	getAutocompleteOptions(): TabAutocompleteOptions
	/**
	 * Check if static contextualization is enabled
	 */
	isStaticContextualizationEnabled(): boolean
	/**
	 * Reload config (stub for compatibility)
	 */
	reloadConfig(..._args: unknown[]): Promise<void>
	/**
	 * Register config update handler (stub for compatibility)
	 */
	onConfigUpdate(_handler: (event: { config: MinimalConfig; configLoadInterrupted: boolean }) => void): void
	/**
	 * Register custom context provider (stub for compatibility)
	 */
	registerCustomContextProvider(_provider: unknown): void
}
export {}
//# sourceMappingURL=MinimalConfig.d.ts.map
