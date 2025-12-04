import { type TaskEvent } from "@roo-code/types"
import { type Run, type Task } from "../db/index.js"
import { Logger } from "./utils.js"
export declare const processTask: ({ taskId, logger }: { taskId: number; logger?: Logger }) => Promise<void>
export declare const processTaskInContainer: ({
	taskId,
	logger,
	maxRetries,
}: {
	taskId: number
	logger: Logger
	maxRetries?: number
}) => Promise<void>
type RunTaskOptions = {
	run: Run
	task: Task
	publish: (taskEvent: TaskEvent) => Promise<void>
	logger: Logger
}
export declare const runTask: ({ run, task, publish, logger }: RunTaskOptions) => Promise<void>
export {}
//# sourceMappingURL=runTask.d.ts.map
