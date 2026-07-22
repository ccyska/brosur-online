import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface TotalBrochure extends RowDataPacket {
  total: number;
}

interface TotalView extends RowDataPacket {
  total: number;
}

interface PublishedBrochure extends RowDataPacket {
  total: number;
}

export interface RecentActivity extends RowDataPacket {
  id: number;
  title: string;
  created_at: Date;
}

export interface PopularBrochure extends RowDataPacket {
  id: number;
  title: string;
  total_view: number;
}

export interface WeeklyPerformance extends RowDataPacket {
  day: string;
  total: number;
}

export interface LatestVisitor extends RowDataPacket {
  id: number;
  brochure_title: string;
  viewed_at: Date;
}

export default class DashboardRepository {
  /**
   * Total Brosur
   */
  static async getTotalBrochure(): Promise<number> {
    const [rows] = await db.query<TotalBrochure[]>(
      `
      SELECT COUNT(*) AS total
      FROM brochures
      `
    );

    return rows[0].total;
  }

  /**
   * Total View
   */
  static async getTotalView(): Promise<number> {
    const [rows] = await db.query<TotalView[]>(
      `
      SELECT COUNT(*) AS total
      FROM page_views
      `
    );

    return rows[0].total;
  }

  /**
   * Total Published
   */
  static async getPublished(): Promise<number> {
    const [rows] = await db.query<PublishedBrochure[]>(
      `
      SELECT COUNT(*) AS total
      FROM brochures
      `
    );

    return rows[0].total;
  }

  /**
   * Recent Activity
   */
  static async getRecentActivities(): Promise<RecentActivity[]> {
    const [rows] = await db.query<RecentActivity[]>(
      `
      SELECT
        id,
        title,
        created_at
      FROM brochures
      ORDER BY created_at DESC
      LIMIT 5
      `
    );

    return rows;
  }

  /**
   * Popular Brochure
   */
  static async getPopularBrochures(): Promise<PopularBrochure[]> {
    const [rows] = await db.query<PopularBrochure[]>(
      `
      SELECT
        b.id,
        b.title,
        COUNT(pv.id) AS total_view
      FROM brochures b
      LEFT JOIN page_views pv
        ON pv.brochure_id = b.id
      GROUP BY b.id, b.title
      ORDER BY total_view DESC
      LIMIT 5
      `
    );

    return rows;
  }

  /**
   * Weekly Performance
   */
  static async getWeeklyPerformance(): Promise<WeeklyPerformance[]> {
    const [rows] = await db.query<WeeklyPerformance[]>(
      `
      SELECT
        DATE(viewed_at) AS day,
        COUNT(*) AS total
      FROM page_views
      WHERE viewed_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(viewed_at)
      ORDER BY day ASC
      `
    );

    return rows;
  }

  /**
   * Latest Visitor
   */
  static async getLatestVisitors(): Promise<LatestVisitor[]> {
    const [rows] = await db.query<LatestVisitor[]>(
      `
      SELECT
        pv.id,
        b.title AS brochure_title,
        pv.viewed_at
      FROM page_views pv
      INNER JOIN brochures b
        ON b.id = pv.brochure_id
      ORDER BY pv.viewed_at DESC
      LIMIT 5
      `
    );

    return rows;
  }
}