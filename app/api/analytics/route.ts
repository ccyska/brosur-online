import { NextResponse } from "next/server";
import AnalyticsService from "@/services/AnalyticsService";

export async function GET() {
  try {
    const analytics =
      await AnalyticsService.getDashboardAnalytics();

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil analytics",
      },
      {
        status: 500,
      }
    );
  }
}