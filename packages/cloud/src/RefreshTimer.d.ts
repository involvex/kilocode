/**
 * RefreshTimer - A utility for executing a callback with configurable retry behavior
 *
 * This timer executes a callback function and schedules the next execution based on the result:
 * - If the callback succeeds (returns true), it schedules the next attempt after a fixed interval
 * - If the callback fails (returns false), it uses exponential backoff up to a maximum interval
 */
/**
 * Configuration options for the RefreshTimer
 */
export interface RefreshTimerOptions {
	/**
	 * The callback function to execute
	 * Should return a Promise that resolves to a boolean indicating success (true) or failure (false)
	 */
	callback: () => Promise<boolean>
	/**
	 * Time in milliseconds to wait before next attempt after success
	 * @default 50000 (50 seconds)
	 */
	successInterval?: number
	/**
	 * Initial backoff time in milliseconds for the first failure
	 * @default 1000 (1 second)
	 */
	initialBackoffMs?: number
	/**
	 * Maximum backoff time in milliseconds
	 * @default 300000 (5 minutes)
	 */
	maxBackoffMs?: number
}
/**
 * A timer utility that executes a callback with configurable retry behavior
 */
export declare class RefreshTimer {
	private callback
	private successInterval
	private initialBackoffMs
	private maxBackoffMs
	private currentBackoffMs
	private attemptCount
	private timerId
	private isRunning
	/**
	 * Creates a new RefreshTimer
	 *
	 * @param options Configuration options for the timer
	 */
	constructor(options: RefreshTimerOptions)
	/**
	 * Starts the timer and executes the callback immediately
	 */
	start(): void
	/**
	 * Stops the timer and cancels any pending execution
	 */
	stop(): void
	/**
	 * Resets the backoff state and attempt count
	 * Does not affect whether the timer is running
	 */
	reset(): void
	/**
	 * Schedules the next attempt based on the success/failure of the current attempt
	 *
	 * @param wasSuccessful Whether the current attempt was successful
	 */
	private scheduleNextAttempt
	/**
	 * Executes the callback and handles the result
	 */
	private executeCallback
}
//# sourceMappingURL=RefreshTimer.d.ts.map
