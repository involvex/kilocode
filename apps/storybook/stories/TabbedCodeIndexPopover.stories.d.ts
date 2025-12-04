import type { StoryObj } from "@storybook/react-vite"
declare const meta: {
	title: string
	component: any
	parameters: {
		layout: string
	}
	args: {
		indexingStatus: {
			systemStatus: string
			message: string
			processedItems: number
			totalItems: number
			currentItemUnit: string
			workspacePath: string
			gitBranch: string
			manifest: {
				totalFiles: number
				totalChunks: number
				lastUpdated: string
			}
		}
	}
}
export default meta
type Story = StoryObj<typeof meta>
export declare const Default: Story
//# sourceMappingURL=TabbedCodeIndexPopover.stories.d.ts.map
