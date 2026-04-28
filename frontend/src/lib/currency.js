export const DEFAULT_CURRENCY = "NGN";

export const CURRENCY_OPTIONS = [
	{ value: "NGN", label: "Naira", locale: "en-NG", symbol: "₦" },
	{ value: "USD", label: "US Dollar", locale: "en-US", symbol: "$" },
	{ value: "EUR", label: "Euro", locale: "de-DE", symbol: "EUR" },
];

const EXCHANGE_RATES = {
	NGN: 1,
	USD: 1 / 1600,
	EUR: 1 / 1750,
};

export const getCurrencyMeta = (currency = DEFAULT_CURRENCY) =>
	CURRENCY_OPTIONS.find((option) => option.value === currency) || CURRENCY_OPTIONS[0];

export const convertPrice = (amount, currency = DEFAULT_CURRENCY) => {
	const numericAmount = Number(amount) || 0;
	return numericAmount * (EXCHANGE_RATES[currency] || EXCHANGE_RATES[DEFAULT_CURRENCY]);
};

export const formatCurrency = (amount, currency = DEFAULT_CURRENCY, options = {}) => {
	const { locale, value } = getCurrencyMeta(currency);
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: value,
		maximumFractionDigits: value === "NGN" ? 0 : 2,
		...options,
	}).format(convertPrice(amount, value));
};