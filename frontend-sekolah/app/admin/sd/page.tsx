"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";

export default function SDDashboard() {
  return (
    <DashboardLayout unit="sd" title="SD Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Berita" value={12} icon="📰" color="bg-blue-100 text-blue-600" />
        <StatCard title="Total Guru" value={24} icon="👨‍🏫" color="bg-green-100 text-green-600" />
        <StatCard title="Pengumuman Aktif" value={5} icon="📢" color="bg-yellow-100 text-yellow-600" />
        <StatCard title="Pendaftar PPDB" value={48} icon="📝" color="bg-purple-100 text-purple-600" />
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Aktivitas Terakhir</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  NEW
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Berita baru ditambahkan</p>
                  <p className="text-sm text-gray-500">2 jam yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Status PPDB</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Diterima</span>
                <span className="text-sm font-medium text-gray-700">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Pending</span>
                <span className="text-sm font-medium text-gray-700">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
