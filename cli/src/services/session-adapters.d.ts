import type { ExtensionService } from "./extension.js"
import type { IPathProvider } from "../../../src/shared/kilocode/cli-sessions/types/IPathProvider"
import type { IExtensionMessenger } from "../../../src/shared/kilocode/cli-sessions/types/IExtensionMessenger"
import type { WebviewMessage } from "../../../src/shared/WebviewMessage"
export declare class KiloCodePathProvider implements IPathProvider {
	getTasksDir(): string
	getSessionFilePath(workspaceDir: string): string
}
export declare class ExtensionMessengerAdapter implements IExtensionMessenger {
	private extensionService
	constructor(extensionService: ExtensionService)
	sendWebviewMessage(message: WebviewMessage): Promise<void>
	requestSingleCompletion(prompt: string, timeoutMs: number): Promise<string>
}
//# sourceMappingURL=session-adapters.d.ts.map
