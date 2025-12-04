import { config } from "@roo-code/config-eslint/base"
import globals from "globals"

/** @type {import("eslint").Linter.Config} */
export default [
	...config,
	{
		files: ["**/__tests__/**", "**/*.test.*"],
		languageOptions: {
			globals: {
				...globals.vitest,
			},
		},
	},
]
