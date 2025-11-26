// Copyright 2009-2025 Weibo, Inc.
// SPDX-FileCopyrightText: 2025 Weibo, Inc.
//
// SPDX-License-Identifier: Apache-2.0

import { fork } from "child_process"
import * as path from "path"
import * as net from "net"
import { VSBuffer } from "../deps/vscode/src/vs/base/common/buffer.js"
import { NodeSocket } from "../deps/vscode/src/vs/base/parts/ipc/node/ipc.net.js"
import {
	PersistentProtocol,
	SocketCloseEvent,
	SocketCloseEventType,
} from "../deps/vscode/src/vs/base/parts/ipc/common/ipc.net.js"
import { DEBUG_PORT } from "./config.js"
import {
	MessageType,
	createMessageOfType,
	isMessageOfType,
	UIKind,
	IExtensionHostInitData,
} from "../deps/vscode/src/vs/workbench/services/extensions/common/extensionHostProtocol.js"
import { IDisposable } from "../deps/vscode/src/vs/base/common/lifecycle.js"
import { URI } from "../deps/vscode/src/vs/base/common/uri.js"
import { RPCManager } from "./rpcManager.js"
import { ExtensionManager } from "./extensionManager.js"

// Create ExtensionManager instance and register extension
const extensionManager = new ExtensionManager()
const rooCodeIdentifier = extensionManager.registerExtension("kilocode").identifier

// Declare extension host process variables
let extHostProcess: ReturnType<typeof fork>
let protocol: PersistentProtocol | null = null
let rpcManager: RPCManager | null = null

// Create socket server
const server = net.createServer((socket) => {
	console.log("Someone connected to main server")

	// Set socket noDelay option
	socket.setNoDelay(true)

	// Wrap socket with NodeSocket
	const nodeSocket = new NodeSocket(socket)

	// Listen for NodeSocket close events
	const closeDisposable: IDisposable = nodeSocket.onClose((event: SocketCloseEvent | undefined) => {
		console.log("NodeSocket close event received")
		if (event?.type === SocketCloseEventType.NodeSocketCloseEvent) {
			if (event.hadError) {
				console.error("Socket closed with error:", event.error)
			} else {
				console.log("Socket closed normally")
			}
		}
		// DEBUG: Delay disposal to ensure proper cleanup
		setTimeout(() => {
			try {
				closeDisposable.dispose()
			} catch (error) {
				console.error("Error disposing closeDisposable:", error)
			}
		}, 100)
	})

	// Create PersistentProtocol instance
	protocol = new PersistentProtocol({
		socket: nodeSocket,
		initialChunk: null,
	})

	// Set protocol message handler
	protocol.onMessage((message: any) => {
		console.log("Received protocol message:", {
			type: message?.type,
			channel: message?.channel,
			sequel: message?.sequel,
		})

		if (isMessageOfType(message, MessageType.Ready)) {
			console.log("Extension host is ready - sending initialization data")
			// Send initialization data
			const initData: IExtensionHostInitData = {
				commit: "development",
				version: "1.0.0",
				quality: undefined,
				parentPid: process.pid,
				environment: {
					isExtensionDevelopmentDebug: false,
					appName: "VSCodeAPIHook",
					appHost: "node",
					appLanguage: "en",
					appUriScheme: "vscode",
					appRoot: URI.file(__dirname),
					globalStorageHome: URI.file(path.join(__dirname, "globalStorage")),
					workspaceStorageHome: URI.file(path.join(__dirname, "workspaceStorage")),
					extensionDevelopmentLocationURI: undefined,
					extensionTestsLocationURI: undefined,
					useHostProxy: false,
					skipWorkspaceStorageLock: false,
					isExtensionTelemetryLoggingOnly: false,
				},
				workspace: {
					id: "development-workspace",
					name: "Development Workspace",
					transient: false,
					configuration: null,
					isUntitled: false,
				},
				remote: {
					authority: undefined,
					connectionData: null,
					isRemote: false,
				},
				extensions: {
					versionId: 1,
					allExtensions: extensionManager.getAllExtensionDescriptions(),
					myExtensions: extensionManager.getAllExtensionDescriptions().map((ext) => ext.identifier),
					activationEvents: extensionManager.getAllExtensionDescriptions().reduce(
						(events, ext) => {
							if (ext.activationEvents) {
								events[ext.identifier.value] = ext.activationEvents
							}
							return events
						},
						{} as { [extensionId: string]: string[] },
					),
				},
				telemetryInfo: {
					sessionId: "development-session",
					machineId: "development-machine",
					sqmId: "",
					devDeviceId: "",
					firstSessionDate: new Date().toISOString(),
					msftInternal: false,
				},
				logLevel: 0, // Info level
				loggers: [],
				logsLocation: URI.file(path.join(__dirname, "logs")),
				autoStart: true,
				consoleForward: {
					includeStack: false,
					logNative: false,
				},
				uiKind: UIKind.Desktop,
			}
			console.log("Sending initialization data to extension host...")
			try {
				const initDataString = JSON.stringify(initData)
				console.log("Init data size:", initDataString.length, "bytes")
				const buffer = VSBuffer.fromString(initDataString)
				protocol?.send(buffer)
				console.log("Initialization data sent successfully")
			} catch (error) {
				console.error("Failed to send initialization data:", error)
			}
		} else if (isMessageOfType(message, MessageType.Initialized)) {
			console.log("Extension host initialized")
			// Create RPCManager instance
			console.log("Creating RPCManager instance...")
			rpcManager = new RPCManager(protocol!, extensionManager)
			console.log("RPCManager created successfully")

			console.log("Starting RPCManager initialization...")
			rpcManager.startInitialize()
			console.log("RPCManager initialization started")

			// Activate rooCode plugin
			console.log("Attempting to get RPCProtocol...")
			const rpcProtocol = rpcManager.getRPCProtocol()

			if (rpcProtocol) {
				console.log("RPCProtocol obtained successfully, activating extension...")
				extensionManager
					.activateExtension(rooCodeIdentifier.value, rpcProtocol)
					.then(() => {
						console.log("Extension activation completed successfully")
					})
					.catch((error: Error) => {
						console.error("Failed to load rooCode plugin:", error)
						console.error("Error stack:", error.stack)
					})
			} else {
				console.error("Failed to get RPCProtocol from RPCManager")
			}
		}
	})
})

