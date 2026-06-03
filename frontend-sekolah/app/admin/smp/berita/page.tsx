"use client";

import DashboardLayout from "@/components/DashboardLayout";
import BeritaList from "@/components/BeritaList";
import Link from "next/link";

export default function SMPBeritaPage() {
  return (
    <DashboardLayout unit="smp" title="Kelola Berita SMP">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">Daftar berita terbaru untuk unit SMP.</p>
        <Link
          href="/admin/smp/berita/tambah"
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-xl font-bold transition flex items-center gap-2"
        >
          <span>➕</span> Tambah Berita
        </Link>
      </div>

      <BeritaList unit="smp" />
    </DashboardLayout>
  );
}
