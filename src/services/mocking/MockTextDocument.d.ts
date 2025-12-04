import * as vscode from "vscode"
/**
 * A simulated vscode TextDocument for testing.
 */
export declare class MockTextDocument implements vscode.TextDocument {
	private contentLines
	uri: vscode.Uri
	fileName: string
	isUntitled: boolean
	languageId: string
	version: number
	isDirty: boolean
	isClosed: boolean
	eol: vscode.EndOfLine
	get encoding(): "utf8"
	get notebook(): undefined
	constructor(uri: vscode.Uri, content: string)
	updateContent(newContent: string): void
	getText(range?: vscode.Range): string
	get lineCount(): number
	/**
	 * Returns information about a specific line in the document
	 * @param lineNumber The zero-based line number
	 * @returns A simplified TextLine object containing the text and position information
	 */
	lineAt(positionOrLine: number | vscode.Position): vscode.TextLine
	offsetAt(position: vscode.Position): number
	positionAt(offset: number): vscode.Position
	save(): Promise<boolean>
	getWordRangeAtPosition(position: vscode.Position, regex?: RegExp): vscode.Range | undefined
	validateRange(range: vscode.Range): vscode.Range
	validatePosition(position: vscode.Position): vscode.Position
}
//# sourceMappingURL=MockTextDocument.d.ts.map
