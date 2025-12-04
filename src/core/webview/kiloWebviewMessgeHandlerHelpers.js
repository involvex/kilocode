// kilocode_change - new file
export async function refreshOrganizationModes(message, provider, updateGlobalState) {
	if (message.apiConfiguration?.kilocodeToken) {
		try {
			const orgModes = await provider.customModesManager.fetchOrganizationModes(
				message.apiConfiguration.kilocodeToken,
				message.apiConfiguration.kilocodeOrganizationId,
				message.apiConfiguration.kilocodeTesterWarningsDisabledUntil,
			)
			// Refresh custom modes with organization modes
			await provider.customModesManager.refreshWithOrganizationModes(orgModes)
			// Update global state
			const customModes = await provider.customModesManager.getCustomModes()
			await updateGlobalState("customModes", customModes)
			provider.log(
				`Organization modes refreshed: ${orgModes.length} organization modes, ${customModes.length} total modes`,
			)
		} catch (error) {
			provider.log(
				`Failed to fetch organization modes: ${error instanceof Error ? error.message : String(error)}`,
			)
			// Continue even if organization modes fetch fails
		}
	}
}
export async function fetchAndRefreshOrganizationModesOnStartup(provider, updateGlobalState) {
	const startupState = await provider.getState()
	if (startupState.apiConfiguration.kilocodeToken && startupState.apiConfiguration.kilocodeOrganizationId) {
		try {
			const orgModes = await provider.customModesManager.fetchOrganizationModes(
				startupState.apiConfiguration.kilocodeToken,
				startupState.apiConfiguration.kilocodeOrganizationId,
				startupState.apiConfiguration.kilocodeTesterWarningsDisabledUntil,
			)
			if (orgModes.length > 0) {
				await provider.customModesManager.refreshWithOrganizationModes(orgModes)
				const updatedCustomModes = await provider.customModesManager.getCustomModes()
				await updateGlobalState("customModes", updatedCustomModes)
				provider.log(
					`Loaded ${orgModes.length} organization modes on startup for organization ${startupState.apiConfiguration.kilocodeOrganizationId}`,
				)
			}
		} catch (error) {
			provider.log(
				`Failed to fetch organization modes on startup: ${error instanceof Error ? error.message : String(error)}`,
			)
			// Continue with startup even if organization modes fetch fails
		}
	}
}
//# sourceMappingURL=kiloWebviewMessgeHandlerHelpers.js.map
