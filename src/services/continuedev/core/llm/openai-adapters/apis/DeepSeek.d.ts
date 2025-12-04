import { ChatCompletionChunk, Model } from "openai/resources/index"
import { DeepseekConfig } from "../types.js"
import { OpenAIApi } from "./OpenAI.js"
import { FimCreateParamsStreaming } from "./base.js"
export declare class DeepSeekApi extends OpenAIApi {
	constructor(config: DeepseekConfig)
	fimStream(body: FimCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<ChatCompletionChunk, any, unknown>
	list(): Promise<Model[]>
}
//# sourceMappingURL=DeepSeek.d.ts.map
