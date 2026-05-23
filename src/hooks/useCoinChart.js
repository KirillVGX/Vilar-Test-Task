import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api.js";

const SUPPORTED_COIN_IDS = new Set(["bitcoin", "ethereum", "dogecoin"]);
const CHART_REFETCH_INTERVAL_MS = 30_000;

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
});

class CoinGeckoError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "CoinGeckoError";
        this.status = status;
    }
}

export function coinChartQueryKey(coinId) {
    return ["coins", "market-chart", "usd", coinId, 7];
}

function toChartPoint([timestamp, price]) {
    return {
        timestamp,
        price,
        label: dateTimeFormatter.format(new Date(timestamp)),
    };
}

async function fetchCoinChart({ coinId, signal }) {
    if (!SUPPORTED_COIN_IDS.has(coinId)) {
        throw new CoinGeckoError(`Unsupported coin id: ${coinId}`, 400);
    }

    let response;

    try {
        response = await fetch(api.coinChart(coinId), {
            headers: {
                accept: "application/json",
            },
            signal,
        });
    } catch (error) {
        if (error.name === "AbortError") {
            throw error;
        }

        throw new CoinGeckoError("Network request failed. Please try again later.");
    }

    if (!response.ok) {
        const message =
            response.status === 429
                ? "CoinGecko rate limit reached. Showing the latest available chart until the next refresh."
                : `CoinGecko request failed with status ${response.status}.`;

        throw new CoinGeckoError(message, response.status);
    }

    let data;

    try {
        data = await response.json();
    } catch {
        throw new CoinGeckoError("CoinGecko returned an invalid JSON response.", response.status);
    }

    if (!Array.isArray(data.prices)) {
        throw new CoinGeckoError("CoinGecko returned an unexpected chart payload.", response.status);
    }

    return data;
}

function shouldRetry(failureCount, error) {
    if (error.status === 400 || error.status === 404) {
        return false;
    }

    if (error.status === 429) {
        return false;
    }

    return failureCount < 1;
}

export function useCoinChart(coinId) {
    return useQuery({
        queryKey: coinChartQueryKey(coinId),
        queryFn: ({ signal }) => fetchCoinChart({ coinId, signal }),
        select: (data) => data.prices.map(toChartPoint),
        refetchInterval: CHART_REFETCH_INTERVAL_MS,
        staleTime: CHART_REFETCH_INTERVAL_MS,
        gcTime: 5 * 60_000,
        retry: shouldRetry,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
