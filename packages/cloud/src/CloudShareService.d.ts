import type { SettingsService, ShareResponse, ShareVisibility } from "@roo-code/types"
import type { CloudAPI } from "./CloudAPI.js"
export declare class CloudShareService {
	private cloudAPI
	private settingsService
	private log
	constructor(cloudAPI: CloudAPI, settingsService: SettingsService, log?: (...args: unknown[]) => void)
	shareTask(taskId: string, visibility?: ShareVisibility): Promise<ShareResponse>
	canShareTask(): Promise<boolean>
}
//# sourceMappingURL=CloudShareService.d.ts.map
