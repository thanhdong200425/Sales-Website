import { Search, ShoppingBag, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NAV_LINKS = [
  { label: 'Shop', to: '/products', isDropdown: true },
  { label: 'On Sale', to: '/pipeline' },
  { label: 'New Arrivals', to: '/reports' },
  { label: 'Brands', to: '/reports' },
];

const SHOP_STYLES = [
  { name: 'Casual', param: 'Casual' },
  { name: 'Formal', param: 'Formal' },
  { name: 'Party', param: 'Party' },
  { name: 'Gym', param: 'Gym' },
];

function SiteHeader() {
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // const handleShopClick = () => {
  //   setIsShopMenuOpen(prev => !prev);
  // };

  const handleLogout = () => {
    // TODO: Implement logout logic
    setIsUserMenuOpen(false);
  };

  return (
    <header className='border-b border-slate-200 bg-white'>
      <div className='mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-5 sm:gap-6 lg:flex-nowrap'>
        <NavLink to='/' className='text-2xl font-black tracking-tight text-slate-900'>
          SHOP.CO
        </NavLink>

        <nav className='flex flex-1 flex-wrap items-center justify-center gap-4 text-sm text-slate-600'>
          {NAV_LINKS.map((item) => {
            if (item.isDropdown) {
              return (
                <div
                  key={item.label}
                  className='group relative h-full flex items-center px-2'
                  onMouseEnter={() => setIsShopMenuOpen(true)}
                  onMouseLeave={() => setIsShopMenuOpen(false)}
                >
                  <Link
                    to={item.to}
                    className={`font-medium transition hover:text-slate-900 flex items-center h-full cursor-pointer ${
                      isShopMenuOpen ? 'text-slate-900' : ''
                    }`}
                    onClick={() => setIsShopMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                  {/* Menu Dropdown */}
                  <div
                    className={`absolute left-1/2 top-[100%] z-50 w-48 -translate-x-1/2 rounded-b-md border border-t-0 border-slate-100 bg-white p-2 shadow-xl transition-all duration-200 ${
                      isShopMenuOpen
                        ? 'visible opacity-100 translate-y-0'
                        : 'invisible opacity-0 -translate-y-2'
                    }`}
                  >
                    <div className='absolute -top-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white'></div>

                    <Link
                      to='/products'
                      onClick={() => setIsShopMenuOpen(false)}
                      className='block rounded-md px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50'
                    >
                      View All
                    </Link>

                    <div className='my-1 border-t border-slate-100'></div>

                    {SHOP_STYLES.map((style) => (
                      <Link
                        key={style.param}
                        to={`/products?style=${style.param}`}
                        onClick={() => setIsShopMenuOpen(false)}
                        className='block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
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
                    isActive ? 'text-slate-900' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className='flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto lg:flex-1 lg:justify-end'>
          <div className='flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2'>
            <Search className='size-4 text-slate-400' aria-hidden />
            <Input
              className='border-0 bg-transparent px-0 focus-visible:ring-0'
              placeholder='Search for products...'
            />
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='relative'
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <Button
                size='icon'
                variant='ghost'
                className='rounded-full border border-slate-200'
              >
                <UserRound className='size-4' />
              </Button>

              {/* User Menu Dropdown */}
              <div
                className={`absolute right-0 top-[calc(100%+8px)] z-50 w-48 rounded-md border border-slate-100 bg-white p-2 shadow-xl transition-all duration-200 ${
                  isUserMenuOpen
                    ? 'visible opacity-100 translate-y-0'
                    : 'invisible opacity-0 -translate-y-2'
                }`}
              >
                <div className='absolute -top-2 right-4 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white'></div>

                <Link
                  to='/profile'
                  onClick={() => setIsUserMenuOpen(false)}
                  className='block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                >
                  Thông tin cá nhân
                </Link>

                <Link
                  to='/orders'
                  onClick={() => setIsUserMenuOpen(false)}
                  className='block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                >
                  Đơn hàng
                </Link>

                <div className='my-1 border-t border-slate-100'></div>

                <button
                  onClick={handleLogout}
                  className='block w-full rounded-md px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-red-600'
                >
                  Đăng xuất
                </button>
              </div>
            </div>
            <NavLink to='/cart'>
              <Button
                size='icon'
                variant='ghost'
                className='rounded-full border border-slate-200'
              >
                <ShoppingBag className='size-4' />
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
