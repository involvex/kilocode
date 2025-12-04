import { ChatCompletionCreateParams } from "openai/resources/index"
import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js"
import { BaseLLM } from "../index.js"
import { LlmApiRequestType } from "../openaiTypeConverters.js"
export declare class OpenAI extends BaseLLM {
	useLegacyCompletionsEndpoint: boolean | undefined
	constructor(options: LLMOptions)
	static providerName: string
	protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[]
	protected _convertModelName(model: string): string
	isOSeriesOrGpt5Model(model?: string): boolean
	protected extraBodyProperties(): Record<string, any>
	protected getMaxStopWords(): number
	protected _convertArgs(options: CompletionOptions, messages: ChatMessage[]): ChatCompletionCreateParams
	protected _getHeaders(): {
		"api-key": string
		Authorization?: string | undefined
		"Content-Type": string
	}
	protected _complete(prompt: string, signal: AbortSignal, options: CompletionOptions): Promise<string>
	protected _getEndpoint(endpoint: "chat/completions" | "completions" | "models"): URL
	protected _streamComplete(prompt: string, signal: AbortSignal, options: CompletionOptions): AsyncGenerator<string>
	protected modifyChatBody(body: ChatCompletionCreateParams): ChatCompletionCreateParams
	protected _legacystreamComplete(
		prompt: string,
		signal: AbortSignal,
		options: CompletionOptions,
	): AsyncGenerator<string>
	protected _streamChat(
		messages: ChatMessage[],
		signal: AbortSignal,
		options: CompletionOptions,
	): AsyncGenerator<ChatMessage>
	protected _streamFim(
		prefix: string,
		suffix: string,
		signal: AbortSignal,
		options: CompletionOptions,
	): AsyncGenerator<string>
}
//# sourceMappingURL=OpenAI.d.ts.map
