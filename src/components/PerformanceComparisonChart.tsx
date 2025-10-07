import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import type { CryptoData } from "@/types/crypto";
import { X } from "lucide-react";

export type TimePeriod = "1d" | "7d" | "14d" | "30d" | "90d" | "365d";

interface PerformanceComparisonChartProps {
  cryptoData: CryptoData[];
  timePeriod: TimePeriod;
}

// Color palette for different coins - muted colors
const COLORS = [
  "hsl(142 35% 45%)",    // muted green
  "hsl(220 25% 50%)",    // muted blue
  "hsl(260 25% 50%)",    // muted purple
  "hsl(340 30% 50%)",    // muted pink
  "hsl(25 40% 50%)",     // muted orange
  "hsl(45 40% 50%)",     // muted yellow
  "hsl(175 30% 45%)",    // muted cyan
  "hsl(0 50% 55%)",      // muted red
  "hsl(280 35% 55%)",    // muted violet
  "hsl(145 30% 45%)",    // muted emerald
  "hsl(200 30% 50%)",    // muted sky
  "hsl(40 35% 50%)",     // muted amber
];

const getPercentageChangeForPeriod = (crypto: CryptoData, period: TimePeriod): number => {
  switch (period) {
    case "1d":
      return crypto.price_change_percentage_1d || 0;
    case "7d":
      return crypto.price_change_percentage_7d || 0;
    case "14d":
      return crypto.price_change_percentage_14d || 0;
    case "30d":
      return crypto.price_change_percentage_30d || 0;
    case "90d":
      return crypto.price_change_percentage_90d || 0;
    case "365d":
      return crypto.price_change_percentage_365d || 0;
    default:
      return 0;
  }
};

const getPeriodLabel = (period: TimePeriod): string => {
  switch (period) {
    case "1d":
      return "24-hour";
    case "7d":
      return "7-day";
    case "14d":
      return "14-day";
    case "30d":
      return "30-day";
    case "90d":
      return "90-day";
    case "365d":
      return "1-year";
    default:
      return "7-day";
  }
};

export const PerformanceComparisonChart = ({ cryptoData, timePeriod }: PerformanceComparisonChartProps) => {
  // Initialize with all coins selected
  const [selectedCoins, setSelectedCoins] = useState<Set<string>>(
    new Set(cryptoData.map((crypto) => crypto.id))
  );

  const toggleCoin = (coinId: string) => {
    setSelectedCoins((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(coinId)) {
        newSet.delete(coinId);
      } else {
        newSet.add(coinId);
      }
      return newSet;
    });
  };

  // Calculate normalized performance data (percentage change from first data point)
  const getNormalizedData = () => {
    if (!cryptoData || cryptoData.length === 0) return [];

    // Get the maximum length of sparkline data
    const maxLength = Math.max(
      ...cryptoData
        .filter((crypto) => crypto.sparkline_in_7d?.price)
        .map((crypto) => crypto.sparkline_in_7d!.price.length)
    );

    // Create data points for each time index
    const chartData = [];
    for (let i = 0; i < maxLength; i++) {
      const dataPoint: { [key: string]: number | string } = { time: i };

      cryptoData.forEach((crypto) => {
        if (crypto.sparkline_in_7d?.price && selectedCoins.has(crypto.id)) {
          const prices = crypto.sparkline_in_7d.price;
          if (i < prices.length && prices[0] && prices[i]) {
            // Calculate percentage change from first price
            const percentageChange = ((prices[i] - prices[0]) / prices[0]) * 100;
            dataPoint[crypto.symbol] = percentageChange;
          }
        }
      });

      chartData.push(dataPoint);
    }

    return chartData;
  };

  const chartData = getNormalizedData();
  const selectedCryptoData = cryptoData.filter((crypto) => selectedCoins.has(crypto.id));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-2">Performance</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className={entry.value >= 0 ? "text-success" : "text-destructive"}>
                {entry.value >= 0 ? "+" : ""}
                {entry.value?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-card/40 backdrop-blur-xl border-border/50 animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Relative Performance Comparison
        </h2>
        <p className="text-sm text-muted-foreground">
          7-day normalized performance chart (% change from start)
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Summary stats below show {getPeriodLabel(timePeriod)} performance
        </p>
      </div>

      {/* Coin selector pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {cryptoData.map((crypto) => {
          const isSelected = selectedCoins.has(crypto.id);
          const coinIndex = cryptoData.findIndex(c => c.id === crypto.id);
          const color = COLORS[coinIndex % COLORS.length];

          return (
            <button
              key={crypto.id}
              onClick={() => toggleCoin(crypto.id)}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                transition-all duration-200 hover:scale-105
                ${
                  isSelected
                    ? "opacity-100 shadow-md"
                    : "opacity-50 hover:opacity-70"
                }
              `}
              style={{
                backgroundColor: isSelected ? color : "transparent",
                border: `2px solid ${color}`,
                color: isSelected ? "white" : color,
              }}
            >
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-4 h-4 rounded-full"
              />
              {crypto.symbol}
              {isSelected && <X className="w-3 h-3" />}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      {selectedCryptoData.length > 0 ? (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => {
                  // Convert index to approximate time label
                  const hours = Math.floor((value / chartData.length) * 168); // 7 days = 168 hours
                  if (hours === 0) return "Start";
                  if (hours % 24 === 0) return `${hours / 24}d`;
                  return "";
                }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${value.toFixed(0)}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                }}
              />
              {selectedCryptoData.map((crypto) => (
                <Line
                  key={crypto.id}
                  type="monotone"
                  dataKey={crypto.symbol}
                  stroke={COLORS[cryptoData.findIndex(c => c.id === crypto.id) % COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  isAnimationActive={true}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center text-muted-foreground">
          <p>Select at least one coin to view performance comparison</p>
        </div>
      )}

      {/* Summary stats */}
      {selectedCryptoData.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedCryptoData.map((crypto) => {
              const color = COLORS[cryptoData.findIndex(c => c.id === crypto.id) % COLORS.length];
              const change = getPercentageChangeForPeriod(crypto, timePeriod);
              const isPositive = change >= 0;

              return (
                <div key={crypto.id} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-semibold text-foreground">
                      {crypto.symbol}
                    </span>
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      isPositive ? "text-success" : "text-destructive"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {change.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};
