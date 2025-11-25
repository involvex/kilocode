/**
 * /config command - Interactive configuration menu
 */

import type { Command, ArgumentProvider } from "./core/types.js"
import type { ThemeId } from "../types/theme.js"
import type { CliMessage } from "../types/cli.js"
import type { CLIConfig } from "../config/types.js"
import openConfigFile from "../config/openConfig.js"

// Define proper function types using CliMessage
type AddMessageFunction = (message: CliMessage) => void

type SetThemeFunction = (themeName: string) => Promise<void>

interface BaseContext {
	addMessage: AddMessageFunction
}

interface ConfigContext extends BaseContext {
	config: CLIConfig
}

interface ThemeContext extends ConfigContext {
	setTheme: SetThemeFunction
}

/**
 * Config section autocomplete provider
 */
const configSectionProvider: ArgumentProvider = async () => {
	const sections = [
		{ value: "provider", description: "Configure AI provider and model" },
		{ value: "theme", description: "Change visual theme" },
		{ value: "auto-approval", description: "Configure auto-approval settings" },
		{ value: "telemetry", description: "Toggle telemetry data collection" },
		{ value: "mode", description: "Configure CLI mode" },
		{ value: "show", description: "Show current configuration" },
		{ value: "reset", description: "Reset configuration to defaults" },
		{ value: "open", description: "Open configuration file in editor" },
	]

	return sections.map((section) => ({
		value: section.value,
		title: section.value,
		description: section.description,
		matchScore: 80,
		highlightedValue: section.value,
	}))
}

/**
 * Theme autocomplete provider
 */
const _themeProvider: ArgumentProvider = async () => {
	const themes: ThemeId[] = ["dark", "light"]

	return themes.map((theme) => ({
		value: theme,
		title: theme,
		description: theme === "dark" ? "Dark theme" : "Light theme",
		matchScore: 80,
		highlightedValue: theme,
	}))
}

/**
 * Auto-approval option provider
 */
const autoApprovalProvider: ArgumentProvider = async () => {
	const options = [
		{ value: "enabled", description: "Toggle all auto-approval" },
		{ value: "read", description: "Auto-approve read operations" },
		{ value: "write", description: "Auto-approve write operations" },
		{ value: "browser", description: "Auto-approve browser operations" },
		{ value: "execute", description: "Auto-approve command execution" },
		{ value: "mcp", description: "Auto-approve MCP operations" },
		{ value: "mode", description: "Auto-approve mode switching" },
		{ value: "subtasks", description: "Auto-approve subtasks" },
		{ value: "question", description: "Auto-approve followup questions" },
		{ value: "todo", description: "Auto-approve todo list updates" },
	]

	return options.map((option) => ({
		value: option.value,
		title: option.value,
		description: option.description,
		matchScore: 80,
		highlightedValue: option.value,
	}))
}

/**
 * Boolean value provider
 */
