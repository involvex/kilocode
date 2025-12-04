import { IDE } from "../../../"
import { AutocompleteCodeSnippet } from "../../../autocomplete/snippets/types"
/**
 * Service to keep track of recently visited ranges in files.
 */
export declare class RecentlyVisitedRangesService {
	private readonly ide
	private cache
	private numSurroundingLines
	private maxRecentFiles
	private maxSnippetsPerFile
	private isEnabled
	private disposable
	constructor(ide: IDE)
	private initWithPostHog
	private cacheCurrentSelectionContext
	/**
	 * Returns up to {@link maxSnippetsPerFile} snippets from the {@link maxRecentFiles} most recently visited files.
	 * Excludes snippets from the currently active file.
	 * @returns Array of code snippets from recently visited files
	 */
	getSnippets(): AutocompleteCodeSnippet[]
	dispose(): void
}
//# sourceMappingURL=RecentlyVisitedRangesService.d.ts.map
