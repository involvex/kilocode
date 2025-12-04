import type { IPathProvider } from "../types/IPathProvider.js"
export declare class SessionPersistenceManager {
	private pathProvider
	private workspaceDir
	constructor(pathProvider: IPathProvider)
	setWorkspaceDir(dir: string): void
	private getSessionStatePath
	private readWorkspaceState
	private writeWorkspaceState
	getLastSession():
		| {
				sessionId: string
				timestamp: number
		  }
		| undefined
	setLastSession(sessionId: string): void
	getTaskSessionMap(): Record<string, string>
	setTaskSessionMap(taskSessionMap: Record<string, string>): void
	getSessionForTask(taskId: string): string | undefined
	setSessionForTask(taskId: string, sessionId: string): void
}
//# sourceMappingURL=SessionPersistenceManager.d.ts.map
