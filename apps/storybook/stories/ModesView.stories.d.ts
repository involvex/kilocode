import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	argTypes: {
		onDone: {
			action: string
			description: string
		}
	}
	decorators: any[]
	parameters: {
		extensionState: any
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
//# sourceMappingURL=ModesView.stories.d.ts.map
