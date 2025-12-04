export interface IdentityInfo {
	machineId: string
	sessionId: string
	cliUserId?: string
}
export type Thenable<T> = Promise<T>
export interface TextDocument {
	uri: Uri
	fileName: string
	languageId: string
	version: number
	isDirty: boolean
	isClosed: boolean
	lineCount: number
	getText(range?: Range): string
	lineAt(line: number): TextLine
	offsetAt(position: Position): number
	positionAt(offset: number): Position
	save(): Thenable<boolean>
	validateRange(range: Range): Range
	validatePosition(position: Position): Position
}
export interface TextLine {
	text: string
	range: Range
	rangeIncludingLineBreak: Range
	firstNonWhitespaceCharacterIndex: number
	isEmptyOrWhitespace: boolean
}
export interface WorkspaceFoldersChangeEvent {
	added: WorkspaceFolder[]
	removed: WorkspaceFolder[]
}
export interface TextDocumentChangeEvent {
	document: TextDocument
	contentChanges: readonly TextDocumentContentChangeEvent[]
}
export interface TextDocumentContentChangeEvent {
	range: Range
	rangeOffset: number
	rangeLength: number
	text: string
}
export interface ConfigurationChangeEvent {
	affectsConfiguration(section: string, scope?: Uri): boolean
}
export interface ConfigurationInspect<T> {
	key: string
	defaultValue?: T
	globalValue?: T
	workspaceValue?: T
	workspaceFolderValue?: T
}
export interface TextDocumentContentProvider {
	provideTextDocumentContent(uri: Uri, token: CancellationToken): Thenable<string>
	onDidChange?: (listener: (e: Uri) => void) => Disposable
}
export interface FileSystemWatcher extends Disposable {
	onDidChange: (listener: (e: Uri) => void) => Disposable
	onDidCreate: (listener: (e: Uri) => void) => Disposable
	onDidDelete: (listener: (e: Uri) => void) => Disposable
}
export interface RelativePattern {
	base: string
	pattern: string
}
export interface TextEditor {
	document: TextDocument
	selection: Selection
	selections: Selection[]
	visibleRanges: Range[]
	options: TextEditorOptions
	viewColumn?: ViewColumn
	edit(callback: (editBuilder: TextEditorEdit) => void): Thenable<boolean>
	insertSnippet(
		snippet: unknown,
		location?: Position | Range | readonly Position[] | readonly Range[],
	): Thenable<boolean>
	setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: readonly Range[]): void
	revealRange(range: Range, revealType?: TextEditorRevealType): void
	show(column?: ViewColumn): void
	hide(): void
}
export interface TextEditorOptions {
	tabSize?: number
	insertSpaces?: boolean
	cursorStyle?: number
	lineNumbers?: number
}
export interface TextEditorEdit {
	replace(location: Position | Range | Selection, value: string): void
	insert(location: Position, value: string): void
	delete(location: Range | Selection): void
	setEndOfLine(endOfLine: EndOfLine): void
}
export interface TextEditorSelectionChangeEvent {
	textEditor: TextEditor
	selections: readonly Selection[]
	kind?: number
}
export interface TextDocumentShowOptions {
	viewColumn?: ViewColumn
	preserveFocus?: boolean
	preview?: boolean
	selection?: Range
}
export interface DecorationRenderOptions {
	backgroundColor?: string | ThemeColor
	border?: string
	borderColor?: string | ThemeColor
	borderRadius?: string
	borderSpacing?: string
	borderStyle?: string
	borderWidth?: string
	color?: string | ThemeColor
	cursor?: string
	fontStyle?: string
	fontWeight?: string
	gutterIconPath?: string | Uri
	gutterIconSize?: string
	isWholeLine?: boolean
	letterSpacing?: string
	opacity?: string
	outline?: string
	outlineColor?: string | ThemeColor
	outlineStyle?: string
	outlineWidth?: string
	overviewRulerColor?: string | ThemeColor
	overviewRulerLane?: OverviewRulerLane
	rangeBehavior?: DecorationRangeBehavior
	textDecoration?: string
}
export interface Terminal {
	name: string
	processId: Thenable<number | undefined>
	creationOptions: Readonly<TerminalOptions>
	exitStatus: TerminalExitStatus | undefined
	state: TerminalState
	sendText(text: string, addNewLine?: boolean): void
	show(preserveFocus?: boolean): void
	hide(): void
	dispose(): void
}
export interface TerminalOptions {
	name?: string
	shellPath?: string
	shellArgs?: string[] | string
	cwd?: string | Uri
	env?: {
		[key: string]: string | null | undefined
	}
	iconPath?: Uri | ThemeIcon
	hideFromUser?: boolean
	message?: string
	strictEnv?: boolean
}
export interface TerminalExitStatus {
	code: number | undefined
	reason: number
}
export interface TerminalState {
	isInteractedWith: boolean
}
export interface TerminalDimensionsChangeEvent {
	terminal: Terminal
	dimensions: TerminalDimensions
}
export interface TerminalDimensions {
	columns: number
	rows: number
}
export interface TerminalDataWriteEvent {
	terminal: Terminal
	data: string
}
export interface WebviewViewProvider {
	resolveWebviewView(
		webviewView: WebviewView,
		context: WebviewViewResolveContext,
		token: CancellationToken,
	): Thenable<void> | void
}
export interface WebviewView {
	webview: Webview
	viewType: string
	title?: string
	description?: string
	badge?: ViewBadge
	show(preserveFocus?: boolean): void
	onDidChangeVisibility: (listener: () => void) => Disposable
	onDidDispose: (listener: () => void) => Disposable
	visible: boolean
}
export interface Webview {
	html: string
	options: WebviewOptions
	cspSource: string
	postMessage(message: unknown): Thenable<boolean>
	onDidReceiveMessage: (listener: (message: unknown) => void) => Disposable
	asWebviewUri(localResource: Uri): Uri
}
export interface WebviewOptions {
	enableScripts?: boolean
	enableForms?: boolean
	localResourceRoots?: readonly Uri[]
	portMapping?: readonly WebviewPortMapping[]
}
export interface WebviewPortMapping {
	webviewPort: number
	extensionHostPort: number
}
export interface ViewBadge {
	tooltip: string
	value: number
}
export interface WebviewViewResolveContext {
	state?: unknown
}
export interface WebviewViewProviderOptions {
	retainContextWhenHidden?: boolean
}
export interface UriHandler {
	handleUri(uri: Uri): void
}
export interface QuickPickOptions {
	placeHolder?: string
	canPickMany?: boolean
	ignoreFocusOut?: boolean
	matchOnDescription?: boolean
	matchOnDetail?: boolean
}
export interface InputBoxOptions {
	value?: string
	valueSelection?: [number, number]
	prompt?: string
	placeHolder?: string
	password?: boolean
	ignoreFocusOut?: boolean
	validateInput?(value: string): string | undefined | null | Thenable<string | undefined | null>
}
export interface OpenDialogOptions {
	defaultUri?: Uri
	openLabel?: string
	canSelectFiles?: boolean
	canSelectFolders?: boolean
	canSelectMany?: boolean
	filters?: {
		[name: string]: string[]
	}
	title?: string
}
export interface Disposable {
	dispose(): void
}
export declare class EventEmitter<T> {
	#private
	/**
	 * The event listeners can subscribe to.
	 */
	event: (listener: (e: T) => void, thisArgs?: unknown, disposables?: Disposable[]) => Disposable
	/**
	 * Notify all subscribers of the event. Failure
	 * of one or more listener will not fail this function call.
	 *
	 * @param data The event object.
	 */
	fire: (data: T) => void
	/**
	 * Dispose this object and free resources.
	 */
	dispose: () => void
}
export declare enum ConfigurationTarget {
	Global = 1,
	Workspace = 2,
	WorkspaceFolder = 3,
}
export declare enum ViewColumn {
	Active = -1,
	Beside = -2,
	One = 1,
	Two = 2,
	Three = 3,
}
export declare enum TextEditorRevealType {
	Default = 0,
	InCenter = 1,
	InCenterIfOutsideViewport = 2,
	AtTop = 3,
}
export declare enum StatusBarAlignment {
	Left = 1,
	Right = 2,
}
export declare enum DiagnosticSeverity {
	Error = 0,
	Warning = 1,
	Information = 2,
	Hint = 3,
}
export declare class Position {
	line: number
	character: number
	constructor(line: number, character: number)
	isEqual(other: Position): boolean
	isBefore(other: Position): boolean
	isBeforeOrEqual(other: Position): boolean
	isAfter(other: Position): boolean
	isAfterOrEqual(other: Position): boolean
	compareTo(other: Position): number
	translate(lineDelta?: number, characterDelta?: number): Position
	translate(change: { lineDelta?: number; characterDelta?: number }): Position
	with(line?: number, character?: number): Position
	with(change: { line?: number; character?: number }): Position
}
export declare class Range {
	start: Position
	end: Position
	constructor(start: Position, end: Position)
	constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number)
	get isEmpty(): boolean
	get isSingleLine(): boolean
	contains(positionOrRange: Position | Range): boolean
	isEqual(other: Range): boolean
	intersection(other: Range): Range | undefined
	union(other: Range): Range
	with(start?: Position, end?: Position): Range
	with(change: { start?: Position; end?: Position }): Range
}
export declare class Selection extends Range {
	anchor: Position
	active: Position
	constructor(anchor: Position, active: Position)
	constructor(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number)
	get isReversed(): boolean
}
export declare class Location {
	uri: Uri
	range: Range | Position
	constructor(uri: Uri, range: Range | Position)
}
export declare enum DiagnosticTag {
	Unnecessary = 1,
	Deprecated = 2,
}
export declare class DiagnosticRelatedInformation {
	location: Location
	message: string
	constructor(location: Location, message: string)
}
export declare class Diagnostic {
	range: Range
	message: string
	severity: DiagnosticSeverity
	source?: string
	code?:
		| string
		| number
		| {
				value: string | number
				target: Uri
		  }
	relatedInformation?: DiagnosticRelatedInformation[]
	tags?: DiagnosticTag[]
	constructor(range: Range, message: string, severity?: DiagnosticSeverity)
}
export interface DiagnosticCollection extends Disposable {
	name: string
	set(uri: Uri, diagnostics: Diagnostic[] | undefined): void
	set(entries: [Uri, Diagnostic[] | undefined][]): void
	delete(uri: Uri): void
	clear(): void
	forEach(
		callback: (uri: Uri, diagnostics: Diagnostic[], collection: DiagnosticCollection) => void,
		thisArg?: unknown,
	): void
	get(uri: Uri): Diagnostic[] | undefined
	has(uri: Uri): boolean
}
export declare class TextEdit {
	range: Range
	newText: string
	constructor(range: Range, newText: string)
	static replace(range: Range, newText: string): TextEdit
	static insert(position: Position, newText: string): TextEdit
	static delete(range: Range): TextEdit
	static setEndOfLine(): TextEdit
}
export declare enum EndOfLine {
	LF = 1,
	CRLF = 2,
}
export declare class WorkspaceEdit {
	private _edits
	set(uri: Uri, edits: TextEdit[]): void
	get(uri: Uri): TextEdit[]
	has(uri: Uri): boolean
	delete(uri: Uri, range: Range): void
	insert(uri: Uri, position: Position, newText: string): void
	replace(uri: Uri, range: Range, newText: string): void
	get size(): number
	entries(): [Uri, TextEdit[]][]
}
export declare enum UIKind {
	Desktop = 1,
	Web = 2,
}
export declare enum ExtensionMode {
	Production = 1,
	Development = 2,
	Test = 3,
}
export declare class CodeActionKind {
	value: string
	static readonly Empty: CodeActionKind
	static readonly QuickFix: CodeActionKind
	static readonly Refactor: CodeActionKind
	static readonly RefactorExtract: CodeActionKind
	static readonly RefactorInline: CodeActionKind
	static readonly RefactorRewrite: CodeActionKind
	static readonly Source: CodeActionKind
	static readonly SourceOrganizeImports: CodeActionKind
	constructor(value: string)
	append(parts: string): CodeActionKind
	intersects(other: CodeActionKind): boolean
	contains(other: CodeActionKind): boolean
}
export declare class ThemeColor {
	id: string
	constructor(id: string)
}
export declare class ThemeIcon {
	id: string
	color?: ThemeColor | undefined
	constructor(id: string, color?: ThemeColor | undefined)
}
export interface CancellationToken {
	isCancellationRequested: boolean
	onCancellationRequested: (listener: (e: unknown) => void) => Disposable
}
export declare class CancellationTokenSource {
	private _token
	private _isCancelled
	private _onCancellationRequestedEmitter
	constructor()
	get token(): CancellationToken
	cancel(): void
	dispose(): void
}
export declare class CodeLens {
	range: Range
	command?:
		| {
				command: string
				title: string
				arguments?: unknown[]
		  }
		| undefined
	isResolved: boolean
	constructor(
		range: Range,
		command?:
			| {
					command: string
					title: string
					arguments?: unknown[]
			  }
			| undefined,
	)
}
export declare class LanguageModelTextPart {
	value: string
	constructor(value: string)
}
export declare class LanguageModelToolCallPart {
	callId: string
	name: string
	input: unknown
	constructor(callId: string, name: string, input: unknown)
}
export declare class LanguageModelToolResultPart {
	callId: string
	content: unknown[]
	constructor(callId: string, content: unknown[])
}
export declare enum DecorationRangeBehavior {
	OpenOpen = 0,
	ClosedClosed = 1,
	OpenClosed = 2,
	ClosedOpen = 3,
}
export declare enum OverviewRulerLane {
	Left = 1,
	Center = 2,
	Right = 4,
	Full = 7,
}
export declare class Uri {
	scheme: string
	authority: string
	path: string
	query: string
	fragment: string
	constructor(scheme: string, authority: string, path: string, query: string, fragment: string)
	static file(path: string): Uri
	static parse(value: string): Uri
	static joinPath(base: Uri, ...pathSegments: string[]): Uri
	with(change: { scheme?: string; authority?: string; path?: string; query?: string; fragment?: string }): Uri
	get fsPath(): string
	toString(): string
}
export declare class OutputChannel implements Disposable {
	private _name
	constructor(name: string)
	get name(): string
	append(value: string): void
	appendLine(value: string): void
	clear(): void
	show(): void
	hide(): void
	dispose(): void
}
export declare class ExtensionContext {
	subscriptions: Disposable[]
	workspaceState: Memento
	globalState: Memento & {
		setKeysForSync(keys: readonly string[]): void
	}
	secrets: SecretStorage
	extensionUri: Uri
	extensionPath: string
	environmentVariableCollection: Record<string, unknown>
	storageUri: Uri | undefined
	storagePath: string | undefined
	globalStorageUri: Uri
	globalStoragePath: string
	logUri: Uri
	logPath: string
	extensionMode: ExtensionMode
	constructor(extensionPath: string, workspacePath: string)
	private ensureDirectoryExists
}
export interface Memento {
	get<T>(key: string): T | undefined
	get<T>(key: string, defaultValue: T): T
	update(key: string, value: unknown): Thenable<void>
	keys(): readonly string[]
}
export interface SecretStorage {
	get(key: string): Thenable<string | undefined>
	store(key: string, value: string): Thenable<void>
	delete(key: string): Thenable<void>
}
export declare enum FileType {
	Unknown = 0,
	File = 1,
	Directory = 2,
	SymbolicLink = 64,
}
export declare class FileSystemError extends Error {
	code: string
	constructor(message: string, code?: string)
	static FileNotFound(messageOrUri?: string | Uri): FileSystemError
	static FileExists(messageOrUri?: string | Uri): FileSystemError
	static FileNotADirectory(messageOrUri?: string | Uri): FileSystemError
	static FileIsADirectory(messageOrUri?: string | Uri): FileSystemError
	static NoPermissions(messageOrUri?: string | Uri): FileSystemError
	static Unavailable(messageOrUri?: string | Uri): FileSystemError
}
export interface FileStat {
	type: FileType
	ctime: number
	mtime: number
	size: number
}
export declare class FileSystemAPI {
	stat(uri: Uri): Promise<FileStat>
	readFile(uri: Uri): Promise<Uint8Array>
	writeFile(uri: Uri, content: Uint8Array): Promise<void>
	delete(uri: Uri): Promise<void>
	createDirectory(uri: Uri): Promise<void>
}
export declare class WorkspaceAPI {
	workspaceFolders: WorkspaceFolder[] | undefined
	name: string | undefined
	workspaceFile: Uri | undefined
	fs: FileSystemAPI
	textDocuments: TextDocument[]
	private _onDidChangeWorkspaceFolders
	private _onDidOpenTextDocument
	private _onDidChangeTextDocument
	private _onDidCloseTextDocument
	private workspacePath
	private context
	constructor(workspacePath: string, context: ExtensionContext)
	asRelativePath(pathOrUri: string | Uri, includeWorkspaceFolder?: boolean): string
	onDidChangeWorkspaceFolders(listener: (event: WorkspaceFoldersChangeEvent) => void): Disposable
	onDidChangeConfiguration(listener: (event: ConfigurationChangeEvent) => void): Disposable
	onDidChangeTextDocument(listener: (event: TextDocumentChangeEvent) => void): Disposable
	onDidOpenTextDocument(listener: (event: TextDocument) => void): Disposable
	onDidCloseTextDocument(listener: (event: TextDocument) => void): Disposable
	getConfiguration(section?: string): WorkspaceConfiguration
	findFiles(_include: string, _exclude?: string): Thenable<Uri[]>
	openTextDocument(uri: Uri): Promise<TextDocument>
	applyEdit(edit: WorkspaceEdit): Promise<boolean>
	createFileSystemWatcher(
		_globPattern: string | RelativePattern,
		_ignoreCreateEvents?: boolean,
		_ignoreChangeEvents?: boolean,
		_ignoreDeleteEvents?: boolean,
	): FileSystemWatcher
	registerTextDocumentContentProvider(_scheme: string, _provider: TextDocumentContentProvider): Disposable
}
export interface WorkspaceFolder {
	uri: Uri
	name: string
	index: number
}
export interface WorkspaceConfiguration {
	get<T>(section: string): T | undefined
	get<T>(section: string, defaultValue: T): T
	has(section: string): boolean
	inspect(section: string): ConfigurationInspect<unknown> | undefined
	update(section: string, value: unknown, configurationTarget?: ConfigurationTarget): Thenable<void>
}
export declare class MockWorkspaceConfiguration implements WorkspaceConfiguration {
	private section
	private globalMemento
	private workspaceMemento
	constructor(section?: string, context?: ExtensionContext)
	private ensureDirectoryExists
	get<T>(section: string, defaultValue?: T): T | undefined
	has(section: string): boolean
	inspect(section: string): ConfigurationInspect<unknown> | undefined
	update(section: string, value: unknown, configurationTarget?: ConfigurationTarget): Promise<void>
	reload(): void
	getAllConfig(): Record<string, unknown>
}
export declare class TextEditorDecorationType implements Disposable {
	key: string
	constructor(key: string)
	dispose(): void
}
export declare class StatusBarItem implements Disposable {
	readonly alignment: StatusBarAlignment
	readonly priority?: number | undefined
	private _text
	private _tooltip
	private _command
	private _color
	private _backgroundColor
	private _isVisible
	constructor(alignment: StatusBarAlignment, priority?: number | undefined)
	get text(): string
	set text(value: string)
	get tooltip(): string | undefined
	set tooltip(value: string | undefined)
	get command(): string | undefined
	set command(value: string | undefined)
	get color(): string | undefined
	set color(value: string | undefined)
	get backgroundColor(): string | undefined
	set backgroundColor(value: string | undefined)
	show(): void
	hide(): void
	dispose(): void
}
export interface Tab {
	input: TabInputText | unknown
	label: string
	isActive: boolean
	isDirty: boolean
}
export interface TabInputText {
	uri: Uri
}
export interface TabGroup {
	tabs: Tab[]
}
export declare class TabGroupsAPI {
	private _onDidChangeTabs
	private _tabGroups
	get all(): TabGroup[]
	onDidChangeTabs(listener: () => void): Disposable
	close(tab: Tab): Promise<boolean>
	_simulateTabChange(): void
	dispose(): void
}
export declare class WindowAPI {
	tabGroups: TabGroupsAPI
	visibleTextEditors: TextEditor[]
	_onDidChangeVisibleTextEditors: EventEmitter<TextEditor[]>
	private _workspace?
	constructor()
	setWorkspace(workspace: WorkspaceAPI): void
	createOutputChannel(name: string): OutputChannel
	createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem
	createStatusBarItem(id?: string, alignment?: StatusBarAlignment, priority?: number): StatusBarItem
	createTextEditorDecorationType(_options: DecorationRenderOptions): TextEditorDecorationType
	createTerminal(options?: {
		name?: string
		shellPath?: string
		shellArgs?: string[]
		cwd?: string
		env?: {
			[key: string]: string | null | undefined
		}
		iconPath?: ThemeIcon
		hideFromUser?: boolean
		message?: string
		strictEnv?: boolean
	}): Terminal
	showInformationMessage(message: string, ..._items: string[]): Thenable<string | undefined>
	showWarningMessage(message: string, ..._items: string[]): Thenable<string | undefined>
	showErrorMessage(message: string, ..._items: string[]): Thenable<string | undefined>
	showQuickPick(items: string[], _options?: QuickPickOptions): Thenable<string | undefined>
	showInputBox(_options?: InputBoxOptions): Thenable<string | undefined>
	showOpenDialog(_options?: OpenDialogOptions): Thenable<Uri[] | undefined>
	showTextDocument(
		documentOrUri: TextDocument | Uri,
		columnOrOptions?: ViewColumn | TextDocumentShowOptions,
		_preserveFocus?: boolean,
	): Promise<TextEditor>
	registerWebviewViewProvider(
		viewId: string,
		provider: WebviewViewProvider,
		_options?: WebviewViewProviderOptions,
	): Disposable
	registerUriHandler(_handler: UriHandler): Disposable
	onDidChangeTextEditorSelection(listener: (event: TextEditorSelectionChangeEvent) => void): Disposable
	onDidChangeActiveTextEditor(listener: (event: TextEditor | undefined) => void): Disposable
	onDidChangeVisibleTextEditors(listener: (editors: TextEditor[]) => void): Disposable
	onDidCloseTerminal(_listener: (terminal: Terminal) => void): Disposable
	onDidOpenTerminal(_listener: (terminal: Terminal) => void): Disposable
	onDidChangeActiveTerminal(_listener: (terminal: Terminal | undefined) => void): Disposable
	onDidChangeTerminalDimensions(_listener: (event: TerminalDimensionsChangeEvent) => void): Disposable
	onDidWriteTerminalData(_listener: (event: TerminalDataWriteEvent) => void): Disposable
	get activeTerminal(): Terminal | undefined
	get terminals(): Terminal[]
}
export interface WorkspaceFolder {
	uri: Uri
	name: string
	index: number
}
export interface WorkspaceConfiguration {
	get<T>(section: string): T | undefined
	get<T>(section: string, defaultValue: T): T
	has(section: string): boolean
	inspect(_section: string): ConfigurationInspect<unknown> | undefined
	update(section: string, value: unknown, configurationTarget?: ConfigurationTarget): Thenable<void>
}
export declare class CommandsAPI {
	private commands
	registerCommand(command: string, callback: (...args: unknown[]) => unknown): Disposable
	executeCommand<T = unknown>(command: string, ...rest: unknown[]): Thenable<T>
	private handleDiffCommand
}
export declare function createVSCodeAPIMock(
	extensionRootPath: string,
	workspacePath: string,
	identity?: IdentityInfo,
): {
	version: string
	Uri: typeof Uri
	EventEmitter: typeof EventEmitter
	ConfigurationTarget: typeof ConfigurationTarget
	ViewColumn: typeof ViewColumn
	TextEditorRevealType: typeof TextEditorRevealType
	StatusBarAlignment: typeof StatusBarAlignment
	DiagnosticSeverity: typeof DiagnosticSeverity
	DiagnosticTag: typeof DiagnosticTag
	Position: typeof Position
	Range: typeof Range
	Selection: typeof Selection
	Location: typeof Location
	Diagnostic: typeof Diagnostic
	DiagnosticRelatedInformation: typeof DiagnosticRelatedInformation
	TextEdit: typeof TextEdit
	WorkspaceEdit: typeof WorkspaceEdit
	EndOfLine: typeof EndOfLine
	UIKind: typeof UIKind
	ExtensionMode: typeof ExtensionMode
	CodeActionKind: typeof CodeActionKind
	ThemeColor: typeof ThemeColor
	ThemeIcon: typeof ThemeIcon
	DecorationRangeBehavior: typeof DecorationRangeBehavior
	OverviewRulerLane: typeof OverviewRulerLane
	StatusBarItem: typeof StatusBarItem
	CancellationToken: {
		new (): {
			isCancellationRequested: boolean
			onCancellationRequested: (_listener: (e: unknown) => void) => {
				dispose: () => void
			}
		}
	}
	CancellationTokenSource: typeof CancellationTokenSource
	CodeLens: typeof CodeLens
	LanguageModelTextPart: typeof LanguageModelTextPart
	LanguageModelToolCallPart: typeof LanguageModelToolCallPart
	LanguageModelToolResultPart: typeof LanguageModelToolResultPart
	ExtensionContext: typeof ExtensionContext
	FileType: typeof FileType
	FileSystemError: typeof FileSystemError
	Disposable: {
		new (): {
			dispose(): void
		}
		from(...disposables: Disposable[]): Disposable
	}
	TabInputText: {
		new (uri: Uri): {
			uri: Uri
		}
	}
	TabInputTextDiff: {
		new (
			original: Uri,
			modified: Uri,
		): {
			original: Uri
			modified: Uri
		}
	}
	workspace: WorkspaceAPI
	window: WindowAPI
	commands: CommandsAPI
	env: {
		appName: string
		appRoot: string
		language: string
		machineId: string
		sessionId: string
		remoteName: undefined
		shell: string
		uriScheme: string
		uiKind: number
		openExternal: (uri: Uri) => Promise<boolean>
		clipboard: {
			readText: () => Promise<string>
			writeText: (text: string) => Promise<void>
		}
	}
	context: ExtensionContext
	languages: {
		registerCodeActionsProvider: () => {
			dispose: () => void
		}
		registerCodeLensProvider: () => {
			dispose: () => void
		}
		registerCompletionItemProvider: () => {
			dispose: () => void
		}
		registerHoverProvider: () => {
			dispose: () => void
		}
		registerDefinitionProvider: () => {
			dispose: () => void
		}
		registerReferenceProvider: () => {
			dispose: () => void
		}
		registerDocumentSymbolProvider: () => {
			dispose: () => void
		}
		registerWorkspaceSymbolProvider: () => {
			dispose: () => void
		}
		registerRenameProvider: () => {
			dispose: () => void
		}
		registerDocumentFormattingEditProvider: () => {
			dispose: () => void
		}
		registerDocumentRangeFormattingEditProvider: () => {
			dispose: () => void
		}
		registerSignatureHelpProvider: () => {
			dispose: () => void
		}
		getDiagnostics: (uri?: Uri) => [Uri, Diagnostic[]][] | Diagnostic[]
		createDiagnosticCollection: (name?: string) => DiagnosticCollection
	}
	debug: {
		onDidStartDebugSession: () => {
			dispose: () => void
		}
		onDidTerminateDebugSession: () => {
			dispose: () => void
		}
	}
	tasks: {
		onDidStartTask: () => {
			dispose: () => void
		}
		onDidEndTask: () => {
			dispose: () => void
		}
	}
	extensions: {
		all: never[]
		getExtension: (extensionId: string) =>
			| {
					id: string
					extensionUri: Uri
					extensionPath: string
					isActive: boolean
					packageJSON: {}
					exports: undefined
					activate: () => Promise<void>
			  }
			| undefined
		onDidChange: () => {
			dispose: () => void
		}
	}
	FileSystemWatcher: {
		new (): {
			onDidChange: () => {
				dispose: () => void
			}
			onDidCreate: () => {
				dispose: () => void
			}
			onDidDelete: () => {
				dispose: () => void
			}
			dispose: () => void
		}
	}
	RelativePattern: {
		new (
			base: string,
			pattern: string,
		): {
			base: string
			pattern: string
		}
	}
	ProgressLocation: {
		SourceControl: number
		Window: number
		Notification: number
	}
	UriHandler: {
		new (): {
			handleUri: (_uri: Uri) => void
		}
	}
}
//# sourceMappingURL=VSCode.d.ts.map
