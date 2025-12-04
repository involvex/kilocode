export declare class CloudAPIError extends Error {
	statusCode?: number | undefined
	responseBody?: unknown | undefined
	constructor(message: string, statusCode?: number | undefined, responseBody?: unknown | undefined)
}
export declare class TaskNotFoundError extends CloudAPIError {
	constructor(taskId?: string)
}
export declare class AuthenticationError extends CloudAPIError {
	constructor(message?: string)
}
export declare class NetworkError extends CloudAPIError {
	constructor(message?: string)
}
export declare class InvalidClientTokenError extends Error {
	constructor()
}
//# sourceMappingURL=errors.d.ts.map
