import { FimCreateParamsStreaming } from "./openai-adapters/apis/base"
import {
	ChatCompletion,
	ChatCompletionChunk,
	ChatCompletionCreateParams,
	CompletionCreateParams,
} from "openai/resources/index"
import { ChatMessage, CompletionOptions } from ".."
export declare function toChatBody(messages: ChatMessage[], options: CompletionOptions): ChatCompletionCreateParams
export declare function toCompleteBody(prompt: string, options: CompletionOptions): CompletionCreateParams
export declare function toFimBody(prefix: string, suffix: string, options: CompletionOptions): FimCreateParamsStreaming
export declare function fromChatResponse(response: ChatCompletion): ChatMessage
export declare function fromChatCompletionChunk(chunk: ChatCompletionChunk): ChatMessage | undefined
export type LlmApiRequestType = "chat" | "streamChat" | "streamComplete" | "streamFim" | "rerank"
//# sourceMappingURL=openaiTypeConverters.d.ts.map
