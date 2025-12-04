"use strict"
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, "__esModule", { value: true })
const MDXComponents_1 = __importDefault(require("@theme-original/MDXComponents"))
const Codicon_1 = __importDefault(require("@site/src/components/Codicon"))
const YouTubeEmbed_1 = __importDefault(require("@site/src/components/YouTubeEmbed"))
exports.default = {
	...MDXComponents_1.default,
	Codicon: Codicon_1.default,
	YouTubeEmbed: YouTubeEmbed_1.default,
}
