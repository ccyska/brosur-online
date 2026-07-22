import BrochurePackageRepository, {
  CreateBrochurePackageData,
} from "@/repositories/BrochurePackageRepository";

export default class BrochurePackageService {
  /**
   * Mengambil semua paket
   */
  static async getAll() {
    return await BrochurePackageRepository.getAll();
  }

  /**
   * Mengambil paket berdasarkan ID
   */
  static async getById(id: number) {
    return await BrochurePackageRepository.getById(id);
  }

  /**
   * Mengambil semua paket berdasarkan brosur
   */
  static async getByBrochureId(
    brochureId: number
  ) {
    return await BrochurePackageRepository.getByBrochureId(
      brochureId
    );
  }

  /**
   * Menambahkan paket
   */
  static async create(
    data: CreateBrochurePackageData
  ) {
    await BrochurePackageRepository.create(data);
  }

  /**
   * Mengubah paket
   */
  static async update(
    id: number,
    data: CreateBrochurePackageData
  ) {
    await BrochurePackageRepository.update(
      id,
      data
    );
  }

  /**
   * Menghapus paket
   */
  static async delete(id: number) {
    await BrochurePackageRepository.delete(id);
  }
}