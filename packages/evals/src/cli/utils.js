import * as fs from "fs"
import * as path from "path"
import { execa } from "execa"
export const getTag = (caller, { run, task }) =>
	task
		? `${caller} | pid:${process.pid} | run:${run.id} | task:${task.id} | ${task.language}/${task.exercise}`
		: `${caller} | pid:${process.pid} | run:${run.id}`
export const isDockerContainer = () => {
	try {
		return fs.existsSync("/.dockerenv")
	} catch (_error) {
		return false
	}
}
export const resetEvalsRepo = async ({ run, cwd }) => {
	await execa({ cwd })`git config user.name "Roo Code"`
	await execa({ cwd })`git config user.email "support@roocode.com"`
	await execa({ cwd })`git checkout -f`
	await execa({ cwd })`git clean -fd`
	await execa({ cwd })`git checkout -b runs/${run.id}-${crypto.randomUUID().slice(0, 8)} main`
}
export const commitEvalsRepoChanges = async ({ run, cwd }) => {
	await execa({ cwd })`git add .`
	await execa({ cwd })`git commit -m ${`Run #${run.id}`} --no-verify`
}
var LogLevel
;(function (LogLevel) {
	LogLevel["INFO"] = "INFO"
	LogLevel["ERROR"] = "ERROR"
	LogLevel["WARN"] = "WARN"
	LogLevel["DEBUG"] = "DEBUG"
})(LogLevel || (LogLevel = {}))
export class Logger {
	logStream
	logFilePath
	tag
	constructor({ logDir, filename, tag }) {
		this.tag = tag
		this.logFilePath = path.join(logDir, filename)
		this.initializeLogger(logDir)
	}
	initializeLogger(logDir) {
		try {
			fs.mkdirSync(logDir, { recursive: true })
		} catch (error) {
			console.error(`Failed to create log directory ${logDir}:`, error)
		}
		try {
			this.logStream = fs.createWriteStream(this.logFilePath, { flags: "a" })
		} catch (error) {
			console.error(`Failed to create log file ${this.logFilePath}:`, error)
		}
	}
	writeToLog(level, message, ...args) {
		try {
			const timestamp = new Date().toISOString()
			const logLine = `[${timestamp} | ${level} | ${this.tag}] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}\n`
			console.log(logLine.trim())
			if (this.logStream) {
				this.logStream.write(logLine)
			}
		} catch (error) {
			console.error(`Failed to write to log file ${this.logFilePath}:`, error)
		}
	}
	info(message, ...args) {
		this.writeToLog(LogLevel.INFO, message, ...args)
	}
	error(message, ...args) {
		this.writeToLog(LogLevel.ERROR, message, ...args)
	}
	warn(message, ...args) {
		this.writeToLog(LogLevel.WARN, message, ...args)
	}
	debug(message, ...args) {
		this.writeToLog(LogLevel.DEBUG, message, ...args)
	}
	log(message, ...args) {
		this.info(message, ...args)
	}
	close() {
		if (this.logStream) {
			this.logStream.end()
			this.logStream = undefined
		}
	}
}
