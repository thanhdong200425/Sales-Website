import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Settings,
  Crown,
} from "lucide-react";
import { useEffect, useState } from "react";

export function VendorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendorName, setVendorName] = useState("TechGear Pro");

  useEffect(() => {
    // Check if vendor is authenticated
    const token = localStorage.getItem("vendorToken");
    if (!token) {
      navigate("/vendor/login");
    }

    // Get vendor info from localStorage or API
    const vendorData = localStorage.getItem("vendorData");
    if (vendorData) {
      try {
        const vendor = JSON.parse(vendorData);
        setVendorName(
          vendor.contactName || vendor.businessName || "TechGear Pro"
        );
      } catch (e) {
        console.error("Failed to parse vendor data", e);
      }
    }
  }, [navigate]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/vendor/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/vendor/analytics", label: "Sales Analytics", icon: BarChart3 },
    { path: "/vendor/products", label: "Products", icon: Package },
    { path: "/vendor/orders", label: "Orders", icon: ShoppingCart },
    { path: "/vendor/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#f6f7f8] to-[#f6f7f8]">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-[288px] flex-shrink-0 border-r border-[#e2e8f0] bg-white">
        <div className="flex h-full flex-col justify-between overflow-auto">
          {/* Top Section */}
          <div className="space-y-8 p-6">
            {/* Vendor Info */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-lg font-bold text-white">
                  {vendorName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0f172a]">
                  {vendorName}
                </h2>
                <p className="text-xs font-medium text-[#64748b]">
                  Vendor Portal
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex w-full items-center gap-3 rounded-full px-4 py-2.5 transition-colors ${
                      active
                        ? "bg-[rgba(19,127,236,0.1)] text-[#137fec]"
                        : "text-[#475569] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        active ? "text-[#137fec]" : "text-[#475569]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        active ? "font-bold" : "font-medium"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section - Premium Badge */}
          <div className="p-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#137fec] to-[#2563eb] p-4 shadow-sm">
              <div className="relative z-10 space-y-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">
                    Premium Vendor
                  </h3>
                  <p className="text-xs leading-tight text-white/80">
                    Your store is performing in the top 5% this month.
                  </p>
                </div>
                <button className="flex w-full items-center justify-center rounded-3xl bg-white/20 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/30">
                  View Badge
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
