/**
 * Custom modes loader
 * Loads custom modes from global and project-specific configuration files
 */
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"
import { homedir } from "os"
import { parse } from "yaml"
/**
 * Get the global custom modes file path
 * @returns Path to global custom_modes.yaml
 */
function getGlobalModesPath() {
	// VS Code global storage path varies by platform
	const homeDir = homedir()
	// Try to construct the path to VS Code global storage
	// This matches the path used by the VS Code extension
	if (process.platform === "darwin") {
		// macOS
		return join(
			homeDir,
			"Library",
			"Application Support",
			"Code",
			"User",
			"globalStorage",
			"kilocode.kilo-code",
			"settings",
			"custom_modes.yaml",
		)
	} else if (process.platform === "win32") {
		// Windows
		return join(
			homeDir,
			"AppData",
			"Roaming",
			"Code",
			"User",
			"globalStorage",
			"kilocode.kilo-code",
			"settings",
			"custom_modes.yaml",
		)
	} else {
		// Linux
		return join(
			homeDir,
			".config",
			"Code",
			"User",
			"globalStorage",
			"kilocode.kilo-code",
			"settings",
			"custom_modes.yaml",
		)
	}
}
/**
 * Get the project custom modes file path
 * @param workspace - Workspace directory path
 * @returns Path to .kilocodemodes
 */
function getProjectModesPath(workspace) {
	return join(workspace, ".kilocodemodes")
}
/**
 * Parse custom modes from YAML content
 * @param content - YAML file content
 * @param source - Source of the modes ('global' or 'project')
 * @returns Array of mode configurations
 */
function parseCustomModes(content, source) {
	try {
		const parsed = parse(content)
		if (!parsed || typeof parsed !== "object") {
			return []
		}
		// Handle both YAML format (customModes array) and JSON format
		const modes = parsed.customModes || []
		if (!Array.isArray(modes)) {
			return []
		}
		// Validate and normalize mode configs
		return modes
			.filter((mode) => {
				// Must have at least slug and name
				const m = mode
				return m && typeof m === "object" && m.slug && m.name
			})
			.map((mode) => {
				const m = mode
				return {
					slug: m.slug,
					name: m.name,
					roleDefinition: m.roleDefinition || m.systemPrompt || "",
					groups: m.groups || ["read", "edit", "browser", "command", "mcp"],
					customInstructions: m.customInstructions || (m.rules ? m.rules.join("\n") : undefined),
					source: m.source || source,
				}
			})
	} catch (_error) {
		// Silent fail - return empty array if parsing fails
		return []
	}
}
/**
 * Load custom modes from global configuration
 * @returns Array of global custom modes
 */
async function loadGlobalCustomModes() {
	const globalPath = getGlobalModesPath()
	if (!existsSync(globalPath)) {
		return []
	}
	try {
		const content = await readFile(globalPath, "utf-8")
		return parseCustomModes(content, "global")
	} catch (_error) {
		// Silent fail - return empty array if reading fails
		return []
	}
}
/**
 * Load custom modes from project configuration
 * @param workspace - Workspace directory path
 * @returns Array of project custom modes
 */
async function loadProjectCustomModes(workspace) {
	const projectPath = getProjectModesPath(workspace)
	if (!existsSync(projectPath)) {
		return []
	}
	try {
		const content = await readFile(projectPath, "utf-8")
		return parseCustomModes(content, "project")
	} catch (_error) {
		// Silent fail - return empty array if reading fails
		return []
	}
}
/**
 * Load all custom modes (global + project)
 * Project modes override global modes with the same slug
 * @param workspace - Workspace directory path
 * @returns Array of all custom mode configurations
 */
export async function loadCustomModes(workspace) {
	const [globalModes, projectModes] = await Promise.all([loadGlobalCustomModes(), loadProjectCustomModes(workspace)])
	// Merge modes, with project modes taking precedence over global modes
	const modesMap = new Map()
	// Add global modes first
	for (const mode of globalModes) {
		modesMap.set(mode.slug, mode)
	}
	// Override with project modes
	for (const mode of projectModes) {
		modesMap.set(mode.slug, mode)
	}
	return Array.from(modesMap.values())
}
