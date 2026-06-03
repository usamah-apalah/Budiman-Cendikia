"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function GuruList({ unit }: { unit: "sd" | "smp" }) {
  const [guru, setGuru] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGuru = async () => {
    try {
      const response = await api.get(`/guru?unit=${unit}`);
      setGuru(response.data);
    } catch (error) {
      toast.error("Gagal mengambil data guru.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuru();
  }, [unit]);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data guru ini?")) return;
    try {
      await api.delete(`/guru/${id}`);
      toast.success("Data guru berhasil dihapus.");
      fetchGuru();
    } catch (error) {
      toast.error("Gagal menghapus data.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-bold text-gray-700">Nama</th>
            <th className="px-6 py-4 font-bold text-gray-700">Jabatan</th>
            <th className="px-6 py-4 font-bold text-gray-700">Mapel</th>
            <th className="px-6 py-4 font-bold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {guru.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-800 font-medium">{item.nama}</td>
              <td className="px-6 py-4 text-gray-600">{item.jabatan}</td>
              <td className="px-6 py-4 text-gray-600">{item.mata_pelajaran || '-'}</td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
