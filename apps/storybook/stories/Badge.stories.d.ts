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
			options: readonly ["default", "secondary", "destructive", "outline"]
		}
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
export declare const Variants: any
//# sourceMappingURL=Badge.stories.d.ts.map
