import { Pencil, Trash2 } from "lucide-react";

export default function BrochureRow() {
  return (
    <tr className="border-b">

      <td className="py-4">
        <div className="h-16 w-20 rounded-lg bg-gray-200"></div>
      </td>

      <td>Paket Internet 100 Mbps</td>

      <td>Rp200.000</td>

      <td>20 Juli 2026</td>

      <td>
        <div className="flex gap-3">

          <button className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <Pencil size={18} />
          </button>

          <button className="rounded-lg bg-red-100 p-2 text-red-600">
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}