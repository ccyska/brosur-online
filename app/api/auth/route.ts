import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/services/AuthService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username dan password wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await AuthService.login(
      username,
      password
    );

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil",
      data: {
        id: admin.id,
        username: admin.username,
      },
    });

    response.cookies.set("admin_session", admin.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
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
        status: 401,
      }
    );
  }
}