import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  change?: number;
  icon: React.ReactNode;
  iconBgColor: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  change,
  icon,
  iconBgColor,
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor}`}>
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 ${
              isPositive ? "bg-[rgba(26,26,26,0.1)]" : "bg-[rgba(239,68,68,0.1)]"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-[#1a1a1a]" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-[#ef4444]" />
            )}
            <span
              className={`text-xs font-medium ${
                isPositive ? "text-[#1a1a1a]" : "text-[#ef4444]"
              }`}
            >
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-[#64748b]">{title}</p>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight text-[#0f172a]">{value}</p>
      </div>
      <div>
        <p className="text-xs text-[#94a3b8]">{subtitle}</p>
      </div>
    </div>
  );
}

