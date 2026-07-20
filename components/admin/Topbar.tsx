"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">

      {/* Kiri */}

      <div className="flex items-center gap-6">

        {/* Logo */}

        <div>
          <h1 className="text-2xl font-bold text-[#6B4E16]">
            Naratel
          </h1>
          
        </div>

        {/* Search */}

        <div className="relative ml-6">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="h-11 w-[340px] rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none transition focus:border-orange-400 focus:bg-white"
          />

        </div>

      </div>

      {/* Kanan */}

      <div className="flex items-center gap-5">

        {/* Notification */}

        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 transition hover:bg-orange-100">

          <Bell size={20} />

          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Admin */}

        <div className="flex items-center gap-3">

          <div className="text-right">

            <p className="font-semibold text-[#6B4E16]">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Admin Naratel
            </p>

          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 font-bold text-white shadow">
            A
          </div>

        </div>

      </div>

    </header>
  );
}