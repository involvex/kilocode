import { KiloOrganization } from "../../shared/kilocode/organization"
/**
 * Service for fetching and managing Kilo Code organization settings
 */
export declare class OrganizationService {
	/**
	 * Fetches organization details from the Kilo Code API
	 * @param kilocodeToken - The authentication token
	 * @param organizationId - The organization ID
	 * @param kilocodeTesterWarningsDisabledUntil - Timestamp for suppressing tester warnings
	 * @returns The organization object with settings
	 */
	static fetchOrganization(
		kilocodeToken: string,
		organizationId: string,
		kilocodeTesterWarningsDisabledUntil?: number,
	): Promise<KiloOrganization | null>
	/**
	 * Checks if code indexing is enabled for an organization
	 * @param organization - The organization object
	 * @returns true if code indexing is enabled (defaults to false if not specified)
	 */
	static isCodeIndexingEnabled(organization: KiloOrganization | null): boolean
}
//# sourceMappingURL=OrganizationService.d.ts.map
