import EventEmitter from "events"
import { jwtDecode } from "jwt-decode"
export class StaticTokenAuthService extends EventEmitter {
	state = "active-session"
	token
	log
	userInfo
	constructor(context, token, log) {
		super()
		this.token = token
		this.log = log || console.log
		this.log("[auth] Using StaticTokenAuthService")
		let payload
		try {
			payload = jwtDecode(token)
		} catch (error) {
			this.log("[auth] Failed to parse JWT:", error)
		}
		this.userInfo = {
			id: payload?.r?.u || payload?.sub || undefined,
			organizationId: payload?.r?.o || undefined,
			extensionBridgeEnabled: true,
		}
	}
	async initialize() {
		this.state = "active-session"
	}
	broadcast() {
		this.emit("auth-state-changed", {
			state: this.state,
			previousState: "initializing",
		})
		this.emit("user-info", { userInfo: this.userInfo })
	}
	async login() {
		throw new Error("Authentication methods are disabled in StaticTokenAuthService")
	}
	async logout() {
		throw new Error("Authentication methods are disabled in StaticTokenAuthService")
	}
	async handleCallback(_code, _state, _organizationId) {
		throw new Error("Authentication methods are disabled in StaticTokenAuthService")
	}
	async switchOrganization(_organizationId) {
		throw new Error("Authentication methods are disabled in StaticTokenAuthService")
	}
	async getOrganizationMemberships() {
		throw new Error("Authentication methods are disabled in StaticTokenAuthService")
	}
	getState() {
		return this.state
	}
	getSessionToken() {
		return this.token
	}
	isAuthenticated() {
		return true
	}
	hasActiveSession() {
		return true
	}
	hasOrIsAcquiringActiveSession() {
		return true
	}
	getUserInfo() {
		return this.userInfo
	}
	getStoredOrganizationId() {
		return this.userInfo?.organizationId || null
	}
}
