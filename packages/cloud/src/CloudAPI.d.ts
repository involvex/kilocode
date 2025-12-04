import { type AuthService, type ShareVisibility, type ShareResponse } from "@roo-code/types"
export declare class CloudAPI {
	private authService
	private log
	private baseUrl
	constructor(authService: AuthService, log?: (...args: unknown[]) => void)
	private request
	private handleErrorResponse
	shareTask(taskId: string, visibility?: ShareVisibility): Promise<ShareResponse>
	bridgeConfig(): Promise<{
		userId: string
		socketBridgeUrl: string
		token: string
	}>
}
//# sourceMappingURL=CloudAPI.d.ts.map
