import packageJson from "package-json"
import { Package } from "../constants/package.js"
import semver from "semver"
import { generateMessage } from "../ui/utils/messages.js"
export const getAutoUpdateStatus = async () => {
	const output = {
		name: Package.name,
		isOutdated: false,
		currentVersion: Package.version,
		latestVersion: Package.version,
	}
	try {
		const latestPackage = await packageJson(Package.name)
		return {
			...output,
			isOutdated: semver.lt(Package.version, latestPackage.version),
			latestVersion: latestPackage.version,
		}
	} catch {
		return output
	}
}
export const generateUpdateAvailableMessage = (status) => {
	return {
		...generateMessage(),
		type: "system",
		content: `## A new version of Kilo CLI is available!
You are using v${status.currentVersion}, the latest version is v${status.latestVersion}.
Please run the following command to update:
\`\`\`bash
npm install -g ${status.name}
\`\`\``,
	}
}
