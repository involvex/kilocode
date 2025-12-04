import { BaseLlmApi } from "./openai-adapters"
import { ChatCompletionCreateParams } from "openai/resources/index"
import {
	ChatMessage,
	Chunk,
	CompletionOptions,
	ILLM,
	LLMFullCompletionOptions,
	LLMOptions,
	MessageOption,
	ModelCapability,
	PromptLog,
	TabAutocompleteOptions,
} from "../index.js"
import type { CacheBehavior, ILLMLogger } from "../index.js"
import { LlmApiRequestType } from "./openaiTypeConverters.js"
export declare abstract class BaseLLM implements ILLM {
	static providerName: string
	get providerName(): string
	/**
	 * This exists because for the continue-proxy, sometimes we want to get the value of the underlying provider that is used on the server
	 * For example, the underlying provider should always be sent with dev data
	 */
	get underlyingProviderName(): string
	autocompleteOptions?: Partial<TabAutocompleteOptions>
	supportsFim(): boolean
	supportsCompletions(): boolean
	uniqueId: string
	model: string
	title?: string
	_contextLength: number | undefined
	maxStopWords?: number | undefined
	completionOptions: CompletionOptions
	templateMessages?: (messages: ChatMessage[]) => string
	logger?: ILLMLogger
	llmRequestHook?: (model: string, prompt: string) => any
	apiKey?: string
	apiBase?: string
	cacheBehavior?: CacheBehavior
	capabilities?: ModelCapability
	lastRequestId: string | undefined
	private _llmOptions
	protected openaiAdapter?: BaseLlmApi
	constructor(_options: LLMOptions)
	get contextLength(): number
	protected createOpenAiAdapter(): BaseLlmApi | undefined
	private _templatePromptLikeMessages
	private _logEnd
	private parseCompletionOptions
	private formatChatMessages
	private _formatChatMessage
	protected _streamFim(
		_prefix: string,
		_suffix: string,
		_signal: AbortSignal,
		_options: CompletionOptions,
	): AsyncGenerator<string, PromptLog>
	protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[]
	private shouldUseOpenAIAdapter
	streamFim(
		prefix: string,
		suffix: string,
		signal: AbortSignal,
		options?: LLMFullCompletionOptions,
	): AsyncGenerator<string>
	streamComplete(
		_prompt: string,
		signal: AbortSignal,
		options?: LLMFullCompletionOptions,
	): AsyncGenerator<
		string,
		{
			modelTitle: string
			modelProvider: string
			prompt: string
			completion: string
			completionOptions: CompletionOptions
		},
		unknown
	>
	chat(
		messages: ChatMessage[],
		signal: AbortSignal,
		options?: LLMFullCompletionOptions,
	): Promise<{
		role: "assistant"
		content: string
	}>
	compileChatMessages(
		message: ChatMessage[],
		options: LLMFullCompletionOptions,
	): import("../index.js").CompiledMessagesResult
	protected modifyChatBody(body: ChatCompletionCreateParams): ChatCompletionCreateParams
	private _modifyCompletionOptions
	streamChat(
		_messages: ChatMessage[],
		signal: AbortSignal,
		options?: LLMFullCompletionOptions,
		messageOptions?: MessageOption,
	): AsyncGenerator<ChatMessage, PromptLog>
	rerank(query: string, chunks: Chunk[]): Promise<number[]>
	protected _streamComplete(
		_prompt: string,
		_signal: AbortSignal,
		_options: CompletionOptions,
	): AsyncGenerator<string>
	protected _streamChat(
		messages: ChatMessage[],
		signal: AbortSignal,
		options: CompletionOptions,
	): AsyncGenerator<ChatMessage>
	protected _complete(prompt: string, signal: AbortSignal, options: CompletionOptions): Promise<string>
	countTokens(text: string): number
}
//# sourceMappingURL=index.d.ts.map
