/* eslint-disable @typescript-eslint/no-explicit-any */
export const window = {
	showInformationMessage: vi.fn(),
	showErrorMessage: vi.fn(),
}
export const env = {
	openExternal: vi.fn(),
}
export const Uri = {
	parse: vi.fn((uri) => ({ toString: () => uri })),
}
export const commands = {
	executeCommand: vi.fn().mockResolvedValue(undefined),
}
// Mock implementation for tests
export const mockExtensionContext = {
	secrets: {
		get: vi.fn().mockResolvedValue(undefined),
		store: vi.fn().mockResolvedValue(undefined),
		delete: vi.fn().mockResolvedValue(undefined),
		onDidChange: vi.fn().mockReturnValue({ dispose: vi.fn() }),
	},
	globalState: {
		get: vi.fn().mockReturnValue(undefined),
		update: vi.fn().mockResolvedValue(undefined),
	},
	subscriptions: [],
	extension: {
		packageJSON: {
			version: "1.0.0",
			publisher: "RooVeterinaryInc",
			name: "roo-cline",
		},
	},
}
