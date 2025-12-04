import React from "react"
import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	tags: string[]
	argTypes: {
		isHidden: {
			control: string
			description: string
		}
		showAnnouncement: {
			control: string
			description: string
		}
		hideAnnouncement: {
			action: string
			description: string
		}
	}
	args: {
		isHidden: boolean
		showAnnouncement: boolean
		hideAnnouncement: import("storybook/internal/test").Mock<(...args: any[]) => any>
	}
	decorators: ((
		Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react-vite").ReactRenderer, any>,
	) => React.JSX.Element)[]
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
export declare const EmptyWithNotificationsAndHistory: Story
//# sourceMappingURL=ChatView.stories.d.ts.map
