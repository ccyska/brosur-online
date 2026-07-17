import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export interface Admin extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export default class AdminRepository {
  /**
   * Mengambil admin berdasarkan username
   */
  static async getByUsername(
    username: string
  ): Promise<Admin | null> {
    const [rows] = await db.query<Admin[]>(
      `
      SELECT *
      FROM admins
      WHERE username = ?
      LIMIT 1
      `,
      [username]
    );

    return rows.length ? rows[0] : null;
  }

  /**
   * Mengambil admin berdasarkan ID
   */
  static async getById(
    id: number
  ): Promise<Admin | null> {
    const [rows] = await db.query<Admin[]>(
      `
      SELECT *
      FROM admins
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    return rows.length ? rows[0] : null;
  }

  /**
   * Mengambil seluruh data admin
   */
  static async getAll(): Promise<Admin[]> {
    const [rows] = await db.query<Admin[]>(
      `
      SELECT *
      FROM admins
      ORDER BY id DESC
      `
    );

    return rows;
  }
};