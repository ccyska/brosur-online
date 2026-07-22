interface Package {
  id: number;
  package_name: string;
  speed: string;
  price: number;
  badge: string | null;
  short_description: string | null;
}

interface PackageCardProps {
  pkg: Package;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PackageCard({
  pkg,
  onEdit,
  onDelete,
}: PackageCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">

      {pkg.badge && (
        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
          {pkg.badge}
        </span>
      )}

      <div>
        <h3 className="text-lg font-bold text-gray-800">
          {pkg.package_name}
        </h3>

        <p className="text-sm text-gray-500">
          {pkg.speed}
        </p>
      </div>

      <p className="text-xl font-bold text-orange-500">
        Rp {pkg.price.toLocaleString("id-ID")}
      </p>

      {pkg.short_description && (
        <p className="text-sm text-gray-600">
          {pkg.short_description}
        </p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onEdit(pkg.id)}
          className="flex-1 rounded-xl border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-50"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(pkg.id)}
          className="flex-1 rounded-xl border border-red-400 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>

    </div>
  );
}
