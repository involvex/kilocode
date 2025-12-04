/**
 * Git utilities for retrieving repository information
 */
export interface GitInfo {
	branch: string | null
	isClean: boolean
	isRepo: boolean
}
/**
 * Get Git repository information for a given directory
 * @param cwd - Current working directory path
 * @returns Git information including branch name and clean status
 */
export declare function getGitInfo(cwd: string): Promise<GitInfo>
/**
 * Get just the branch name (faster than full git info)
 * @param cwd - Current working directory path
 * @returns Branch name or null
 */
export declare function getGitBranch(cwd: string): Promise<string | null>
/**
 * Check if a branch exists in the repository
 * @param cwd - Current working directory path
 * @param branchName - Name of the branch to check
 * @returns True if branch exists, false otherwise
 */
export declare function branchExists(cwd: string, branchName: string): Promise<boolean>
/**
 * Generate a valid git branch name from a prompt
 * Sanitizes the prompt to create a safe branch name
 */
export declare function generateBranchName(prompt: string): string
/**
 * Check if a directory is a git worktree
 * @param cwd - Current working directory path
 * @returns True if directory is a git worktree, false otherwise
 */
export declare function isGitWorktree(cwd: string): Promise<boolean>
//# sourceMappingURL=git.d.ts.map
