import { ReactNode } from "react";

interface StatisticCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function StatisticCard({
  title,
  value,
  icon,
}: StatisticCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
        {icon}
      </div>

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}