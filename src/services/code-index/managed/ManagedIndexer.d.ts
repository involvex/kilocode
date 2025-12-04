import * as vscode from "vscode"
import { ContextProxy } from "../../../core/config/ContextProxy"
import { KiloOrganization } from "../../../shared/kilocode/organization"
import { GitWatcher, GitWatcherEvent } from "../../../shared/GitWatcher"
import { ServerManifest } from "./types"
import { VectorStoreSearchResult } from "../interfaces/vector-store"
import { RooIgnoreController } from "../../../core/ignore/RooIgnoreController"
interface ManagedIndexerConfig {
	kilocodeToken: string | null
	kilocodeOrganizationId: string | null
	kilocodeTesterWarningsDisabledUntil: number | null
}
/**
 * Serializable error information for managed indexing operations
 */
interface ManagedIndexerError {
	/** Error type for categorization */
	type: "setup" | "scan" | "file-upsert" | "git" | "manifest" | "config"
	/** Human-readable error message */
	message: string
	/** ISO timestamp when error occurred */
	timestamp: string
	/** Optional context about what was being attempted */
	context?: {
		filePath?: string
		branch?: string
		operation?: string
	}
	/** Original error details if available */
	details?: string
}
interface ManagedIndexerWorkspaceFolderState {
	workspaceFolder: vscode.WorkspaceFolder
	gitBranch: string | null
	projectId: string | null
	manifest: ServerManifest | null
	isIndexing: boolean
	watcher: GitWatcher | null
	repositoryUrl?: string
	error?: ManagedIndexerError
	/** In-flight manifest fetch promise - reused if already fetching */
	manifestFetchPromise: Promise<ServerManifest> | null
	/** AbortController for the current indexing operation */
	currentAbortController?: AbortController
	ignoreController: RooIgnoreController | null
}
export declare class ManagedIndexer implements vscode.Disposable {
	contextProxy: ContextProxy
	private static prevInstance
	static getInstance(): ManagedIndexer
	workspaceFoldersListener: vscode.Disposable | null
	configChangeListener: vscode.Disposable | null
	config: ManagedIndexerConfig | null
	organization: KiloOrganization | null
	isActive: boolean
	/**
	 * Tracks state that depends on workspace folders
	 */
	workspaceFolderState: ManagedIndexerWorkspaceFolderState[]
	private readonly fileUpsertLimit
	constructor(contextProxy: ContextProxy)
	private onConfigurationChange
	fetchConfig(): Promise<ManagedIndexerConfig>
	fetchOrganization(): Promise<KiloOrganization | null>
	isEnabled(): boolean
	/**
	 * Get a complete serializable snapshot of the managed indexer state
	 * for communication to the webview
	 */
	private getManagedIndexerStateSnapshot
	/**
	 * Send the complete managed indexer state to the webview
	 */
	sendStateToWebview(): void
	start(): Promise<void>
	dispose(): void
	/**
	 * Get or fetch the manifest for a workspace state.
	 * If a fetch is already in progress, returns the same promise.
	 * This prevents duplicate fetches and ensures all callers wait for the same result.
	 */
	private getManifest
	onEvent(event: GitWatcherEvent): Promise<void>
	/**
	 * Process files from an event's async iterable
	 */
	private processFiles
	onDidChangeWorkspaceFolders(e: vscode.WorkspaceFoldersChangeEvent): Promise<void>
	/**
	 * Get a serializable representation of the current workspace folder state
	 * for debugging and introspection purposes
	 */
	getWorkspaceFolderStateSnapshot(): {
		workspaceFolderPath: string
		workspaceFolderName: string
		gitBranch: string | null
		projectId: string | null
		isIndexing: boolean
		hasManifest: boolean
		manifestFileCount: number
		hasWatcher: boolean
		error:
			| {
					type: "git" | "config" | "setup" | "scan" | "file-upsert" | "manifest"
					message: string
					timestamp: string
					context:
						| {
								filePath?: string
								branch?: string
								operation?: string
						  }
						| undefined
			  }
			| undefined
	}[]
	search(query: string, directoryPrefix?: string): Promise<VectorStoreSearchResult[]>
	/**
	 * Manually trigger a scan for a specific workspace folder
	 * This is useful for forcing a rescan from the UI
	 *
	 * @param workspaceFolderPath The path of the workspace folder to scan
	 * @throws Error if the workspace folder is not found or not properly initialized
	 */
	startScanForWorkspaceFolder(workspaceFolderPath: string): Promise<void>
}
export {}
//# sourceMappingURL=ManagedIndexer.d.ts.map
