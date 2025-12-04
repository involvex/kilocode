import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	decorators: any[]
	argTypes: {}
	args: {
		handleCondenseContext: import("storybook/internal/test").Mock<(...args: any[]) => any>
		onClose: import("storybook/internal/test").Mock<(...args: any[]) => any>
		onMessageClick: import("storybook/internal/test").Mock<(...args: any[]) => any>
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
export declare const WithoutTimeline: Story
export declare const NearContextLimit: Story
//# sourceMappingURL=KiloTaskHeader.stories.d.ts.map
