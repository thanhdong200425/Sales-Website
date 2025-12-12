import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createPayment } from "@/services/api";
import { toast } from "sonner";

function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handlePlaceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const customerName = formData.get("customerName") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const address = formData.get("address") as string;

      // Nếu chọn VNPay, tạo payment URL
      if (paymentMethod === "vnpay") {
        // Chuyển đổi cartItems sang format API
        const items = cartItems.map((item) => ({
          productId: parseInt(item.id), // Parse id string thành number
          quantity: item.quantity,
          color: item.color,
          size: item.size || "Default",
        }));

        const response = await createPayment({
          items: items,
          shippingInfo: {
            customerName: customerName,
            phone: phone,
            address: address,
          },
        });

        if (response.success && response.data.paymentUrl) {
          // Redirect đến VNPay
          window.location.href = response.data.paymentUrl;
          return;
        } else {
          throw new Error(response.message || "Failed to create payment");
        }
      } else {
        // Các phương thức thanh toán khác (bank, momo) - chưa implement
        toast.info("Phương thức thanh toán này chưa được hỗ trợ", {
          description: "Vui lòng chọn VNPay để thanh toán.",
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Đã xảy ra lỗi", {
        description: error instanceof Error ? error.message : "Không thể tạo đơn hàng. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
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
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Họ và tên
                      </label>
                      <Input
                        type="text"
                        name="customerName"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Số điện thoại
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="+84 123 456 789"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 sm:text-sm">
                        Địa chỉ
                      </label>
                      <Input
                        name="address"
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        required
                      />
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
                      disabled={isLoading}
                    >
                      {isLoading ? "Đang xử lý..." : "Place Order"}
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

                {/* Payment Method Selection */}
                <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 sm:pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    Phương thức thanh toán
                  </h3>
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment-method"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="size-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-sm font-medium text-slate-900">
                        Chuyển khoản ngân hàng
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment-method"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="size-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-sm font-medium text-slate-900">
                        Momo
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment-method"
                        value="vnpay"
                        checked={paymentMethod === "vnpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="size-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-sm font-medium text-slate-900">
                        VNPay
                      </span>
                    </label>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500 sm:mt-6 sm:text-sm">
                  All transactions are secure and encrypted. Your payment information
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


