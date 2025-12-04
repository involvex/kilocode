import { TooltipProvider } from "@/components/ui/tooltip"
export const withTooltipProvider = (Story) => {
	return (
		<TooltipProvider>
			<Story />
		</TooltipProvider>
	)
}
