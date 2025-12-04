import { vi } from "vitest"
interface MockVSCodeAPI {
	context: {
		subscriptions: unknown[]
		secrets: {
			get: ReturnType<typeof vi.fn>
			store: ReturnType<typeof vi.fn>
		}
		globalState: {
			get: ReturnType<typeof vi.fn>
			update: ReturnType<typeof vi.fn>
		}
		workspaceState: {
			get: ReturnType<typeof vi.fn>
			update: ReturnType<typeof vi.fn>
		}
		extensionPath: string
		extensionUri: {
			fsPath: string
		}
	}
	window: {
		registerWebviewViewProvider: ReturnType<typeof vi.fn>
		showInformationMessage: ReturnType<typeof vi.fn>
		showErrorMessage: ReturnType<typeof vi.fn>
		showWarningMessage: ReturnType<typeof vi.fn>
		createOutputChannel: ReturnType<typeof vi.fn>
	}
	workspace: {
		workspaceFolders: Array<{
			uri: {
				fsPath: string
			}
		}>
		onDidChangeConfiguration: ReturnType<typeof vi.fn>
		getConfiguration: ReturnType<typeof vi.fn>
	}
	commands: {
		registerCommand: ReturnType<typeof vi.fn>
	}
	Uri: {
		file: ReturnType<typeof vi.fn>
		joinPath: ReturnType<typeof vi.fn>
	}
	EventEmitter: ReturnType<typeof vi.fn>
}
declare global {
	var __extensionHost:
		| {
				registerWebviewProvider: (
					name: string,
					provider: {
						handleCLIMessage: ReturnType<typeof vi.fn>
					},
				) => void
		  }
		| undefined
	var vscode: MockVSCodeAPI | undefined
}
export {}
//# sourceMappingURL=extension.singleCompletion.test.d.ts.map
