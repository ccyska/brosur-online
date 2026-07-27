"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
} from "lucide-react";

interface User {
  username: string;
  full_name: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const response = await fetch("/api/auth/me");

      if (!response.ok) return;

      const text = await response.text();

      if (!text.startsWith("{")) return;

      const result = JSON.parse(text);

      if (result.success) {
        setUser(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

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

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-[275px] flex-col justify-between bg-[#111111] px-4 py-5 text-white">

      <div>

        <div className="mb-14">
          <h1 className="text-3xl font-bold">
            E-Brochure Naratel
          </h1>
        </div>

        <nav className="space-y-3">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 ${
                  pathname === menu.href
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:bg-[#1B1B1B]"
                }`}
              >
                <Icon size={22} />
                {menu.title}
              </Link>
            );
          })}
        </nav>

      </div>

      <div>

        <div className="mb-5 flex items-center gap-4 rounded-2xl bg-[#1A1A1A] p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold">
            {user?.username?.charAt(0).toUpperCase() || "A"}
          </div>

          <div>
            <p className="font-semibold">
              {user?.username || "Admin"}
            </p>

            <p className="text-sm text-gray-400">
              {user?.full_name || "Administrator"}
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#2D2D2D] py-4 hover:bg-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}