export type Thenable<T> = Promise<T>
export declare class Position {
	readonly line: number
	readonly character: number
	constructor(line: number, character: number)
	isEqual(other: Position): boolean
	isBefore(other: Position): boolean
	isAfter(other: Position): boolean
	isBeforeOrEqual(other: Position): boolean
	isAfterOrEqual(other: Position): boolean
}
export declare class Range {
	readonly start: Position
	readonly end: Position
	constructor(start: Position, end: Position)
	constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number)
	get isEmpty(): boolean
	get isSingleLine(): boolean
	contains(positionOrRange: Position | Range): boolean
	isEqual(other: Range): boolean
}
export declare class Uri {
	readonly scheme: string
	readonly authority: string
	readonly path: string
	readonly query: string
	readonly fragment: string
	constructor(scheme: string, authority: string, path: string, query: string, fragment: string)
	static parse(value: string): Uri
	static file(path: string): Uri
	toString(): string
	get fsPath(): string
}
export declare class Selection extends Range {
	readonly anchor: Position
	readonly active: Position
	constructor(anchor: Position, active: Position)
	constructor(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number)
	get isReversed(): boolean
}
export declare enum EndOfLine {
	LF = 1,
	CRLF = 2,
}
export declare enum DiagnosticSeverity {
	Error = 0,
	Warning = 1,
	Information = 2,
	Hint = 3,
}
export interface Diagnostic {
	range: Range
	message: string
	severity: DiagnosticSeverity
	source?: string
	code?: string | number
}
export interface TextLine {
	readonly lineNumber: number
	readonly text: string
	readonly range: Range
	readonly rangeIncludingLineBreak: Range
	readonly firstNonWhitespaceCharacterIndex: number
	readonly isEmptyOrWhitespace: boolean
}
export interface TextDocument {
	readonly uri: Uri
	readonly fileName: string
	readonly isUntitled: boolean
	readonly languageId: string
	readonly version: number
	readonly isDirty: boolean
	readonly isClosed: boolean
	readonly eol: EndOfLine
	readonly lineCount: number
	readonly encoding?: string
	readonly notebook?: any
	save(): Thenable<boolean>
	lineAt(line: number): TextLine
	lineAt(position: Position): TextLine
	offsetAt(position: Position): number
	positionAt(offset: number): Position
	getText(range?: Range): string
	getWordRangeAtPosition(position: Position, regex?: RegExp): Range | undefined
	validateRange(range: Range): Range
	validatePosition(position: Position): Position
}
export interface TextEditor {
	readonly document: TextDocument
	readonly selection: Selection
	readonly selections: readonly Selection[]
	readonly visibleRanges: readonly Range[]
	readonly options: any
	readonly viewColumn?: any
	edit(callback: (editBuilder: any) => void): Thenable<boolean>
}
export declare const workspace: {
	asRelativePath(pathOrUri: string | Uri, includeWorkspaceFolder?: boolean): string
}
//# sourceMappingURL=mock-vscode.d.ts.map
