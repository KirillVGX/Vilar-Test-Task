export const COINGECKO_ORIGIN = "https://api.coingecko.com";
export const COINGECKO_API_PATH = "/api/v3";
export const COINGECKO_PROXY_BASE_URL = "/api/coingecko/api/v3";
export const COINGECKO_PUBLIC_BASE_URL = `${COINGECKO_ORIGIN}${COINGECKO_API_PATH}`;

const isDev = Boolean(import.meta.env?.DEV);

export const API_BASE_URL = isDev ? COINGECKO_PROXY_BASE_URL : COINGECKO_PUBLIC_BASE_URL;

function withSearchParams(path, params) {
    return `${API_BASE_URL}${path}?${new URLSearchParams(params)}`;
}

export const api = {
    coinsMarkets: ({ page = 1, perPage = 50 } = {}) =>
        withSearchParams("/coins/markets", {
            vs_currency: "usd",
            per_page: String(perPage),
            page: String(page),
        }),

    coinChart: (coinId) =>
        withSearchParams(`/coins/${coinId}/market_chart`, {
            vs_currency: "usd",
            days: "7",
        }),
};
