import PageViewRepository from "@/repositories/PageViewRepository";

export default class AnalyticsService {
  // Retrieve dashboard analytics data
  static async getDashboardAnalytics() {
    return PageViewRepository.countTotalViews();
  }
}
