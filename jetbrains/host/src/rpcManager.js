// Copyright 2009-2025 Weibo, Inc.
// SPDX-FileCopyrightText: 2025 Weibo, Inc.
//
// SPDX-License-Identifier: Apache-2.0
import { RPCProtocol } from "../deps/vscode/vs/workbench/services/extensions/common/rpcProtocol.js"
import { MainContext, ExtHostContext } from "../deps/vscode/vs/workbench/api/common/extHost.protocol.js"
import { VSBuffer } from "../deps/vscode/vs/base/common/buffer.js"
import { transformErrorFromSerialization } from "../deps/vscode/vs/base/common/errors.js"
import { FileType, FilePermission, FileSystemProviderErrorCode } from "../deps/vscode/vs/platform/files/common/files.js"
import * as fs from "fs"
import { promisify } from "util"
import { ConfigurationModel } from "../deps/vscode/vs/platform/configuration/common/configurationModels.js"
import { NullLogService } from "../deps/vscode/vs/platform/log/common/log.js"
import { WebViewManager } from "./webViewManager.js"
// Promisify Node.js fs functions
const fsStat = promisify(fs.stat)
const fsReadDir = promisify(fs.readdir)
const fsReadFile = promisify(fs.readFile)
const fsWriteFile = promisify(fs.writeFile)
const fsRename = promisify(fs.rename)
const fsCopyFile = promisify(fs.copyFile)
const fsUnlink = promisify(fs.unlink)
const fsLstat = promisify(fs.lstat)
const fsMkdir = promisify(fs.mkdir)
class RPCLogger {
	logIncoming(msgLength, req, initiator, msg, data) {
		if (msg == "ack") {
			return
		}
		console.log(`[RPC] ExtHost: ${msg}`)
	}
	logOutgoing(msgLength, req, initiator, msg, data) {
		if (msg == "ack" || msg == "reply:") {
			return
		}
		console.log(`[RPC] Main: ${msg}`)
	}
}
export class RPCManager {
	protocol
	rpcProtocol
	logger
	extensionManager
	constructor(protocol, extensionManager) {
		this.protocol = protocol
		this.logger = new RPCLogger()
		this.rpcProtocol = new RPCProtocol(this.protocol, this.logger)
		this.extensionManager = extensionManager
		this.setupDefaultProtocols()
		this.setupExtensionRequiredProtocols()
		this.setupRooCodeRequiredProtocols()
	}
	startInitialize() {
		// ExtHostConfiguration
		const extHostConfiguration = this.rpcProtocol.getProxy(ExtHostContext.ExtHostConfiguration)
		// Send initialization configuration message
		extHostConfiguration.$initializeConfiguration({
			defaults: ConfigurationModel.createEmptyModel(new NullLogService()),
			policy: ConfigurationModel.createEmptyModel(new NullLogService()),
			application: ConfigurationModel.createEmptyModel(new NullLogService()),
			userLocal: ConfigurationModel.createEmptyModel(new NullLogService()),
			userRemote: ConfigurationModel.createEmptyModel(new NullLogService()),
			workspace: ConfigurationModel.createEmptyModel(new NullLogService()),
			folders: [],
			configurationScopes: [],
		})
		const extHostWorkspace = this.rpcProtocol.getProxy(ExtHostContext.ExtHostWorkspace)
		// Initialize workspace
		extHostWorkspace.$initializeWorkspace(null, true)
	}
	// Protocols needed for extHost process startup and initialization
	setupDefaultProtocols() {
		if (!this.rpcProtocol) {
			throw new Error("RPCProtocol not initialized")
		}
		// MainThreadErrors
		this.rpcProtocol.set(MainContext.MainThreadErrors, {
			dispose() {
				// Nothing to do
			},
			$onUnexpectedError(err) {
				if (err && err.$isError) {
					err = transformErrorFromSerialization(err)
				}
				console.error("Unexpected error:", err)
				/*
                if (err instanceof Error && err.stack) {
                    console.error('Stack trace:', err.stack);
                }
                    */
			},
		})
		// MainThreadConsole
		this.rpcProtocol.set(MainContext.MainThreadConsole, {
			dispose() {
				// Nothing to do
			},
			$logExtensionHostMessage(entry) {
				// Parse the entry
				const args = this.parseRemoteConsoleLog(entry)
				// Log based on severity
				switch (entry.severity) {
					case "log":
					case "info":
						console.log("[Extension Host]", ...args)
						break
					case "warn":
						console.warn("[Extension Host]", ...args)
						break
					case "error":
						console.error("[Extension Host]", ...args)
						break
					case "debug":
						console.debug("[Extension Host]", ...args)
						break
					default:
						console.log("[Extension Host]", ...args)
				}
			},
			parseRemoteConsoleLog(entry) {
				const args = []
				try {
					// Parse the arguments string as JSON
					const parsedArguments = JSON.parse(entry.arguments)
					args.push(...parsedArguments)
				} catch (error) {
					// If parsing fails, just log the raw arguments string
					args.push("Unable to log remote console arguments", entry.arguments)
				}
				return args
			},
		})
		// MainThreadLogger
		this.rpcProtocol.set(MainContext.MainThreadLogger, {
			$log(file, messages) {
				console.log("Logger message:", { file, messages })
			},
			$flush(file) {
				console.log("Flush logger:", file)
			},
			$createLogger(file, options) {
				console.log("Create logger:", { file, options })
				return Promise.resolve()
			},
			$registerLogger(logger) {
				console.log("Register logger (id: ", logger.id, ", name: ", logger.name, ")")
				return Promise.resolve()
			},
			$deregisterLogger(resource) {
				console.log("Deregister logger:", resource)
				return Promise.resolve()
			},
			$setVisibility(resource, visible) {
				console.log("Set logger visibility:", { resource, visible })
				return Promise.resolve()
			},
		})
		// MainThreadCommands
		this.rpcProtocol.set(MainContext.MainThreadCommands, {
			$registerCommand(id) {
				console.log("Register command:", id)
			},
			$unregisterCommand(id) {
				console.log("Unregister command:", id)
			},
			$executeCommand(id, ...args) {
				console.log("Execute command:", id, args)
				return Promise.resolve(null)
			},
			$fireCommandActivationEvent(id) {
				console.log("Fire command activation event:", id)
			},
			$getCommands() {
				return Promise.resolve([])
			},
			dispose() {
				console.log("Dispose MainThreadCommands")
			},
		})
		// MainThreadTerminalService
		this.rpcProtocol.set(MainContext.MainThreadTerminalService, {
			$registerProcessSupport(isSupported) {
				console.log("Register process support:", isSupported)
			},
			$createTerminal(extHostTerminalId, config) {
				console.log("Create terminal:", { extHostTerminalId, config })
				return Promise.resolve()
			},
			$dispose(id) {
				console.log("Dispose terminal:", id)
			},
			$hide(id) {
				console.log("Hide terminal:", id)
			},
			$sendText(id, text, shouldExecute) {
				console.log("Send text to terminal:", { id, text, shouldExecute })
			},
			$show(id, preserveFocus) {
				console.log("Show terminal:", { id, preserveFocus })
			},
			$registerProfileProvider(id, extensionIdentifier) {
				console.log("Register profile provider:", { id, extensionIdentifier })
			},
			$unregisterProfileProvider(id) {
				console.log("Unregister profile provider:", id)
			},
			$registerCompletionProvider(id, extensionIdentifier, ...triggerCharacters) {
				console.log("Register completion provider:", { id, extensionIdentifier, triggerCharacters })
			},
			$unregisterCompletionProvider(id) {
				console.log("Unregister completion provider:", id)
			},
			$registerQuickFixProvider(id, extensionIdentifier) {
				console.log("Register quick fix provider:", { id, extensionIdentifier })
			},
			$unregisterQuickFixProvider(id) {
				console.log("Unregister quick fix provider:", id)
			},
			$setEnvironmentVariableCollection(extensionIdentifier, persistent, collection, descriptionMap) {
				console.log("Set environment variable collection:", {
					extensionIdentifier,
					persistent,
					collection,
					descriptionMap,
				})
			},
			$startSendingDataEvents() {
				console.log("Start sending data events")
			},
			$stopSendingDataEvents() {
				console.log("Stop sending data events")
			},
			$startSendingCommandEvents() {
				console.log("Start sending command events")
			},
			$stopSendingCommandEvents() {
				console.log("Stop sending command events")
			},
			$startLinkProvider() {
				console.log("Start link provider")
			},
			$stopLinkProvider() {
				console.log("Stop link provider")
			},
			$sendProcessData(terminalId, data) {
				console.log("Send process data:", { terminalId, data })
			},
			$sendProcessReady(terminalId, pid, cwd, windowsPty) {
				console.log("Send process ready:", { terminalId, pid, cwd, windowsPty })
			},
			$sendProcessProperty(terminalId, property) {
				console.log("Send process property:", { terminalId, property })
			},
			$sendProcessExit(terminalId, exitCode) {
				console.log("Send process exit:", { terminalId, exitCode })
			},
			dispose() {
				console.log("Dispose MainThreadTerminalService")
			},
		})
		// MainThreadWindow
		this.rpcProtocol.set(MainContext.MainThreadWindow, {
			$getInitialState() {
				console.log("Get initial state")
				return Promise.resolve({ isFocused: false, isActive: false })
			},
			$openUri(uri, uriString, options) {
				console.log("Open URI:", { uri, uriString, options })
				return Promise.resolve(true)
			},
			$asExternalUri(uri, options) {
				console.log("As external URI:", { uri, options })
				return Promise.resolve(uri)
			},
			dispose() {
				console.log("Dispose MainThreadWindow")
			},
		})
		// MainThreadSearch
		this.rpcProtocol.set(MainContext.MainThreadSearch, {
			$registerFileSearchProvider(handle, scheme) {
				console.log("Register file search provider:", { handle, scheme })
			},
			$registerAITextSearchProvider(handle, scheme) {
				console.log("Register AI text search provider:", { handle, scheme })
			},
			$registerTextSearchProvider(handle, scheme) {
				console.log("Register text search provider:", { handle, scheme })
			},
			$unregisterProvider(handle) {
				console.log("Unregister provider:", handle)
			},
			$handleFileMatch(handle, session, data) {
				console.log("Handle file match:", { handle, session, data })
			},
			$handleTextMatch(handle, session, data) {
				console.log("Handle text match:", { handle, session, data })
			},
			$handleTelemetry(eventName, data) {
				console.log("Handle telemetry:", { eventName, data })
			},
			dispose() {
				console.log("Dispose MainThreadSearch")
			},
		})
		// MainThreadTask
		this.rpcProtocol.set(MainContext.MainThreadTask, {
			$createTaskId(task) {
				console.log("Create task ID:", task)
				return Promise.resolve("task-id")
			},
			$registerTaskProvider(handle, type) {
				console.log("Register task provider:", { handle, type })
				return Promise.resolve()
			},
			$unregisterTaskProvider(handle) {
				console.log("Unregister task provider:", handle)
				return Promise.resolve()
			},
			$fetchTasks(filter) {
				console.log("Fetch tasks:", filter)
				return Promise.resolve([])
			},
			$getTaskExecution(value) {
				console.log("Get task execution:", value)
				return Promise.resolve(null)
			},
			$executeTask(task) {
				console.log("Execute task:", task)
				return Promise.resolve(null)
			},
			$terminateTask(id) {
				console.log("Terminate task:", id)
				return Promise.resolve()
			},
			$registerTaskSystem(scheme, info) {
				console.log("Register task system:", { scheme, info })
			},
			$customExecutionComplete(id, result) {
				console.log("Custom execution complete:", { id, result })
				return Promise.resolve()
			},
			$registerSupportedExecutions(custom, shell, process) {
				console.log("Register supported executions:", { custom, shell, process })
				return Promise.resolve()
			},
			dispose() {
				console.log("Dispose MainThreadTask")
			},
		})
		// MainThreadConfiguration
		this.rpcProtocol.set(MainContext.MainThreadConfiguration, {
			$updateConfigurationOption(target, key, value, overrides, scopeToLanguage) {
				console.log("Update configuration option:", { target, key, value, overrides, scopeToLanguage })
				return Promise.resolve()
			},
			$removeConfigurationOption(target, key, overrides, scopeToLanguage) {
				console.log("Remove configuration option:", { target, key, overrides, scopeToLanguage })
				return Promise.resolve()
			},
			dispose() {
				console.log("Dispose MainThreadConfiguration")
			},
		})
		// MainThreadFileSystem
		this.rpcProtocol.set(MainContext.MainThreadFileSystem, {
			async $registerFileSystemProvider(handle, scheme, capabilities, readonlyMessage) {
				console.log("Register file system provider:", { handle, scheme, capabilities, readonlyMessage })
			},
			$unregisterProvider(handle) {
				console.log("Unregister provider:", handle)
			},
			$onFileSystemChange(handle, resource) {
				console.log("File system change:", { handle, resource })
			},
			async $stat(resource) {
				console.log("Stat:", resource)
				try {
					const filePath = this.uriToPath(resource)
					const stats = await fsStat(filePath)
					return {
						type: this.getFileType(stats),
						ctime: stats.birthtimeMs,
						mtime: stats.mtimeMs,
						size: stats.size,
						permissions: stats.mode & 0o444 ? FilePermission.Readonly : undefined,
					}
				} catch (error) {
					console.error("Error in $stat:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $readdir(resource) {
				console.log("Read directory:", resource)
				try {
					const filePath = this.uriToPath(resource)
					const entries = await fsReadDir(filePath, { withFileTypes: true })
					return entries.map((entry) => {
						let type = FileType.Unknown
						if (entry.isFile()) {
							type = FileType.File
						} else if (entry.isDirectory()) {
							type = FileType.Directory
						}
						// Check if it's a symbolic link
						if (entry.isSymbolicLink()) {
							type |= FileType.SymbolicLink
						}
						return [entry.name, type]
					})
				} catch (error) {
					console.error("Error in $readdir:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $readFile(resource) {
				console.log("Read file:", resource)
				try {
					const filePath = this.uriToPath(resource)
					const buffer = await fsReadFile(filePath)
					return VSBuffer.wrap(buffer)
				} catch (error) {
					console.error("Error in $readFile:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $writeFile(resource, content) {
				console.log("Write file:", { resource, content })
				try {
					const filePath = this.uriToPath(resource)
					const buffer = content instanceof VSBuffer ? content.buffer : content
					await fsWriteFile(filePath, buffer)
				} catch (error) {
					console.error("Error in $writeFile:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $rename(resource, target, opts) {
				console.log("Rename:", { resource, target, opts })
				try {
					const sourcePath = this.uriToPath(resource)
					const targetPath = this.uriToPath(target)
					// Check if target exists and handle overwrite option
					if (opts.overwrite) {
						try {
							await fsUnlink(targetPath)
						} catch (error) {
							// Ignore error if file doesn't exist
						}
					}
					await fsRename(sourcePath, targetPath)
				} catch (error) {
					console.error("Error in $rename:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $copy(resource, target, opts) {
				console.log("Copy:", { resource, target, opts })
				try {
					const sourcePath = this.uriToPath(resource)
					const targetPath = this.uriToPath(target)
					// Check if target exists and handle overwrite option
					if (opts.overwrite) {
						try {
							await fsUnlink(targetPath)
						} catch (error) {
							// Ignore error if file doesn't exist
						}
					}
					await fsCopyFile(sourcePath, targetPath)
				} catch (error) {
					console.error("Error in $copy:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $mkdir(resource) {
				console.log("Make directory:", resource)
				try {
					const dirPath = this.uriToPath(resource)
					await fsMkdir(dirPath, { recursive: true })
				} catch (error) {
					console.error("Error in $mkdir:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $delete(resource, opts) {
				console.log("Delete:", { resource, opts })
				try {
					const filePath = this.uriToPath(resource)
					// Check if it's a directory
					const stats = await fsLstat(filePath)
					if (stats.isDirectory()) {
						// For directories, we need to implement recursive deletion
						// This is a simplified version
						await fs.promises.rm(filePath, { recursive: true })
					} else {
						await fsUnlink(filePath)
					}
				} catch (error) {
					console.error("Error in $delete:", error)
					throw this.handleFileSystemError(error)
				}
			},
			async $ensureActivation(scheme) {
				console.log("Ensure activation:", scheme)
				// No-op implementation
				return Promise.resolve()
			},
			dispose() {
				console.log("Dispose MainThreadFileSystem")
			},
			// Helper methods
			uriToPath(uri) {
				// Convert URI to file path
				// This is a simplified implementation
				if (uri.scheme !== "file") {
					throw new Error(`Unsupported URI scheme: ${uri.scheme}`)
				}
				// Handle Windows paths
				let filePath = uri.path || ""
				if (process.platform === "win32" && filePath.startsWith("/")) {
					filePath = filePath.substring(1)
				}
				return filePath
			},
			getFileType(stats) {
				let type = FileType.Unknown
				if (stats.isFile()) {
					type = FileType.File
				} else if (stats.isDirectory()) {
					type = FileType.Directory
				}
				// Check if it's a symbolic link
				if (stats.isSymbolicLink()) {
					type |= FileType.SymbolicLink
				}
				return type
			},
			handleFileSystemError(error) {
				// Map Node.js errors to VSCode file system errors
				if (error.code === "ENOENT") {
					const err = new Error(error.message)
					err.name = FileSystemProviderErrorCode.FileNotFound
					return err
				} else if (error.code === "EACCES" || error.code === "EPERM") {
					const err = new Error(error.message)
					err.name = FileSystemProviderErrorCode.NoPermissions
					return err
				} else if (error.code === "EEXIST") {
					const err = new Error(error.message)
					err.name = FileSystemProviderErrorCode.FileExists
					return err
				} else if (error.code === "EISDIR") {
					const err = new Error(error.message)
					err.name = FileSystemProviderErrorCode.FileIsADirectory
					return err
				} else if (error.code === "ENOTDIR") {
					const err = new Error(error.message)
					err.name = FileSystemProviderErrorCode.FileNotADirectory
					return err
				}
				// Default error
				return error
			},
		})
		// MainThreadLanguageModelTools
		this.rpcProtocol.set(MainContext.MainThreadLanguageModelTools, {
			$getTools() {
				console.log("Getting language model tools")
				return Promise.resolve([])
			},
			$invokeTool(dto, token) {
				console.log("Invoking language model tool:", dto)
				return Promise.resolve({})
			},
			$countTokensForInvocation(callId, input, token) {
				console.log("Counting tokens for invocation:", { callId, input })
				return Promise.resolve(0)
			},
			$registerTool(id) {
				console.log("Registering language model tool:", id)
			},
			$unregisterTool(name) {
				console.log("Unregistering language model tool:", name)
			},
			dispose() {
				console.log("Disposing MainThreadLanguageModelTools")
			},
		})
	}
	// Protocols needed for general extension loading process
	setupExtensionRequiredProtocols() {
		if (!this.rpcProtocol) {
			return
		}
		this.rpcProtocol.set(MainContext.MainThreadExtensionService, {
			$getExtension: async (extensionId) => {
				console.log(`Getting extension: ${extensionId}`)
				return this.extensionManager.getExtensionDescription(extensionId)
			},
			$activateExtension: async (extensionId, reason) => {
				console.log(`Activating extension ${extensionId.value} with reason:`, reason)
				await this.extensionManager.activateExtension(extensionId.value, this.rpcProtocol)
			},
			$onWillActivateExtension: async (extensionId) => {
				console.log(`Extension ${extensionId.value} will be activated`)
			},
			$onDidActivateExtension: (
				extensionId,
				codeLoadingTime,
				activateCallTime,
				activateResolvedTime,
				activationReason,
			) => {
				console.log(`Extension ${extensionId.value} was activated with reason:`, activationReason)
			},
			$onExtensionActivationError: async (extensionId, error, missingExtensionDependency) => {
				console.error(`Extension ${extensionId.value} activation error:`, error)
			},
			$onExtensionRuntimeError: (extensionId, error) => {
				console.error(`Extension ${extensionId.value} runtime error:`, error)
			},
			$setPerformanceMarks: async (marks) => {
				console.log("Setting performance marks:", marks)
			},
			$asBrowserUri: async (uri) => {
				console.log("Converting to browser URI:", uri)
				return uri
			},
			dispose: () => {
				console.log("Disposing MainThreadExtensionService")
			},
		})
		this.rpcProtocol.set(MainContext.MainThreadTelemetry, {
			$publicLog(eventName, data) {
				console.log(`[Telemetry] ${eventName}`, data)
			},
			$publicLog2(eventName, data) {
				console.log(`[Telemetry] ${eventName}`, data)
			},
			dispose() {
				console.log("Disposing MainThreadTelemetry")
			},
		})
		this.rpcProtocol.set(MainContext.MainThreadDebugService, {
			$registerDebugTypes(debugTypes) {
				console.log("Register debug types:", debugTypes)
			},
			$sessionCached(sessionID) {
				console.log("Session cached:", sessionID)
			},
			$acceptDAMessage(handle, message) {
				console.log("Accept debug adapter message:", { handle, message })
			},
			$acceptDAError(handle, name, message, stack) {
				console.error("Debug adapter error:", { handle, name, message, stack })
			},
			$acceptDAExit(handle, code, signal) {
				console.log("Debug adapter exit:", { handle, code, signal })
			},
			async $registerDebugConfigurationProvider(
				type,
				triggerKind,
				hasProvideMethod,
				hasResolveMethod,
				hasResolve2Method,
				handle,
			) {
				console.log("Register debug configuration provider:", {
					type,
					triggerKind,
					hasProvideMethod,
					hasResolveMethod,
					hasResolve2Method,
					handle,
				})
			},
			async $registerDebugAdapterDescriptorFactory(type, handle) {
				console.log("Register debug adapter descriptor factory:", { type, handle })
			},
			$unregisterDebugConfigurationProvider(handle) {
				console.log("Unregister debug configuration provider:", handle)
			},
			$unregisterDebugAdapterDescriptorFactory(handle) {
				console.log("Unregister debug adapter descriptor factory:", handle)
			},
			async $startDebugging(folder, nameOrConfig, options) {
				console.log("Start debugging:", { folder, nameOrConfig, options })
				return true
			},
			async $stopDebugging(sessionId) {
				console.log("Stop debugging:", sessionId)
			},
			$setDebugSessionName(id, name) {
				console.log("Set debug session name:", { id, name })
			},
			async $customDebugAdapterRequest(id, command, args) {
				console.log("Custom debug adapter request:", { id, command, args })
				return null
			},
			async $getDebugProtocolBreakpoint(id, breakpoinId) {
				console.log("Get debug protocol breakpoint:", { id, breakpoinId })
				return undefined
			},
			$appendDebugConsole(value) {
				console.log("Debug console:", value)
			},
			async $registerBreakpoints(breakpoints) {
				console.log("Register breakpoints:", breakpoints)
			},
			async $unregisterBreakpoints(breakpointIds, functionBreakpointIds, dataBreakpointIds) {
				console.log("Unregister breakpoints:", { breakpointIds, functionBreakpointIds, dataBreakpointIds })
			},
			$registerDebugVisualizer(extensionId, id) {
				console.log("Register debug visualizer:", { extensionId, id })
			},
			$unregisterDebugVisualizer(extensionId, id) {
				console.log("Unregister debug visualizer:", { extensionId, id })
			},
			$registerDebugVisualizerTree(treeId, canEdit) {
				console.log("Register debug visualizer tree:", { treeId, canEdit })
			},
			$unregisterDebugVisualizerTree(treeId) {
				console.log("Unregister debug visualizer tree:", treeId)
			},
			$registerCallHierarchyProvider(handle, supportsResolve) {
				console.log("Register call hierarchy provider:", { handle, supportsResolve })
			},
			dispose() {
				console.log("Disposing MainThreadDebugService")
			},
		})
	}
	setupRooCodeRequiredProtocols() {
		if (!this.rpcProtocol) {
			return
		}
		// MainThreadTextEditors
		this.rpcProtocol.set(MainContext.MainThreadTextEditors, {
			$tryShowTextDocument(resource, options) {
				console.log("Try show text document:", { resource, options })
				return Promise.resolve(undefined)
			},
			$tryShowEditor(id, position) {
				console.log("Try show editor:", { id, position })
				return Promise.resolve()
			},
			$tryHideEditor(id) {
				console.log("Try hide editor:", id)
				return Promise.resolve()
			},
			$trySetSelections(id, selections) {
				console.log("Try set selections:", { id, selections })
				return Promise.resolve()
			},
			$tryRevealRange(id, range, revealType) {
				console.log("Try reveal range:", { id, range, revealType })
				return Promise.resolve()
			},
			$trySetOptions(id, options) {
				console.log("Try set options:", { id, options })
				return Promise.resolve()
			},
			$tryApplyEdits(id, modelVersionId, edits, opts) {
				console.log("Try apply edits:", { id, modelVersionId, edits, opts })
				return Promise.resolve(true)
			},
			$registerTextEditorDecorationType(extensionId, key, options) {
				console.log("Register text editor decoration type:", { extensionId, key, options })
			},
			$removeTextEditorDecorationType(key) {
				console.log("Remove text editor decoration type:", key)
			},
			$trySetDecorations(id, key, ranges) {
				console.log("Try set decorations:", { id, key, ranges })
				return Promise.resolve()
			},
			$trySetDecorationsFast(id, key, ranges) {
				console.log("Try set decorations fast:", { id, key, ranges })
				return Promise.resolve()
			},
			$tryInsertSnippet(id, snippet, location, options) {
				console.log("Try insert snippet:", { id, snippet, location, options })
				return Promise.resolve(true)
			},
			$getDiffInformation(id) {
				console.log("Get diff information:", id)
				return Promise.resolve(null)
			},
			dispose() {
				console.log("Dispose MainThreadTextEditors")
			},
		})
		// MainThreadStorage
		this.rpcProtocol.set(MainContext.MainThreadStorage, {
			$initializeExtensionStorage(shared, extensionId) {
				console.log("Initialize extension storage:", { shared, extensionId })
				return Promise.resolve(undefined)
			},
			$setValue(shared, extensionId, value) {
				console.log("Set value:", { shared, extensionId, value })
				return Promise.resolve()
			},
			$registerExtensionStorageKeysToSync(extension, keys) {
				console.log("Register extension storage keys to sync:", { extension, keys })
			},
			dispose() {
				console.log("Dispose MainThreadStorage")
			},
		})
		// MainThreadOutputService
		this.rpcProtocol.set(MainContext.MainThreadOutputService, {
			$register(label, file, languageId, extensionId) {
				console.log("Register output channel:", { label, file, languageId, extensionId })
				return Promise.resolve(`output-${extensionId}-${label}`)
			},
			$update(channelId, mode, till) {
				console.log("Update output channel:", { channelId, mode, till })
				return Promise.resolve()
			},
			$reveal(channelId, preserveFocus) {
				console.log("Reveal output channel:", { channelId, preserveFocus })
				return Promise.resolve()
			},
			$close(channelId) {
				console.log("Close output channel:", channelId)
				return Promise.resolve()
			},
			$dispose(channelId) {
				console.log("Dispose output channel:", channelId)
				return Promise.resolve()
			},
			dispose() {
				console.log("Dispose MainThreadOutputService")
			},
		})
		// Create a single WebViewManager instance
		const webViewManager = new WebViewManager(this.rpcProtocol)
		// MainThreadWebviewViews
		this.rpcProtocol.set(MainContext.MainThreadWebviewViews, webViewManager)
		// MainThreadDocumentContentProviders
		this.rpcProtocol.set(MainContext.MainThreadDocumentContentProviders, {
			$registerTextContentProvider(handle, scheme) {
				console.log("Register text content provider:", { handle, scheme })
			},
			$unregisterTextContentProvider(handle) {
				console.log("Unregister text content provider:", handle)
			},
			$onVirtualDocumentChange(uri, value) {
				console.log("Virtual document change:", { uri, value })
				return Promise.resolve()
			},
			dispose() {
				console.log("Dispose MainThreadDocumentContentProviders")
			},
		})
		// MainThreadUrls
		this.rpcProtocol.set(MainContext.MainThreadUrls, {
			$registerUriHandler(handle, extensionId, extensionDisplayName) {
				console.log("Register URI handler:", { handle, extensionId, extensionDisplayName })
				return Promise.resolve()
			},
			$unregisterUriHandler(handle) {
				console.log("Unregister URI handler:", handle)
				return Promise.resolve()
			},
			$createAppUri(uri) {
				console.log("Create app URI:", uri)
				return Promise.resolve(uri)
			},
			dispose() {
				console.log("Dispose MainThreadUrls")
			},
		})
		// MainThreadWebviews
		this.rpcProtocol.set(MainContext.MainThreadWebviews, webViewManager)
	}
	getRPCProtocol() {
		return this.rpcProtocol
	}
}
