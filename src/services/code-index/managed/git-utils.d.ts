/**
 * Git utility functions for managed codebase indexing
 *
 * This module provides pure functions for interacting with git to determine
 * branch state and file changes. Used to implement delta-based indexing.
 */
import { GitDiff } from "./types"
/**
 * Gets the current git branch name
 * @param workspacePath Path to the workspace
 * @returns Current branch name (e.g., "main", "feature/new-api")
 * @throws Error if not in a git repository
 */
export declare function getCurrentBranch(workspacePath: string): Promise<string>
/**
 * Gets the current git commit SHA
 * @param workspacePath Path to the workspace
 * @returns Current commit SHA (full 40-character hash)
 * @throws Error if not in a git repository
 */
export declare function getCurrentCommitSha(workspacePath: string): Promise<string>
/**
 * Gets the remote URL for the repository
 * @param workspacePath Path to the workspace
 * @returns Remote URL (e.g., "https://github.com/org/repo.git")
 * @throws Error if no remote is configured
 */
export declare function getRemoteUrl(workspacePath: string): Promise<string>
/**
 * Checks if the workspace is a git repository
 * @param workspacePath Path to the workspace
 * @returns true if workspace is a git repository
 */
export declare function isGitRepository(workspacePath: string): Promise<boolean>
/**
 * Gets the diff between a feature branch and base branch
 * @param featureBranch The feature branch name
 * @param baseBranch The base branch name (usually 'main' or 'develop')
 * @param workspacePath Path to the workspace
 * @returns GitDiff object with added, modified, and deleted files
 * @throws Error if git command fails
 */
export declare function getGitDiff(featureBranch: string, baseBranch: string, workspacePath: string): Promise<GitDiff>
/**
 * Determines if a branch is a base branch (main or develop)
 * @param branchName The branch name to check
 * @param workspacePath Optional workspace path to check against remote default branch
 * @returns true if this is a base branch
 */
export declare function isBaseBranch(branchName: string, workspacePath?: string): Promise<boolean>
/**
 * Gets the default branch name from the remote repository
 * @param workspacePath Path to the workspace
 * @returns The default branch name or null if it cannot be determined
 */
export declare function getDefaultBranchFromRemote(workspacePath: string): Promise<string | null>
/**
 * Gets the base branch for a given feature branch
 * First tries to get the default branch from the remote repository,
 * then checks if common base branches exist, defaults to 'main'
 * @param workspacePath Path to the workspace
 * @returns The base branch name (e.g., 'main', 'canary', 'develop')
 */
export declare function getBaseBranch(workspacePath: string): Promise<string>
/**
 * Checks if there are uncommitted changes in the workspace
 * @param workspacePath Path to the workspace
 * @returns true if there are uncommitted changes
 */
export declare function hasUncommittedChanges(workspacePath: string): Promise<boolean>
/**
 * Gets all files tracked by git using async generator for memory efficiency
 * @param workspacePath Path to the workspace
 * @yields File paths relative to workspace root
 */
export declare function getGitTrackedFiles(workspacePath: string): AsyncGenerator<string, void, unknown>
/**
 * Checks if the repository is in a detached HEAD state
 * @param workspacePath Path to the workspace
 * @returns true if in detached HEAD state
 */
export declare function isDetachedHead(workspacePath: string): Promise<boolean>
/**
 * Gets the path to the .git/HEAD file
 * @param workspacePath Path to the workspace
 * @returns Path to .git/HEAD file
 */
export declare function getGitHeadPath(workspacePath: string): Promise<string>
/**
 * Gets the current git state (branch and commit)
 * @param workspacePath Path to the workspace
 * @returns Object with branch name and commit SHA, or null if detached
 */
export declare function getGitState(workspacePath: string): Promise<{
	branch: string
	commit: string
	isDetached: boolean
} | null>
//# sourceMappingURL=git-utils.d.ts.map
