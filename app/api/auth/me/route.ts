import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import AdminRepository from "@/repositories/AdminRepository";

export async function GET() {
  const cookieStore = await cookies();

  const session =
    cookieStore.get("admin_session");

  if (!session) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const admin =
    await AdminRepository.getById(
      Number(session.value)
    );

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      id: admin.id,
      username: admin.username,
    },
  });
}