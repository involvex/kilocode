import type { KilocodeOrganization, KilocodeProfileData } from "../../types.js"
export declare const INVALID_TOKEN_ERROR = "INVALID_TOKEN"
/**
 * Fetch user profile data from Kilocode API
 * @param kilocodeToken - The Kilocode API token
 * @returns Profile data including user info and organizations
 * @throws Error with "INVALID_TOKEN" message if token is invalid (401/403)
 * @throws Error with details for other failures
 */
export declare function getKilocodeProfile(kilocodeToken: string): Promise<KilocodeProfileData>
/**
 * Fetch the default model from Kilocode API
 * @param kilocodeToken - The Kilocode API token
 * @param organizationId - Optional organization ID for org-specific defaults
 * @returns The default model ID, or falls back to openRouterDefaultModelId on error
 */
export declare function getKilocodeDefaultModel(kilocodeToken: string, organizationId?: string): Promise<string>
/**
 * Prompt user to select an organization or personal account
 * @param organizations List of organizations the user belongs to
 * @returns Organization ID or undefined for personal account
 */
export declare function promptOrganizationSelection(organizations: KilocodeOrganization[]): Promise<string | undefined>
//# sourceMappingURL=shared.d.ts.map
