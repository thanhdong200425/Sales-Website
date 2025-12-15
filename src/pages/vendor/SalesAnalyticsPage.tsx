import { useState, useEffect } from "react";
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
import { getSalesAnalytics } from "@/services/vendorApi";

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
  customerEmail?: string;
  date: string;
  status:
    | "completed"
    | "processing"
    | "shipped"
    | "cancelled"
    | "pending"
    | "delivered";
  amount: number;
}

export default function SalesAnalyticsPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<SalesData>({
    totalRevenue: 0,
    revenueChange: 0,
    totalOrders: 0,
    ordersChange: 0,
    avgOrderValue: 0,
    avgOrderChange: 0,
    growthRate: 0,
    growthChange: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  useEffect(() => {
    fetchSalesAnalytics();
  }, [selectedYear]);

  const fetchSalesAnalytics = async () => {
    try {
      setLoading(true);
      const response = await getSalesAnalytics(selectedYear);

      if (response.success) {
        const data = response.data;
        setSalesData({
          totalRevenue: data.totalRevenue,
          revenueChange: data.revenueChange,
          totalOrders: data.totalOrders,
          ordersChange: data.ordersChange,
          avgOrderValue: data.avgOrderValue,
          avgOrderChange: data.avgOrderChange,
          growthRate: data.growthRate,
          growthChange: data.growthChange,
        });
        setMonthlyData(data.monthlyData);
        setTopProducts(data.topProducts);
        setRecentOrders(data.recentOrders);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load sales analytics");
      console.error("Error fetching sales analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const maxValue = Math.max(...monthlyData.map((d) => d.value), 1);

  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "completed":
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "processing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "pending":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCustomerInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleExportReport = () => {
    toast.success("Report export started");
    // Implement export logic
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#137fec] border-r-transparent"></div>
          <p className="text-[#64748b]">Loading sales analytics...</p>
        </div>
      </div>
    );
  }

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
              {salesData.revenueChange >= 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-emerald-600">
                    +{salesData.revenueChange.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-rose-600" />
                  <span className="font-bold text-rose-600">
                    {salesData.revenueChange.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="font-medium text-[#94a3b8]">vs last year</span>
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
              {salesData.ordersChange >= 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-emerald-600">
                    +{salesData.ordersChange.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-rose-600" />
                  <span className="font-bold text-rose-600">
                    {salesData.ordersChange.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="font-medium text-[#94a3b8]">vs last year</span>
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
              ${salesData.avgOrderValue.toFixed(2)}
            </p>
            <div className="flex items-center gap-1 text-sm">
              {salesData.avgOrderChange >= 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-emerald-600">
                    +{salesData.avgOrderChange.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-rose-600" />
                  <span className="font-bold text-rose-600">
                    {salesData.avgOrderChange.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="font-medium text-[#94a3b8]">vs last year</span>
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
              {salesData.growthRate >= 0 ? "+" : ""}
              {salesData.growthRate.toFixed(1)}%
            </p>
            <div className="flex items-center gap-1 text-sm">
              {salesData.growthChange >= 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-emerald-600">
                    +{salesData.growthChange.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-rose-600" />
                  <span className="font-bold text-rose-600">
                    {salesData.growthChange.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="font-medium text-[#94a3b8]">vs last month</span>
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
              onClick={() => setSelectedYear(currentYear)}
              className={`rounded-3xl px-3 py-1.5 text-xs font-bold transition-colors ${
                selectedYear === currentYear
                  ? "bg-[#137fec] text-white"
                  : "text-[#64748b] hover:bg-[#f8fafc]"
              }`}
            >
              {currentYear}
            </button>
            <button
              onClick={() => setSelectedYear(currentYear - 1)}
              className={`rounded-3xl px-3 py-1.5 text-xs font-bold transition-colors ${
                selectedYear === currentYear - 1
                  ? "bg-[#137fec] text-white"
                  : "text-[#64748b] hover:bg-[#f8fafc]"
              }`}
            >
              {currentYear - 1}
            </button>
            <button
              onClick={() => setSelectedYear(currentYear - 2)}
              className={`rounded-3xl px-3 py-1.5 text-xs font-bold transition-colors ${
                selectedYear === currentYear - 2
                  ? "bg-[#137fec] text-white"
                  : "text-[#64748b] hover:bg-[#f8fafc]"
              }`}
            >
              {currentYear - 2}
            </button>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-[300px] px-2">
          {monthlyData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-[#94a3b8]">
              No data available for {selectedYear}
            </div>
          ) : (
            <div className="flex h-full items-end justify-between gap-2">
              {monthlyData.map((data) => {
                const heightPercentage =
                  maxValue > 0 ? (data.value / maxValue) * 100 : 0;
                const isHighest = data.value === maxValue && maxValue > 0;

                return (
                  <div
                    key={data.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className={`group relative w-full max-w-[40px] rounded-t-3xl transition-all duration-300 hover:opacity-80 ${
                        isHighest
                          ? "bg-[#137fec] shadow-[0px_10px_20px_-5px_rgba(19,127,236,0.4)]"
                          : "bg-[rgba(19,127,236,0.2)]"
                      }`}
                      style={{
                        height: `${heightPercentage}%`,
                        minHeight: heightPercentage > 0 ? "4px" : "0",
                      }}
                    >
                      {/* Tooltip */}
                      {data.value > 0 && (
                        <div className="absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 rounded-2xl bg-[#0f172a] px-2 py-1 text-xs font-bold text-white group-hover:block">
                          $
                          {data.value >= 1000
                            ? (data.value / 1000).toFixed(1) + "k"
                            : data.value.toFixed(0)}
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isHighest ? "text-[#0f172a]" : "text-[#94a3b8]"
                      }`}
                    >
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
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
            {topProducts.length === 0 ? (
              <div className="p-8 text-center text-[#94a3b8]">
                No product sales data available
              </div>
            ) : (
              topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex items-center gap-4 p-4 ${
                    index !== topProducts.length - 1
                      ? "border-b border-[#f1f5f9]"
                      : ""
                  }`}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-full object-cover bg-[#f1f5f9]"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f5f9] text-2xl">
                      📦
                    </div>
                  )}
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
              ))
            )}
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
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-[#94a3b8]"
                    >
                      No recent orders available
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order, index) => (
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
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e2e8f0] text-xs font-bold text-[#64748b]">
                            {getCustomerInitials(order.customerName)}
                          </div>
                          <span className="font-medium text-[#0f172a]">
                            {order.customerName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#64748b]">
                        {formatDate(order.date)}
                      </td>
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
                  ))
                )}
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
