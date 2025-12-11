import { Link, useNavigate } from "react-router-dom";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handlePlaceOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Gửi dữ liệu thanh toán lên backend khi đã có API
    navigate("/order-status");
  };

  if (cartItems.length === 0) {
    return (
      <div className="space-y-0">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:py-4">
            <nav className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
              <Link to="/" className="hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900">Checkout</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 py-8 text-center sm:py-12">
          <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Your cart is empty
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Add some products to your cart before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="mt-4 inline-block text-sm font-medium text-slate-900 underline hover:text-slate-700 sm:text-base"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

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
            <Link to="/cart" className="hover:text-slate-900">
              Cart
            </Link>
            <span>/</span>
            <span className="text-slate-900">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6 md:py-8">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
          CHECKOUT
        </h1>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
          {/* Left column: Shipping & Payment form */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Shipping Information
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Enter your shipping details so we can deliver your order.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handlePlaceOrder}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Full name
                      </label>
                      <Input placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Phone number
                      </label>
                      <Input placeholder="+1 (555) 000-0000" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Country
                      </label>
                      <Input placeholder="Country" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 sm:text-sm">
                      Address
                    </label>
                    <Input placeholder="Street address" required />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        City
                      </label>
                      <Input placeholder="City" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        State / Province
                      </label>
                      <Input placeholder="State / Province" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        ZIP / Postal code
                      </label>
                      <Input placeholder="Postal code" required />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        Payment Method
                      </h2>
                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Select your preferred payment method.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 hover:border-slate-300 sm:text-sm">
                        <input
                          type="radio"
                          name="payment-method"
                          value="card"
                          defaultChecked
                          className="size-3 border-slate-300 text-slate-900 focus:ring-slate-900 sm:size-4"
                        />
                        <span>Credit / Debit Card</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 hover:border-slate-300 sm:text-sm">
                        <input
                          type="radio"
                          name="payment-method"
                          value="paypal"
                          className="size-3 border-slate-300 text-slate-900 focus:ring-slate-900 sm:size-4"
                        />
                        <span>PayPal</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 hover:border-slate-300 sm:text-sm">
                        <input
                          type="radio"
                          name="payment-method"
                          value="cod"
                          className="size-3 border-slate-300 text-slate-900 focus:ring-slate-900 sm:size-4"
                        />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700 sm:text-sm">
                          Card number
                        </label>
                        <Input placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700 sm:text-sm">
                          Name on card
                        </label>
                        <Input placeholder="Full name" required />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700 sm:text-sm">
                          Expiry date
                        </label>
                        <Input placeholder="MM / YY" required />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700 sm:text-sm">
                          CVV
                        </label>
                        <Input placeholder="123" required />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700 sm:text-sm">
                          Promo code (optional)
                        </label>
                        <Input placeholder="Enter code" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      By placing this order, you agree to our{" "}
                      <span className="underline">Terms & Conditions</span>.
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-slate-900 text-white hover:bg-slate-800 sm:w-auto"
                    >
                      Place Order
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Order summary */}
          <div>
            <Card className="h-fit border-slate-200 lg:sticky lg:top-4">
              <CardContent className="p-4 sm:p-6">
                <h2 className="mb-4 text-xl font-bold text-slate-900 sm:mb-6 sm:text-2xl">
                  Order Summary
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-sm text-slate-600 sm:text-base">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">
                      ${subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600 sm:text-base">
                    <span>Discount (-20%)</span>
                    <span className="font-medium text-red-600">
                      -${discount}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600 sm:text-base">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-slate-900">
                      ${deliveryFee}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 sm:pt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-bold text-slate-900 sm:text-lg">
                        Total
                      </span>
                      <span className="text-base font-bold text-slate-900 sm:text-lg">
                        ${total}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500 sm:mt-6 sm:text-sm">
                  All transactions are secure and encrypted. Your card information
                  is never stored on our servers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;


