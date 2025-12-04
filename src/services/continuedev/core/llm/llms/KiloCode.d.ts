import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js"
import OpenRouter from "./OpenRouter"
import { IFimProvider } from "../../../../../api/providers/kilocode/IFimProvider"
/**
 * Extended CompletionOptions to include KiloCode-specific per-request metadata
 */
export interface KiloCodeCompletionOptions extends CompletionOptions {
	kilocodeTaskId?: string
	kilocodeProjectId?: string
}
/**
 * KiloCode LLM provider that extends OpenRouter with KiloCode-specific features:
 * - Custom base URL using getKiloUrlFromToken()
 * - KiloCode-specific headers (organizationId, taskId, projectId, version, tester)
 * - Support for both static (organizationId) and per-request (taskId, projectId) metadata
 *
 * This provider maintains API parity with the kilocode-openrouter API provider
 * while working within the continuedev LLM architecture.
 */
declare class KiloCode extends OpenRouter {
	static providerName: string
	private currentTaskId?
	private currentProjectId?
	fimProvider?: IFimProvider
	constructor(options: LLMOptions)
	/**
	 * Override _streamChat to extract per-request metadata from options
	 * This allows dynamic taskId and projectId per request
	 */
	protected _streamChat(
		messages: ChatMessage[],
		signal: AbortSignal,
		options: CompletionOptions,
	): AsyncGenerator<ChatMessage>
	/**
	 * Override _streamComplete to support per-request metadata
	 */
	protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>
	/**
	 * Override _streamFim to delegate to IFimProvider
	 * This reuses the FIM implementation from the API handler
	 */
	protected _streamFim(
		prefix: string,
		suffix: string,
		signal: AbortSignal,
		options: CompletionOptions,
	): AsyncGenerator<string>
	/**
	 * Override _getHeaders to inject KiloCode-specific headers
	 * Delegates to FIM provider's customRequestOptions() for consistency
	 */
	protected _getHeaders(): {
		"api-key": string
		Authorization?: string | undefined
		"Content-Type": string
	}
	supportsFim(): boolean
}
export default KiloCode
//# sourceMappingURL=KiloCode.d.ts.map
