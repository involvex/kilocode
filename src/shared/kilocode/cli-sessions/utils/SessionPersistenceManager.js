import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs"
import path from "path"
export class SessionPersistenceManager {
	pathProvider
	workspaceDir = null
	constructor(pathProvider) {
		this.pathProvider = pathProvider
	}
	setWorkspaceDir(dir) {
		this.workspaceDir = dir
	}
	getSessionStatePath() {
		if (!this.workspaceDir) {
			return null
		}
		return this.pathProvider.getSessionFilePath(this.workspaceDir)
	}
	readWorkspaceState() {
		const statePath = this.getSessionStatePath()
		if (!statePath || !existsSync(statePath)) {
			return { taskSessionMap: {} }
		}
		const content = readFileSync(statePath, "utf-8")
		const data = JSON.parse(content)
		return {
			lastSession: data.lastSession,
			taskSessionMap: data.taskSessionMap || {},
		}
	}
	writeWorkspaceState(state) {
		const statePath = this.getSessionStatePath()
		if (!statePath) {
			return
		}
		const stateDir = path.dirname(statePath)
		mkdirSync(stateDir, { recursive: true })
		writeFileSync(statePath, JSON.stringify(state, null, 2))
	}
	getLastSession() {
		const state = this.readWorkspaceState()
		return state.lastSession
	}
	setLastSession(sessionId) {
		const state = this.readWorkspaceState()
		state.lastSession = { sessionId, timestamp: Date.now() }
		this.writeWorkspaceState(state)
	}
	getTaskSessionMap() {
		const state = this.readWorkspaceState()
		return state.taskSessionMap
	}
	setTaskSessionMap(taskSessionMap) {
		const state = this.readWorkspaceState()
		state.taskSessionMap = taskSessionMap
		this.writeWorkspaceState(state)
	}
	getSessionForTask(taskId) {
		const taskSessionMap = this.getTaskSessionMap()
		return taskSessionMap[taskId]
	}
	setSessionForTask(taskId, sessionId) {
		const state = this.readWorkspaceState()
		state.taskSessionMap[taskId] = sessionId
		this.writeWorkspaceState(state)
	}
}
//# sourceMappingURL=SessionPersistenceManager.js.map
