import { NextRequest, NextResponse } from "next/server";
import BrochureService from "@/services/BrochureService";

export async function GET(request: NextRequest) {
  try {
    const search =
      request.nextUrl.searchParams.get("search") ?? "";

    const brochures = search
      ? await BrochureService.search(search)
      : await BrochureService.getAll();

    return NextResponse.json({
      success: true,
      data: brochures,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat mengambil data brosur.",
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

    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    const brochure = await BrochureService.create({
      title: body.title,
      slug,
      image: body.image,
      short_description: body.short_description,
      description: body.description,
    });

    return NextResponse.json({
      success: true,
      message: "Brosur berhasil disimpan.",
      data: brochure,
    });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyimpan brosur.",
      },
      {
        status: 500,
      }
    );
  }
}