import EventEmitter from "events"
import type { ExtensionContext } from "vscode"
import type { CloudUserInfo, AuthService, AuthServiceEvents, AuthState } from "@roo-code/types"
export declare class StaticTokenAuthService extends EventEmitter<AuthServiceEvents> implements AuthService {
	private state
	private token
	private log
	private userInfo
	constructor(context: ExtensionContext, token: string, log?: (...args: unknown[]) => void)
	initialize(): Promise<void>
	broadcast(): void
	login(): Promise<void>
	logout(): Promise<void>
	handleCallback(_code: string | null, _state: string | null, _organizationId?: string | null): Promise<void>
	switchOrganization(_organizationId: string | null): Promise<void>
	getOrganizationMemberships(): Promise<import("@roo-code/types").CloudOrganizationMembership[]>
	getState(): AuthState
	getSessionToken(): string | undefined
	isAuthenticated(): boolean
	hasActiveSession(): boolean
	hasOrIsAcquiringActiveSession(): boolean
	getUserInfo(): CloudUserInfo | null
	getStoredOrganizationId(): string | null
}
//# sourceMappingURL=StaticTokenAuthService.d.ts.map
