import { keepPreviousData, useQuery } from "@tanstack/react-query";

const COINS_MARKETS_URL = "https://api.coingecko.com/api/v3/coins/markets";

export function coinsQueryKey({ page = 1, perPage = 50 } = {}) {
    return ["coins", "markets", "usd", perPage, page];
}

async function fetchCoins({ page, perPage, signal }) {
    const params = new URLSearchParams({
        vs_currency: "usd",
        per_page: String(perPage),
        page: String(page),
    });

    const response = await fetch(`${COINS_MARKETS_URL}?${params}`, { signal });

    if (!response.ok) {
        throw new Error("Failed to load coin market data.");
    }

    return response.json();
}

export function useCoins({ page = 1, perPage = 50, keepPrevious = false } = {}) {
    return useQuery({
        queryKey: coinsQueryKey({ page, perPage }),
        queryFn: ({ signal }) => fetchCoins({ page, perPage, signal }),
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        placeholderData: keepPrevious ? keepPreviousData : undefined,
        refetchOnWindowFocus: false,
    });
}
