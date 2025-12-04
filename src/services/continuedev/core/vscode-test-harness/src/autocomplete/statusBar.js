import * as vscode from "vscode"
import { CONTINUE_WORKSPACE_KEY, getContinueWorkspaceConfig } from "../util/workspaceConfig"
export var StatusBarStatus
;(function (StatusBarStatus) {
	StatusBarStatus[(StatusBarStatus["Disabled"] = 0)] = "Disabled"
	StatusBarStatus[(StatusBarStatus["Enabled"] = 1)] = "Enabled"
	StatusBarStatus[(StatusBarStatus["Paused"] = 2)] = "Paused"
})(StatusBarStatus || (StatusBarStatus = {}))
const statusBarItemText = (status, loading, error) => {
	if (error) {
		return "$(alert) Continue (config error)"
	}
	let text
	switch (status) {
		case undefined:
			if (loading) {
				text = "$(loading~spin) Continue"
			} else {
				text = "Continue"
			}
			break
		case StatusBarStatus.Disabled:
			text = "$(circle-slash) Continue"
			break
		case StatusBarStatus.Enabled:
			text = "$(check) Continue"
			break
		case StatusBarStatus.Paused:
			text = "$(debug-pause) Continue"
			break
		default:
			text = "Continue"
	}
	// Append Next Edit indicator if enabled.
	const nextEditEnabled = true //MINIMAL_REPO - was configurable
	if (nextEditEnabled) {
		text += " (NE)"
	}
	return text
}
const statusBarItemTooltip = (status) => {
	switch (status) {
		case undefined:
		case StatusBarStatus.Disabled:
			return "Click to enable tab autocomplete"
		case StatusBarStatus.Enabled: {
			const nextEditEnabled = true //MINIMAL_REPO - was configurable
			return nextEditEnabled ? "Next Edit is enabled" : "Tab autocomplete is enabled"
		}
		case StatusBarStatus.Paused:
			return "Tab autocomplete is paused"
	}
}
let statusBarStatus = undefined
let statusBarItem = undefined
let statusBarFalseTimeout = undefined
let statusBarError = false
export function stopStatusBarLoading() {
	statusBarFalseTimeout = setTimeout(() => {
		setupStatusBar(StatusBarStatus.Enabled, false)
	}, 100)
}
/**
 * TODO: We should clean up how status bar is handled.
 * Ideally, there should be a single 'status' value without
 * 'loading' and 'error' booleans.
 */
export function setupStatusBar(status, loading, error) {
	if (loading !== false) {
		clearTimeout(statusBarFalseTimeout)
		statusBarFalseTimeout = undefined
	}
	// If statusBarItem hasn't been defined yet, create it
	if (!statusBarItem) {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right)
	}
	if (error !== undefined) {
		statusBarError = error
		if (status === undefined) {
			status = statusBarStatus
		}
	}
	statusBarItem.text = statusBarItemText(status, loading, statusBarError)
	statusBarItem.tooltip = statusBarItemTooltip(status ?? statusBarStatus)
	statusBarItem.command = "continue.openTabAutocompleteConfigMenu"
	statusBarItem.show()
	if (status !== undefined) {
		statusBarStatus = status
	}
	vscode.workspace.onDidChangeConfiguration((event) => {
		if (event.affectsConfiguration(CONTINUE_WORKSPACE_KEY)) {
			const enabled = getContinueWorkspaceConfig().get("enableTabAutocomplete")
			if (enabled && statusBarStatus === StatusBarStatus.Paused) {
				return
			}
			setupStatusBar(enabled ? StatusBarStatus.Enabled : StatusBarStatus.Disabled)
		}
	})
}
export function getStatusBarStatus() {
	return StatusBarStatus.Enabled
}
//# sourceMappingURL=statusBar.js.map
