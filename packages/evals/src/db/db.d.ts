import postgres from "postgres"
import * as schema from "./schema.js"
declare const client: import("drizzle-orm/postgres-js").PostgresJsDatabase<typeof schema> & {
	$client: postgres.Sql<{}>
}
declare let testDb: typeof client | undefined
declare const getProductionClient: () => import("drizzle-orm/postgres-js").PostgresJsDatabase<typeof schema> & {
	$client: postgres.Sql<{}>
}
declare const disconnect: () => Promise<void>
type DatabaseOrTransaction = typeof client | Parameters<Parameters<typeof client.transaction>[0]>[0]
export { client, testDb, getProductionClient, disconnect, type DatabaseOrTransaction }
//# sourceMappingURL=db.d.ts.map
