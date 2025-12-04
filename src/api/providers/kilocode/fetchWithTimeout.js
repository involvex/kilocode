import * as undici from "undici"
export const HeadersTimeoutError = undici.errors.HeadersTimeoutError
export function fetchWithTimeout(timeoutMs, headers) {
	const agent = new undici.EnvHttpProxyAgent({
		headersTimeout: timeoutMs,
		bodyTimeout: timeoutMs,
	})
	return (input, init) => {
		const requestInit = {
			...init,
			dispatcher: agent,
		}
		if (headers) {
			requestInit.headers = {
				...(init?.headers || {}),
				...headers,
			}
		}
		return undici.fetch(input, requestInit)
	}
}
//# sourceMappingURL=fetchWithTimeout.js.map
