/**
 * Hook for accessing extension messages and state
 * Provides access to message history, filtering, and real-time updates
 */
import type { ExtensionChatMessage } from "../../types/messages.js"
/**
 * Message filter function type
 */
export type MessageFilter = (message: ExtensionChatMessage) => boolean
/**
 * Return type for useExtensionMessage hook
 */
export interface UseExtensionMessageReturn {
	/** All messages from the extension */
	messages: ExtensionChatMessage[]
	/** The most recent message (null if no messages) */
	lastMessage: ExtensionChatMessage | null
	/** Whether there are any messages */
	hasMessages: boolean
	/** Filter messages by type */
	filterByType: (type: "ask" | "say") => ExtensionChatMessage[]
	/** Get unanswered ask messages */
	getUnansweredAsks: () => ExtensionChatMessage[]
	/** Get messages after a specific timestamp */
	getMessagesAfter: (timestamp: number) => ExtensionChatMessage[]
	/** Get messages before a specific timestamp */
	getMessagesBefore: (timestamp: number) => ExtensionChatMessage[]
	/** Filter messages with a custom function */
	filterMessages: (filter: MessageFilter) => ExtensionChatMessage[]
	/** Get the count of messages */
	messageCount: number
	/** Get the count of ask messages */
	askCount: number
	/** Get the count of say messages */
	sayCount: number
}
/**
 * Hook for accessing extension messages
 *
 * Provides access to the message history with filtering and transformation utilities.
 * Messages are automatically updated in real-time as the extension sends new messages.
 *
 * @example
 * ```tsx
 * function MessageList() {
 *   const { messages, lastMessage, filterByType } = useExtensionMessage()
 *
 *   const askMessages = filterByType('ask')
 *
 *   return (
 *     <div>
 *       <h2>All Messages ({messages.length})</h2>
 *       {messages.map(msg => (
 *         <div key={msg.ts}>{msg.text}</div>
 *       ))}
 *
 *       <h2>Ask Messages ({askMessages.length})</h2>
 *       {askMessages.map(msg => (
 *         <div key={msg.ts}>{msg.ask}</div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export declare function useExtensionMessage(): UseExtensionMessageReturn
//# sourceMappingURL=useExtensionMessage.d.ts.map
