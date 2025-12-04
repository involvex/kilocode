/**
 * User Identity Management
 * Handles user identification and session tracking for telemetry
 */
import * as fs from "fs-extra"
import * as path from "path"
import * as crypto from "crypto"
import * as os from "os"
import { KiloCodePaths } from "../../utils/paths.js"
import { logs } from "../logs.js"
import { getAppUrl } from "@roo-code/types/cli"
/**
 * Identity manager class
 */
export class IdentityManager {
	static instance = null
	identity = null
	identityFilePath
	constructor() {
		this.identityFilePath = path.join(KiloCodePaths.getKiloCodeDir(), "identity.json")
	}
	/**
	 * Get singleton instance
	 */
	static getInstance() {
		if (!IdentityManager.instance) {
			IdentityManager.instance = new IdentityManager()
		}
		return IdentityManager.instance
	}
	/**
	 * Initialize identity for the current session
	 */
	async initialize() {
		try {
			// Load or create persistent CLI user ID
			const cliUserId = await this.loadOrCreateCLIUserId()
			// Get machine ID
			const machineId = this.getMachineId()
			// Generate new session ID
			const sessionId = this.generateSessionId()
			// Create identity object
			this.identity = {
				cliUserId,
				machineId,
				sessionId,
				sessionStartTime: Date.now(),
			}
			logs.debug("Identity initialized", "IdentityManager", {
				cliUserId: cliUserId.substring(0, 8) + "...",
				machineId: machineId.substring(0, 8) + "...",
				sessionId: sessionId.substring(0, 8) + "...",
			})
			return this.identity
		} catch (error) {
			logs.error("Failed to initialize identity", "IdentityManager", { error })
			throw error
		}
	}
	/**
	 * Update Kilocode user ID from authentication token
	 */
	async updateKilocodeUserId(kilocodeToken) {
		if (!this.identity) {
			logs.warn("Cannot update Kilocode user ID: identity not initialized", "IdentityManager")
			return
		}
		try {
			// Fetch user profile from Kilocode API
			const response = await fetch(getAppUrl("/api/profile"), {
				headers: {
					Authorization: `Bearer ${kilocodeToken}`,
					"Content-Type": "application/json",
				},
			})
			if (!response.ok) {
				throw new Error(`API request failed: ${response.status}`)
			}
			const data = await response.json()
			if (data?.user?.email) {
				this.identity.kilocodeUserId = data.user.email
				logs.debug("Kilocode user ID updated", "IdentityManager", {
					userId: data.user.email.substring(0, 3) + "...",
				})
			} else {
				throw new Error("Invalid API response: missing user email")
			}
		} catch (error) {
			logs.warn("Failed to update Kilocode user ID", "IdentityManager", { error })
			// Clear Kilocode user ID on error
			if (this.identity.kilocodeUserId) {
				delete this.identity.kilocodeUserId
			}
		}
	}
	/**
	 * Clear Kilocode user ID (on logout)
	 */
	clearKilocodeUserId() {
		if (this.identity && this.identity.kilocodeUserId) {
			delete this.identity.kilocodeUserId
			logs.debug("Kilocode user ID cleared", "IdentityManager")
		}
	}
	/**
	 * Get current identity
	 */
	getIdentity() {
		return this.identity
	}
	/**
	 * Get distinct ID for PostHog (prioritize Kilocode user ID)
	 */
	getDistinctId() {
		if (!this.identity) {
			return "unknown"
		}
		// Use Kilocode user ID if available, otherwise use CLI user ID
		return this.identity.kilocodeUserId || this.identity.cliUserId
	}
	/**
	 * Get session duration in milliseconds
	 */
	getSessionDuration() {
		if (!this.identity) {
			return 0
		}
		return Date.now() - this.identity.sessionStartTime
	}
	/**
	 * Load or create persistent CLI user ID
	 */
	async loadOrCreateCLIUserId() {
		try {
			// Ensure directory exists
			await fs.ensureDir(path.dirname(this.identityFilePath))
			// Try to load existing identity
			if (await fs.pathExists(this.identityFilePath)) {
				const data = await fs.readJson(this.identityFilePath)
				if (this.isValidStoredIdentity(data)) {
					// Update last used timestamp
					data.lastUsed = Date.now()
					await fs.writeJson(this.identityFilePath, data, { spaces: 2 })
					return data.cliUserId
				}
			}
			// Create new identity
			const newIdentity = {
				cliUserId: this.generateUUID(),
				createdAt: Date.now(),
				lastUsed: Date.now(),
			}
			await fs.writeJson(this.identityFilePath, newIdentity, { spaces: 2 })
			logs.info("Created new CLI user identity", "IdentityManager")
			return newIdentity.cliUserId
		} catch (error) {
			logs.error("Failed to load/create CLI user ID", "IdentityManager", { error })
			// Fallback to generating a temporary ID
			return this.generateUUID()
		}
	}
	/**
	 * Get machine identifier
	 */
	getMachineId() {
		try {
			// Use hostname + platform + architecture as machine identifier
			const hostname = os.hostname()
			const platform = os.platform()
			const arch = os.arch()
			const combined = `${hostname}-${platform}-${arch}`
			// Hash the combined string for privacy
			return crypto.createHash("sha256").update(combined).digest("hex").substring(0, 16)
		} catch (error) {
			logs.warn("Failed to get machine ID", "IdentityManager", { error })
			return "unknown"
		}
	}
	/**
	 * Generate a new session ID
	 */
	generateSessionId() {
		return this.generateUUID()
	}
	/**
	 * Generate a UUID v4
	 */
	generateUUID() {
		return crypto.randomUUID()
	}
	/**
	 * Validate stored identity data
	 */
	isValidStoredIdentity(data) {
		return (
			typeof data === "object" &&
			data !== null &&
			typeof data.cliUserId === "string" &&
			typeof data.createdAt === "number" &&
			typeof data.lastUsed === "number"
		)
	}
	/**
	 * Reset identity (for testing)
	 */
	async reset() {
		this.identity = null
		try {
			if (await fs.pathExists(this.identityFilePath)) {
				await fs.remove(this.identityFilePath)
				logs.debug("Identity reset", "IdentityManager")
			}
		} catch (error) {
			logs.error("Failed to reset identity", "IdentityManager", { error })
		}
	}
}
/**
 * Get the singleton identity manager instance
 */
export function getIdentityManager() {
	return IdentityManager.getInstance()
}
