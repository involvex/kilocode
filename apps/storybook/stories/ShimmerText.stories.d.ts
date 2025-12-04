import React from "react"
import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	tags: string[]
	argTypes: {
		children: {
			control: string
			description: string
		}
		asChild: {
			control: string
			description: string
		}
		foregroundColor: {
			control: string
			description: string
		}
		highlightColor: {
			control: string
			description: string
		}
	}
	args: {
		children: string
	}
	decorators: ((
		Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react-vite").ReactRenderer, any>,
	) => React.JSX.Element)[]
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
export declare const Examples: Story
//# sourceMappingURL=ShimmerText.stories.d.ts.map
