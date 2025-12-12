import { Check } from "lucide-react";
import { useState } from "react";

interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
}

export function ActionItems() {
  const [items, setItems] = useState<ActionItem[]>([
    { id: "1", text: "Review refund request #992", completed: false },
    { id: "2", text: "Update shipping policy", completed: false },
    { id: "3", text: "Respond to customer inquiry", completed: true },
  ]);

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <button
            onClick={() => toggleItem(item.id)}
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border-2 ${
              item.completed
                ? "border-[#cbd5e1] bg-white"
                : "border-[#cbd5e1] bg-white"
            }`}
          >
            {item.completed && <Check className="h-3.5 w-3.5 text-[#1a1a1a]" />}
          </button>
          <span
            className={`text-sm ${
              item.completed
                ? "text-[#94a3b8] line-through"
                : "text-[#334155]"
            }`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}

