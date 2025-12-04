const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
})
export const formatCurrency = (amount) => {
	if (amount === null || amount === undefined) {
		return "-"
	}
	return formatter.format(amount)
}
export const parsePrice = (price) => (price ? parseFloat(price) * 1_000_000 : undefined)
