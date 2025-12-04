/**
 * Task history state management atoms
 */
import type { HistoryItem } from "@roo-code/types/cli"
/**
 * Task history response data
 */
export interface TaskHistoryData {
	historyItems: HistoryItem[]
	pageIndex: number
	pageCount: number
}
/**
 * Task history filter options
 */
export interface TaskHistoryFilters {
	workspace: "current" | "all"
	sort: "newest" | "oldest" | "mostExpensive" | "mostTokens" | "mostRelevant"
	favoritesOnly: boolean
	search?: string
}
/**
 * Pending request resolver
 */
interface PendingRequest {
	requestId: string
	resolve: (data: TaskHistoryData) => void
	reject: (error: Error) => void
	timeout: NodeJS.Timeout
}
/**
 * Current task history data
 */
export declare const taskHistoryDataAtom: import("jotai").PrimitiveAtom<TaskHistoryData | null> & {
	init: TaskHistoryData | null
}
/**
 * Current filters for task history
 */
export declare const taskHistoryFiltersAtom: import("jotai").PrimitiveAtom<TaskHistoryFilters> & {
	init: TaskHistoryFilters
}
/**
 * Current page index (0-based)
 */
export declare const taskHistoryPageIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Loading state for task history
 */
export declare const taskHistoryLoadingAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Error state for task history
 */
export declare const taskHistoryErrorAtom: import("jotai").PrimitiveAtom<string | null> & {
	init: string | null
}
/**
 * Request ID counter for tracking responses
 */
export declare const taskHistoryRequestIdAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Map of pending requests waiting for responses
 */
export declare const taskHistoryPendingRequestsAtom: import("jotai").PrimitiveAtom<Map<string, PendingRequest>> & {
	init: Map<string, PendingRequest>
}
/**
 * Action atom to fetch task history
 */
export declare const fetchTaskHistoryAtom: import("jotai").WritableAtom<
	null,
	[],
	Promise<{
		pageIndex: number
		workspace: "current" | "all"
		sort: "newest" | "oldest" | "mostExpensive" | "mostTokens" | "mostRelevant"
		favoritesOnly: boolean
		search?: string
		requestId: string
	}>
> & {
	init: null
}
/**
 * Action atom to update filters
 */
export declare const updateTaskHistoryFiltersAtom: import("jotai").WritableAtom<
	null,
	[filters: Partial<TaskHistoryFilters>],
	void
> & {
	init: null
}
/**
 * Action atom to change page
 */
export declare const changeTaskHistoryPageAtom: import("jotai").WritableAtom<null, [pageIndex: number], void> & {
	init: null
}
/**
 * Action atom to add a pending request
 */
export declare const addPendingRequestAtom: import("jotai").WritableAtom<
	null,
	[
		request: {
			requestId: string
			resolve: (data: TaskHistoryData) => void
			reject: (error: Error) => void
			timeout: NodeJS.Timeout
		},
	],
	void
> & {
	init: null
}
/**
 * Action atom to remove a pending request
 */
export declare const removePendingRequestAtom: import("jotai").WritableAtom<null, [requestId: string], void> & {
	init: null
}
/**
 * Action atom to resolve a pending request
 */
export declare const resolveTaskHistoryRequestAtom: import("jotai").WritableAtom<
	null,
	[
		{
			requestId: string
			data?: TaskHistoryData
			error?: string
		},
	],
	void
> & {
	init: null
}
export {}
//# sourceMappingURL=taskHistory.d.ts.map
