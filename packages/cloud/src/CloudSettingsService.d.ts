import EventEmitter from "events"
import type { ExtensionContext } from "vscode"
import {
	type SettingsService,
	type SettingsServiceEvents,
	type AuthService,
	type UserFeatures,
	type UserSettingsConfig,
	type UserSettingsData,
	OrganizationAllowList,
	OrganizationSettings,
} from "@roo-code/types"
export declare class CloudSettingsService extends EventEmitter<SettingsServiceEvents> implements SettingsService {
	private context
	private authService
	private settings
	private userSettings
	private timer
	private log
	constructor(context: ExtensionContext, authService: AuthService, log?: (...args: unknown[]) => void)
	initialize(): Promise<void>
	private fetchSettings
	private cacheSettings
	private loadCachedSettings
	getAllowList(): OrganizationAllowList
	getSettings(): OrganizationSettings | undefined
	getUserSettings(): UserSettingsData | undefined
	getUserFeatures(): UserFeatures
	getUserSettingsConfig(): UserSettingsConfig
	updateUserSettings(settings: Partial<UserSettingsConfig>): Promise<boolean>
	isTaskSyncEnabled(): boolean
	private removeSettings
	dispose(): void
}
//# sourceMappingURL=CloudSettingsService.d.ts.map
