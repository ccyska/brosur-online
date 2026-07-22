"use client";

import { useEffect, useState } from "react";

interface PopularBrochure {
  id: number;
  title: string;
  total_view: number;
}

export default function PopularBrochure() {
  const [brochures, setBrochures] = useState<
    PopularBrochure[]
  >([]);

  useEffect(() => {
    fetchPopularBrochures();
  }, []);

  async function fetchPopularBrochures() {
    try {
      const response = await fetch(
        "/api/dashboard"
      );

      const result = await response.json();

      if (result.success) {
        setBrochures(
          result.data.popularBrochures
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Popular Brochures
      </h2>

      <div className="space-y-4">

        {brochures.length > 0 ? (
          brochures.map((brochure, index) => (
            <div
              key={brochure.id}
              className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 hover:bg-gray-50"
            >
              <div>

                <p className="font-semibold text-gray-800">
                  {index + 1}. {brochure.title}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {brochure.total_view.toLocaleString(
                    "id-ID"
                  )} Views
                </p>

              </div>

              <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                #{index + 1}
              </div>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Belum ada data.
          </p>
        )}

      </div>

    </div>
  );
}