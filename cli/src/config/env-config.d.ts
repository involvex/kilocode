import type { CLIConfig } from "./types.js"
import { KILOCODE_PREFIX, KILO_PREFIX, PROVIDER_ENV_VAR } from "./env-utils.js"
import { envConfigExists, getMissingEnvVars } from "./provider-validation.js"
export { envConfigExists, getMissingEnvVars }
export { PROVIDER_ENV_VAR, KILOCODE_PREFIX, KILO_PREFIX }
/**
 * Build complete CLI configuration from environment variables
 * Returns null if minimal configuration is not present
 */
export declare function buildConfigFromEnv(): CLIConfig | null
/**
 * Apply environment variable overrides to the config
 * Overrides the current provider's settings based on environment variables
 *
 * Environment variables:
 * - KILO_PROVIDER: Override the active provider ID
 * - KILO_MODE: Override the operation mode
 * - KILO_TELEMETRY: Override telemetry setting (true/false)
 * - KILO_THEME: Override the UI theme
 * - KILO_AUTO_APPROVAL_*: Override auto-approval settings
 * - For Kilocode provider: KILOCODE_<FIELD_NAME> (e.g., KILOCODE_MODEL → kilocodeModel)
 *   Examples:
 *   - KILOCODE_MODEL → kilocodeModel
 *   - KILOCODE_ORGANIZATION_ID → kilocodeOrganizationId
 * - For other providers: KILO_<FIELD_NAME> (e.g., KILO_API_KEY → apiKey)
 *   Examples:
 *   - KILO_API_KEY → apiKey
 *   - KILO_BASE_URL → baseUrl
 *   - KILO_API_MODEL_ID → apiModelId
 *
 * @param config The config to apply overrides to
 * @returns The config with environment variable overrides applied
 */
export declare function applyEnvOverrides(config: CLIConfig): CLIConfig
/**
 * Check if running in ephemeral mode (config from env only, no file)
 */
export declare function isEphemeralMode(): boolean
//# sourceMappingURL=env-config.d.ts.map
