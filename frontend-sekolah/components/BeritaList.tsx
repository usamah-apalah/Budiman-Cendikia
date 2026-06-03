"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function BeritaList({ unit }: { unit: "sd" | "smp" }) {
  const [berita, setBerita] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBerita = async () => {
    try {
      const response = await api.get(`/berita?unit=${unit}`);
      setBerita(response.data.data);
    } catch (error) {
      toast.error("Gagal mengambil data berita.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, [unit]);

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    try {
      await api.delete(`/berita/${id}`);
      toast.success("Berita berhasil dihapus.");
      fetchBerita();
    } catch (error) {
      toast.error("Gagal menghapus berita.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-bold text-gray-700">Judul</th>
            <th className="px-6 py-4 font-bold text-gray-700">Kategori</th>
            <th className="px-6 py-4 font-bold text-gray-700">Status</th>
            <th className="px-6 py-4 font-bold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {berita.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-800 font-medium">{item.judul}</td>
              <td className="px-6 py-4 text-gray-600 capitalize">{item.kategori}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {item.is_published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
          {berita.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada berita.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
