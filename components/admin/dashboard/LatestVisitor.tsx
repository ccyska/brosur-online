"use client";

import { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";

interface LatestVisitor {
  id: number;
  brochure_title: string;
  viewed_at: string;
}

export default function LatestVisitor() {
  const [visitors, setVisitors] = useState<
    LatestVisitor[]
  >([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  async function fetchVisitors() {
    try {
      const response = await fetch("/api/dashboard");

      const result = await response.json();

      if (result.success) {
        setVisitors(result.data.latestVisitors);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Latest Visitors
      </h2>

      <div className="space-y-5">

        {visitors.length > 0 ? (
          visitors.map((visitor) => (
            <div
              key={visitor.id}
              className="flex items-center gap-4"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <UserCircle2
                  className="text-orange-500"
                  size={28}
                />
              </div>

              <div>

                <p className="font-semibold text-gray-800">
                  {visitor.brochure_title}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    visitor.viewed_at
                  ).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

              </div>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Belum ada data visitor.
          </p>
        )}

      </div>

    </div>
  );
}