import { HelperVars } from "../../autocomplete/util/HelperVars.js"
import { ModelSpecificContext, Prompt, PromptMetadata, TemplateVars } from "../types.js"
import { BaseNextEditModelProvider } from "./BaseNextEditProvider.js"
export type NextEditTemplateRenderer = (vars: TemplateVars) => string
export declare class InstinctProvider extends BaseNextEditModelProvider {
	private templateRenderer
	constructor()
	getSystemPrompt(): string
	getWindowSize(): {
		topMargin: number
		bottomMargin: number
	}
	shouldInjectUniqueToken(): boolean
	extractCompletion(message: string): string
	buildPromptContext(context: ModelSpecificContext): {
		contextSnippets: string
		currentFileContent: string
		windowStart: number
		windowEnd: number
		editableRegionStartLine: number
		editableRegionEndLine: number
		editDiffHistory: string[]
		currentFilePath: string
		languageShorthand: string
	}
	generatePrompts(context: ModelSpecificContext): Promise<Prompt[]>
	buildPromptMetadata(context: ModelSpecificContext): PromptMetadata
	calculateEditableRegion(
		helper: HelperVars,
		usingFullFileDiff: boolean,
	): {
		editableRegionStartLine: number
		editableRegionEndLine: number
	}
}
//# sourceMappingURL=InstinctNextEditProvider.d.ts.map
