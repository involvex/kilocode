import { type TokenUsage } from "@roo-code/types"
import type { Run, Task, TaskMetrics } from "@roo-code/evals"
import { type EventSourceStatus } from "@/hooks/use-event-source"
export type RunStatus = {
	sseStatus: EventSourceStatus
	heartbeat: string | null | undefined
	runners: string[] | undefined
	tasks:
		| (Task & {
				taskMetrics: TaskMetrics | null
		  })[]
		| undefined
	tokenUsage: Map<
		number,
		TokenUsage & {
			duration?: number
		}
	>
	usageUpdatedAt: number | undefined
}
export declare const useRunStatus: (run: Run) => RunStatus
//# sourceMappingURL=use-run-status.d.ts.map
