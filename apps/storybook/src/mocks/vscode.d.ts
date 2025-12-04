declare const ColorThemeKind: {
	readonly Light: 1
	readonly Dark: 2
	readonly HighContrast: 3
	readonly HighContrastLight: 4
}
declare const window: {
	readonly activeColorTheme:
		| {
				kind: 1
		  }
		| {
				kind: 2
		  }
}
declare const workspace: {
	getConfiguration: () => {
		get: (key: string) => "Light+ (default light)" | "Dark+ (default dark)" | undefined
	}
}
export { ColorThemeKind, window, workspace }
declare const _default: {
	ColorThemeKind: {
		readonly Light: 1
		readonly Dark: 2
		readonly HighContrast: 3
		readonly HighContrastLight: 4
	}
	window: {
		readonly activeColorTheme:
			| {
					kind: 1
			  }
			| {
					kind: 2
			  }
	}
	workspace: {
		getConfiguration: () => {
			get: (key: string) => "Light+ (default light)" | "Dark+ (default dark)" | undefined
		}
	}
}
export default _default
//# sourceMappingURL=vscode.d.ts.map
