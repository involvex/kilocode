import * as path from "path"
import { createHash } from "crypto"
import { existsSync, mkdirSync } from "fs"
export class ExtensionPathProvider {
	globalStoragePath
	constructor(context) {
		this.globalStoragePath = context.globalStorageUri.fsPath
		this.ensureDirectories()
	}
	ensureDirectories() {
		const sessionsDir = path.join(this.globalStoragePath, "sessions")
		const tasksDir = this.getTasksDir()
		const workspacesDir = path.join(sessionsDir, "workspaces")
		for (const dir of [sessionsDir, tasksDir, workspacesDir]) {
			if (!existsSync(dir)) {
				mkdirSync(dir, { recursive: true })
			}
		}
	}
	getTasksDir() {
		return path.join(this.globalStoragePath, "sessions", "tasks")
	}
	getSessionFilePath(workspaceDir) {
		const hash = createHash("sha256").update(workspaceDir).digest("hex").substring(0, 16)
		const workspacesDir = path.join(this.globalStoragePath, "sessions", "workspaces")
		const workspaceSessionDir = path.join(workspacesDir, hash)
		if (!existsSync(workspaceSessionDir)) {
			mkdirSync(workspaceSessionDir, { recursive: true })
		}
		return path.join(workspaceSessionDir, "session.json")
	}
}
//# sourceMappingURL=ExtensionPathProvider.js.map
