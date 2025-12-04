/**
 * API client for managed codebase indexing
 *
 * This module provides pure functions for communicating with the Kilo Code
 * backend API for managed indexing operations (upsert, search, delete, manifest).
 */
import { SearchRequest, SearchResult, ServerManifest } from "./types"
/**
 * Searches code in the managed index with branch preferences
 *
 * @param request Search request with preferences
 * @param kilocodeToken Authentication token
 * @param signal Optional AbortSignal to cancel the request
 * @returns Array of search results sorted by relevance
 * @throws Error if the request fails
 */
export declare function searchCode(
	request: SearchRequest,
	kilocodeToken: string,
	signal?: AbortSignal,
): Promise<SearchResult[]>
/**
 * Parameters for upserting a file to the server
 */
export interface UpsertFileParams {
	/** The file content as a Buffer */
	fileBuffer: Buffer
	/** Organization ID (must be a valid UUID) */
	organizationId: string
	/** Project ID */
	projectId: string
	/** Relative file path from workspace root */
	filePath: string
	/** Hash of the file content */
	fileHash: string
	/** Git branch name (defaults to 'main') */
	gitBranch?: string
	/** Whether this is from a base branch (defaults to true) */
	isBaseBranch?: boolean
	/** Authentication token */
	kilocodeToken: string
}
/**
 * Upserts a file to the server using multipart file upload
 *
 * @param params Parameters for the file upload
 * @param signal Optional AbortSignal to cancel the request
 * @throws Error if the request fails
 */
export declare function upsertFile(params: UpsertFileParams, signal?: AbortSignal): Promise<void>
/**
 * Gets the server manifest for a specific branch
 *
 * The manifest contains metadata about all indexed files on the branch,
 * allowing clients to determine what needs to be indexed.
 *
 * @param organizationId Organization ID
 * @param projectId Project ID
 * @param gitBranch Git branch name
 * @param kilocodeToken Authentication token
 * @param signal Optional AbortSignal to cancel the request
 * @returns Server manifest with file metadata
 * @throws Error if the request fails
 */
export declare function getServerManifest(
	organizationId: string,
	projectId: string,
	gitBranch: string,
	kilocodeToken: string,
	signal?: AbortSignal,
): Promise<ServerManifest>
//# sourceMappingURL=api-client.d.ts.map
