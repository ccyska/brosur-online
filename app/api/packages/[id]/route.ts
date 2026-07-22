import { NextRequest, NextResponse } from "next/server";
import BrochurePackageService from "@/services/BrochurePackageService";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const packageData =
      await BrochurePackageService.getById(
        Number(id)
      );

    if (!packageData) {
      return NextResponse.json(
        {
          success: false,
          message: "Paket tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: packageData,
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

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

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
      !price
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

    const packageData =
      await BrochurePackageService.getById(
        Number(id)
      );

    if (!packageData) {
      return NextResponse.json(
        {
          success: false,
          message: "Paket tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    await BrochurePackageService.update(
      Number(id),
      {
        brochure_id,
        package_name,
        speed,
        price,
        badge,
        short_description,
        description,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Paket berhasil diperbarui.",
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

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const packageData =
      await BrochurePackageService.getById(
        Number(id)
      );

    if (!packageData) {
      return NextResponse.json(
        {
          success: false,
          message: "Paket tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    await BrochurePackageService.delete(
      Number(id)
    );

    return NextResponse.json({
      success: true,
      message: "Paket berhasil dihapus.",
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