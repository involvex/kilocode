"use strict"
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, "__esModule", { value: true })
exports.default = Codicon
const react_1 = __importDefault(require("react"))
require("@vscode/codicons/dist/codicon.css")
function Codicon({ name }) {
	return <i className={`codicon codicon-${name}`} aria-hidden="true" />
}
