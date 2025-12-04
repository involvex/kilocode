/**
 * User Identity Management
 * Handles user identification and session tracking for telemetry
 */
/**
 * User identity structure
 */
export interface UserIdentity {
	/** Persistent CLI user ID (UUID stored in ~/.kilocode/cli/identity) */
	cliUserId: string
	/** Machine identifier (OS-level) */
	machineId: string
	/** Kilocode user ID (from authentication token) */
	kilocodeUserId?: string
	/** Current session ID (new UUID per CLI session) */
	sessionId: string
	/** Session start timestamp */
	sessionStartTime: number
}
/**
 * Identity manager class
 */
export declare class IdentityManager {
	private static instance
	private identity
	private identityFilePath
	private constructor()
	/**
	 * Get singleton instance
	 */
	static getInstance(): IdentityManager
	/**
	 * Initialize identity for the current session
	 */
	initialize(): Promise<UserIdentity>
	/**
	 * Update Kilocode user ID from authentication token
	 */
	updateKilocodeUserId(kilocodeToken: string): Promise<void>
	/**
	 * Clear Kilocode user ID (on logout)
	 */
	clearKilocodeUserId(): void
	/**
	 * Get current identity
	 */
	getIdentity(): UserIdentity | null
	/**
	 * Get distinct ID for PostHog (prioritize Kilocode user ID)
	 */
	getDistinctId(): string
	/**
	 * Get session duration in milliseconds
	 */
	getSessionDuration(): number
	/**
	 * Load or create persistent CLI user ID
	 */
	private loadOrCreateCLIUserId
	/**
	 * Get machine identifier
	 */
	private getMachineId
	/**
	 * Generate a new session ID
	 */
	private generateSessionId
	/**
	 * Generate a UUID v4
	 */
	private generateUUID
	/**
	 * Validate stored identity data
	 */
	private isValidStoredIdentity
	/**
	 * Reset identity (for testing)
	 */
	reset(): Promise<void>
}
/**
 * Get the singleton identity manager instance
 */
export declare function getIdentityManager(): IdentityManager
//# sourceMappingURL=identity.d.ts.map
