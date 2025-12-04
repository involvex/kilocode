import { KiloCodePaths } from "../utils/paths.js"
export class KiloCodePathProvider {
	getTasksDir() {
		return KiloCodePaths.getTasksDir()
	}
	getSessionFilePath(workspaceDir) {
		return KiloCodePaths.getSessionFilePath(workspaceDir)
	}
}
export class ExtensionMessengerAdapter {
	extensionService
	constructor(extensionService) {
		this.extensionService = extensionService
	}
	async sendWebviewMessage(message) {
		return this.extensionService.sendWebviewMessage(message)
	}
	async requestSingleCompletion(prompt, timeoutMs) {
		return this.extensionService.requestSingleCompletion(prompt, timeoutMs)
	}
}
