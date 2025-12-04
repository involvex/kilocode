/**
 * Hook for managing task history
 */
import { type TaskHistoryFilters, type TaskHistoryData } from "../atoms/taskHistory.js"
export declare function useTaskHistory(): {
	data: TaskHistoryData | null
	filters: TaskHistoryFilters
	pageIndex: number
	loading: boolean
	error: string | null
	fetchTaskHistory: () => Promise<void>
	updateFilters: (newFilters: Partial<TaskHistoryFilters>) => Promise<TaskHistoryData>
	changePage: (newPageIndex: number) => Promise<TaskHistoryData>
	nextPage: () => Promise<TaskHistoryData>
	previousPage: () => Promise<TaskHistoryData>
}
//# sourceMappingURL=useTaskHistory.d.ts.map
