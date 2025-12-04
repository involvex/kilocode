import type { CliMessage, WelcomeMessageOptions } from "../../types/cli.js"
import type { ValidationResult } from "../../config/validation.js"
/**
 * Converts validation errors into user-friendly instructions
 * @param validation - The validation result
 * @returns Array of instruction strings
 */
export declare function createConfigErrorInstructions(validation: ValidationResult): string[]
/**
 * Creates a welcome message with customizable options
 * @param options - Customization options for the welcome message
 * @returns A CliMessage of type "welcome"
 */
export declare function createWelcomeMessage(options?: WelcomeMessageOptions): CliMessage
//# sourceMappingURL=welcomeMessage.d.ts.map
