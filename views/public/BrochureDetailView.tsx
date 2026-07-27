"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Package {
  id: number;
  package_name: string;
  speed: string;
  price: number | string;
  badge: string | null;
  short_description: string | null;
}

interface Brochure {
  id: number;
  title: string;
  image: string;
  short_description: string | null;
  description: string | null;
}

interface Props {
  slug: string;
}

export default function BrochureDetailView({
  slug,
}: Props) {
  const [loading, setLoading] = useState(true);

  const [brochure, setBrochure] =
    useState<Brochure | null>(null);

  const [packages, setPackages] =
    useState<Package[]>([]);

  useEffect(() => {
    fetchData();
  }, [slug]);

  async function fetchData() {
    try {
      const response = await fetch(
        `/api/brochures/slug/${slug}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!result.success) {
        setLoading(false);
        return;
      }

      setBrochure(result.data.brochure);
      setPackages(result.data.packages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
      <div className="rounded-3xl bg-white px-10 py-8 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 animate-spin rounded-full border-[5px] border-orange-200 border-t-orange-500"></div>

          <h2 className="text-lg font-semibold text-gray-700">
            Memuat Brosur
          </h2>

          <p className="text-sm text-gray-500">
            Mohon tunggu sebentar...
          </p>
        </div>
      </div>
    </div>
  );
}

  if (!brochure) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Brosur tidak ditemukan.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-6">
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow">

        <Image
          src={`/uploads/${brochure.image}`}
          alt={brochure.title}
          width={800}
          height={1200}
          priority
          className="w-full"
        />

        <div className="p-6">

          <h1 className="text-3xl font-bold">
            {brochure.title}
          </h1>

          {brochure.short_description && (
            <p className="mt-3 text-gray-600">
              {brochure.short_description}
            </p>
          )}

          {brochure.description && (
            <p className="mt-4 whitespace-pre-line text-gray-700">
              {brochure.description}
            </p>
          )}

          <div className="mt-8 space-y-4">

            {packages.length === 0 ? (
              <div className="rounded-xl border border-dashed p-6 text-center text-gray-500">
                Belum ada paket.
              </div>
            ) : (
              packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  {pkg.badge && (
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      {pkg.badge}
                    </span>
                  )}

                  <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    {pkg.package_name}
                  </h2>

                  <p className="mt-3 text-3xl font-bold text-orange-500">
                    Rp{" "}
                    {Number(pkg.price)
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </p>

                  {pkg.short_description && (
                    <p className="mt-3 text-sm text-gray-600">
                      {pkg.short_description}
                    </p>
                  )}
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </main>
  );
}