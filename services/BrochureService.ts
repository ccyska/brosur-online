import BrochureRepository from "@/repositories/BrochureRepository";

interface CreateBrochureData {
  title: string;
  slug: string;
  image: string;
  price: number | null;
  short_description: string | null;
  description: string | null;
}

export default class BrochureService {
  /**
   * Mengambil semua data brosur
   */
  static async getAll() {
    return await BrochureRepository.getAll();
  }

  /**
   * Mencari brosur
   */
  static async search(
    keyword: string
  ) {
    return await BrochureRepository.search(
      keyword
    );
  }

  /**
   * Mengambil brosur berdasarkan ID
   */
  static async getById(id: number) {
    return await BrochureRepository.getById(id);
  }

  /**
   * Menambahkan brosur baru
   */
  static async create(
    data: CreateBrochureData
  ) {
    await BrochureRepository.create(data);
  }

  /**
   * Mengubah data brosur
   */
  static async update(
    id: number,
    data: CreateBrochureData
  ) {
    await BrochureRepository.update(
      id,
      data
    );
  }

  /**
   * Menghapus brosur
   */
  static async delete(id: number) {
    await BrochureRepository.delete(id);
  }
}