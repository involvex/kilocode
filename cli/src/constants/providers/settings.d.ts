import type { ProviderName, ProviderSettings } from "../../types/messages.js"
/**
 * Option for select fields
 */
export interface SelectOption {
	value: string
	label: string
	description?: string
}
/**
 * Provider setting configuration interface
 */
export interface ProviderSettingConfig {
	field: string
	label: string
	value: string
	actualValue: string
	type: "text" | "password" | "boolean" | "select"
	options?: SelectOption[]
}
/**
 * Field metadata interface for centralized field registry
 */
export interface FieldMetadata {
	label: string
	type: "text" | "password" | "boolean" | "select"
	placeholder?: string
	isOptional?: boolean
	options?: SelectOption[]
	defaultValue?: string
}
/**
 * Centralized field metadata registry
 * Contains labels, types, placeholders, and optional flags for all provider fields
 */
export declare const FIELD_REGISTRY: Record<string, FieldMetadata>
/**
 * Get field display information
 * @param field - Field name
 * @returns Object with label, placeholder, type, options, and defaultValue
 */
export declare const getFieldInfo: (field: string) => {
	label: string
	placeholder: string
	type: "boolean" | "text" | "password" | "select"
	options: SelectOption[] | undefined
	defaultValue: string | undefined
}
/**
 * Check if a field is a sensitive field (password/token)
 * @param field - Field name
 * @returns True if field contains sensitive data
 */
export declare const isSensitiveField: (field: string) => boolean
/**
 * Check if a field is optional (can be empty)
 * @param field - Field name
 * @returns True if field is optional
 */
export declare const isOptionalField: (field: string) => boolean
/**
 * Get provider-specific settings configuration
 * @param provider - Provider name
 * @param config - Provider configuration object
 * @returns Array of setting configurations
 */
export declare const getProviderSettings: (provider: ProviderName, config: ProviderSettings) => ProviderSettingConfig[]
/**
 * Provider-specific default models
 */
export declare const PROVIDER_DEFAULT_MODELS: Record<ProviderName, string>
/**
 * Get default model for a provider
 * @param provider - Provider name
 * @returns Default model string
 */
export declare const getProviderDefaultModel: (provider: ProviderName) => string
//# sourceMappingURL=settings.d.ts.map
