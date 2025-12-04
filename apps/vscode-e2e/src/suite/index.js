"use strict"
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				var desc = Object.getOwnPropertyDescriptor(m, k)
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k]
						},
					}
				}
				Object.defineProperty(o, k2, desc)
			}
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				o[k2] = m[k]
			})
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v })
			}
		: function (o, v) {
				o["default"] = v
			})
var __importStar =
	(this && this.__importStar) ||
	(function () {
		var ownKeys = function (o) {
			ownKeys =
				Object.getOwnPropertyNames ||
				function (o) {
					var ar = []
					for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k
					return ar
				}
			return ownKeys(o)
		}
		return function (mod) {
			if (mod && mod.__esModule) return mod
			var result = {}
			if (mod != null)
				for (var k = ownKeys(mod), i = 0; i < k.length; i++)
					if (k[i] !== "default") __createBinding(result, mod, k[i])
			__setModuleDefault(result, mod)
			return result
		}
	})()
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, "__esModule", { value: true })
exports.run = run
const path = __importStar(require("path"))
const mocha_1 = __importDefault(require("mocha"))
const glob_1 = require("glob")
const vscode = __importStar(require("vscode"))
const utils_1 = require("./utils")
async function run() {
	const extension = vscode.extensions.getExtension("kilocode.kilo-code")
	if (!extension) {
		throw new Error("Extension not found")
	}
	const api = extension.isActive ? extension.exports : await extension.activate()
	await api.setConfiguration({
		apiProvider: "openrouter",
		openRouterApiKey: process.env.OPENROUTER_API_KEY,
		openRouterModelId: "openai/gpt-4.1",
	})
	await vscode.commands.executeCommand("kilo-code.SidebarProvider.focus")
	await (0, utils_1.waitFor)(() => api.isReady())
	globalThis.api = api
	const mochaOptions = {
		ui: "tdd",
		timeout: 20 * 60 * 1_000, // 20m
	}
	if (process.env.TEST_GREP) {
		mochaOptions.grep = process.env.TEST_GREP
		console.log(`Running tests matching pattern: ${process.env.TEST_GREP}`)
	}
	const mocha = new mocha_1.default(mochaOptions)
	const cwd = path.resolve(__dirname, "..")
	let testFiles
	if (process.env.TEST_FILE) {
		const specificFile = process.env.TEST_FILE.endsWith(".js")
			? process.env.TEST_FILE
			: `${process.env.TEST_FILE}.js`
		testFiles = await (0, glob_1.glob)(`**/${specificFile}`, { cwd })
		console.log(`Running specific test file: ${specificFile}`)
	} else {
		testFiles = await (0, glob_1.glob)("**/**.test.js", { cwd })
	}
	if (testFiles.length === 0) {
		throw new Error(`No test files found matching criteria: ${process.env.TEST_FILE || "all tests"}`)
	}
	testFiles.forEach((testFile) => mocha.addFile(path.resolve(cwd, testFile)))
	return new Promise((resolve, reject) =>
		mocha.run((failures) => (failures === 0 ? resolve() : reject(new Error(`${failures} tests failed.`)))),
	)
}
