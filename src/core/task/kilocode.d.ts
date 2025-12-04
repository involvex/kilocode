import Anthropic from "@anthropic-ai/sdk"
import { ApiMessage } from "../task-persistence"
export declare function mergeApiMessages(
	message1: ApiMessage,
	message2: Anthropic.Messages.MessageParam,
): {
	content: Anthropic.Messages.ContentBlockParam[]
	role: "user" | "assistant"
	ts?: number
	isSummary?: boolean
	id?: string
	type?: "reasoning"
	summary?: any[]
	encrypted_content?: string
}
export declare function addOrMergeUserContent(
	messages: Anthropic.ContentBlockParam[],
	newUserContent: (Anthropic.TextBlockParam | Anthropic.ImageBlockParam)[],
): Anthropic.Messages.ContentBlockParam[]
//# sourceMappingURL=kilocode.d.ts.map
