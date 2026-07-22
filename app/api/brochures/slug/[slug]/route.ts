import { NextRequest, NextResponse } from "next/server";
import BrochureService from "@/services/BrochureService";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;

    const brochure =
      await BrochureService.getBySlug(slug);

    if (!brochure) {
      return NextResponse.json(
        {
          success: false,
          message: "Brosur tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: brochure,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan.",
      },
      { status: 500 }
    );
  }
}
