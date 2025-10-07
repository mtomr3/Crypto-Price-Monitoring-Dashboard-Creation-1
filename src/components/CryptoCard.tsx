import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CryptoChart } from "./CryptoChart";
import type { CryptoData } from "@/types/crypto";

interface CryptoCardProps {
  crypto: CryptoData;
  index: number;
}

export const CryptoCard = ({ crypto, index }: CryptoCardProps) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  const changeColor = isPositive ? "text-success" : "text-destructive";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toFixed(0)}`;
  };

  return (
    <Card
      className="relative overflow-hidden bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-12 h-12 rounded-full ring-2 ring-primary/20"
            />
            <div>
              <h3 className="font-bold text-lg text-foreground">{crypto.symbol}</h3>
              <p className="text-sm text-muted-foreground">{crypto.name}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 ${changeColor} font-semibold`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm">
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-foreground">
            {formatPrice(crypto.current_price)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Market Cap: {formatMarketCap(crypto.market_cap)}
          </p>
        </div>

        {/* Chart */}
        {crypto.sparkline_in_7d?.price && (
          <div className="h-24 -mx-2">
            <CryptoChart
              data={crypto.sparkline_in_7d.price}
              isPositive={isPositive}
            />
          </div>
        )}

        {/* 7d Change */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">7d Change</span>
            <span className={`font-semibold ${changeColor}`}>
              {crypto.price_change_percentage_7d >= 0 ? "+" : ""}
              {crypto.price_change_percentage_7d?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${
            isPositive ? "hsl(142 35% 45% / 0.1)" : "hsl(0 50% 55% / 0.1)"
          }, transparent 70%)`,
        }}
      />
    </Card>
  );
};
