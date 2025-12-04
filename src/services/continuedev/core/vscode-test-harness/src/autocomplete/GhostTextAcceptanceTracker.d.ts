import * as vscode from "vscode"
/**
 * This singleton tracks whether a given ghost text is accepted or not.
 * We need this because there is no clean way of determining if a ghost text has been accepted outside of vscode command callback.
 * The above mentioned callback is not viable because it's too slow.
 * We need a way to reject model predictions on cursor movement, but cursor can move due to many reasons -- one being accepting a ghost text.
 * We need to differentiate the ghost text acceptance from a deliberate cursor movement to reject the completion.
 * The cursor movement event listener fires much before the vscode command callback, so the chain of edits often breaks when cursor moves due to accepting a ghost text.
 * This is not what we want, as we want to keep the current chain of edits alive when the user accepts the completion.
 */
export declare class GhostTextAcceptanceTracker {
	private static instance
	private expectedAcceptance
	private constructor()
	static getInstance(): GhostTextAcceptanceTracker
	static clearInstance(): void
	setExpectedGhostTextAcceptance(document: vscode.TextDocument, text: string, startPosition: vscode.Position): void
	checkGhostTextWasAccepted(document: vscode.TextDocument, newPosition: vscode.Position): boolean
}
//# sourceMappingURL=GhostTextAcceptanceTracker.d.ts.map
