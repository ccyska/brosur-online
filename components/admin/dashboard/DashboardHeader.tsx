import { Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-10 flex items-start justify-between">

      <div>

        <h1 className="text-5xl font-bold text-[#1F1F1F]">
          Dashboard
        </h1>

        <p className="mt-2 text-lg text-[#8E95A9]">
          Welcome back, Admin 👋
        </p>

      </div>

      <div className="flex h-14 w-[340px] items-center rounded-2xl border border-[#ECECEC] bg-white px-5 shadow-sm">

        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="ml-3 w-full bg-transparent text-[15px] text-[#1E1E1E] outline-none placeholder:text-[#B0B0B0]"
        />

      </div>

    </div>
  );
}