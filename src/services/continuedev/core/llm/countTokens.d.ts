import { Tiktoken } from "js-tiktoken"
import { ChatMessage, CompiledMessagesResult, MessageContent } from "../index.js"
interface Encoding {
	encode: Tiktoken["encode"]
	decode: Tiktoken["decode"]
}
export declare function encodingForModel(modelName: string): Encoding
declare function countTokens(content: MessageContent, modelName?: string): number
declare function pruneLinesFromTop(prompt: string, maxTokens: number, modelName: string): string
declare function pruneLinesFromBottom(prompt: string, maxTokens: number, modelName: string): string
declare function pruneStringFromBottom(modelName: string, maxTokens: number, prompt: string): string
export declare function getTokenCountingBufferSafety(contextLength: number): number
declare function pruneRawPromptFromTop(
	modelName: string,
	contextLength: number,
	prompt: string,
	tokensForCompletion: number,
): string
/**
 * Reconciles chat messages with available context length by intelligently pruning older messages
 * while preserving critical conversation elements.
 *
 * Core Guidelines:
 * - Always preserve the last user/tool message sequence (including any associated assistant message with tool calls)
 * - Always preserve the system message and tools
 * - Never allow orphaned tool responses without their corresponding tool calls
 * - Remove older messages first when pruning is necessary
 * - Maintain conversation coherence by flattening adjacent similar messages
 *
 * Process:
 * 1. Handle image content conversion for models that don't support images
 * 2. Extract and preserve system message
 * 3. Filter out empty messages and trailing non-user/tool messages
 * 4. Extract the complete tool sequence from the end (user message or assistant + tool responses)
 * 5. Calculate token requirements for non-negotiable elements (system, tools, last sequence)
 * 6. Prune older messages until within available token budget
 * 7. Reassemble with proper ordering and flatten adjacent similar messages
 *
 * @param params - Configuration object containing:
 *   - modelName: LLM model name for token counting
 *   - msgs: Array of chat messages to process
 *   - contextLength: Maximum context length supported by the model
 *   - maxTokens: Maximum tokens to reserve for the response
 * @returns Processed array of chat messages that fit within context constraints
 * @throws Error if non-negotiable elements exceed available context
 */
declare function compileChatMessages({
	modelName,
	msgs,
	knownContextLength,
	maxTokens,
}: {
	modelName: string
	msgs: ChatMessage[]
	knownContextLength: number | undefined
	maxTokens: number
}): CompiledMessagesResult
export {
	compileChatMessages,
	countTokens,
	pruneLinesFromBottom,
	pruneLinesFromTop,
	pruneRawPromptFromTop,
	pruneStringFromBottom,
}
//# sourceMappingURL=countTokens.d.ts.map
