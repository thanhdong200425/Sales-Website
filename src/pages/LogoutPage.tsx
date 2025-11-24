import React from 'react';
import { LogOut } from 'lucide-react';

export const LogoutPage: React.FC = () => {
  return (
    <div className="w-full max-w-[500px] flex flex-col items-center px-4">
      {/* Logo Area */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
          SHOP.CO
        </h1>
      </div>

      {/* Page Title */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          Are you logging out?
        </h2>
      </div>

      {/* Description Text */}
      <div className="mb-16 text-center px-4">
        <p className="text-slate-700 font-medium leading-loose text-lg">
          You can always log back in at any time. If you just want<br className="hidden sm:block" />
          to switch accounts, you can add another account.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex items-center justify-between gap-4 px-2">
        <button
          className="bg-[#CFD0DE] hover:bg-[#c0c1cf] text-slate-900 font-bold py-4 px-10 rounded-full transition-colors min-w-[140px]"
          onClick={() => console.log('Cancelled')}
        >
          Cancel
        </button>

        <button
          className="bg-[#1A1A1A] hover:bg-black text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-transform active:scale-[0.99] min-w-[140px]"
          onClick={() => console.log('Logging out')}
        >
          Log out
          <LogOut size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
