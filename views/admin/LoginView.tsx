"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { login } from "@/lib/api/auth";

export default function LoginView() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username dan Password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const result = await login({
        username,
        password,
      });

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);

      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5F2] px-4">
      <div className="w-full max-w-md rounded-[30px] bg-white p-12 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">

        {/* Heading */}

        <div className="text-center">

          <h1 className="text-4xl font-bold text-[#8B5A00]">
            Login Admin 
          </h1>

          <p className="mt-3 text-gray-500">
            Brosur Online Naratel
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >

          {/* Username */}

          <div>

            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-[#4A3B2F]">
              Username
            </label>

            <div className="flex h-14 items-center rounded-xl border border-[#E8C79A] px-4 transition focus-within:border-[#F6A000] focus-within:ring-2 focus-within:ring-[#F6A000]/20">

              <User
                size={20}
                className="text-[#8B6A40]"
              />

              <input
                type="text"
                placeholder="Enter your username"
                className="ml-3 w-full bg-transparent outline-none placeholder:text-gray-400"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-[#4A3B2F]">
              Password
            </label>

            <div className="flex h-14 items-center rounded-xl border border-[#E8C79A] px-4 transition focus-within:border-[#F6A000] focus-within:ring-2 focus-within:ring-[#F6A000]/20">

              <Lock
                size={20}
                className="text-[#8B6A40]"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                className="ml-3 w-full bg-transparent outline-none placeholder:text-gray-400"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={20}
                    className="text-gray-500"
                  />
                ) : (
                  <Eye
                    size={20}
                    className="text-gray-500"
                  />
                )}
              </button>

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#FF9726] to-[#FFB400] text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Loading..."
              : "Login to Dashboard"}

            {!loading && (
              <ArrowRight size={22} />
            )}
          </button>

        </form>

      </div>
    </div>
  );
}