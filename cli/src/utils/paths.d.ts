/**
 * Centralized path management for Kilo Code CLI
 * All configuration and logs are stored in ~/.kilocode/
 */
export declare class KiloCodePaths {
	private static readonly BASE_DIR_NAME
	private static readonly CLI_SUBDIR
	private static readonly WORKSPACE_MAP_FILE
	/**
	 * Get user home directory
	 */
	static getHomeDir(): string
	/**
	 * Get base .kilocode/cli directory in user home
	 */
	static getKiloCodeDir(): string
	/**
	 * Get unified logs directory (shared across all workspaces)
	 */
	static getLogsDir(): string
	/**
	 * Get global storage directory (shared across all workspaces)
	 */
	static getGlobalStorageDir(): string
	/**
	 * Get tasks base directory
	 */
	static getTasksDir(): string
	/**
	 * Get the path to the last session file for a workspace
	 */
	static getSessionFilePath(workspacePath: string): string
	/**
	 * Get workspaces base directory
	 */
	static getWorkspacesDir(): string
	/**
	 * Generate a deterministic 8-character hash for a workspace path
	 */
	static getWorkspaceHash(workspacePath: string): string
	/**
	 * Sanitize workspace name for filesystem use
	 * - Convert to lowercase
	 * - Replace spaces and special chars with hyphens
	 * - Remove consecutive hyphens
	 * - Limit to 32 characters
	 */
	static sanitizeWorkspaceName(workspacePath: string): string
	/**
	 * Get workspace folder name in format: {sanitized-name}-{hash}
	 */
	static getWorkspaceFolderName(workspacePath: string): string
	/**
	 * Get workspace storage directory for a specific workspace
	 */
	static getWorkspaceStorageDir(workspacePath: string): string
	/**
	 * Ensure a directory exists, creating it if necessary
	 */
	static ensureDirectoryExists(dirPath: string): void
	/**
	 * Get the workspace map file path
	 */
	private static getWorkspaceMapPath
	/**
	 * Load workspace map (maps absolute paths to folder names)
	 */
	static getWorkspaceMap(): Record<string, string>
	/**
	 * Update workspace map with a new workspace entry
	 */
	static updateWorkspaceMap(workspacePath: string, folderName: string): void
	/**
	 * Initialize all required directories for a workspace
	 */
	static initializeWorkspace(workspacePath: string): void
}
//# sourceMappingURL=paths.d.ts.map
