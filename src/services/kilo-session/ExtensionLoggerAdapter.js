export class ExtensionLoggerAdapter {
	outputChannel
	constructor(outputChannel) {
		this.outputChannel = outputChannel
	}
	formatLog(message, source, metadata) {
		const timestamp = new Date().toISOString()
		let logMessage = `[${timestamp}] [${source}] ${message}`
		if (metadata && Object.keys(metadata).length > 0) {
			try {
				logMessage += ` ${JSON.stringify(metadata)}`
			} catch (error) {
				logMessage += ` [metadata serialization error]`
			}
		}
		return logMessage
	}
	debug(message, source, metadata) {
		const logMessage = this.formatLog(message, source, metadata)
		this.outputChannel.appendLine(`[DEBUG] ${logMessage}`)
	}
	info(message, source, metadata) {
		const logMessage = this.formatLog(message, source, metadata)
		this.outputChannel.appendLine(`[INFO] ${logMessage}`)
	}
	warn(message, source, metadata) {
		const logMessage = this.formatLog(message, source, metadata)
		this.outputChannel.appendLine(`[WARN] ${logMessage}`)
	}
	error(message, source, metadata) {
		const logMessage = this.formatLog(message, source, metadata)
		this.outputChannel.appendLine(`[ERROR] ${logMessage}`)
	}
}
//# sourceMappingURL=ExtensionLoggerAdapter.js.map
