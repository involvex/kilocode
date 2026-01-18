import { atom } from "jotai"
import { inputModeAtom, selectedIndexAtom } from "./ui.js"
import { configAtom, saveConfigAtom } from "./config.js"
import type { CLIConfig } from "../../config/types.js"

export type ConfigCategory = "General" | "UI" | "Auto-Approval" | "Providers" | "Exit"

export interface ConfigMenuItem {
	label: string
	category: ConfigCategory
	key?: string
	value?: unknown
	description?: string
	type: "category" | "toggle" | "action" | "back"
}

// Current level of the menu: "categories" or "items"
export const configMenuLevelAtom = atom<"categories" | "items">("categories")

// Currently selected category
export const configMenuCategoryAtom = atom<ConfigCategory | null>(null)

// Derived atom to get items for the current category
export const configMenuItemsAtom = atom<ConfigMenuItem[]>((get) => {
	const level = get(configMenuLevelAtom)
	const category = get(configMenuCategoryAtom)
	const config = get(configAtom)

	if (level === "categories") {
		return [
			{ label: "General Settings", category: "General", type: "category" },
			{ label: "UI Personalization", category: "UI", type: "category" },
			{ label: "Auto-Approval Rules", category: "Auto-Approval", type: "category" },
			{ label: "Model Providers", category: "Providers", type: "category" },
			{ label: "Exit Menu", category: "Exit", type: "action" },
		]
	}

	if (category === "General") {
		return [
			{ label: "Back to Categories", category: "General", type: "back" },
			{
				label: "Mode",
				category: "General",
				key: "mode",
				value: config.mode,
				description: `Current: ${config.mode}`,
				type: "category",
			},
			// Add more general settings here
		]
	}

	if (category === "UI") {
		return [
			{ label: "Back to Categories", category: "UI", type: "back" },
			{
				label: "Status Line",
				category: "UI",
				key: "UI.statusLine.enabled",
				value: config.UI?.statusLine?.enabled,
				description: config.UI?.statusLine?.enabled ? "Enabled" : "Disabled",
				type: "toggle",
			},
			{
				label: "Status Line Text",
				category: "UI",
				key: "UI.statusLine.text",
				value: config.UI?.statusLine?.text,
				description: config.UI?.statusLine?.text || "None",
				type: "category", // Action for now as it needs input
			},
			{
				label: "Theme",
				category: "UI",
				key: "theme",
				value: config.theme,
				description: `Current: ${config.theme}`,
				type: "category",
			},
		]
	}

	if (category === "Auto-Approval") {
		const aa = config.autoApproval
		return [
			{ label: "Back to Categories", category: "Auto-Approval", type: "back" },
			{
				label: "Global Enable",
				category: "Auto-Approval",
				key: "autoApproval.enabled",
				value: aa?.enabled,
				description: aa?.enabled ? "On" : "Off",
				type: "toggle",
			},
			{
				label: "Approve Read",
				category: "Auto-Approval",
				key: "autoApproval.read.enabled",
				value: aa?.read?.enabled,
				description: aa?.read?.enabled ? "Yes" : "No",
				type: "toggle",
			},
			{
				label: "Approve Write",
				category: "Auto-Approval",
				key: "autoApproval.write.enabled",
				value: aa?.write?.enabled,
				description: aa?.write?.enabled ? "Yes" : "No",
				type: "toggle",
			},
		]
	}

	return [{ label: "Back to Categories", category: "Exit", type: "back" }]
})

// Action atom to handle selection
export const handleConfigMenuSelectAtom = atom(null, async (get, set) => {
	const level = get(configMenuLevelAtom)
	const items = get(configMenuItemsAtom)
	const index = get(selectedIndexAtom)
	const item = items[index]

	if (!item) return

	if (item.type === "back") {
		set(configMenuLevelAtom, "categories")
		set(selectedIndexAtom, 0)
		return
	}

	if (item.type === "action" && item.category === "Exit") {
		set(inputModeAtom, "normal")
		return
	}

	if (level === "categories") {
		set(configMenuCategoryAtom, item.category)
		set(configMenuLevelAtom, "items")
		set(selectedIndexAtom, 0)
		return
	}

	if (item.type === "toggle" && item.key) {
		const config = get(configAtom)
		const keys = item.key.split(".")
		const current = { ...config } as CLIConfig
		const updatedConfig = current

		// Simple deep update for known keys
		if (keys[0] === "UI" && keys[1] === "statusLine") {
			if (!current.UI) current.UI = {}
			if (!current.UI.statusLine) current.UI.statusLine = {}
			current.UI.statusLine.enabled = !current.UI.statusLine.enabled
		} else if (keys[0] === "autoApproval") {
			if (!current.autoApproval) current.autoApproval = {}
			if (keys[1] === "enabled") {
				current.autoApproval.enabled = !current.autoApproval.enabled
			} else if (keys[1] && keys[2] === "enabled") {
				const category = keys[1] as keyof typeof current.autoApproval
				if (!current.autoApproval[category]) {
					;(current.autoApproval as any)[category] = {}
				}
				const subConfig = current.autoApproval[category] as any
				if (subConfig) {
					subConfig.enabled = !subConfig.enabled
				}
			}
		}

		await set(saveConfigAtom, updatedConfig)
	}
})

// Action atom to open the menu
export const openConfigMenuAtom = atom(null, (get, set) => {
	set(configMenuLevelAtom, "categories")
	set(selectedIndexAtom, 0)
	set(inputModeAtom, "config-menu")
})
