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

  
        </div>

   

      {/* Kanan */}

      <div className="flex items-center gap-5">

       

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