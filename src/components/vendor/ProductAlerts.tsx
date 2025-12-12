import { AlertCircle, AlertTriangle } from "lucide-react";

interface Alert {
  id: number;
  name: string;
  stockLevel: number;
}

interface ProductAlertsProps {
  outOfStock: Alert[];
  lowInventory: Alert[];
}

export function ProductAlerts({ outOfStock, lowInventory }: ProductAlertsProps) {
  return (
    <div className="space-y-4">
      {outOfStock.length > 0 && (
        <div className="flex gap-3 rounded-[48px] border border-[#f1f5f9] bg-[#f8fafc] p-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(239,68,68,0.1)]">
            <AlertCircle className="h-5 w-5 text-[#ef4444]" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[#0f172a]">Out of Stock</h4>
            <p className="text-xs text-[#64748b]">
              {outOfStock[0].name}
            </p>
            <button className="mt-1.5 text-xs font-medium text-[#ef4444] hover:underline">
              Restock Now
            </button>
          </div>
        </div>
      )}

      {lowInventory.length > 0 && (
        <div className="flex gap-3 rounded-[48px] border border-[#f1f5f9] bg-[#f8fafc] p-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(249,115,22,0.1)]">
            <AlertTriangle className="h-5 w-5 text-[#f97316]" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[#0f172a]">Low Inventory</h4>
            <p className="text-xs text-[#64748b]">
              {lowInventory[0].name} ({lowInventory[0].stockLevel} left)
            </p>
          </div>
        </div>
      )}

      {outOfStock.length === 0 && lowInventory.length === 0 && (
        <p className="text-center text-sm text-[#94a3b8]">No alerts at this time</p>
      )}
    </div>
  );
}

