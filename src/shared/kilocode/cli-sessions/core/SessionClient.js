export var CliSessionSharedState
;(function (CliSessionSharedState) {
	CliSessionSharedState["Public"] = "public"
})(CliSessionSharedState || (CliSessionSharedState = {}))
/**
 * Client for interacting with session-related API endpoints.
 * Provides methods for CRUD operations on sessions.
 */
export class SessionClient {
	trpcClient
	constructor(trpcClient) {
		this.trpcClient = trpcClient
	}
	/**
	 * Get a specific session by ID
	 */
	async get(input) {
		return await this.trpcClient.request("cliSessions.get", "GET", input)
	}
	/**
	 * Create a new session
	 */
	async create(input) {
		return await this.trpcClient.request("cliSessions.create", "POST", input)
	}
	/**
	 * Update an existing session
	 */
	async update(input) {
		return await this.trpcClient.request("cliSessions.update", "POST", input)
	}
	/**
	 * List sessions with pagination support
	 */
	async list(input) {
		return await this.trpcClient.request("cliSessions.list", "GET", input || {})
	}
	/**
	 * Search sessions
	 */
	async search(input) {
		return await this.trpcClient.request("cliSessions.search", "GET", input)
	}
	/**
	 * Share a session
	 */
	async share(input) {
		return await this.trpcClient.request("cliSessions.share", "POST", input)
	}
	/**
	 * Fork a shared session by share ID
	 */
	async fork(input) {
		return await this.trpcClient.request("cliSessions.fork", "POST", input)
	}
	/**
	 * Delete a session
	 */
	async delete(input) {
		return await this.trpcClient.request("cliSessions.delete", "POST", input)
	}
	/**
	 * Upload a blob for a session
	 */
	async uploadBlob(sessionId, blobType, blobData) {
		const { endpoint, getToken } = this.trpcClient
		const url = new URL(`${endpoint}/api/upload-cli-session-blob`)
		url.searchParams.set("session_id", sessionId)
		url.searchParams.set("blob_type", blobType)
		const response = await fetch(url.toString(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${await getToken()}`,
			},
			body: JSON.stringify(blobData),
		})
		if (!response.ok) {
			throw new Error(`uploadBlob failed: ${url.toString()} ${response.status}`)
		}
		return response.json()
	}
}
//# sourceMappingURL=SessionClient.js.map
