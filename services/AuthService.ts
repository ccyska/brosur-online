import bcrypt from "bcrypt";
import AdminRepository from "@/repositories/AdminRepository";

export default class AuthService {
  /**
   * Login Admin
   */
  static async login(
    username: string,
    password: string
  ) {
    // Cari admin berdasarkan username
    const admin = await AdminRepository.getByUsername(username);

    if (!admin) {
      throw new Error("Username tidak ditemukan");
    }

    // Cocokkan password
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      throw new Error("Password salah");
    }

    return admin;
  }

  /**
   * Ambil profil admin
   */
  static async getProfile(id: number) {
    return await AdminRepository.getById(id);
  }
};