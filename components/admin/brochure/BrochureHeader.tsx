import Link from "next/link";
import { Plus } from "lucide-react";

export default function BrochureHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[#1E1E1E]">
          Brochure Catalog
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola seluruh brosur yang tersedia
        </p>
      </div>

      <Link
        href="/admin/brochures/create"
        className="flex items-center gap-2 rounded-xl bg-[#FF8A00] px-5 py-3 font-medium text-white transition hover:bg-[#e67a00]"
      >
        <Plus size={20} />
        Add Brochure
      </Link>
    </div>
  );
}