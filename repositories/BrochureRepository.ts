import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export interface Brochure extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBrochureData {
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
  description: string | null;
}

export default class BrochureRepository {

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

  static async create(
    data: CreateBrochureData
  ): Promise<void> {

    await db.query(
      `
      INSERT INTO brochures (
        title,
        slug,
        image,
        short_description,
        description
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        data.title,
        data.slug,
        data.image,
        data.short_description,
        data.description,
      ]
    );
  }

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
        short_description = ?,
        description = ?,
        updated_at = CURRENT_TIMESTAMP()
      WHERE id = ?
      `,
      [
        data.title,
        data.slug,
        data.image,
        data.short_description,
        data.description,
        id,
      ]
    );
  }

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