import { TabbedCodeIndexPopoverTabs } from "@/components/chat/kilocode/TabbedCodeIndexPopover"
const meta = {
	title: "Chat/TabbedCodeIndexPopover",
	component: TabbedCodeIndexPopoverTabs,
	parameters: { layout: "centered" },
	args: {
		indexingStatus: {
			systemStatus: "indexing",
			message: "Indexing files...",
			processedItems: 250,
			totalItems: 1000,
			currentItemUnit: "files",
			workspacePath: "/Users/example/project",
			gitBranch: "main",
			manifest: {
				totalFiles: 850,
				totalChunks: 3400,
				lastUpdated: new Date().toISOString(),
			},
		},
	},
}
export default meta
export const Default = {}
