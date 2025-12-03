import { Outlet } from "react-router-dom"

import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
// import ProductDetailPage from "./pages/DetailPage"


function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-slate-900">
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      {/* <ProductDetailPage/> */}
    </div>
  )
}

export default App