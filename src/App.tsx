import { Routes, Route } from "react-router-dom";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";         
import NotFoundPage from "./pages/NotFoundPage"; 

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-slate-900">
      
      <AnnouncementBar />
      <SiteHeader />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/pipeline" element={<div className="p-10 text-center">Pipeline Page (Under Construction)</div>} />
          <Route path="/reports" element={<div className="p-10 text-center">Reports Page (Under Construction)</div>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}

export default App;