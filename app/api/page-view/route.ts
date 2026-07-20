import { NextRequest, NextResponse } from "next/server";
import PageViewRepository from "@/repositories/PageViewRepository";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const { brochure_id } = body;

    await PageViewRepository.create(
      brochure_id
    );

    return NextResponse.json({
      success: true,
      message: "View berhasil disimpan",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan view",
      },
      {
        status: 500,
      }
    );
  }
}