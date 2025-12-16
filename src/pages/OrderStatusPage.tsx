import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Package,
  CreditCard,
  Truck,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import { getOrders, getOrderById } from "@/services/api";
import type { Order } from "@/services/api";
import { toast } from "sonner";

function OrderStatusPage() {
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get("orderId");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // If orderId is provided in URL, fetch that specific order
        if (orderIdParam) {
          const response = await getOrderById(parseInt(orderIdParam));
          if (response.success && response.data) {
            setSelectedOrder(response.data);
          }
        } else {
          // Otherwise, fetch all orders and show the most recent one
          const response = await getOrders();
          if (response.success && response.data && response.data.length > 0) {
            setSelectedOrder(response.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load order", {
          description:
            error instanceof Error
              ? error.message
              : "Could not load order information",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orderIdParam]);

  if (isLoading) {
    return (
      <div className="space-y-0">
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
        <div className="mx-auto w-full max-w-6xl px-4 py-12 text-center">
          <p className="text-slate-600">Loading order information...</p>
        </div>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="space-y-0">
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
        <div className="mx-auto w-full max-w-6xl px-4 py-12 text-center">
          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            No orders found
          </h1>
          <p className="text-slate-600">You haven't placed any orders yet.</p>
          <Link
            to="/products"
            className="mt-4 inline-block text-sm font-medium text-slate-900 underline hover:text-slate-700"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = selectedOrder.items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shippingDiscount = Math.round(subtotal * 0.2);
  const platformFees = 14;
  const total = subtotal - shippingDiscount - platformFees;

  // Check if this is a COD order by looking at the timeline
  const isCODOrder = selectedOrder.timeline.some((event) =>
    event.description?.includes("Cash on Delivery")
  );

  const getOrderSteps = (status: string, isCOD: boolean) => {
    if (isCOD) {
      // COD flow: Order Made -> Shipped -> Completed -> Order Paid (after delivery)
      const codStatuses = [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "PAID",
      ];
      const currentIndex = codStatuses.indexOf(status);

      return {
        orderMade: currentIndex >= 0,
        shipped: currentIndex >= 2,
        completed: currentIndex >= 3,
        orderPaid: currentIndex >= 4,
      };
    } else {
      // Regular flow: Order Made -> Order Paid -> Shipped -> Completed
      const regularStatuses = [
        "PENDING",
        "PAID",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
      ];
      const currentIndex = regularStatuses.indexOf(status);

      return {
        orderMade: currentIndex >= 0,
        orderPaid: currentIndex >= 1,
        shipped: currentIndex >= 3,
        completed: currentIndex >= 4,
      };
    }
  };

  const steps = getOrderSteps(selectedOrder.status, isCODOrder);

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
                      Order ID: {selectedOrder.orderNumber}
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                      Track your order and manage your delivery
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Contact Seller
                    </Button>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-orange-600" />
                    <span className="text-sm font-medium text-slate-900">
                      {selectedOrder.status}
                    </span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <span className="text-sm text-slate-600">
                      No Resi: {selectedOrder.trackingNumber}
                    </span>
                  )}
                </div>

                {/* Progress Steps */}
                <div className="grid grid-cols-4 gap-4 pt-4">
                  <div
                    className={`rounded-lg border-2 p-4 ${
                      steps.orderMade
                        ? "border-orange-600 bg-orange-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg ${
                        steps.orderMade ? "bg-orange-600" : "bg-slate-100"
                      }`}
                    >
                      <Package
                        className={`size-5 ${
                          steps.orderMade ? "text-white" : "text-slate-400"
                        }`}
                      />
                    </div>
                    <p
                      className={`mt-3 font-medium ${
                        steps.orderMade ? "text-slate-900" : "text-slate-600"
                      }`}
                    >
                      Order made
                    </p>
                    <p className="text-xs text-slate-500">Create order</p>
                  </div>
                  {isCODOrder ? (
                    <>
                      <div
                        className={`rounded-lg border-2 p-4 ${
                          steps.shipped
                            ? "border-orange-600 bg-orange-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex size-10 items-center justify-center rounded-lg ${
                            steps.shipped ? "bg-orange-600" : "bg-slate-100"
                          }`}
                        >
                          <Truck
                            className={`size-5 ${
                              steps.shipped ? "text-white" : "text-slate-400"
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-3 font-medium ${
                            steps.shipped ? "text-slate-900" : "text-slate-600"
                          }`}
                        >
                          Shipped
                        </p>
                        <p className="text-xs text-slate-500">On delivery</p>
                      </div>
                      <div
                        className={`rounded-lg border-2 p-4 ${
                          steps.completed
                            ? "border-orange-600 bg-orange-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex size-10 items-center justify-center rounded-lg ${
                            steps.completed ? "bg-orange-600" : "bg-slate-100"
                          }`}
                        >
                          <CheckCircle2
                            className={`size-5 ${
                              steps.completed ? "text-white" : "text-slate-400"
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-3 font-medium ${
                            steps.completed
                              ? "text-slate-900"
                              : "text-slate-600"
                          }`}
                        >
                          Completed
                        </p>
                        <p className="text-xs text-slate-500">
                          Order delivered
                        </p>
                      </div>
                      <div
                        className={`rounded-lg border-2 p-4 ${
                          steps.orderPaid
                            ? "border-orange-600 bg-orange-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex size-10 items-center justify-center rounded-lg ${
                            steps.orderPaid ? "bg-orange-600" : "bg-slate-100"
                          }`}
                        >
                          <CreditCard
                            className={`size-5 ${
                              steps.orderPaid ? "text-white" : "text-slate-400"
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-3 font-medium ${
                            steps.orderPaid
                              ? "text-slate-900"
                              : "text-slate-600"
                          }`}
                        >
                          Order Paid
                        </p>
                        <p className="text-xs text-slate-500">
                          Cash on delivery
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`rounded-lg border-2 p-4 ${
                          steps.orderPaid
                            ? "border-orange-600 bg-orange-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex size-10 items-center justify-center rounded-lg ${
                            steps.orderPaid ? "bg-orange-600" : "bg-slate-100"
                          }`}
                        >
                          <CreditCard
                            className={`size-5 ${
                              steps.orderPaid ? "text-white" : "text-slate-400"
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-3 font-medium ${
                            steps.orderPaid
                              ? "text-slate-900"
                              : "text-slate-600"
                          }`}
                        >
                          Order Paid
                        </p>
                        <p className="text-xs text-slate-500">
                          Customer payment
                        </p>
                      </div>
                      <div
                        className={`rounded-lg border-2 p-4 ${
                          steps.shipped
                            ? "border-orange-600 bg-orange-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex size-10 items-center justify-center rounded-lg ${
                            steps.shipped ? "bg-orange-600" : "bg-slate-100"
                          }`}
                        >
                          <Truck
                            className={`size-5 ${
                              steps.shipped ? "text-white" : "text-slate-400"
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-3 font-medium ${
                            steps.shipped ? "text-slate-900" : "text-slate-600"
                          }`}
                        >
                          Shipped
                        </p>
                        <p className="text-xs text-slate-500">On delivery</p>
                      </div>
                      <div
                        className={`rounded-lg border-2 p-4 ${
                          steps.completed
                            ? "border-orange-600 bg-orange-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex size-10 items-center justify-center rounded-lg ${
                            steps.completed ? "bg-orange-600" : "bg-slate-100"
                          }`}
                        >
                          <CheckCircle2
                            className={`size-5 ${
                              steps.completed ? "text-white" : "text-slate-400"
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-3 font-medium ${
                            steps.completed
                              ? "text-slate-900"
                              : "text-slate-600"
                          }`}
                        >
                          Completed
                        </p>
                        <p className="text-xs text-slate-500">
                          Order completed
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Shipping Addresses */}
                <div className="grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-slate-900">
                        Shipping Address
                      </h3>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-slate-900">
                        {selectedOrder.customerName}
                      </p>
                      <p className="text-slate-600">
                        {selectedOrder.shippingAddress}
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
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-slate-200 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center">
                              <Package className="size-8 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">
                            {item.productName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.color && `Color: ${item.color}`}
                            {item.color && item.size && " | "}
                            {item.size && `Size: ${item.size}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">
                            {item.quantity} X $
                            {parseFloat(item.price).toFixed(2)}
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
                        {selectedOrder.items.length} Item
                        {selectedOrder.items.length !== 1 ? "s" : ""}
                      </span>
                      <span className="font-medium text-slate-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        Shipping Cost Subtotal
                      </span>
                      <span className="text-slate-600">Shipping Discount</span>
                      <span className="text-slate-600">
                        -${shippingDiscount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Platform fees</span>
                      <span />
                      <span className="text-slate-600">
                        -${platformFees.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
                      <span className="font-semibold text-slate-900">
                        Total Sales
                      </span>
                      <span />
                      <span className="font-semibold text-slate-900">
                        ${total.toFixed(2)}
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
              {selectedOrder.timeline.map((event, index) => (
                <div key={event.id} className="relative flex gap-3">
                  {/* Timeline line */}
                  {index !== selectedOrder.timeline.length - 1 && (
                    <div className="absolute left-3 top-6 h-full w-0.5 bg-slate-200" />
                  )}

                  {/* Icon */}
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <CircleDot className="size-4 text-orange-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {event.status}
                    </p>
                    {event.description && (
                      <p className="text-xs text-slate-500">
                        {event.description}
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      {new Date(event.createdAt).toLocaleString()}
                    </p>
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
