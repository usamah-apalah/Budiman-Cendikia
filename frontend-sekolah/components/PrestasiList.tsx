"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

interface Prestasi {
  id: number;
  judul: string;
  konten: string;
  tanggal: string;
  image: string | null;
  kategori: string;
}

export default function PrestasiList({ unit }: { unit: "sd" | "smp" }) {
  const [prestasi, setPrestasi] = useState<Prestasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem("admin_token");
      const savedUnit = localStorage.getItem("admin_unit");
      if (token && savedUnit === unit) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdmin();
  }, [unit]);

  const fetchPrestasi = useCallback(async () => {
    try {
      const response = await api.get(`/prestasi?unit=${unit}`);
      setPrestasi(response.data);
    } catch {
      toast.error("Gagal mengambil data prestasi.");
    } finally {
      setIsLoading(false);
    }
  }, [unit]);

  useEffect(() => {
    fetchPrestasi();
  }, [fetchPrestasi]);

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;
    if (!confirm("Hapus data prestasi ini?")) return;
    try {
      await api.delete(`/prestasi/${id}`);
      toast.success("Prestasi berhasil dihapus.");
      fetchPrestasi();
    } catch {
      toast.error("Gagal menghapus prestasi.");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tosca-500"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {prestasi.map((item) => (
        <div key={item.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col">
          <div className="relative h-48 overflow-hidden bg-tosca-50 flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <span className="text-5xl text-tosca-200">Prestasi</span>
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur text-tosca-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm flex items-center gap-1">
                {item.kategori}
              </span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-black text-gray-800 mb-2 leading-tight group-hover:text-tosca-700 transition-colors">{item.judul}</h3>
            <p className="text-gray-400 text-xs font-bold mb-4 flex items-center gap-1">
              {new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">{item.konten}</p>
            {isAdmin && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                <button className="text-tosca-700 font-bold text-sm hover:underline flex items-center gap-1">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 font-bold text-sm hover:underline flex items-center gap-1">Hapus</button>
              </div>
            )}
          </div>
        </div>
      ))}
      {prestasi.length === 0 && (
        <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-dashed border-gray-300">
          <p className="text-gray-400 font-bold">Belum ada data prestasi tercatat.</p>
        </div>
      )}
    </div>
  );
}
