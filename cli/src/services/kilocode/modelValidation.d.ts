/**
 * Model validation service for Kilocode provider
 * Validates model availability against organization-specific model lists
 */
import type { ModelRecord } from "../../constants/providers/models.js"
export interface ModelValidationResult {
	isValid: boolean
	currentModel: string
	fallbackModel?: string
}
/**
 * Validate if a model is available in the current organization's model list
 * @param modelId - The model ID to validate
 * @param availableModels - The organization's available models
 * @returns true if the model is available, false otherwise
 */
export declare function validateModelAvailability(modelId: string, availableModels: ModelRecord): boolean
/**
 * Validate model and determine fallback if needed
 * @param params - Validation parameters
 * @returns Validation result with fallback information if needed
 */
export declare function validateModelForOrganization(params: {
	currentModel: string
	availableModels: ModelRecord
	defaultModel: string
}): ModelValidationResult
//# sourceMappingURL=modelValidation.d.ts.map
