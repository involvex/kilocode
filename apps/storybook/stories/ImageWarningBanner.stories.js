import { ImageWarningBanner } from "../../../webview-ui/src/components/chat/ImageWarningBanner"
const meta = {
	title: "Chat/ImageWarningBanner",
	component: ImageWarningBanner,
	tags: ["autodocs"],
	args: {
		isVisible: true,
		onDismiss: () => {},
	},
}
export default meta
export const ModelNoImageSupport = {
	args: {
		messageKey: "kilocode:imageWarnings.modelNoImageSupport",
	},
}
export const MaxImagesReached = {
	args: {
		messageKey: "kilocode:imageWarnings.maxImagesReached",
	},
}
