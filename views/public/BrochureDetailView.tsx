"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Package {
  id: number;
  package_name: string;
  speed: string;
  price: number;
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
      <div className="flex min-h-screen items-center justify-center">
        Loading...
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
    <main className="min-h-screen bg-[#F5F5F5]">
      <div className="mx-auto max-w-md bg-white">

        {/* Banner Brosur */}
        <div className="w-full">
          <Image
            src={`/uploads/${brochure.image}`}
            alt={brochure.title}
            width={800}
            height={1200}
            priority
            className="h-auto w-full"
          />
        </div>

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

            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                {pkg.badge && (
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    {pkg.badge}
                  </span>
                )}

                <h2 className="mt-3 text-xl font-bold">
                  {pkg.package_name}
                </h2>

                <p className="mt-2 text-3xl font-bold text-orange-500">
                  Rp{" "}
                  {pkg.price.toLocaleString("id-ID")}
                </p>

                {pkg.short_description && (
                  <p className="mt-3 text-sm text-gray-600">
                    {pkg.short_description}
                  </p>
                )}
              </div>
            ))}

          </div>

        </div>

      </div>
    </main>
  );
}