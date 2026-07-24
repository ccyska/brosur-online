import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import StatisticsSection from "@/components/admin/dashboard/StatisticsSection";
import WeeklyPerformanceChart from "@/components/admin/dashboard/WeeklyPerformanceChart";
import PopularBrochure from "@/components/admin/dashboard/PopularBrochure";
import RecentActivity from "@/components/admin/dashboard/RecentActivity";
import WelcomeCard from "@/components/admin/dashboard/WelcomeCard";
import LatestVisitor from "@/components/admin/dashboard/LatestVisitor";

export default function DashboardView() {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <StatisticsSection />

      <div className="grid grid-cols-3 gap-8">

        <div className="col-span-2">
          <WeeklyPerformanceChart />
        </div>

        <WelcomeCard />

      </div>

      <div className="grid grid-cols-3 gap-8">

        <div className="col-span-2">
          <PopularBrochure />
        </div>

        <div className="space-y-8">

          <RecentActivity />

          <LatestVisitor />

        </div>

      </div>

    </div>
  );
}