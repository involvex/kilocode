import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { schema } from "../schema.js"
export declare const copyRun: ({
	sourceDb,
	targetDb,
	runId,
}: {
	sourceDb: NodePgDatabase<typeof schema>
	targetDb: NodePgDatabase<typeof schema>
	runId: number
}) => Promise<number>
//# sourceMappingURL=copyRun.d.ts.map
