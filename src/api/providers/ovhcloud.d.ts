import type { ApiHandlerOptions } from "../../shared/api"
import { RouterProvider } from "./router-provider"
import { ApiHandlerCreateMessageMetadata, SingleCompletionHandler } from ".."
import Anthropic from "@anthropic-ai/sdk"
import { ApiStream } from "../transform/stream"
export declare class OVHcloudAIEndpointsHandler extends RouterProvider implements SingleCompletionHandler {
	constructor(options: ApiHandlerOptions)
	createMessage(
		systemPrompt: string,
		messages: Anthropic.Messages.MessageParam[],
		_metadata?: ApiHandlerCreateMessageMetadata,
	): ApiStream
	completePrompt(prompt: string): Promise<string>
}
//# sourceMappingURL=ovhcloud.d.ts.map
