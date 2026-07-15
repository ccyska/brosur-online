import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    await db.query("SELECT 1");

    return NextResponse.json({
      message: "Database berhasil terhubung",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Database gagal terhubung",
      },
      { status: 500 }
    );
  }
}