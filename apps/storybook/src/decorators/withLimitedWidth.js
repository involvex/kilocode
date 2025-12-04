// Function that creates a decorator with a limited width container
// Provides consistent centering and configurable max-width constraint
export const withLimitedWidth = (maxWidth = 600) => {
	return (Story) => (
		<div style={{ maxWidth: `${maxWidth}px`, margin: "0 auto" }}>
			<Story />
		</div>
	)
}
