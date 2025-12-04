import { ReasoningDetail } from "./kilocode/reasoning-details"
export type ApiStream = AsyncGenerator<ApiStreamChunk>
export type ApiStreamChunk =
	| ApiStreamReasoningDetailsChunk
	| ApiStreamAnthropicThinkingChunk
	| ApiStreamAnthropicRedactedThinkingChunk
	| ApiStreamTextChunk
	| ApiStreamUsageChunk
	| ApiStreamReasoningChunk
	| ApiStreamGroundingChunk
	| ApiStreamToolCallChunk
	| ApiStreamError
export interface ApiStreamError {
	type: "error"
	error: string
	message: string
}
export interface ApiStreamTextChunk {
	type: "text"
	text: string
}
export interface ApiStreamReasoningChunk {
	type: "reasoning"
	text: string
}
export interface ApiStreamAnthropicThinkingChunk {
	type: "ant_thinking"
	thinking: string
	signature: string
}
export interface ApiStreamAnthropicRedactedThinkingChunk {
	type: "ant_redacted_thinking"
	data: string
}
export interface ApiStreamReasoningDetailsChunk {
	type: "reasoning_details"
	reasoning_details: ReasoningDetail
}
export interface ApiStreamUsageChunk {
	type: "usage"
	inputTokens: number
	outputTokens: number
	cacheWriteTokens?: number
	cacheReadTokens?: number
	reasoningTokens?: number
	totalCost?: number
	inferenceProvider?: string
}
export interface ApiStreamGroundingChunk {
	type: "grounding"
	sources: GroundingSource[]
}
export interface ApiStreamToolCallChunk {
	type: "tool_call"
	id: string
	name: string
	arguments: string
}
export interface GroundingSource {
	title: string
	url: string
	snippet?: string
}
//# sourceMappingURL=stream.d.ts.map
