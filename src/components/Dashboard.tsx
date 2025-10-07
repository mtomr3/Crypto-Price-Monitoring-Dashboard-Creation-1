import { useState } from "react";
import { Activity, RefreshCw, TrendingUp } from "lucide-react";
import { useCryptoData } from "@/hooks/useCryptoData";
import { CryptoCard } from "./CryptoCard";
import { PerformanceComparisonChart } from "./PerformanceComparisonChart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

export type TimePeriod = "1d" | "7d" | "14d" | "30d" | "90d" | "365d";

export const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("7d");
  const { data: cryptoData, isLoading, error, refetch, isRefetching } = useCryptoData(timePeriod);
  const { toast } = useToast();

  console.log("📊 Dashboard render - Loading:", isLoading, "Error:", error, "Data count:", cryptoData?.length);

  const handleRefresh = () => {
    console.log("🔄 Manual refresh triggered");
    refetch();
    toast({
      title: "Refreshing data",
      description: "Fetching latest crypto prices...",
    });
  };

  if (error) {
    console.error("❌ Dashboard error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-destructive text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Failed to load crypto data
          </h2>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <Button onClick={handleRefresh} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Crypto Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Real-time cryptocurrency prices and performance metrics
              </p>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <Button
                onClick={handleRefresh}
                disabled={isRefetching}
                className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                variant="outline"
              >
                <RefreshCw className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Time Period Selector */}
          <div className="mt-6">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Time Period
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "1d" as TimePeriod, label: "24 Hours" },
                { value: "7d" as TimePeriod, label: "7 Days" },
                { value: "14d" as TimePeriod, label: "14 Days" },
                { value: "30d" as TimePeriod, label: "30 Days" },
                { value: "90d" as TimePeriod, label: "90 Days" },
                { value: "365d" as TimePeriod, label: "1 Year" },
              ].map((period) => (
                <Button
                  key={period.value}
                  onClick={() => setTimePeriod(period.value)}
                  variant={timePeriod === period.value ? "default" : "outline"}
                  className={`
                    ${timePeriod === period.value
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background/50 text-muted-foreground hover:text-foreground"
                    }
                  `}
                  size="sm"
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 mt-4">
            <div className="relative">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow" />
              <div className="absolute inset-0 w-3 h-3 bg-success rounded-full animate-ping" />
            </div>
            <span className="text-sm text-muted-foreground">
              Live updates every 30 seconds
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Activity className="w-16 h-16 text-primary animate-pulse mb-4" />
            <p className="text-xl text-muted-foreground">Loading crypto data...</p>
          </div>
        )}

        {/* Performance Comparison Chart */}
        {!isLoading && cryptoData && (
          <div className="mb-8">
            <PerformanceComparisonChart cryptoData={cryptoData} timePeriod={timePeriod} />
          </div>
        )}

        {/* Crypto Grid */}
        {!isLoading && cryptoData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cryptoData.map((crypto, index) => (
              <CryptoCard key={crypto.id} crypto={crypto} index={index} />
            ))}
          </div>
        )}

        {/* Footer Info */}
        {!isLoading && cryptoData && (
          <div className="mt-12 text-center text-sm text-muted-foreground animate-slide-up">
            <p>Data provided by CoinGecko API</p>
            <p className="mt-1">Showing top {cryptoData.length} cryptocurrencies by market cap</p>
          </div>
        )}
      </div>
    </div>
  );
};
