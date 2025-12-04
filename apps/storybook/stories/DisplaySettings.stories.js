import { fn } from "storybook/test"
import { DisplaySettings } from "../../../webview-ui/src/components/settings/DisplaySettings"
const meta = {
	title: "Settings/DisplaySettings",
	component: DisplaySettings,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		showTaskTimeline: {
			control: { type: "boolean" },
			description: "Whether the task timeline is enabled",
		},
	},
	args: {
		setCachedStateField: fn(),
	},
}
export default meta
export const Default = {}
