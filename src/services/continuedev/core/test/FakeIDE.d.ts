import type {
	DocumentSymbol,
	FileStatsMap,
	IDE,
	IdeInfo,
	Location,
	Range,
	RangeInFile,
	SignatureHelp,
} from "../index.js"
/**
 * Options for customizing FakeIDE behavior.
 * All options are optional and will use sensible defaults if not provided.
 */
interface FakeIDEOptions {
	/** File contents to return for readFile calls. Maps filepath -> content */
	fileContents?: Map<string, string>
	/** Workspace directories to return */
	workspaceDirs?: string[]
	/** IDE info to return */
	ideInfo?: IdeInfo
	/** Open files to return */
	openFiles?: string[]
	/** Current file to return */
	currentFile?: {
		isUntitled: boolean
		path: string
		contents: string
	}
	/** Clipboard content to return */
	clipboardContent?: {
		text: string
		copiedAt: string
	}
	/** Unique ID to return */
	uniqueId?: string
}
export declare class FakeIDE implements IDE {
	private options
	/** Track calls to onDidChangeActiveTextEditor for assertions */
	activeTextEditorCallbacks: Array<(fileUri: string) => void>
	constructor(options?: FakeIDEOptions)
	getIdeInfo(): Promise<IdeInfo>
	getClipboardContent(): Promise<{
		text: string
		copiedAt: string
	}>
	getUniqueId(): Promise<string>
	getWorkspaceDirs(): Promise<string[]>
	fileExists(fileUri: string): Promise<boolean>
	writeFile(_path: string, _contents: string): Promise<void>
	saveFile(_fileUri: string): Promise<void>
	readFile(fileUri: string): Promise<string>
	readRangeInFile(_fileUri: string, _range: Range): Promise<string>
	getOpenFiles(): Promise<string[]>
	getCurrentFile(): Promise<
		| undefined
		| {
				isUntitled: boolean
				path: string
				contents: string
		  }
	>
	getFileStats(_files: string[]): Promise<FileStatsMap>
	gotoDefinition(_location: Location): Promise<RangeInFile[]>
	gotoTypeDefinition(_location: Location): Promise<RangeInFile[]>
	getSignatureHelp(_location: Location): Promise<SignatureHelp | null>
	getReferences(_location: Location): Promise<RangeInFile[]>
	getDocumentSymbols(_textDocumentIdentifier: string): Promise<DocumentSymbol[]>
	onDidChangeActiveTextEditor(callback: (fileUri: string) => void): void
}
export {}
//# sourceMappingURL=FakeIDE.d.ts.map
