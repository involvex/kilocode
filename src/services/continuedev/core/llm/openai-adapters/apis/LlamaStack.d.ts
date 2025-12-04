import { ChatCompletionChunk } from "openai/resources/index"
import { LlamastackConfig } from "../types.js"
import { OpenAIApi } from "./OpenAI.js"
import { FimCreateParamsStreaming } from "./base.js"
export declare class LlamastackApi extends OpenAIApi {
	constructor(config: LlamastackConfig)
	fimStream(body: FimCreateParamsStreaming, signal: AbortSignal): AsyncGenerator<ChatCompletionChunk, any, unknown>
}
//# sourceMappingURL=LlamaStack.d.ts.map
