"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

interface Berita {
  id: number;
  judul: string;
  kategori: string;
  thumbnail: string | null;
  is_published: boolean;
}

export default function BeritaList({ unit }: { unit: "sd" | "smp" }) {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/admin');
  
  const [berita, setBerita] = useState<Berita[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("admin_token");
    const savedUnit = localStorage.getItem("admin_unit");
    // Hanya set isAdmin true jika di panel admin, token ada, DAN unit cocok
    if (isDashboard && token && savedUnit === unit) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [unit, isDashboard]);

  const fetchBerita = useCallback(async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const savedUnit = localStorage.getItem("admin_unit");
      const isActuallyAdmin = isDashboard && token && savedUnit === unit;
      
      const response = await api.get(`/berita?unit=${unit}${isActuallyAdmin ? '&show_all=1' : ''}`);
      setBerita(response.data.data);
    } catch {
      toast.error("Gagal mengambil data berita.");
    } finally {
      setIsLoading(false);
    }
  }, [unit, isDashboard]);

  useEffect(() => {
    fetchBerita();
  }, [fetchBerita]);

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    try {
      await api.delete(`/berita/${id}`);
      toast.success("Berita berhasil dihapus.");
      fetchBerita();
    } catch {
      toast.error("Gagal menghapus berita.");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tosca-500"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {berita.map((item) => (
        <div key={item.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col">
          <div className="relative h-52 overflow-hidden bg-tosca-50 flex items-center justify-center">
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <span className="text-4xl text-tosca-200 font-black uppercase">Berita</span>
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur text-tosca-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                {item.kategori}
              </span>
            </div>
            {isMounted && isAdmin && (
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${item.is_published ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                  {item.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-black text-gray-800 mb-4 line-clamp-2 leading-tight group-hover:text-tosca-700 transition-colors">
              {item.judul}
            </h3>
            
            {isMounted && isAdmin && (
              <div className="mt-auto pt-6 border-t border-gray-50 flex justify-end gap-3">
                <button className="text-tosca-700 hover:text-tosca-900 font-bold text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {berita.length === 0 && (
        <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">Belum ada berita yang diterbitkan.</p>
        </div>
      )}
    </div>
  );
}
