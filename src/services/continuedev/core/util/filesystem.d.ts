import { DocumentSymbol, FileStatsMap, IDE, IdeInfo, Location, Range, RangeInFile, SignatureHelp } from "../index.js"
declare class FileSystemIde implements IDE {
	private readonly workspaceDir
	constructor(workspaceDir: string)
	fileExists(fileUri: string): Promise<boolean>
	gotoDefinition(_location: Location): Promise<RangeInFile[]>
	gotoTypeDefinition(_location: Location): Promise<RangeInFile[]>
	getSignatureHelp(_location: Location): Promise<SignatureHelp | null>
	getReferences(_location: Location): Promise<RangeInFile[]>
	getDocumentSymbols(_fileUri: string): Promise<DocumentSymbol[]>
	onDidChangeActiveTextEditor(_callback: (fileUri: string) => void): void
	getFileStats(fileUris: string[]): Promise<FileStatsMap>
	getIdeInfo(): Promise<IdeInfo>
	readRangeInFile(_fileUri: string, _range: Range): Promise<string>
	getUniqueId(): Promise<string>
	getClipboardContent(): Promise<{
		text: string
		copiedAt: string
	}>
	getWorkspaceDirs(): Promise<string[]>
	writeFile(fileUri: string, contents: string): Promise<void>
	saveFile(_fileUri: string): Promise<void>
	readFile(fileUri: string): Promise<string>
	getCurrentFile(): Promise<undefined>
	getOpenFiles(): Promise<string[]>
}
export { FileSystemIde }
//# sourceMappingURL=filesystem.d.ts.map
