import { NextRequest, NextResponse } from "next/server";
import BrochureService from "@/services/BrochureService";

export async function GET() {
  try {
    const brochures =
      await BrochureService.getAll();

    return NextResponse.json({
      success: true,
      data: brochures,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data brosur",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const id =
      await BrochureService.create(body);

    return NextResponse.json({
      success: true,
      message: "Brosur berhasil ditambahkan",
      id,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan",
      },
      {
        status: 400,
      }
    );
  }
}