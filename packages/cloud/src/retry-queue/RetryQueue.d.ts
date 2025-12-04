import { EventEmitter } from "events"
import type { ExtensionContext } from "vscode"
import type { QueuedRequest, QueueStats, RetryQueueConfig, RetryQueueEvents } from "./types.js"
type AuthHeaderProvider = () => Record<string, string> | undefined
export declare class RetryQueue extends EventEmitter<RetryQueueEvents> {
	private queue
	private context
	private config
	private log
	private isProcessing
	private retryTimer?
	private readonly STORAGE_KEY
	private authHeaderProvider?
	private queuePausedUntil?
	private isPaused
	private currentUserId?
	private hasHadUser
	constructor(
		context: ExtensionContext,
		config?: Partial<RetryQueueConfig>,
		log?: (...args: unknown[]) => void,
		authHeaderProvider?: AuthHeaderProvider,
	)
	private loadPersistedQueue
	private persistQueue
	enqueue(url: string, options: RequestInit, type?: QueuedRequest["type"], operation?: string): Promise<void>
	retryAll(): Promise<void>
	private retryRequest
	private startRetryTimer
	private delay
	getStats(): QueueStats
	clear(): void
	/**
	 * Pause the retry queue. When paused, no retries will be processed.
	 * This is useful when auth state is not active or during logout.
	 */
	pause(): void
	/**
	 * Resume the retry queue. Retries will be processed again on the next interval.
	 */
	resume(): void
	/**
	 * Check if the queue is paused
	 */
	isPausedState(): boolean
	/**
	 * Set the current user ID for tracking user changes
	 */
	setCurrentUserId(userId: string | undefined): void
	/**
	 * Get the current user ID
	 */
	getCurrentUserId(): string | undefined
	/**
	 * Conditionally clear the queue based on user ID change.
	 * If newUserId is different from currentUserId, clear the queue.
	 * Returns true if queue was cleared, false otherwise.
	 */
	clearIfUserChanged(newUserId: string | undefined): boolean
	dispose(): void
}
export {}
//# sourceMappingURL=RetryQueue.d.ts.map
