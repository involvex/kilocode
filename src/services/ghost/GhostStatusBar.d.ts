import * as vscode from "vscode"
interface GhostStatusBarStateProps {
	enabled?: boolean
	model?: string
	provider?: string
	profileName?: string | null
	hasValidToken: boolean
	totalSessionCost: number
	completionCount: number
	sessionStartTime: number
}
export declare class GhostStatusBar {
	statusBar: vscode.StatusBarItem
	private props
	constructor(params: GhostStatusBarStateProps)
	private init
	private updateVisible
	dispose(): void
	private humanFormatSessionCost
	update(params: Partial<GhostStatusBarStateProps>): void
	private renderTokenError
	private formatTime
	private renderDefault
	render(): void
}
export {}
//# sourceMappingURL=GhostStatusBar.d.ts.map
