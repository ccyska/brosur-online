import { Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-10 flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome back, Admin 👋
        </p>

      </div>

      <div className="relative w-[360px]">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="h-12 w-full rounded-2xl border border-[#2F2F2F] bg-[#181818] pl-12 pr-4 text-sm text-white outline-none transition focus:border-orange-500"
        />

      </div>

    </div>
  );
}