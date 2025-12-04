import { config } from "@roo-code/config-eslint/base"
import globals from "globals"

/** @type {import("eslint").Linter.Config} */
export default [
	...config,
	{
		files: ["**/*.test.js", "**/runTest.js", "**/utils.js", "**/suite/index.js"],
		rules: {
			"@typescript-eslint/no-require-imports": "off",
		},
	},
	{
		files: ["**/*.test.js"],
		languageOptions: {
			globals: {
				...globals.mocha,
			},
		},
	},
]
