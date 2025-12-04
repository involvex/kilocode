type HttpMethod = "GET" | "POST"
/**
 * Generic tRPC response wrapper
 */
export type TrpcResponse<T> = {
	result: {
		data: T
	}
}
export interface TrpcClientDependencies {
	getToken: () => Promise<string>
}
/**
 * Client for making tRPC requests to the KiloCode API.
 * Handles authentication and request formatting.
 */
export declare class TrpcClient {
	readonly endpoint: string
	readonly getToken: () => Promise<string>
	constructor(dependencies: TrpcClientDependencies)
	/**
	 * Make a tRPC request to the API.
	 * @param procedure The tRPC procedure name (e.g., "cliSessions.get")
	 * @param method The HTTP method to use
	 * @param input Optional input data for the request
	 * @returns The unwrapped response data
	 */
	request<TInput = void, TOutput = unknown>(procedure: string, method: HttpMethod, input?: TInput): Promise<TOutput>
}
export {}
//# sourceMappingURL=TrpcClient.d.ts.map
