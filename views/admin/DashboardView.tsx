import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import WelcomeCard from "@/components/admin/dashboard/WelcomeCard";
import StatisticsSection from "@/components/admin/dashboard/StatisticsSection";
import ActivityTable from "@/components/admin/dashboard/ActivityTable";

export default function DashboardView() {
  return (
    <>
      <DashboardHeader />

      <WelcomeCard />

      <StatisticsSection />

      <ActivityTable />
    </>
  );
}