function startExtensionHostProcess() {
	process.env.VSCODE_DEBUG = "true"
	let nodeOptions = process.env.VSCODE_DEBUG ? `--inspect-brk=9229` : `--inspect=${DEBUG_PORT}`
	console.log("will start extension host process with options:", nodeOptions)

	const serverAddress = server.address() as net.AddressInfo
	const port = serverAddress?.port?.toString() || "0"
	console.log("Server address info:", {
		address: serverAddress?.address,
		port: serverAddress?.port,
		family: serverAddress?.family,
	})
	console.log("Will pass port to extension host:", port)

	// Create extension host process and pass environment variables
	extHostProcess = fork(path.join(__dirname, "extension.js"), [], {
		env: {
			...process.env,
			VSCODE_EXTHOST_WILL_SEND_SOCKET: "1",
			VSCODE_EXTHOST_SOCKET_HOST: "127.0.0.1",
			VSCODE_EXTHOST_SOCKET_PORT: port,
			NODE_OPTIONS: nodeOptions,
		},
	})

	console.log("Extension host process spawned with PID:", extHostProcess.pid)

	// Handle extension host process exit
	extHostProcess.on("exit", (code: number | null, signal: string | null) => {
		console.log(`Extension host process exited with code ${code} and signal ${signal}`)
		server.close()
	})

	// Handle extension host process errors
	extHostProcess.on("error", (error: Error) => {
		console.error("Extension host process error:", error)
	})

	// Log process output
	extHostProcess.stdout?.on("data", (data: Buffer) => {
		console.log(`[ExtensionHost STDOUT]: ${data.toString().trim()}`)
	})

	extHostProcess.stderr?.on("data", (data: Buffer) => {
		console.error(`[ExtensionHost STDERR]: ${data.toString().trim()}`)
	})
}

// Listen on random port
server.listen(0, "127.0.0.1", () => {
	const address = server.address()
	if (address && typeof address !== "string") {
		console.log(`Server listening on port ${address.port}`)
		console.log("About to start extension host process...")
		startExtensionHostProcess()
	} else {
		console.error("Server address is invalid:", address)
	}
})

// Add server error logging
server.on("error", (error: Error) => {
	console.error("Server error:", error)
})

// Add server connection logging
server.on("connection", (socket) => {
	console.log("New client connection established")
})

// Handle process exit
process.on("SIGINT", () => {
	console.log("Cleaning up...")
	if (protocol) {
		protocol.send(createMessageOfType(MessageType.Terminate))
	}
	server.close()
	if (extHostProcess) {
		extHostProcess.kill()
	}
	process.exit(0)
})
