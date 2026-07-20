import {
  FileText,
  Eye,
  Users,
  CheckCircle,
} from "lucide-react";

import StatisticCard from "./StatisticCard";

export default function StatisticsSection() {
  return (
    <div className="mb-8 grid grid-cols-4 gap-6">

      <StatisticCard
        title="Total Brosur"
        value="128"
        icon={<FileText size={28} />}
      />

      <StatisticCard
        title="Total View"
        value="18.540"
        icon={<Eye size={28} />}
      />

      <StatisticCard
        title="Visitors"
        value="5.231"
        icon={<Users size={28} />}
      />

      <StatisticCard
        title="Published"
        value="98"
        icon={<CheckCircle size={28} />}
      />

    </div>
  );
}