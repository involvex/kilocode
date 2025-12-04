import {
	ChatCompletion,
	ChatCompletionChunk,
	ChatCompletionCreateParamsNonStreaming,
	ChatCompletionCreateParamsStreaming,
	Completion,
	CompletionCreateParamsNonStreaming,
	CompletionCreateParamsStreaming,
	Model,
} from "openai/resources/index"
import { VertexAIConfig } from "../types.js"
import { AnthropicApi } from "./Anthropic.js"
import { BaseLlmApi, CreateRerankResponse, FimCreateParamsStreaming } from "./base.js"
import { GeminiApi } from "./Gemini.js"
import { OpenAIApi } from "./OpenAI.js"
export declare class VertexAIApi implements BaseLlmApi {
	protected config: VertexAIConfig
	anthropicInstance: AnthropicApi
	geminiInstance: GeminiApi
	mistralInstance: OpenAIApi
	private clientPromise?
	static AUTH_SCOPES: string
	constructor(config: VertexAIConfig)
	private setupAuthentication
	private getApiBase
	private determineVertexProvider
	private getAuthHeaders
	private buildUrl
	private convertAnthropicBody
	private convertGeminiBody
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk>
	completionNonStream(body: CompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<Completion>
	completionStream(body: CompletionCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<Completion>
	fimStream(body: FimCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<ChatCompletionChunk>
	rerank(): Promise<CreateRerankResponse>
	list(): Promise<Model[]>
}
//# sourceMappingURL=VertexAI.d.ts.map
