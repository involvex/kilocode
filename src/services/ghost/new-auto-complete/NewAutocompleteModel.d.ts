import { ApiHandler } from "../../../api"
import { ProviderSettingsManager } from "../../../core/config/ProviderSettingsManager"
import { ApiStreamChunk } from "../../../api/transform/stream"
import { ILLM } from "../../continuedev/core/index.js"
export declare class NewAutocompleteModel {
	private apiHandler
	private profile
	loaded: boolean
	constructor(apiHandler?: ApiHandler | null)
	private cleanup
	reload(providerSettingsManager: ProviderSettingsManager): Promise<boolean>
	/**
	 * Creates an ILLM-compatible instance from provider settings for autocomplete.
	 * Supports mistral, kilocode, openrouter, and bedrock providers.
	 * Uses the current profile loaded in this.profile.
	 *
	 * @returns ILLM instance or null if configuration is invalid
	 */
	getILLM(): ILLM | null
	/**
	 * Extracts provider-specific configuration (API key, base URL, model) from this.profile
	 */
	private extractProviderConfig
	/**
	 * Creates the appropriate LLM instance based on provider type
	 */
	private createLLMInstance
	/**
	 * Generate response with streaming callback support
	 */
	generateResponse(
		systemPrompt: string,
		userPrompt: string,
		onChunk: (chunk: ApiStreamChunk) => void,
	): Promise<{
		cost: number
		inputTokens: number
		outputTokens: number
		cacheWriteTokens: number
		cacheReadTokens: number
	}>
	getModelName(): string | null
	getProviderDisplayName(): string | null
	hasValidCredentials(): boolean
}
//# sourceMappingURL=NewAutocompleteModel.d.ts.map
