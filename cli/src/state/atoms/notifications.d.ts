/**
 * Notification type matching the backend API response
 */
export interface KilocodeNotification {
	id: string
	title: string
	message: string
	action?: {
		actionText: string
		actionURL: string
	}
	showIn?: string[]
}
/**
 * Core notifications atom - holds the list of notifications
 */
export declare const notificationsAtom: import("jotai").PrimitiveAtom<KilocodeNotification[]> & {
	init: KilocodeNotification[]
}
/**
 * Loading state atom for notification fetching
 */
export declare const notificationsLoadingAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Error state atom for notification fetching
 */
export declare const notificationsErrorAtom: import("jotai").PrimitiveAtom<Error | null> & {
	init: Error | null
}
//# sourceMappingURL=notifications.d.ts.map
