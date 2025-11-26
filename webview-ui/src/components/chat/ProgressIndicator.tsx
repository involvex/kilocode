export const ProgressIndicator = () => (
	<div
		style={{
			width: "16px",
			height: "16px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}>
		<div
			style={{
				width: "12px",
				height: "12px",
				border: "2px solid var(--vscode-progressBar-background)",
				borderTopColor: "var(--vscode-button-foreground)",
				borderRadius: "50%",
				animation: "spin 1s linear infinite",
			}}
		/>
		<style>{`
			@keyframes spin {
				to { transform: rotate(360deg); }
			}
		`}</style>
	</div>
)
