import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Package } from "lucide-react";

interface BrochureRowProps {
  brochure: {
    id: number;
    title: string;
    image: string;
    short_description: string | null;
    created_at: string;
  };

  onDelete: (id: number) => void;
}

export default function BrochureRow({
  brochure,
  onDelete,
}: BrochureRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="px-6 py-4">
        <div className="relative h-16 w-24 overflow-hidden rounded-lg border">

          <Image
            src={`/uploads/${brochure.image}`}
            alt={brochure.title}
            fill
            className="object-cover"
          />

        </div>
      </td>

      <td className="font-medium">
        {brochure.title}
      </td>

      <td className="max-w-xs">
        <p className="line-clamp-2 text-sm text-gray-600">
          {brochure.short_description ??
            "-"}
        </p>
      </td>

      <td>

        <Link
          href={`/admin/brochures/${brochure.id}/packages`}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Package size={16} />
          Kelola Paket
        </Link>

      </td>

      <td>

        <div className="flex gap-3">

          <Link
            href={`/admin/brochures/edit/${brochure.id}`}
            className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={() =>
              onDelete(brochure.id)
            }
            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}