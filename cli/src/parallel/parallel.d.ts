import type { CLI } from "../cli.js"
export declare const commitCompletionTimeout = 40000
export type Input = {
	cwd: string
	prompt: string
	timeout?: number
	existingBranch?: string
}
/**
 * Get parameters for parallel mode execution
 */
export declare function getParallelModeParams({ cwd, prompt, existingBranch }: Input): Promise<{
	worktreeBranch: string
	worktreePath: string
}>
/**
 * Finish parallel mode by having the extension agent generate a commit message and committing changes,
 * then cleaning up the git worktree.
 * This function should be called from the CLI dispose method when in parallel mode
 * Since it's part of the dispose flow, this function must never throw an error
 */
export declare function finishParallelMode(cli: CLI, worktreePath: string, worktreeBranch: string): Promise<() => void>
//# sourceMappingURL=parallel.d.ts.map