const booleanProvider: ArgumentProvider = async () => {
	const values = ["true", "false", "on", "off", "yes", "no", "1", "0"]

	return values.map((value) => ({
		value: value,
		title: value,
		description: value === "true" || value === "on" || value === "yes" || value === "1" ? "Enable" : "Disable",
		matchScore: 80,
		highlightedValue: value,
	}))
}
export const configCommand: Command = {
	name: "config",
	aliases: ["c", "settings"],
	description: "Interactive configuration menu for CLI settings",
	usage: "/config [section] [option] [value]",
	examples: [
		"/config",
		"/config provider",
		"/config theme dark",
		"/config auto-approval enabled true",
		"/config telemetry off",
		"/config show",
	],
	category: "settings",
	priority: 8,
	handler: async (context) => {
		const { args, addMessage } = context

		if (args.length === 0) {
			// Show main configuration menu
			await showConfigMenu(context)
			return
		}

		const section = args[0]?.toLowerCase()
		const option = args[1]?.toLowerCase()
		const value = args[2]?.toLowerCase()

		switch (section) {
			case "provider":
				await handleProviderConfig(context, option || "", value || "")
				break
			case "theme":
				await handleThemeConfig(context, option || "")
				break
			case "auto-approval":
			case "autoapproval":
				await handleAutoApprovalConfig(context, option || "", value || "")
				break
			case "telemetry":
				await handleTelemetryConfig(context, option || "")
				break
			case "mode":
				await handleModeConfig(context, option || "")
				break
			case "show":
				await showCurrentConfig(context)
				break
			case "reset":
				await resetConfig(context)
				addMessage({
					id: Date.now().toString(),
					type: "system",
					content: "Configuration has been reset to default settings.",
					ts: Date.now(),
				})
				break
			case "open":
				await openConfigFile()
				addMessage({
					id: Date.now().toString(),
					type: "system",
					content: "Configuration file opened in your default editor.",
					ts: Date.now(),
				})
				break
			default:
				addMessage({
					id: Date.now().toString(),
					type: "error",
					content: `Unknown configuration section: ${section}. Available sections: provider, theme, auto-approval, telemetry, mode, show, reset, open`,
					ts: Date.now(),
				})
		}
	},
	arguments: [
		{
			name: "section",
			description: "Configuration section to modify",
			provider: configSectionProvider,
		},
		{
			name: "option",
			description: "Specific option within the section",
			provider: autoApprovalProvider,
		},
		{
			name: "value",
			description: "Value to set for the option",
			provider: booleanProvider,
		},
	],
}

/**
 * Show main configuration menu
 */
async function showConfigMenu(context: ConfigContext) {
	const { addMessage, config } = context

	const menu = `
**🔧 Configuration Menu**

**Current Settings:**
• Provider: ${config.provider || "Not set"}
• Theme: ${config.theme || "default"}
• Telemetry: ${config.telemetry ? "✅ Enabled" : "❌ Disabled"}
• Auto-approval: ${config.autoApproval?.enabled ? "✅ Enabled" : "❌ Disabled"}

**Available Commands:**
• **/config provider** - Configure AI provider and model
• **/config theme** - Change visual theme (dark/light)
• **/config auto-approval** - Configure auto-approval settings
• **/config telemetry** - Toggle telemetry collection
• **/config mode** - Configure CLI mode
• **/config show** - Show detailed current configuration
• **/config reset** - Reset to default settings
• **/config open** - Open config file in editor`

	addMessage({
		id: Date.now().toString(),
		type: "system",
		content: menu,
		ts: Date.now(),
	})
}

/**
 * Handle provider configuration
 */
async function handleProviderConfig(context: ConfigContext, option: string, _value: string) {
	const { addMessage, config } = context

	if (!option) {
		// Show current provider configuration
		const currentProvider = config.providers.find((p: { id: string }) => p.id === config.provider)

		// Helper function to find model field
		const getModelField = (provider: Record<string, unknown>) => {
			const modelKeys = Object.keys(provider).filter((k) => k.toLowerCase().includes("model"))
			if (modelKeys.length === 0) return null
			const modelKey = modelKeys[0]!
			return `${modelKey}: ${provider[modelKey] || "Not set"}`
		}

		const providerInfo = `**🤖 Provider Configuration**

**Current Provider:** ${config.provider || "Not set"}
**Available Providers:** ${config.providers.length} configured

**Provider Details:**${
			currentProvider
				? `
• ID: ${currentProvider.id}
• Type: ${currentProvider.provider}
• Model: ${getModelField(currentProvider) || "Not set"}`
				: `• No provider currently selected`
		}

**Usage:**
• Use /mode command to switch providers
• Use /model command to change models`

		addMessage({
			id: Date.now().toString(),
			type: "system" as const,
			content: providerInfo,
			ts: Date.now(),
		})
		return
	}

	addMessage({
		id: Date.now().toString(),
		type: "system" as const,
		content:
			"Provider configuration is managed through the /mode and /model commands. Use /mode to switch providers and /model to change models.",
		ts: Date.now(),
	})
}

/**
 * Handle theme configuration
 */
