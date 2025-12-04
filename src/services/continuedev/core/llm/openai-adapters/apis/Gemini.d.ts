import { OpenAI } from "openai/index"
import {
	ChatCompletion,
	ChatCompletionChunk,
	ChatCompletionCreateParams,
	ChatCompletionCreateParamsNonStreaming,
	ChatCompletionCreateParamsStreaming,
	Completion,
	CompletionCreateParamsNonStreaming,
	CompletionCreateParamsStreaming,
	Model,
} from "openai/resources/index"
import { GeminiConfig } from "../types.js"
import { BaseLlmApi, CreateRerankResponse, FimCreateParamsStreaming, RerankCreateParams } from "./base.js"
export declare class GeminiApi implements BaseLlmApi {
	protected config: GeminiConfig
	apiBase: string
	constructor(config: GeminiConfig)
	private _oaiPartToGeminiPart
	_convertBody(oaiBody: ChatCompletionCreateParams, url: string): any
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	handleStreamResponse(
		response: Response,
		model: string,
	): AsyncGenerator<OpenAI.Chat.Completions.ChatCompletionChunk, void, unknown>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk>
	completionNonStream(_body: CompletionCreateParamsNonStreaming): Promise<Completion>
	completionStream(_body: CompletionCreateParamsStreaming): AsyncGenerator<Completion>
	fimStream(_body: FimCreateParamsStreaming): AsyncGenerator<ChatCompletionChunk>
	rerank(_body: RerankCreateParams): Promise<CreateRerankResponse>
	list(): Promise<Model[]>
}
//# sourceMappingURL=Gemini.d.ts.map
