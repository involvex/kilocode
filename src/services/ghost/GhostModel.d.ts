import { ApiHandler } from "../../api"
import { ProviderSettingsManager } from "../../core/config/ProviderSettingsManager"
import { ApiStreamChunk } from "../../api/transform/stream"
export declare class GhostModel {
	private apiHandler
	profileName: string | null
	profileType: string | null
	private currentProvider
	loaded: boolean
	constructor(apiHandler?: ApiHandler | null)
	private cleanup
	reload(providerSettingsManager: ProviderSettingsManager): Promise<boolean>
	supportsFim(): boolean
	/**
	 * Generate FIM completion using the FIM API endpoint
	 */
	generateFimResponse(
		prefix: string,
		suffix: string,
		onChunk: (text: string) => void,
		taskId?: string,
	): Promise<{
		cost: number
		inputTokens: number
		outputTokens: number
		cacheWriteTokens: number
		cacheReadTokens: number
	}>
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
	getModelName(): string | undefined
	getProviderDisplayName(): string | undefined
	getRolloutHash_IfLoggedInToKilo(): number | undefined
	hasValidCredentials(): boolean
}
//# sourceMappingURL=GhostModel.d.ts.map
