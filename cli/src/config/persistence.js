import * as fs from "fs/promises"
import * as path from "path"
import { homedir } from "os"
import { DEFAULT_CONFIG, DEFAULT_AUTO_APPROVAL } from "./defaults.js"
import { validateConfig } from "./validation.js"
import { logs } from "../services/logs.js"
import { buildConfigFromEnv, isEphemeralMode } from "./env-config.js"
export const CONFIG_DIR = path.join(homedir(), ".kilocode", "cli")
export const CONFIG_FILE = path.join(CONFIG_DIR, "config.json")
// Allow overriding paths for testing
let configDir = CONFIG_DIR
let configFile = CONFIG_FILE
export function setConfigPaths(dir, file) {
	configDir = dir
	configFile = file
}
export function resetConfigPaths() {
	configDir = CONFIG_DIR
	configFile = CONFIG_FILE
}
export async function ensureConfigDir() {
	try {
		await fs.mkdir(configDir, { recursive: true })
	} catch (error) {
		logs.error("Failed to create config directory", "ConfigPersistence", { error })
		throw error
	}
}
/**
 * Deep merge two objects, with source taking precedence
 * Used to fill in missing config keys with defaults
 * - Starts with all keys from target (defaults)
 * - Overwrites with values from source (user config) where they exist
 * - Recursively merges nested objects
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target, source) {
	// Start with a copy of target to get all default keys
	const result = { ...target }
	// Iterate over source keys to override defaults
	for (const key in source) {
		const sourceValue = source[key]
		const targetValue = result[key]
		if (sourceValue !== undefined) {
			// If both are objects (not arrays), merge recursively
			if (
				typeof sourceValue === "object" &&
				sourceValue !== null &&
				!Array.isArray(sourceValue) &&
				typeof targetValue === "object" &&
				targetValue !== null &&
				!Array.isArray(targetValue)
			) {
				// Recursively merge nested objects
				result[key] = deepMerge(targetValue, sourceValue)
			} else {
				// Otherwise, source value takes precedence
				result[key] = sourceValue
			}
		}
	}
	return result
}
export function getKiloToken(config) {
	const kiloProvider = config.providers.find((p) => p.provider === "kilocode")
	if (kiloProvider && "kilocodeToken" in kiloProvider) {
		return kiloProvider.kilocodeToken
	}
	return null
}
/**
 * Merge loaded config with defaults to fill in missing keys
 */
function mergeWithDefaults(loadedConfig) {
	// Merge defaults with loaded config - loaded config takes precedence
	// deepMerge(target, source) where source overrides target
	const merged = deepMerge(DEFAULT_CONFIG, loadedConfig)
	// Special handling for autoApproval to ensure all nested keys have defaults
	// while preserving user values
	if (loadedConfig.autoApproval) {
		merged.autoApproval = deepMerge(DEFAULT_AUTO_APPROVAL, loadedConfig.autoApproval)
	} else {
		merged.autoApproval = DEFAULT_AUTO_APPROVAL
	}
	// Special handling for providers array to merge each provider with defaults
	if (loadedConfig.providers && Array.isArray(loadedConfig.providers)) {
		merged.providers = loadedConfig.providers.map((loadedProvider) => {
			// Find matching default provider by id
			const defaultProvider = DEFAULT_CONFIG.providers.find((p) => p.provider === loadedProvider.provider)
			if (defaultProvider) {
				// Merge loaded provider with default to fill in missing fields
				return deepMerge(defaultProvider, loadedProvider)
			}
			// If no matching default, return as-is (will be validated later)
			return loadedProvider
		})
	}
	// Ensure customThemes property exists (for backward compatibility)
	if (!merged.customThemes) {
		merged.customThemes = {}
	}
	return merged
}
export async function loadConfig() {
	try {
		await ensureConfigDir()
		// Check if we can build config from environment variables
		if (!(await configExists())) {
			// Try to build config from environment variables
			const envConfig = buildConfigFromEnv()
			if (envConfig) {
				logs.info("Using configuration from environment variables (ephemeral mode)", "ConfigPersistence")
				// Validate the env config
				const validation = await validateConfig(envConfig)
				// Don't write to file in ephemeral mode
				if (!isEphemeralMode()) {
					logs.debug("Writing env-based config to file", "ConfigPersistence")
					await fs.writeFile(configFile, JSON.stringify(envConfig, null, 2))
				}
				return {
					config: envConfig,
					validation,
				}
			}
			// No env config available, return default config IN MEMORY
			// DO NOT create the file yet - it will be created when saveConfig() is called
			// This prevents creating an empty config file if the user interrupts the auth wizard
			logs.debug("No config file found, returning default config in memory", "ConfigPersistence")
			// Validate the default config
			const validation = await validateConfig(DEFAULT_CONFIG)
			return {
				config: DEFAULT_CONFIG,
				validation,
			}
		}
		// Read and parse config
		const content = await fs.readFile(configFile, "utf-8")
		const loadedConfig = JSON.parse(content)
		// Merge with defaults to fill in missing keys
		const config = mergeWithDefaults(loadedConfig)
		// Validate merged config
		const validation = await validateConfig(config)
		if (!validation.valid) {
			logs.error("Invalid config file", "ConfigPersistence", { errors: validation.errors })
			// Return config with validation errors instead of throwing
			return {
				config,
				validation,
			}
		}
		// Save the merged config back to ensure all defaults are persisted
		// Only save if validation passed
		await saveConfig(config)
		return {
			config: config,
			validation,
		}
	} catch (error) {
		// For errors (e.g., file read errors, JSON parse errors), log and throw
		logs.error("Failed to load config", "ConfigPersistence", { error })
		throw error
	}
}
export async function saveConfig(config, skipValidation = false) {
	try {
		await ensureConfigDir()
		// Validate before saving (unless explicitly skipped for initial config creation)
		if (!skipValidation) {
			const validation = await validateConfig(config)
			if (!validation.valid) {
				throw new Error(`Invalid config: ${validation.errors?.join(", ")}`)
			}
		}
		// Write config with pretty formatting
		await fs.writeFile(configFile, JSON.stringify(config, null, 2))
		logs.debug("Config saved successfully", "ConfigPersistence")
	} catch (error) {
		logs.error("Failed to save config", "ConfigPersistence", { error })
		throw error
	}
}
export function getConfigPath() {
	return configFile
}
export async function configExists() {
	try {
		await fs.access(configFile)
		return true
	} catch {
		return false
	}
}
