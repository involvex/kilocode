import React from "react"
import { StoryTable } from "./StoryTable"
/**
 * Creates a story object that makes rendering a matrix of properties quick and easy
 *
 * The rows and columns are properly typed based on the component's props, ensuring type safety.
 *
 * Example usage:
 * ```tsx
 * export const Variants = createTableStory({
 *   component: Button,
 *   rows: { variant: ["default", "destructive", "outline"] },
 *   columns: { size: ["sm", "default", "lg"] },
 *   defaultProps: { children: "Button", onClick: fn() }
 * })
 * ```
 */
export function createTableStory(props) {
	const { component: Component, rows = {}, columns = {}, defaultProps = {}, cellClassName, storyParameters } = props
	const rowProps = buildLabledProps(rows)
	const columnProps = buildLabledProps(columns)
	// If no rows or columns specified, create a simple single-cell table
	const finalRows = rowProps.length > 0 ? rowProps : [{ label: "", props: {} }]
	const finalColumns = columnProps.length > 0 ? columnProps : [{ label: "", props: {} }]
	return {
		render: () => (
			<StoryTable
				rows={finalRows}
				columns={finalColumns}
				renderCellFn={(props) => <Component {...{ ...defaultProps, ...props }} />}
				cellClassName={cellClassName}
			/>
		),
		parameters: storyParameters,
	}
}
function buildLabledProps(props) {
	return Object.keys(props)
		.map((propName) => {
			const propValues = props[propName]
			return propValues.map((option) => ({
				label: `${propName} = ${String(option)}`,
				props: { [propName]: option },
			}))
		})
		.flat()
}
