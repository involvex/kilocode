import { Badge } from "@/components/ui/badge"
import { createTableStory } from "../src/utils/createTableStory"
const BADGE_VARIANTS = ["default", "secondary", "destructive", "outline"]
const meta = {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: BADGE_VARIANTS,
		},
	},
}
export default meta
export const Default = {
	args: {
		children: "Badge",
	},
}
export const Variants = createTableStory({
	component: Badge,
	rows: { variant: BADGE_VARIANTS },
	columns: { children: ["Badge", "42", "This is a longer badge text"] },
	cellClassName: "p-4",
})
