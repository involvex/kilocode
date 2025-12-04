function getIconFromLevel(level) {
	switch (level) {
		case "debug":
			return "🔵"
		case "info":
			return "🟢"
		case "warn":
			return "🟡"
		case "error":
			return "🔴"
	}
	return "X"
}
export class Logger {
	filename
	includeFilename
	constructor(filename, includeFilename = false) {
		this.filename = filename
		this.includeFilename = includeFilename
	}
	#formatMessage(level, message) {
		return `${getIconFromLevel(level)} ${this.includeFilename ? `[${this.filename}] ` : ""}${message}`
	}
	debug(message, ...args) {
		console.debug(this.#formatMessage("debug", message), ...args)
	}
	info(message, ...args) {
		console.info(this.#formatMessage("info", message), ...args)
	}
	warn(message, ...args) {
		console.info(this.#formatMessage("warn", message), ...args)
	}
	error(message, ...args) {
		console.info(this.#formatMessage("error", message), ...args)
	}
}
//# sourceMappingURL=logger.js.map
