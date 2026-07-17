import db from "@/lib/db";
import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

export interface PageView extends RowDataPacket {
  id: number;
  brochure_id: number;
  viewed_at: Date;
}

export interface BrochureStatistic extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  total_views: number;
}

export default class PageViewRepository {
  /**
   * Menyimpan data view brosur
   */
  static async create(
    brochureId: number
  ): Promise<number> {
    const [result] = await db.query<ResultSetHeader>(
      `
      INSERT INTO page_views (brochure_id)
      VALUES (?)
      `,
      [brochureId]
    );

    return result.insertId;
  }

  /**
   * Mengambil seluruh riwayat view
   */
  static async getAll(): Promise<PageView[]> {
    const [rows] = await db.query<PageView[]>(
      `
      SELECT *
      FROM page_views
      ORDER BY viewed_at DESC
      `
    );

    return rows;
  }

  /**
   * Menghitung total view
   */
  static async countTotal(): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM page_views
      `
    );

    return rows[0].total;
  }

  /**
   * Menghitung view hari ini
   */
  static async countToday(): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM page_views
      WHERE DATE(viewed_at) = CURDATE()
      `
    );

    return rows[0].total;
  }

  /**
   * Menghitung view berdasarkan brosur
   */
  static async countByBrochure(
    brochureId: number
  ): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM page_views
      WHERE brochure_id = ?
      `,
      [brochureId]
    );

    return rows[0].total;
  }

  /**
   * Statistik brosur
   */
  static async getStatistics(): Promise<BrochureStatistic[]> {
    const [rows] = await db.query<BrochureStatistic[]>(
      `
      SELECT
        brochures.id,
        brochures.title,
        brochures.slug,
        COUNT(page_views.id) AS total_views
      FROM brochures
      LEFT JOIN page_views
        ON brochures.id = page_views.brochure_id
      GROUP BY brochures.id
      ORDER BY total_views DESC
      `
    );

    return rows;
  }
};