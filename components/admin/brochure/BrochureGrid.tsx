"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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

      await Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal mengambil data brosur.",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = await Swal.fire({
      title: "Hapus Brosur?",
      text: "Data brosur yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await fetch(
        `/api/brochures/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result.message,
          confirmButtonColor: "#ef4444",
        });

        return;
      }

      setBrochures((prev) =>
        prev.filter(
          (brochure) => brochure.id !== id
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: result.message,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal menghapus brosur.",
        confirmButtonColor: "#ef4444",
      });
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