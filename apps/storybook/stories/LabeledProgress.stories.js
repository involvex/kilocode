import { LabeledProgress } from "@/components/ui/labeled-progress"
import { createTableStory } from "../src/utils/createTableStory"
const meta = {
	title: "Components/LabeledProgress",
	component: LabeledProgress,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		label: {
			control: { type: "text" },
		},
		currentValue: {
			control: { type: "number", min: 0 },
		},
		limitValue: {
			control: { type: "number", min: 1 },
		},
		className: {
			control: { type: "text" },
		},
	},
}
export default meta
export const Default = {
	args: {
		label: "Storage Used",
		currentValue: 75,
		limitValue: 100,
	},
}
export const Empty = {
	args: {
		label: "No Usage",
		currentValue: 0,
		limitValue: 100,
	},
}
export const ProgressStates = createTableStory({
	component: LabeledProgress,
	rows: {
		currentValue: [0, 50, 100, 120],
	},
	columns: {
		limitValue: [100],
	},
	defaultProps: {
		label: "Progress",
		currentValue: 50,
		limitValue: 100,
	},
	cellClassName: "w-64",
})
