import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	parameters: {
		layout: string
	}
	tags: string[]
	argTypes: {
		showTaskTimeline: {
			control: {
				type: string
			}
			description: string
		}
	}
	args: {
		setCachedStateField: import("storybook/internal/test").Mock<(...args: any[]) => any>
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
//# sourceMappingURL=DisplaySettings.stories.d.ts.map
