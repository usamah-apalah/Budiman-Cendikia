"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUnit = searchParams.get("unit") || "sd";

  const [formData, setFormData] = useState({
    name: "BudimanCendikia",
    email: "budimancendikia@gmail.com",
    password: "12345678",
    password_confirmation: "12345678",
    unit: initialUnit,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error("Password konfirmasi tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/register", formData);
      localStorage.setItem("admin_token", response.data.token);
      localStorage.setItem("admin_unit", formData.unit);
      toast.success("Registrasi berhasil!");
      router.push(`/admin/${formData.unit}/dashboard`);
    } catch (error: unknown) {
      toast.error(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Registrasi gagal, silakan cek kembali.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-tosca-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg shadow-tosca-500/20">
          B
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Register</h2>
        <p className="text-tosca-700 mt-2 font-bold text-sm tracking-widest uppercase">
          Buat Akun Pengelola
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 transition-all outline-none bg-gray-50/50"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 transition-all outline-none bg-gray-50/50"
            placeholder="admin@sekolah.com"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            Unit Pengelola
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 transition-all outline-none bg-gray-50/50 appearance-none cursor-pointer"
          >
            <option value="sd">SD (Sekolah Dasar)</option>
            <option value="smp">SMP (Sekolah Menengah Pertama)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 transition-all outline-none bg-gray-50/50"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            Konfirmasi Password
          </label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 transition-all outline-none bg-gray-50/50"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-2xl text-white font-black tracking-wide transition-all duration-300 shadow-lg mt-4 ${
            formData.unit === "sd"
              ? "bg-tosca-500 hover:bg-tosca-700 shadow-tosca-500/30"
              : "bg-tosca-700 hover:bg-tosca-900 shadow-tosca-700/30"
          } ${isLoading ? "opacity-70 cursor-not-allowed scale-95" : "hover:-translate-y-1"}`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
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
            "Buat Akun Sekarang"
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 font-medium">
          Sudah punya akun?{" "}
          <Link
            href={`/admin/login?unit=${formData.unit}`}
            className="text-tosca-700 font-black hover:underline ml-1"
          >
            Login di sini
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-tosca-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tosca-200 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl opacity-30"></div>
      
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
