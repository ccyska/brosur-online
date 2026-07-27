"use client";

import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
  brochureId: number;
  packageId: number | null;
  onClose: () => void;
}

export default function PackageForm({ brochureId, packageId, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  useEffect(() => {
    if (packageId) {
      fetchPackage();
    }
  }, [packageId]);

  async function fetchPackage() {
    try {
      const response = await fetch(`/api/packages/${packageId}`);

      const result = await response.json();

      if (!result.success) return;

      const data = result.data;

      setPackageName(data.package_name ?? "");

      setPrice(Number(data.price).toLocaleString("id-ID"));

      setBadge(data.badge ?? "");

      setShortDescription(data.short_description ?? "");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengambil data paket.",
        confirmButtonColor: "#f97316",
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (packageName.trim() === "" || price.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Nama Paket dan Harga wajib diisi.",
        confirmButtonColor: "#f97316",
      });

      return;
    }

    try {
      setLoading(true);

      const body = {
        brochure_id: brochureId,
        package_name: packageName,
        speed: packageName,
        price: Number(price.replace(/\./g, "")),
        badge: badge.trim() || null,
        short_description: shortDescription.trim() || null,
        description: null,
      };

      const response = await fetch(
        packageId ? `/api/packages/${packageId}` : "/api/packages",
        {
          method: packageId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      const result = await response.json();

      if (!result.success) {
        Swal.fire({
          icon: "error",
          title: packageId ? "Update Gagal" : "Tambah Gagal",
          text: result.message,
          confirmButtonColor: "#ef4444",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: packageId ? "Berhasil Diupdate" : "Berhasil Ditambahkan",
        text: result.message,
        timer: 1500,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Server sedang bermasalah.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">
          Nama Paket
          <span className="text-red-500"> *</span>
        </label>

        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Harga
          <span className="text-red-500"> *</span>
        </label>

        <input
          type="text"
          inputMode="numeric"
          value={price}
          onChange={(e) => {
            const angka = e.target.value.replace(/\D/g, "");

            setPrice(angka.replace(/\B(?=(\d{3})+(?!\d))/g, "."));
          }}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Badge
          <span className="ml-2 text-sm text-gray-400">(Opsional)</span>
        </label>

        <input
          type="text"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Deskripsi Singkat
          <span className="ml-2 text-sm text-gray-400">(Opsional)</span>
        </label>

        <textarea
          rows={3}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border px-5 py-2"
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#F5A000] px-5 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : packageId ? "Update" : "Simpan"}
        </button>
      </div>
    </form>
  );
}
