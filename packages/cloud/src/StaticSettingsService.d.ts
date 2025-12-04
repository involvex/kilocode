import {
	type SettingsService,
	type UserFeatures,
	type UserSettingsConfig,
	type UserSettingsData,
	OrganizationAllowList,
	OrganizationSettings,
} from "@roo-code/types"
export declare class StaticSettingsService implements SettingsService {
	private settings
	private log
	constructor(envValue: string, log?: (...args: unknown[]) => void)
	private parseEnvironmentSettings
	getAllowList(): OrganizationAllowList
	getSettings(): OrganizationSettings | undefined
	/**
	 * Returns static user settings with roomoteControlEnabled and extensionBridgeEnabled as true
	 */
	getUserSettings(): UserSettingsData | undefined
	getUserFeatures(): UserFeatures
	getUserSettingsConfig(): UserSettingsConfig
	updateUserSettings(_settings: Partial<UserSettingsConfig>): Promise<boolean>
	isTaskSyncEnabled(): boolean
	dispose(): void
}
//# sourceMappingURL=StaticSettingsService.d.ts.map
