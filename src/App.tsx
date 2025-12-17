import { Outlet, useLocation } from "react-router-dom";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === "/login";

  return (
    <CartProvider>
      <div className="flex min-h-svh flex-col bg-white text-slate-900">
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        {!hideFooter && <SiteFooter />}
        {/* <ProductDetailPage/> */}
      </div>
      <Toaster position="top-right" richColors />
    </CartProvider>
  );
}

export default App;
