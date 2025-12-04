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
Object.defineProperty(exports, "__esModule", { value: true })
const assert = __importStar(require("assert"))
const types_1 = require("@roo-code/types")
const utils_1 = require("./utils")
const test_utils_1 = require("./test-utils")
suite("Kilo Code Modes", function () {
	;(0, test_utils_1.setDefaultSuiteTimeout)(this)
	test("Should handle switching modes correctly", async () => {
		const modes = []
		globalThis.api.on(types_1.RooCodeEventName.TaskModeSwitched, (_taskId, mode) => modes.push(mode))
		const switchModesTaskId = await globalThis.api.startNewTask({
			configuration: { mode: "code", alwaysAllowModeSwitch: true, autoApprovalEnabled: true },
			text: "For each of `architect`, `ask`, and `debug` use the `switch_mode` tool to switch to that mode.",
		})
		await (0, utils_1.waitUntilCompleted)({ api: globalThis.api, taskId: switchModesTaskId })
		await globalThis.api.cancelCurrentTask()
		assert.ok(modes.includes("architect"))
		assert.ok(modes.includes("ask"))
		assert.ok(modes.includes("debug"))
		assert.ok(modes.length === 3)
	})
})
