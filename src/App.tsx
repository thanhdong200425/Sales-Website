import clsx from "clsx"
import { NavLink, Outlet } from "react-router-dom"

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(
    "text-sm font-medium text-slate-500 transition hover:text-slate-900",
    isActive && "text-slate-900",
  )

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-lg font-semibold text-slate-900">
            Sales PM
          </NavLink>

          <nav className="flex items-center gap-4">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/pipeline" className={navLinkClasses}>
              Pipeline
            </NavLink>
            <NavLink to="/reports" className={navLinkClasses}>
              Reports
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex grow items-center justify-center px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default App