import OpenAI from "openai"
import type { ApiHandlerCreateMessageMetadata } from "../../index"
import { ProviderSettings, ToolProtocol } from "@roo-code/types"
import Anthropic from "@anthropic-ai/sdk"
import { ApiStreamToolCallChunk } from "../../transform/stream"
export declare function getActiveToolUseStyle(settings: ProviderSettings | undefined): ToolProtocol
/**
 * Adds native tool call parameters to OpenAI chat completion params when toolStyle is "json"
 *
 * @param params - The OpenAI chat completion parameters to augment
 * @param options - Provider options containing toolStyle configuration
 * @param metadata - Optional metadata that may contain allowedTools
 * @returns Augmented parameters with native tool call settings
 */
export declare function addNativeToolCallsToParams<T extends OpenAI.Chat.ChatCompletionCreateParams>(
	params: T,
	options: ProviderSettings,
	metadata?: ApiHandlerCreateMessageMetadata,
): T
export declare class ToolCallAccumulator {
	private accumulator
	processChunk(chunk: OpenAI.Chat.Completions.ChatCompletionChunk | undefined): Generator<ApiStreamToolCallChunk>
}
export declare class ToolCallAccumulatorAnthropic {
	private currentToolCall
	processChunk(chunk: Anthropic.RawMessageStreamEvent): Generator<ApiStreamToolCallChunk>
}
export declare function convertOpenAIToolsToAnthropic(
	allowedTools?: OpenAI.Chat.ChatCompletionTool[],
): Anthropic.ToolUnion[]
//# sourceMappingURL=nativeToolCallHelpers.d.ts.map
