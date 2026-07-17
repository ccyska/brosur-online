import AdminRepository from "@/repositories/AdminRepository";

export default class AuthService {
  // Authenticate an admin user
  static async login() {
    return AdminRepository.loginAdmin();
  }
}
