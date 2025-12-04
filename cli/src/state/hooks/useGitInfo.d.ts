/**
 * Hook for fetching Git repository information
 */
import { type GitInfo } from "../../utils/git.js"
export interface UseGitInfoReturn extends GitInfo {
	loading: boolean
}
/**
 * Hook to get Git repository information for the current workspace
 * Fetches git info on mount and when cwd changes
 * Debounces updates to avoid excessive git calls
 *
 * @param cwd - Current working directory path
 * @returns Git information with loading state
 */
export declare function useGitInfo(cwd: string | null): UseGitInfoReturn
//# sourceMappingURL=useGitInfo.d.ts.map
