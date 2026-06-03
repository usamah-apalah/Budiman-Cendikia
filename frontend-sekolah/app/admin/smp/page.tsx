"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";

export default function SMPDashboard() {
  return (
    <DashboardLayout unit="smp" title="SMP Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Berita" value={18} icon="📰" color="bg-indigo-100 text-indigo-700" />
        <StatCard title="Total Guru" value={32} icon="👨‍🏫" color="bg-teal-100 text-teal-700" />
        <StatCard title="Pengumuman Aktif" value={3} icon="📢" color="bg-orange-100 text-orange-700" />
        <StatCard title="Pendaftar PPDB" value={64} icon="📝" color="bg-pink-100 text-pink-700" />
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Aktivitas Terakhir</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-xs">
                  NEW
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Guru baru ditambahkan</p>
                  <p className="text-sm text-gray-500">1 hari yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Distribusi Guru</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Tetap</span>
                <span className="text-sm font-medium text-gray-700">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Honorer</span>
                <span className="text-sm font-medium text-gray-700">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
