import { AutocompleteInput } from "../types"
import { GhostContextProvider } from "./GhostContextProvider"
import { GhostModel } from "../GhostModel"
export interface HoleFillerGhostPrompt {
	strategy: "hole_filler"
	autocompleteInput: AutocompleteInput
	systemPrompt: string
	userPrompt: string
}
export interface FillInAtCursorSuggestion {
	text: string
	prefix: string
	suffix: string
}
export interface ChatCompletionResult {
	suggestion: FillInAtCursorSuggestion
	cost: number
	inputTokens: number
	outputTokens: number
	cacheWriteTokens: number
	cacheReadTokens: number
}
/**
 * Parse the response - only handles responses with <COMPLETION> tags
 * Returns a FillInAtCursorSuggestion with the extracted text, or an empty string if nothing found
 */
export declare function parseGhostResponse(
	fullResponse: string,
	prefix: string,
	suffix: string,
): FillInAtCursorSuggestion
export declare class HoleFiller {
	private contextProvider
	constructor(contextProvider: GhostContextProvider)
	getPrompts(autocompleteInput: AutocompleteInput, languageId: string): Promise<HoleFillerGhostPrompt>
	getSystemInstructions(): string
	/**
	 * Build minimal prompt for auto-trigger with optional context
	 */
	getUserPrompt(autocompleteInput: AutocompleteInput, languageId: string): Promise<string>
	/**
	 * Execute chat-based completion using the model
	 */
	getFromChat(
		model: GhostModel,
		prompt: HoleFillerGhostPrompt,
		processSuggestion: (text: string) => FillInAtCursorSuggestion,
	): Promise<ChatCompletionResult>
}
//# sourceMappingURL=HoleFiller.d.ts.map
