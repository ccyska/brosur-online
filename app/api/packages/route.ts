import { NextRequest, NextResponse } from "next/server";
import PackageService from "@/services/PackageService";

export async function GET(
  request: NextRequest
) {
  try {
    const brochureId =
      request.nextUrl.searchParams.get(
        "brochureId"
      );

    if (!brochureId) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const packages =
      await PackageService.getByBrochure(
        Number(brochureId)
      );

    return NextResponse.json({
      success: true,
      data: packages,
    });
  } catch (error) {
    console.error(error);

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

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      brochure_id,
      package_name,
      speed,
      price,
      badge,
      short_description,
      description,
    } = body;

    if (
      !brochure_id ||
      !package_name ||
      !speed ||
      price == null
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Data wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    await PackageService.create({
      brochure_id,
      package_name,
      speed,
      price,
      badge,
      short_description,
      description,
    });

    return NextResponse.json({
      success: true,
      message: "Paket berhasil ditambahkan.",
    });
  } catch (error) {
    console.error(error);

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