import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface CryptoChartProps {
  data: number[];
  isPositive: boolean;
}

export const CryptoChart = ({ data, isPositive }: CryptoChartProps) => {
  const chartData = data.map((price, index) => ({
    index,
    price,
  }));

  const color = isPositive ? "hsl(142 35% 45%)" : "hsl(0 50% 55%)";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`gradient-${isPositive}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${isPositive})`}
          isAnimationActive={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
