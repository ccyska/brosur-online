import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export interface BrochurePackage extends RowDataPacket {
  id: number;
  brochure_id: number;
  package_name: string;
  speed: string;
  price: number;
  badge: string | null;
  short_description: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBrochurePackageData {
  brochure_id: number;
  package_name: string;
  speed: string;
  price: number;
  badge: string | null;
  short_description: string | null;
  description: string | null;
}

export default class BrochurePackageRepository {
  /**
   * Mengambil semua paket
   */
  static async getAll(): Promise<BrochurePackage[]> {
    const [rows] = await db.query<BrochurePackage[]>(
      `
      SELECT *
      FROM brochure_packages
      ORDER BY brochure_id ASC, price ASC
      `
    );

    return rows;
  }

  /**
   * Mengambil paket berdasarkan id
   */
  static async getById(
    id: number
  ): Promise<BrochurePackage | null> {
    const [rows] = await db.query<BrochurePackage[]>(
      `
      SELECT *
      FROM brochure_packages
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    return rows.length ? rows[0] : null;
  }

  /**
   * Mengambil semua paket berdasarkan brosur
   */
  static async getByBrochureId(
    brochureId: number
  ): Promise<BrochurePackage[]> {
    const [rows] = await db.query<BrochurePackage[]>(
      `
      SELECT *
      FROM brochure_packages
      WHERE brochure_id = ?
      ORDER BY price ASC
      `,
      [brochureId]
    );

    return rows;
  }

  /**
   * Menambahkan paket
   */
  static async create(
    data: CreateBrochurePackageData
  ): Promise<void> {
    await db.query(
      `
      INSERT INTO brochure_packages (
        brochure_id,
        package_name,
        speed,
        price,
        badge,
        short_description,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.brochure_id,
        data.package_name,
        data.speed,
        data.price,
        data.badge,
        data.short_description,
        data.description,
      ]
    );
  }

  /**
   * Mengubah paket
   */
  static async update(
    id: number,
    data: CreateBrochurePackageData
  ): Promise<void> {
    await db.query(
      `
      UPDATE brochure_packages
      SET
        brochure_id = ?,
        package_name = ?,
        speed = ?,
        price = ?,
        badge = ?,
        short_description = ?,
        description = ?
      WHERE id = ?
      `,
      [
        data.brochure_id,
        data.package_name,
        data.speed,
        data.price,
        data.badge,
        data.short_description,
        data.description,
        id,
      ]
    );
  }

  /**
   * Menghapus paket
   */
  static async delete(
    id: number
  ): Promise<void> {
    await db.query(
      `
      DELETE FROM brochure_packages
      WHERE id = ?
      `,
      [id]
    );
  }
}