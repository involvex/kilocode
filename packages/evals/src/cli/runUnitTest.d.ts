import type { Task } from "../db/index.js"
import { Logger } from "./utils.js"
type RunUnitTestOptions = {
	task: Task
	logger: Logger
}
export declare const runUnitTest: ({ task, logger }: RunUnitTestOptions) => Promise<boolean>
export {}
//# sourceMappingURL=runUnitTest.d.ts.map
