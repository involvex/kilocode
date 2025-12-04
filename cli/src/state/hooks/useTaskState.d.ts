/**
 * Hook for checking task state
 * Provides utilities to determine if there's an active task
 */
/**
 * Return type for useTaskState hook
 */
export interface UseTaskStateReturn {
	/** Whether there's an active task */
	hasActiveTask: boolean
	/** Number of messages in the current task */
	messageCount: number
}
/**
 * Hook that provides task state information
 *
 * This hook checks if there's an active task by looking at the chat messages.
 * A task is considered active if there are any messages in the conversation.
 *
 * @example
 * ```tsx
 * function MessageHandler() {
 *   const { hasActiveTask } = useTaskState()
 *
 *   const sendMessage = (text: string) => {
 *     if (hasActiveTask) {
 *       // Send as response to existing task
 *       sendAskResponse({ response: "messageResponse", text })
 *     } else {
 *       // Start new task
 *       sendTask({ text })
 *     }
 *   }
 * }
 * ```
 */
export declare function useTaskState(): UseTaskStateReturn
//# sourceMappingURL=useTaskState.d.ts.map
