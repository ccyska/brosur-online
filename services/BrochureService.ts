import BrochureRepository from "@/repositories/BrochureRepository";

export default class BrochureService {
  // Retrieve all brochures
  static async getAllBrochures() {
    return BrochureRepository.getAllBrochures();
  }

  // Retrieve a brochure by its ID
  static async getBrochure() {
    return BrochureRepository.getBrochureById();
  }

  // Create a new brochure
  static async createBrochure() {
    return BrochureRepository.createBrochure();
  }

  // Update an existing brochure
  static async updateBrochure() {
    return BrochureRepository.updateBrochure();
  }

  // Delete a brochure
  static async deleteBrochure() {
    return BrochureRepository.deleteBrochure();
  }
}
