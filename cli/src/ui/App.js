import React from "react"
import { Provider as JotaiProvider } from "jotai"
import { UI } from "./UI.js"
import { KeyboardProvider } from "./providers/KeyboardProvider.js"
export const App = ({ store, options, onExit }) => {
	return (
		<JotaiProvider store={store}>
			<KeyboardProvider>
				<UI options={options} onExit={onExit} />
			</KeyboardProvider>
		</JotaiProvider>
	)
}
