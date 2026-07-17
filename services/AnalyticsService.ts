import BrochureRepository from "@/repositories/BrochureRepository";
import PageViewRepository, {
  BrochureStatistic,
} from "@/repositories/PageViewRepository";

export interface DashboardAnalytics {
  totalBrochures: number;
  totalViews: number;
  todayViews: number;
  brochureStatistics: BrochureStatistic[];
}

export default class AnalyticsService {
  /**
   * Dashboard Analytics
   */
  static async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    const totalBrochures =
      await BrochureRepository.count();

    const totalViews =
      await PageViewRepository.countTotal();

    const todayViews =
      await PageViewRepository.countToday();

    const brochureStatistics =
      await PageViewRepository.getStatistics();

    return {
      totalBrochures,
      totalViews,
      todayViews,
      brochureStatistics,
    };
  }

  /**
   * Total Brosur
   */
  static async totalBrochures(): Promise<number> {
    return await BrochureRepository.count();
  }

  /**
   * Total View
   */
  static async totalViews(): Promise<number> {
    return await PageViewRepository.countTotal();
  }

  /**
   * View Hari Ini
   */
  static async todayViews(): Promise<number> {
    return await PageViewRepository.countToday();
  }

  /**
   * Statistik Brosur
   */
  static async brochureStatistics(): Promise<BrochureStatistic[]> {
    return await PageViewRepository.getStatistics();
  }
};