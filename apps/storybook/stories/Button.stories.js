import { fn } from "storybook/test"
import { Button } from "@/components/ui/button"
import { createTableStory } from "../src/utils/createTableStory"
const BUTTON_VARIANTS = ["default", "destructive", "outline", "secondary", "ghost", "link"]
const BUTTON_SIZES = ["default", "sm", "lg", "icon"]
const STORY_TABLE_SIZES = ["default", "sm", "lg"]
const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: BUTTON_VARIANTS,
		},
		size: {
			control: { type: "select" },
			options: BUTTON_SIZES,
		},
	},
	args: { onClick: fn() },
}
export default meta
export const Default = {
	args: {
		children: "Button",
	},
}
export const Variants = createTableStory({
	component: Button,
	rows: { variant: BUTTON_VARIANTS },
	columns: { size: STORY_TABLE_SIZES },
	defaultProps: { children: "Button", onClick: fn() },
})
export const States = createTableStory({
	component: Button,
	rows: { variant: BUTTON_VARIANTS },
	columns: { disabled: [false, true] },
	defaultProps: { children: "Button", onClick: fn() },
})
