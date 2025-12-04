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
import { JinaConfig } from "../types.js"
import { BaseLlmApi, CreateRerankResponse, FimCreateParamsStreaming, RerankCreateParams } from "./base.js"
export declare class JinaApi implements BaseLlmApi {
	protected config: JinaConfig
	apiBase: string
	constructor(config: JinaConfig)
	chatCompletionNonStream(_body: ChatCompletionCreateParamsNonStreaming): Promise<ChatCompletion>
	chatCompletionStream(_body: ChatCompletionCreateParamsStreaming): AsyncGenerator<ChatCompletionChunk, any, unknown>
	completionNonStream(_body: CompletionCreateParamsNonStreaming): Promise<Completion>
	completionStream(_body: CompletionCreateParamsStreaming): AsyncGenerator<Completion, any, unknown>
	fimStream(_body: FimCreateParamsStreaming): AsyncGenerator<ChatCompletionChunk, any, unknown>
	rerank(body: RerankCreateParams): Promise<CreateRerankResponse>
	list(): Promise<Model[]>
}
//# sourceMappingURL=Jina.d.ts.map
