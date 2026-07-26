"use client";

import { useEffect, useState } from "react";

import PackageCard, { Package } from "./PackageCard";
import PackageModal from "./PackageModal";

interface Props {
  brochureId: number;
}

export default function PackageSection({
  brochureId,
}: Props) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, [brochureId]);

  async function fetchPackages() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/packages?brochureId=${brochureId}`
      );

      const result = await response.json();

      if (result.success) {
        setPackages(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(id: number) {
    console.log("Edit Package:", id);
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Hapus paket ini?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/packages/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      fetchPackages();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        Loading package...
      </section>
    );
  }

  return (
    <>
      <section className="rounded-2xl bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Package
            </h2>

            <p className="text-gray-500">
              Kelola paket untuk brosur ini
            </p>

          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            + Tambah Package
          </button>

        </div>

        {packages.length === 0 ? (

          <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
            Belum ada paket.
          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2">

            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}

          </div>

        )}

      </section>

      <PackageModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchPackages();
        }}
        brochureId={brochureId}
      />
    </>
  );
}