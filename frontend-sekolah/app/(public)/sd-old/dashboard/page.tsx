"use client";

import PublicLayout from "@/components/PublicLayout";
import StatCard from "@/components/StatCard";
import Link from "next/link";

export default function SDPublicDashboard() {
  return (
    <PublicLayout unit="sd">
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Portal Data SD
            </h1>
            <p className="text-gray-500 font-medium italic">
              Informasi publik unit Sekolah Dasar Budiman Cendikia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <StatCard
              title="Total Berita"
              value={12}
              icon="📰"
              color="bg-tosca-50 text-tosca-700"
            />
            <StatCard
              title="Total Guru"
              value={24}
              icon="👨‍🏫"
              color="bg-tosca-200/30 text-tosca-900"
            />
            <StatCard
              title="Agenda"
              value={3}
              icon="📅"
              color="bg-yellow-50 text-yellow-600"
            />
            <StatCard
              title="Pendaftar PPDB"
              value={48}
              icon="📝"
              color="bg-tosca-700/10 text-tosca-900"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <h3 className="text-2xl font-black text-gray-800 mb-6">
                  Informasi Terbaru
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Link
                      key={i}
                      href="/sd/berita"
                      className="flex items-center gap-4 p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-tosca-200 transition-all group"
                    >
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                        📄
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">
                          Update Kurikulum Merdeka Fase A
                        </p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                          Berita • 12 Juni 2026
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="bg-tosca-900 p-8 rounded-[40px] text-white shadow-xl">
                <h3 className="text-xl font-black mb-6">
                  Penerimaan Siswa Baru
                </h3>
                <p className="text-tosca-200 text-sm font-medium mb-8 leading-relaxed">
                  Pendaftaran untuk tahun ajaran 2026/2027 telah dibuka. Segera
                  daftarkan putra-putri Anda.
                </p>
                <Link
                  href="/sd/ppdb"
                  className="block w-full py-4 bg-tosca-500 text-white text-center rounded-2xl font-black text-sm hover:bg-white hover:text-tosca-900 transition-all"
                >
                  Daftar Sekarang
                </Link>
              </div>

              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-800 mb-6">
                  Kontak Sekolah
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <span className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      📞
                    </span>
                    (061) 1234567
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <span className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      ✉️
                    </span>
                    sd@budimancendikia.sch.id
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
