import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

export default [
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	{
		plugins: {
			turbo: turboPlugin,
		},
		rules: {
			"turbo/no-undeclared-env-vars": "off",
		},
	},
	{
		languageOptions: {
			globals: {
				console: "readonly",
				process: "readonly",
				Buffer: "readonly",
				global: "readonly",
				setTimeout: "readonly",
				clearTimeout: "readonly",
				setInterval: "readonly",
				clearInterval: "readonly",
				setImmediate: "readonly",
				clearImmediate: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
				require: "readonly",
				module: "readonly",
				exports: "readonly",
				fetch: "readonly",
				AbortController: "readonly",
				URL: "readonly",
				URLSearchParams: "readonly",
				ReadableStream: "readonly",
				WritableStream: "readonly",
				TransformStream: "readonly",
				TextEncoder: "readonly",
				TextDecoder: "readonly",
				performance: "readonly",
				crypto: "readonly",
				WebSocket: "readonly",
				EventSource: "readonly",
				window: "readonly",
			},
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-empty-object-type": "off",
			"no-unused-private-class-members": "off",
			"no-unsafe-optional-chaining": "off",
		},
	},
	{
		ignores: ["dist/*", "scripts/*"],
	},
]
