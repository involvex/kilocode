import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	parameters: {
		layout: string
	}
	tags: string[]
	argTypes: {
		label: {
			control: {
				type: string
			}
		}
		currentValue: {
			control: {
				type: string
				min: number
			}
		}
		limitValue: {
			control: {
				type: string
				min: number
			}
		}
		className: {
			control: {
				type: string
			}
		}
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
export declare const Empty: Story
export declare const ProgressStates: any
//# sourceMappingURL=LabeledProgress.stories.d.ts.map
