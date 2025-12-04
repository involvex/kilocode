import { MessageCreateParams } from "@anthropic-ai/sdk/resources"
import { OpenAI } from "openai/index"
import {
	ChatCompletion,
	ChatCompletionChunk,
	ChatCompletionCreateParamsNonStreaming,
	ChatCompletionCreateParamsStreaming,
	Completion,
	CompletionCreateParamsNonStreaming,
	CompletionCreateParamsStreaming,
} from "openai/resources/index"
import { ChatCompletionCreateParams } from "openai/resources/index.js"
import { AnthropicConfig } from "../types.js"
import { CachingStrategyName } from "./AnthropicCachingStrategies.js"
import { BaseLlmApi, CreateRerankResponse, FimCreateParamsStreaming, RerankCreateParams } from "./base.js"
export declare class AnthropicApi implements BaseLlmApi {
	protected config: AnthropicConfig & {
		cachingStrategy?: CachingStrategyName
	}
	apiBase: string
	constructor(
		config: AnthropicConfig & {
			cachingStrategy?: CachingStrategyName
		},
	)
	private _convertBody
	private maxTokensForModel
	_convertToCleanAnthropicBody(oaiBody: ChatCompletionCreateParams): MessageCreateParams
	private convertMessageContentToBlocks
	private getContentBlocksFromChatMessage
	private _convertMessages
	chatCompletionNonStream(body: ChatCompletionCreateParamsNonStreaming, signal: AbortSignal): Promise<ChatCompletion>
	handleStreamResponse(
		response: any,
		model: string,
	): AsyncGenerator<OpenAI.Chat.Completions.ChatCompletionChunk, void, unknown>
	chatCompletionStream(
		body: ChatCompletionCreateParamsStreaming,
		signal: AbortSignal,
	): AsyncGenerator<ChatCompletionChunk>
	private getHeaders
	completionNonStream(_body: CompletionCreateParamsNonStreaming, _signal: AbortSignal): Promise<Completion>
	completionStream(_body: CompletionCreateParamsStreaming, _signal: AbortSignal): AsyncGenerator<Completion>
	fimStream(_body: FimCreateParamsStreaming, _signal: AbortSignal): AsyncGenerator<ChatCompletionChunk>
	rerank(_body: RerankCreateParams): Promise<CreateRerankResponse>
	list(): Promise<OpenAI.Models.Model[]>
}
//# sourceMappingURL=Anthropic.d.ts.map
