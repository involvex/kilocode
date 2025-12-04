import { OpenAI } from "openai/index"
import {
	ChatCompletion,
	ChatCompletionChunk,
	ChatCompletionCreateParamsNonStreaming,
	ChatCompletionCreateParamsStreaming,
	Completion,
	CompletionCreateParamsStreaming,
} from "openai/resources/index"
import { WatsonXConfig } from "../types.js"
import { BaseLlmApi, CreateRerankResponse } from "./base.js"
export declare class WatsonXApi implements BaseLlmApi {
	protected config: WatsonXConfig
	apiBase: string
	apiVersion: string
	projectId?: string
	deploymentId?: string
	constructor(config: WatsonXConfig)
	getBearerToken(): Promise<{
		token: string
		expiration: number
	}>
	private getEndpoint
	private _convertBody
	private getHeaders
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk, any, unknown>
	completionNonStream(): Promise<Completion>
	completionStream(
		body: CompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<Completion, any, unknown>
	fimStream(): AsyncGenerator<ChatCompletionChunk, any, unknown>
	rerank(): Promise<CreateRerankResponse>
	list(): Promise<OpenAI.Models.Model[]>
}
//# sourceMappingURL=WatsonX.d.ts.map
