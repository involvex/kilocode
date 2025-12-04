import { config } from "@roo-code/config-eslint/base"
import globals from "globals"

/** @type {import("eslint").Linter.Config} */
export default [
	...config,
	{
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
	{
		files: ["**/__tests__/**", "**/*.test.*"],
		languageOptions: {
			globals: {
				...globals.vitest,
			},
		},
	},
]
