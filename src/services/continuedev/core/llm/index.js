import { findLlmInfo } from "./model-info"
import { constructLlmApi } from "./openai-adapters"
import { mergeJson } from "../util/merge.js"
import { renderChatMessage } from "../util/messageContent.js"
import { TokensBatchingService } from "../util/TokensBatchingService.js"
import { DEFAULT_CONTEXT_LENGTH, DEFAULT_MAX_TOKENS } from "./constants.js"
import { compileChatMessages, countTokens, pruneRawPromptFromTop } from "./countTokens.js"
import {
	fromChatCompletionChunk,
	fromChatResponse,
	toChatBody,
	toCompleteBody,
	toFimBody,
} from "./openaiTypeConverters.js"
export class BaseLLM {
	static providerName
	get providerName() {
		return this.constructor.providerName
	}
	/**
	 * This exists because for the continue-proxy, sometimes we want to get the value of the underlying provider that is used on the server
	 * For example, the underlying provider should always be sent with dev data
	 */
	get underlyingProviderName() {
		return this.providerName
	}
	autocompleteOptions
	supportsFim() {
		return false
	}
	supportsCompletions() {
		if (["openai", "azure"].includes(this.providerName)) {
			if (
				this.apiBase?.includes("api.groq.com") ||
				this.apiBase?.includes("api.mistral.ai") ||
				this.apiBase?.includes(":1337") ||
				this.apiBase?.includes("integrate.api.nvidia.com") ||
				this._llmOptions.useLegacyCompletionsEndpoint?.valueOf() === false
			) {
				// Jan + Groq + Mistral don't support completions : (
				// Seems to be going out of style...
				return false
			}
		}
		if (["groq", "mistral", "deepseek"].includes(this.providerName)) {
			return false
		}
		return true
	}
	uniqueId
	model
	title
	_contextLength
	maxStopWords
	completionOptions
	templateMessages
	logger
	llmRequestHook
	apiKey
	apiBase
	cacheBehavior
	capabilities
	lastRequestId
	_llmOptions
	openaiAdapter
	constructor(_options) {
		this._llmOptions = _options
		this.lastRequestId = undefined
		// Set default options
		const options = {
			title: this.constructor.providerName,
			..._options,
		}
		this.model = options.model
		// Use ../llm-info package to autodetect certain parameters
		const modelSearchString =
			this.providerName === "continue-proxy" ? this.model?.split("/").pop() || this.model : this.model
		const llmInfo = findLlmInfo(modelSearchString, this.underlyingProviderName)
		this.title = options.title
		this.uniqueId = options.uniqueId ?? "None"
		this._contextLength = options.contextLength ?? llmInfo?.contextLength
		this.maxStopWords = options.maxStopWords ?? this.maxStopWords
		this.completionOptions = {
			...options.completionOptions,
			model: options.model || "gpt-4",
			maxTokens:
				options.completionOptions?.maxTokens ??
				(llmInfo?.maxCompletionTokens
					? Math.min(
							llmInfo.maxCompletionTokens,
							// Even if the model has a large maxTokens, we don't want to use that every time,
							// because it takes away from the context length
							this.contextLength / 4,
						)
					: DEFAULT_MAX_TOKENS),
		}
		this.apiKey = options.apiKey
		this.apiBase = options.apiBase
		if (this.apiBase && !this.apiBase.endsWith("/")) {
			this.apiBase = `${this.apiBase}/`
		}
		this.capabilities = options.capabilities
		this.openaiAdapter = this.createOpenAiAdapter()
		this.autocompleteOptions = options.autocompleteOptions
		// openaiAdapter is initialized above
	}
	get contextLength() {
		return this._contextLength ?? DEFAULT_CONTEXT_LENGTH
	}
	createOpenAiAdapter() {
		return constructLlmApi({
			provider: this.providerName,
			apiKey: this.apiKey ?? "",
			apiBase: this.apiBase,
			env: this._llmOptions.env,
		})
	}
	_templatePromptLikeMessages(prompt) {
		if (!this.templateMessages) {
			return prompt
		}
		// NOTE system message no longer supported here
		const msgs = [{ role: "user", content: prompt }]
		return this.templateMessages(msgs)
	}
	_logEnd(model, prompt, completion, interaction, usage, error) {
		const promptTokens = this.countTokens(prompt)
		const generatedTokens = this.countTokens(completion)
		TokensBatchingService.getInstance().addTokens(model, this.providerName, promptTokens, generatedTokens)
		console.log("tokensGenerated", {
			model: model,
			provider: this.underlyingProviderName,
			promptTokens: promptTokens,
			generatedTokens: generatedTokens,
		})
		if (typeof error === "undefined") {
			interaction?.logItem({
				kind: "success",
				promptTokens,
				generatedTokens,
				usage,
			})
			return "success"
		} else {
			if (error === "cancel" || error?.name?.includes("AbortError")) {
				interaction?.logItem({
					kind: "cancel",
					promptTokens,
					generatedTokens,
					usage,
				})
				return "cancelled"
			} else {
				console.log(error)
				interaction?.logItem({
					kind: "error",
					name: error.name,
					message: error.message,
					promptTokens,
					generatedTokens,
					usage,
				})
				return "error"
			}
		}
	}
	parseCompletionOptions(options) {
		const log = options.log ?? true
		const raw = options.raw ?? false
		options.log = undefined
		const completionOptions = mergeJson(this.completionOptions, options)
		return { completionOptions, logEnabled: log, raw }
	}
	formatChatMessages(messages) {
		const msgsCopy = messages ? messages.map((msg) => ({ ...msg })) : []
		let formatted = ""
		for (const msg of msgsCopy) {
			formatted += this._formatChatMessage(msg)
		}
		return formatted
	}
	_formatChatMessage(msg) {
		let contentToShow = renderChatMessage(msg)
		return `<${msg.role}>\n${contentToShow}\n\n`
	}
	// eslint-disable-next-line require-yield
	async *_streamFim(_prefix, _suffix, _signal, _options) {
		throw new Error("Not implemented")
	}
	useOpenAIAdapterFor = []
	shouldUseOpenAIAdapter(requestType) {
		return this.useOpenAIAdapterFor.includes(requestType) || this.useOpenAIAdapterFor.includes("*")
	}
	async *streamFim(prefix, suffix, signal, options = {}) {
		this.lastRequestId = undefined
		const { completionOptions, logEnabled } = this.parseCompletionOptions(options)
		const interaction = logEnabled ? this.logger?.createInteractionLog() : undefined
		let status = "in_progress"
		const fimLog = `Prefix: ${prefix}\nSuffix: ${suffix}`
		if (logEnabled) {
			interaction?.logItem({
				kind: "startFim",
				prefix,
				suffix,
				options: completionOptions,
				provider: this.providerName,
			})
			if (this.llmRequestHook) {
				this.llmRequestHook(completionOptions.model, fimLog)
			}
		}
		let completion = ""
		try {
			if (this.shouldUseOpenAIAdapter("streamFim") && this.openaiAdapter) {
				const stream = this.openaiAdapter.fimStream(toFimBody(prefix, suffix, completionOptions), signal)
				for await (const chunk of stream) {
					if (!this.lastRequestId && typeof chunk.id === "string") {
						this.lastRequestId = chunk.id
					}
					const result = fromChatCompletionChunk(chunk)
					if (result) {
						const content = renderChatMessage(result)
						const formattedContent = this._formatChatMessage(result)
						interaction?.logItem({
							kind: "chunk",
							chunk: formattedContent,
						})
						completion += formattedContent
						yield content
					}
				}
			} else {
				for await (const chunk of this._streamFim(prefix, suffix, signal, completionOptions)) {
					interaction?.logItem({
						kind: "chunk",
						chunk,
					})
					completion += chunk
					yield chunk
				}
			}
			status = this._logEnd(completionOptions.model, fimLog, completion, interaction, undefined)
		} catch (e) {
			console.error(e, {
				context: "llm_stream_fim",
				model: completionOptions.model,
				provider: this.providerName,
				useOpenAIAdapter: this.shouldUseOpenAIAdapter("streamFim"),
			})
			status = this._logEnd(completionOptions.model, fimLog, completion, interaction, undefined, e)
			throw e
		} finally {
			if (status === "in_progress") {
				this._logEnd(completionOptions.model, fimLog, completion, interaction, undefined, "cancel")
			}
		}
		return {
			prompt: fimLog,
			completion,
			completionOptions,
		}
	}
	async *streamComplete(_prompt, signal, options = {}) {
		this.lastRequestId = undefined
		const { completionOptions, logEnabled, raw } = this.parseCompletionOptions(options)
		const interaction = logEnabled ? this.logger?.createInteractionLog() : undefined
		let status = "in_progress"
		let prompt = pruneRawPromptFromTop(
			completionOptions.model,
			this.contextLength,
			_prompt,
			completionOptions.maxTokens ?? DEFAULT_MAX_TOKENS,
		)
		if (!raw) {
			prompt = this._templatePromptLikeMessages(prompt)
		}
		if (logEnabled) {
			interaction?.logItem({
				kind: "startComplete",
				prompt,
				options: completionOptions,
				provider: this.providerName,
			})
			if (this.llmRequestHook) {
				this.llmRequestHook(completionOptions.model, prompt)
			}
		}
		let completion = ""
		try {
			if (this.shouldUseOpenAIAdapter("streamComplete") && this.openaiAdapter) {
				if (completionOptions.stream === false) {
					// Stream false
					const response = await this.openaiAdapter.completionNonStream(
						{ ...toCompleteBody(prompt, completionOptions), stream: false },
						signal,
					)
					this.lastRequestId = response.id ?? this.lastRequestId
					completion = response.choices[0]?.text ?? ""
					yield completion
				} else {
					// Stream true
					for await (const chunk of this.openaiAdapter.completionStream(
						{
							...toCompleteBody(prompt, completionOptions),
							stream: true,
						},
						signal,
					)) {
						if (!this.lastRequestId && typeof chunk.id === "string") {
							this.lastRequestId = chunk.id
						}
						const content = chunk.choices[0]?.text ?? ""
						completion += content
						interaction?.logItem({
							kind: "chunk",
							chunk: content,
						})
						yield content
					}
				}
			} else {
				for await (const chunk of this._streamComplete(prompt, signal, completionOptions)) {
					completion += chunk
					interaction?.logItem({
						kind: "chunk",
						chunk,
					})
					yield chunk
				}
			}
			status = this._logEnd(completionOptions.model, prompt, completion, interaction, undefined)
		} catch (e) {
			console.error(e, {
				context: "llm_stream_complete",
				model: completionOptions.model,
				provider: this.providerName,
				useOpenAIAdapter: this.shouldUseOpenAIAdapter("streamComplete"),
				streamEnabled: completionOptions.stream !== false,
			})
			status = this._logEnd(completionOptions.model, prompt, completion, interaction, undefined, e)
			throw e
		} finally {
			if (status === "in_progress") {
				this._logEnd(completionOptions.model, prompt, completion, interaction, undefined, "cancel")
			}
		}
		return {
			modelTitle: this.title ?? completionOptions.model,
			modelProvider: this.underlyingProviderName,
			prompt,
			completion,
			completionOptions,
		}
	}
	async chat(messages, signal, options = {}) {
		let completion = ""
		for await (const message of this.streamChat(messages, signal, options)) {
			completion += renderChatMessage(message)
		}
		return { role: "assistant", content: completion }
	}
	compileChatMessages(message, options) {
		let { completionOptions } = this.parseCompletionOptions(options)
		completionOptions = this._modifyCompletionOptions(completionOptions)
		return compileChatMessages({
			modelName: completionOptions.model,
			msgs: message,
			knownContextLength: this._contextLength,
			maxTokens: completionOptions.maxTokens ?? DEFAULT_MAX_TOKENS,
		})
	}
	modifyChatBody(body) {
		return body
	}
	_modifyCompletionOptions(completionOptions) {
		// As of 01/14/25 streaming is currently not available with o1
		// See these threads:
		// - https://github.com/continuedev/continue/issues/3698
		// - https://community.openai.com/t/streaming-support-for-o1-o1-2024-12-17-resulting-in-400-unsupported-value/1085043
		if (completionOptions.model === "o1") {
			completionOptions.stream = false
		}
		return completionOptions
	}
	async *streamChat(_messages, signal, options = {}, messageOptions) {
		this.lastRequestId = undefined
		let { completionOptions } = this.parseCompletionOptions(options)
		const { logEnabled } = this.parseCompletionOptions(options)
		const interaction = logEnabled ? this.logger?.createInteractionLog() : undefined
		let status = "in_progress"
		completionOptions = this._modifyCompletionOptions(completionOptions)
		let messages = _messages
		// If not precompiled, compile the chat messages
		if (!messageOptions?.precompiled) {
			const { compiledChatMessages } = compileChatMessages({
				modelName: completionOptions.model,
				msgs: _messages,
				knownContextLength: this._contextLength,
				maxTokens: completionOptions.maxTokens ?? DEFAULT_MAX_TOKENS,
			})
			messages = compiledChatMessages
		}
		const prompt = this.templateMessages ? this.templateMessages(messages) : this.formatChatMessages(messages)
		if (logEnabled) {
			interaction?.logItem({
				kind: "startChat",
				messages,
				options: completionOptions,
				provider: this.providerName,
			})
			if (this.llmRequestHook) {
				this.llmRequestHook(completionOptions.model, prompt)
			}
		}
		let completion = ""
		let usage = undefined
		try {
			if (this.templateMessages) {
				for await (const chunk of this._streamComplete(prompt, signal, completionOptions)) {
					completion += chunk
					interaction?.logItem({
						kind: "chunk",
						chunk: chunk,
					})
					yield { role: "assistant", content: chunk }
				}
			} else {
				if (this.shouldUseOpenAIAdapter("streamChat") && this.openaiAdapter) {
					let body = toChatBody(messages, completionOptions)
					body = this.modifyChatBody(body)
					if (completionOptions.stream === false) {
						// Stream false
						const response = await this.openaiAdapter.chatCompletionNonStream(
							{ ...body, stream: false },
							signal,
						)
						this.lastRequestId = response.id ?? this.lastRequestId
						const msg = fromChatResponse(response)
						yield msg
						completion = this._formatChatMessage(msg)
						interaction?.logItem({
							kind: "message",
							message: msg,
						})
					} else {
						// Stream true
						const stream = this.openaiAdapter.chatCompletionStream(
							{
								...body,
								stream: true,
							},
							signal,
						)
						for await (const chunk of stream) {
							if (!this.lastRequestId && typeof chunk.id === "string") {
								this.lastRequestId = chunk.id
							}
							const result = fromChatCompletionChunk(chunk)
							if (result) {
								completion += this._formatChatMessage(result)
								interaction?.logItem({
									kind: "message",
									message: result,
								})
								yield result
							}
						}
					}
				} else {
					for await (const chunk of this._streamChat(messages, signal, completionOptions)) {
						if (chunk.role === "assistant") {
							completion += this._formatChatMessage(chunk)
						}
						interaction?.logItem({
							kind: "message",
							message: chunk,
						})
						if (chunk.role === "assistant" && chunk.usage) {
							usage = chunk.usage
						}
						yield chunk
					}
				}
			}
			status = this._logEnd(completionOptions.model, prompt, completion, interaction, usage)
		} catch (e) {
			console.error(e, {
				context: "llm_stream_chat",
				model: completionOptions.model,
				provider: this.providerName,
				useOpenAIAdapter: this.shouldUseOpenAIAdapter("streamChat"),
				streamEnabled: completionOptions.stream !== false,
				templateMessages: !!this.templateMessages,
			})
			status = this._logEnd(completionOptions.model, prompt, completion, interaction, usage, e)
			throw e
		} finally {
			if (status === "in_progress") {
				this._logEnd(completionOptions.model, prompt, completion, interaction, usage, "cancel")
			}
		}
		return {
			modelTitle: this.title ?? completionOptions.model,
			modelProvider: this.underlyingProviderName,
			prompt,
			completion,
		}
	}
	async rerank(query, chunks) {
		if (this.shouldUseOpenAIAdapter("rerank") && this.openaiAdapter) {
			const results = await this.openaiAdapter.rerank({
				model: this.model,
				query,
				documents: chunks.map((chunk) => chunk.content),
			})
			// Standard OpenAI format
			if (results.data && Array.isArray(results.data)) {
				return results.data.sort((a, b) => a.index - b.index).map((result) => result.relevance_score)
			}
			throw new Error(
				`Unexpected rerank response format from ${this.providerName}. ` +
					`Expected 'data' array but got: ${JSON.stringify(Object.keys(results))}`,
			)
		}
		throw new Error(`Reranking is not supported for provider type ${this.providerName}`)
	}
	// eslint-disable-next-line require-yield
	async *_streamComplete(_prompt, _signal, _options) {
		throw new Error("Not implemented")
	}
	async *_streamChat(messages, signal, options) {
		if (!this.templateMessages) {
			throw new Error("You must either implement templateMessages or _streamChat")
		}
		for await (const chunk of this._streamComplete(this.templateMessages(messages), signal, options)) {
			yield { role: "assistant", content: chunk }
		}
	}
	async _complete(prompt, signal, options) {
		let completion = ""
		for await (const chunk of this._streamComplete(prompt, signal, options)) {
			completion += chunk
		}
		return completion
	}
	countTokens(text) {
		return countTokens(text, this.model)
	}
}
//# sourceMappingURL=index.js.map
