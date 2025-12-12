import { MoreHorizontal } from "lucide-react";

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  status: string;
}

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
      case "DELIVERED":
        return "bg-[rgba(34,197,94,0.1)] text-[#22c55e]";
      case "PROCESSING":
      case "SHIPPED":
        return "bg-[rgba(234,179,8,0.1)] text-[#eab308]";
      case "PENDING":
        return "bg-[rgba(239,68,68,0.1)] text-[#ef4444]";
      default:
        return "bg-[rgba(148,163,184,0.1)] text-[#94a3b8]";
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Order ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Amount
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Status
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9] bg-white">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#0f172a]">
                {order.orderNumber}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
                      {order.customerName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <span className="text-sm text-[#334155]">{order.customerName}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-[#334155]">
                {new Date(order.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#334155]">
                ${order.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {formatStatus(order.status)}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-[#64748b] hover:text-[#0f172a]">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

