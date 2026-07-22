"use client";

interface Package {
  id: number;
  package_name: string;
  speed: string;
  price: number;
  badge: string | null;
  short_description: string | null;
}

interface Props {
  pkg: Package;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PackageCard({
  pkg,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      {pkg.badge && (
        <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
          {pkg.badge}
        </span>
      )}

      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        {pkg.package_name}
      </h2>

      <p className="mt-2 text-gray-500">
        {pkg.speed}
      </p>

      <h3 className="mt-4 text-3xl font-bold text-orange-500">
        Rp {Number(pkg.price).toLocaleString("id-ID")}
      </h3>

      {pkg.short_description && (
        <p className="mt-4 text-gray-600">
          {pkg.short_description}
        </p>
      )}

      <div className="mt-8 flex gap-3">

        <button
          onClick={() => onEdit(pkg.id)}
          className="flex-1 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(pkg.id)}
          className="flex-1 rounded-xl border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          Hapus
        </button>

      </div>

    </div>
  );
}