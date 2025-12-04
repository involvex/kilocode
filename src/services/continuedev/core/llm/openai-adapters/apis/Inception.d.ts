import {
	ChatCompletion,
	ChatCompletionChunk,
	ChatCompletionCreateParamsNonStreaming,
	ChatCompletionCreateParamsStreaming,
	Model,
} from "openai/resources/index"
import { InceptionConfig } from "../types.js"
import { OpenAIApi } from "./OpenAI.js"
import { FimCreateParamsStreaming } from "./base.js"
export declare class InceptionApi extends OpenAIApi {
	constructor(config: InceptionConfig)
	editCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk, any, unknown>
	editCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk, any, unknown>
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	applyCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk, any, unknown>
	applyCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	fimStream(body: FimCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<ChatCompletionChunk, any, unknown>
	list(): Promise<Model[]>
	private isNextEdit
	private isApply
	private removeToken
	private streamCustomEndpoint
	private nonStreamCustomEndpoint
}
//# sourceMappingURL=Inception.d.ts.map
