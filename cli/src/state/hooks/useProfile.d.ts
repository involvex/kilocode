/**
 * Hook for managing Kilocode profile and balance data
 */
import { getCurrentOrganization, type ProfileData, type BalanceData } from "../atoms/profile.js"
/**
 * Return type for useProfile hook
 */
export interface UseProfileReturn {
	profileData: ProfileData | null
	balanceData: BalanceData | null
	currentOrganization: ReturnType<typeof getCurrentOrganization> | null
	hasOrganizations: boolean
	profileLoading: boolean
	balanceLoading: boolean
	profileError: string | null
	balanceError: string | null
	fetchProfile: () => Promise<void>
	fetchBalance: () => Promise<void>
	fetchAll: () => Promise<void>
}
/**
 * Hook for managing Kilocode profile and balance data
 *
 * Provides access to profile data, balance, organizations, and methods to fetch data.
 * Automatically handles loading states and errors.
 *
 */
export declare function useProfile(): UseProfileReturn
//# sourceMappingURL=useProfile.d.ts.map
