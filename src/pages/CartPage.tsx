import { Link } from "react-router-dom"
import { useState } from "react"

import { CartItemComponent } from "@/components/cart/cart-item"
import { OrderSummary } from "@/components/cart/order-summary"
import { NewsletterCta } from "@/components/home/newsletter-cta"
import { MOCK_CART_ITEMS, type CartItem } from "@/data/cart"

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS)

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemove = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = Math.round(subtotal * 0.2)
  const deliveryFee = 15
  const total = subtotal - discount + deliveryFee

  return (
    <div className="space-y-0">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:py-4">
          <nav className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900">Cart</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6 md:py-8">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
          YOUR CART
        </h1>

        {cartItems.length === 0 ? (
          <div className="py-12 text-center sm:py-16">
            <p className="text-base text-slate-600 sm:text-lg">Your cart is empty</p>
            <Link to="/" className="mt-4 inline-block text-slate-900 underline hover:text-slate-700">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_400px] lg:gap-8">
            {/* Cart Items */}
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <OrderSummary subtotal={subtotal} discount={discount} deliveryFee={deliveryFee} total={total} />
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="mt-8 sm:mt-12 md:mt-16">
        <NewsletterCta />
      </div>
    </div>
  )
}

export default CartPage

