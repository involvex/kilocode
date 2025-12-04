import EventEmitter from "events"
import type { ExtensionContext } from "vscode"
import type {
	CloudUserInfo,
	CloudOrganizationMembership,
	AuthService,
	AuthServiceEvents,
	AuthState,
} from "@roo-code/types"
export declare class WebAuthService extends EventEmitter<AuthServiceEvents> implements AuthService {
	private context
	private timer
	private state
	private log
	private readonly authCredentialsKey
	private credentials
	private sessionToken
	private userInfo
	private isFirstRefreshAttempt
	constructor(context: ExtensionContext, log?: (...args: unknown[]) => void)
	private changeState
	private handleCredentialsChange
	private transitionToLoggedOut
	private transitionToAttemptingSession
	private transitionToInactiveSession
	/**
	 * Initialize the auth state
	 *
	 * This method loads tokens from storage and determines the current auth state.
	 * It also starts the refresh timer if we have an active session.
	 */
	initialize(): Promise<void>
	broadcast(): void
	private storeCredentials
	private loadCredentials
	private clearCredentials
	/**
	 * Start the login process
	 *
	 * This method initiates the authentication flow by generating a state parameter
	 * and opening the browser to the authorization URL.
	 *
	 * @param landingPageSlug Optional slug of a specific landing page (e.g., "supernova", "special-offer", etc.)
	 */
	login(landingPageSlug?: string): Promise<void>
	/**
	 * Handle the callback from Roo Code Cloud
	 *
	 * This method is called when the user is redirected back to the extension
	 * after authenticating with Roo Code Cloud.
	 *
	 * @param code The authorization code from the callback
	 * @param state The state parameter from the callback
	 * @param organizationId The organization ID from the callback (null for personal accounts)
	 */
	handleCallback(code: string | null, state: string | null, organizationId?: string | null): Promise<void>
	/**
	 * Log out
	 *
	 * This method removes all stored tokens and stops the refresh timer.
	 */
	logout(): Promise<void>
	getState(): AuthState
	getSessionToken(): string | undefined
	/**
	 * Check if the user is authenticated
	 *
	 * @returns True if the user is authenticated (has an active, attempting, or inactive session)
	 */
	isAuthenticated(): boolean
	hasActiveSession(): boolean
	/**
	 * Check if the user has an active session or is currently attempting to acquire one
	 *
	 * @returns True if the user has an active session or is attempting to get one
	 */
	hasOrIsAcquiringActiveSession(): boolean
	/**
	 * Refresh the session
	 *
	 * This method refreshes the session token using the client token.
	 */
	private refreshSession
	private fetchUserInfo
	/**
	 * Extract user information from the ID token
	 *
	 * @returns User information from ID token claims or null if no ID token available
	 */
	getUserInfo(): CloudUserInfo | null
	/**
	 * Get the stored organization ID from credentials
	 *
	 * @returns The stored organization ID, null for personal accounts or if no credentials exist
	 */
	getStoredOrganizationId(): string | null
	/**
	 * Switch to a different organization context
	 * @param organizationId The organization ID to switch to, or null for personal account
	 */
	switchOrganization(organizationId: string | null): Promise<void>
	/**
	 * Get all organization memberships for the current user
	 * @returns Array of organization memberships
	 */
	getOrganizationMemberships(): Promise<CloudOrganizationMembership[]>
	private clerkSignIn
	private clerkCreateSessionToken
	private clerkMe
	private findOrganizationMembership
	private findPrimaryOrganizationMembership
	private setUserOrganizationInfo
	private clerkGetOrganizationMemberships
	private getOrganizationMetadata
	private isExtensionBridgeEnabledForOrganization
	private clerkLogout
	private userAgent
}
//# sourceMappingURL=WebAuthService.d.ts.map
