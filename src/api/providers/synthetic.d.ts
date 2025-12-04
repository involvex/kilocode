import { Anthropic } from "@anthropic-ai/sdk"
import { type SyntheticModelId } from "@roo-code/types"
import type { ApiHandlerOptions, ModelRecord } from "../../shared/api"
import { BaseOpenAiCompatibleProvider } from "./base-openai-compatible-provider"
import { ApiStream } from "../transform/stream"
import type { ApiHandlerCreateMessageMetadata } from "../index"
export declare class SyntheticHandler extends BaseOpenAiCompatibleProvider<SyntheticModelId> {
	protected models: ModelRecord
	constructor(options: ApiHandlerOptions)
	fetchModel(): Promise<any>
	getModel(): any
	createMessage(
		systemPrompt: string,
		messages: Anthropic.Messages.MessageParam[],
		metadata?: ApiHandlerCreateMessageMetadata,
	): ApiStream
	completePrompt(prompt: string): Promise<string>
}
//# sourceMappingURL=synthetic.d.ts.map
