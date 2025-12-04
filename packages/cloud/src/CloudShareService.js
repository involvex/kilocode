import { importVscode } from "./importVscode.js"
export class CloudShareService {
	cloudAPI
	settingsService
	log
	constructor(cloudAPI, settingsService, log) {
		this.cloudAPI = cloudAPI
		this.settingsService = settingsService
		this.log = log || console.log
	}
	async shareTask(taskId, visibility = "organization") {
		try {
			const response = await this.cloudAPI.shareTask(taskId, visibility)
			if (response.success && response.shareUrl) {
				const vscode = await importVscode()
				if (vscode?.env?.clipboard?.writeText) {
					try {
						await vscode.env.clipboard.writeText(response.shareUrl)
					} catch (copyErr) {
						this.log("[ShareService] Clipboard write failed (non-fatal):", copyErr)
					}
				} else {
					this.log("[ShareService] VS Code clipboard unavailable; running outside extension host.")
				}
			}
			return response
		} catch (error) {
			this.log("[ShareService] Error sharing task:", error)
			throw error
		}
	}
	async canShareTask() {
		try {
			return !!this.settingsService.getSettings()?.cloudSettings?.enableTaskSharing
		} catch (error) {
			this.log("[ShareService] Error checking if task can be shared:", error)
			return false
		}
	}
}
