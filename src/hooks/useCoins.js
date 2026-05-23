import { useQuery } from "@tanstack/react-query";

const COINS_MARKETS_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";

export const coinsQueryKey = ["coins", "markets", "usd", 50, 1];

async function fetchCoins({ signal }) {
    const response = await fetch(COINS_MARKETS_URL, { signal });

    if (!response.ok) {
        throw new Error("Failed to load coin market data.");
    }

    return response.json();
}

export function useCoins() {
    return useQuery({
        queryKey: coinsQueryKey,
        queryFn: fetchCoins,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
    });
}
