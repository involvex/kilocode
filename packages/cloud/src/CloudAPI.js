import { z } from "zod"
import { shareResponseSchema } from "@roo-code/types"
import { getRooCodeApiUrl } from "./config.js"
import { getUserAgent } from "./utils.js"
import { AuthenticationError, CloudAPIError, NetworkError, TaskNotFoundError } from "./errors.js"
export class CloudAPI {
	authService
	log
	baseUrl
	constructor(authService, log) {
		this.authService = authService
		this.log = log || console.log
		this.baseUrl = getRooCodeApiUrl()
	}
	async request(endpoint, options = {}) {
		const { timeout = 30_000, parseResponse, headers = {}, ...fetchOptions } = options
		const sessionToken = this.authService.getSessionToken()
		if (!sessionToken) {
			throw new AuthenticationError()
		}
		const url = `${this.baseUrl}${endpoint}`
		const requestHeaders = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${sessionToken}`,
			"User-Agent": getUserAgent(),
			...headers,
		}
		try {
			const response = await fetch(url, {
				...fetchOptions,
				headers: requestHeaders,
				signal: AbortSignal.timeout(timeout),
			})
			if (!response.ok) {
				await this.handleErrorResponse(response, endpoint)
			}
			const data = await response.json()
			if (parseResponse) {
				return parseResponse(data)
			}
			return data
		} catch (error) {
			if (error instanceof TypeError && error.message.includes("fetch")) {
				throw new NetworkError(`Network error while calling ${endpoint}`)
			}
			if (error instanceof CloudAPIError) {
				throw error
			}
			if (error instanceof Error && error.name === "AbortError") {
				throw new CloudAPIError(`Request to ${endpoint} timed out`, undefined, undefined)
			}
			throw new CloudAPIError(
				`Unexpected error while calling ${endpoint}: ${error instanceof Error ? error.message : String(error)}`,
			)
		}
	}
	async handleErrorResponse(response, endpoint) {
		let responseBody
		try {
			responseBody = await response.json()
		} catch {
			responseBody = await response.text()
		}
		switch (response.status) {
			case 401:
				throw new AuthenticationError()
			case 404:
				if (endpoint.includes("/share")) {
					throw new TaskNotFoundError()
				}
				throw new CloudAPIError(`Resource not found: ${endpoint}`, 404, responseBody)
			default:
				throw new CloudAPIError(
					`HTTP ${response.status}: ${response.statusText}`,
					response.status,
					responseBody,
				)
		}
	}
	async shareTask(taskId, visibility = "organization") {
		this.log(`[CloudAPI] Sharing task ${taskId} with visibility: ${visibility}`)
		const response = await this.request("/api/extension/share", {
			method: "POST",
			body: JSON.stringify({ taskId, visibility }),
			parseResponse: (data) => shareResponseSchema.parse(data),
		})
		this.log("[CloudAPI] Share response:", response)
		return response
	}
	async bridgeConfig() {
		return this.request("/api/extension/bridge/config", {
			method: "GET",
			parseResponse: (data) =>
				z
					.object({
						userId: z.string(),
						socketBridgeUrl: z.string(),
						token: z.string(),
					})
					.parse(data),
		})
	}
}
