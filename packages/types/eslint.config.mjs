import { config } from "@roo-code/config-eslint/base"
import globals from "globals"

/** @type {import("eslint").Linter.Config} */
export default [
	...config,
	{
		files: ["**/*.cjs"],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.commonjs,
			},
			sourceType: "commonjs",
		},
		rules: {
			"@typescript-eslint/no-require-imports": "off",
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
	{
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-object-type": "off",
		},
	},
	{
		ignores: ["**/*.d.ts.map"],
	},
]
