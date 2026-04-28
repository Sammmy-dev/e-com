export const DEFAULT_CURRENCY = "ngn";

const EXCHANGE_RATES = {
	ngn: 1,
	usd: 1 / 1600,
	eur: 1 / 1750,
};

export const normalizeCurrency = (currency = DEFAULT_CURRENCY) => {
	const normalized = String(currency).toLowerCase();
	return EXCHANGE_RATES[normalized] ? normalized : DEFAULT_CURRENCY;
};

export const convertFromNaira = (amount, currency = DEFAULT_CURRENCY) => {
	const normalizedCurrency = normalizeCurrency(currency);
	return (Number(amount) || 0) * EXCHANGE_RATES[normalizedCurrency];
};

export const convertToSmallestUnit = (amount, currency = DEFAULT_CURRENCY) => {
	const converted = convertFromNaira(amount, currency);
	return Math.round(converted * 100);
};