import { Position, RangeInFileWithNextEditInfo } from "../.."
import { BeforeAfterDiff } from "./diffFormatting"
interface EditClusterConfig {
	deltaT: number
	deltaL: number
	maxEdits: number
	maxDuration: number
	contextSize: number
	contextLines: number
}
export declare class EditAggregator {
	private fileStates
	config: EditClusterConfig
	private previousEditFinalCursorPosition
	private lastProcessedFilePath
	latestContextData: any
	onComparisonFinalized: (diff: BeforeAfterDiff, beforeCursorPos: Position, afterPrevEditCursorPos: Position) => void
	private static _instance
	static getInstance(
		config?: Partial<EditClusterConfig>,
		onComparisonFinalized?: (
			diff: BeforeAfterDiff,
			beforeCursorPos: Position,
			afterPrevEditCursorPos: Position,
		) => void,
	): EditAggregator
	constructor(
		config?: Partial<EditClusterConfig>,
		onComparisonFinalized?: (
			diff: BeforeAfterDiff,
			beforeCursorPos: Position,
			afterPrevEditCursorPos: Position,
		) => void,
	)
	processEdit(edit: RangeInFileWithNextEditInfo, timestamp?: number): Promise<void>
	private _processQueue
	private _processEditInternal
	private isWhitespaceOnlyEdit
	private clustersOverlap
	processEdits(edits: RangeInFileWithNextEditInfo[]): Promise<void>
	/**
	 * Finalizes all clusters for a specific file
	 */
	private finalizeClustersForFile
	finalizeAllClusters(): Promise<void>
	private findSuitableCluster
	private identifyClustersToFinalize
	private finalizeCluster
	private countChangedLines
	getActiveClusterCount(): number
	getProcessingQueueSize(): number
	resetState(): void
}
export {}
//# sourceMappingURL=aggregateEdits.d.ts.map
