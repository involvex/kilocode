import * as vscode from "vscode"
import { ClineProvider } from "../core/webview/ClineProvider"
export declare function setupCommonMocks(): void
export declare function createMockContext(): vscode.ExtensionContext
export declare function createMockWebviewView(): vscode.WebviewView
export declare function createMockOutputChannel(): vscode.OutputChannel
export declare function setupProvider(): {
	provider: ClineProvider
	mockContext: vscode.ExtensionContext
	mockOutputChannel: vscode.OutputChannel
}
//# sourceMappingURL=common-mocks.d.ts.map
