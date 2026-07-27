import db from "@/lib/db";

interface Brochure {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
  description: string |null;
}

export default class BrochureRepository {

  static async getAll() {
    const [rows] = await db.query(
      `
      SELECT *
      FROM brochures
      ORDER BY id DESC
      `
    );

    return rows as Brochure[];
  }

  static async getById(id: number) {
    const [rows] = await db.query(
      `
      SELECT *
      FROM brochures
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    const brochures = rows as Brochure[];

    return brochures[0] ?? null;
  }

  static async getBySlug(slug: string) {
    const [rows] = await db.query(
      `
      SELECT *
      FROM brochures
      WHERE slug = ?
      LIMIT 1
      `,
      [slug]
    );

    const brochures = rows as Brochure[];

    const brochure = brochures[0] ?? null;

    if (!brochure) {
      return null;
    }

    // Tambahkan view setiap kali brosur dibuka
    await db.query(
      `
      INSERT INTO page_views
      (
        brochure_id,
        viewed_at
      )
      VALUES
      (
        ?,
        NOW()
      )
      `,
      [brochure.id]
    );

    return brochure;
  }

  static async search(keyword: string) {
    const [rows] = await db.query(
      `
      SELECT *
      FROM brochures
      WHERE title LIKE ?
      ORDER BY id DESC
      `,
      [`%${keyword}%`]
    );

    return rows as Brochure[];
  }

  static async create(data: {
    title: string;
    slug: string;
    image: string;
    short_description: string | null;
    description: string | null;
  }) {
    const [result] = await db.query(
      `
      INSERT INTO brochures
      (
        title,
        slug,
        image,
        short_description,
        description
      )
      VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?
      )
      `,
      [
        data.title,
        data.slug,
        data.image,
        data.short_description,
        data.description,
      ]
    );

    return result;
  }

  static async update(
    id: number,
    data: {
      title: string;
      slug: string;
      image: string;
      short_description: string | null;
      description: string | null;
    }
  ) {
    const [result] = await db.query(
      `
      UPDATE brochures
      SET
        title = ?,
        slug = ?,
        image = ?,
        short_description = ?,
        description = ?
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

    return result;
  }

  static async delete(id: number) {
    const [result] = await db.query(
      `
      DELETE FROM brochures
      WHERE id = ?
      `,
      [id]
    );
    
    return result;
  };
};