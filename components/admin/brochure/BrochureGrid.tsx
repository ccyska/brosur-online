"use client";

import { useEffect, useState } from "react";
import BrochureCard from "./BrochureCard";

interface Brochure {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
}

interface Props {
  search: string;
}

export default function BrochureGrid({
  search,
}: Props) {
  const [brochures, setBrochures] =
    useState<Brochure[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBrochures();
  }, [search]);

  async function fetchBrochures() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/brochures?search=${encodeURIComponent(
          search
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
        prev.filter(
          (brochure) => brochure.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  }

  if (loading) {
    return (
      <p className="py-10 text-center">
        Loading...
      </p>
    );
  }

  if (brochures.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center text-gray-500">
        Belum ada brosur.
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