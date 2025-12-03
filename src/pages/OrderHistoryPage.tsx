import React from 'react';
import { Search, ShoppingCart, User, Package, ChevronRight, Search as SearchIcon } from 'lucide-react';

const orders = [
  {
    id: "3354-9812",
    date: "August 24, 2024",
    status: "Delivered",
    statusColor: "text-green-600",
    total: "$298.00",
    items: [
      { 
        name: "Gradient Graphic T-shirt", 
        size: "Large",
        price: "$145",
        image: "https://placehold.co/120x120/F0EEED/1A1A1A?text=T-Shirt" 
      },
      { 
        name: "Skinny Fit Jeans", 
        size: "Large",
        price: "$240",
        image: "https://placehold.co/120x120/F0EEED/1A1A1A?text=Jeans" 
      }
    ]
  },
  {
    id: "3354-9921",
    date: "August 15, 2024",
    status: "Processing",
    statusColor: "text-amber-600",
    total: "$180.00",
    items: [
      { 
        name: "Checkered Shirt", 
        size: "Medium",
        price: "$180",
        image: "https://placehold.co/120x120/F0EEED/1A1A1A?text=Shirt" 
      }
    ]
  }
];

export const OrderHistoryPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-black">
      {/* --- Navbar (Matches Image) --- */}
      <nav className="w-full border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 flex items-center gap-8">
          {/* Logo */}
          <a href="#" className="text-3xl font-black tracking-tighter uppercase shrink-0">
            SHOP.CO
          </a>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-base font-normal text-slate-800">
            <a href="#" className="hover:text-black hover:font-medium transition-all">Shop</a>
            <a href="#" className="hover:text-black hover:font-medium transition-all">On Sale</a>
            <a href="#" className="hover:text-black hover:font-medium transition-all">New Arrivals</a>
            <a href="#" className="hover:text-black hover:font-medium transition-all">Brands</a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 hidden md:flex">
            <div className="w-full max-w-[600px] bg-[#F0F0F0] rounded-full px-4 py-3 flex items-center gap-3">
              <SearchIcon className="text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="bg-transparent border-none outline-none text-slate-600 placeholder:text-slate-400 w-full text-sm"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-[1240px] mx-auto px-4 md:px-8 py-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">Order History</span>
        </div>

        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Order History
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Check the status of recent orders, manage returns, and download invoices.
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-8">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
              {/* Order Header */}
              <div className="bg-[#F9F9F9] px-6 py-4 flex flex-wrap gap-y-4 items-center justify-between border-b border-gray-100">
                <div className="flex gap-8 text-sm md:text-base">
                  <div>
                    <span className="block text-slate-500 text-xs font-bold uppercase mb-1">Order ID</span>
                    <span className="font-bold text-slate-900">#{order.id}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs font-bold uppercase mb-1">Date Placed</span>
                    <span className="font-medium text-slate-700">{order.date}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs font-bold uppercase mb-1">Total Amount</span>
                    <span className="font-black text-slate-900">{order.total}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className={`px-4 py-1.5 rounded-full text-sm font-bold bg-white border border-gray-200 shadow-sm flex items-center gap-2`}>
                      <div className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      <span className={order.statusColor}>{order.status}</span>
                   </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 last:mb-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 rounded-[12px] object-cover bg-[#F0EEED]" 
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-500 mb-1">Size: <span className="text-slate-800 font-medium">{item.size}</span></p>
                      <p className="text-lg font-bold text-slate-900 mt-2">{item.price}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                        <button className="px-6 py-3 rounded-full border border-gray-200 text-black font-medium hover:bg-gray-50 transition-colors text-sm whitespace-nowrap">
                          View Order
                        </button>
                        <button className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-transform active:scale-95 text-sm whitespace-nowrap shadow-md">
                          Buy Again
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- Footer Brand Banner (From Image) --- */}
      <div className="bg-black py-10 w-full mt-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-wrap justify-between items-center gap-8 opacity-80">
          <span className="text-white text-2xl md:text-3xl font-serif tracking-widest uppercase">Versace</span>
          <span className="text-white text-2xl md:text-3xl font-sans font-bold tracking-widest uppercase">Zara</span>
          <span className="text-white text-2xl md:text-3xl font-serif tracking-widest uppercase">Gucci</span>
          <span className="text-white text-2xl md:text-3xl font-bold tracking-widest uppercase">Prada</span>
          <span className="text-white text-2xl md:text-3xl font-sans tracking-widest uppercase">Calvin Klein</span>
        </div>
      </div>
    </div>
  );
};