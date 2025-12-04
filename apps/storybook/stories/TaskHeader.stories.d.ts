import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	decorators: any[]
	args: {
		handleCondenseContext: import("storybook/internal/test").Mock<(...args: any[]) => any>
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
//# sourceMappingURL=TaskHeader.stories.d.ts.map
