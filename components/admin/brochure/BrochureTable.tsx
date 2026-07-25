"use client";

import { useEffect, useState } from "react";

import BrochureRow from "./BrochureRow";
import EmptyState from "./EmptyState";
import BrochureCard from "./BrochureCard";

interface Brochure {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
  created_at: string;
}

interface BrochureTableProps {
  search: string;
}

export default function BrochureTable({
  search,
}: BrochureTableProps) {
  const [brochures, setBrochures] =
    useState<Brochure[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBrochures(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  async function fetchBrochures(
    keyword: string = ""
  ) {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/brochures?search=${encodeURIComponent(
          keyword
        )}`
      );

      const result = await response.json();

      if (result.success) {
        setBrochures(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus brosur ini?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/brochures/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);

      setBrochures((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!brochures.length) {
    return (
      <div className="rounded-2xl bg-white">
        <EmptyState />
      </div>
    );
  }

 return (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

    {brochures.map((brochure) => (

      <BrochureCard
        key={brochure.id}
        brochure={brochure}
        onDelete={handleDelete}
      />

    ))}

  </div>
);
}