import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function GET() {
  try {
    // Cek apakah admin sudah ada
    const [rows] = await db.query(
      "SELECT id FROM admins LIMIT 1"
    );

    if ((rows as unknown[]).length > 0) {
      return NextResponse.json({
        success: false,
        message: "Admin sudah tersedia.",
      });
    }

    // Password yang akan digunakan untuk login
    const password = "admin123";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    await db.query(
      `
      INSERT INTO admins
      (username, password, created_at, updated_at)
      VALUES (?, ?, NOW(), NOW())
      `,
      ["admin", hashedPassword]
    );

    return NextResponse.json({
      success: true,
      message: "Admin berhasil dibuat.",
      data: {
        username: "admin",
        password: "admin123",
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat admin.",
      },
      {
        status: 500,
      }
    );
  }
}