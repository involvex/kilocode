export const getBoxWidth = (level) => {
	const width = process.stdout.columns || 80
	switch (level) {
		case 1:
			return width - 2
		case 2:
			return width - 4
		case 3:
			return width - 6
		default:
			return width
	}
}
