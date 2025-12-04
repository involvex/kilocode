import * as React from "react"
import { type VariantProps } from "class-variance-authority"
/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
declare const multiSelectVariants: (
	props?:
		| ({
				variant?: "default" | "secondary" | "destructive" | "inverted" | null | undefined
		  } & import("class-variance-authority/types").ClassProp)
		| undefined,
) => string
/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof multiSelectVariants> {
	/**
	 * An array of option objects to be displayed in the multi-select component.
	 * Each option object has a label and value.
	 */
	options: {
		/** The text to display for the option. */
		label: string
		/** The unique value associated with the option. */
		value: string
	}[]
	/**
	 * Callback function triggered when the selected values change.
	 * Receives an array of the new selected values.
	 */
	onValueChange: (value: string[]) => void
	/** The default selected values when the component mounts. */
	defaultValue?: string[]
	/**
	 * Placeholder text to be displayed when no values are selected.
	 * Optional, defaults to "Select options".
	 */
	placeholder?: string
	/**
	 * Maximum number of items to display. Extra selected items will be summarized.
	 * Optional, defaults to 3.
	 */
	maxCount?: number
	/**
	 * The modality of the popover. When set to true, interaction with outside elements
	 * will be disabled and only popover content will be visible to screen readers.
	 * Optional, defaults to false.
	 */
	modalPopover?: boolean
	/**
	 * If true, renders the multi-select component as a child of another component.
	 * Optional, defaults to false.
	 */
	asChild?: boolean
	/**
	 * Additional class names to apply custom styles to the multi-select component.
	 * Optional, can be used to add custom styles.
	 */
	className?: string
}
export declare const MultiSelect: React.ForwardRefExoticComponent<
	MultiSelectProps & React.RefAttributes<HTMLDivElement>
>
export {}
//# sourceMappingURL=multi-select.d.ts.map
