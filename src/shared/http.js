import pRetry from "p-retry"
let factor
/**
 * Sets the retry factor for pRetry to 0 so that tests aren't
 * waiting around forever on retries
 */
export function setFetchRetryFactorForTests() {
	factor = 0
	return {
		unset: () => {
			factor = undefined
		},
	}
}
function is5xxError(status) {
	return status >= 500 && status <= 599
}
/**
 * Like fetch, but with timeouts via AbortSignal and retries via the p-retry
 */
export async function fetchWithRetries({
	url,
	retries = 5,
	timeout = 10 * 1000,
	shouldRetry = (res) => is5xxError(res.status),
	signal: userProvidedSignal,
	...requestInit
}) {
	try {
		return await pRetry(
			async (attemptCount) => {
				const signals = [AbortSignal.timeout(timeout)]
				if (userProvidedSignal) {
					signals.push(userProvidedSignal)
				}
				const signal = AbortSignal.any(signals)
				// TODO: Fix this type coercion from type 'global.Response' to type 'Response'
				const res = await fetch(url, {
					...requestInit,
					signal,
				})
				if (shouldRetry(res) && attemptCount < retries) {
					console.log("got bad response for", url, "status", res.status, "retrying attempt", attemptCount)
					throw new ResponseNotOkayError(url, res)
				}
				return res
			},
			{ retries, randomize: true, factor },
		)
	} catch (e) {
		if (e instanceof DOMException) {
			throw new RequestTimedOutError(url, timeout, retries)
		} else {
			throw e
		}
	}
}
export class ResponseNotOkayError extends Error {
	url
	res
	constructor(url, res) {
		super(`Request to ${url} was not okay`)
		this.url = url
		this.res = res
	}
}
export class RequestTimedOutError extends Error {
	url
	timeout
	retries
	constructor(url, timeout, retries) {
		super(`Request to ${url} timed out ${retries} times each after ${timeout}ms`)
		this.url = url
		this.timeout = timeout
		this.retries = retries
	}
}
//# sourceMappingURL=http.js.map
