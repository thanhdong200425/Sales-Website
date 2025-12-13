import { ArrowRight, Tag } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface OrderSummaryProps {
  subtotal: number
  discount: number
  deliveryFee: number
  total: number
}

export function OrderSummary({ subtotal, discount, deliveryFee, total }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("")
  const navigate = useNavigate()

  const handleGoToCheckout = () => {
    navigate("/checkout")
  }

  return (
    <Card className="h-fit lg:sticky lg:top-4">
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900 sm:mb-6 sm:text-2xl">Order Summary</h2>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between text-sm text-slate-600 sm:text-base">
            <span>Subtotal</span>
            <span className="font-medium text-slate-900">${subtotal}</span>
          </div>

          <div className="flex justify-between text-sm text-slate-600 sm:text-base">
            <span>Discount (-20%)</span>
            <span className="font-medium text-red-600">-${discount}</span>
          </div>

          <div className="flex justify-between text-sm text-slate-600 sm:text-base">
            <span>Delivery Fee</span>
            <span className="font-medium text-slate-900">${deliveryFee}</span>
          </div>

          <div className="border-t border-slate-200 pt-3 sm:pt-4">
            <div className="flex justify-between">
              <span className="text-base font-bold text-slate-900 sm:text-lg">Total</span>
              <span className="text-base font-bold text-slate-900 sm:text-lg">${total}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 size-3 -translate-y-1/2 text-slate-400 sm:size-4" />
            <Input
              className="h-10 pl-9 text-sm sm:h-11 sm:pl-10 sm:text-base"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-10 shrink-0 sm:h-11">
            Apply
          </Button>
        </div>

        <Button
          className="mt-4 w-full bg-slate-900 text-white hover:bg-slate-800 sm:mt-6"
          size="lg"
          onClick={handleGoToCheckout}
        >
          Go to Checkout <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

