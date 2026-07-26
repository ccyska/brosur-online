import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
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
  image,
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
    image: image ?? brochure.image,
    short_description,
    description,
  }
);

    // Delete old image from disk when a new one was uploaded,
    // but never delete the default placeholder.
    if (image && image !== brochure.image && brochure.image !== "default.png") {
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        brochure.image
      );

      try {
        await unlink(oldImagePath);
      } catch {
        // File may already be gone — not a fatal error.
      }
    }

    return NextResponse.json({
      success: true,
      message: "Brosur berhasil diperbarui.",
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

    const brochure = await BrochureService.getById(Number(id));

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

    if (
      brochure.image &&
      brochure.image !== "default.png"
    ) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        brochure.image
      );

      try {
        await unlink(imagePath);
      } catch (fileError) {
        console.error(
          "Gagal menghapus gambar:",
          fileError
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Brosur berhasil dihapus.",
    });
  } catch (error: unknown) {
    console.error(
      "DELETE BROCHURE ERROR:",
      error
    );

    let message = "Terjadi kesalahan pada server.";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      }
    );
  }
}