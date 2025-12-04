import { defineConfig } from "tsup"

export default [
	defineConfig({
		entry: ["src/index.ts"],
		format: ["cjs", "esm"],
		dts: false, // Disable DTS generation for the main index.ts
		splitting: false,
		sourcemap: true,
		clean: true,
		outDir: "dist",
	}),
	defineConfig({
		entry: ["src/cli.ts"],
		format: ["cjs", "esm"],
		dts: true, // Enable DTS generation only for cli.ts
		splitting: false,
		sourcemap: true,
		clean: false, // Do not clean the dist folder again
		outDir: "dist",
	}),
]
