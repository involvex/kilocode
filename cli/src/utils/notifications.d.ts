import type { KilocodeNotification } from "../state/atoms/notifications.js"
import type { ProviderConfig } from "../config/types.js"
/**
 * Fetch notifications from the Kilocode backend
 *
 * @param provider - The provider configuration (must be a kilocode provider)
 * @returns Array of notifications, or empty array if fetch fails or provider is not kilocode
 */
export declare function fetchKilocodeNotifications({
	provider,
	kilocodeToken,
}: ProviderConfig): Promise<KilocodeNotification[]>
/**
 * Check if a provider supports notifications
 *
 * @param provider - The provider configuration
 * @returns true if the provider supports notifications
 */
export declare function supportsNotifications(provider: ProviderConfig): boolean
/**
 * Generate a CLI message from a Kilocode notification
 *
 * @param notification - The notification to convert to a CLI message
 * @returns A CLI message object
 */
export declare function generateNotificationMessage(notification: KilocodeNotification): {
	type: "system"
	content: string
	id: string
	ts: number
}
//# sourceMappingURL=notifications.d.ts.map
