"use client";

import { useState } from "react";

import BrochureHeader from "@/components/admin/brochure/BrochureHeader";
import SearchBar from "@/components/admin/brochure/SearchBar";
import BrochureTable from "@/components/admin/brochure/BrochureTable";

export default function BrochureCatalogView() {
  const [search, setSearch] =
    useState("");

  return (
    <>
      <BrochureHeader />

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <BrochureTable
        search={search}
      />
    </>
  );
}