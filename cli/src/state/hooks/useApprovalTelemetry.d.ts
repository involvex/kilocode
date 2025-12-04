/**
 * Hook for tracking approval decisions in telemetry
 */
import type { ExtensionChatMessage } from "../../types/messages.js"
/**
 * Hook to track approval flow telemetry
 */
export declare function useApprovalTelemetry(): {
	/**
	 * Track auto-approval
	 */
	trackAutoApproval: (message: ExtensionChatMessage) => void
	/**
	 * Track auto-rejection
	 */
	trackAutoRejection: (message: ExtensionChatMessage) => void
	/**
	 * Track manual approval
	 */
	trackManualApproval: (message: ExtensionChatMessage) => void
	/**
	 * Track manual rejection
	 */
	trackManualRejection: (message: ExtensionChatMessage) => void
}
//# sourceMappingURL=useApprovalTelemetry.d.ts.map
