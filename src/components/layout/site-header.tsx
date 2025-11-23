import { Search, ShoppingBag, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NAV_LINKS = [
  { label: "Shop", to: "/" },
  { label: "On Sale", to: "/pipeline" },
  { label: "New Arrivals", to: "/reports" },
  { label: "Brands", to: "/reports" },
];

function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-5 sm:gap-6 lg:flex-nowrap">
        <NavLink
          to="/"
          className="text-2xl font-black tracking-tight text-slate-900"
        >
          SHOP.CO
        </NavLink>

        <nav className="flex flex-1 flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `font-medium transition hover:text-slate-900 ${
                  isActive ? "text-slate-900" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto lg:flex-1 lg:justify-end">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <Search className="size-4 text-slate-400" aria-hidden />
            <Input
              className="border-0 bg-transparent px-0 focus-visible:ring-0"
              placeholder="Search for products..."
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full border border-slate-200"
            >
              <UserRound className="size-4" />
            </Button>
            <NavLink to="/cart">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full border border-slate-200"
              >
                <ShoppingBag className="size-4" />
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
