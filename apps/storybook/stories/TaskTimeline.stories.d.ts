import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	parameters: {
		layout: string
	}
	tags: string[]
	argTypes: {}
	args: {
		onMessageClick: import("storybook/internal/test").Mock<(...args: any[]) => any>
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const CompletedTask: Story
export declare const ActiveTask: Story
export declare const LongTask: Story
export declare const AllMessageTypes: Story
export declare const NarrowWindow: Story
//# sourceMappingURL=TaskTimeline.stories.d.ts.map
