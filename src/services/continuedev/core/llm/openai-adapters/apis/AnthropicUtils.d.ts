import { Base64ImageSource, MessageParam, Tool, ToolChoice } from "@anthropic-ai/sdk/resources"
import { ChatCompletionTool, ChatCompletionToolChoiceOption } from "openai/resources"
export declare function getAnthropicHeaders(apiKey: string, enableCaching: boolean): Record<string, string>
export declare function addCacheControlToLastTwoUserMessages(messages: MessageParam[]): void
export declare function openAiToolChoiceToAnthropicToolChoice(
	toolChoice: ChatCompletionToolChoiceOption | undefined,
): ToolChoice | undefined
export declare function openaiToolToAnthropicTool(tool: ChatCompletionTool): Tool
export declare function getAnthropicMediaTypeFromDataUrl(dataUrl: string): Base64ImageSource["media_type"]
//# sourceMappingURL=AnthropicUtils.d.ts.map
