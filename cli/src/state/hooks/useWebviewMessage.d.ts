/**
 * Hook for sending webview messages to the extension
 * Provides type-safe message sending helpers with error handling
 */
import type { WebviewMessage, ClineAskResponse } from "../../types/messages.js"
/**
 * Parameters for sending a new task
 */
export interface SendTaskParams {
	/** The task text/prompt */
	text: string
	/** Optional images to include */
	images?: string[]
	/** Optional mode to use */
	mode?: string
}
/**
 * Parameters for sending an ask response
 */
export interface SendAskResponseParams {
	/** The response type */
	response?: ClineAskResponse
	/** The action to take */
	action?: string
	/** Additional text */
	text?: string
	/** Optional images */
	images?: string[]
}
/**
 * Parameters for responding to a tool use
 */
export interface RespondToToolParams {
	/** Whether to approve or reject */
	response: "yesButtonClicked" | "noButtonClicked"
	/** Optional feedback text */
	text?: string
	/** Optional images */
	images?: string[]
}
/**
 * Return type for useWebviewMessage hook
 */
export interface UseWebviewMessageReturn {
	/** Send a raw webview message */
	sendMessage: (message: WebviewMessage) => Promise<void>
	/** Send a new task */
	sendTask: (params: SendTaskParams) => Promise<void>
	/** Send an ask response */
	sendAskResponse: (params: SendAskResponseParams) => Promise<void>
	/** Request router models */
	requestRouterModels: () => Promise<void>
	/** Clear the current task */
	clearTask: () => Promise<void>
	/** Cancel the current task */
	cancelTask: () => Promise<void>
	/** Resume a paused task */
	resumeTask: () => Promise<void>
	/** Switch to a different mode */
	switchMode: (mode: string) => Promise<void>
	/** Respond to a tool use request */
	respondToTool: (params: RespondToToolParams) => Promise<void>
	/** Send API configuration */
	sendApiConfiguration: (config: unknown) => Promise<void>
	/** Send custom instructions */
	sendCustomInstructions: (instructions: string) => Promise<void>
	/** Send always allow setting */
	sendAlwaysAllow: (alwaysAllow: boolean) => Promise<void>
	/** Open a file in the editor */
	openFile: (filePath: string) => Promise<void>
	/** Open settings */
	openSettings: () => Promise<void>
	/** Refresh extension state */
	refreshState: () => Promise<void>
	/** Send primary button click */
	sendPrimaryButtonClick: () => Promise<void>
	/** Send secondary button click */
	sendSecondaryButtonClick: () => Promise<void>
}
/**
 * Hook for sending webview messages to the extension
 *
 * Provides type-safe helpers for common message types with built-in error handling.
 * All methods are async and will throw errors if the service is not ready.
 *
 * @example
 * ```tsx
 * function TaskInput() {
 *   const { sendTask, isReady } = useWebviewMessage()
 *   const [input, setInput] = useState('')
 *
 *   const handleSubmit = async () => {
 *     try {
 *       await sendTask({ text: input })
 *       setInput('')
 *     } catch (error) {
 *       console.error('Failed to send task:', error)
 *     }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input value={input} onChange={e => setInput(e.target.value)} />
 *       <button disabled={!isReady}>Send</button>
 *     </form>
 *   )
 * }
 * ```
 */
export declare function useWebviewMessage(): UseWebviewMessageReturn
//# sourceMappingURL=useWebviewMessage.d.ts.map
