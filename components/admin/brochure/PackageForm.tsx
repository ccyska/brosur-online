"use client";

import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
  brochureId: number;
  packageId: number | null;
  onClose: () => void;
}

export default function PackageForm({
  brochureId,
  packageId,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [speed, setSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");

  useEffect(() => {
    if (packageId) {
      fetchPackage();
    }
  }, [packageId]);

  async function fetchPackage() {
    try {
      const response = await fetch(
        `/api/packages/${packageId}`
      );

      const result = await response.json();

      if (!result.success) return;

      const data = result.data;

      setSpeed(String(data.speed));
      setPrice(String(data.price));
      setBadge(data.badge ?? "");
      setShortDescription(
        data.short_description ?? ""
      );
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengambil data paket.",
        confirmButtonColor: "#f97316",
      });
    }
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!speed || !price) {
      await Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Kecepatan dan harga wajib diisi.",
        confirmButtonColor: "#f97316",
      });

      return;
    }

    try {
      setLoading(true);

      const body = {
        brochure_id: brochureId,
        package_name: `${speed} Mbps`,
        speed,
        price: Number(price),
        badge,
        short_description: shortDescription,
        description: null,
      };

      const response = await fetch(
        packageId
          ? `/api/packages/${packageId}`
          : "/api/packages",
        {
          method: packageId ? "PUT" : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: packageId
            ? "Update Gagal"
            : "Tambah Gagal",
          text: result.message,
          confirmButtonColor: "#ef4444",
        });

        return;
      }

      await Swal.fire({
        icon: "success",
        title: packageId
          ? "Berhasil Diupdate"
          : "Berhasil Ditambahkan",
        text: result.message,
        timer: 1700,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      console.error(error);

      await Swal.fire({
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
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Kecepatan (Mbps)
        </label>

        <input
          type="number"
          value={speed}
          onChange={(e) =>
            setSpeed(e.target.value)
          }
          placeholder="Contoh: 20"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Harga
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="Contoh: 175000"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Badge
        </label>

        <input
          type="text"
          value={badge}
          onChange={(e) =>
            setBadge(e.target.value)
          }
          placeholder="Contoh: Best Seller"
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Deskripsi Singkat
        </label>

        <textarea
          rows={3}
          value={shortDescription}
          onChange={(e) =>
            setShortDescription(
              e.target.value
            )
          }
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
          className="rounded-xl bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : packageId
            ? "Update"
            : "Simpan"}
        </button>
      </div>
    </form>
  );
}