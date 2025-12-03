import { Search, ShoppingBag, UserRound, Heart, Menu, X, ChevronDown } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Shop", to: "/products", isDropdown: true },
  { label: "On Sale", to: "/pipeline" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Brands", to: "/brands" },
];

const SHOP_STYLES = [
  { name: 'Casual', param: 'casual' },
  { name: 'Formal', param: 'formal' },
  { name: 'Party', param: 'party' },
  { name: 'Gym', param: 'gym' },
];

function SiteHeader() {
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q");
    if (query) {
      navigate(`/products?search=${query}`);
      setIsMobileSearchOpen(false); 
    }
  };

  return (
    <>
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

          <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900">
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
                  className="group relative h-full py-4"
                  onMouseEnter={() => setIsShopMenuOpen(true)}
                  onMouseLeave={() => setIsShopMenuOpen(false)}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center gap-1 transition hover:text-slate-900 ${isShopMenuOpen ? 'text-slate-900' : ''}`}
                    onClick={() => setIsShopMenuOpen(false)}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isShopMenuOpen ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-full w-56 rounded-lg border border-slate-100 bg-white p-2 shadow-lg ring-1 ring-slate-900/5 transition-all duration-200 ${
                      isShopMenuOpen
                        ? 'visible opacity-100 translate-y-0'
                        : 'invisible opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <Link
                      to="/products"
                      onClick={() => setIsShopMenuOpen(false)}
                      className="block rounded-md px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      Browse All Products
                    </Link>
                    <div className="my-1 h-px bg-slate-100" />
                    {SHOP_STYLES.map((style) => (
                      <Link
                        key={style.param}
                        to={`/products?category=${style.param}`}
                        onClick={() => setIsShopMenuOpen(false)}
                        className="block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
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
                  `transition hover:text-slate-900 ${isActive ? "text-slate-900 font-semibold" : ""}`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* SEARCH BAR & ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm items-center gap-2 rounded-full bg-slate-100 px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-slate-200 focus-within:bg-white">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              name="q"
              className="flex-1 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
              placeholder="Search for products..."
              autoComplete="off"
            />
          </form>

          {/* Mobile Search Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Icons Group */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100" title="Wishlist">
                    <Heart className="h-5 w-5" />
                </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 relative" title="Cart">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/login">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100" title="Account">
                    <UserRound className="h-5 w-5" />
                </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {isMobileSearchOpen && (
        <div className="border-t border-slate-100 bg-white p-4 md:hidden animate-in slide-in-from-top-2">
           <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
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
    </header>


    {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
            <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            <div className="relative w-full max-w-xs bg-white p-6 shadow-xl animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-bold">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
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
                    
                    <Link to="/cart" className="flex items-center gap-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        <ShoppingBag className="h-5 w-5" /> Cart
                    </Link>
                    <Link to="/wishlist" className="flex items-center gap-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        <Heart className="h-5 w-5" /> Wishlist
                    </Link>
                </nav>
            </div>
        </div>
    )}
    </>
  );
}

export { SiteHeader };