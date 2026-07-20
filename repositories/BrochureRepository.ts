import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export interface Brochure extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number | null;
  short_description: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

interface CreateBrochureData {
  title: string;
  slug: string;
  image: string;
  price: number |null;
  short_description: string | null;
  description: string | null;
}

export default class BrochureRepository {
  /**
   * Mengambil semua data brosur
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
   * Mencari brosur berdasarkan judul
   */
  static async search(
    keyword: string
  ): Promise<Brochure[]> {
    const [rows] = await db.query<Brochure[]>(
      `
      SELECT *
      FROM brochures
      WHERE title LIKE ?
      ORDER BY created_at DESC
      `,
      [`%${keyword}%`]
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
   * Menambahkan brosur baru
   */
  static async create(
    data: CreateBrochureData
  ): Promise<void> {
    await db.query(
      `
      INSERT INTO brochures (
        title,
        slug,
        image,
        price,
        short_description,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        data.title,
        data.slug,
        data.image,
        data.price,
        data.short_description,
        data.description,
      ]
    );
  }

  /**
   * Mengubah data brosur
   */
  static async update(
    id: number,
    data: CreateBrochureData
  ): Promise<void> {
    await db.query(
      `
      UPDATE brochures
      SET
        title = ?,
        slug = ?,
        image = ?,
        price = ?,
        short_description = ?,
        description = ?,
        updated_at = CURRENT_TIMESTAMP()
      WHERE id = ?
      `,
      [
        data.title,
        data.slug,
        data.image,
        data.price,
        data.short_description,
        data.description,
        id,
      ]
    );
  }

  /**
   * Menghapus brosur
   */
  static async delete(
    id: number
  ): Promise<void> {
    await db.query(
      `
      DELETE FROM brochures
      WHERE id = ?
      `,
      [id]
    );
  }
}