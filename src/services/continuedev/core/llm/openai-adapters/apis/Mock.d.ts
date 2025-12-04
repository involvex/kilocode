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
import { BaseLlmApi, CreateRerankResponse, FimCreateParamsStreaming, RerankCreateParams } from "./base.js"
export declare class MockApi implements BaseLlmApi {
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, _signal: AbortSignal): Promise<ChatCompletion>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		_signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk, any, unknown>
	completionNonStream(body: CompletionCreateParamsNonStreaming, _signal: AbortSignal): Promise<Completion>
	completionStream(
		body: CompletionCreateParamsStreaming,
		_signal: AbortSignal,
	): AsyncGenerator<Completion, any, unknown>
	fimStream(body: FimCreateParamsStreaming, _signal: AbortSignal): AsyncGenerator<ChatCompletionChunk, any, unknown>
	rerank(_body: RerankCreateParams): Promise<CreateRerankResponse>
	list(): Promise<Model[]>
}
//# sourceMappingURL=Mock.d.ts.map
