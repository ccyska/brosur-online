"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/helper";

interface Brochure {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number | null;
  short_description: string | null;
  description: string | null;
}

export default function BrochureDetailView() {
  const { slug } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [brochure, setBrochure] = useState<Brochure | null>(null);

  useEffect(() => {
    fetchBrochure();
  }, []);

  async function fetchBrochure() {
    try {
      const response = await fetch(
        `/api/brochures/slug/${slug}`
      );

      const result = await response.json();

      if (!result.success) {
        router.replace("/brochures");
        return;
      }

      setBrochure(result.data);
    } catch (error) {
      console.error(error);
      router.replace("/brochures");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
          <p className="text-sm text-gray-400">Memuat brosur...</p>
        </div>
      </div>
    );
  }

  if (!brochure) return null;

  // Split description into lines for the feature list,
  // falling back to an empty array so the section is simply hidden.
  const descriptionLines = brochure.description
    ? brochure.description
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* ── Top bar ── */}
      <header className="flex items-center gap-2 px-5 py-4 bg-[#faf9f7]">
        <Link
          href="/brochures"
          className="flex items-center gap-1.5 text-sm font-medium text-[#8a6a2a] hover:text-orange-600 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke Brosur
        </Link>
      </header>

      <div className="mx-auto max-w-[480px] pb-16 md:max-w-[1200px]">

        {/* ── Hero image ── */}
        <div className="relative w-full overflow-hidden bg-gray-200"
          style={{ aspectRatio: "4/3" }}
        >
          {brochure.image ? (
            <Image
              src={`/uploads/${brochure.image}`}
              alt={brochure.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <span className="text-sm text-gray-400">No Image</span>
            </div>
          )}
        </div>

        <div className="px-5 md:px-0 md:flex md:gap-10 md:items-start md:mt-10">

          {/* ── Left column: title block ── */}
          <div className="md:flex-1">

            {/* Series label */}
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-orange-500 md:mt-0">
              {brochure.short_description
                ? brochure.short_description.split(" ").slice(0, 3).join(" ") + " Series"
                : "Detail Brosur"}
            </p>

            {/* Title */}
            <h1 className="mt-1 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              {brochure.title}
            </h1>

            {/* Short description */}
            {brochure.short_description && (
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {brochure.short_description}
              </p>
            )}

          </div>

          {/* ── Right column: package card ── */}
          <div className="md:w-[360px]">

            {/* Section heading */}
            <h2 className="mt-8 mb-4 text-base font-bold text-gray-900 md:mt-0">
              Informasi Paket
            </h2>

            {/* Single package card */}
            <div className="relative rounded-2xl border-2 border-orange-400 bg-white p-5 shadow-sm">

              {/* Popular badge */}
              <div className="absolute -top-3 right-4 rounded-full bg-[#8a6a2a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Tersedia
              </div>

              {/* Tier label */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                Paket
              </p>

              {/* Package name */}
              <p className="mt-0.5 text-base font-bold text-gray-900">
                {brochure.title}
              </p>

              {/* Price */}
              <p className="mt-3 text-3xl font-extrabold text-orange-500">
                {formatRupiah(brochure.price)}
              </p>

              {/* Feature lines from description */}
              {descriptionLines.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {descriptionLines.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-orange-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA button */}
              <button
                type="button"
                className="mt-6 w-full rounded-xl border border-[#8a6a2a] py-3 text-sm font-bold uppercase tracking-widest text-[#8a6a2a] transition-colors hover:bg-[#8a6a2a] hover:text-white"
              >
                Lihat Detail
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
