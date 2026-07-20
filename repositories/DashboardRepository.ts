import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface TotalBrochure extends RowDataPacket {
  total: number;
}

export default class DashboardRepository {
  static async getTotalBrochure(): Promise<number> {
    const [rows] = await db.query<TotalBrochure[]>(
      `
      SELECT COUNT(*) AS total
      FROM brochures
      `
    );

    return rows[0].total;
  }
}