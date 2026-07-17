import BrochureRepository, {
  BrochurePayload,
} from "@/repositories/BrochureRepository";

export default class BrochureService {
  /**
   * Ambil semua brosur
   */
  static async getAll() {
    return await BrochureRepository.getAll();
  }

  /**
   * Ambil detail brosur berdasarkan ID
   */
  static async getById(id: number) {
    return await BrochureRepository.getById(id);
  }

  /**
   * Ambil detail berdasarkan slug
   */
  static async getBySlug(slug: string) {
    return await BrochureRepository.getBySlug(slug);
  }

  /**
   * Tambah brosur
   */
  static async create(
    payload: BrochurePayload
  ) {
    const slugExists =
      await BrochureRepository.slugExists(payload.slug);

    if (slugExists) {
      throw new Error("Slug sudah digunakan");
    }

    return await BrochureRepository.create(payload);
  }

  /**
   * Update brosur
   */
  static async update(
    id: number,
    payload: BrochurePayload
  ) {
    return await BrochureRepository.update(
      id,
      payload
    );
  }

  /**
   * Hapus brosur
   */
  static async delete(id: number) {
    return await BrochureRepository.delete(id);
  }

  /**
   * Total brosur
   */
  static async count() {
    return await BrochureRepository.count();
  }
};