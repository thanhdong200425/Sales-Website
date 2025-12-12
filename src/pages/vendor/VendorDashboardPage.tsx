import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  ShoppingCart,
  AlertCircle,
  Star,
  Heart,
  Clock,
  TrendingUp,
  Filter,
} from "lucide-react";
import { StatsCard } from "@/components/vendor/StatsCard";
import { RevenueChart } from "@/components/vendor/RevenueChart";
import { OrdersTable } from "@/components/vendor/OrdersTable";
import { OrderBreakdownChart } from "@/components/vendor/OrderBreakdownChart";
import { ProductAlerts } from "@/components/vendor/ProductAlerts";
import { ActionItems } from "@/components/vendor/ActionItems";
import { PerformanceCard } from "@/components/vendor/PerformanceCard";
import {
  getVendorStats,
  getRevenueOverview,
  getVendorOrders,
  getOrderBreakdown,
  getProductAlerts,
  getPerformanceMetrics,
} from "@/services/vendorApi";

export default function VendorDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [orders, setOrders] = useState<any>(null);
  const [orderBreakdown, setOrderBreakdown] = useState<any>(null);
  const [alerts, setAlerts] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [period, setPeriod] = useState("30days");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    loadRevenueData();
  }, [period]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, breakdownRes, alertsRes, performanceRes] = await Promise.all([
        getVendorStats(),
        getVendorOrders(1, 4),
        getOrderBreakdown(),
        getProductAlerts(),
        getPerformanceMetrics(),
      ]);

      setStats(statsRes.data);
      setOrders(ordersRes.data);
      setOrderBreakdown(breakdownRes.data);
      setAlerts(alertsRes.data);
      setPerformance(performanceRes.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const loadRevenueData = async () => {
    try {
      const revenueRes = await getRevenueOverview(period);
      setRevenueData(revenueRes.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load revenue data");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900"></div>
          <p className="mt-4 text-sm text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] space-y-8 p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
          subtitle="vs. last month"
          change={stats?.revenueChange || 0}
          icon={<DollarSign className="h-6 w-6 text-slate-900" />}
          iconBgColor="bg-[rgba(26,26,26,0.1)]"
        />
        <StatsCard
          title="Active Orders"
          value={stats?.activeOrders || 0}
          subtitle="Currently processing"
          change={stats?.activeOrdersChange || 0}
          icon={<ShoppingCart className="h-6 w-6 text-blue-600" />}
          iconBgColor="bg-[rgba(59,130,246,0.1)]"
        />
        <StatsCard
          title="Pending Payments"
          value={`$${stats?.pendingPayments?.toLocaleString() || 0}`}
          subtitle="Needs attention"
          change={-2}
          icon={<AlertCircle className="h-6 w-6 text-orange-600" />}
          iconBgColor="bg-[rgba(249,115,22,0.1)]"
        />
        <StatsCard
          title="Average Rating"
          value={stats?.averageRating?.toFixed(1) || "0.0"}
          subtitle={`Based on ${stats?.totalReviews || 0} reviews`}
          change={0.1}
          icon={<Star className="h-6 w-6 fill-purple-600 text-purple-600" />}
          iconBgColor="bg-[rgba(168,85,247,0.1)]"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="space-y-8 lg:col-span-2">
          {/* Revenue Overview */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            {revenueData && (
              <RevenueChart
                data={revenueData.data || []}
                period={period}
                onPeriodChange={setPeriod}
              />
            )}
          </div>

          {/* Recent Orders */}
          <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
            <div className="border-b border-[#f1f5f9] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">Recent Orders</h3>
                  <p className="text-sm text-[#64748b]">Manage your latest transactions</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-full bg-[#f1f5f9] px-4 py-2 text-sm text-[#334155]">
                    <Filter className="h-4 w-4" />
                    All Status
                  </button>
                  <button className="rounded-full bg-[#1a1a1a] px-4 py-2 text-sm font-bold text-white">
                    Export
                  </button>
                </div>
              </div>
            </div>
            {orders && <OrdersTable orders={orders.orders || []} />}
            <div className="border-t border-[#f1f5f9] p-4 text-center">
              <button className="text-sm font-semibold text-[#1a1a1a] hover:underline">
                View All Orders
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Order Breakdown */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-[#0f172a]">Order Breakdown</h3>
            {orderBreakdown && (
              <OrderBreakdownChart
                total={orderBreakdown.total || 0}
                completed={orderBreakdown.completed || 0}
                processing={orderBreakdown.processing || 0}
                pending={orderBreakdown.pending || 0}
              />
            )}
          </div>

          {/* Product Alerts */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0f172a]">Product Alerts</h3>
              {alerts && (alerts.outOfStock.length > 0 || alerts.lowInventory.length > 0) && (
                <span className="rounded-full bg-[rgba(239,68,68,0.2)] px-2 py-1 text-xs font-bold text-[#ef4444]">
                  {alerts.outOfStock.length + alerts.lowInventory.length} New
                </span>
              )}
            </div>
            {alerts && (
              <ProductAlerts
                outOfStock={alerts.outOfStock || []}
                lowInventory={alerts.lowInventory || []}
              />
            )}
          </div>

          {/* Action Items */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-[#0f172a]">Action Items</h3>
            <ActionItems />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PerformanceCard
          title="Customer Rating"
          icon={<Heart className="h-6 w-6 text-purple-600" />}
          iconBgColor="bg-[#f3e8ff]"
          value={`${performance?.customerRating?.toFixed(1) || "0.0"}/5`}
          rating={performance?.customerRating || 0}
        />
        <PerformanceCard
          title="Avg Response Time"
          icon={<Clock className="h-6 w-6 text-blue-600" />}
          iconBgColor="bg-[#dbeafe]"
          value={`${Math.floor((performance?.averageResponseTime || 0) / 60)}h ${(performance?.averageResponseTime || 0) % 60}m`}
          subtitle="-15m vs last week"
        />
        <PerformanceCard
          title="Fulfillment Rate"
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          iconBgColor="bg-[#dcfce7]"
          value={`${performance?.fulfillmentRate?.toFixed(1) || "0.0"}%`}
          subtitle="Top 5% of vendors"
        />
      </div>
    </div>
  );
}

