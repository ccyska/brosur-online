"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Eye,
  Users,
  CheckCircle,
} from "lucide-react";

import StatisticCard from "./StatisticCard";

interface DashboardStatistics {
  totalBrochures: number;
  totalView: number;
  published: number;
}

export default function StatisticsSection() {
  const [statistics, setStatistics] =
    useState<DashboardStatistics>({
      totalBrochures: 0,
      totalView: 0,
      published: 0,
    });

  useEffect(() => {
    fetchStatistics();
  }, []);

  async function fetchStatistics() {
    try {
      const response = await fetch("/api/dashboard");

      const result = await response.json();

      if (result.success) {
        setStatistics(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mb-8 grid grid-cols-4 gap-6">

      <StatisticCard
        title="Total Brosur"
        value={statistics.totalBrochures.toLocaleString("id-ID")}
        icon={<FileText size={28} />}
      />

      <StatisticCard
        title="Total View"
        value={statistics.totalView.toLocaleString("id-ID")}
        icon={<Eye size={28} />}
      />

      <StatisticCard
        title="Visitors"
        value="-"
        icon={<Users size={28} />}
      />

      <StatisticCard
        title="Published"
        value={statistics.published.toLocaleString("id-ID")}
        icon={<CheckCircle size={28} />}
      />

    </div>
  );
};