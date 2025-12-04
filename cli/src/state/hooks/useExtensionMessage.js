/**
 * Hook for accessing extension messages and state
 * Provides access to message history, filtering, and real-time updates
 */
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { chatMessagesAtom, lastChatMessageAtom, hasChatMessagesAtom } from "../atoms/extension.js"
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
export function useExtensionMessage() {
	// Read atoms
	const messages = useAtomValue(chatMessagesAtom)
	const lastMessage = useAtomValue(lastChatMessageAtom)
	const hasMessages = useAtomValue(hasChatMessagesAtom)
	// Memoized filter functions
	const filterByType = useMemo(
		() => (type) => {
			return messages.filter((msg) => msg.type === type)
		},
		[messages],
	)
	const getUnansweredAsks = useMemo(
		() => () => {
			return messages.filter((msg) => msg.type === "ask" && !msg.isAnswered)
		},
		[messages],
	)
	const getMessagesAfter = useMemo(
		() => (timestamp) => {
			return messages.filter((msg) => msg.ts > timestamp)
		},
		[messages],
	)
	const getMessagesBefore = useMemo(
		() => (timestamp) => {
			return messages.filter((msg) => msg.ts < timestamp)
		},
		[messages],
	)
	const filterMessages = useMemo(
		() => (filter) => {
			return messages.filter(filter)
		},
		[messages],
	)
	// Memoized counts
	const messageCount = useMemo(() => messages.length, [messages])
	const askCount = useMemo(() => messages.filter((msg) => msg.type === "ask").length, [messages])
	const sayCount = useMemo(() => messages.filter((msg) => msg.type === "say").length, [messages])
	// Memoize return value
	return useMemo(
		() => ({
			messages,
			lastMessage,
			hasMessages,
			filterByType,
			getUnansweredAsks,
			getMessagesAfter,
			getMessagesBefore,
			filterMessages,
			messageCount,
			askCount,
			sayCount,
		}),
		[
			messages,
			lastMessage,
			hasMessages,
			filterByType,
			getUnansweredAsks,
			getMessagesAfter,
			getMessagesBefore,
			filterMessages,
			messageCount,
			askCount,
			sayCount,
		],
	)
}
