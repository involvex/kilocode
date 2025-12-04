import { beforeEach, describe, expect, it, vi } from "vitest"
import * as vscode from "vscode"
import { ContinueCompletionProvider } from "../src/autocomplete/completionProvider"
import { PrefetchQueue } from "../../nextEdit/NextEditPrefetchQueue"
import { NextEditProvider } from "../../nextEdit/NextEditProvider"
import { JumpManager } from "../src/activation/JumpManager"
import { FakeIDE } from "../../test/FakeIDE"
const mockOutcome = {
	completion: "suggested change",
	diffLines: [],
	editableRegionStartLine: 0,
	editableRegionEndLine: 0,
}
let realNextEditProvider
let realPrefetchQueue
let realJumpManager
beforeEach(() => {
	vi.clearAllMocks()
	// Reset singletons for clean test state
	PrefetchQueue.__resetInstanceForTests()
	JumpManager.clearInstance()
	vscode.window.activeTextEditor = null
})
describe("ContinueCompletionProvider triggering logic", () => {
	it("starts a new chain when none exists", async () => {
		const document = createDocument()
		setActiveEditor(document)
		const provider = buildProvider()
		realNextEditProvider = NextEditProvider.getInstance()
		// Ensure clean state
		if (realNextEditProvider.chainExists()) {
			await realNextEditProvider.deleteChain()
		}
		await provider.provideInlineCompletionItems(document, createPosition(), createContext(), createToken())
		// Verify observable behavior: chain was created
		expect(realNextEditProvider.chainExists()).toBe(true)
	})
	it("clears an empty chain once in full file diff mode", async () => {
		const document = createDocument()
		setActiveEditor(document)
		const provider = buildProvider()
		realNextEditProvider = NextEditProvider.getInstance()
		realPrefetchQueue = PrefetchQueue.getInstance()
		// Set up: chain exists with empty queues
		realNextEditProvider.startChain()
		realPrefetchQueue.clear()
		await provider.provideInlineCompletionItems(document, createPosition(), createContext(), createToken())
		// Verify behavior: chain still exists (was restarted after clearing)
		expect(realNextEditProvider.chainExists()).toBe(true)
	})
	it("returns null after clearing empty chain when no outcome is available", async () => {
		const document = createDocument()
		setActiveEditor(document)
		const provider = buildProvider()
		realNextEditProvider = NextEditProvider.getInstance()
		realPrefetchQueue = PrefetchQueue.getInstance()
		// Set up: chain with empty queues, mock to return no outcome
		realNextEditProvider.startChain()
		realPrefetchQueue.clear()
		vi.spyOn(realNextEditProvider, "provideInlineCompletionItems").mockResolvedValue(undefined)
		const result = await provider.provideInlineCompletionItems(
			document,
			createPosition(),
			createContext(),
			createToken(),
		)
		// Verify behavior: returns null when no outcome available
		expect(result).toBeNull()
	})
	it("uses queued outcomes when processed items exist", async () => {
		const document = createDocument()
		setActiveEditor(document)
		const provider = buildProvider()
		realNextEditProvider = NextEditProvider.getInstance()
		realPrefetchQueue = PrefetchQueue.getInstance()
		realJumpManager = JumpManager.getInstance()
		// Set up: chain with queued outcome
		realNextEditProvider.startChain()
		realPrefetchQueue.enqueueProcessed({
			location: {
				filepath: document.uri.toString(),
				range: {
					start: { line: 0, character: 0 },
					end: { line: 0, character: 0 },
				},
			},
			outcome: mockOutcome,
		})
		// Mock jump behavior
		vi.spyOn(realJumpManager, "suggestJump").mockResolvedValue(true)
		const initialQueueCount = realPrefetchQueue.processedCount
		await provider.provideInlineCompletionItems(document, createPosition(), createContext(), createToken())
		// Verify behavior: queue was consumed
		expect(realPrefetchQueue.processedCount).toBeLessThan(initialQueueCount)
		// Verify completion was set for after jump
		expect(realJumpManager.completionAfterJump).toBeTruthy()
	})
})
function buildProvider(options = {}) {
	const usingFullFileDiff = options.usingFullFileDiff ?? true
	const configHandler = {
		loadConfig: vi.fn(async () => ({
			config: {
				selectedModelByRole: { autocomplete: undefined },
				tabAutocompleteOptions: {
					debounceDelay: 0,
				},
			},
		})),
	}
	const ide = new FakeIDE({
		workspaceDirs: ["/workspace"],
		ideInfo: {
			ideType: "vscode",
		},
	})
	// Override onDidChangeActiveTextEditor to return a disposable
	const originalOnDidChange = ide.onDidChangeActiveTextEditor.bind(ide)
	ide.onDidChangeActiveTextEditor = (callback) => {
		originalOnDidChange(callback)
		return { dispose: vi.fn() }
	}
	const provider = new ContinueCompletionProvider(configHandler, ide, usingFullFileDiff)
	provider.activateNextEdit()
	return provider
}
function createDocument(text = "function example() {\n  return true;\n}") {
	const lines = text.split("\n")
	return {
		uri: vscode.Uri.parse("file:///test"),
		isUntitled: false,
		getText: (range) => {
			if (!range) {
				return text
			}
			const startLine = range.start?.line ?? 0
			const endLine = range.end?.line ?? startLine
			const startChar = range.start?.character ?? 0
			const endChar = range.end?.character ?? lines[endLine]?.length ?? 0
			if (startLine === endLine) {
				const lineText = lines[startLine] ?? ""
				return lineText.slice(startChar, endChar)
			}
			return text
		},
		lineAt: (position) => {
			const lineNumber = typeof position === "number" ? position : position.line
			const lineText = lines[lineNumber] ?? ""
			const range = new vscode.Range(
				new vscode.Position(lineNumber, 0),
				new vscode.Position(lineNumber, lineText.length),
			)
			return {
				lineNumber,
				text: lineText,
				range,
				rangeIncludingLineBreak: range,
				firstNonWhitespaceCharacterIndex: 0,
				isEmptyOrWhitespace: lineText.trim().length === 0,
			}
		},
	}
}
function createContext() {
	return {
		triggerKind: vscode.InlineCompletionTriggerKind.Automatic,
		selectedCompletionInfo: undefined,
	}
}
function createPosition(line = 0, character = 0) {
	return new vscode.Position(line, character)
}
function createToken() {
	return {
		isCancellationRequested: false,
		onCancellationRequested: vi.fn(),
	}
}
function setActiveEditor(document, cursor = createPosition()) {
	const selection = { active: cursor, anchor: cursor }
	vscode.window.activeTextEditor = {
		document,
		selection,
		selections: [selection],
	}
}
vi.mock("vscode", () => {
	class Position {
		line
		character
		constructor(line, character) {
			this.line = line
			this.character = character
		}
	}
	class Range {
		start
		end
		constructor(start, end) {
			this.start = start
			this.end = end
		}
	}
	class InlineCompletionItem {
		insertText
		range
		command
		constructor(insertText, range, command) {
			this.insertText = insertText
			this.range = range
			this.command = command
		}
	}
	const window = {
		activeTextEditor: null,
		showErrorMessage: vi.fn(() => Promise.resolve(undefined)),
		onDidChangeTextEditorSelection: vi.fn(() => ({ dispose: vi.fn() })),
	}
	const workspace = {
		notebookDocuments: [],
		getConfiguration: vi.fn(() => ({ get: vi.fn() })),
		onDidChangeTextDocument: vi.fn(() => ({ dispose: vi.fn() })),
		onDidChangeConfiguration: vi.fn(() => ({ dispose: vi.fn() })),
	}
	const windowWithDecorations = {
		...window,
		createTextEditorDecorationType: vi.fn(() => ({
			dispose: vi.fn(),
		})),
	}
	return {
		window: windowWithDecorations,
		workspace,
		Uri: { parse: (value) => ({ toString: () => value }) },
		Position,
		Range,
		InlineCompletionItem,
		InlineCompletionTriggerKind: { Automatic: 0, Invoke: 1 },
		NotebookCellKind: { Markup: 1 },
		commands: {
			registerCommand: vi.fn(() => ({ dispose: vi.fn() })),
			executeCommand: vi.fn(),
		},
		Selection: class {
			anchor
			active
			constructor(anchor, active) {
				this.anchor = anchor
				this.active = active
			}
		},
		TextEditorRevealType: { InCenter: 1 },
	}
})
vi.mock("../../autocomplete/CompletionProvider", () => {
	return {
		CompletionProvider: class {
			provideInlineCompletionItems = vi.fn()
			markDisplayed = vi.fn()
		},
	}
})
vi.mock("../../autocomplete/util/processSingleLineCompletion", () => ({
	processSingleLineCompletion: vi.fn((text) => ({
		completionText: text,
		range: { start: 0, end: text.length },
	})),
}))
vi.mock("../src/autocomplete/statusBar", () => {
	const StatusBarStatus = {
		Enabled: "enabled",
		Disabled: "disabled",
	}
	return {
		StatusBarStatus,
		getStatusBarStatus: vi.fn(() => StatusBarStatus.Enabled),
		setupStatusBar: vi.fn(),
		stopStatusBarLoading: vi.fn(),
	}
})
vi.mock("../GhostTextAcceptanceTracker", () => {
	const instance = {
		setExpectedGhostTextAcceptance: vi.fn(),
	}
	return {
		GhostTextAcceptanceTracker: {
			getInstance: () => instance,
		},
	}
})
vi.mock("../lsp", () => ({
	getDefinitionsFromLsp: vi.fn(),
}))
vi.mock("../recentlyEdited", () => ({
	RecentlyEditedTracker: class {
		async getRecentlyEditedRanges() {
			return []
		}
	},
}))
vi.mock("../RecentlyVisitedRangesService", () => ({
	RecentlyVisitedRangesService: class {
		getSnippets() {
			return []
		}
	},
}))
vi.mock("../activation/NextEditWindowManager", () => ({
	NextEditWindowManager: {
		isInstantiated: vi.fn(() => false),
		getInstance: vi.fn(),
	},
}))
vi.mock("../../activation/JumpManager", () => {
	let instance = null
	return {
		JumpManager: {
			getInstance: () => instance,
		},
		__setMockJumpManagerInstance(value) {
			instance = value
		},
	}
})
// Using real implementations - no mocks needed
vi.mock("../../nextEdit/diff/diff", () => ({
	checkFim: vi.fn(() => ({ isFim: true, fimText: "ghost" })),
}))
vi.mock("../util/errorHandling", () => ({
	handleLLMError: vi.fn(async () => false),
}))
//# sourceMappingURL=ContinueCompletionProvider.test.js.map
