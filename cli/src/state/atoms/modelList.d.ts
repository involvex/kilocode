export declare const MODEL_LIST_PAGE_SIZE = 10
export interface ModelListFilters {
	search?: string | undefined
	sort: "name" | "context" | "price" | "preferred"
	capabilities: ("images" | "cache" | "reasoning" | "free")[]
}
export interface ModelListState {
	pageIndex: number
	filters: ModelListFilters
}
export declare const defaultModelListFilters: ModelListFilters
/**
 * Current page index (0-based)
 */
export declare const modelListPageIndexAtom: import("jotai").PrimitiveAtom<number> & {
	init: number
}
/**
 * Current filters for model list
 */
export declare const modelListFiltersAtom: import("jotai").PrimitiveAtom<ModelListFilters> & {
	init: ModelListFilters
}
/**
 * Action atom to update filters
 */
export declare const updateModelListFiltersAtom: import("jotai").WritableAtom<
	null,
	[filters: Partial<ModelListFilters>],
	void
> & {
	init: null
}
/**
 * Action atom to change page
 */
export declare const changeModelListPageAtom: import("jotai").WritableAtom<null, [pageIndex: number], void> & {
	init: null
}
/**
 * Action atom to reset model list state
 */
export declare const resetModelListStateAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
//# sourceMappingURL=modelList.d.ts.map
