import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import WelcomeCard from "@/components/admin/dashboard/WelcomeCard";
import StatisticsSection from "@/components/admin/dashboard/StatisticsSection";
import WeeklyPerformanceChart from "@/components/admin/dashboard/WeeklyPerformanceChart";
import RecentActivity from "@/components/admin/dashboard/RecentActivity";
import PopularBrochure from "@/components/admin/dashboard/PopularBrochure";
import LatestVisitor from "@/components/admin/dashboard/LatestVisitor";

export default function DashboardView() {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <WelcomeCard />

      <StatisticsSection />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        <div className="space-y-8 lg:col-span-2">

          <WeeklyPerformanceChart />

          <RecentActivity />

        </div>

        <div className="space-y-8">

          <PopularBrochure />

          <LatestVisitor />

        </div>

      </div>

    </div>
  );
}