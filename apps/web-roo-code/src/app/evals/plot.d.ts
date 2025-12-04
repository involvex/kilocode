import type { EvalRun } from "./types"
type PlotProps = {
	tableData: (EvalRun & {
		label: string
		cost: number
	})[]
}
export declare const Plot: ({ tableData }: PlotProps) => import("react").JSX.Element
export {}
//# sourceMappingURL=plot.d.ts.map
