import { nextJsConfig } from "@roo-code/config-eslint/next-js"

/** @type {import("eslint").Linter.Config} */
export default [
	...nextJsConfig,
	{
		rules: {
			"react/prop-types": "off",
		},
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
]
