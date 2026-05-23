import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../config/api.js";

export function coinsQueryKey({ page = 1, perPage = 50 } = {}) {
    return ["coins", "markets", "usd", perPage, page];
}

async function fetchCoins({ page, perPage, signal }) {
    const response = await fetch(api.coinsMarkets({ page, perPage }), { signal });

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
