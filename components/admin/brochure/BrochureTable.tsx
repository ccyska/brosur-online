"use client";

import { useEffect, useState } from "react";

import BrochureRow from "./BrochureRow";
import EmptyState from "./EmptyState";

interface Brochure {
  id: number;
  title: string;
  image: string;
  price: number | null;
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

      setBrochures(result.data);
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

    if (!confirmDelete) {
      return;
    }

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
          (brochure) =>
            brochure.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        Loading...
      </div>
    );
  }

  if (brochures.length === 0) {
    return (
      <div className="rounded-2xl bg-white">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Image
            </th>

            <th className="text-left">
              Title
            </th>

            <th className="text-left">
              Price
            </th>

            <th className="text-left">
              Created
            </th>

            <th className="text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {brochures.map((brochure) => (
            <BrochureRow
              key={brochure.id}
              brochure={brochure}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}