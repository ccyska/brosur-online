import db from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Brochure extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number;
  short_description: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface BrochurePayload {
  title: string;
  slug: string;
  image: string;
  price: number;
  short_description: string;
  description: string;
}

export default class BrochureRepository {
  /**
   * Mengambil seluruh brosur
   */
  static async getAll(): Promise<Brochure[]> {
    const [rows] = await db.query<Brochure[]>(
      `
      SELECT *
      FROM brochures
      ORDER BY created_at DESC
      `
    );

    return rows;
  }

  /**
   * Mengambil brosur berdasarkan ID
   */
  static async getById(
    id: number
  ): Promise<Brochure | null> {
    const [rows] = await db.query<Brochure[]>(
      `
      SELECT *
      FROM brochures
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    return rows.length ? rows[0] : null;
  }

  /**
   * Mengambil brosur berdasarkan slug
   */
  static async getBySlug(
    slug: string
  ): Promise<Brochure | null> {
    const [rows] = await db.query<Brochure[]>(
      `
      SELECT *
      FROM brochures
      WHERE slug = ?
      LIMIT 1
      `,
      [slug]
    );

    return rows.length ? rows[0] : null;
  }

  /**
   * Menambah brosur baru
   */
  static async create(
    payload: BrochurePayload
  ): Promise<number> {
    const [result] = await db.query<ResultSetHeader>(
      `
      INSERT INTO brochures
      (
        title,
        slug,
        image,
        price,
        short_description,
        description
      )
      VALUES
      (?, ?, ?, ?, ?, ?)
      `,
      [
        payload.title,
        payload.slug,
        payload.image,
        payload.price,
        payload.short_description,
        payload.description,
      ]
    );

    return result.insertId;
  }

  /**
   * Mengubah brosur
   */
  static async update(
    id: number,
    payload: BrochurePayload
  ): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
      `
      UPDATE brochures
      SET
        title = ?,
        slug = ?,
        image = ?,
        price = ?,
        short_description = ?,
        description = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        payload.title,
        payload.slug,
        payload.image,
        payload.price,
        payload.short_description,
        payload.description,
        id,
      ]
    );

    return result.affectedRows > 0;
  }

  /**
   * Menghapus brosur
   */
  static async delete(
    id: number
  ): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
      `
      DELETE FROM brochures
      WHERE id = ?
      `,
      [id]
    );

    return result.affectedRows > 0;
  }

  /**
   * Menghitung jumlah brosur
   */
  static async count(): Promise<number> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM brochures
      `
    );

    return rows[0].total;
  }

  /**
   * Mengecek apakah slug sudah digunakan
   */
  static async slugExists(
    slug: string
  ): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM brochures
      WHERE slug = ?
      `,
      [slug]
    );

    return rows[0].total > 0;
  }
};