import { AutocompleteInput } from "../types"
import { GhostContextProvider } from "./GhostContextProvider"
import { GhostModel } from "../GhostModel"
import { FillInAtCursorSuggestion } from "./HoleFiller"
export interface FimGhostPrompt {
	strategy: "fim"
	autocompleteInput: AutocompleteInput
	formattedPrefix: string
	prunedSuffix: string
}
export interface FimCompletionResult {
	suggestion: FillInAtCursorSuggestion
	cost: number
	inputTokens: number
	outputTokens: number
	cacheWriteTokens: number
	cacheReadTokens: number
}
export declare class FimPromptBuilder {
	private contextProvider
	constructor(contextProvider: GhostContextProvider)
	/**
	 * Build complete FIM prompt with all necessary data
	 */
	getFimPrompts(autocompleteInput: AutocompleteInput, modelName: string): Promise<FimGhostPrompt>
	/**
	 * Execute FIM-based completion using the model
	 */
	getFromFIM(
		model: GhostModel,
		prompt: FimGhostPrompt,
		processSuggestion: (text: string) => FillInAtCursorSuggestion,
	): Promise<FimCompletionResult>
}
//# sourceMappingURL=FillInTheMiddle.d.ts.map
