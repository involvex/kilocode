/**
 * Centralized Approval Monitor Hook
 *
 * This hook monitors extension messages for ask messages and handles all approval orchestration.
 * It replaces the distributed useApprovalEffect that was previously called from multiple components.
 *
 * Similar to useFollowupHandler, this hook:
 * - Monitors messages from a single source (chatMessagesAtom via lastAskMessageAtom)
 * - Handles approval state management centrally
 * - Executes auto-approval logic when appropriate
 * - Cleans up when messages are answered
 *
 * @module useApprovalMonitor
 */
/**
 * Hook that monitors messages and orchestrates approval flow
 *
 * This hook:
 * 1. Watches for new ask messages via lastAskMessageAtom
 * 2. Sets the message as pending approval when it arrives
 * 3. Gets the approval decision from the service
 * 4. Executes auto-approve/reject based on the decision
 * 5. Handles timeouts and cleanup
 * 6. Clears pending approval when message is answered
 *
 * @example
 * ```typescript
 * export const UI = () => {
 *   // Call once at the top level
 *   useApprovalMonitor()
 *
 *   return <Box>...</Box>
 * }
 * ```
 */
export declare function useApprovalMonitor(): void
//# sourceMappingURL=useApprovalMonitor.d.ts.map
