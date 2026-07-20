"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative mb-6">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Cari brosur..."
        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition focus:border-orange-400"
      />
    </div>
  );
}