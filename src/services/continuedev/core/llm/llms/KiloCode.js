import { X_KILOCODE_VERSION } from "../../../../../shared/kilocode/headers"
import { Package } from "../../../../../shared/package"
import OpenRouter from "./OpenRouter"
import { getKiloUrlFromToken } from "@roo-code/types"
/**
 * KiloCode LLM provider that extends OpenRouter with KiloCode-specific features:
 * - Custom base URL using getKiloUrlFromToken()
 * - KiloCode-specific headers (organizationId, taskId, projectId, version, tester)
 * - Support for both static (organizationId) and per-request (taskId, projectId) metadata
 *
 * This provider maintains API parity with the kilocode-openrouter API provider
 * while working within the continuedev LLM architecture.
 */
class KiloCode extends OpenRouter {
	static providerName = "kilocode"
	// Instance variables to store per-request metadata
	currentTaskId
	currentProjectId
	fimProvider
	constructor(options) {
		// Extract KiloCode-specific config from env
		const kilocodeToken = options.apiKey ?? ""
		// Extract fimProvider before passing to parent
		const { fimProvider, ...parentOptions } = options
		// Transform apiBase to use KiloCode backend
		const transformedOptions = {
			...parentOptions,
			apiBase: getKiloUrlFromToken("https://api.kilocode.ai/api/openrouter/v1/", kilocodeToken),
		}
		super(transformedOptions)
		// Use provided handler or create a new one if not provided
		this.fimProvider = fimProvider
	}
	/**
	 * Override _streamChat to extract per-request metadata from options
	 * This allows dynamic taskId and projectId per request
	 */
	async *_streamChat(messages, signal, options) {
		// Extract KiloCode metadata from options if available
		const kilocodeOptions = options
		this.currentTaskId = kilocodeOptions.kilocodeTaskId
		this.currentProjectId = kilocodeOptions.kilocodeProjectId
		try {
			// Call parent implementation
			yield* super._streamChat(messages, signal, options)
		} finally {
			// Clear per-request metadata after stream completes
			this.currentTaskId = undefined
			this.currentProjectId = undefined
		}
	}
	/**
	 * Override _streamComplete to support per-request metadata
	 */
	async *_streamComplete(prompt, signal, options) {
		// Extract metadata (same pattern as _streamChat)
		const kilocodeOptions = options
		this.currentTaskId = kilocodeOptions.kilocodeTaskId
		this.currentProjectId = kilocodeOptions.kilocodeProjectId
		try {
			yield* super._streamComplete(prompt, signal, options)
		} finally {
			// Clear metadata
			this.currentTaskId = undefined
			this.currentProjectId = undefined
		}
	}
	/**
	 * Override _streamFim to delegate to IFimProvider
	 * This reuses the FIM implementation from the API handler
	 */
	async *_streamFim(prefix, suffix, signal, options) {
		if (!this.fimProvider) {
			throw new Error("FIM provider not initialized")
		}
		// Extract metadata (same pattern as _streamChat)
		const kilocodeOptions = options
		this.currentTaskId = kilocodeOptions.kilocodeTaskId
		this.currentProjectId = kilocodeOptions.kilocodeProjectId
		try {
			// Delegate to FIM provider's streamFim method
			yield* this.fimProvider.streamFim(prefix, suffix, this.currentTaskId)
		} finally {
			// Clear metadata
			this.currentTaskId = undefined
			this.currentProjectId = undefined
		}
	}
	/**
	 * Override _getHeaders to inject KiloCode-specific headers
	 * Delegates to FIM provider's customRequestOptions() for consistency
	 */
	_getHeaders() {
		const baseHeaders = super._getHeaders()
		// Always add version header
		const kilocodeHeaders = {
			[X_KILOCODE_VERSION]: Package.version,
		}
		// Delegate to FIM provider's customRequestOptions for other KiloCode headers
		// Only call if we have a taskId (required by the metadata interface)
		if (this.fimProvider && this.currentTaskId) {
			const customOptions = this.fimProvider.customRequestOptions({
				taskId: this.currentTaskId,
				projectId: this.currentProjectId,
				mode: "code", // Default mode for LLM operations
			})
			if (customOptions?.headers) {
				Object.assign(kilocodeHeaders, customOptions.headers)
			}
		}
		return {
			...baseHeaders,
			...kilocodeHeaders,
		}
	}
	supportsFim() {
		return this.fimProvider?.supportsFim() || false
	}
}
export default KiloCode
//# sourceMappingURL=KiloCode.js.map
