import { type ApprovalOption } from "../atoms/approval.js"
import type { ExtensionChatMessage } from "../../types/messages.js"
/**
 * Options for useApprovalHandler hook
 */
export interface UseApprovalHandlerOptions {
	/** Whether CI mode is active (for testing/override purposes) */
	ciMode?: boolean
}
/**
 * Return type for useApprovalHandler hook
 */
export interface UseApprovalHandlerReturn {
	/** The message currently awaiting approval */
	pendingApproval: ExtensionChatMessage | null
	/** Available approval options */
	approvalOptions: ApprovalOption[]
	/** Currently selected option index */
	selectedIndex: number
	/** Currently selected option */
	selectedOption: ApprovalOption | null
	/** Whether approval is pending */
	isApprovalPending: boolean
	/** Select the next option */
	selectNext: () => void
	/** Select the previous option */
	selectPrevious: () => void
	/** Approve the pending request */
	approve: (text?: string, images?: string[]) => Promise<void>
	/** Reject the pending request */
	reject: (text?: string, images?: string[]) => Promise<void>
	/** Execute the currently selected option */
	executeSelected: (text?: string, images?: string[]) => Promise<void>
	/** Send terminal operation (continue or abort) */
	sendTerminalOperation: (operation: "continue" | "abort") => Promise<void>
}
/**
 * Hook that provides approval/rejection functionality
 *
 * This hook manages the approval flow for ask messages, providing methods
 * to approve, reject, and navigate between options.
 *
 * In CI mode, this hook automatically approves or rejects requests based on
 * configuration settings without user interaction.
 *
 * @example
 * ```tsx
 * function ApprovalUI() {
 *   const { pendingApproval, approve, reject, isApprovalPending } = useApprovalHandler()
 *
 *   if (!isApprovalPending) return null
 *
 *   return (
 *     <div>
 *       <button onClick={() => approve()}>Approve</button>
 *       <button onClick={() => reject()}>Reject</button>
 *     </div>
 *   )
 * }
 * ```
 */
export declare function useApprovalHandler(): UseApprovalHandlerReturn
//# sourceMappingURL=useApprovalHandler.d.ts.map
