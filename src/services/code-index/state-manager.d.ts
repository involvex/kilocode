import * as vscode from "vscode"
export type IndexingState = "Standby" | "Indexing" | "Indexed" | "Error"
export declare class CodeIndexStateManager {
	private _systemStatus
	private _statusMessage
	private _processedItems
	private _totalItems
	private _currentItemUnit
	private _gitBranch?
	private _manifest?
	private _progressEmitter
	readonly onProgressUpdate: vscode.Event<{
		systemStatus: IndexingState
		message: string
		processedItems: number
		totalItems: number
		currentItemUnit: string
		gitBranch: string | undefined
		manifest:
			| {
					totalFiles: number
					totalChunks: number
					lastUpdated: string
			  }
			| undefined
	}>
	get state(): IndexingState
	getCurrentStatus(): {
		systemStatus: IndexingState
		message: string
		processedItems: number
		totalItems: number
		currentItemUnit: string
		gitBranch: string | undefined
		manifest:
			| {
					totalFiles: number
					totalChunks: number
					lastUpdated: string
			  }
			| undefined
	}
	setSystemState(
		newState: IndexingState,
		message?: string,
		manifest?: {
			totalFiles: number
			totalChunks: number
			lastUpdated: string
		},
		gitBranch?: string,
	): void
	reportBlockIndexingProgress(processedItems: number, totalItems: number): void
	reportFileQueueProgress(processedFiles: number, totalFiles: number, currentFileBasename?: string): void
	dispose(): void
}
//# sourceMappingURL=state-manager.d.ts.map
