"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Guru {
  id: number;
  nama: string;
  jabatan: string;
  mata_pelajaran: string | null;
  foto: string | null;
}

export default function GuruMarquee({ unit }: { unit: "sd" | "smp" }) {
  const [guru, setGuru] = useState<Guru[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const response = await api.get(`/guru?unit=${unit}`);
        setGuru(response.data);
      } catch (error) {
        console.error("Gagal mengambil data guru:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuru();
  }, [unit]);

  if (isLoading || guru.length === 0) return null;

  // Menduplikasi data agar animasi marquee bisa berulang tanpa terputus (seamless loop)
  const duplicatedGuru = [...guru, ...guru];

  return (
    <div className="relative w-full overflow-hidden py-10 group">
      {/* Efek gradien di ujung kiri dan kanan untuk memperhalus masuk/keluarnya elemen */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#F8FAFC] to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#F8FAFC] to-transparent z-10"></div>

      <div className="flex w-max animate-marquee">
        {duplicatedGuru.map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            className="w-72 mx-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-2 hover:border-tosca-200 cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden bg-tosca-50 mb-4 border-4 border-white shadow-lg">
              <img 
                src={item.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&background=2FCFC9&color=fff&size=128`} 
                alt={item.nama} 
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-lg font-black text-gray-800 leading-tight mb-1">{item.nama}</h4>
            <p className="text-tosca-700 font-bold text-xs uppercase tracking-widest">{item.jabatan}</p>
            {item.mata_pelajaran && (
               <p className="mt-2 text-gray-400 text-sm font-medium">{item.mata_pelajaran}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
