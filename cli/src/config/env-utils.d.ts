/**
 * Shared utilities for parsing environment variables
 * Used by both env-config.ts and other configuration modules
 */
/**
 * Environment variable names for core configuration
 */
export declare const ENV_VARS: {
	readonly MODE: "KILO_MODE"
	readonly TELEMETRY: "KILO_TELEMETRY"
	readonly THEME: "KILO_THEME"
	readonly PROVIDER: "KILO_PROVIDER"
	readonly PROVIDER_TYPE: "KILO_PROVIDER_TYPE"
	readonly AUTO_APPROVAL_ENABLED: "KILO_AUTO_APPROVAL_ENABLED"
	readonly AUTO_APPROVAL_READ_ENABLED: "KILO_AUTO_APPROVAL_READ_ENABLED"
	readonly AUTO_APPROVAL_READ_OUTSIDE: "KILO_AUTO_APPROVAL_READ_OUTSIDE"
	readonly AUTO_APPROVAL_WRITE_ENABLED: "KILO_AUTO_APPROVAL_WRITE_ENABLED"
	readonly AUTO_APPROVAL_WRITE_OUTSIDE: "KILO_AUTO_APPROVAL_WRITE_OUTSIDE"
	readonly AUTO_APPROVAL_WRITE_PROTECTED: "KILO_AUTO_APPROVAL_WRITE_PROTECTED"
	readonly AUTO_APPROVAL_BROWSER_ENABLED: "KILO_AUTO_APPROVAL_BROWSER_ENABLED"
	readonly AUTO_APPROVAL_RETRY_ENABLED: "KILO_AUTO_APPROVAL_RETRY_ENABLED"
	readonly AUTO_APPROVAL_RETRY_DELAY: "KILO_AUTO_APPROVAL_RETRY_DELAY"
	readonly AUTO_APPROVAL_MCP_ENABLED: "KILO_AUTO_APPROVAL_MCP_ENABLED"
	readonly AUTO_APPROVAL_MODE_ENABLED: "KILO_AUTO_APPROVAL_MODE_ENABLED"
	readonly AUTO_APPROVAL_SUBTASKS_ENABLED: "KILO_AUTO_APPROVAL_SUBTASKS_ENABLED"
	readonly AUTO_APPROVAL_EXECUTE_ENABLED: "KILO_AUTO_APPROVAL_EXECUTE_ENABLED"
	readonly AUTO_APPROVAL_EXECUTE_ALLOWED: "KILO_AUTO_APPROVAL_EXECUTE_ALLOWED"
	readonly AUTO_APPROVAL_EXECUTE_DENIED: "KILO_AUTO_APPROVAL_EXECUTE_DENIED"
	readonly AUTO_APPROVAL_QUESTION_ENABLED: "KILO_AUTO_APPROVAL_QUESTION_ENABLED"
	readonly AUTO_APPROVAL_QUESTION_TIMEOUT: "KILO_AUTO_APPROVAL_QUESTION_TIMEOUT"
	readonly AUTO_APPROVAL_TODO_ENABLED: "KILO_AUTO_APPROVAL_TODO_ENABLED"
}
/**
 * Environment variable prefix for Kilocode provider
 */
export declare const KILOCODE_PREFIX = "KILOCODE_"
/**
 * Environment variable prefix for other providers
 */
export declare const KILO_PREFIX = "KILO_"
/**
 * Environment variable name for provider selection
 */
export declare const PROVIDER_ENV_VAR: "KILO_PROVIDER"
/**
 * Set of specific environment variables that should not be treated as provider fields
 */
export declare const SPECIFIC_ENV_VARS: Set<
	"KILO_PROVIDER_TYPE" | "KILO_MODE" | "KILO_TELEMETRY" | "KILO_THEME" | "KILO_PROVIDER"
>
/**
 * Parse a boolean value from environment variable
 * @param value - The environment variable value
 * @param defaultValue - Optional default value to return if parsing fails or value is undefined
 * @returns Parsed boolean value, defaultValue if provided, or undefined
 */
export declare function parseBoolean(value: string | undefined, defaultValue?: boolean): boolean | undefined
/**
 * Parse a number value from environment variable
 * @param value - The environment variable value
 * @param defaultValue - Optional default value to return if parsing fails or value is undefined
 * @returns Parsed number value, defaultValue if provided, or undefined
 */
export declare function parseNumber(value: string | undefined, defaultValue?: number): number | undefined
/**
 * Parse a comma-separated list from environment variable
 * @param value - The environment variable value
 * @param defaultValue - Optional default value to return if value is undefined
 * @returns Parsed array of strings, defaultValue if provided, or undefined
 */
export declare function parseArray(value: string | undefined, defaultValue?: string[]): string[] | undefined
/**
 * Convert snake_case or SCREAMING_SNAKE_CASE to camelCase
 * Examples:
 * - API_KEY → apiKey
 * - BASE_URL → baseUrl
 * - API_MODEL_ID → apiModelId
 * - ORGANIZATION_ID → organizationId
 */
export declare function snakeToCamelCase(str: string): string
//# sourceMappingURL=env-utils.d.ts.map
