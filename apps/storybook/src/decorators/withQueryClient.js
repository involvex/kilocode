import { QueryClientProvider, QueryClient } from "../../../../webview-ui/src/exports"
const queryClient = new QueryClient()
// Decorator to provide QueryClient for all stories using the shared provider from webview-ui
export const withQueryClient = (Story) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Story />
		</QueryClientProvider>
	)
}
