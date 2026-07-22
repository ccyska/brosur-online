"use client";

import { useEffect, useState } from "react";

interface PackageModalProps {
  open: boolean;
  onClose: () => void;
  brochureId: number;
  packageId: number | null;
}

interface FormState {
  package_name: string;
  speed: string;
  price: string;
  badge: string;
  short_description: string;
  description: string;
}

const EMPTY_FORM: FormState = {
  package_name: "",
  speed: "",
  price: "",
  badge: "",
  short_description: "",
  description: "",
};

export default function PackageModal({
  open,
  onClose,
  brochureId,
  packageId,
}: PackageModalProps) {
  const isEditMode = packageId !== null;

  const [form, setForm] =
    useState<FormState>(EMPTY_FORM);
  const [loadingData, setLoadingData] =
    useState(false);
  const [submitting, setSubmitting] =
    useState(false);

  // Reset form and fetch existing data when modal opens
  useEffect(() => {
    if (!open) return;

    setForm(EMPTY_FORM);

    if (isEditMode) {
      fetchPackage();
    }
  }, [open, packageId]);

  async function fetchPackage() {
    try {
      setLoadingData(true);

      const response = await fetch(
        `/api/packages/${packageId}`
      );
      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        onClose();
        return;
      }

      const data = result.data;

      setForm({
        package_name: data.package_name ?? "",
        speed: data.speed ?? "",
        price: data.price != null ? String(data.price) : "",
        badge: data.badge ?? "",
        short_description: data.short_description ?? "",
        description: data.description ?? "",
      });
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memuat data paket.");
      onClose();
    } finally {
      setLoadingData(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!form.package_name.trim()) {
      alert("Nama paket wajib diisi.");
      return;
    }
    if (!form.speed.trim()) {
      alert("Kecepatan wajib diisi.");
      return;
    }
    if (form.price === "" || isNaN(Number(form.price))) {
      alert("Harga wajib diisi dengan angka.");
      return;
    }

    try {
      setSubmitting(true);

      const body = {
        brochure_id: brochureId,
        package_name: form.package_name,
        speed: form.speed,
        price: Number(form.price),
        badge: form.badge || null,
        short_description: form.short_description || null,
        description: form.description || null,
      };

      const url = isEditMode
        ? `/api/packages/${packageId}`
        : "/api/packages";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan pada server.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-800">
            {isEditMode ? "Edit Paket" : "Tambah Paket"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {loadingData ? (
            <p className="py-8 text-center text-sm text-gray-500">
              Memuat data...
            </p>
          ) : (
            <form
              id="package-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* package_name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Nama Paket <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="package_name"
                  placeholder="Contoh: Paket Rumahan 20 Mbps"
                  value={form.package_name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />
              </div>

              {/* speed */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Kecepatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="speed"
                  placeholder="Contoh: 20 Mbps"
                  value={form.speed}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />
              </div>

              {/* price */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Harga <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Contoh: 150000"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />
              </div>

              {/* badge */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Badge
                </label>
                <input
                  type="text"
                  name="badge"
                  placeholder="Contoh: Terlaris, Rekomendasi"
                  value={form.badge}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />
              </div>

              {/* short_description */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Deskripsi Singkat
                </label>
                <input
                  type="text"
                  name="short_description"
                  placeholder="Ringkasan singkat paket"
                  value={form.short_description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />
              </div>

              {/* description */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Deskripsi lengkap paket"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
                />
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        {!loadingData && (
          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              form="package-form"
              disabled={submitting}
              className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {submitting
                ? "Menyimpan..."
                : isEditMode
                ? "Update Paket"
                : "Simpan Paket"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
