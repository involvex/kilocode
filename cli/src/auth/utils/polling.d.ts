import type { PollingOptions } from "../types.js"
/**
 * Generic polling utility with timeout and progress tracking
 * @param options Polling configuration options
 * @returns The data from the successful poll result
 * @throws Error if polling times out or fails
 */
export declare function poll<T>(options: PollingOptions): Promise<T>
/**
 * Calculate time remaining in a human-readable format
 * @param startTime Start time in milliseconds
 * @param expiresIn Total expiration time in seconds
 * @returns Formatted time string (e.g., "9:45")
 */
export declare function formatTimeRemaining(startTime: number, expiresIn: number): string
//# sourceMappingURL=polling.d.ts.map
