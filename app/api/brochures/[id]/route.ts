import { NextRequest, NextResponse } from "next/server";
import BrochureService from "@/services/BrochureService";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const brochure =
    await BrochureService.getById(Number(id));

  return NextResponse.json({
    success: true,
    data: brochure,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await request.json();

    await BrochureService.update(
      Number(id),
      body
    );

    return NextResponse.json({
      success: true,
      message: "Brosur berhasil diupdate",
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

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  await BrochureService.delete(Number(id));

  return NextResponse.json({
    success: true,
    message: "Brosur berhasil dihapus",
  });
}