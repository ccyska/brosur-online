"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  BookOpen,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Brochure Catalog",
      href: "/admin/brochures",
      icon: FileText,
    },
  ];

  return (
    <aside className="flex h-screen w-[280px] flex-col justify-between border-r border-gray-200 bg-white px-6 py-8">

      {/* Logo */}
      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 text-white shadow-lg">
            <BookOpen size={28} />
          </div>

          <div>

            <h1 className="text-xl font-bold text-[#6B4E16]">
              E-Brosur Admin
            </h1>

            <p className="text-xs leading-5 text-gray-500">
              ISP Infrastructure
              <br />
              Brochure Management
            </p>

          </div>

        </div>

        {/* Menu */}

        <nav className="mt-12 space-y-3">

          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  active
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                <Icon size={22} />

                {menu.name}
              </Link>
            );
          })}

        </nav>

      </div>

      {/* Bottom */}

      <div>

        <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-200 p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 font-bold text-white">
            A
          </div>

          <div>

            <p className="font-semibold text-[#6B4E16]">
              ISP Admin
            </p>

            <span className="text-sm text-gray-500">
              Administrator
            </span>

          </div>

        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 font-medium text-red-500 transition hover:bg-red-50">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}