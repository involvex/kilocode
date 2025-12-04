/**
 * Sets the retry factor for pRetry to 0 so that tests aren't
 * waiting around forever on retries
 */
export declare function setFetchRetryFactorForTests(): {
	unset: () => void
}
export interface FetchWithRetriesOptions extends RequestInit {
	url: string
	retries?: number
	timeout?: number
	shouldRetry?: (res: Response) => boolean
}
/**
 * Like fetch, but with timeouts via AbortSignal and retries via the p-retry
 */
export declare function fetchWithRetries({
	url,
	retries,
	timeout,
	shouldRetry,
	signal: userProvidedSignal,
	...requestInit
}: FetchWithRetriesOptions): Promise<Response>
export declare class ResponseNotOkayError extends Error {
	url: string
	res: Response
	constructor(url: string, res: Response)
}
export declare class RequestTimedOutError extends Error {
	url: string
	timeout: number
	retries: number
	constructor(url: string, timeout: number, retries: number)
}
//# sourceMappingURL=http.d.ts.map
