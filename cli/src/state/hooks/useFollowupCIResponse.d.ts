/**
 * Hook for handling follow-up messages in CI mode
 *
 * This hook automatically sends a response to follow-up questions in CI mode,
 * informing the AI that it should make autonomous decisions.
 *
 * Unlike approval-based messages, follow-up questions don't require approval -
 * they're just questions from the AI. In CI mode, we automatically respond
 * to tell the AI to proceed autonomously.
 *
 * @module useFollowupCIResponse
 */
import type { ExtensionChatMessage } from "../../types/messages.js"
/**
 * Hook that automatically responds to follow-up questions in CI mode
 *
 * This hook:
 * 1. Detects when a follow-up message arrives
 * 2. If in CI mode, automatically sends a response (not approval)
 * 3. The response tells the AI to make autonomous decisions
 *
 * @param message - The follow-up message to handle
 *
 * @example
 * ```typescript
 * export const AskFollowupMessage = ({ message }) => {
 *   useFollowupCIResponse(message)
 *
 *   // Just render UI
 *   return <Box>...</Box>
 * }
 * ```
 */
export declare function useFollowupCIResponse(message: ExtensionChatMessage): void
//# sourceMappingURL=useFollowupCIResponse.d.ts.map
