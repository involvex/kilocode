import { ChatCompletionChunk, CompletionUsage } from "openai/resources/index"
import { ChatCompletion } from "openai/resources/index.js"
import { CreateRerankResponse } from "./apis/base.js"
export declare function chatChunk(options: {
	content: string | null | undefined
	model: string
	finish_reason?: ChatCompletionChunk.Choice["finish_reason"]
	id?: string | null
	usage?: CompletionUsage
}): ChatCompletionChunk
export declare function usageChatChunk(options: {
	model: string
	id?: string | null
	usage?: CompletionUsage
}): ChatCompletionChunk
export declare function chatCompletion(options: {
	content: string | null | undefined
	model: string
	finish_reason?: ChatCompletion.Choice["finish_reason"]
	id?: string | null
	usage?: CompletionUsage
	index?: number | null
}): ChatCompletion
export declare function rerank(options: {
	model: string
	data: number[]
	usage?: CreateRerankResponse["usage"]
}): CreateRerankResponse
//# sourceMappingURL=util.d.ts.map
