import OpenAI from "openai"
import {
	openRouterDefaultModelId,
	openRouterDefaultModelInfo,
	OPEN_ROUTER_PROMPT_CACHING_MODELS,
	DEEP_SEEK_DEFAULT_TEMPERATURE,
} from "@roo-code/types"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { convertToR1Format } from "../transform/r1-format"
import { addCacheBreakpoints as addAnthropicCacheBreakpoints } from "../transform/caching/anthropic"
import { addCacheBreakpoints as addGeminiCacheBreakpoints } from "../transform/caching/gemini"
import { getModelParams } from "../transform/model-params"
import { getModels } from "./fetchers/modelCache"
import { getModelEndpoints } from "./fetchers/modelEndpointCache"
import { DEFAULT_HEADERS } from "./constants"
import { BaseProvider } from "./base-provider"
import { verifyFinishReason } from "./kilocode/verifyFinishReason"
import { safeJsonParse } from "../../shared/safeJsonParse"
import { isAnyRecognizedKiloCodeError } from "../../shared/kilocode/errorUtils"
import { handleOpenAIError } from "./utils/openai-error-handler"
export class OpenRouterHandler extends BaseProvider {
	options
	client
	models = {}
	endpoints = {}
	// kilocode_change start property
	get providerName() {
		return "OpenRouter"
	}
	// kilocode_change end
	constructor(options) {
		super()
		this.options = options
		const baseURL = this.options.openRouterBaseUrl || "https://openrouter.ai/api/v1"
		const apiKey = this.options.openRouterApiKey ?? "not-provided"
		this.client = new OpenAI({ baseURL, apiKey, defaultHeaders: DEFAULT_HEADERS })
		// Load models asynchronously to populate cache before getModel() is called
		this.loadDynamicModels().catch((error) => {
			console.error("[OpenRouterHandler] Failed to load dynamic models:", error)
		})
	}
	async loadDynamicModels() {
		try {
			const [models, endpoints] = await Promise.all([
				getModels({ provider: "openrouter" }),
				getModelEndpoints({
					router: "openrouter",
					modelId: this.options.openRouterModelId,
					endpoint: this.options.openRouterSpecificProvider,
				}),
			])
			this.models = models
			this.endpoints = endpoints
		} catch (error) {
			console.error("[OpenRouterHandler] Error loading dynamic models:", {
				error: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : undefined,
			})
		}
	}
	// kilocode_change start
	customRequestOptions(_metadata) {
		return undefined
	}
	getCustomRequestHeaders(taskId) {
		return (taskId ? this.customRequestOptions({ taskId })?.headers : undefined) ?? {}
	}
	getTotalCost(lastUsage) {
		return (lastUsage.cost_details?.upstream_inference_cost || 0) + (lastUsage.cost || 0)
	}
	getProviderParams() {
		if (this.options.openRouterSpecificProvider && this.endpoints[this.options.openRouterSpecificProvider]) {
			return {
				provider: {
					order: [this.options.openRouterSpecificProvider],
					only: [this.options.openRouterSpecificProvider],
					allow_fallbacks: false,
					data_collection: this.options.openRouterProviderDataCollection,
					zdr: this.options.openRouterZdr,
				},
			}
		}
		if (
			this.options.openRouterProviderDataCollection ||
			this.options.openRouterProviderSort ||
			this.options.openRouterZdr
		) {
			return {
				provider: {
					data_collection: this.options.openRouterProviderDataCollection,
					sort: this.options.openRouterProviderSort,
					zdr: this.options.openRouterZdr,
				},
			}
		}
		return {}
	}
	// kilocode_change end
	async *createMessage(systemPrompt, messages, metadata) {
		const model = await this.fetchModel()
		let { id: modelId, maxTokens, temperature, topP, reasoning } = model
		// OpenRouter sends reasoning tokens by default for Gemini 2.5 Pro
		// Preview even if you don't request them. This is not the default for
		// other providers (including Gemini), so we need to explicitly disable
		// i We should generalize this using the logic in `getModelParams`, but
		// this is easier for now.
		if (
			(modelId === "google/gemini-2.5-pro-preview" || modelId === "google/gemini-2.5-pro") &&
			typeof reasoning === "undefined"
		) {
			reasoning = { exclude: true }
		}
		// Convert Anthropic messages to OpenAI format.
		let openAiMessages = [{ role: "system", content: systemPrompt }, ...convertToOpenAiMessages(messages)]
		// DeepSeek highly recommends using user instead of system role.
		if (modelId.startsWith("deepseek/deepseek-r1") || modelId === "perplexity/sonar-reasoning") {
			openAiMessages = convertToR1Format([{ role: "user", content: systemPrompt }, ...messages])
		}
		// kilocode_change start
		if (modelId.startsWith("google/gemini")) {
			addGeminiCacheBreakpoints(systemPrompt, openAiMessages)
		} else if (modelId.startsWith("anthropic/claude") || OPEN_ROUTER_PROMPT_CACHING_MODELS.has(modelId)) {
			addAnthropicCacheBreakpoints(systemPrompt, openAiMessages)
		}
		// kilocode_change end
		const transforms = (this.options.openRouterUseMiddleOutTransform ?? true) ? ["middle-out"] : undefined
		// https://openrouter.ai/docs/transforms
		const completionParams = {
			model: modelId,
			...(maxTokens && maxTokens > 0 && { max_tokens: maxTokens }),
			temperature,
			top_p: topP,
			messages: openAiMessages,
			stream: true,
			stream_options: { include_usage: true },
			...this.getProviderParams(), // kilocode_change: original expression was moved into function
			parallel_tool_calls: false, // Ensure only one tool call at a time
			...(transforms && { transforms }),
			...(reasoning && { reasoning }),
			...(metadata?.tools && { tools: metadata.tools }),
			...(metadata?.tool_choice && { tool_choice: metadata.tool_choice }),
			verbosity: model.verbosity, // kilocode_change
		}
		let stream
		try {
			stream = await this.client.chat.completions.create(completionParams, this.customRequestOptions(metadata))
		} catch (error) {
			// kilocode_change start
			if (this.providerName == "KiloCode" && isAnyRecognizedKiloCodeError(error)) {
				throw error
			}
			throw new Error(makeOpenRouterErrorReadable(error))
			// kilocode_change end
		}
		let lastUsage = undefined
		let inferenceProvider // kilocode_change
		const toolCallAccumulator = new Map()
		for await (const chunk of stream) {
			// OpenRouter returns an error object instead of the OpenAI SDK throwing an error.
			if ("error" in chunk) {
				const error = chunk.error
				console.error(`OpenRouter API Error: ${error?.code} - ${error?.message}`)
				throw new Error(`OpenRouter API Error ${error?.code}: ${error?.message}`)
			}
			// kilocode_change start
			if ("provider" in chunk && typeof chunk.provider === "string") {
				inferenceProvider = chunk.provider
			}
			// kilocode_change end
			verifyFinishReason(chunk.choices[0]) // kilocode_change
			const delta = chunk.choices[0]?.delta
			const finishReason = chunk.choices[0]?.finish_reason
			if (delta) {
				if ("reasoning" in delta && delta.reasoning && typeof delta.reasoning === "string") {
					yield { type: "reasoning", text: delta.reasoning }
				}
				// kilocode_change start
				// OpenRouter passes reasoning details that we can pass back unmodified in api requests to preserve reasoning traces for model
				// See: https://openrouter.ai/docs/use-cases/reasoning-tokens#preserving-reasoning-blocks
				if (delta && "reasoning_details" in delta && delta.reasoning_details) {
					yield {
						type: "reasoning_details",
						reasoning_details: delta.reasoning_details,
					}
				}
				if (delta && "reasoning_content" in delta && typeof delta.reasoning_content === "string") {
					yield { type: "reasoning", text: delta.reasoning_content }
				}
				// kilocode_change end
				// Check for tool calls in delta
				if ("tool_calls" in delta && Array.isArray(delta.tool_calls)) {
					for (const toolCall of delta.tool_calls) {
						const index = toolCall.index
						const existing = toolCallAccumulator.get(index)
						if (existing) {
							// Accumulate arguments for existing tool call
							if (toolCall.function?.arguments) {
								existing.arguments += toolCall.function.arguments
							}
						} else {
							// Start new tool call accumulation
							toolCallAccumulator.set(index, {
								id: toolCall.id || "",
								name: toolCall.function?.name || "",
								arguments: toolCall.function?.arguments || "",
							})
						}
					}
				}
				if (delta.content) {
					yield { type: "text", text: delta.content }
				}
			}
			// When finish_reason is 'tool_calls', yield all accumulated tool calls
			if (finishReason === "tool_calls" && toolCallAccumulator.size > 0) {
				for (const toolCall of toolCallAccumulator.values()) {
					yield {
						type: "tool_call",
						id: toolCall.id,
						name: toolCall.name,
						arguments: toolCall.arguments,
					}
				}
				// Clear accumulator after yielding
				toolCallAccumulator.clear()
			}
			if (chunk.usage) {
				lastUsage = chunk.usage
			}
		}
		if (lastUsage) {
			yield {
				type: "usage",
				inputTokens: lastUsage.prompt_tokens || 0,
				outputTokens: lastUsage.completion_tokens || 0,
				cacheReadTokens: lastUsage.prompt_tokens_details?.cached_tokens,
				reasoningTokens: lastUsage.completion_tokens_details?.reasoning_tokens,
				// kilocode_change start
				totalCost: this.getTotalCost(lastUsage),
				inferenceProvider,
				// kilocode_change end
			}
		}
	}
	async fetchModel() {
		const [models, endpoints] = await Promise.all([
			getModels({ provider: "openrouter" }),
			getModelEndpoints({
				router: "openrouter",
				modelId: this.options.openRouterModelId,
				endpoint: this.options.openRouterSpecificProvider,
			}),
		])
		this.models = models
		this.endpoints = endpoints
		return this.getModel()
	}
	getModel() {
		const id = this.options.openRouterModelId ?? openRouterDefaultModelId
		let info = this.models[id] ?? openRouterDefaultModelInfo
		// If a specific provider is requested, use the endpoint for that provider.
		if (this.options.openRouterSpecificProvider && this.endpoints[this.options.openRouterSpecificProvider]) {
			info = this.endpoints[this.options.openRouterSpecificProvider]
		}
		const isDeepSeekR1 = id.startsWith("deepseek/deepseek-r1") || id === "perplexity/sonar-reasoning"
		const params = getModelParams({
			format: "openrouter",
			modelId: id,
			model: info,
			settings: this.options,
			defaultTemperature: isDeepSeekR1 ? DEEP_SEEK_DEFAULT_TEMPERATURE : 0,
		})
		return { id, info, topP: isDeepSeekR1 ? 0.95 : undefined, ...params }
	}
	async completePrompt(prompt) {
		let {
			id: modelId,
			maxTokens,
			temperature,
			reasoning,
			verbosity, // kilocode_change
		} = await this.fetchModel()
		const completionParams = {
			model: modelId,
			max_tokens: maxTokens,
			temperature,
			messages: [{ role: "user", content: prompt }],
			stream: false,
			...this.getProviderParams(), // kilocode_change: original expression was moved into function
			...(reasoning && { reasoning }),
			verbosity, // kilocode_change
		}
		let response
		try {
			response = await this.client.chat.completions.create(completionParams, this.customRequestOptions())
		} catch (error) {
			throw handleOpenAIError(error, this.providerName)
		}
		if ("error" in response) {
			const error = response.error
			throw new Error(`OpenRouter API Error ${error?.code}: ${error?.message}`)
		}
		const completion = response
		return completion.choices[0]?.message?.content || ""
	}
	/**
	 * Generate an image using OpenRouter's image generation API
	 * @param prompt The text prompt for image generation
	 * @param model The model to use for generation
	 * @param apiKey The OpenRouter API key (must be explicitly provided)
	 * @param inputImage Optional base64 encoded input image data URL
	 * @returns The generated image data and format, or an error
	 */
	async generateImage(prompt, model, apiKey, inputImage, taskId) {
		if (!apiKey) {
			return {
				success: false,
				error: "OpenRouter API key is required for image generation",
			}
		}
		try {
			const response = await fetch(
				`${this.options.openRouterBaseUrl || "https://openrouter.ai/api/v1/"}chat/completions`, // kilocode_change: support baseUrl
				{
					method: "POST",
					headers: {
						// kilocode_change start
						...DEFAULT_HEADERS,
						...this.getCustomRequestHeaders(taskId),
						// kilocode_change end
						Authorization: `Bearer ${apiKey}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						model,
						messages: [
							{
								role: "user",
								content: inputImage
									? [
											{
												type: "text",
												text: prompt,
											},
											{
												type: "image_url",
												image_url: {
													url: inputImage,
												},
											},
										]
									: prompt,
							},
						],
						modalities: ["image", "text"],
					}),
				},
			)
			if (!response.ok) {
				const errorText = await response.text()
				let errorMessage = `Failed to generate image: ${response.status} ${response.statusText}`
				try {
					const errorJson = JSON.parse(errorText)
					if (errorJson.error?.message) {
						errorMessage = `Failed to generate image: ${errorJson.error.message}`
					}
				} catch {
					// Use default error message
				}
				return {
					success: false,
					error: errorMessage,
				}
			}
			const result = await response.json()
			if (result.error) {
				return {
					success: false,
					error: `Failed to generate image: ${result.error.message}`,
				}
			}
			// Extract the generated image from the response
			const images = result.choices?.[0]?.message?.images
			if (!images || images.length === 0) {
				return {
					success: false,
					error: "No image was generated in the response",
				}
			}
			const imageData = images[0]?.image_url?.url
			if (!imageData) {
				return {
					success: false,
					error: "Invalid image data in response",
				}
			}
			// Extract base64 data from data URL
			const base64Match = imageData.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/)
			if (!base64Match) {
				return {
					success: false,
					error: "Invalid image format received",
				}
			}
			return {
				success: true,
				imageData: imageData,
				imageFormat: base64Match[1],
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : "Unknown error occurred",
			}
		}
	}
}
// kilocode_change start
function makeOpenRouterErrorReadable(error) {
	const metadata = error?.error?.metadata
	const parsedJson = safeJsonParse(metadata?.raw)
	const rawError = parsedJson
	if (error?.code !== 429 && error?.code !== 418) {
		const errorMessage =
			rawError?.error?.message ??
			rawError?.error ??
			rawError?.detail ??
			rawError?.message ??
			metadata?.raw ??
			error?.message
		throw new Error(`${metadata?.provider_name ?? "Provider"} error: ${errorMessage ?? "unknown error"}`)
	}
	try {
		const parsedJson = JSON.parse(error.error.metadata?.raw)
		const retryAfter = parsedJson?.error?.details.map((detail) => detail.retryDelay).filter((r) => r)[0]
		if (retryAfter) {
			return `Rate limit exceeded, try again in ${retryAfter}.`
		}
	} catch (e) {}
	return `Rate limit exceeded, try again later.\n${error?.message || error}`
}
// kilocode_change end
//# sourceMappingURL=openrouter.js.map
