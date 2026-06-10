"use client";

import AdminLayout from "@/components/AdminLayout";
import StatCard from "@/components/StatCard";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminDashboardHome() {
  const params = useParams();
  const unit = params.unit as "sd" | "smp";

  return (
    <AdminLayout unit={unit} title={`Admin Panel ${unit.toUpperCase()}`}>
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2 text-wrap">Ringkasan Sistem</h2>
          <p className="text-gray-500 font-medium">Selamat datang kembali, Administrator. Berikut adalah ikhtisar data unit {unit.toUpperCase()}.</p>
        </div>
        <div className="px-6 py-3 bg-tosca-50 rounded-2xl border border-tosca-100 flex items-center gap-3">
            <div>
               <p className="text-[10px] font-black text-tosca-700 uppercase tracking-widest">Status Keamanan</p>
               <p className="text-sm font-bold text-gray-800 text-nowrap">Terproteksi & Aktif</p>
            </div>
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard title="Total Berita" value={12} color="bg-tosca-50" />
        <StatCard title="Total Guru" value={24} color="bg-tosca-200/30" />
        <StatCard title="Agenda Baru" value={3} color="bg-yellow-50" />
        <StatCard title="Pendaftar PPDB" value={48} color="bg-tosca-700/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-gray-800 tracking-tight">Pendaftar PPDB Terbaru</h3>
               <Link href={`/admin/${unit}/ppdb`} className="text-sm font-bold text-tosca-700 hover:underline flex items-center gap-1">Kelola Semua</Link>
            </div>
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-gray-50 border border-gray-100">
                     <div className="flex items-center gap-4">
                        <div>
                           <p className="font-bold text-gray-800">Siswa Teladan {i}</p>
                           <p className="text-xs text-gray-400 font-bold uppercase">Asal: TK Abata</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase rounded-full tracking-widest">Pending</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-gray-800 tracking-tight">Aksi Cepat</h3>
               <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full tracking-widest">System Healthy</span>
            </div>
            <div className="space-y-6">
               <div>
                  <div className="flex justify-between mb-2">
                     <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Kuota PPDB Terisi</span>
                     <span className="text-xs font-black text-tosca-700">75%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                     <div className="bg-tosca-500 h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <Link href={`/admin/${unit}/artikel/tambah`} className="p-6 bg-tosca-50 rounded-[32px] border border-tosca-100 hover:bg-tosca-500 hover:text-white transition-all group">
                     <p className="font-black text-sm uppercase tracking-widest">Tambah Artikel</p>
                  </Link>
                  <Link href={`/admin/${unit}/berita/tambah`} className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-tosca-500 hover:text-white transition-all group">
                     <p className="font-black text-sm uppercase tracking-widest">Tambah Berita</p>
                  </Link>
                  <Link href={`/admin/${unit}/guru/tambah`} className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-tosca-900 hover:text-white transition-all group">
                     <p className="font-black text-sm uppercase tracking-widest">Tambah Guru</p>
                  </Link>
               </div>
            </div>
         </div>
        </div>
    </AdminLayout>
  );
}
