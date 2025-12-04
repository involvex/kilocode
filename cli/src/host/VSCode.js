import * as fs from "fs"
import * as path from "path"
import { logs } from "../services/logs.js"
import { KiloCodePaths } from "../utils/paths.js"
import { Package } from "../constants/package.js"
export class EventEmitter {
	#listeners = new Set()
	/**
	 * The event listeners can subscribe to.
	 */
	event = (listener, thisArgs, disposables) => {
		const fn = thisArgs ? listener.bind(thisArgs) : listener
		this.#listeners.add(fn)
		const disposable = {
			dispose: () => {
				this.#listeners.delete(fn)
			},
		}
		if (disposables) {
			disposables.push(disposable)
		}
		return disposable
	}
	/**
	 * Notify all subscribers of the event. Failure
	 * of one or more listener will not fail this function call.
	 *
	 * @param data The event object.
	 */
	fire = (data) => {
		for (const listener of this.#listeners) {
			try {
				listener(data)
			} catch {
				// ignore
			}
		}
	}
	/**
	 * Dispose this object and free resources.
	 */
	dispose = () => {
		this.#listeners.clear()
	}
}
export var ConfigurationTarget
;(function (ConfigurationTarget) {
	ConfigurationTarget[(ConfigurationTarget["Global"] = 1)] = "Global"
	ConfigurationTarget[(ConfigurationTarget["Workspace"] = 2)] = "Workspace"
	ConfigurationTarget[(ConfigurationTarget["WorkspaceFolder"] = 3)] = "WorkspaceFolder"
})(ConfigurationTarget || (ConfigurationTarget = {}))
export var ViewColumn
;(function (ViewColumn) {
	ViewColumn[(ViewColumn["Active"] = -1)] = "Active"
	ViewColumn[(ViewColumn["Beside"] = -2)] = "Beside"
	ViewColumn[(ViewColumn["One"] = 1)] = "One"
	ViewColumn[(ViewColumn["Two"] = 2)] = "Two"
	ViewColumn[(ViewColumn["Three"] = 3)] = "Three"
})(ViewColumn || (ViewColumn = {}))
export var TextEditorRevealType
;(function (TextEditorRevealType) {
	TextEditorRevealType[(TextEditorRevealType["Default"] = 0)] = "Default"
	TextEditorRevealType[(TextEditorRevealType["InCenter"] = 1)] = "InCenter"
	TextEditorRevealType[(TextEditorRevealType["InCenterIfOutsideViewport"] = 2)] = "InCenterIfOutsideViewport"
	TextEditorRevealType[(TextEditorRevealType["AtTop"] = 3)] = "AtTop"
})(TextEditorRevealType || (TextEditorRevealType = {}))
export var StatusBarAlignment
;(function (StatusBarAlignment) {
	StatusBarAlignment[(StatusBarAlignment["Left"] = 1)] = "Left"
	StatusBarAlignment[(StatusBarAlignment["Right"] = 2)] = "Right"
})(StatusBarAlignment || (StatusBarAlignment = {}))
export var DiagnosticSeverity
;(function (DiagnosticSeverity) {
	DiagnosticSeverity[(DiagnosticSeverity["Error"] = 0)] = "Error"
	DiagnosticSeverity[(DiagnosticSeverity["Warning"] = 1)] = "Warning"
	DiagnosticSeverity[(DiagnosticSeverity["Information"] = 2)] = "Information"
	DiagnosticSeverity[(DiagnosticSeverity["Hint"] = 3)] = "Hint"
})(DiagnosticSeverity || (DiagnosticSeverity = {}))
// Position class
export class Position {
	line
	character
	constructor(line, character) {
		this.line = line
		this.character = character
	}
	isEqual(other) {
		return this.line === other.line && this.character === other.character
	}
	isBefore(other) {
		if (this.line < other.line) {
			return true
		}
		if (this.line === other.line) {
			return this.character < other.character
		}
		return false
	}
	isBeforeOrEqual(other) {
		return this.isBefore(other) || this.isEqual(other)
	}
	isAfter(other) {
		return !this.isBeforeOrEqual(other)
	}
	isAfterOrEqual(other) {
		return !this.isBefore(other)
	}
	compareTo(other) {
		if (this.line < other.line) {
			return -1
		}
		if (this.line > other.line) {
			return 1
		}
		if (this.character < other.character) {
			return -1
		}
		if (this.character > other.character) {
			return 1
		}
		return 0
	}
	translate(lineDeltaOrChange, characterDelta) {
		if (typeof lineDeltaOrChange === "object") {
			return new Position(
				this.line + (lineDeltaOrChange.lineDelta || 0),
				this.character + (lineDeltaOrChange.characterDelta || 0),
			)
		}
		return new Position(this.line + (lineDeltaOrChange || 0), this.character + (characterDelta || 0))
	}
	with(lineOrChange, character) {
		if (typeof lineOrChange === "object") {
			return new Position(
				lineOrChange.line !== undefined ? lineOrChange.line : this.line,
				lineOrChange.character !== undefined ? lineOrChange.character : this.character,
			)
		}
		return new Position(
			lineOrChange !== undefined ? lineOrChange : this.line,
			character !== undefined ? character : this.character,
		)
	}
}
// Range class
export class Range {
	start
	end
	constructor(startOrStartLine, endOrStartCharacter, endLine, endCharacter) {
		if (typeof startOrStartLine === "number") {
			this.start = new Position(startOrStartLine, endOrStartCharacter)
			this.end = new Position(endLine, endCharacter)
		} else {
			this.start = startOrStartLine
			this.end = endOrStartCharacter
		}
	}
	get isEmpty() {
		return this.start.isEqual(this.end)
	}
	get isSingleLine() {
		return this.start.line === this.end.line
	}
	contains(positionOrRange) {
		if (positionOrRange instanceof Range) {
			return this.contains(positionOrRange.start) && this.contains(positionOrRange.end)
		}
		return positionOrRange.isAfterOrEqual(this.start) && positionOrRange.isBeforeOrEqual(this.end)
	}
	isEqual(other) {
		return this.start.isEqual(other.start) && this.end.isEqual(other.end)
	}
	intersection(other) {
		const start = this.start.isAfter(other.start) ? this.start : other.start
		const end = this.end.isBefore(other.end) ? this.end : other.end
		if (start.isAfter(end)) {
			return undefined
		}
		return new Range(start, end)
	}
	union(other) {
		const start = this.start.isBefore(other.start) ? this.start : other.start
		const end = this.end.isAfter(other.end) ? this.end : other.end
		return new Range(start, end)
	}
	with(startOrChange, end) {
		if (startOrChange instanceof Position) {
			return new Range(startOrChange, end || this.end)
		}
		if (typeof startOrChange === "object") {
			return new Range(startOrChange.start || this.start, startOrChange.end || this.end)
		}
		return new Range(this.start, this.end)
	}
}
// Selection class (extends Range)
export class Selection extends Range {
	anchor
	active
	constructor(anchorOrAnchorLine, activeOrAnchorCharacter, activeLine, activeCharacter) {
		let anchor
		let active
		if (typeof anchorOrAnchorLine === "number") {
			anchor = new Position(anchorOrAnchorLine, activeOrAnchorCharacter)
			active = new Position(activeLine, activeCharacter)
		} else {
			anchor = anchorOrAnchorLine
			active = activeOrAnchorCharacter
		}
		super(anchor, active)
		this.anchor = anchor
		this.active = active
	}
	get isReversed() {
		return this.anchor.isAfter(this.active)
	}
}
// Location class
export class Location {
	uri
	range
	constructor(uri, range) {
		this.uri = uri
		this.range = range
	}
}
// Diagnostic-related classes
export var DiagnosticTag
;(function (DiagnosticTag) {
	DiagnosticTag[(DiagnosticTag["Unnecessary"] = 1)] = "Unnecessary"
	DiagnosticTag[(DiagnosticTag["Deprecated"] = 2)] = "Deprecated"
})(DiagnosticTag || (DiagnosticTag = {}))
export class DiagnosticRelatedInformation {
	location
	message
	constructor(location, message) {
		this.location = location
		this.message = message
	}
}
export class Diagnostic {
	range
	message
	severity
	source
	code
	relatedInformation
	tags
	constructor(range, message, severity) {
		this.range = range
		this.message = message
		this.severity = severity !== undefined ? severity : DiagnosticSeverity.Error
	}
}
// TextEdit class
export class TextEdit {
	range
	newText
	constructor(range, newText) {
		this.range = range
		this.newText = newText
	}
	static replace(range, newText) {
		return new TextEdit(range, newText)
	}
	static insert(position, newText) {
		return new TextEdit(new Range(position, position), newText)
	}
	static delete(range) {
		return new TextEdit(range, "")
	}
	static setEndOfLine() {
		// Simplified implementation
		return new TextEdit(new Range(new Position(0, 0), new Position(0, 0)), "")
	}
}
// EndOfLine enum
export var EndOfLine
;(function (EndOfLine) {
	EndOfLine[(EndOfLine["LF"] = 1)] = "LF"
	EndOfLine[(EndOfLine["CRLF"] = 2)] = "CRLF"
})(EndOfLine || (EndOfLine = {}))
// WorkspaceEdit class
export class WorkspaceEdit {
	_edits = new Map()
	set(uri, edits) {
		this._edits.set(uri.toString(), edits)
	}
	get(uri) {
		return this._edits.get(uri.toString()) || []
	}
	has(uri) {
		return this._edits.has(uri.toString())
	}
	delete(uri, range) {
		const key = uri.toString()
		if (!this._edits.has(key)) {
			this._edits.set(key, [])
		}
		this._edits.get(key).push(TextEdit.delete(range))
	}
	insert(uri, position, newText) {
		const key = uri.toString()
		if (!this._edits.has(key)) {
			this._edits.set(key, [])
		}
		this._edits.get(key).push(TextEdit.insert(position, newText))
	}
	replace(uri, range, newText) {
		const key = uri.toString()
		if (!this._edits.has(key)) {
			this._edits.set(key, [])
		}
		this._edits.get(key).push(TextEdit.replace(range, newText))
	}
	get size() {
		return this._edits.size
	}
	entries() {
		return Array.from(this._edits.entries()).map(([uriString, edits]) => [Uri.parse(uriString), edits])
	}
}
// UI Kind enum
export var UIKind
;(function (UIKind) {
	UIKind[(UIKind["Desktop"] = 1)] = "Desktop"
	UIKind[(UIKind["Web"] = 2)] = "Web"
})(UIKind || (UIKind = {}))
// Extension Mode enum
export var ExtensionMode
;(function (ExtensionMode) {
	ExtensionMode[(ExtensionMode["Production"] = 1)] = "Production"
	ExtensionMode[(ExtensionMode["Development"] = 2)] = "Development"
	ExtensionMode[(ExtensionMode["Test"] = 3)] = "Test"
})(ExtensionMode || (ExtensionMode = {}))
// Code Action Kind mock
export class CodeActionKind {
	value
	static Empty = new CodeActionKind("")
	static QuickFix = new CodeActionKind("quickfix")
	static Refactor = new CodeActionKind("refactor")
	static RefactorExtract = new CodeActionKind("refactor.extract")
	static RefactorInline = new CodeActionKind("refactor.inline")
	static RefactorRewrite = new CodeActionKind("refactor.rewrite")
	static Source = new CodeActionKind("source")
	static SourceOrganizeImports = new CodeActionKind("source.organizeImports")
	constructor(value) {
		this.value = value
	}
	append(parts) {
		return new CodeActionKind(this.value ? `${this.value}.${parts}` : parts)
	}
	intersects(other) {
		return this.contains(other) || other.contains(this)
	}
	contains(other) {
		return this.value === other.value || other.value.startsWith(this.value + ".")
	}
}
// Theme Color mock
export class ThemeColor {
	id
	constructor(id) {
		this.id = id
	}
}
// Theme Icon mock
export class ThemeIcon {
	id
	color
	constructor(id, color) {
		this.id = id
		this.color = color
	}
}
export class CancellationTokenSource {
	_token
	_isCancelled = false
	_onCancellationRequestedEmitter = new EventEmitter()
	constructor() {
		this._token = {
			isCancellationRequested: false,
			onCancellationRequested: this._onCancellationRequestedEmitter.event,
		}
	}
	get token() {
		return this._token
	}
	cancel() {
		if (!this._isCancelled) {
			this._isCancelled = true
			this._token.isCancellationRequested = true
			this._onCancellationRequestedEmitter.fire(undefined)
		}
	}
	dispose() {
		this.cancel()
		this._onCancellationRequestedEmitter.dispose()
	}
}
// CodeLens mock
export class CodeLens {
	range
	command
	isResolved = false
	constructor(range, command) {
		this.range = range
		this.command = command
	}
}
// Language Model API mocks (for VSCode LM API)
export class LanguageModelTextPart {
	value
	constructor(value) {
		this.value = value
	}
}
export class LanguageModelToolCallPart {
	callId
	name
	input
	constructor(callId, name, input) {
		this.callId = callId
		this.name = name
		this.input = input
	}
}
export class LanguageModelToolResultPart {
	callId
	content
	constructor(callId, content) {
		this.callId = callId
		this.content = content
	}
}
// Decoration Range Behavior mock
export var DecorationRangeBehavior
;(function (DecorationRangeBehavior) {
	DecorationRangeBehavior[(DecorationRangeBehavior["OpenOpen"] = 0)] = "OpenOpen"
	DecorationRangeBehavior[(DecorationRangeBehavior["ClosedClosed"] = 1)] = "ClosedClosed"
	DecorationRangeBehavior[(DecorationRangeBehavior["OpenClosed"] = 2)] = "OpenClosed"
	DecorationRangeBehavior[(DecorationRangeBehavior["ClosedOpen"] = 3)] = "ClosedOpen"
})(DecorationRangeBehavior || (DecorationRangeBehavior = {}))
// Overview Ruler Lane mock
export var OverviewRulerLane
;(function (OverviewRulerLane) {
	OverviewRulerLane[(OverviewRulerLane["Left"] = 1)] = "Left"
	OverviewRulerLane[(OverviewRulerLane["Center"] = 2)] = "Center"
	OverviewRulerLane[(OverviewRulerLane["Right"] = 4)] = "Right"
	OverviewRulerLane[(OverviewRulerLane["Full"] = 7)] = "Full"
})(OverviewRulerLane || (OverviewRulerLane = {}))
// URI class mock
export class Uri {
	scheme
	authority
	path
	query
	fragment
	constructor(scheme, authority, path, query, fragment) {
		this.scheme = scheme
		this.authority = authority
		this.path = path
		this.query = query
		this.fragment = fragment
	}
	static file(path) {
		return new Uri("file", "", path, "", "")
	}
	static parse(value) {
		const url = new URL(value)
		return new Uri(url.protocol.slice(0, -1), url.hostname, url.pathname, url.search.slice(1), url.hash.slice(1))
	}
	static joinPath(base, ...pathSegments) {
		const joinedPath = path.join(base.path, ...pathSegments)
		return new Uri(base.scheme, base.authority, joinedPath, base.query, base.fragment)
	}
	with(change) {
		return new Uri(
			change.scheme !== undefined ? change.scheme : this.scheme,
			change.authority !== undefined ? change.authority : this.authority,
			change.path !== undefined ? change.path : this.path,
			change.query !== undefined ? change.query : this.query,
			change.fragment !== undefined ? change.fragment : this.fragment,
		)
	}
	get fsPath() {
		return this.path
	}
	toString() {
		return `${this.scheme}://${this.authority}${this.path}${this.query ? "?" + this.query : ""}${this.fragment ? "#" + this.fragment : ""}`
	}
}
// Output Channel mock
export class OutputChannel {
	_name
	constructor(name) {
		this._name = name
	}
	get name() {
		return this._name
	}
	append(value) {
		logs.info(`[${this._name}] ${value}`, "VSCode.OutputChannel")
	}
	appendLine(value) {
		logs.info(`[${this._name}] ${value}`, "VSCode.OutputChannel")
	}
	clear() {
		// No-op for CLI
	}
	show() {
		// No-op for CLI
	}
	hide() {
		// No-op for CLI
	}
	dispose() {
		// No-op for CLI
	}
}
// Extension Context mock
export class ExtensionContext {
	subscriptions = []
	workspaceState
	globalState
	secrets
	extensionUri
	extensionPath
	environmentVariableCollection = {}
	storageUri
	storagePath
	globalStorageUri
	globalStoragePath
	logUri
	logPath
	extensionMode = ExtensionMode.Production
	constructor(extensionPath, workspacePath) {
		this.extensionPath = extensionPath
		this.extensionUri = Uri.file(extensionPath)
		// Setup storage paths using centralized path utility
		// Initialize workspace to ensure all directories exist
		KiloCodePaths.initializeWorkspace(workspacePath)
		const globalStoragePath = KiloCodePaths.getGlobalStorageDir()
		const workspaceStoragePath = KiloCodePaths.getWorkspaceStorageDir(workspacePath)
		const logPath = KiloCodePaths.getLogsDir()
		this.globalStoragePath = globalStoragePath
		this.globalStorageUri = Uri.file(globalStoragePath)
		this.storagePath = workspaceStoragePath
		this.storageUri = Uri.file(workspaceStoragePath)
		this.logPath = logPath
		this.logUri = Uri.file(logPath)
		// Ensure directories exist
		this.ensureDirectoryExists(globalStoragePath)
		this.ensureDirectoryExists(workspaceStoragePath)
		this.ensureDirectoryExists(logPath)
		// Initialize state storage
		this.workspaceState = new MemoryMemento(path.join(workspaceStoragePath, "workspace-state.json"))
		const globalMemento = new MemoryMemento(path.join(globalStoragePath, "global-state.json"))
		this.globalState = Object.assign(globalMemento, {
			setKeysForSync: () => {}, // No-op for CLI
		})
		this.secrets = new MockSecretStorage(globalStoragePath)
	}
	ensureDirectoryExists(dirPath) {
		try {
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath, { recursive: true })
			}
		} catch (error) {
			logs.warn(`Failed to create directory ${dirPath}`, "VSCode.ExtensionContext", { error })
		}
	}
}
class MemoryMemento {
	data = {}
	filePath
	constructor(filePath) {
		this.filePath = filePath
		this.loadFromFile()
	}
	loadFromFile() {
		try {
			if (fs.existsSync(this.filePath)) {
				const content = fs.readFileSync(this.filePath, "utf-8")
				this.data = JSON.parse(content)
			}
		} catch (error) {
			logs.warn(`Failed to load state from ${this.filePath}`, "VSCode.Memento", { error })
			this.data = {}
		}
	}
	saveToFile() {
		try {
			// Ensure directory exists
			const dir = path.dirname(this.filePath)
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true })
			}
			fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2))
		} catch (error) {
			logs.warn(`Failed to save state to ${this.filePath}`, "VSCode.Memento", { error })
		}
	}
	get(key, defaultValue) {
		const value = this.data[key]
		return value !== undefined && value !== null ? value : defaultValue
	}
	async update(key, value) {
		if (value === undefined) {
			delete this.data[key]
		} else {
			this.data[key] = value
		}
		this.saveToFile()
	}
	keys() {
		return Object.keys(this.data)
	}
}
class MockSecretStorage {
	secrets = {}
	_onDidChange = new EventEmitter()
	filePath
	constructor(storagePath) {
		this.filePath = path.join(storagePath, "secrets.json")
		this.loadFromFile()
	}
	loadFromFile() {
		try {
			if (fs.existsSync(this.filePath)) {
				const content = fs.readFileSync(this.filePath, "utf-8")
				this.secrets = JSON.parse(content)
			}
		} catch (error) {
			logs.warn(`Failed to load secrets from ${this.filePath}`, "VSCode.MockSecretStorage", { error })
			this.secrets = {}
		}
	}
	saveToFile() {
		try {
			// Ensure directory exists
			const dir = path.dirname(this.filePath)
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true })
			}
			fs.writeFileSync(this.filePath, JSON.stringify(this.secrets, null, 2))
		} catch (error) {
			logs.warn(`Failed to save secrets to ${this.filePath}`, "VSCode.MockSecretStorage", { error })
		}
	}
	async get(key) {
		return this.secrets[key]
	}
	async store(key, value) {
		this.secrets[key] = value
		this.saveToFile()
		this._onDidChange.fire({ key })
	}
	async delete(key) {
		delete this.secrets[key]
		this.saveToFile()
		this._onDidChange.fire({ key })
	}
	get onDidChange() {
		return this._onDidChange.event
	}
}
// FileSystem API mock
export var FileType
;(function (FileType) {
	FileType[(FileType["Unknown"] = 0)] = "Unknown"
	FileType[(FileType["File"] = 1)] = "File"
	FileType[(FileType["Directory"] = 2)] = "Directory"
	FileType[(FileType["SymbolicLink"] = 64)] = "SymbolicLink"
})(FileType || (FileType = {}))
// FileSystemError class mock
export class FileSystemError extends Error {
	code
	constructor(message, code = "Unknown") {
		super(message)
		this.name = "FileSystemError"
		this.code = code
	}
	static FileNotFound(messageOrUri) {
		const message =
			typeof messageOrUri === "string" ? messageOrUri : `File not found: ${messageOrUri?.fsPath || "unknown"}`
		return new FileSystemError(message, "FileNotFound")
	}
	static FileExists(messageOrUri) {
		const message =
			typeof messageOrUri === "string" ? messageOrUri : `File exists: ${messageOrUri?.fsPath || "unknown"}`
		return new FileSystemError(message, "FileExists")
	}
	static FileNotADirectory(messageOrUri) {
		const message =
			typeof messageOrUri === "string"
				? messageOrUri
				: `File is not a directory: ${messageOrUri?.fsPath || "unknown"}`
		return new FileSystemError(message, "FileNotADirectory")
	}
	static FileIsADirectory(messageOrUri) {
		const message =
			typeof messageOrUri === "string"
				? messageOrUri
				: `File is a directory: ${messageOrUri?.fsPath || "unknown"}`
		return new FileSystemError(message, "FileIsADirectory")
	}
	static NoPermissions(messageOrUri) {
		const message =
			typeof messageOrUri === "string" ? messageOrUri : `No permissions: ${messageOrUri?.fsPath || "unknown"}`
		return new FileSystemError(message, "NoPermissions")
	}
	static Unavailable(messageOrUri) {
		const message =
			typeof messageOrUri === "string" ? messageOrUri : `Unavailable: ${messageOrUri?.fsPath || "unknown"}`
		return new FileSystemError(message, "Unavailable")
	}
}
export class FileSystemAPI {
	async stat(uri) {
		try {
			const stats = fs.statSync(uri.fsPath)
			return {
				type: stats.isDirectory() ? FileType.Directory : FileType.File,
				ctime: stats.ctimeMs,
				mtime: stats.mtimeMs,
				size: stats.size,
			}
		} catch {
			// If file doesn't exist, assume it's a file for CLI purposes
			return {
				type: FileType.File,
				ctime: Date.now(),
				mtime: Date.now(),
				size: 0,
			}
		}
	}
	async readFile(uri) {
		try {
			const content = fs.readFileSync(uri.fsPath)
			return new Uint8Array(content)
		} catch (error) {
			// Check if it's a file not found error (ENOENT)
			if (error.code === "ENOENT") {
				throw FileSystemError.FileNotFound(uri)
			}
			// For other errors, throw a generic FileSystemError
			throw new FileSystemError(`Failed to read file: ${uri.fsPath}`)
		}
	}
	async writeFile(uri, content) {
		try {
			fs.writeFileSync(uri.fsPath, content)
		} catch {
			throw new Error(`Failed to write file: ${uri.fsPath}`)
		}
	}
	async delete(uri) {
		try {
			fs.unlinkSync(uri.fsPath)
		} catch {
			throw new Error(`Failed to delete file: ${uri.fsPath}`)
		}
	}
	async createDirectory(uri) {
		try {
			fs.mkdirSync(uri.fsPath, { recursive: true })
		} catch {
			throw new Error(`Failed to create directory: ${uri.fsPath}`)
		}
	}
}
// Workspace API mock
export class WorkspaceAPI {
	workspaceFolders
	name
	workspaceFile
	fs
	textDocuments = []
	_onDidChangeWorkspaceFolders = new EventEmitter()
	_onDidOpenTextDocument = new EventEmitter()
	_onDidChangeTextDocument = new EventEmitter()
	_onDidCloseTextDocument = new EventEmitter()
	workspacePath
	context
	constructor(workspacePath, context) {
		this.workspacePath = workspacePath
		this.context = context
		this.workspaceFolders = [
			{
				uri: Uri.file(workspacePath),
				name: path.basename(workspacePath),
				index: 0,
			},
		]
		this.name = path.basename(workspacePath)
		this.fs = new FileSystemAPI()
	}
	asRelativePath(pathOrUri, includeWorkspaceFolder) {
		const fsPath = typeof pathOrUri === "string" ? pathOrUri : pathOrUri.fsPath
		// If no workspace folders, return the original path
		if (!this.workspaceFolders || this.workspaceFolders.length === 0) {
			return fsPath
		}
		// Try to find a workspace folder that contains this path
		for (const folder of this.workspaceFolders) {
			const workspacePath = folder.uri.fsPath
			// Normalize paths for comparison (handle different path separators)
			const normalizedFsPath = path.normalize(fsPath)
			const normalizedWorkspacePath = path.normalize(workspacePath)
			// Check if the path is within this workspace folder
			if (normalizedFsPath.startsWith(normalizedWorkspacePath)) {
				// Get the relative path
				let relativePath = path.relative(normalizedWorkspacePath, normalizedFsPath)
				// If includeWorkspaceFolder is true and there are multiple workspace folders,
				// prepend the workspace folder name
				if (includeWorkspaceFolder && this.workspaceFolders.length > 1) {
					relativePath = path.join(folder.name, relativePath)
				}
				return relativePath
			}
		}
		// If not within any workspace folder, return the original path
		return fsPath
	}
	onDidChangeWorkspaceFolders(listener) {
		return this._onDidChangeWorkspaceFolders.event(listener)
	}
	onDidChangeConfiguration(listener) {
		// Create a mock configuration change event emitter
		const emitter = new EventEmitter()
		return emitter.event(listener)
	}
	onDidChangeTextDocument(listener) {
		return this._onDidChangeTextDocument.event(listener)
	}
	onDidOpenTextDocument(listener) {
		logs.debug("Registering onDidOpenTextDocument listener", "VSCode.Workspace")
		return this._onDidOpenTextDocument.event(listener)
	}
	onDidCloseTextDocument(listener) {
		return this._onDidCloseTextDocument.event(listener)
	}
	getConfiguration(section) {
		return new MockWorkspaceConfiguration(section, this.context)
	}
	findFiles(_include, _exclude) {
		// Basic implementation - could be enhanced with glob patterns
		return Promise.resolve([])
	}
	async openTextDocument(uri) {
		logs.debug(`openTextDocument called for: ${uri.fsPath}`, "VSCode.Workspace")
		// Read file content
		let content = ""
		try {
			content = fs.readFileSync(uri.fsPath, "utf-8")
			logs.debug(`File content read successfully, length: ${content.length}`, "VSCode.Workspace")
		} catch (error) {
			logs.warn(`Failed to read file: ${uri.fsPath}`, "VSCode.Workspace", { error })
		}
		const lines = content.split("\n")
		const document = {
			uri,
			fileName: uri.fsPath,
			languageId: "plaintext",
			version: 1,
			isDirty: false,
			isClosed: false,
			lineCount: lines.length,
			getText: (range) => {
				if (!range) {
					return content
				}
				return lines.slice(range.start.line, range.end.line + 1).join("\n")
			},
			lineAt: (line) => {
				const text = lines[line] || ""
				return {
					text,
					range: new Range(new Position(line, 0), new Position(line, text.length)),
					rangeIncludingLineBreak: new Range(new Position(line, 0), new Position(line + 1, 0)),
					firstNonWhitespaceCharacterIndex: text.search(/\S/),
					isEmptyOrWhitespace: text.trim().length === 0,
				}
			},
			offsetAt: (position) => {
				let offset = 0
				for (let i = 0; i < position.line && i < lines.length; i++) {
					offset += (lines[i]?.length || 0) + 1 // +1 for newline
				}
				offset += position.character
				return offset
			},
			positionAt: (offset) => {
				let currentOffset = 0
				for (let i = 0; i < lines.length; i++) {
					const lineLength = (lines[i]?.length || 0) + 1 // +1 for newline
					if (currentOffset + lineLength > offset) {
						return new Position(i, offset - currentOffset)
					}
					currentOffset += lineLength
				}
				return new Position(lines.length - 1, lines[lines.length - 1]?.length || 0)
			},
			save: () => Promise.resolve(true),
			validateRange: (range) => range,
			validatePosition: (position) => position,
		}
		// Add to textDocuments array
		this.textDocuments.push(document)
		logs.debug(`Document added to textDocuments array, total: ${this.textDocuments.length}`, "VSCode.Workspace")
		// Fire the event after a small delay to ensure listeners are fully registered
		logs.debug("Waiting before firing onDidOpenTextDocument", "VSCode.Workspace")
		await new Promise((resolve) => setTimeout(resolve, 10))
		logs.debug("Firing onDidOpenTextDocument event", "VSCode.Workspace")
		this._onDidOpenTextDocument.fire(document)
		logs.debug("onDidOpenTextDocument event fired", "VSCode.Workspace")
		return document
	}
	async applyEdit(edit) {
		// In CLI mode, we need to apply the edits to the actual files
		try {
			for (const [uri, edits] of edit.entries()) {
				let filePath = uri.fsPath
				// On Windows, strip leading slash if present (e.g., /C:/path becomes C:/path)
				if (process.platform === "win32" && filePath.startsWith("/")) {
					filePath = filePath.slice(1)
				}
				let content = ""
				// Read existing content if file exists
				try {
					content = fs.readFileSync(filePath, "utf-8")
				} catch {
					// File doesn't exist, start with empty content
				}
				// Apply edits in reverse order to maintain correct positions
				const sortedEdits = edits.sort((a, b) => {
					const lineDiff = b.range.start.line - a.range.start.line
					if (lineDiff !== 0) return lineDiff
					return b.range.start.character - a.range.start.character
				})
				const lines = content.split("\n")
				for (const textEdit of sortedEdits) {
					const startLine = textEdit.range.start.line
					const startChar = textEdit.range.start.character
					const endLine = textEdit.range.end.line
					const endChar = textEdit.range.end.character
					if (startLine === endLine) {
						// Single line edit
						const line = lines[startLine] || ""
						lines[startLine] = line.substring(0, startChar) + textEdit.newText + line.substring(endChar)
					} else {
						// Multi-line edit
						const firstLine = lines[startLine] || ""
						const lastLine = lines[endLine] || ""
						const newContent =
							firstLine.substring(0, startChar) + textEdit.newText + lastLine.substring(endChar)
						lines.splice(startLine, endLine - startLine + 1, newContent)
					}
				}
				// Write back to file
				const newContent = lines.join("\n")
				fs.writeFileSync(filePath, newContent, "utf-8")
				// Update the in-memory document object to reflect the new content
				// This is critical for CLI mode where DiffViewProvider reads from the document object
				const normalizedFilePath = path.normalize(filePath)
				const document = this.textDocuments.find((doc) => path.normalize(doc.uri.fsPath) === normalizedFilePath)
				if (document) {
					const newLines = newContent.split("\n")
					// Update document properties with new content
					document.lineCount = newLines.length
					document.getText = (range) => {
						if (!range) {
							return newContent
						}
						return newLines.slice(range.start.line, range.end.line + 1).join("\n")
					}
					document.lineAt = (line) => {
						const text = newLines[line] || ""
						return {
							text,
							range: new Range(new Position(line, 0), new Position(line, text.length)),
							rangeIncludingLineBreak: new Range(new Position(line, 0), new Position(line + 1, 0)),
							firstNonWhitespaceCharacterIndex: text.search(/\S/),
							isEmptyOrWhitespace: text.trim().length === 0,
						}
					}
					document.offsetAt = (position) => {
						let offset = 0
						for (let i = 0; i < position.line && i < newLines.length; i++) {
							offset += (newLines[i]?.length || 0) + 1 // +1 for newline
						}
						offset += position.character
						return offset
					}
					document.positionAt = (offset) => {
						let currentOffset = 0
						for (let i = 0; i < newLines.length; i++) {
							const lineLength = (newLines[i]?.length || 0) + 1 // +1 for newline
							if (currentOffset + lineLength > offset) {
								return new Position(i, offset - currentOffset)
							}
							currentOffset += lineLength
						}
						return new Position(newLines.length - 1, newLines[newLines.length - 1]?.length || 0)
					}
				}
			}
			return true
		} catch (error) {
			logs.error("Failed to apply workspace edit", "VSCode.Workspace", { error })
			return false
		}
	}
	createFileSystemWatcher(_globPattern, _ignoreCreateEvents, _ignoreChangeEvents, _ignoreDeleteEvents) {
		const emitter = new EventEmitter()
		return {
			onDidChange: (listener) => emitter.event(listener),
			onDidCreate: (listener) => emitter.event(listener),
			onDidDelete: (listener) => emitter.event(listener),
			dispose: () => emitter.dispose(),
		}
	}
	registerTextDocumentContentProvider(_scheme, _provider) {
		return { dispose: () => {} }
	}
}
export class MockWorkspaceConfiguration {
	section
	globalMemento
	workspaceMemento
	constructor(section, context) {
		this.section = section
		if (context) {
			// Use the extension context's mementos
			this.globalMemento = context.globalState
			this.workspaceMemento = context.workspaceState
		} else {
			// Fallback: create our own mementos (shouldn't happen in normal usage)
			const globalStoragePath = KiloCodePaths.getGlobalStorageDir()
			const workspaceStoragePath = KiloCodePaths.getWorkspaceStorageDir(process.cwd())
			this.ensureDirectoryExists(globalStoragePath)
			this.ensureDirectoryExists(workspaceStoragePath)
			this.globalMemento = new MemoryMemento(path.join(globalStoragePath, "configuration.json"))
			this.workspaceMemento = new MemoryMemento(path.join(workspaceStoragePath, "configuration.json"))
		}
	}
	ensureDirectoryExists(dirPath) {
		try {
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath, { recursive: true })
			}
		} catch (error) {
			logs.warn(`Failed to create directory ${dirPath}`, "VSCode.MockWorkspaceConfiguration", { error })
		}
	}
	get(section, defaultValue) {
		const fullSection = this.section ? `${this.section}.${section}` : section
		// Check workspace configuration first (higher priority)
		const workspaceValue = this.workspaceMemento.get(fullSection)
		if (workspaceValue !== undefined && workspaceValue !== null) {
			return workspaceValue
		}
		// Check global configuration
		const globalValue = this.globalMemento.get(fullSection)
		if (globalValue !== undefined && globalValue !== null) {
			return globalValue
		}
		// Return default value
		return defaultValue
	}
	has(section) {
		const fullSection = this.section ? `${this.section}.${section}` : section
		return this.workspaceMemento.get(fullSection) !== undefined || this.globalMemento.get(fullSection) !== undefined
	}
	inspect(section) {
		const fullSection = this.section ? `${this.section}.${section}` : section
		const workspaceValue = this.workspaceMemento.get(fullSection)
		const globalValue = this.globalMemento.get(fullSection)
		if (workspaceValue !== undefined || globalValue !== undefined) {
			return {
				key: fullSection,
				defaultValue: undefined,
				globalValue: globalValue,
				workspaceValue: workspaceValue,
				workspaceFolderValue: undefined,
			}
		}
		return undefined
	}
	async update(section, value, configurationTarget) {
		const fullSection = this.section ? `${this.section}.${section}` : section
		try {
			// Determine which memento to use based on configuration target
			const memento =
				configurationTarget === ConfigurationTarget.Workspace ? this.workspaceMemento : this.globalMemento
			const scope = configurationTarget === ConfigurationTarget.Workspace ? "workspace" : "global"
			// Update the memento (this automatically persists to disk)
			await memento.update(fullSection, value)
			logs.debug(
				`Configuration updated: ${fullSection} = ${JSON.stringify(value)} (${scope})`,
				"VSCode.MockWorkspaceConfiguration",
			)
		} catch (error) {
			logs.error(`Failed to update configuration: ${fullSection}`, "VSCode.MockWorkspaceConfiguration", {
				error,
			})
			throw error
		}
	}
	// Additional method to reload configuration from disk
	reload() {
		// MemoryMemento automatically loads from disk, so we don't need to do anything special
		logs.debug("Configuration reload requested", "VSCode.MockWorkspaceConfiguration")
	}
	// Method to get all configuration data (useful for debugging and generic config loading)
	getAllConfig() {
		const globalKeys = this.globalMemento.keys()
		const workspaceKeys = this.workspaceMemento.keys()
		const allConfig = {}
		// Add global settings first
		for (const key of globalKeys) {
			const value = this.globalMemento.get(key)
			if (value !== undefined && value !== null) {
				allConfig[key] = value
			}
		}
		// Add workspace settings (these override global)
		for (const key of workspaceKeys) {
			const value = this.workspaceMemento.get(key)
			if (value !== undefined && value !== null) {
				allConfig[key] = value
			}
		}
		return allConfig
	}
}
// Text Editor Decoration Type mock
export class TextEditorDecorationType {
	key
	constructor(key) {
		this.key = key
	}
	dispose() {
		// No-op for CLI
	}
}
// StatusBarItem mock
export class StatusBarItem {
	alignment
	priority
	_text = ""
	_tooltip
	_command
	_color
	_backgroundColor
	_isVisible = false
	constructor(alignment, priority) {
		this.alignment = alignment
		this.priority = priority
	}
	get text() {
		return this._text
	}
	set text(value) {
		this._text = value
	}
	get tooltip() {
		return this._tooltip
	}
	set tooltip(value) {
		this._tooltip = value
	}
	get command() {
		return this._command
	}
	set command(value) {
		this._command = value
	}
	get color() {
		return this._color
	}
	set color(value) {
		this._color = value
	}
	get backgroundColor() {
		return this._backgroundColor
	}
	set backgroundColor(value) {
		this._backgroundColor = value
	}
	show() {
		this._isVisible = true
	}
	hide() {
		this._isVisible = false
	}
	dispose() {
		this._isVisible = false
	}
}
// TabGroups API mock
export class TabGroupsAPI {
	_onDidChangeTabs = new EventEmitter()
	_tabGroups = []
	get all() {
		return this._tabGroups
	}
	onDidChangeTabs(listener) {
		return this._onDidChangeTabs.event(listener)
	}
	async close(tab) {
		// Find and remove the tab from all groups
		for (const group of this._tabGroups) {
			const index = group.tabs.indexOf(tab)
			if (index !== -1) {
				group.tabs.splice(index, 1)
				this._onDidChangeTabs.fire()
				return true
			}
		}
		return false
	}
	// Internal method to simulate tab changes for CLI
	_simulateTabChange() {
		this._onDidChangeTabs.fire()
	}
	dispose() {
		this._onDidChangeTabs.dispose()
	}
}
// Window API mock
export class WindowAPI {
	tabGroups
	visibleTextEditors = []
	_onDidChangeVisibleTextEditors = new EventEmitter()
	_workspace
	constructor() {
		this.tabGroups = new TabGroupsAPI()
	}
	setWorkspace(workspace) {
		this._workspace = workspace
	}
	createOutputChannel(name) {
		return new OutputChannel(name)
	}
	createStatusBarItem(idOrAlignment, alignmentOrPriority, priority) {
		// Handle overloaded signatures
		let actualAlignment
		let actualPriority
		if (typeof idOrAlignment === "string") {
			// Called with id, alignment, priority
			actualAlignment = alignmentOrPriority ?? StatusBarAlignment.Left
			actualPriority = priority
		} else {
			// Called with alignment, priority
			actualAlignment = idOrAlignment ?? StatusBarAlignment.Left
			actualPriority = alignmentOrPriority
		}
		return new StatusBarItem(actualAlignment, actualPriority)
	}
	createTextEditorDecorationType(_options) {
		return new TextEditorDecorationType(`decoration-${Date.now()}`)
	}
	createTerminal(options) {
		// Return a mock terminal object
		return {
			name: options?.name || "Terminal",
			processId: Promise.resolve(undefined),
			creationOptions: options || {},
			exitStatus: undefined,
			state: { isInteractedWith: false },
			sendText: (text, _addNewLine) => {
				logs.debug(`Terminal sendText: ${text}`, "VSCode.Terminal")
			},
			show: (_preserveFocus) => {
				logs.debug("Terminal show called", "VSCode.Terminal")
			},
			hide: () => {
				logs.debug("Terminal hide called", "VSCode.Terminal")
			},
			dispose: () => {
				logs.debug("Terminal disposed", "VSCode.Terminal")
			},
		}
	}
	showInformationMessage(message, ..._items) {
		logs.info(message, "VSCode.Window")
		return Promise.resolve(undefined)
	}
	showWarningMessage(message, ..._items) {
		logs.warn(message, "VSCode.Window")
		return Promise.resolve(undefined)
	}
	showErrorMessage(message, ..._items) {
		logs.error(message, "VSCode.Window")
		return Promise.resolve(undefined)
	}
	showQuickPick(items, _options) {
		// Return first item for CLI
		return Promise.resolve(items[0])
	}
	showInputBox(_options) {
		// Return empty string for CLI
		return Promise.resolve("")
	}
	showOpenDialog(_options) {
		// Return empty array for CLI
		return Promise.resolve([])
	}
	async showTextDocument(documentOrUri, columnOrOptions, _preserveFocus) {
		// Mock implementation for CLI
		// In a real VSCode environment, this would open the document in an editor
		const uri = documentOrUri instanceof Uri ? documentOrUri : documentOrUri.uri
		logs.debug(`showTextDocument called for: ${uri?.toString() || "unknown"}`, "VSCode.Window")
		// Create a placeholder editor first so it's in visibleTextEditors when onDidOpenTextDocument fires
		const placeholderEditor = {
			document: { uri },
			selection: new Selection(new Position(0, 0), new Position(0, 0)),
			selections: [new Selection(new Position(0, 0), new Position(0, 0))],
			visibleRanges: [new Range(new Position(0, 0), new Position(0, 0))],
			options: {},
			viewColumn: typeof columnOrOptions === "number" ? columnOrOptions : ViewColumn.One,
			edit: () => Promise.resolve(true),
			insertSnippet: () => Promise.resolve(true),
			setDecorations: () => {},
			revealRange: () => {},
			show: () => {},
			hide: () => {},
		}
		// Add placeholder to visible editors BEFORE opening document
		this.visibleTextEditors.push(placeholderEditor)
		logs.debug(
			`Placeholder editor added to visibleTextEditors, total: ${this.visibleTextEditors.length}`,
			"VSCode.Window",
		)
		// If we have a URI, open the document (this will fire onDidOpenTextDocument)
		let document = documentOrUri
		if (documentOrUri instanceof Uri && this._workspace) {
			logs.debug("Opening document via workspace.openTextDocument", "VSCode.Window")
			document = await this._workspace.openTextDocument(uri)
			logs.debug("Document opened successfully", "VSCode.Window")
			// Update the placeholder editor with the real document
			placeholderEditor.document = document
		}
		// Fire events immediately using setImmediate
		setImmediate(() => {
			logs.debug("Firing onDidChangeVisibleTextEditors event", "VSCode.Window")
			this._onDidChangeVisibleTextEditors.fire(this.visibleTextEditors)
			logs.debug("onDidChangeVisibleTextEditors event fired", "VSCode.Window")
		})
		logs.debug("Returning editor from showTextDocument", "VSCode.Window")
		return placeholderEditor
	}
	registerWebviewViewProvider(viewId, provider, _options) {
		// Store the provider for later use by ExtensionHost
		if (global.__extensionHost) {
			const extensionHost = global.__extensionHost
			extensionHost.registerWebviewProvider(viewId, provider)
			// Set up webview mock that captures messages from the extension
			const mockWebview = {
				postMessage: (message) => {
					// Forward extension messages to ExtensionHost for CLI consumption
					if (global.__extensionHost) {
						global.__extensionHost.emit("extensionWebviewMessage", message)
					}
					return Promise.resolve(true)
				},
				onDidReceiveMessage: (listener) => {
					// This is how the extension listens for messages from the webview
					// We need to connect this to our message bridge
					if (global.__extensionHost) {
						global.__extensionHost.on("webviewMessage", listener)
					}
					return { dispose: () => {} }
				},
				asWebviewUri: (uri) => {
					// Convert file URIs to webview-compatible URIs
					// For CLI, we can just return a mock webview URI
					return Uri.parse(`vscode-webview://webview/${uri.path}`)
				},
				html: "",
				options: {},
				cspSource: "vscode-webview:",
			}
			// Provide the mock webview to the provider
			if (provider.resolveWebviewView) {
				const mockWebviewView = {
					webview: mockWebview,
					viewType: viewId,
					title: viewId,
					description: undefined,
					badge: undefined,
					show: () => {},
					onDidChangeVisibility: () => ({ dispose: () => {} }),
					onDidDispose: () => ({ dispose: () => {} }),
					visible: true,
				}
				;(async () => {
					try {
						// Pass isInitialSetup flag in context to prevent task abortion
						const context = {
							preserveFocus: false,
							isInitialSetup: extensionHost.isInInitialSetup(),
						}
						logs.debug(
							`Calling resolveWebviewView with isInitialSetup=${context.isInitialSetup}`,
							"VSCode.Window",
						)
						// Await the result to ensure webview is fully initialized before marking ready
						await provider.resolveWebviewView(mockWebviewView, {}, {})
						// Mark webview as ready after resolution completes
						extensionHost.markWebviewReady()
						logs.debug("Webview resolution complete, marked as ready", "VSCode.Window")
					} catch (error) {
						logs.error("Error resolving webview view", "VSCode.Window", { error })
					}
				})()
			}
		}
		return {
			dispose: () => {
				if (global.__extensionHost) {
					global.__extensionHost.unregisterWebviewProvider(viewId)
				}
			},
		}
	}
	registerUriHandler(_handler) {
		// Store the URI handler for later use
		return {
			dispose: () => {},
		}
	}
	onDidChangeTextEditorSelection(listener) {
		const emitter = new EventEmitter()
		return emitter.event(listener)
	}
	onDidChangeActiveTextEditor(listener) {
		const emitter = new EventEmitter()
		return emitter.event(listener)
	}
	onDidChangeVisibleTextEditors(listener) {
		return this._onDidChangeVisibleTextEditors.event(listener)
	}
	// Terminal event handlers
	onDidCloseTerminal(_listener) {
		return { dispose: () => {} }
	}
	onDidOpenTerminal(_listener) {
		return { dispose: () => {} }
	}
	onDidChangeActiveTerminal(_listener) {
		return { dispose: () => {} }
	}
	onDidChangeTerminalDimensions(_listener) {
		return { dispose: () => {} }
	}
	onDidWriteTerminalData(_listener) {
		return { dispose: () => {} }
	}
	get activeTerminal() {
		return undefined
	}
	get terminals() {
		return []
	}
}
// Commands API mock
// Commands API mock
export class CommandsAPI {
	commands = new Map()
	registerCommand(command, callback) {
		this.commands.set(command, callback)
		return {
			dispose: () => {
				this.commands.delete(command)
			},
		}
	}
	executeCommand(command, ...rest) {
		const handler = this.commands.get(command)
		if (handler) {
			try {
				const result = handler(...rest)
				return Promise.resolve(result)
			} catch (error) {
				return Promise.reject(error)
			}
		}
		// Handle built-in commands
		switch (command) {
			case "workbench.action.files.saveFiles":
			case "workbench.action.closeWindow":
			case "workbench.action.reloadWindow":
				return Promise.resolve(undefined)
			case "vscode.diff":
				// Simulate opening a diff view for the CLI
				// The extension's DiffViewProvider expects this to create a diff editor
				return this.handleDiffCommand(rest[0], rest[1], rest[2], rest[3])
			default:
				logs.warn(`Unknown command: ${command}`, "VSCode.Commands")
				return Promise.resolve(undefined)
		}
	}
	async handleDiffCommand(originalUri, modifiedUri, title, _options) {
		// The DiffViewProvider is waiting for the modified document to appear in visibleTextEditors
		// We need to simulate this by opening the document and adding it to visible editors
		logs.info(`[DIFF] Handling vscode.diff command`, "VSCode.Commands", {
			originalUri: originalUri?.toString(),
			modifiedUri: modifiedUri?.toString(),
			title,
		})
		if (!modifiedUri) {
			logs.warn("[DIFF] vscode.diff called without modified URI", "VSCode.Commands")
			return
		}
		// Get the workspace API to open the document
		const workspace = global.vscode?.workspace
		const window = global.vscode?.window
		if (!workspace || !window) {
			logs.warn("[DIFF] VSCode APIs not available for diff command", "VSCode.Commands")
			return
		}
		logs.info(
			`[DIFF] Current visibleTextEditors count: ${window.visibleTextEditors?.length || 0}`,
			"VSCode.Commands",
		)
		try {
			// The document should already be open from the showTextDocument call
			// Find it in the existing textDocuments
			logs.info(`[DIFF] Looking for already-opened document: ${modifiedUri.fsPath}`, "VSCode.Commands")
			let document = workspace.textDocuments.find((doc) => doc.uri.fsPath === modifiedUri.fsPath)
			if (!document) {
				// If not found, open it now
				logs.info(`[DIFF] Document not found, opening: ${modifiedUri.fsPath}`, "VSCode.Commands")
				document = await workspace.openTextDocument(modifiedUri)
				logs.info(`[DIFF] Document opened successfully, lineCount: ${document.lineCount}`, "VSCode.Commands")
			} else {
				logs.info(`[DIFF] Found existing document, lineCount: ${document.lineCount}`, "VSCode.Commands")
			}
			// Create a mock editor for the diff view
			const mockEditor = {
				document,
				selection: new Selection(new Position(0, 0), new Position(0, 0)),
				selections: [new Selection(new Position(0, 0), new Position(0, 0))],
				visibleRanges: [new Range(new Position(0, 0), new Position(0, 0))],
				options: {},
				viewColumn: ViewColumn.One,
				edit: async (callback) => {
					// Create a mock edit builder
					const editBuilder = {
						replace: (_range, _text) => {
							// In CLI mode, we don't actually edit here
							// The DiffViewProvider will handle the actual edits
							logs.debug("Mock edit builder replace called", "VSCode.Commands")
						},
						insert: (_position, _text) => {
							logs.debug("Mock edit builder insert called", "VSCode.Commands")
						},
						delete: (_range) => {
							logs.debug("Mock edit builder delete called", "VSCode.Commands")
						},
						setEndOfLine: (_endOfLine) => {
							logs.debug("Mock edit builder setEndOfLine called", "VSCode.Commands")
						},
					}
					callback(editBuilder)
					return true
				},
				insertSnippet: () => Promise.resolve(true),
				setDecorations: () => {},
				revealRange: () => {},
				show: () => {},
				hide: () => {},
			}
			// Add the editor to visible editors
			if (!window.visibleTextEditors) {
				window.visibleTextEditors = []
			}
			// Check if this editor is already in visibleTextEditors (from showTextDocument)
			const existingEditor = window.visibleTextEditors.find((e) => e.document.uri.fsPath === modifiedUri.fsPath)
			if (existingEditor) {
				logs.info(`[DIFF] Editor already in visibleTextEditors, updating it`, "VSCode.Commands")
				// Update the existing editor with the mock editor properties
				Object.assign(existingEditor, mockEditor)
			} else {
				logs.info(`[DIFF] Adding new mock editor to visibleTextEditors`, "VSCode.Commands")
				window.visibleTextEditors.push(mockEditor)
			}
			logs.info(`[DIFF] visibleTextEditors count: ${window.visibleTextEditors.length}`, "VSCode.Commands")
			// The onDidChangeVisibleTextEditors event was already fired by showTextDocument
			// We don't need to fire it again here
			logs.info(
				`[DIFF] Diff view simulation complete (events already fired by showTextDocument)`,
				"VSCode.Commands",
			)
		} catch (error) {
			logs.error("[DIFF] Error simulating diff view", "VSCode.Commands", { error })
		}
	}
}
// Main VSCode API mock
export function createVSCodeAPIMock(extensionRootPath, workspacePath, identity) {
	const context = new ExtensionContext(extensionRootPath, workspacePath)
	const workspace = new WorkspaceAPI(workspacePath, context)
	const window = new WindowAPI()
	const commands = new CommandsAPI()
	// Link window and workspace for cross-API calls
	window.setWorkspace(workspace)
	// Environment mock with identity values
	const env = {
		appName: `wrapper|cli|cli|${Package.version}`,
		appRoot: import.meta.dirname,
		language: "en",
		machineId: identity?.machineId || "cli-machine-id",
		sessionId: identity?.sessionId || "cli-session-id",
		remoteName: undefined,
		shell: process.env.SHELL || "/bin/bash",
		uriScheme: "vscode",
		uiKind: 1, // Desktop
		openExternal: async (uri) => {
			logs.info(`Would open external URL: ${uri.toString()}`, "VSCode.Env")
			return true
		},
		clipboard: {
			readText: async () => {
				logs.debug("Clipboard read requested", "VSCode.Clipboard")
				return ""
			},
			writeText: async (text) => {
				logs.debug(
					`Clipboard write: ${text.substring(0, 100)}${text.length > 100 ? "..." : ""}`,
					"VSCode.Clipboard",
				)
			},
		},
	}
	return {
		version: "1.84.0",
		Uri,
		EventEmitter,
		ConfigurationTarget,
		ViewColumn,
		TextEditorRevealType,
		StatusBarAlignment,
		DiagnosticSeverity,
		DiagnosticTag,
		Position,
		Range,
		Selection,
		Location,
		Diagnostic,
		DiagnosticRelatedInformation,
		TextEdit,
		WorkspaceEdit,
		EndOfLine,
		UIKind,
		ExtensionMode,
		CodeActionKind,
		ThemeColor,
		ThemeIcon,
		DecorationRangeBehavior,
		OverviewRulerLane,
		StatusBarItem,
		CancellationToken: class CancellationTokenClass {
			isCancellationRequested = false
			onCancellationRequested = (_listener) => ({ dispose: () => {} })
		},
		CancellationTokenSource,
		CodeLens,
		LanguageModelTextPart,
		LanguageModelToolCallPart,
		LanguageModelToolResultPart,
		ExtensionContext,
		FileType,
		FileSystemError,
		Disposable: class DisposableClass {
			dispose() {
				// No-op for CLI
			}
			static from(...disposables) {
				return {
					dispose: () => {
						disposables.forEach((d) => d.dispose())
					},
				}
			}
		},
		TabInputText: class TabInputText {
			uri
			constructor(uri) {
				this.uri = uri
			}
		},
		TabInputTextDiff: class TabInputTextDiff {
			original
			modified
			constructor(original, modified) {
				this.original = original
				this.modified = modified
			}
		},
		workspace,
		window,
		commands,
		env,
		context,
		// Add more APIs as needed
		languages: {
			registerCodeActionsProvider: () => ({ dispose: () => {} }),
			registerCodeLensProvider: () => ({ dispose: () => {} }),
			registerCompletionItemProvider: () => ({ dispose: () => {} }),
			registerHoverProvider: () => ({ dispose: () => {} }),
			registerDefinitionProvider: () => ({ dispose: () => {} }),
			registerReferenceProvider: () => ({ dispose: () => {} }),
			registerDocumentSymbolProvider: () => ({ dispose: () => {} }),
			registerWorkspaceSymbolProvider: () => ({ dispose: () => {} }),
			registerRenameProvider: () => ({ dispose: () => {} }),
			registerDocumentFormattingEditProvider: () => ({ dispose: () => {} }),
			registerDocumentRangeFormattingEditProvider: () => ({ dispose: () => {} }),
			registerSignatureHelpProvider: () => ({ dispose: () => {} }),
			getDiagnostics: (uri) => {
				// In CLI mode, we don't have real diagnostics
				// Return empty array or empty diagnostics for the specific URI
				if (uri) {
					return []
				}
				return []
			},
			createDiagnosticCollection: (name) => {
				const diagnostics = new Map()
				const collection = {
					name: name || "default",
					set: (uriOrEntries, diagnosticsOrUndefined) => {
						if (Array.isArray(uriOrEntries)) {
							// Handle array of entries
							for (const [uri, diags] of uriOrEntries) {
								if (diags === undefined) {
									diagnostics.delete(uri.toString())
								} else {
									diagnostics.set(uri.toString(), diags)
								}
							}
						} else {
							// Handle single URI
							if (diagnosticsOrUndefined === undefined) {
								diagnostics.delete(uriOrEntries.toString())
							} else {
								diagnostics.set(uriOrEntries.toString(), diagnosticsOrUndefined)
							}
						}
					},
					delete: (uri) => {
						diagnostics.delete(uri.toString())
					},
					clear: () => {
						diagnostics.clear()
					},
					forEach: (callback, thisArg) => {
						diagnostics.forEach((diags, uriString) => {
							callback.call(thisArg, Uri.parse(uriString), diags, collection)
						})
					},
					get: (uri) => {
						return diagnostics.get(uri.toString())
					},
					has: (uri) => {
						return diagnostics.has(uri.toString())
					},
					dispose: () => {
						diagnostics.clear()
					},
				}
				return collection
			},
		},
		debug: {
			onDidStartDebugSession: () => ({ dispose: () => {} }),
			onDidTerminateDebugSession: () => ({ dispose: () => {} }),
		},
		tasks: {
			onDidStartTask: () => ({ dispose: () => {} }),
			onDidEndTask: () => ({ dispose: () => {} }),
		},
		extensions: {
			all: [],
			getExtension: (extensionId) => {
				// Mock the extension object with extensionUri for theme loading
				if (extensionId === "kilocode.kilo-code") {
					return {
						id: extensionId,
						extensionUri: context.extensionUri,
						extensionPath: context.extensionPath,
						isActive: true,
						packageJSON: {},
						exports: undefined,
						activate: () => Promise.resolve(),
					}
				}
				return undefined
			},
			onDidChange: () => ({ dispose: () => {} }),
		},
		// Add file system watcher
		FileSystemWatcher: class {
			onDidChange = () => ({ dispose: () => {} })
			onDidCreate = () => ({ dispose: () => {} })
			onDidDelete = () => ({ dispose: () => {} })
			dispose = () => {}
		},
		// Add relative pattern
		RelativePattern: class {
			base
			pattern
			constructor(base, pattern) {
				this.base = base
				this.pattern = pattern
			}
		},
		// Add progress location
		ProgressLocation: {
			SourceControl: 1,
			Window: 10,
			Notification: 15,
		},
		// Add URI handler
		UriHandler: class {
			handleUri = (_uri) => {}
		},
	}
}
