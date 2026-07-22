import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(
  request: NextRequest
) {
  try {
    const data = await request.formData();

    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const fileName =
      Date.now() +
      "-" +
      file.name.replace(/\s+/g, "-");

    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      fileName
    );

    await writeFile(uploadPath, buffer);

    return NextResponse.json({
      success: true,
      filename: fileName,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload gagal.",
      },
      {
        status: 500,
      }
    );
  }
}