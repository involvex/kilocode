import { getApiUrl } from "@roo-code/types"
/**
 * Client for making tRPC requests to the KiloCode API.
 * Handles authentication and request formatting.
 */
export class TrpcClient {
	endpoint
	getToken
	constructor(dependencies) {
		this.endpoint = getApiUrl()
		this.getToken = dependencies.getToken
	}
	/**
	 * Make a tRPC request to the API.
	 * @param procedure The tRPC procedure name (e.g., "cliSessions.get")
	 * @param method The HTTP method to use
	 * @param input Optional input data for the request
	 * @returns The unwrapped response data
	 */
	async request(procedure, method, input) {
		const url = new URL(`${this.endpoint}/api/trpc/${procedure}`)
		if (method === "GET" && input) {
			url.searchParams.set("input", JSON.stringify(input))
		}
		const response = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${await this.getToken()}`,
			},
			...(method === "POST" && input && { body: JSON.stringify(input) }),
		})
		if (!response.ok) {
			throw new Error(`tRPC request failed: ${response.status}`)
		}
		const trpcResponse = await response.json()
		return trpcResponse.result.data
	}
}
//# sourceMappingURL=TrpcClient.js.map
