import * as vscode from "vscode"
import { FillInAtCursorSuggestion, HoleFillerGhostPrompt } from "./HoleFiller"
import { FimGhostPrompt } from "./FillInTheMiddle"
import { GhostModel } from "../GhostModel"
import type { GhostServiceSettings } from "@roo-code/types"
import { ClineProvider } from "../../../core/webview/ClineProvider"
export type CostTrackingCallback = (
	cost: number,
	inputTokens: number,
	outputTokens: number,
	cacheWriteTokens: number,
	cacheReadTokens: number,
) => void
export type GhostPrompt = FimGhostPrompt | HoleFillerGhostPrompt
/**
 * Find a matching suggestion from the history based on current prefix and suffix
 * @param prefix - The text before the cursor position
 * @param suffix - The text after the cursor position
 * @param suggestionsHistory - Array of previous suggestions (most recent last)
 * @returns The matching suggestion text, or null if no match found
 */
export declare function findMatchingSuggestion(
	prefix: string,
	suffix: string,
	suggestionsHistory: FillInAtCursorSuggestion[],
): string | null
export declare function stringToInlineCompletions(
	text: string,
	position: vscode.Position,
): vscode.InlineCompletionItem[]
export interface LLMRetrievalResult {
	suggestion: FillInAtCursorSuggestion
	cost: number
	inputTokens: number
	outputTokens: number
	cacheWriteTokens: number
	cacheReadTokens: number
}
export declare class GhostInlineCompletionProvider implements vscode.InlineCompletionItemProvider {
	private suggestionsHistory
	/** Tracks all pending/in-flight requests */
	private pendingRequests
	private holeFiller
	private fimPromptBuilder
	private model
	private costTrackingCallback
	private getSettings
	private recentlyVisitedRangesService
	private recentlyEditedTracker
	private debounceTimer
	private isFirstCall
	private ignoreController?
	constructor(
		context: vscode.ExtensionContext,
		model: GhostModel,
		costTrackingCallback: CostTrackingCallback,
		getSettings: () => GhostServiceSettings | null,
		cline: ClineProvider,
	)
	updateSuggestions(fillInAtCursor: FillInAtCursorSuggestion): void
	private getPrompt
	private processSuggestion
	private disposeIgnoreController
	dispose(): void
	provideInlineCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		_context: vscode.InlineCompletionContext,
		_token: vscode.CancellationToken,
	): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList>
	provideInlineCompletionItems_Internal(
		document: vscode.TextDocument,
		position: vscode.Position,
		_context: vscode.InlineCompletionContext,
		_token: vscode.CancellationToken,
	): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList>
	/**
	 * Find a pending request that covers the current prefix/suffix.
	 * A request covers the current position if:
	 * 1. The suffix matches (user hasn't changed text after cursor)
	 * 2. The current prefix either equals or extends the pending prefix
	 *    (user is typing forward, not backspacing or editing earlier)
	 *
	 * @returns The covering pending request, or null if none found
	 */
	private findCoveringPendingRequest
	/**
	 * Remove a pending request from the list when it completes.
	 */
	private removePendingRequest
	/**
	 * Debounced fetch with leading edge execution and pending request reuse.
	 * - First call executes immediately (leading edge)
	 * - Subsequent calls reset the timer and wait for DEBOUNCE_DELAY_MS of inactivity (trailing edge)
	 * - If a pending request covers the current prefix/suffix, reuse it instead of starting a new one
	 */
	private debouncedFetchAndCacheSuggestion
	private fetchAndCacheSuggestion
}
//# sourceMappingURL=GhostInlineCompletionProvider.d.ts.map
