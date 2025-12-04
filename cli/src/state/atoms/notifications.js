import { atom } from "jotai"
/**
 * Core notifications atom - holds the list of notifications
 */
export const notificationsAtom = atom([])
/**
 * Loading state atom for notification fetching
 */
export const notificationsLoadingAtom = atom(false)
/**
 * Error state atom for notification fetching
 */
export const notificationsErrorAtom = atom(null)
