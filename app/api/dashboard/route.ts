import { NextResponse } from "next/server";
import DashboardService from "@/services/DashboardService";

export async function GET() {
  try {
    const data = await DashboardService.getStatistics();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan.",
      },
      {
        status: 500,
      }
    );
  }
}