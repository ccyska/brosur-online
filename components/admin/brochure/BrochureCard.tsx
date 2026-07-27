"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Package } from "lucide-react";

interface Props {
  brochure: {
    id: number;
    title: string;
    slug: string;
    image: string;
    short_description: string | null;
  };

  onDelete?: (id: number) => void;
}



export default function BrochureCard({
  brochure,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      <div className="relative h-56 w-full">

        <Image
          src={`/uploads/${brochure.image}`}
          alt={brochure.title}
          fill
          className="object-cover"
        />

      </div>

      <div className="space-y-5 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            {brochure.title}
          </h2>

          <p className="mt-2 text-gray-500">
            {brochure.short_description ??
              "Tidak ada deskripsi."}
          </p>

        </div>

        <div className="space-y-3">

          <Link
            href={`/admin/brochures/${brochure.id}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#F5A000]  py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Package size={18} />
            Kelola Paket
          </Link>

          <div className="grid grid-cols-2 gap-3">

            <Link
              href={`/admin/brochures/edit/${brochure.id}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-500 py-3 font-semibold text-blue-500 transition hover:bg-blue-500 hover:text-white"
            >
              <Pencil size={18} />
              Edit
            </Link>

           <button
  onClick={() => onDelete?.(brochure.id)}
  className="flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
>
  <Trash2 size={18} />
  Hapus
</button>

          </div>

        </div>

      </div>

    </div>
  );
}