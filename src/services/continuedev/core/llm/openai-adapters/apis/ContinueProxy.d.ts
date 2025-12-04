import {
	ChatCompletionCreateParams,
	CompletionCreateParamsNonStreaming,
	CompletionCreateParamsStreaming,
} from "openai/resources/index"
import { z } from "zod"
import { ContinueProxyConfigSchema } from "../types.js"
import { FimCreateParamsStreaming, RerankCreateParams } from "./base.js"
import { OpenAIApi } from "./OpenAI.js"
export declare class ContinueProxyApi extends OpenAIApi {
	private actualApiBase?
	private configEnv?
	private continueProxyConfig
	constructor(config: z.infer<typeof ContinueProxyConfigSchema>)
	protected extraBodyProperties(): Record<string, any>
	private modifyBodyWithContinueProperties
	modifyChatBody<T extends ChatCompletionCreateParams>(body: T): T
	modifyCompletionBody<T extends CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming>(body: T): T
	modifyFimBody<T extends FimCreateParamsStreaming>(body: T): T
	protected getHeaders(): Record<string, string>
	modifyRerankBody<T extends RerankCreateParams>(body: T): T
}
//# sourceMappingURL=ContinueProxy.d.ts.map
