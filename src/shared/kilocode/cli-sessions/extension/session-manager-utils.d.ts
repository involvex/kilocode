import type { ClineProvider } from "../../../../core/webview/ClineProvider"
import * as vscode from "vscode"
export declare function kilo_execIfExtension<T extends (...args: any) => any>(cb: T): Promise<ReturnType<T> | void>
interface InitializeSessionManagerInput {
	kiloToken: string | undefined
	log: (message: string) => void
	context: vscode.ExtensionContext
	outputChannel: vscode.OutputChannel
	provider: ClineProvider
}
export declare function kilo_initializeSessionManager({
	kiloToken,
	context,
	log,
	outputChannel,
	provider,
}: InitializeSessionManagerInput): Promise<void>
export declare function kilo_destroySessionManager(): Promise<void>
export {}
//# sourceMappingURL=session-manager-utils.d.ts.map
