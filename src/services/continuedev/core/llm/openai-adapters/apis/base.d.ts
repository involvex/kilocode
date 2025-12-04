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
export interface FimCreateParamsStreaming extends CompletionCreateParamsStreaming {
	suffix: string
}
export interface RerankCreateParams {
	query: string
	documents: string[]
	model: string
	top_k?: number
}
interface CreateRerankItem {
	relevance_score: number
	index: number
}
export interface CreateRerankResponse {
	object: "list"
	data: CreateRerankItem[]
	model: string
	usage: {
		total_tokens: number
	}
}
export interface BaseLlmApi {
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk>
	completionNonStream(body: CompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<Completion>
	completionStream(body: CompletionCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<Completion>
	fimStream(body: FimCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<ChatCompletionChunk>
	rerank(body: RerankCreateParams): Promise<CreateRerankResponse>
	list(): Promise<Model[]>
}
export {}
//# sourceMappingURL=base.d.ts.map
