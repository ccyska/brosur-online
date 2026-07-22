import { NextRequest, NextResponse } from "next/server";
import BrochureService from "@/services/BrochureService";

export async function GET(
  request: NextRequest
) {
  try {
    const keyword =
      request.nextUrl.searchParams.get(
        "search"
      );

    const brochures = keyword
      ? await BrochureService.search(
          keyword
        )
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
        message:
          "Gagal mengambil data.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

const {
  title,
  image,
  short_description,
  description,
} = body;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Judul brosur wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-");

await BrochureService.create({
  title,
  slug,
  image,
  short_description,
  description,
});

    return NextResponse.json({
      success: true,
      message:
        "Brosur berhasil ditambahkan.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan.",
      },
      {
        status: 500,
      }
    );
  }
}