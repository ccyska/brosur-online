"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();

  const isLoginPage =
    pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F2]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}