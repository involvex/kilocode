export declare const window: {
	showInformationMessage: any
	showErrorMessage: any
}
export declare const env: {
	openExternal: any
}
export declare const Uri: {
	parse: any
}
export declare const commands: {
	executeCommand: any
}
export interface ExtensionContext {
	secrets: {
		get: (key: string) => Promise<string | undefined>
		store: (key: string, value: string) => Promise<void>
		delete: (key: string) => Promise<void>
		onDidChange: (listener: (e: { key: string }) => void) => {
			dispose: () => void
		}
	}
	globalState: {
		get: <T>(key: string) => T | undefined
		update: (key: string, value: any) => Promise<void>
	}
	subscriptions: any[]
	extension?: {
		packageJSON?: {
			version?: string
			publisher?: string
			name?: string
		}
	}
}
export declare const mockExtensionContext: ExtensionContext
//# sourceMappingURL=vscode.d.ts.map
