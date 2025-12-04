import { modelIdKeysByProvider } from "@roo-code/types"
import { buildApiHandler } from "../../api"
import { OpenRouterHandler } from "../../api/providers"
import { AUTOCOMPLETE_PROVIDER_MODELS, checkKilocodeBalance } from "./utils/kilocode-utils"
import { KilocodeOpenrouterHandler } from "../../api/providers/kilocode-openrouter"
import { PROVIDERS } from "../../../webview-ui/src/components/settings/constants"
// Convert PROVIDERS array to a lookup map for display names
const PROVIDER_DISPLAY_NAMES = Object.fromEntries(PROVIDERS.map(({ value, label }) => [value, label]))
export class GhostModel {
	apiHandler = null
	profileName = null
	profileType = null
	currentProvider = null
	loaded = false
	constructor(apiHandler = null) {
		if (apiHandler) {
			this.apiHandler = apiHandler
			this.loaded = true
		}
	}
	cleanup() {
		this.apiHandler = null
		this.profileName = null
		this.profileType = null
		this.currentProvider = null
		this.loaded = false
	}
	async reload(providerSettingsManager) {
		const profiles = await providerSettingsManager.listConfig()
		this.cleanup()
		const selectedProfile = profiles.find((x) => x.profileType === "autocomplete")
		if (selectedProfile) {
			const profile = await providerSettingsManager.getProfile({ id: selectedProfile.id })
			if (profile.apiProvider) {
				await useProfile(this, profile, profile.apiProvider)
				return true
			}
		}
		for (const [provider, model] of AUTOCOMPLETE_PROVIDER_MODELS) {
			const selectedProfile = profiles.find(
				(x) => x?.apiProvider === provider && !(x.profileType === "autocomplete"),
			)
			if (!selectedProfile) continue
			const profile = await providerSettingsManager.getProfile({ id: selectedProfile.id })
			if (provider === "kilocode") {
				// For all other providers, assume they are usable
				if (!profile.kilocodeToken) continue
				if (!(await checkKilocodeBalance(profile.kilocodeToken, profile.kilocodeOrganizationId))) continue
			}
			await useProfile(this, { ...profile, [modelIdKeysByProvider[provider]]: model }, provider)
			return true
		}
		this.loaded = true // we loaded, and found nothing, but we do not wish to reload
		return false
		async function useProfile(self, profile, provider) {
			self.profileName = profile.name || null
			self.profileType = profile.profileType || null
			self.currentProvider = provider
			self.apiHandler = buildApiHandler(profile)
			if (self.apiHandler instanceof OpenRouterHandler) await self.apiHandler.fetchModel()
			self.loaded = true
		}
	}
	supportsFim() {
		if (!this.apiHandler) {
			return false
		}
		if (this.apiHandler instanceof KilocodeOpenrouterHandler) {
			return this.apiHandler.supportsFim()
		}
		return false
	}
	/**
	 * Generate FIM completion using the FIM API endpoint
	 */
	async generateFimResponse(prefix, suffix, onChunk, taskId) {
		if (!this.apiHandler) {
			console.error("API handler is not initialized")
			throw new Error("API handler is not initialized. Please check your configuration.")
		}
		if (!(this.apiHandler instanceof KilocodeOpenrouterHandler)) {
			throw new Error("FIM is only supported for KiloCode provider")
		}
		if (!this.apiHandler.supportsFim()) {
			throw new Error("Current model does not support FIM completions")
		}
		console.log("USED MODEL (FIM)", this.apiHandler.getModel())
		let usage
		for await (const chunk of this.apiHandler.streamFim(prefix, suffix, taskId, (u) => {
			usage = u
		})) {
			onChunk(chunk)
		}
		const cost = usage ? this.apiHandler.getTotalCost(usage) : 0
		const inputTokens = usage?.prompt_tokens ?? 0
		const outputTokens = usage?.completion_tokens ?? 0
		const cacheReadTokens = usage?.prompt_tokens_details?.cached_tokens ?? 0
		return {
			cost,
			inputTokens,
			outputTokens,
			cacheWriteTokens: 0, // FIM doesn't support cache writes
			cacheReadTokens,
		}
	}
	/**
	 * Generate response with streaming callback support
	 */
	async generateResponse(systemPrompt, userPrompt, onChunk) {
		if (!this.apiHandler) {
			console.error("API handler is not initialized")
			throw new Error("API handler is not initialized. Please check your configuration.")
		}
		console.log("USED MODEL", this.apiHandler.getModel())
		const stream = this.apiHandler.createMessage(systemPrompt, [
			{ role: "user", content: [{ type: "text", text: userPrompt }] },
		])
		let cost = 0
		let inputTokens = 0
		let outputTokens = 0
		let cacheReadTokens = 0
		let cacheWriteTokens = 0
		try {
			for await (const chunk of stream) {
				// Call the callback with each chunk
				onChunk(chunk)
				// Track usage information
				if (chunk.type === "usage") {
					cost = chunk.totalCost ?? 0
					cacheReadTokens = chunk.cacheReadTokens ?? 0
					cacheWriteTokens = chunk.cacheWriteTokens ?? 0
					inputTokens = chunk.inputTokens ?? 0
					outputTokens = chunk.outputTokens ?? 0
				}
			}
		} catch (error) {
			console.error("Error streaming completion:", error)
			throw error
		}
		return {
			cost,
			inputTokens,
			outputTokens,
			cacheWriteTokens,
			cacheReadTokens,
		}
	}
	getModelName() {
		if (!this.apiHandler) return undefined
		return this.apiHandler.getModel().id ?? undefined
	}
	getProviderDisplayName() {
		if (!this.currentProvider) return undefined
		return PROVIDER_DISPLAY_NAMES[this.currentProvider]
	}
	getRolloutHash_IfLoggedInToKilo() {
		return this.apiHandler instanceof KilocodeOpenrouterHandler ? this.apiHandler.getRolloutHash() : undefined
	}
	hasValidCredentials() {
		return this.apiHandler !== null && this.loaded
	}
}
//# sourceMappingURL=GhostModel.js.map
