"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import BrochureHeader from "@/components/admin/brochure/BrochureHeader";
import SearchBar from "@/components/admin/brochure/SearchBar";
import BrochureGrid from "@/components/admin/brochure/BrochureGrid";

export default function BrochureCatalogView() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const keyword = searchParams.get("search") ?? "";
    setSearch(keyword);
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <BrochureHeader />

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <BrochureGrid
        search={search}
      />
    </div>
  );
}