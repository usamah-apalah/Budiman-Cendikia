"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await api.get("/me");
        setUser(response.data);
        
        // If user is already logged in and has a unit, redirect to that unit's dashboard
        if (response.data.unit) {
          router.push(`/admin/${response.data.unit}`);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Selamat Datang, {user?.name}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Pilih unit yang ingin Anda kelola hari ini.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SD Card */}
          <Link href="/admin/sd" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-b-8 border-blue-600 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <span className="text-4xl font-bold text-blue-600">SD</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Unit SD</h2>
              <p className="text-gray-500">
                Kelola berita, guru, galeri, dan pengumuman untuk Sekolah Dasar.
              </p>
            </div>
          </Link>

          {/* SMP Card */}
          <Link href="/admin/smp" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border-b-8 border-indigo-700 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <span className="text-4xl font-bold text-indigo-700">SMP</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Unit SMP</h2>
              <p className="text-gray-500">
                Kelola berita, guru, galeri, dan pengumuman untuk Sekolah Menengah Pertama.
              </p>
            </div>
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_unit");
            router.push("/admin/login");
          }}
          className="mt-12 text-red-600 font-semibold hover:underline"
        >
          Logout dari sistem
        </button>
      </div>
    </div>
  );
}
