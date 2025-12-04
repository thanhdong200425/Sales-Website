import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Package,
  CreditCard,
  Truck,
  CheckCircle2,
  CircleDot,
} from "lucide-react";

// Mock data - replace with actual API data
const ORDER_DATA = {
  orderId: "TXNID983274",
  trackingNumber: "34u/239y/239y",
  status: "With courier en route",
  items: [
    {
      id: "1",
      name: "SNEAKERS INVERN BW",
      category: "Sneakers",
      color: "Black",
      size: "44",
      quantity: 1,
      price: 449000,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    },
    {
      id: "2",
      name: "JACKET DISSED",
      category: "Casual Shirt",
      color: "Black",
      size: "XL",
      quantity: 1,
      price: 439000,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
    },
  ],
  seller: {
    name: "Double CTRL Z",
    address:
      "1234 Market Street, Apt 5B, Philadelphia, PA 19107, United States of America",
  },
  buyer: {
    name: "Rusan Royal",
    address:
      "4567 Elm Street, Apt 3B, Philadelphia, PA 19104, USA, Near University City",
  },
  timeline: [
    {
      status: "Shipment scheduled by seller",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "Handed over to courier",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "Arrived at distribution hub",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "Shipped from Philadelphia facility",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "Arrived at Philadelphia facility",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "Arrived at Chicago facility",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "With courier en route (Jobeth)",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "With courier en route (Riyam)",
      date: "08/22/2022 15:29",
      active: true,
    },
    {
      status: "Delivered to recipient",
      date: "08/22/2022 15:29",
      active: false,
    },
  ],
};

function OrderStatusPage() {
  const subtotal = ORDER_DATA.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingDiscount = 97500;
  const platformFees = 14000;
  const total = subtotal - shippingDiscount - platformFees;

  return (
    <div className="space-y-0">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link to="/profile" className="hover:text-slate-900">
              Profile
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-900">Track Order</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Order Header */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      Order ID: {ORDER_DATA.orderId}
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                      Track your order and manage your delivery
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Send Invoice
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Contact Buyer
                    </Button>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-orange-600" />
                    <span className="text-sm font-medium text-slate-900">
                      {ORDER_DATA.status}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600">
                    No Resi: {ORDER_DATA.trackingNumber}
                  </span>
                </div>

                {/* Progress Steps */}
                <div className="grid grid-cols-4 gap-4 pt-4">
                  <div className="rounded-lg border-2 border-orange-600 bg-orange-50 p-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-orange-600">
                      <Package className="size-5 text-white" />
                    </div>
                    <p className="mt-3 font-medium text-slate-900">
                      Order made
                    </p>
                    <p className="text-xs text-slate-500">Create order</p>
                  </div>
                  <div className="rounded-lg border-2 border-orange-600 bg-orange-50 p-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-orange-600">
                      <CreditCard className="size-5 text-white" />
                    </div>
                    <p className="mt-3 font-medium text-slate-900">
                      Order Paid
                    </p>
                    <p className="text-xs text-slate-500">Customer payment</p>
                  </div>
                  <div className="rounded-lg border-2 border-orange-600 bg-orange-50 p-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-orange-600">
                      <Truck className="size-5 text-white" />
                    </div>
                    <p className="mt-3 font-medium text-slate-900">Shipped</p>
                    <p className="text-xs text-slate-500">On delivery</p>
                  </div>
                  <div className="rounded-lg border-2 border-slate-200 bg-white p-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100">
                      <CheckCircle2 className="size-5 text-slate-400" />
                    </div>
                    <p className="mt-3 font-medium text-slate-600">Completed</p>
                    <p className="text-xs text-slate-500">Order completed</p>
                  </div>
                </div>

                {/* Shipping Addresses */}
                <div className="grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-slate-900">
                        Shipping Address (Seller)
                      </h3>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-slate-900">
                        {ORDER_DATA.seller.name}
                      </p>
                      <p className="text-slate-600">
                        {ORDER_DATA.seller.address}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-slate-900">
                        Shipping Address (Buyer)
                      </h3>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-slate-900">
                        {ORDER_DATA.buyer.name}
                      </p>
                      <p className="text-slate-600">
                        {ORDER_DATA.buyer.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="mb-4 text-base font-semibold text-slate-900">
                    Order Item
                  </h3>
                  <div className="space-y-4">
                    {ORDER_DATA.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-slate-200 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500">
                            {item.category}
                          </p>
                          <p className="font-medium text-slate-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Color: {item.color} Size: {item.size}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">
                            {item.quantity} X RP {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="mb-4 text-base font-semibold text-slate-900">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Product Price</span>
                      <span className="text-slate-600">
                        {ORDER_DATA.items.length} Item
                      </span>
                      <span className="font-medium text-slate-900">
                        RP {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        Shipping Cost Subtotal
                      </span>
                      <span className="text-slate-600">Shipping Discount</span>
                      <span className="text-slate-600">
                        -RP {shippingDiscount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Platform fees</span>
                      <span />
                      <span className="text-slate-600">
                        -RP {platformFees.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
                      <span className="font-semibold text-slate-900">
                        Total Sales
                      </span>
                      <span />
                      <span className="font-semibold text-slate-900">
                        RP {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Package Travel Timeline */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-base font-semibold text-slate-900">
              Package travel
            </h3>
            <p className="mb-6 text-xs text-slate-500">
              Track your package journey
            </p>

            <div className="space-y-6">
              {ORDER_DATA.timeline.map((event, index) => (
                <div key={index} className="relative flex gap-3">
                  {/* Timeline line */}
                  {index !== ORDER_DATA.timeline.length - 1 && (
                    <div className="absolute left-3 top-6 h-full w-0.5 bg-slate-200" />
                  )}

                  {/* Icon */}
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                      event.active ? "bg-orange-100" : "bg-slate-100"
                    }`}
                  >
                    <CircleDot
                      className={`size-4 ${
                        event.active ? "text-orange-600" : "text-slate-400"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {event.status}
                    </p>
                    <p className="text-xs text-slate-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusPage;
