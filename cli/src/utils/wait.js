export default async function wait(t) {
	return new Promise((resolve) => {
		setTimeout(resolve, t)
	})
}
