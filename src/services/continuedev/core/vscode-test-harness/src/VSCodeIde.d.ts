import * as vscode from "vscode"
import { DocumentSymbol, FileStatsMap, IDE, IdeInfo, Location, Range, RangeInFile, SignatureHelp } from "../.."
export declare class VsCodeIde implements IDE {
	private readonly context
	private static MAX_BYTES
	constructor(context: vscode.ExtensionContext)
	getIdeInfo(): Promise<IdeInfo>
	getClipboardContent(): Promise<{
		text: string
		copiedAt: string
	}>
	getUniqueId(): Promise<string>
	private _workspaceDirectories
	getWorkspaceDirs(): Promise<string[]>
	fileExists(fileUri: string): Promise<boolean>
	writeFile(path: string, contents: string): Promise<void>
	saveFile(fileUri: string): Promise<void>
	readFile(fileUri: string): Promise<string>
	readRangeInFile(fileUri: string, range: Range): Promise<string>
	getOpenFiles(): Promise<string[]>
	getCurrentFile(): Promise<
		| undefined
		| {
				isUntitled: boolean
				path: string
				contents: string
		  }
	>
	getFileStats(files: string[]): Promise<FileStatsMap>
	gotoDefinition(location: Location): Promise<RangeInFile[]>
	gotoTypeDefinition(location: Location): Promise<RangeInFile[]>
	getSignatureHelp(location: Location): Promise<SignatureHelp | null>
	getReferences(location: Location): Promise<RangeInFile[]>
	getDocumentSymbols(textDocumentIdentifier: string): Promise<DocumentSymbol[]>
	onDidChangeActiveTextEditor(callback: (fileUri: string) => void): void
}
//# sourceMappingURL=VSCodeIde.d.ts.map
