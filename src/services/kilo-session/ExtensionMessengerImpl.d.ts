import type { IExtensionMessenger } from "../../shared/kilocode/cli-sessions/types/IExtensionMessenger"
import type { WebviewMessage } from "../../shared/kilocode/cli-sessions/types/IExtensionMessenger"
import type { ClineProvider } from "../../core/webview/ClineProvider"
export declare class ExtensionMessengerImpl implements IExtensionMessenger {
	private readonly provider
	constructor(provider: ClineProvider)
	sendWebviewMessage(message: WebviewMessage): Promise<void>
	requestSingleCompletion(prompt: string, timeoutMs: number): Promise<string>
}
//# sourceMappingURL=ExtensionMessengerImpl.d.ts.map
