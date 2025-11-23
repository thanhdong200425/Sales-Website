import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { CartItem } from "@/data/cart"

interface CartItemProps {
  item: CartItem
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItemComponent({ item, onQuantityChange, onRemove }: CartItemProps) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1)
    }
  }

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1)
  }

  return (
    <div className="relative flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:gap-4 sm:p-4">
      <button
        onClick={() => onRemove(item.id)}
        className="absolute right-2 top-2 text-red-500 hover:text-red-600 sm:right-4 sm:top-4"
        aria-label="Remove item"
      >
        <Trash2 className="size-4 sm:size-5" />
      </button>

      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white sm:h-24 sm:w-24">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
        <h3 className="pr-6 text-sm font-semibold text-slate-900 sm:pr-0 sm:text-base">{item.name}</h3>
        <div className="flex flex-col gap-0.5 text-xs text-slate-600 sm:gap-1 sm:text-sm">
          <span>Size: {item.size}</span>
          <span>Color: {item.color}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              size="icon"
              variant="outline"
              className="size-7 rounded-md sm:size-8"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              <Minus className="size-3 sm:size-4" />
            </Button>
            <span className="w-6 text-center text-xs font-medium sm:w-8 sm:text-sm">{item.quantity}</span>
            <Button size="icon" variant="outline" className="size-7 rounded-md sm:size-8" onClick={handleIncrease}>
              <Plus className="size-3 sm:size-4" />
            </Button>
          </div>
          <p className="text-base font-semibold text-slate-900 sm:text-lg">${item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  )
}

