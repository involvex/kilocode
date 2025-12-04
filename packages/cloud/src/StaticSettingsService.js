import { organizationSettingsSchema, ORGANIZATION_ALLOW_ALL } from "@roo-code/types"
export class StaticSettingsService {
	settings
	log
	constructor(envValue, log) {
		this.log = log || console.log
		this.settings = this.parseEnvironmentSettings(envValue)
	}
	parseEnvironmentSettings(envValue) {
		try {
			const decodedValue = Buffer.from(envValue, "base64").toString("utf-8")
			const parsedJson = JSON.parse(decodedValue)
			return organizationSettingsSchema.parse(parsedJson)
		} catch (error) {
			this.log(
				`[StaticSettingsService] failed to parse static settings: ${error instanceof Error ? error.message : String(error)}`,
				error,
			)
			throw new Error("Failed to parse static settings")
		}
	}
	getAllowList() {
		return this.settings?.allowList || ORGANIZATION_ALLOW_ALL
	}
	getSettings() {
		return this.settings
	}
	/**
	 * Returns static user settings with roomoteControlEnabled and extensionBridgeEnabled as true
	 */
	getUserSettings() {
		return {
			features: {
				roomoteControlEnabled: true,
			},
			settings: {
				extensionBridgeEnabled: true,
				taskSyncEnabled: true,
			},
			version: 1,
		}
	}
	getUserFeatures() {
		return {
			roomoteControlEnabled: true,
		}
	}
	getUserSettingsConfig() {
		return {
			extensionBridgeEnabled: true,
			taskSyncEnabled: true,
		}
	}
	async updateUserSettings(_settings) {
		throw new Error("User settings updates are not supported in static mode")
	}
	isTaskSyncEnabled() {
		// Static settings always enable task sync
		return true
	}
	dispose() {
		// No resources to clean up for static settings.
	}
}
