import { Outlet } from "react-router-dom"

import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white text-slate-900">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App