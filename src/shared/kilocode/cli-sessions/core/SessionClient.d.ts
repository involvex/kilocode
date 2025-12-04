import type { TrpcClient } from "./TrpcClient.js"
export interface Session {
	session_id: string
	title: string
	created_at: string
	updated_at: string
}
export interface SessionWithSignedUrls extends Session {
	api_conversation_history_blob_url: string | null
	task_metadata_blob_url: string | null
	ui_messages_blob_url: string | null
	git_state_blob_url: string | null
}
export interface GetSessionInput {
	session_id: string
	include_blob_urls?: boolean
}
export type GetSessionOutput = Session | SessionWithSignedUrls
export interface CreateSessionInput {
	title?: string
	git_url?: string
	created_on_platform: string
}
export type CreateSessionOutput = Session
export interface UpdateSessionInput {
	session_id: string
	title?: string
	git_url?: string
}
export interface UpdateSessionOutput {
	session_id: string
	title: string
	updated_at: string
}
export interface ListSessionsInput {
	cursor?: string
	limit?: number
}
export interface ListSessionsOutput {
	cliSessions: Session[]
	nextCursor: string | null
}
export interface SearchSessionInput {
	search_string: string
	limit?: number
	offset?: number
}
export interface SearchSessionOutput {
	results: Session[]
	total: number
	limit: number
	offset: number
}
export declare enum CliSessionSharedState {
	Public = "public",
}
export type ShareSessionInput = {
	session_id: string
	shared_state: CliSessionSharedState
}
export interface ShareSessionOutput {
	share_id: string
	session_id: string
}
export interface ForkSessionInput {
	share_or_session_id: string
	created_on_platform: string
}
export interface ForkSessionOutput {
	session_id: string
}
export interface DeleteSessionInput {
	session_id: string
}
export interface DeleteSessionOutput {
	success: boolean
	session_id: string
}
/**
 * Client for interacting with session-related API endpoints.
 * Provides methods for CRUD operations on sessions.
 */
export declare class SessionClient {
	private readonly trpcClient
	constructor(trpcClient: TrpcClient)
	/**
	 * Get a specific session by ID
	 */
	get(input: GetSessionInput): Promise<GetSessionOutput>
	/**
	 * Create a new session
	 */
	create(input: CreateSessionInput): Promise<CreateSessionOutput>
	/**
	 * Update an existing session
	 */
	update(input: UpdateSessionInput): Promise<UpdateSessionOutput>
	/**
	 * List sessions with pagination support
	 */
	list(input?: ListSessionsInput): Promise<ListSessionsOutput>
	/**
	 * Search sessions
	 */
	search(input: SearchSessionInput): Promise<SearchSessionOutput>
	/**
	 * Share a session
	 */
	share(input: ShareSessionInput): Promise<ShareSessionOutput>
	/**
	 * Fork a shared session by share ID
	 */
	fork(input: ForkSessionInput): Promise<ForkSessionOutput>
	/**
	 * Delete a session
	 */
	delete(input: DeleteSessionInput): Promise<DeleteSessionOutput>
	/**
	 * Upload a blob for a session
	 */
	uploadBlob(
		sessionId: string,
		blobType: "api_conversation_history" | "task_metadata" | "ui_messages" | "git_state",
		blobData: unknown,
	): Promise<{
		session_id: string
		updated_at: string
	}>
}
//# sourceMappingURL=SessionClient.d.ts.map
