import BrochureRepository from "@/repositories/BrochureRepository";

interface CreateBrochureData {
  title: string;
  slug: string;
  image: string;
  short_description: string | null;
  description: string | null;
}

export default class BrochureService {

  static async getAll() {
    return await BrochureRepository.getAll();
  }

  static async search(keyword: string) {
    return await BrochureRepository.search(keyword);
  }

  static async getById(id: number) {
    return await BrochureRepository.getById(id);
  }

  static async getBySlug(slug: string) {
    return await BrochureRepository.getBySlug(slug);
  }

  static async create(data: CreateBrochureData) {
    return await BrochureRepository.create(data);
  }

  static async update(
    id: number,
    data: CreateBrochureData
  ) {
    return await BrochureRepository.update(
      id,
      data
    );
  }

  static async delete(id: number) {
    return await BrochureRepository.delete(id);
  }

}