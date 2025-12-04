import { nextJsConfig } from "@roo-code/config-eslint/next-js"
import globals from "globals"

/** @type {import("eslint").Linter.Config} */
export default [
	...nextJsConfig,
	{
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"react/prop-types": "off",
		},
	},
	{
		files: ["**/*.d.ts"],
		rules: {
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
