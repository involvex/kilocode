/**
 * MessageDisplay component - displays chat messages from both CLI and extension state
 * Uses Ink Static component to optimize rendering of completed messages
 *
 * Performance Optimization:
 * ------------------------
 * Messages are split into two sections:
 * 1. Static section: Completed messages that won't change (rendered once with Ink Static)
 * 2. Dynamic section: Incomplete/updating messages (re-rendered as needed)
 *
 * This prevents unnecessary re-renders of completed messages, improving performance
 * especially in long conversations.
 *
 * Message Completion Logic:
 * -------------------------
 * A message is considered complete when:
 * - CLI messages: partial !== true
 * - Extension messages: depends on type (see messageCompletion.ts)
 * - Sequential rule: A message can only be static if all previous messages are complete
 *
 * Key Generation Strategy:
 * -----------------------
 * To prevent React duplicate key warnings when multiple messages are created within
 * the same millisecond (same timestamp), we use a composite key strategy:
 *
 * For CLI messages:
 *   - Uses the unique message ID: `cli-${id}`
 *
 * For Extension messages:
 *   - Combines multiple properties to ensure uniqueness:
 *     `ext-${timestamp}-${type}-${subtype}-${index}`
 *   - timestamp: Message creation time (may not be unique)
 *   - type: "say" or "ask"
 *   - subtype: Specific message type (e.g., "completion_result", "text")
 *   - index: Array position (final guarantee of uniqueness)
 *
 * This ensures stable, unique keys even when messages are created rapidly.
 */
import React from "react"
interface MessageDisplayProps {
	/** Optional filter to show only specific message types */
	filterType?: "ask" | "say"
	/** Maximum number of messages to display (default: all) */
	maxMessages?: number
}
export declare const MessageDisplay: React.FC<MessageDisplayProps>
export {}
//# sourceMappingURL=MessageDisplay.d.ts.map
