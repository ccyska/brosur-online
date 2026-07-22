import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

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
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#181818] p-6 shadow-lg transition duration-300 hover:border-orange-500">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-md">
          {icon}
        </div>

      </div>

      <div className="mt-6 flex items-center gap-2">

        <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-green-400">

          <TrendingUp size={14} />

          <span className="text-xs font-medium">
            +12%
          </span>

        </div>

        <span className="text-xs text-gray-500">
          dibanding minggu lalu
        </span>

      </div>

    </div>
  );
}