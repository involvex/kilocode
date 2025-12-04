/**
 * GitWatcher - Monitors git repository state and emits events
 *
 * This module provides a lightweight git watcher that:
 * - Emits events for scan lifecycle (start/end)
 * - Emits events for file changes (added/modified) with git hashes
 * - Emits events for file deletions
 * - Monitors git state changes (commits, branch switches)
 * - Supports delta-based scanning on feature branches
 * - Implements vscode.Disposable for proper cleanup
 */
import * as vscode from "vscode"
/**
 * Configuration for GitWatcher
 */
export interface GitWatcherConfig {
	/**
	 * Working directory (git repository root)
	 */
	cwd: string
	/**
	 * Optional override for the default branch name
	 * If not provided, will be determined automatically
	 */
	defaultBranchOverride?: string
}
/**
 * Represents a file in the git repository
 */
export type GitWatcherFile =
	| {
			type: "file"
			filePath: string
			fileHash: string
	  }
	| {
			type: "file-deleted"
			filePath: string
	  }
/**
 * Base event data shared by all GitWatcher events
 */
interface GitWatcherBaseEvent {
	/**
	 * Current branch name
	 */
	branch: string
	/**
	 * Whether or not the event is coming from the base branch
	 */
	isBaseBranch: boolean
	/**
	 * Current instance which emitted the event
	 */
	watcher: GitWatcher
	/**
	 * Async iterable that yields files affected by this event
	 */
	files: AsyncIterable<GitWatcherFile>
}
/**
 * Event emitted when the branch changes
 */
export interface GitWatcherBranchChangedEvent extends GitWatcherBaseEvent {
	type: "branch-changed"
	/**
	 * The previous branch name
	 */
	previousBranch: string
	/**
	 * The new branch name
	 */
	newBranch: string
}
/**
 * Event emitted when a commit is detected
 */
export interface GitWatcherCommitEvent extends GitWatcherBaseEvent {
	type: "commit"
	/**
	 * The previous commit SHA
	 */
	previousCommit: string
	/**
	 * The new commit SHA
	 */
	newCommit: string
}
export interface GitWatcherStartEvent extends GitWatcherBaseEvent {
	type: "start"
}
/**
 * Discriminated union of all GitWatcher event types
 */
export type GitWatcherEvent = GitWatcherBranchChangedEvent | GitWatcherCommitEvent | GitWatcherStartEvent
/**
 * @deprecated Use GitWatcherEvent instead. This type alias is provided for backward compatibility.
 */
export type GitWatcherFileEvent = never
export declare class GitWatcher implements vscode.Disposable {
	config: GitWatcherConfig
	private readonly emitter
	private readonly disposables
	private currentState
	private isProcessing
	private defaultBranch
	constructor(config: GitWatcherConfig)
	/**
	 * Register a handler for all GitWatcher events
	 * @param handler Callback function that receives event data
	 */
	onEvent(handler: (data: GitWatcherEvent) => void): void
	/**
	 * Creates an async iterable that yields files from the repository
	 *
	 * Behavior:
	 * - On default/main branch: Yields all tracked files
	 * - On feature branch: Yields only files that differ from default branch
	 */
	getFiles(branch: string, isBaseBranch: boolean): AsyncIterable<GitWatcherFile>
	/**
	 * Dispose of the watcher and clean up resources
	 */
	dispose(): void
	/**
	 * Start monitoring git state changes
	 * Must be called after construction to begin watching for git changes
	 */
	start(): Promise<void>
	/**
	 * Set up file system watchers for git state changes
	 * Uses fs.watchFile (polling) instead of fs.watch because git replaces files
	 * during branch switches, which causes fs.watch to stop working
	 */
	private setupGitWatchers
	/**
	 * Handle git state changes
	 */
	private handleGitChange
	/**
	 * Get the default branch name
	 */
	private getDefaultBranch
	/**
	 * Helper method to emit events
	 * @param event The event data to emit
	 */
	private emitEvent
	/**
	 * Get all tracked files in the repository
	 */
	private getAllFiles
	/**
	 * Get only files that differ from the default branch
	 */
	private getDiffFiles
	/**
	 * Process a batch of files to get their git hashes
	 */
	private processBatch
}
export {}
//# sourceMappingURL=GitWatcher.d.ts.map
