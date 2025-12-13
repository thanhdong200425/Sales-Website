import { useState } from "react";

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  period: string;
  onPeriodChange: (period: string) => void;
}

export function RevenueChart({ data, period, onPeriodChange }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const chartHeight = 300;
  const chartWidth = 900;
  const padding = 20;

  // Create points for the line chart
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1 || 1)) * (chartWidth - 2 * padding) + padding;
    const y = chartHeight - (item.revenue / maxRevenue) * (chartHeight - 2 * padding) - padding;
    return { x, y, ...item };
  });

  // Create path for the line
  const linePath = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x},${point.y}`;
      return `L ${point.x},${point.y}`;
    })
    .join(" ");

  // Create area under the line
  const areaPath =
    linePath +
    ` L ${points[points.length - 1]?.x || 0},${chartHeight} L ${points[0]?.x || 0},${chartHeight} Z`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#0f172a]">Revenue Overview</h3>
          <p className="text-sm text-[#64748b]">Track your earnings over time</p>
        </div>
        <div className="flex gap-1 rounded-full bg-[#f1f5f9] p-1">
          {["30days", "7days", "3months"].map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                period === p
                  ? "bg-white text-[#0f172a] shadow-sm"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              {p === "30days" ? "30 Days" : p === "7days" ? "7 Days" : "3 Months"}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg width="100%" height={chartHeight} className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1={padding}
              y1={chartHeight - ratio * (chartHeight - 2 * padding) - padding}
              x2={chartWidth - padding}
              y2={chartHeight - ratio * (chartHeight - 2 * padding) - padding}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area under the line */}
          <path
            d={areaPath}
            fill="url(#gradient)"
            opacity="0.2"
          />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#22c55e"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between px-2 text-xs text-[#a3b99d]">
        {data.length > 0 && (
          <>
            <span>{new Date(data[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            {data.length > 2 && (
              <span>{new Date(data[Math.floor(data.length / 2)].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            )}
            <span>{new Date(data[data.length - 1].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </>
        )}
      </div>
    </div>
  );
}

