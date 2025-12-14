import { useState } from "react";
import { toast } from "sonner";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  CreditCard,
  Activity,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SalesData {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  avgOrderValue: number;
  avgOrderChange: number;
  growthRate: number;
  growthChange: number;
}

interface MonthlyData {
  month: string;
  value: number;
}

interface TopProduct {
  id: string;
  name: string;
  category: string;
  revenue: number;
  unitsSold: number;
  image: string;
}

interface RecentOrder {
  orderId: string;
  customerName: string;
  customerAvatar: string;
  date: string;
  status: "completed" | "processing" | "shipped" | "cancelled";
  amount: number;
}

export default function SalesAnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState(2023);

  // Mock data - replace with actual API calls
  const salesData: SalesData = {
    totalRevenue: 124500,
    revenueChange: 8.2,
    totalOrders: 1240,
    ordersChange: 5.4,
    avgOrderValue: 100.4,
    avgOrderChange: -2.1,
    growthRate: 12.5,
    growthChange: 1.2,
  };

  const monthlyData: MonthlyData[] = [
    { month: "Jan", value: 35000 },
    { month: "Feb", value: 45000 },
    { month: "Mar", value: 30000 },
    { month: "Apr", value: 55000 },
    { month: "May", value: 65000 },
    { month: "Jun", value: 85000 },
    { month: "Jul", value: 70000 },
    { month: "Aug", value: 60000 },
    { month: "Sep", value: 75000 },
    { month: "Oct", value: 50000 },
    { month: "Nov", value: 40000 },
    { month: "Dec", value: 20000 },
  ];

  const topProducts: TopProduct[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      category: "Audio & Sound",
      revenue: 24500,
      unitsSold: 450,
      image: "🎧",
    },
    {
      id: "2",
      name: "Smart Watch Series 5",
      category: "Wearables",
      revenue: 12800,
      unitsSold: 320,
      image: "⌚",
    },
    {
      id: "3",
      name: "Ergo Office Chair",
      category: "Furniture",
      revenue: 8400,
      unitsSold: 210,
      image: "🪑",
    },
    {
      id: "4",
      name: "Mech Keyboard X",
      category: "Accessories",
      revenue: 4200,
      unitsSold: 150,
      image: "⌨️",
    },
    {
      id: "5",
      name: "Lumina Desk Lamp",
      category: "Lighting",
      revenue: 2100,
      unitsSold: 95,
      image: "💡",
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      orderId: "#ORD-7352",
      customerName: "Alice Smith",
      customerAvatar: "👩",
      date: "Oct 24, 2023",
      status: "completed",
      amount: 120.5,
    },
    {
      orderId: "#ORD-7351",
      customerName: "Bob Jones",
      customerAvatar: "👨",
      date: "Oct 24, 2023",
      status: "processing",
      amount: 45.0,
    },
    {
      orderId: "#ORD-7350",
      customerName: "Charlie Day",
      customerAvatar: "🧑",
      date: "Oct 23, 2023",
      status: "shipped",
      amount: 329.99,
    },
    {
      orderId: "#ORD-7349",
      customerName: "Sarah Connor",
      customerAvatar: "👩‍🦰",
      date: "Oct 22, 2023",
      status: "completed",
      amount: 89.0,
    },
    {
      orderId: "#ORD-7348",
      customerName: "Dan Reynolds",
      customerAvatar: "🧔",
      date: "Oct 22, 2023",
      status: "cancelled",
      amount: 15.0,
    },
  ];

  const maxValue = Math.max(...monthlyData.map((d) => d.value));

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "processing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleExportReport = () => {
    toast.success("Report export started");
    // Implement export logic
  };

  return (
    <div className="w-full max-w-[1600px] space-y-8 p-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a]">
            Sales Analytics
          </h1>
          <p className="text-[#64748b]">
            Overview of your store's performance and revenue trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-full border-[#e2e8f0] bg-white px-5 hover:bg-[#f8fafc]"
          >
            <Calendar className="h-5 w-5" />
            <span className="font-bold text-[#334155]">
              Oct 2023 - Nov 2023
            </span>
          </Button>
          <Button
            onClick={handleExportReport}
            className="h-10 gap-2 rounded-full bg-[#137fec] px-5 shadow-[0px_10px_15px_-3px_rgba(59,130,246,0.2),0px_4px_6px_-4px_rgba(59,130,246,0.2)] hover:bg-[#0f6fd4]"
          >
            <Download className="h-5 w-5" />
            <span className="font-bold">Export Report</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="border-[#f1f5f9] p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748b]">
              Total Revenue
            </h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(19,127,236,0.1)]">
              <DollarSign className="h-5 w-5 text-[#137fec]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight text-[#0f172a]">
              ${salesData.totalRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="font-bold text-emerald-600">
                +{salesData.revenueChange}%
              </span>
              <span className="font-medium text-[#94a3b8]">vs last month</span>
            </div>
          </div>
        </Card>

        {/* Total Orders */}
        <Card className="border-[#f1f5f9] p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748b]">
              Total Orders
            </h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(249,115,22,0.1)]">
              <ShoppingBag className="h-5 w-5 text-[#f97316]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight text-[#0f172a]">
              {salesData.totalOrders.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="font-bold text-emerald-600">
                +{salesData.ordersChange}%
              </span>
              <span className="font-medium text-[#94a3b8]">vs last month</span>
            </div>
          </div>
        </Card>

        {/* Average Order */}
        <Card className="border-[#f1f5f9] p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748b]">
              Avg. Order
            </h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(168,85,247,0.1)]">
              <CreditCard className="h-5 w-5 text-[#a855f7]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight text-[#0f172a]">
              ${salesData.avgOrderValue}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown className="h-4 w-4 text-rose-600" />
              <span className="font-bold text-rose-600">
                {salesData.avgOrderChange}%
              </span>
              <span className="font-medium text-[#94a3b8]">vs last month</span>
            </div>
          </div>
        </Card>

        {/* Growth */}
        <Card className="border-[#f1f5f9] p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748b]">
              Growth
            </h3>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(20,184,166,0.1)]">
              <Activity className="h-5 w-5 text-[#14b8a6]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight text-[#0f172a]">
              +{salesData.growthRate}%
            </p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="font-bold text-emerald-600">
                +{salesData.growthChange}%
              </span>
              <span className="font-medium text-[#94a3b8]">vs last year</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="border-[#f1f5f9] p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#0f172a]">
              Total Sales by Month
            </h2>
            <p className="text-sm text-[#64748b]">
              Revenue performance over the current fiscal year.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedYear(2023)}
              className={`rounded-3xl px-3 py-1.5 text-xs font-bold transition-colors ${
                selectedYear === 2023
                  ? "bg-[#137fec] text-white"
                  : "text-[#64748b] hover:bg-[#f8fafc]"
              }`}
            >
              2023
            </button>
            <button
              onClick={() => setSelectedYear(2022)}
              className={`rounded-3xl px-3 py-1.5 text-xs font-bold transition-colors ${
                selectedYear === 2022
                  ? "bg-[#137fec] text-white"
                  : "text-[#64748b] hover:bg-[#f8fafc]"
              }`}
            >
              2022
            </button>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-[300px] px-2">
          <div className="flex h-full items-end justify-between gap-2">
            {monthlyData.map((data) => {
              const heightPercentage = (data.value / maxValue) * 100;
              const isJune = data.month === "Jun";

              return (
                <div
                  key={data.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className={`group relative w-full max-w-[40px] rounded-t-3xl transition-all duration-300 hover:opacity-80 ${
                      isJune
                        ? "bg-[#137fec] shadow-[0px_10px_20px_-5px_rgba(19,127,236,0.4)]"
                        : "bg-[rgba(19,127,236,0.2)]"
                    }`}
                    style={{ height: `${heightPercentage}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 rounded-2xl bg-[#0f172a] px-2 py-1 text-xs font-bold text-white group-hover:block">
                      ${(data.value / 1000).toFixed(0)}k
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isJune ? "text-[#0f172a]" : "text-[#94a3b8]"
                    }`}
                  >
                    {data.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[465px_1fr]">
        {/* Top 5 Best Selling */}
        <Card className="border-[#f1f5f9]">
          <CardHeader className="border-b border-[#f1f5f9]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">
                Top 5 Best Selling
              </CardTitle>
              <button className="text-sm font-bold text-[#137fec] hover:underline">
                View All
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className={`flex items-center gap-4 p-4 ${
                  index !== topProducts.length - 1
                    ? "border-b border-[#f1f5f9]"
                    : ""
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f5f9] text-2xl">
                  {product.image}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-[#0f172a]">{product.name}</h4>
                  <p className="text-sm text-[#64748b]">{product.category}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="font-bold text-[#0f172a]">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs font-bold text-emerald-600">
                    {product.unitsSold} Sold
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Customer Orders */}
        <Card className="border-[#f1f5f9]">
          <CardHeader className="border-b border-[#f1f5f9]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">
                Recent Customer Orders
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-2 rounded-full bg-[#f8fafc] hover:bg-[#f1f5f9]"
              >
                <Filter className="h-4 w-4" />
                <span className="text-xs font-bold text-[#475569]">Filter</span>
              </Button>
            </div>
          </CardHeader>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#f1f5f9] bg-[rgba(248,250,252,0.5)]">
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
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#64748b]">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr
                    key={order.orderId}
                    className={
                      index !== recentOrders.length - 1
                        ? "border-b border-[#f1f5f9]"
                        : ""
                    }
                  >
                    <td className="px-6 py-4">
                      <button className="font-bold text-[#137fec] hover:underline">
                        {order.orderId}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e2e8f0] text-sm">
                          {order.customerAvatar}
                        </div>
                        <span className="font-medium text-[#0f172a]">
                          {order.customerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#64748b]">{order.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusStyles(
                          order.status
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-[#0f172a]">
                      ${order.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#f1f5f9] p-4 text-center">
            <button className="text-sm font-bold text-[#137fec] hover:underline">
              View All Orders
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
