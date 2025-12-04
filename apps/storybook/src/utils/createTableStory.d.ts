import React from "react"
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
export declare function createTableStory<T extends Record<string, any>>(props: {
	component: React.ComponentType<T>
	rows?: {
		[K in keyof T]?: readonly T[K][]
	}
	columns?: {
		[K in keyof T]?: readonly T[K][]
	}
	defaultProps?: Partial<T>
	cellClassName?: string
	storyParameters?: Record<string, any>
}): {
	render: () => React.JSX.Element
	parameters: Record<string, any> | undefined
}
//# sourceMappingURL=createTableStory.d.ts.map
