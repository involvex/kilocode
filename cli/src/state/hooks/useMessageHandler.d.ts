/**
 * Hook for handling regular (non-command) message sending
 * Provides a clean interface for sending user messages to the extension
 */
/**
 * Options for useMessageHandler hook
 */
export interface UseMessageHandlerOptions {
	/** Whether CI mode is active */
	ciMode?: boolean
}
/**
 * Return type for useMessageHandler hook
 */
export interface UseMessageHandlerReturn {
	/** Send a user message to the extension */
	sendUserMessage: (text: string) => Promise<void>
	/** Whether a message is currently being sent */
	isSending: boolean
}
/**
 * Hook that provides message sending functionality
 *
 * This hook handles sending regular user messages (non-commands) to the extension,
 * including adding the message to the UI and handling errors.
 *
 * @example
 * ```tsx
 * function ChatInput() {
 *   const { sendUserMessage, isSending } = useMessageHandler()
 *
 *   const handleSubmit = async (input: string) => {
 *     await sendUserMessage(input)
 *   }
 *
 *   return (
 *     <input
 *       onSubmit={handleSubmit}
 *       disabled={isSending}
 *     />
 *   )
 * }
 * ```
 */
export declare function useMessageHandler(options?: UseMessageHandlerOptions): UseMessageHandlerReturn
//# sourceMappingURL=useMessageHandler.d.ts.map
