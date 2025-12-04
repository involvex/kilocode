import { GitProgressOptions, GitChange } from "./types"
export type { GitChange, GitOptions, GitProgressOptions } from "./types"
export declare class GitExtensionService {
	private workspaceRoot
	private ignoreController
	constructor(workspaceRoot: string)
	/**
	 * Gathers information about changes (staged or unstaged)
	 */
	gatherChanges(options: GitProgressOptions): Promise<GitChange[]>
	spawnGitWithArgs(args: string[]): string
	private getDiffForChanges
	private getStatus
	private getGitDiff
	private getCurrentBranch
	private getRecentCommits
	/**
	 * Gets all context needed for commit message generation
	 * Can optionally focus on specific files if provided
	 */
	getCommitContext(changes: GitChange[], options: GitProgressOptions, specificFiles?: string[]): Promise<string>
	/**
	 * Validates and returns the raw Git status code
	 */
	private getChangeStatusFromCode
	/**
	 * Converts Git status code to readable text for display
	 */
	private getReadableStatus
	private shouldIncludeFile
	private reportProgress
	private isBinaryFile
	private isUntrackedFile
	private buildNumstatArgs
	private buildDiffArgs
	dispose(): void
}
//# sourceMappingURL=GitExtensionService.d.ts.map
