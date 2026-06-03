"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") || "sd";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("admin_token", response.data.token);
      localStorage.setItem("admin_unit", unit);
      toast.success("Login berhasil!");
      router.push(`/admin/${unit}`);
    } catch (error: unknown) {
      toast.error(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Login gagal, silakan cek kembali.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
        <p className="text-gray-500 mt-2 capitalize font-medium">
          Unit: {unit.toUpperCase()}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
            placeholder="admin@sekolah.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold transition flex items-center justify-center ${
            unit === "sd"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-indigo-700 hover:bg-indigo-800"
          } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            "Login ke Dashboard"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Belum punya akun?{" "}
          <Link
            href={`/admin/register?unit=${unit}`}
            className="text-blue-600 font-bold hover:underline"
          >
            Daftar di sini
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