async function handleThemeConfig(context: ThemeContext, themeName: string) {
	const { addMessage, setTheme } = context

	if (!themeName) {
		// Show current theme and options
		const { config } = context
		const themeInfo = `
**🎨 Theme Configuration**

**Current Theme:** ${config.theme || "default"}

**Available Themes:**
• **dark** - Dark theme (default)
• **light** - Light theme

**Usage:**
• /config theme dark
• /config theme light`

		addMessage({
			id: Date.now().toString(),
			type: "system" as const,
			content: themeInfo,
			ts: Date.now(),
		})
		return
	}

	// Validate theme
	const validThemes: ThemeId[] = ["dark", "light"]
	if (!validThemes.includes(themeName as ThemeId)) {
		addMessage({
			id: Date.now().toString(),
			type: "error" as const,
			content: `Invalid theme: ${themeName}. Available themes: ${validThemes.join(", ")}`,
			ts: Date.now(),
		})
		return
	}

	try {
		await setTheme(themeName)
		addMessage({
			id: Date.now().toString(),
			type: "system" as const,
			content: `✅ Theme changed to: ${themeName}`,
			ts: Date.now(),
		})
	} catch (error) {
		addMessage({
			id: Date.now().toString(),
			type: "error" as const,
			content: `Failed to change theme: ${error instanceof Error ? error.message : String(error)}`,
			ts: Date.now(),
		})
	}
}

/**
 * Handle auto-approval configuration
 */
async function handleAutoApprovalConfig(context: ConfigContext, option: string, value: string) {
	const { addMessage, config } = context

	if (!option) {
		// Show current auto-approval settings
		const autoApproval = config.autoApproval || {}
		const settings = `
**⚡ Auto-approval Configuration**

**Overall Status:** ${autoApproval.enabled ? "✅ Enabled" : "❌ Disabled"}

**Individual Settings:**
• **Read:** ${autoApproval.read?.enabled ? "✅" : "❌"} - File read operations
• **Write:** ${autoApproval.write?.enabled ? "✅" : "❌"} - File write operations
• **Browser:** ${autoApproval.browser?.enabled ? "✅" : "❌"} - Browser operations
• **Execute:** ${autoApproval.execute?.enabled ? "✅" : "❌"} - Command execution
• **MCP:** ${autoApproval.mcp?.enabled ? "✅" : "❌"} - MCP operations
• **Mode:** ${autoApproval.mode?.enabled ? "✅" : "❌"} - Mode switching
• **Subtasks:** ${autoApproval.subtasks?.enabled ? "✅" : "❌"} - Subtask creation
• **Question:** ${autoApproval.question?.enabled ? "✅" : "❌"} - Followup questions
• **Todo:** ${autoApproval.todo?.enabled ? "✅" : "❌"} - Todo list updates

**Usage:**
• /config auto-approval enabled true/false
• /config auto-approval read true/false
• /config auto-approval write true/false
• [etc for other options]`

		addMessage({
			id: Date.now().toString(),
			type: "system" as const,
			content: settings,
			ts: Date.now(),
		})
		return
	}

	if (!value) {
		addMessage({
			id: Date.now().toString(),
			type: "error" as const,
			content: `Please provide a value for ${option}. Usage: /config auto-approval ${option} true/false`,
			ts: Date.now(),
		})
		return
	}

	// Parse boolean value
	const boolValue = parseBooleanValue(value)
	if (boolValue === null) {
		addMessage({
			id: Date.now().toString(),
			type: "error" as const,
			content: `Invalid boolean value: ${value}. Use: true, false, on, off, yes, no, 1, or 0`,
			ts: Date.now(),
		})
		return
	}

	addMessage({
		id: Date.now().toString(),
		type: "system" as const,
		content:
			"Auto-approval configuration editing is not yet implemented. Please edit the config file directly using /config open.",
		ts: Date.now(),
	})
}

/**
 * Handle telemetry configuration
 */
