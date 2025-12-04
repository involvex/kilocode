import * as vscode from "vscode"
import { DiffLine } from "../../../"
interface TextApplier {
	applyText(
		editor: vscode.TextEditor,
		text: string,
		position: vscode.Position,
		finalCursorPos: vscode.Position | null,
	): Promise<boolean>
}
export declare const HIDE_NEXT_EDIT_SUGGESTION_COMMAND = "continue.nextEditWindow.hideNextEditSuggestion"
export declare const ACCEPT_NEXT_EDIT_SUGGESTION_COMMAND = "continue.nextEditWindow.acceptNextEditSuggestion"
/**
 * This is where we create SVG windows and deletion decorations for non-FIM next edit suggestions.
 * This class controls the decoration object lifetime.
 * The syntax highlighting and the actual building of SVG happens inside core/codeRenderer/CodeRenderer.ts.
 */
export declare class NextEditWindowManager {
	private static instance
	private readonly excludedURIPrefixes
	private theme
	private fontSize
	private fontFamily
	private codeRenderer
	private currentDecoration
	private accepted
	private activeEditor
	private currentTooltipText
	private loggingService
	private mostRecentCompletionId
	private editableRegionStartLine
	private editableRegionEndLine
	private keyReservationState
	private latestOperationId
	private disposables
	private textApplier
	private finalCursorPos
	private isLineDelete
	private context
	static getInstance(): NextEditWindowManager
	static isInstantiated(): boolean
	static clearInstance(): void
	private constructor()
	private setKeyReservation
	resetKeyReservation(): Promise<void>
	private performKeyReservation
	static reserveTabAndEsc(): Promise<void>
	static freeTabAndEsc(): Promise<void>
	/**
	 * An async setup function to help us initialize the NextEditWindowManager.
	 * This is necessary because we need some setup to be done asynchronously,
	 * and constructors in TypeScript cannot be async.
	 * Plus, it's generally not recommended to pass arguments to getInstance() of a singleton.
	 * @param context The extension context.
	 * @param textApplier Callback that lets us use external deps such as llms if needed.
	 */
	setupNextEditWindowManager(context: vscode.ExtensionContext, textApplier?: TextApplier): Promise<void>
	/**
	 * Update the most recent completion id.
	 * @param completionId The id of current completion request.
	 */
	updateCurrentCompletionId(completionId: string): void
	/**
	 * Registers our two custom commands to the extension context.
	 * @param commandId Custom commands to help set up next edit.
	 * @param callback Function to run on command execution.
	 */
	private registerCommandSafely
	/**
	 * Show a tooltip with the given text at the current cursor position.
	 * @param editor The active text editor.
	 * @param text Text to display in the tooltip.
	 */
	showNextEditWindow(
		editor: vscode.TextEditor,
		currCursorPos: vscode.Position,
		editableRegionStartLine: number,
		editableRegionEndLine: number,
		oldEditRangeSlice: string,
		newEditRangeSlice: string,
		diffLines: DiffLine[],
	): Promise<void>
	/**
	 * Hide all tooltips in all editors.
	 */
	hideAllNextEditWindows(): Promise<void>
	hideAllNextEditWindowsAndResetCompletionId(): Promise<void>
	/**
	 * Accept the current next edit suggestion by inserting it at cursor position.
	 */
	private acceptNextEdit
	/**
	 * Dispose of the NextEditWindowManager.
	 */
	dispose(): void
	/**
	 * Setup listeners for theme, font, and cursor position changes.
	 */
	private setupListeners
	private shouldRenderTip
	/**
	 * Create a render of the given code, supporting multiple lines.
	 */
	private createCodeRender
	/**
	 * Create a decoration type with the code render.
	 * @param code: The code to render.
	 * @returns The decoration.
	 */
	private createCodeRenderDecoration
	private buildHideTooltipHoverMsg
	private isValidRange
	/**
	 * Calculate a position to the right of the cursor with the specified offset.
	 */
	private getDecorationOffsetPosition
	/**
	 * Render a window with the given text at the specified position.
	 */
	private renderWindow
	private renderDeletions
	getExactCharacterWidth(): Promise<number>
	hasAccepted(): boolean
	registerSelectionChangeHandler(): void
}
export {}
//# sourceMappingURL=NextEditWindowManager.d.ts.map
