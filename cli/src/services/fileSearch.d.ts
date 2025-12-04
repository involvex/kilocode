/**
 * File Search Service
 * Provides file searching functionality with gitignore support and caching
 */
export interface FileSearchResult {
	/** Relative path from workspace root */
	path: string
	/** Type of the entry */
	type: "file" | "folder"
	/** Base name of the file/folder */
	basename: string
	/** Parent directory path */
	dirname: string
}
/**
 * File Search Service
 * Handles searching workspace files with caching and gitignore support
 */
declare class FileSearchService {
	/** Cache of file listings per workspace */
	private cache
	/** Cache timestamp per workspace */
	private cacheTimestamp
	/** Cache TTL in milliseconds (5 minutes) */
	private readonly CACHE_TTL
	/**
	 * Search files matching query with fuzzy matching
	 * @param query Search query string
	 * @param cwd Current working directory (workspace root)
	 * @param maxResults Maximum number of results to return (default: 50)
	 * @returns Array of matching file search results
	 */
	searchFiles(query: string, cwd: string, maxResults?: number): Promise<FileSearchResult[]>
	/**
	 * Load and parse .gitignore file
	 * @param cwd Current working directory
	 * @returns Ignore instance or null if no .gitignore
	 */
	private loadGitignore
	/**
	 * Get all files in workspace (with caching)
	 * @param cwd Current working directory (workspace root)
	 * @returns Array of all file search results
	 */
	getAllFiles(cwd: string): Promise<FileSearchResult[]>
	/**
	 * Clear cache for specific workspace or all workspaces
	 * @param cwd Optional workspace to clear, if not provided clears all
	 */
	clearCache(cwd?: string): void
	/**
	 * Invalidate cache for a specific workspace
	 * @param cwd Workspace to invalidate
	 */
	invalidateCache(cwd: string): void
}
/** Singleton instance of the file search service */
export declare const fileSearchService: FileSearchService
export {}
//# sourceMappingURL=fileSearch.d.ts.map
