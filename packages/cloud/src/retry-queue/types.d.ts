export interface QueuedRequest {
	id: string
	url: string
	options: RequestInit
	timestamp: number
	retryCount: number
	type: "api-call" | "telemetry" | "settings" | "other"
	operation?: string
	lastError?: string
}
export interface QueueStats {
	totalQueued: number
	byType: Record<string, number>
	oldestRequest?: Date
	newestRequest?: Date
	totalRetries: number
	failedRetries: number
}
export interface RetryQueueConfig {
	maxRetries: number
	retryDelay: number
	maxQueueSize: number
	persistQueue: boolean
	networkCheckInterval: number
	requestTimeout: number
}
export interface RetryQueueEvents {
	"request-queued": [request: QueuedRequest]
	"request-retry-success": [request: QueuedRequest]
	"request-retry-failed": [request: QueuedRequest, error: Error]
	"request-max-retries-exceeded": [request: QueuedRequest, error: Error]
	"queue-cleared": []
}
//# sourceMappingURL=types.d.ts.map
