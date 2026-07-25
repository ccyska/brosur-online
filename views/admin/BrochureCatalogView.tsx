"use client";

import { useState } from "react";

import BrochureHeader from "@/components/admin/brochure/BrochureHeader";
import SearchBar from "@/components/admin/brochure/SearchBar";
import BrochureGrid from "@/components/admin/brochure/BrochureGrid";

export default function BrochureCatalogView() {
  const [search, setSearch] = useState("");

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