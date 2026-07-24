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
    <div className="group rounded-[24px] border border-[#ECECEC] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">

      <div className="mb-5 flex items-center justify-between">


        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4E8] text-[#F59E0B]">

          {icon}

        </div>

      </div>

      <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-[#666666]">
        {title}
      </p>

      <h2 className="mt-2 text-[48px] font-bold leading-none text-[#171717]">
        {value}
      </h2>

      <div className="mt-8 flex items-end gap-1">

        <div className="h-2 w-4 rounded bg-[#FFF3D9]" />
        <div className="h-3 w-4 rounded bg-[#FFE7B0]" />
        <div className="h-4 w-4 rounded bg-[#FFD680]" />
        <div className="h-5 w-4 rounded bg-[#FFC54D]" />
        <div className="h-7 w-4 rounded bg-[#F59E0B]" />

      </div>

    </div>
  );
}