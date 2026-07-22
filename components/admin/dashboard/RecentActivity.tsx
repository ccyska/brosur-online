"use client";

import { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";

interface RecentActivity {
  id: number;
  title: string;
  created_at: string;
}

export default function RecentActivity() {
  const [activities, setActivities] =
    useState<RecentActivity[]>([]);

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  async function fetchRecentActivities() {
    try {
      const response = await fetch(
        "/api/dashboard"
      );

      const result = await response.json();

      if (result.success) {
        setActivities(
          result.data.recentActivities
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              title={activity.title}
              createdAt={activity.created_at}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            Belum ada aktivitas.
          </p>
        )}

      </div>

    </div>
  );
}