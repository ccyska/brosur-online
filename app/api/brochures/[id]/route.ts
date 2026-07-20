import { NextRequest, NextResponse } from "next/server";
import BrochureService from "@/services/BrochureService";

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

    const brochure =
      await BrochureService.getById(Number(id));

    if (!brochure) {
      return NextResponse.json(
        {
          success: false,
          message: "Brosur tidak ditemukan.",
        },
        {
          status: 404,
        }
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
      title,
      price,
      short_description,
      description,
    } = body;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul brosur wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const brochure =
      await BrochureService.getById(Number(id));

    if (!brochure) {
      return NextResponse.json(
        {
          success: false,
          message: "Brosur tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-");

    await BrochureService.update(
      Number(id),
      {
        title,
        slug,
        image: brochure.image,
        price,
        short_description,
        description,
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Brosur berhasil diperbarui.",
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

    const brochure =
      await BrochureService.getById(Number(id));

    if (!brochure) {
      return NextResponse.json(
        {
          success: false,
          message: "Brosur tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    await BrochureService.delete(Number(id));

    return NextResponse.json({
      success: true,
      message: "Brosur berhasil dihapus.",
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