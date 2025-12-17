import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { toast } from "sonner";

export function VendorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useVendorAuth();
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

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/vendor/login");
  };

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

          {/* Bottom Section - Logout Button */}
          <div className="border-t border-[#e2e8f0] p-6">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-[#475569] transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
