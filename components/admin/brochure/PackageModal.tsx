"use client";

import PackageForm from "./PackageForm";

interface Props {
  open: boolean;
  onClose: () => void;
  brochureId: number;
  packageId: number | null;
}

export default function PackageModal({
  open,
  onClose,
  brochureId,
  packageId,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-bold">
            {packageId
              ? "Edit Paket"
              : "Tambah Paket"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <PackageForm
            brochureId={brochureId}
            packageId={packageId}
            onClose={onClose}
          />

        </div>

      </div>

    </div>
  );
}