import DashboardRepository from "@/repositories/DashboardRepository";

export default class DashboardService {
  static async getStatistics() {
    const totalBrochures =
      await DashboardRepository.getTotalBrochure();

    const totalView =
      await DashboardRepository.getTotalView();

    const published =
      await DashboardRepository.getPublished();

    const recentActivities =
      await DashboardRepository.getRecentActivities();

    const popularBrochures =
      await DashboardRepository.getPopularBrochures();

    const weeklyPerformance =
      await DashboardRepository.getWeeklyPerformance();

    const latestVisitors =
      await DashboardRepository.getLatestVisitors();

    return {
      totalBrochures,
      totalView,
      published,
      recentActivities,
      popularBrochures,
      weeklyPerformance,
      latestVisitors,
    };
  }
}