/**
 * Profile and balance state atoms for Kilocode user data
 */
/**
 * Profile data structure from Kilocode API
 */
export interface ProfileUser {
	name?: string
	email?: string
	image?: string
}
export interface UserOrganization {
	id: string
	name: string
	role: string
}
export interface ProfileData {
	user?: ProfileUser
	organizations?: UserOrganization[]
}
export interface BalanceData {
	balance: number
}
/**
 * Atom to hold profile data
 */
export declare const profileDataAtom: import("jotai").PrimitiveAtom<ProfileData | null> & {
	init: ProfileData | null
}
/**
 * Atom to hold balance data
 */
export declare const balanceDataAtom: import("jotai").PrimitiveAtom<BalanceData | null> & {
	init: BalanceData | null
}
/**
 * Atom to track profile loading state
 */
export declare const profileLoadingAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Atom to track balance loading state
 */
export declare const balanceLoadingAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Atom to store profile errors
 */
export declare const profileErrorAtom: import("jotai").PrimitiveAtom<string | null> & {
	init: string | null
}
/**
 * Atom to store balance errors
 */
export declare const balanceErrorAtom: import("jotai").PrimitiveAtom<string | null> & {
	init: string | null
}
/**
 * Derived atom to get current organization details
 * Takes the organizationId as a parameter to avoid circular dependencies
 * Usage: get(getCurrentOrganization(organizationId))
 */
export declare const getCurrentOrganization: (
	organizationId: string | undefined,
) => import("jotai").Atom<UserOrganization | null>
/**
 * Derived atom to check if user has any organizations
 */
export declare const hasOrganizationsAtom: import("jotai").Atom<boolean>
/**
 * Action atom to update profile data
 */
export declare const updateProfileDataAtom: import("jotai").WritableAtom<null, [data: ProfileData | null], void> & {
	init: null
}
/**
 * Action atom to update balance data
 */
export declare const updateBalanceDataAtom: import("jotai").WritableAtom<null, [data: BalanceData | null], void> & {
	init: null
}
/**
 * Action atom to set profile loading state
 */
export declare const setProfileLoadingAtom: import("jotai").WritableAtom<null, [loading: boolean], void> & {
	init: null
}
/**
 * Action atom to set balance loading state
 */
export declare const setBalanceLoadingAtom: import("jotai").WritableAtom<null, [loading: boolean], void> & {
	init: null
}
/**
 * Action atom to set profile error
 */
export declare const setProfileErrorAtom: import("jotai").WritableAtom<null, [error: string | null], void> & {
	init: null
}
/**
 * Action atom to set balance error
 */
export declare const setBalanceErrorAtom: import("jotai").WritableAtom<null, [error: string | null], void> & {
	init: null
}
/**
 * Action atom to clear all profile data
 */
export declare const clearProfileDataAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
//# sourceMappingURL=profile.d.ts.map
