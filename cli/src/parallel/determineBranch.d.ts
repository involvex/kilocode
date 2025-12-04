export interface DetermineParallelBranchInput {
	cwd: string
	prompt: string
	existingBranch?: string
}
export interface DetermineParallelBranchResult {
	worktreeBranch: string
	worktreePath: string
}
/**
 * Determine the branch and worktree path for parallel mode
 * Validates git repository, creates or uses existing branch, and sets up worktree
 */
export declare function determineParallelBranch({
	cwd,
	prompt,
	existingBranch,
}: DetermineParallelBranchInput): Promise<DetermineParallelBranchResult>
//# sourceMappingURL=determineBranch.d.ts.map
