/**
 * Approval Decision Service
 *
 * Pure function service that determines what action to take for approval requests.
 * This centralizes all approval decision logic that was previously scattered across
 * multiple components and hooks.
 *
 * @module approvalDecision
 */
import type { ExtensionChatMessage } from "../types/messages.js"
import type { AutoApprovalConfig } from "../config/types.js"
/**
 * Result of an approval decision
 */
export interface ApprovalDecision {
	/** The action to take */
	action: "auto-approve" | "auto-reject" | "manual"
	/** Delay in milliseconds before executing (for retries) */
	delay?: number
	/** Message to send with the response (for CI mode rejections) */
	message?: string
}
/**
 * Main function to determine approval decision for any message
 *
 * This is a pure function that takes a message and configuration,
 * and returns a decision about what action to take.
 *
 * @param message - The message requiring approval
 * @param config - The approval configuration
 * @param isCIMode - Whether CI mode is active
 * @returns The approval decision
 *
 * @example
 * ```typescript
 * const decision = getApprovalDecision(message, config, false)
 * if (decision.action === 'auto-approve') {
 *   await approve(decision.message)
 * } else if (decision.action === 'auto-reject') {
 *   await reject(decision.message)
 * } else {
 *   // Show manual approval UI
 * }
 * ```
 */
export declare function getApprovalDecision(
	message: ExtensionChatMessage,
	config: AutoApprovalConfig,
	isCIMode: boolean,
): ApprovalDecision
//# sourceMappingURL=approvalDecision.d.ts.map
