import {
	GoogleGenAI,
	FinishReason, // kilocode_change
} from "@google/genai"
import {
	// type GeminiModelId, // kilocode_change
	geminiDefaultModelId,
	geminiModels,
} from "@roo-code/types"
import { safeJsonParse } from "../../shared/safeJsonParse"
import { convertAnthropicContentToGemini, convertAnthropicMessageToGemini } from "../transform/gemini-format"
import { t } from "i18next"
import { getModelParams } from "../transform/model-params"
import { BaseProvider } from "./base-provider"
import { throwMaxCompletionTokensReachedError } from "./kilocode/verifyFinishReason"
import { getGeminiModels } from "./fetchers/gemini" // kilocode_change
export class GeminiHandler extends BaseProvider {
	options
	client
	// kilocode_change start
	models = { ...geminiModels }
	modelsLoaded = false
	modelsLoading
	isVertex
	// kilocode_change end
	constructor({ isVertex, ...options }) {
		super()
		this.options = options
		this.isVertex = !!isVertex // kilocode_change
		const project = this.options.vertexProjectId ?? "not-provided"
		const location = this.options.vertexRegion ?? "not-provided"
		const apiKey = this.options.geminiApiKey ?? "not-provided"
		this.client = this.options.vertexJsonCredentials
			? new GoogleGenAI({
					vertexai: true,
					project,
					location,
					googleAuthOptions: {
						credentials: safeJsonParse(this.options.vertexJsonCredentials, undefined),
					},
				})
			: this.options.vertexKeyFile
				? new GoogleGenAI({
						vertexai: true,
						project,
						location,
						googleAuthOptions: { keyFile: this.options.vertexKeyFile },
					})
				: isVertex
					? new GoogleGenAI({ vertexai: true, project, location })
					: new GoogleGenAI({ apiKey })
	}
	// kilocode_change start
	async ensureModelsLoaded() {
		if (this.isVertex) {
			return
		}
		if (this.modelsLoaded) {
			return
		}
		if (!this.modelsLoading) {
			this.modelsLoading = this.loadModels().finally(() => {
				this.modelsLoaded = true
				this.modelsLoading = undefined
			})
		}
		await this.modelsLoading
	}
	async loadModels() {
		try {
			this.models = await getGeminiModels({
				apiKey: this.options.geminiApiKey,
				baseUrl: this.options.googleGeminiBaseUrl,
			})
		} catch (error) {
			console.error("[GeminiHandler] Failed to fetch Gemini models", error)
			this.models = { ...geminiModels }
		}
	}
	// kilocode_change end
	async *createMessage(systemInstruction, messages, metadata) {
		await this.ensureModelsLoaded() // kilocode_change
		const { id: model, info, reasoning: thinkingConfig, maxTokens } = this.getModel()
		const contents = messages.map(convertAnthropicMessageToGemini)
		const tools = []
		if (this.options.enableUrlContext) {
			tools.push({ urlContext: {} })
		}
		if (this.options.enableGrounding) {
			tools.push({ googleSearch: {} })
		}
		const config = {
			systemInstruction,
			httpOptions: this.options.googleGeminiBaseUrl ? { baseUrl: this.options.googleGeminiBaseUrl } : undefined,
			thinkingConfig,
			maxOutputTokens: this.options.modelMaxTokens ?? maxTokens ?? undefined,
			temperature: this.options.modelTemperature ?? 0,
			...(tools.length > 0 ? { tools } : {}),
		}
		const params = { model, contents, config }
		try {
			const result = await this.client.models.generateContentStream(params)
			let lastUsageMetadata
			let pendingGroundingMetadata
			for await (const chunk of result) {
				// Process candidates and their parts to separate thoughts from content
				if (chunk.candidates && chunk.candidates.length > 0) {
					const candidate = chunk.candidates[0]
					// kilocode_change start
					if (candidate.finishReason === FinishReason.MAX_TOKENS) {
						throwMaxCompletionTokensReachedError()
					}
					// kilocode_change end
					if (candidate.groundingMetadata) {
						pendingGroundingMetadata = candidate.groundingMetadata
					}
					if (candidate.content && candidate.content.parts) {
						for (const part of candidate.content.parts) {
							if (part.thought) {
								// This is a thinking/reasoning part
								if (part.text) {
									yield { type: "reasoning", text: part.text }
								}
							} else {
								// This is regular content
								if (part.text) {
									yield { type: "text", text: part.text }
								}
							}
						}
					}
				}
				// Fallback to the original text property if no candidates structure
				else if (chunk.text) {
					yield { type: "text", text: chunk.text }
				}
				if (chunk.usageMetadata) {
					lastUsageMetadata = chunk.usageMetadata
				}
			}
			if (pendingGroundingMetadata) {
				const sources = this.extractGroundingSources(pendingGroundingMetadata)
				if (sources.length > 0) {
					yield { type: "grounding", sources }
				}
			}
			if (lastUsageMetadata) {
				const inputTokens = lastUsageMetadata.promptTokenCount ?? 0
				const outputTokens = lastUsageMetadata.candidatesTokenCount ?? 0
				const cacheReadTokens = lastUsageMetadata.cachedContentTokenCount
				const reasoningTokens = lastUsageMetadata.thoughtsTokenCount
				yield {
					type: "usage",
					inputTokens,
					outputTokens,
					cacheReadTokens,
					reasoningTokens,
					totalCost: this.calculateCost({ info, inputTokens, outputTokens, cacheReadTokens }),
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(t("common:errors.gemini.generate_stream", { error: error.message }))
			}
			throw error
		}
	}
	getModel() {
		// kilocode_change start: dynamic loading
		const requestedId = this.options.apiModelId
		const availableModels = this.models
		const staticModels = geminiModels
		const id = requestedId && requestedId in availableModels ? requestedId : geminiDefaultModelId
		const info =
			availableModels[id] ??
			staticModels[id] ??
			availableModels[geminiDefaultModelId] ??
			staticModels[geminiDefaultModelId]
		const params = getModelParams({ format: "gemini", modelId: id, model: info, settings: this.options })
		const apiModelId = id.endsWith(":thinking") ? id.replace(":thinking", "") : id
		return { id: apiModelId, info, ...params }
		// kilocode_change end
	}
	extractGroundingSources(groundingMetadata) {
		const chunks = groundingMetadata?.groundingChunks
		if (!chunks) {
			return []
		}
		return chunks
			.map((chunk) => {
				const uri = chunk.web?.uri
				const title = chunk.web?.title || uri || "Unknown Source"
				if (uri) {
					return {
						title,
						url: uri,
					}
				}
				return null
			})
			.filter((source) => source !== null)
	}
	extractCitationsOnly(groundingMetadata) {
		const sources = this.extractGroundingSources(groundingMetadata)
		if (sources.length === 0) {
			return null
		}
		const citationLinks = sources.map((source, i) => `[${i + 1}](${source.url})`)
		return citationLinks.join(", ")
	}
	async completePrompt(prompt) {
		try {
			await this.ensureModelsLoaded() // kilocode_change
			const { id: model } = this.getModel()
			const tools = []
			if (this.options.enableUrlContext) {
				tools.push({ urlContext: {} })
			}
			if (this.options.enableGrounding) {
				tools.push({ googleSearch: {} })
			}
			const promptConfig = {
				httpOptions: this.options.googleGeminiBaseUrl
					? { baseUrl: this.options.googleGeminiBaseUrl }
					: undefined,
				temperature: this.options.modelTemperature ?? 0,
				...(tools.length > 0 ? { tools } : {}),
			}
			const result = await this.client.models.generateContent({
				model,
				contents: [{ role: "user", parts: [{ text: prompt }] }],
				config: promptConfig,
			})
			let text = result.text ?? ""
			const candidate = result.candidates?.[0]
			if (candidate?.groundingMetadata) {
				const citations = this.extractCitationsOnly(candidate.groundingMetadata)
				if (citations) {
					text += `\n\n${t("common:errors.gemini.sources")} ${citations}`
				}
			}
			return text
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(t("common:errors.gemini.generate_complete_prompt", { error: error.message }))
			}
			throw error
		}
	}
	async countTokens(content) {
		try {
			await this.ensureModelsLoaded() // kilocode_change
			const { id: model } = this.getModel()
			const response = await this.client.models.countTokens({
				model,
				contents: convertAnthropicContentToGemini(content),
			})
			if (response.totalTokens === undefined) {
				console.warn("Gemini token counting returned undefined, using fallback")
				return super.countTokens(content)
			}
			return response.totalTokens
		} catch (error) {
			console.warn("Gemini token counting failed, using fallback", error)
			return super.countTokens(content)
		}
	}
	calculateCost({ info, inputTokens, outputTokens, cacheReadTokens = 0 }) {
		// For models with tiered pricing, prices might only be defined in tiers
		let inputPrice = info.inputPrice
		let outputPrice = info.outputPrice
		let cacheReadsPrice = info.cacheReadsPrice
		// If there's tiered pricing then adjust the input and output token prices
		// based on the input tokens used.
		if (info.tiers) {
			const tier = info.tiers.find((tier) => inputTokens <= tier.contextWindow)
			if (tier) {
				inputPrice = tier.inputPrice ?? inputPrice
				outputPrice = tier.outputPrice ?? outputPrice
				cacheReadsPrice = tier.cacheReadsPrice ?? cacheReadsPrice
			}
		}
		// Check if we have the required prices after considering tiers
		if (!inputPrice || !outputPrice) {
			return undefined
		}
		// cacheReadsPrice is optional - if not defined, treat as 0
		if (!cacheReadsPrice) {
			cacheReadsPrice = 0
		}
		// Subtract the cached input tokens from the total input tokens.
		const uncachedInputTokens = inputTokens - cacheReadTokens
		let cacheReadCost = cacheReadTokens > 0 ? cacheReadsPrice * (cacheReadTokens / 1_000_000) : 0
		const inputTokensCost = inputPrice * (uncachedInputTokens / 1_000_000)
		const outputTokensCost = outputPrice * (outputTokens / 1_000_000)
		const totalCost = inputTokensCost + outputTokensCost + cacheReadCost
		const trace = {
			input: { price: inputPrice, tokens: uncachedInputTokens, cost: inputTokensCost },
			output: { price: outputPrice, tokens: outputTokens, cost: outputTokensCost },
		}
		if (cacheReadTokens > 0) {
			trace.cacheRead = { price: cacheReadsPrice, tokens: cacheReadTokens, cost: cacheReadCost }
		}
		// console.log(`[GeminiHandler] calculateCost -> ${totalCost}`, trace)
		return totalCost
	}
}
//# sourceMappingURL=gemini.js.map
