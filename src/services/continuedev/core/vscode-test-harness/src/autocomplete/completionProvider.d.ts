import { type AutocompleteOutcome } from "../../../autocomplete/util/types"
import { MinimalConfigProvider } from "../../../autocomplete/MinimalConfig"
import * as vscode from "vscode"
import { NextEditOutcome } from "../../../nextEdit/types"
import { RecentlyEditedTracker } from "./recentlyEdited"
import { RecentlyVisitedRangesService } from "./RecentlyVisitedRangesService"
import { IDE } from "../../../"
export declare class ContinueCompletionProvider implements vscode.InlineCompletionItemProvider {
	private readonly configHandler
	private readonly ide
	private onError
	private completionProvider
	private nextEditProvider
	private nextEditLoggingService
	private jumpManager
	private prefetchQueue
	recentlyVisitedRanges: RecentlyVisitedRangesService
	recentlyEditedTracker: RecentlyEditedTracker
	private isNextEditActive
	private usingFullFileDiff
	activateNextEdit(): void
	deactivateNextEdit(): void
	constructor(configHandler: MinimalConfigProvider, ide: IDE, usingFullFileDiff: boolean)
	_lastShownCompletion: AutocompleteOutcome | NextEditOutcome | undefined
	/**
	 * Updates this class and the prefetch queue's usingFullFileDiff flag.
	 * @param usingFullFileDiff New value to set.
	 */
	updateUsingFullFileDiff(usingFullFileDiff: boolean): void
	/**
	 * This is the entry point to the autocomplete and next edit logic.
	 * @param document The text document containing the current cursor position.
	 * @param position The current cursor position.
	 * @param context Contextual information about the inline completion request.
	 */
	provideInlineCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		context: vscode.InlineCompletionContext,
		token: vscode.CancellationToken,
	): ProviderResult<InlineCompletionItem[] | InlineCompletionList>
	willDisplay(
		_document: vscode.TextDocument,
		selectedCompletionInfo: vscode.SelectedCompletionInfo | undefined,
		abortSignal: AbortSignal,
		outcome: AutocompleteOutcome | NextEditOutcome,
	): boolean
}
//# sourceMappingURL=completionProvider.d.ts.map
