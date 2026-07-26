"use client";

import { FormEvent, useEffect, useState } from "react";

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
    }
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!speed || !price) {
      alert("Kecepatan dan harga wajib diisi.");
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
          method: packageId
            ? "PUT"
            : "POST",
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
        alert(result.message);
        return;
      }

      alert(result.message);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
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