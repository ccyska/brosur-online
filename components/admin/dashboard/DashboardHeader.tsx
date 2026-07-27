"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Brochure {
  id: number;
  title: string;
  image: string;
}

export default function DashboardHeader() {
  const [keyword, setKeyword] = useState("");
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBrochures();
    }, 300);

    return () => clearTimeout(timeout);
  }, [keyword]);

  async function fetchBrochures() {
    if (!keyword.trim()) {
      setBrochures([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/brochures?search=${encodeURIComponent(keyword)}`
      );

      const result = await response.json();

      if (result.success) {
        setBrochures(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-10 flex items-start justify-between">

      <div>
        <h1 className="text-5xl font-bold text-[#1F1F1F]">
          Dashboard
        </h1>

        <p className="mt-2 text-lg text-[#8E95A9]">
          Welcome back, Admin 👋
        </p>
      </div>

      <div className="relative w-[340px]">

        <div className="flex h-14 items-center rounded-2xl border border-[#ECECEC] bg-white px-5 shadow-sm">

          <Search
            size={20}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search brochure..."
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            className="ml-3 w-full bg-transparent text-[15px] text-[#1E1E1E] outline-none placeholder:text-[#B0B0B0]"
          />

        </div>

        {keyword && (
          <div className="absolute top-16 z-50 max-h-96 w-full overflow-y-auto rounded-2xl border border-[#ECECEC] bg-white shadow-xl">

            {loading && (
              <p className="p-4 text-center text-gray-500">
                Loading...
              </p>
            )}

            {!loading && brochures.length === 0 && (
              <p className="p-4 text-center text-gray-500">
                Brosur tidak ditemukan.
              </p>
            )}

            {!loading &&
              brochures.map((brochure) => (
                <Link
                  key={brochure.id}
                  href={`/admin/brochures/edit/${brochure.id}`}
                  className="flex items-center gap-4 border-b border-gray-100 p-4 transition hover:bg-gray-50"
                >

                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border">

                    <Image
                      src={`/uploads/${brochure.image}`}
                      alt={brochure.title}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-[#1E1E1E]">
                      {brochure.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Klik untuk melihat brosur
                    </p>

                  </div>

                </Link>
              ))}

          </div>
        )}

      </div>

    </div>
  );
}