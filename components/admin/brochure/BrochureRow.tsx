import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface BrochureRowProps {
  brochure: {
    id: number;
    title: string;
    image: string;
    price: number | null;
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
        <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-500">
          Image
        </div>
      </td>

      <td>{brochure.title}</td>

      <td>
        {brochure.price !== null
          ? `Rp ${Number(
              brochure.price
            ).toLocaleString("id-ID")}`
          : "-"}
      </td>

      <td>
        {new Date(
          brochure.created_at
        ).toLocaleDateString("id-ID")}
      </td>

      <td>
        <div className="flex gap-3">

          <Link
            href={`/admin/brochures/edit/${brochure.id}`}
            className="rounded-lg bg-blue-100 p-2 text-blue-600"
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={() =>
              onDelete(brochure.id)
            }
            className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}