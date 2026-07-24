"use client";

import { useEffect, useState } from "react";

interface PopularBrochure {
  id: number;
  title: string;
  image?: string;
  total_view: number;
}

export default function PopularBrochure() {
  const [brochures, setBrochures] = useState<PopularBrochure[]>([]);

  useEffect(() => {
    fetchPopularBrochures();
  }, []);

  async function fetchPopularBrochures() {
    try {
      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const result = await response.json();

      if (result.success) {
        console.log(result.data.popularBrochures);
        setBrochures(result.data.popularBrochures);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-[28px] border border-[#ECECEC] bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-[34px] font-bold text-[#1E1E1E]">
        Popular Brochures
      </h2>

      <div className="space-y-5">
        {brochures.length > 0 ? (
          brochures.map((brochure, index) => (
            <div
              key={brochure.id}
              className="flex items-center justify-between rounded-2xl border border-[#EFEFEF] p-5 transition hover:bg-[#FAFAFA]"
            >
              <div className="flex items-center gap-5">
                <img
                  src={
                    brochure.image
                      ? `/uploads/${brochure.image}`
                      : "/uploads/paketwifi.jpeg"
                  }
                  alt={brochure.title}
                  className="h-20 w-20 rounded-2xl border border-gray-200 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/uploads/paketwifi.jpeg";
                  }}
                />

                <div>
                  <h3 className="text-xl font-semibold text-[#222]">
                    {brochure.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {brochure.total_view.toLocaleString("id-ID")} Views
                  </p>
                </div>
              </div>

              <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
                #{index + 1}
              </div>
              
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-gray-500">
            Belum ada data.
          </p>
        )}

      </div>

    </div>
  );
}