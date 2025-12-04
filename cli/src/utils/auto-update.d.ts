import { CliMessage } from "../types/cli.js"
type AutoUpdateStatus = {
	name: string
	isOutdated: boolean
	currentVersion: string
	latestVersion: string
}
export declare const getAutoUpdateStatus: () => Promise<{
	name: string
	isOutdated: boolean
	currentVersion: string
	latestVersion: string
}>
export declare const generateUpdateAvailableMessage: (status: AutoUpdateStatus) => CliMessage
export {}
//# sourceMappingURL=auto-update.d.ts.map
