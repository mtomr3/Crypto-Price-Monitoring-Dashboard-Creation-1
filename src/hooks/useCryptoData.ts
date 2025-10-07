import { useQuery } from "@tanstack/react-query";
import type { CryptoApiResponse, CryptoData } from "@/types/crypto";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export type TimePeriod = "1d" | "7d" | "14d" | "30d" | "90d" | "365d";

const fetchCryptoData = async (timePeriod: TimePeriod): Promise<CryptoData[]> => {
  console.log(`🔄 Fetching crypto data from CoinGecko API for ${timePeriod}...`);

  // Build the price_change_percentage parameter based on the time period
  // We need to include all the periods we want data for
  const priceChangeParams = "1d,7d,14d,30d,90d,365d";

  const response = await fetch(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=true&price_change_percentage=${priceChangeParams}`
  );

  if (!response.ok) {
    console.error("❌ Failed to fetch crypto data:", response.statusText);
    throw new Error("Failed to fetch crypto data");
  }

  const data: CryptoApiResponse[] = await response.json();
  console.log("✅ Crypto data fetched successfully:", data.length, "coins");

  return data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    price_change_percentage_7d: coin.price_change_percentage_7d_in_currency || 0,
    price_change_percentage_1d: coin.price_change_percentage_1d_in_currency,
    price_change_percentage_14d: coin.price_change_percentage_14d_in_currency,
    price_change_percentage_30d: coin.price_change_percentage_30d_in_currency,
    price_change_percentage_90d: coin.price_change_percentage_90d_in_currency,
    price_change_percentage_365d: coin.price_change_percentage_365d_in_currency,
    market_cap: coin.market_cap,
    total_volume: coin.total_volume,
    sparkline_in_7d: coin.sparkline_in_7d,
    image: coin.image,
  }));
};

export const useCryptoData = (timePeriod: TimePeriod = "7d") => {
  return useQuery({
    queryKey: ["cryptoData", timePeriod],
    queryFn: () => fetchCryptoData(timePeriod),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000,
  });
};
