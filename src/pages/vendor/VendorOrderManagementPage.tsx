import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  getVendorOrdersList,
  getVendorOrderDetail,
  updateOrderItemStatus,
  getVendorOrderStats,
} from "@/services/vendorApi";

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
  image?: string;
  status: string;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  trackingNumber?: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

interface OrderStats {
  totalOrders: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export default function VendorOrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    loadOrders();
    loadStats();
  }, [currentPage, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getVendorOrdersList(
        currentPage,
        10,
        statusFilter === "all" ? undefined : statusFilter
      );
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      toast.error(error.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await getVendorOrderStats();
      setStats(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load stats");
    }
  };

  const handleViewOrder = async (order: Order) => {
    try {
      const response = await getVendorOrderDetail(order.id);
      setSelectedOrder(response.data);
      setShowOrderModal(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to load order details");
    }
  };

  const handleUpdateStatus = async (
    orderItemId: number,
    status: string,
    trackingNumber?: string
  ) => {
    try {
      await updateOrderItemStatus(orderItemId, status, trackingNumber);
      toast.success("Order status updated successfully");
      loadOrders();
      if (selectedOrder) {
        const response = await getVendorOrderDetail(selectedOrder.id);
        setSelectedOrder(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update order status");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && orders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#3b82f6] border-t-transparent"></div>
          <p className="mt-4 text-sm text-[#64748b]">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0f172a]">Order Management</h1>
          <p className="mt-2 text-sm text-[#64748b]">
            Manage and track all your orders
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[#64748b]">Total Orders</p>
                  <p className="text-2xl font-bold text-[#0f172a]">
                    {stats.totalOrders}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-[#64748b]">Processing</p>
                  <p className="text-2xl font-bold text-[#0f172a]">
                    {stats.processing}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Truck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-[#64748b]">Shipped</p>
                  <p className="text-2xl font-bold text-[#0f172a]">
                    {stats.shipped}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[#64748b]">Delivered</p>
                  <p className="text-2xl font-bold text-[#0f172a]">
                    {stats.delivered}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-[#64748b]">Cancelled</p>
                  <p className="text-2xl font-bold text-[#0f172a]">
                    {stats.cancelled}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-[#3b82f6] text-white"
                  : "bg-white text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("PROCESSING")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === "PROCESSING"
                  ? "bg-[#3b82f6] text-white"
                  : "bg-white text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => setStatusFilter("SHIPPED")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === "SHIPPED"
                  ? "bg-[#3b82f6] text-white"
                  : "bg-white text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              Shipped
            </button>
            <button
              onClick={() => setStatusFilter("DELIVERED")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === "DELIVERED"
                  ? "bg-[#3b82f6] text-white"
                  : "bg-white text-[#64748b] hover:bg-[#f1f5f9]"
              }`}
            >
              Delivered
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search by order number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-[#e2e8f0] bg-white py-2 pl-10 pr-4 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50 sm:w-80"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    Order Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Package className="mx-auto h-12 w-12 text-[#cbd5e1]" />
                      <p className="mt-4 text-sm text-[#64748b]">
                        No orders found
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#f8fafc] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#0f172a]">
                          {order.orderNumber}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-[#0f172a]">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-[#64748b]">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#64748b]">
                          {order.items.length} item(s)
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#0f172a]">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#64748b]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb] transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#e2e8f0] px-6 py-4">
              <p className="text-sm text-[#64748b]">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-sm font-medium text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-sm font-medium text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        {selectedOrder && (
          <OrderDetailsDialog
            order={selectedOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </Dialog>
    </div>
  );
}

interface OrderDetailsDialogProps {
  order: Order;
  onUpdateStatus: (
    orderItemId: number,
    status: string,
    trackingNumber?: string
  ) => void;
}

function OrderDetailsDialog({
  order,
  onUpdateStatus,
}: OrderDetailsDialogProps) {
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = () => {
    if (selectedItem && newStatus) {
      onUpdateStatus(selectedItem.id, newStatus, trackingNumber || undefined);
      setSelectedItem(null);
      setNewStatus("");
      setTrackingNumber("");
    }
  };

  return (
    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
        <DialogDescription>Order #{order.orderNumber}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Customer Info */}
        <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4">
          <h3 className="mb-2 font-semibold text-[#0f172a]">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div>
              <span className="text-[#64748b]">Name:</span>{" "}
              <span className="font-medium text-[#0f172a]">
                {order.customerName}
              </span>
            </div>
            <div>
              <span className="text-[#64748b]">Email:</span>{" "}
              <span className="font-medium text-[#0f172a]">
                {order.customerEmail}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="text-[#64748b]">Shipping Address:</span>{" "}
              <span className="font-medium text-[#0f172a]">
                {order.shippingAddress}
              </span>
            </div>
            {order.trackingNumber && (
              <div className="md:col-span-2">
                <span className="text-[#64748b]">Tracking Number:</span>{" "}
                <span className="font-medium text-[#0f172a]">
                  {order.trackingNumber}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="mb-4 font-semibold text-[#0f172a]">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-[#e2e8f0] bg-white p-4"
              >
                <div className="flex items-start gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-[#0f172a]">
                      {item.productName}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#64748b]">
                      {item.color && (
                        <span>
                          Color: <span className="font-medium">{item.color}</span>
                        </span>
                      )}
                      {item.size && (
                        <span>
                          Size: <span className="font-medium">{item.size}</span>
                        </span>
                      )}
                      <span>
                        Quantity:{" "}
                        <span className="font-medium">{item.quantity}</span>
                      </span>
                      <span>
                        Price:{" "}
                        <span className="font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-sm text-[#64748b]">Status:</span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "SHIPPED"
                              ? "bg-purple-100 text-purple-800"
                              : item.status === "DELIVERED"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setNewStatus(item.status);
                        }}
                        className="ml-auto rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb] transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Update Status Form */}
        {selectedItem && (
          <div className="mb-6 rounded-lg border-2 border-[#3b82f6] bg-blue-50 p-4">
            <h3 className="mb-4 font-semibold text-[#0f172a]">
              Update Status for {selectedItem.productName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0f172a]">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50"
                >
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              {newStatus === "SHIPPED" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#0f172a]">
                    Tracking Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50"
                  />
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-[#3b82f6] px-6 py-2 text-sm font-medium text-white hover:bg-[#2563eb] transition-colors"
                >
                  Update Status
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setNewStatus("");
                    setTrackingNumber("");
                  }}
                  className="rounded-lg border border-[#e2e8f0] bg-white px-6 py-2 text-sm font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-end border-t border-[#e2e8f0] pt-4">
          <div className="text-right">
            <p className="text-sm text-[#64748b]">Total Amount</p>
            <p className="text-2xl font-bold text-[#0f172a]">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
