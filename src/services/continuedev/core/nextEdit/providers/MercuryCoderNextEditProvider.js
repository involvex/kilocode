import { NEXT_EDIT_MODELS } from "../../llm/constants.js"
import { MERCURY_SYSTEM_PROMPT, UNIQUE_TOKEN } from "../constants.js"
import {
	currentFileContentBlock,
	editHistoryBlock,
	recentlyViewedCodeSnippetsBlock,
} from "../templating/mercuryCoderNextEdit.js"
import { NEXT_EDIT_MODEL_TEMPLATES } from "../templating/NextEditPromptEngine.js"
import { BaseNextEditModelProvider } from "./BaseNextEditProvider.js"
export class MercuryCoderProvider extends BaseNextEditModelProvider {
	templateRenderer
	constructor() {
		super(NEXT_EDIT_MODELS.MERCURY_CODER)
		this.templateRenderer = NEXT_EDIT_MODEL_TEMPLATES[NEXT_EDIT_MODELS.MERCURY_CODER]
	}
	getSystemPrompt() {
		return MERCURY_SYSTEM_PROMPT
	}
	getWindowSize() {
		return { topMargin: 0, bottomMargin: 5 }
	}
	shouldInjectUniqueToken() {
		return true
	}
	getUniqueToken() {
		return UNIQUE_TOKEN
	}
	extractCompletion(message) {
		// Extract the code between the markdown code blocks.
		return message.slice(message.indexOf("```\n") + "```\n".length, message.lastIndexOf("\n\n```"))
	}
	buildPromptContext(context) {
		return {
			recentlyViewedCodeSnippets:
				context.snippetPayload.recentlyVisitedRangesSnippets.map((snip) => ({
					filepath: snip.filepath,
					content: snip.content,
				})) ?? [],
			currentFileContent: context.helper.fileContents,
			editableRegionStartLine: context.editableRegionStartLine,
			editableRegionEndLine: context.editableRegionEndLine,
			editDiffHistory: context.diffContext,
			currentFilePath: context.helper.filepath,
			languageShorthand: context.helper.lang.name,
		}
	}
	async generatePrompts(context) {
		const promptCtx = this.buildPromptContext(context)
		const templateVars = {
			recentlyViewedCodeSnippets: recentlyViewedCodeSnippetsBlock(promptCtx.recentlyViewedCodeSnippets),
			currentFileContent: currentFileContentBlock(
				promptCtx.currentFileContent,
				promptCtx.editableRegionStartLine,
				promptCtx.editableRegionEndLine,
				context.helper.pos,
			),
			editDiffHistory: editHistoryBlock(promptCtx.editDiffHistory),
			currentFilePath: promptCtx.currentFilePath,
			languageShorthand: promptCtx.languageShorthand,
		}
		const userPromptContent = this.templateRenderer(templateVars)
		return [
			{
				role: "system",
				content: this.getSystemPrompt(),
			},
			{
				role: "user",
				content: userPromptContent,
			},
		]
	}
	buildPromptMetadata(context) {
		const promptCtx = this.buildPromptContext(context)
		const templateVars = {
			recentlyViewedCodeSnippets: recentlyViewedCodeSnippetsBlock(promptCtx.recentlyViewedCodeSnippets),
			currentFileContent: currentFileContentBlock(
				promptCtx.currentFileContent,
				promptCtx.editableRegionStartLine,
				promptCtx.editableRegionEndLine,
				context.helper.pos,
			),
			editDiffHistory: editHistoryBlock(promptCtx.editDiffHistory),
			currentFilePath: promptCtx.currentFilePath,
			languageShorthand: promptCtx.languageShorthand,
		}
		const userPromptContent = this.templateRenderer(templateVars)
		return {
			prompt: {
				role: "user",
				content: userPromptContent,
			},
			userEdits: promptCtx.editDiffHistory.join("\n"),
			userExcerpts: templateVars.currentFileContent,
		}
	}
	calculateEditableRegion(helper, usingFullFileDiff) {
		if (usingFullFileDiff) {
			return this.calculateOptimalEditableRegion(helper, 512, "tokenizer")
		} else {
			const { topMargin, bottomMargin } = this.getWindowSize()
			return {
				editableRegionStartLine: Math.max(helper.pos.line - topMargin, 0),
				editableRegionEndLine: Math.min(helper.pos.line + bottomMargin, helper.fileLines.length - 1),
			}
		}
	}
}
//# sourceMappingURL=MercuryCoderNextEditProvider.js.map
