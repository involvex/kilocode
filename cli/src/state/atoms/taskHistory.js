/**
 * Task history state management atoms
 */
import { atom } from "jotai"
/**
 * Current task history data
 */
export const taskHistoryDataAtom = atom(null)
/**
 * Current filters for task history
 */
export const taskHistoryFiltersAtom = atom({
	workspace: "current",
	sort: "newest",
	favoritesOnly: false,
})
/**
 * Current page index (0-based)
 */
export const taskHistoryPageIndexAtom = atom(0)
/**
 * Loading state for task history
 */
export const taskHistoryLoadingAtom = atom(false)
/**
 * Error state for task history
 */
export const taskHistoryErrorAtom = atom(null)
/**
 * Request ID counter for tracking responses
 */
export const taskHistoryRequestIdAtom = atom(0)
/**
 * Map of pending requests waiting for responses
 */
export const taskHistoryPendingRequestsAtom = atom(new Map())
/**
 * Action atom to fetch task history
 */
export const fetchTaskHistoryAtom = atom(null, async (get, set) => {
	const filters = get(taskHistoryFiltersAtom)
	const pageIndex = get(taskHistoryPageIndexAtom)
	const requestId = get(taskHistoryRequestIdAtom) + 1
	set(taskHistoryRequestIdAtom, requestId)
	set(taskHistoryLoadingAtom, true)
	set(taskHistoryErrorAtom, null)
	// This will be connected to the extension service
	return {
		requestId: requestId.toString(),
		...filters,
		pageIndex,
	}
})
/**
 * Action atom to update filters
 */
export const updateTaskHistoryFiltersAtom = atom(null, (get, set, filters) => {
	const currentFilters = get(taskHistoryFiltersAtom)
	set(taskHistoryFiltersAtom, { ...currentFilters, ...filters })
	// Reset to first page when filters change
	set(taskHistoryPageIndexAtom, 0)
})
/**
 * Action atom to change page
 */
export const changeTaskHistoryPageAtom = atom(null, (get, set, pageIndex) => {
	const data = get(taskHistoryDataAtom)
	if (data && pageIndex >= 0 && pageIndex < data.pageCount) {
		set(taskHistoryPageIndexAtom, pageIndex)
	}
})
/**
 * Action atom to add a pending request
 */
export const addPendingRequestAtom = atom(null, (get, set, request) => {
	const pendingRequests = get(taskHistoryPendingRequestsAtom)
	const newPendingRequests = new Map(pendingRequests)
	newPendingRequests.set(request.requestId, request)
	set(taskHistoryPendingRequestsAtom, newPendingRequests)
})
/**
 * Action atom to remove a pending request
 */
export const removePendingRequestAtom = atom(null, (get, set, requestId) => {
	const pendingRequests = get(taskHistoryPendingRequestsAtom)
	const request = pendingRequests.get(requestId)
	if (request) {
		clearTimeout(request.timeout)
		const newPendingRequests = new Map(pendingRequests)
		newPendingRequests.delete(requestId)
		set(taskHistoryPendingRequestsAtom, newPendingRequests)
	}
})
/**
 * Action atom to resolve a pending request
 */
export const resolveTaskHistoryRequestAtom = atom(null, (get, set, { requestId, data, error }) => {
	const pendingRequests = get(taskHistoryPendingRequestsAtom)
	const request = pendingRequests.get(requestId)
	if (request) {
		clearTimeout(request.timeout)
		if (error) {
			request.reject(new Error(error))
		} else if (data) {
			request.resolve(data)
		}
		// Remove from pending requests
		const newPendingRequests = new Map(pendingRequests)
		newPendingRequests.delete(requestId)
		set(taskHistoryPendingRequestsAtom, newPendingRequests)
	}
})
