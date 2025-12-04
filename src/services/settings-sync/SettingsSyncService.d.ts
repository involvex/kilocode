import * as vscode from "vscode"
/**
 * Service for managing Kilo Code settings synchronization with VS Code Settings Sync
 */
export declare class SettingsSyncService {
	private static readonly SYNC_KEYS
	/**
	 * Initialize settings synchronization
	 * @param context VS Code extension context
	 */
	static initialize(context: vscode.ExtensionContext, outputChannel?: vscode.OutputChannel): Promise<void>
	/**
	 * Update sync registration when the setting changes
	 * @param context VS Code extension context
	 * @param outputChannel Optional VS Code output channel for logging
	 */
	static updateSyncRegistration(context: vscode.ExtensionContext, outputChannel?: vscode.OutputChannel): Promise<void>
	/**
	 * Get the list of keys that are registered for sync
	 */
	static getSyncKeys(): readonly string[]
}
//# sourceMappingURL=SettingsSyncService.d.ts.map
