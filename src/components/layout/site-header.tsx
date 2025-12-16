import {
  Search,
  ShoppingBag,
  UserRound,
  User,
  Package,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleLogout } from "@/services/api";

const NAV_LINKS = [
  { label: "Shop", to: "/products", isDropdown: true },
  { label: "On Sale", to: "/pipeline" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Brands", to: "/brands" },
];

const SHOP_STYLES = [
  { name: "Casual", param: "Casual" },
  { name: "Formal", param: "Formal" },
  { name: "Party", param: "Party" },
  { name: "Gym", param: "Gym" },
];

function SiteHeader() {
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistPulseKey, setWishlistPulseKey] = useState(0);
  const [showWishlistPulse, setShowWishlistPulse] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    // Check on storage change (when login/logout in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const handleWishlistPulse = () => {
      setWishlistPulseKey((prev) => prev + 1);
    };

    window.addEventListener("wishlist:pulse", handleWishlistPulse);
    return () => {
      window.removeEventListener("wishlist:pulse", handleWishlistPulse);
    };
  }, []);

  useEffect(() => {
    if (wishlistPulseKey === 0) return;
    setShowWishlistPulse(true);
    const timeout = setTimeout(() => setShowWishlistPulse(false), 800);
    return () => clearTimeout(timeout);
  }, [wishlistPulseKey]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q");
    if (query) {
      navigate(`/products?search=${query}`);
      setIsMobileSearchOpen(false);
    }
  };
  const handleUserLogout = () => {
    handleLogout();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* MOBILE MENU TRIGGER & LOGO */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-slate-900"
          >
            SHOP.CO
          </Link>
        </div>

        {/*  DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          {NAV_LINKS.map((item) => {
            if (item.isDropdown) {
              return (
                <div
                  key={item.label}
                  className="group relative h-full flex items-center px-2"
                  onMouseEnter={() => setIsShopMenuOpen(true)}
                  onMouseLeave={() => setIsShopMenuOpen(false)}
                >
                  <Link
                    to={item.to}
                    className={`font-medium transition hover:text-slate-900 flex items-center h-full cursor-pointer ${
                      isShopMenuOpen ? "text-slate-900" : ""
                    }`}
                    onClick={() => setIsShopMenuOpen(false)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isShopMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {/* Menu Dropdown */}
                  <div
                    className={`absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 rounded-b-md border border-t-0 border-slate-100 bg-white p-2 shadow-xl transition-all duration-200 ${
                      isShopMenuOpen
                        ? "visible opacity-100 translate-y-0"
                        : "invisible opacity-0 -translate-y-2"
                    }`}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>

                    <Link
                      to="/products"
                      onClick={() => setIsShopMenuOpen(false)}
                      className="block rounded-md px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
                    >
                      View All
                    </Link>

                    <div className="my-1 border-t border-slate-100"></div>

                    {SHOP_STYLES.map((style) => (
                      <Link
                        key={style.param}
                        to={`/products?style=${style.param}`}
                        onClick={() => setIsShopMenuOpen(false)}
                        className="block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                      >
                        {style.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
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
            );
          })}
        </nav>

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto lg:flex-1 lg:justify-end">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-sm items-center gap-2 rounded-full bg-slate-100 px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-slate-200 focus-within:bg-white"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <input
              name="q"
              className="flex-1 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
              placeholder="Search for products..."
              autoComplete="off"
            />
          </form>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full border border-slate-200"
                  >
                    <UserRound className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="size-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/order-status"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Package className="size-4" />
                      <span>Order Status</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button
                      type="button"
                      onClick={() => handleUserLogout()}
                      className="flex items-center gap-2 cursor-pointer w-full text-left"
                    >
                      <LogOut className="size-4" />
                      <span>Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="outline"
                className="rounded-full border border-slate-200"
              >
                <Link to="/login" className="flex items-center gap-2">
                  <UserRound className="size-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
            )}
            <Link to="/wishlist">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-slate-100"
                  title="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                {showWishlistPulse && (
                  <span className="pointer-events-none absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white shadow-sm animate-bounce">
                    +1
                  </span>
                )}
              </div>
            </Link>
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
      {/* MOBILE SEARCH BAR */}
      {isMobileSearchOpen && (
        <div className="border-t border-slate-100 bg-white p-4 md:hidden animate-in slide-in-from-top-2">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <input
              name="q"
              className="flex-1 bg-transparent text-sm focus:outline-none"
              placeholder="Search..."
              autoFocus
            />
          </form>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="relative w-full max-w-xs bg-white p-6 shadow-xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-slate-100"></div>

              <Link
                to="/cart"
                className="flex items-center gap-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" /> Cart
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5" /> Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export { SiteHeader };
