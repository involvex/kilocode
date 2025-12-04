import { Completion } from "openai/resources/completions.mjs"
import {
	ChatCompletion,
	ChatCompletionChunk,
	ChatCompletionCreateParamsNonStreaming,
	ChatCompletionCreateParamsStreaming,
} from "openai/resources/index.mjs"
import { Model } from "openai/resources/models.mjs"
import { z } from "zod"
import { OpenAIConfigSchema } from "../types.js"
import { BaseLlmApi, CreateRerankResponse } from "./base.js"
export declare class RelaceApi implements BaseLlmApi {
	private readonly config
	private apiBase
	constructor(config: z.infer<typeof OpenAIConfigSchema>)
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk>
	completionNonStream(): Promise<Completion>
	completionStream(): AsyncGenerator<Completion>
	fimStream(): AsyncGenerator<ChatCompletionChunk>
	rerank(): Promise<CreateRerankResponse>
	list(): Promise<Model[]>
}
//# sourceMappingURL=Relace.d.ts.map
