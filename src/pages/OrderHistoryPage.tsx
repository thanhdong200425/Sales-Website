import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { getOrders } from "@/services/api";
import type { Order } from "@/services/api";
import { OrderList } from "@/components/order/OrderList";
import { Link } from "react-router-dom";

export const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders();
        if (response.success) {
          setOrders(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const pendingOrders = orders.filter(
    (order) =>
      !["delivered", "cancelled", "completed"].includes(
        order.status.toLowerCase()
      )
  );

  const completedOrders = orders.filter((order) =>
    ["delivered", "cancelled", "completed"].includes(order.status.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white font-sans text-black">
      <main className="max-w-[1240px] mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
          <Link to="/">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">Order History</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Order History
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">Loading orders...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-red-600">{error}</div>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">No orders found.</div>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-12">
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">
                  Pending Orders
                </h2>
                <p className="text-slate-600 text-sm">
                  Orders currently being processed or in transit
                </p>
              </div>
              {pendingOrders.length > 0 ? (
                <OrderList orders={pendingOrders} />
              ) : (
                <div className="flex items-center justify-center py-12 bg-slate-50 rounded-[20px]">
                  <div className="text-slate-500">No pending orders.</div>
                </div>
              )}
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">
                  Completed Orders
                </h2>
                <p className="text-slate-600 text-sm">
                  Orders that have been delivered or cancelled
                </p>
              </div>
              {completedOrders.length > 0 ? (
                <OrderList orders={completedOrders} />
              ) : (
                <div className="flex items-center justify-center py-12 bg-slate-50 rounded-[20px]">
                  <div className="text-slate-500">No completed orders.</div>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};
