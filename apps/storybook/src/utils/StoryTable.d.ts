import type { ReactNode } from "react"
export interface StoryTableCellProps<Props> {
	label?: string
	props: Props
}
export interface StoryTableProps<RowProps, ColumnProps> {
	rows?: StoryTableCellProps<RowProps>[]
	columns?: StoryTableCellProps<ColumnProps>[]
	renderCellFn?: (props: ColumnProps & RowProps) => ReactNode
	cellClassName?: string
}
/**
 * StoryTable - A utility component for rendering component variations in a table format
 *
 * Enables comprehensive visual testing by displaying all combinations of component.
 *
 * Example usage:
 * ```tsx
 * const variantRows = buildSimpleTableProps({ variant: ["default", "destructive", "outline"] })
 * const sizeColumns = buildSimpleTableProps({ size: ["sm", "default", "lg"] })
 *
 * <StoryTable
 *   rows={variantRows}
 *   columns={sizeColumns}
 *   renderCellFn={(props) => <Button {...props}>Button</Button>}
 *   cellClassName="p-4"
 * />
 * ```
 */
export declare function StoryTable<RowProps, ColumnProps>(
	props: StoryTableProps<RowProps, ColumnProps>,
): import("react").JSX.Element
//# sourceMappingURL=StoryTable.d.ts.map
