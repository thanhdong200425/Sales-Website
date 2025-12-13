import { Outlet, useNavigate } from "react-router-dom";
import { Bell, Search, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export function VendorLayout() {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState("Alex Morgan");

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
        setVendorName(vendor.contactName || vendor.businessName || "Vendor");
      } catch (e) {
        console.error("Failed to parse vendor data", e);
      }
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#2c3928] bg-[rgba(247,247,247,0.95)] backdrop-blur-sm">
        <div className="flex items-center justify-between px-10 py-4">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(26,26,26,0.2)]">
                <Menu className="h-6 w-6 text-slate-900" />
              </div>
              <h1 className="text-lg font-bold text-[#0f172a]">VendorHub</h1>
            </div>

            {/* Search Bar */}
            <div className="flex h-10 min-w-[160px] max-w-[320px] items-center rounded-full bg-[#e5e5e5] px-4">
              <Search className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 flex-1 bg-transparent text-sm text-[#64748b] placeholder:text-[#64748b] focus:outline-none"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e5e5]">
              <Bell className="h-5 w-5 text-slate-700" />
              {/* Notification Badge */}
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-[#142210] bg-[#1a1a1a]"></span>
            </button>

            {/* Vendor Profile */}
            <div className="flex items-center gap-3 border-l border-[#2c3928] pl-3">
              <div className="text-right">
                <p className="text-xs font-bold text-[#0f172a]">{vendorName}</p>
                <p className="text-[10px] text-[#a3b99d]">Vendor Admin</p>
              </div>
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#2c3928]">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-semibold text-white">
                  {vendorName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-40 py-0">
        <Outlet />
      </main>
    </div>
  );
}

