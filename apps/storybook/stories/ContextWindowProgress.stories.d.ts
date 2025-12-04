import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	decorators: ((
		Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react-vite").ReactRenderer, any>,
	) => import("react").JSX.Element)[]
	parameters: {
		layout: string
	}
	tags: string[]
	argTypes: {
		contextWindow: {
			control: {
				type: string
			}
			description: string
		}
		contextTokens: {
			control: {
				type: string
			}
			description: string
		}
		maxTokens: {
			control: {
				type: string
			}
			description: string
		}
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const UnderLimit: Story
export declare const OverLimit: Story
//# sourceMappingURL=ContextWindowProgress.stories.d.ts.map
