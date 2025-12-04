import { RecentlyEditedRange } from "../../../autocomplete/util/types"
import { IDE } from "../../../"
export declare class RecentlyEditedTracker {
	private ide
	private static staleTime
	private static maxRecentlyEditedRanges
	private recentlyEditedRanges
	private recentlyEditedDocuments
	private static maxRecentlyEditedDocuments
	private disposable
	private cleanupInterval
	constructor(ide: IDE)
	private insertRange
	private insertDocument
	private removeOldEntries
	private _getContentsForRange
	getRecentlyEditedRanges(): Promise<RecentlyEditedRange[]>
	dispose(): void
}
//# sourceMappingURL=recentlyEdited.d.ts.map
