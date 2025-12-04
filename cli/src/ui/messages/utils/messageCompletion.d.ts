/**
 * Message completion utilities for determining when messages are ready for static rendering
 *
 * This module provides logic to determine if messages are "complete" and can be moved
 * to the static rendering section, preventing unnecessary re-renders and improving performance.
 */
import type { UnifiedMessage } from "../../../state/atoms/ui.js"
/**
 * Determines if a unified message is complete
 * Routes to appropriate completion checker based on message source
 */
export declare function isMessageComplete(message: UnifiedMessage): boolean
/**
 * Splits messages into static (complete) and dynamic (incomplete) arrays
 *
 * IMPORTANT: Ensures sequential completion - a message can only be marked as static
 * if ALL previous messages are also complete. This prevents:
 * - Mixed ordering in the static section
 * - Partial messages appearing before completed ones
 * - Visual jumping when messages complete out of order
 *
 * @param messages - Array of unified messages in chronological order
 * @returns Object with staticMessages (complete) and dynamicMessages (incomplete)
 */
export declare function splitMessages(messages: UnifiedMessage[]): {
	staticMessages: UnifiedMessage[]
	dynamicMessages: UnifiedMessage[]
}
//# sourceMappingURL=messageCompletion.d.ts.map
