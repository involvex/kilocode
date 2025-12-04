import { IVectorStore } from "../interfaces/vector-store"
import { VectorStoreSearchResult } from "../interfaces"
import { LanceDBManager } from "../../../utils/lancedb-manager"
/**
 * Local implementation of the vector store using LanceDB
 */
export declare class LanceDBVectorStore implements IVectorStore {
	private readonly vectorSize
	private readonly dbPath
	private readonly workspacePath
	private db
	private table
	private readonly vectorTableName
	private readonly metadataTableName
	private lancedbManager
	private lancedbModule
	constructor(workspacePath: string, vectorSize: number, dbDirectory: string, lancedbManager: LanceDBManager)
	/**
	 * Dynamically loads the LanceDB module.
	 * @returns The LanceDB module.
	 */
	private loadLanceDBModule
	/**
	 * Gets or connects to the LanceDB database.
	 * @returns The LanceDB connection.
	 */
	private getDb
	/**
	 * Gets or opens the vector table.
	 * @returns The LanceDB table.
	 */
	private getTable
	/**
	 * Creates sample data for the vector table schema.
	 * @returns An array containing sample data.
	 */
	private _createSampleData
	/**
	 * Creates metadata for the vector size.
	 * @returns An array containing metadata.
	 */
	private _createMetadataData
	/**
	 * Creates the vector table and deletes the sample data.
	 * @param db The LanceDB connection.
	 */
	private _createVectorTable
	/**
	 * Creates the metadata table.
	 * @param db The LanceDB connection.
	 */
	private _createMetadataTable
	/**
	 * Drops a table if it exists.
	 * @param db The LanceDB connection.
	 * @param tableName The name of the table to drop.
	 */
	private _dropTableIfExists
	/**
	 * Retrieves the stored vector size from the metadata table.
	 * @param db The LanceDB connection.
	 * @returns The stored vector size, or null if not found.
	 */
	private _getStoredVectorSize
	initialize(): Promise<boolean>
	upsertPoints(
		points: Array<{
			id: string
			vector: number[]
			payload: Record<string, any>
		}>,
	): Promise<void>
	private escapeSqlString
	private escapeSqlLikePattern
	private isPayloadValid
	search(
		queryVector: number[],
		directoryPrefix?: string,
		minScore?: number,
		maxResults?: number,
	): Promise<VectorStoreSearchResult[]>
	deletePointsByFilePath(filePath: string): Promise<void>
	deletePointsByMultipleFilePaths(filePaths: string[]): Promise<void>
	deleteCollection(): Promise<void>
	clearCollection(): Promise<void>
	collectionExists(): Promise<boolean>
	private closeConnect
	/**
	 * Optimizes the table to reduce disk space usage and improve performance.
	 * This method performs compaction, pruning of old versions, and index optimization.
	 * Should be called periodically to prevent unbounded disk space growth.
	 */
	optimizeTable(): Promise<void>
	/**
	 * Checks if the collection exists and has indexed points
	 * @returns Promise resolving to boolean indicating if the collection exists and has points
	 */
	hasIndexedData(): Promise<boolean>
	/**
	 * Marks the indexing process as complete by storing metadata
	 * Should be called after a successful full workspace scan or incremental scan
	 */
	markIndexingComplete(): Promise<void>
	/**
	 * Marks the indexing process as incomplete by storing metadata
	 * Should be called at the start of indexing to indicate work in progress
	 */
	markIndexingIncomplete(): Promise<void>
}
//# sourceMappingURL=lancedb-vector-store.d.ts.map
