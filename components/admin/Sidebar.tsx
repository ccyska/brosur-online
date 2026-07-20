"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Brochure Catalog",
      href: "/admin/brochures",
      icon: FileText,
    },
  ];

  return (
    <aside className="flex h-screen w-[290px] flex-col justify-between bg-[#111111] px-7 py-8 text-white">

      {/* Logo */}
      <div>

        <div className="mb-14">

          <h1 className="text-3xl font-bold tracking-wide">
            Naratel
          </h1>
        </div>

        {/* Menu */}

        <nav className="space-y-3">

          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
                  active
                    ? "bg-[#FF8C00] text-white shadow-lg"
                    : "text-gray-400 hover:bg-[#1B1B1B] hover:text-white"
                }`}
              >
                <Icon size={22} />

                <span className="text-[15px] font-medium">
                  {menu.title}
                </span>
              </Link>
            );
          })}

        </nav>

      </div>

      {/* Bottom */}

      <div>

        <div className="mb-5 flex items-center gap-4 rounded-2xl bg-[#1A1A1A] p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF8C00] font-bold">
            A
          </div>

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-400">
              Admin Naratel
            </p>

          </div>

        </div>

        <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#2D2D2D] py-4 text-gray-300 transition hover:bg-red-500 hover:text-white">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}