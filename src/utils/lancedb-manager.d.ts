import * as vscode from "vscode"
export interface PlatformInfo {
	platform: string
	arch: string
	packageName: string
	nodeFileName: string
}
export declare class LanceDBManager {
	private readonly dependenciesPath
	private readonly lancedbVersion
	constructor(dependenciesPath: string)
	/**
	 * get current platform information
	 */
	private getCurrentPlatform
	/**
	 * get lancedb dependencies path
	 */
	private getDependenciesPath
	/**
	 * checking LanceDB binaries
	 */
	checkLanceDBBinaries(): Promise<boolean>
	/**
	 * Install LanceDB dependencies using npm only.
	 * This method generates a package.json and runs npm install for @lancedb/lancedb.
	 */
	installLanceDBDependencies(
		progress?: vscode.Progress<{
			message?: string
			increment?: number
		}>,
	): Promise<void>
	/**
	 * ensure LanceDB dependencies are available
	 */
	ensureLanceDBAvailable(): Promise<void>
	/**
	 * get dependencies path for setting NODE_PATH
	 */
	getNodeModulesPath(): string
	/**
	 * clean up downloaded dependencies
	 */
	cleanupDependencies(): Promise<void>
}
//# sourceMappingURL=lancedb-manager.d.ts.map
