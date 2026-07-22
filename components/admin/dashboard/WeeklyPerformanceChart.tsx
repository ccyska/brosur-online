"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface WeeklyPerformance {
  day: string;
  total: number;
}

export default function WeeklyPerformanceChart() {
  const [data, setData] = useState<
    WeeklyPerformance[]
  >([]);

  useEffect(() => {
    fetchChart();
  }, []);

  async function fetchChart() {
    try {
      const response = await fetch(
        "/api/dashboard"
      );

      const result = await response.json();

      if (result.success) {
        const chartData =
          result.data.weeklyPerformance.map(
            (item: WeeklyPerformance) => ({
              ...item,
              day: new Date(item.day).toLocaleDateString(
                "id-ID",
                {
                  weekday: "short",
                }
              ),
            })
          );

        setData(chartData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Weekly Performance
        </h2>

        <p className="text-sm text-gray-500">
          Jumlah pengunjung selama 7 hari terakhir
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#FF8A00"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#FF8A00",
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}