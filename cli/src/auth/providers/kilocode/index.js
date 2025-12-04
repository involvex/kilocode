import { authenticateWithDeviceAuth } from "./device-auth.js"
import { authenticateWithToken } from "./token-auth.js"
/**
 * Kilocode provider with device authorization (recommended)
 */
export const kilocodeDeviceAuthProvider = {
	name: "Kilo Gateway",
	value: "kilocode-device",
	authenticate: authenticateWithDeviceAuth,
}
/**
 * Kilocode provider with manual token entry (advanced)
 */
export const kilocodeTokenAuthProvider = {
	name: "Kilo Gateway (Manual)",
	value: "kilocode-token",
	authenticate: authenticateWithToken,
}
