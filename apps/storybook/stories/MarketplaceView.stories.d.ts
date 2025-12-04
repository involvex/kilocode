import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	argTypes: {
		targetTab: {
			control: {
				type: string
			}
			options: string[]
			description: string
		}
		hideHeader: {
			control: string
			description: string
		}
		onDone: {
			action: string
			description: string
		}
	}
	args: {
		hideHeader: boolean
		onDone: () => void
	}
	decorators: any[]
	parameters: {
		extensionState: any
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const MCPTab: Story
export declare const ModeTab: Story
//# sourceMappingURL=MarketplaceView.stories.d.ts.map
