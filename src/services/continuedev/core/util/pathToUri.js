import { fileURLToPath, pathToFileURL } from "url"
// CAN ONLY BE USED IN CORE
// Converts a local path to a file:/// URI
export function localPathToUri(path) {
	// This may incidentally solve bugs, but it is primarily here to warn us if we accidentally try to double-convert. It doesn't handle other URI schemes.
	if (path.startsWith("file://")) {
		console.warn("localPathToUri: path already starts with file://")
		return path
	}
	const url = pathToFileURL(path)
	return url.toString()
}
export function localPathOrUriToPath(localPathOrUri) {
	try {
		return fileURLToPath(localPathOrUri)
	} catch {
		// console.log("Received local filepath", localPathOrUri);
		return localPathOrUri
	}
}
//# sourceMappingURL=pathToUri.js.map
