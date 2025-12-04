import type { Run, TaskMetrics } from "@roo-code/evals"
type RunWithTaskMetrics = Run & {
	taskMetrics: TaskMetrics | null
}
export declare function Runs({ runs }: { runs: RunWithTaskMetrics[] }): import("react").JSX.Element
export {}
//# sourceMappingURL=runs.d.ts.map
