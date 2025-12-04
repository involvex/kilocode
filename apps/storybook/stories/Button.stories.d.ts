import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	parameters: {
		layout: string
	}
	tags: string[]
	argTypes: {
		variant: {
			control: {
				type: string
			}
			options: readonly ["default", "destructive", "outline", "secondary", "ghost", "link"]
		}
		size: {
			control: {
				type: string
			}
			options: readonly ["default", "sm", "lg", "icon"]
		}
	}
	args: {
		onClick: import("storybook/internal/test").Mock<(...args: any[]) => any>
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
export declare const Variants: any
export declare const States: any
//# sourceMappingURL=Button.stories.d.ts.map
