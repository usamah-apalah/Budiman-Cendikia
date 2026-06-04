"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

interface Galeri {
  id: number;
  judul: string;
  image: string;
  deskripsi: string | null;
}

export default function GaleriList({ unit }: { unit: "sd" | "smp" }) {
  const [galeri, setGaleri] = useState<Galeri[]>([]);
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

  const fetchGaleri = useCallback(async () => {
    try {
      const response = await api.get(`/galeri?unit=${unit}`);
      setGaleri(response.data);
    } catch {
      toast.error("Gagal mengambil data galeri.");
    } finally {
      setIsLoading(false);
    }
  }, [unit]);

  useEffect(() => {
    fetchGaleri();
  }, [fetchGaleri]);

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;
    if (!confirm("Hapus foto dari galeri?")) return;
    try {
      await api.delete(`/galeri/${id}`);
      toast.success("Foto berhasil dihapus.");
      fetchGaleri();
    } catch {
      toast.error("Gagal menghapus foto.");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tosca-500"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galeri.map((item) => (
        <div key={item.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="relative h-56 overflow-hidden">
            <img 
              src={item.image || "/globe.svg"} 
              alt={item.judul}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-tosca-700 shadow-lg hover:bg-white transition-colors text-xs font-bold">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500/90 backdrop-blur px-3 py-1 rounded-xl text-white shadow-lg hover:bg-red-600 transition-colors text-xs font-bold">Hapus</button>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-lg font-black text-gray-800 mb-2 group-hover:text-tosca-700 transition-colors">{item.judul}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 font-medium">{item.deskripsi || 'Tidak ada deskripsi.'}</p>
          </div>
        </div>
      ))}
      {galeri.length === 0 && (
        <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">Galeri masih kosong.</p>
        </div>
      )}
    </div>
  );
}
