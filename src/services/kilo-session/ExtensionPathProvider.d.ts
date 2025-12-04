import * as vscode from "vscode"
import type { IPathProvider } from "../../shared/kilocode/cli-sessions/types/IPathProvider"
export declare class ExtensionPathProvider implements IPathProvider {
	private readonly globalStoragePath
	constructor(context: vscode.ExtensionContext)
	private ensureDirectories
	getTasksDir(): string
	getSessionFilePath(workspaceDir: string): string
}
//# sourceMappingURL=ExtensionPathProvider.d.ts.map
