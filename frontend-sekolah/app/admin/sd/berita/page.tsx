"use client";

import DashboardLayout from "@/components/DashboardLayout";
import BeritaList from "@/components/BeritaList";
import Link from "next/link";

export default function SDBeritaPage() {
  return (
    <DashboardLayout unit="sd" title="Kelola Berita SD">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">Daftar berita terbaru untuk unit Sekolah Dasar.</p>
        <Link
          href="/admin/sd/berita/tambah"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition flex items-center gap-2"
        >
          <span>➕</span> Tambah Berita
        </Link>
      </div>

      <BeritaList unit="sd" />
    </DashboardLayout>
  );
}
