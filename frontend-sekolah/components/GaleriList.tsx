"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import ImageModal from "./ImageModal";

interface Galeri {
  id: number;
  judul: string;
  image: string;
  deskripsi: string | null;
}

export default function GaleriList({ unit }: { unit: "sd" | "smp" }) {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/admin');
  
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const checkAdmin = () => {
      const token = localStorage.getItem("admin_token");
      const savedUnit = localStorage.getItem("admin_unit");
      // Hanya aktifkan mode admin jika di rute admin DAN token valid
      if (isDashboard && token && savedUnit === unit) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdmin();
  }, [unit, isDashboard]);

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

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (!confirm("Hapus foto dari galeri?")) return;
    const executeDelete = async () => {
      try {
        await api.delete(`/galeri/${id}`);
        toast.success("Foto berhasil dihapus.");
        setGaleri(prev => prev.filter(item => item.id !== id));
      } catch {
        toast.error("Gagal menghapus foto.");
      }
    };
    executeDelete();
  };

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tosca-500"></div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-2">
        {galeri.map((item, i) => {
          const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "-rotate-3", "rotate-3"];
          const rotation = rotations[i % rotations.length];

          return (
            <div 
              key={item.id} 
              onClick={(e) => {
                try {
                  const card = e.currentTarget;
                  if (card) {
                    const img = card.querySelector("img");
                    if (img) {
                      const src = img.getAttribute("src");
                      if (src) {
                        setSelectedImage(src);
                        setSelectedTitle(item.judul || "");
                        return;
                      }
                    }
                  }
                  // Fallback jika elemen tidak ditemukan
                  setSelectedImage(item.image || "");
                  setSelectedTitle(item.judul || "");
                } catch (err) {
                  console.error("Gagal membuka gambar galeri:", err);
                  setSelectedImage(item.image || "");
                  setSelectedTitle(item.judul || "");
                }
              }}
              className={`bg-white p-4 rounded-[32px] shadow-sm border border-gray-100 transition-all duration-500 cursor-pointer group hover:shadow-2xl hover:z-10 hover:scale-105 hover:rotate-0 ${rotation}`}
            >
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden mb-5">
                <img 
                  src={item.image || "/globe.svg"} 
                  alt={item.judul}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {isMounted && isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-100 z-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); }} 
                      className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-tosca-700 shadow-lg hover:bg-white transition-colors text-[10px] font-black uppercase tracking-widest"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, item.id)} 
                      className="bg-red-500 text-white px-3 py-1.5 rounded-xl shadow-lg hover:bg-red-600 transition-colors text-[10px] font-black uppercase tracking-widest"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-lg font-black text-gray-800 mb-1 group-hover:text-tosca-600 transition-colors leading-tight">{item.judul}</h3>
                <p className="text-gray-400 text-xs font-bold line-clamp-1 uppercase tracking-widest">{item.deskripsi || 'Dokumentasi Sekolah'}</p>
              </div>
            </div>
          );
        })}
        {galeri.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">Galeri masih kosong.</p>
          </div>
        )}
      </div>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageUrl={selectedImage || ""} 
        title={selectedTitle}
      />
    </>
  );
}
