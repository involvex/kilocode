"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.DEFAULT_SUITE_TIMEOUT = void 0
exports.setDefaultSuiteTimeout = setDefaultSuiteTimeout
exports.DEFAULT_SUITE_TIMEOUT = 120_000
function setDefaultSuiteTimeout(context) {
	context.timeout(exports.DEFAULT_SUITE_TIMEOUT)
}
