interface OrderBreakdownProps {
  total: number;
  completed: number;
  processing: number;
  pending: number;
}

export function OrderBreakdownChart({
  total,
  completed,
  processing,
  pending,
}: OrderBreakdownProps) {
  const completedPercent = total > 0 ? (completed / total) * 100 : 0;
  const processingPercent = total > 0 ? (processing / total) * 100 : 0;
  const pendingPercent = total > 0 ? (pending / total) * 100 : 0;

  // Calculate angles for SVG donut chart
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 24;

  const completedStroke = (completedPercent / 100) * circumference;
  const processingStroke = (processingPercent / 100) * circumference;
  const pendingStroke = (pendingPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-48 w-48">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          
          {/* Completed segment */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth={strokeWidth}
            strokeDasharray={`${completedStroke} ${circumference}`}
            strokeLinecap="round"
          />
          
          {/* Processing segment */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${processingStroke} ${circumference}`}
            strokeDashoffset={-completedStroke}
            strokeLinecap="round"
          />
          
          {/* Pending segment */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f97316"
            strokeWidth={strokeWidth}
            strokeDasharray={`${pendingStroke} ${circumference}`}
            strokeDashoffset={-(completedStroke + processingStroke)}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-[#0f172a]">{total}</p>
          <p className="text-xs text-[#64748b]">Total Orders</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#1a1a1a]"></div>
          <span className="text-xs text-[#64748b]">Done</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#3b82f6]"></div>
          <span className="text-xs text-[#64748b]">Process</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#f97316]"></div>
          <span className="text-xs text-[#64748b]">Pending</span>
        </div>
      </div>
    </div>
  );
}

