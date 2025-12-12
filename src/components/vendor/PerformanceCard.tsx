import { Star } from "lucide-react";

interface PerformanceCardProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor: string;
  value: string;
  subtitle?: string;
  rating?: number;
}

export function PerformanceCard({
  title,
  icon,
  iconBgColor,
  value,
  subtitle,
  rating,
}: PerformanceCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          {title}
        </p>
        <div className="mt-1 flex items-end gap-2">
          <p className="text-xl font-bold text-[#0f172a]">{value}</p>
          {rating && (
            <div className="mb-1 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        {subtitle && <p className="mt-1 text-xs font-medium text-[#22c55e]">{subtitle}</p>}
      </div>
    </div>
  );
}

