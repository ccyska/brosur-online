import Image from "next/image";
import BrochureService from "@/services/BrochureService";
import PackageSection from "@/components/admin/brochure/PackageSection";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { id } = await params;

  const brochure =
    await BrochureService.getById(Number(id));

  if (!brochure) {
    return (
      <div className="p-8">
        Brosur tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Header Brosur */}
      <div className="overflow-hidden rounded-3xl bg-white shadow">

        <div className="relative h-72 w-full">

          <Image
            src={`/uploads/${brochure.image}`}
            alt={brochure.title}
            fill
            className="object-cover"
          />

        </div>

        <div className="space-y-3 p-8">

          <h1 className="text-3xl font-bold">
            {brochure.title}
          </h1>

          {brochure.short_description && (
            <p className="text-lg text-gray-600">
              {brochure.short_description}
            </p>
          )}

          {brochure.description && (
            <p className="text-gray-500">
              {brochure.description}
            </p>
          )}

        </div>

      </div>

      {/* Daftar Paket */}
      <PackageSection
        brochureId={brochure.id}
      />

    </div>
  );
}