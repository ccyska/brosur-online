import DashboardRepository from "@/repositories/DashboardRepository";

export default class DashboardService {
  static async getStatistics() {
    const totalBrochures =
      await DashboardRepository.getTotalBrochure();

    return {
      totalBrochures,
    };
  }
}