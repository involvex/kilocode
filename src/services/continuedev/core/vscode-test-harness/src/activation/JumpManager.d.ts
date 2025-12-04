import { NextEditOutcome } from "../../../nextEdit/types"
import * as vscode from "vscode"
export interface CompletionDataForAfterJump {
	completionId: string
	outcome: NextEditOutcome
	currentPosition: vscode.Position
}
/**
 * This is how we handle jumps and manage decoration object lifetime.
 * There are mainly three states the user can be in: not jumping, jumping in progress, and just jumped.
 * This can potentially be an enum for better readability, but there is logic here that relies on
 * the _jumpAccepted flag to determine whether we should delete chains.
 */
export declare class JumpManager {
	static _instance: JumpManager | undefined
	private _jumpIcon
	private _jumpDecoration
	private _jumpDecorationVisible
	private _disposables
	private _jumpInProgress
	private _jumpAccepted
	private _completionAfterJump
	private _oldCursorPosition
	private constructor()
	initialize(): void
	static getInstance(): JumpManager
	static clearInstance(): void
	dispose(): void
	private _createSvgJumpIcon
	private _createSvgJumpDecoration
	suggestJump(
		currentPosition: vscode.Position,
		nextJumpLocation: vscode.Position,
		completionContent?: string,
	): Promise<boolean>
	private renderTabToJumpDecoration
	private clearJumpDecoration
	private registerKeyListeners
	isJumpInProgress(): boolean
	setJumpInProgress(jumpInProgress: boolean): void
	wasJumpJustAccepted(): boolean
	setCompletionAfterJump(completionData: CompletionDataForAfterJump): void
	clearCompletionAfterJump(): void
	get completionAfterJump(): CompletionDataForAfterJump | null
	registerSelectionChangeHandler(): void
}
export declare function __setMockJumpManagerInstance(mockInstance: any): void
//# sourceMappingURL=JumpManager.d.ts.map
