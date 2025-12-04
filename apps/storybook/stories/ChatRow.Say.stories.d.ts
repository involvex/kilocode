import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	argTypes: {
		message: {
			control: boolean
			description: string
		}
		isExpanded: {
			control: string
			description: string
		}
		isLast: {
			control: string
			description: string
		}
		isStreaming: {
			control: string
			description: string
		}
	}
	args: {
		isExpanded: boolean
		isLast: boolean
		isStreaming: boolean
		onToggleExpand: import("storybook/internal/test").Mock<(...args: any[]) => any>
		onHeightChange: import("storybook/internal/test").Mock<(...args: any[]) => any>
		onSuggestionClick: import("storybook/internal/test").Mock<(...args: any[]) => any>
		onBatchFileResponse: import("storybook/internal/test").Mock<(...args: any[]) => any>
		highlighted: boolean
		enableCheckpoints: boolean
		onFollowUpUnmount: import("storybook/internal/test").Mock<(...args: any[]) => any>
		isFollowUpAnswered: boolean
		editable: boolean
		hasCheckpoint: boolean
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const AllSayStories: Story
//# sourceMappingURL=ChatRow.Say.stories.d.ts.map
