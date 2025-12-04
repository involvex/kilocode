import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	tags: string[]
	args: {
		isVisible: boolean
		onDismiss: () => void
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const ModelNoImageSupport: Story
export declare const MaxImagesReached: Story
//# sourceMappingURL=ImageWarningBanner.stories.d.ts.map
