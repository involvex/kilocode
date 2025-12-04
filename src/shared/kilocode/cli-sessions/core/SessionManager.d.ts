import type { IPathProvider } from "../types/IPathProvider.js"
import type { ILogger } from "../types/ILogger.js"
import type { IExtensionMessenger } from "../types/IExtensionMessenger.js"
import { SessionClient } from "./SessionClient.js"
import type { ClineMessage } from "@roo-code/types"
import { TrpcClientDependencies } from "./TrpcClient.js"
declare const defaultPaths: {
	apiConversationHistoryPath: null | string
	uiMessagesPath: null | string
	taskMetadataPath: null | string
}
interface SessionCreatedMessage {
	sessionId: string
	timestamp: number
	event: "session_created"
}
export interface SessionManagerDependencies extends TrpcClientDependencies {
	platform: string
	pathProvider: IPathProvider
	logger: ILogger
	extensionMessenger: IExtensionMessenger
	onSessionCreated?: (message: SessionCreatedMessage) => void
	onSessionRestored?: () => void
}
export declare class SessionManager {
	static readonly SYNC_INTERVAL = 3000
	private static instance
	static init(dependencies?: SessionManagerDependencies): SessionManager
	private paths
	sessionId: string | null
	private workspaceDir
	private currentTaskId
	private sessionTitle
	private sessionGitUrl
	private timer
	private blobHashes
	private lastSyncedBlobHashes
	private isSyncing
	private readonly pathProvider
	private readonly logger
	private readonly extensionMessenger
	private readonly sessionPersistenceManager
	readonly sessionClient: SessionClient
	private readonly onSessionCreated
	private readonly onSessionRestored
	private readonly platform
	private constructor()
	private startTimer
	setPath(taskId: string, key: keyof typeof defaultPaths, value: string): void
	setWorkspaceDirectory(dir: string): void
	restoreLastSession(): Promise<boolean>
	restoreSession(sessionId: string, rethrowError?: boolean): Promise<void>
	shareSession(): Promise<import("./SessionClient.js").ShareSessionOutput>
	renameSession(newTitle: string): Promise<void>
	forkSession(shareOrSessionId: string, rethrowError?: boolean): Promise<void>
	destroy(): Promise<void>
	private syncSession
	private readPath
	private readPaths
	private fetchBlobFromSignedUrl
	private pathKeyToBlobKey
	private updateBlobHash
	private hasBlobChanged
	private hasAnyBlobChanged
	private markBlobSynced
	private hashGitState
	private createDefaultBlobHashes
	private resetBlobHashes
	private getGitState
	private executeGitRestore
	getFirstMessageText(uiMessages: ClineMessage[], truncate?: boolean): string | null
	generateTitle(uiMessages: ClineMessage[]): Promise<string | null>
}
export {}
//# sourceMappingURL=SessionManager.d.ts.map
