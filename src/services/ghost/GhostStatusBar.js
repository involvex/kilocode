import * as vscode from "vscode"
import { t } from "../../i18n"
export class GhostStatusBar {
	statusBar
	props
	constructor(params) {
		this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
		this.props = params
		this.init()
	}
	init() {
		this.statusBar.text = t("kilocode:ghost.statusBar.enabled")
		this.statusBar.tooltip = t("kilocode:ghost.statusBar.tooltip.basic")
		this.statusBar.show()
	}
	updateVisible() {
		if (this.props.enabled) {
			this.statusBar.show()
		} else {
			this.statusBar.hide()
		}
	}
	dispose() {
		this.statusBar.dispose()
	}
	humanFormatSessionCost() {
		const cost = this.props.totalSessionCost
		if (cost === 0) return t("kilocode:ghost.statusBar.cost.zero")
		if (cost > 0 && cost < 0.01) return t("kilocode:ghost.statusBar.cost.lessThanCent") // Less than one cent
		return `$${cost.toFixed(2)}`
	}
	update(params) {
		this.props = { ...this.props, ...params }
		this.updateVisible()
		if (this.props.enabled) this.render()
	}
	renderTokenError() {
		this.statusBar.text = t("kilocode:ghost.statusBar.warning")
		this.statusBar.tooltip = t("kilocode:ghost.statusBar.tooltip.tokenError")
	}
	formatTime(timestamp) {
		const date = new Date(timestamp)
		return date.toLocaleTimeString()
	}
	renderDefault() {
		const sessionStartTime = this.formatTime(this.props.sessionStartTime)
		const now = this.formatTime(Date.now())
		this.statusBar.text = `${t("kilocode:ghost.statusBar.enabled")} (${this.props.completionCount})`
		this.statusBar.tooltip = [
			t("kilocode:ghost.statusBar.tooltip.completionSummary", {
				count: this.props.completionCount,
				startTime: sessionStartTime,
				endTime: now,
				cost: this.humanFormatSessionCost(),
			}),
			this.props.model && this.props.provider
				? t("kilocode:ghost.statusBar.tooltip.providerInfo", {
						model: this.props.model,
						provider: this.props.provider,
					})
				: undefined,
		]
			.filter(Boolean)
			.join("\n\n")
	}
	render() {
		if (!this.props.hasValidToken) {
			return this.renderTokenError()
		}
		return this.renderDefault()
	}
}
//# sourceMappingURL=GhostStatusBar.js.map