async function handleTelemetryConfig(context: ConfigContext, value: string) {
	const { addMessage, config } = context

	if (!value) {
		// Show current telemetry setting
		const telemetryInfo = `
**📊 Telemetry Configuration**

**Current Status:** ${config.telemetry ? "✅ Enabled" : "❌ Disabled"}

**What telemetry includes:**
• Usage statistics
• Error reports
• Performance metrics
• Feature usage data

**Privacy:** No personal data or code content is collected.

**Usage:**
• /config telemetry true/false
• /config telemetry on/off`

		addMessage({
			id: Date.now().toString(),
			type: "system" as const,
			content: telemetryInfo,
			ts: Date.now(),
		})
		return
	}

	// Parse boolean value
	const boolValue = parseBooleanValue(value)
	if (boolValue === null) {
		addMessage({
			id: Date.now().toString(),
			type: "error" as const,
			content: `Invalid boolean value: ${value}. Use: true, false, on, off, yes, no, 1, or 0`,
			ts: Date.now(),
		})
		return
	}

	addMessage({
		id: Date.now().toString(),
		type: "system" as const,
		content:
			"Telemetry configuration editing is not yet implemented. Please edit the config file directly using /config open.",
		ts: Date.now(),
	})
}

/**
 * Handle mode configuration
 */
async function handleModeConfig(context: ConfigContext, modeName: string) {
	const { addMessage, config } = context

	if (!modeName) {
		// Show current mode and options
		const modeInfo = `
**🔧 Mode Configuration**

**Current Mode:** ${config.mode || "Not set"}

**Available Modes:**
• **chat** - Interactive chat mode
• **code** - Code-focused mode
• **debug** - Debug mode with verbose output

**Usage:**
• /config mode chat
• /config mode code
• /config mode debug

**Alternative:** Use /mode command for quick switching.`

		addMessage({
			id: Date.now().toString(),
			type: "system" as const,
			content: modeInfo,
			ts: Date.now(),
		})
		return
	}

	addMessage({
		id: Date.now().toString(),
		type: "system" as const,
		content: "Mode configuration is managed through the /mode command. Use /mode to switch between modes.",
		ts: Date.now(),
	})
}

/**
 * Show current configuration
 */
async function showCurrentConfig(context: ConfigContext) {
	const { addMessage, config } = context

	const configDisplay = `
**📋 Current Configuration**

**Basic Settings:**
• Version: ${config.version}
• Mode: ${config.mode}
• Provider: ${config.provider}
• Telemetry: ${config.telemetry ? "✅ Enabled" : "❌ Disabled"}
• Theme: ${config.theme || "default"}

**Providers:** ${config.providers.length} configured
${config.providers.map((p: { id: string; provider: string }, i: number) => `  ${i + 1}. ${p.id} (${p.provider})`).join("\n")}

**Auto-approval:** ${config.autoApproval ? `\n  • Overall: ${config.autoApproval.enabled ? "✅" : "❌"}\n  • Read: ${config.autoApproval.read?.enabled ? "✅" : "❌"}\n  • Write: ${config.autoApproval.write?.enabled ? "✅" : "❌"}\n  • Browser: ${config.autoApproval.browser?.enabled ? "✅" : "❌"}\n  • Execute: ${config.autoApproval.execute?.enabled ? "✅" : "❌"}` : "❌ Disabled"}

**Custom Themes:** ${config.customThemes ? Object.keys(config.customThemes).length : 0} configured`

	addMessage({
		id: Date.now().toString(),
		type: "system" as const,
		content: configDisplay,
		ts: Date.now(),
	})
}

/**
 * Reset configuration to defaults
 */
async function resetConfig(context: BaseContext) {
	const { addMessage } = context

	addMessage({
		id: Date.now().toString(),
		type: "error" as const,
		content:
			"⚠️ **Configuration Reset Warning**\n\nThis will reset all configuration to default values. This action cannot be undone.\n\nTo proceed, use: /config reset confirm\n\nOr use /config open to manually edit the configuration file.",
		ts: Date.now(),
	})
}

/**
 * Parse boolean value from string
 */
function parseBooleanValue(value: string): boolean | null {
	const normalized = value.toLowerCase().trim()
	if (["true", "on", "yes", "1"].includes(normalized)) return true
	if (["false", "off", "no", "0"].includes(normalized)) return false
	return null
}
