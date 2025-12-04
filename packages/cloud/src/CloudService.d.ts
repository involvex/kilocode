import type { Disposable, ExtensionContext } from "vscode"
import EventEmitter from "events"
import type {
	TelemetryEvent,
	ClineMessage,
	CloudServiceEvents,
	AuthService,
	SettingsService,
	CloudUserInfo,
	CloudOrganizationMembership,
	OrganizationAllowList,
	OrganizationSettings,
	ShareVisibility,
	UserSettingsConfig,
	UserSettingsData,
	UserFeatures,
} from "@roo-code/types"
import { CloudTelemetryClient as TelemetryClient } from "./TelemetryClient.js"
import { CloudShareService } from "./CloudShareService.js"
import { CloudAPI } from "./CloudAPI.js"
import { RetryQueue } from "./retry-queue/index.js"
export declare class CloudService extends EventEmitter<CloudServiceEvents> implements Disposable {
	private static _instance
	private context
	private authStateListener
	private authUserInfoListener
	private settingsListener
	private isInitialized
	private log
	/**
	 * Services
	 */
	private _authService
	get authService(): AuthService | null
	private _settingsService
	get settingsService(): SettingsService | null
	private _telemetryClient
	get telemetryClient(): TelemetryClient | null
	private _shareService
	get shareService(): CloudShareService | null
	private _cloudAPI
	get cloudAPI(): CloudAPI | null
	private _retryQueue
	get retryQueue(): RetryQueue | null
	private _isCloudAgent
	get isCloudAgent(): boolean
	private constructor()
	initialize(): Promise<void>
	login(landingPageSlug?: string): Promise<void>
	logout(): Promise<void>
	isAuthenticated(): boolean
	hasActiveSession(): boolean
	hasOrIsAcquiringActiveSession(): boolean
	getUserInfo(): CloudUserInfo | null
	getOrganizationId(): string | null
	getOrganizationName(): string | null
	getOrganizationRole(): string | null
	hasStoredOrganizationId(): boolean
	getStoredOrganizationId(): string | null
	getAuthState(): string
	handleAuthCallback(code: string | null, state: string | null, organizationId?: string | null): Promise<void>
	switchOrganization(organizationId: string | null): Promise<void>
	getOrganizationMemberships(): Promise<CloudOrganizationMembership[]>
	getAllowList(): OrganizationAllowList
	getOrganizationSettings(): OrganizationSettings | undefined
	getUserSettings(): UserSettingsData | undefined
	getUserFeatures(): UserFeatures
	getUserSettingsConfig(): UserSettingsConfig
	updateUserSettings(settings: Partial<UserSettingsConfig>): Promise<boolean>
	isTaskSyncEnabled(): boolean
	captureEvent(event: TelemetryEvent): void
	shareTask(
		taskId: string,
		visibility?: ShareVisibility,
		clineMessages?: ClineMessage[],
	): Promise<{
		success: boolean
		error?: string | undefined
		shareUrl?: string | undefined
		isNewShare?: boolean | undefined
		manageUrl?: string | undefined
	}>
	canShareTask(): Promise<boolean>
	dispose(): void
	private ensureInitialized
	static get instance(): CloudService
	static createInstance(
		context: ExtensionContext,
		log?: (...args: unknown[]) => void,
		eventHandlers?: Partial<{
			[K in keyof CloudServiceEvents]: (...args: CloudServiceEvents[K]) => void
		}>,
	): Promise<CloudService>
	static hasInstance(): boolean
	static resetInstance(): void
	static isEnabled(): boolean
	/**
	 * Handle auth state changes for the retry queue
	 * - Pause queue when not in 'active-session' state
	 * - Clear queue when user logs out or logs in as different user
	 * - Resume queue when returning to active-session with same user
	 */
	private handleAuthStateChangeForRetryQueue
}
//# sourceMappingURL=CloudService.d.ts.map
