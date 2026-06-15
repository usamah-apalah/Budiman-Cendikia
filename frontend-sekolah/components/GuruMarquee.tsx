"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/lib/api";
import Link from "next/link";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [animationClass, setAnimationClass] = useState("");

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

  // JavaScript untuk mendeteksi posisi elemen dan menyuntikkan keyframes secara dinamis
  useEffect(() => {
    if (guru.length === 0 || !trackRef.current) return;

    const updateMarqueeAnimation = () => {
      if (!trackRef.current || !trackRef.current.children[guru.length]) return;

      // Mendapatkan offset kiri elemen pertama dari duplikasi (indeks ke-guru.length)
      // Ini adalah lebar total presisi dari satu siklus konten asli (termasuk gap)
      const cycleWidth = (trackRef.current.children[guru.length] as HTMLElement).offsetLeft;

      // Bersihkan style lama jika ada
      const existingStyle = document.getElementById(`marquee-style-${unit}`);
      if (existingStyle) {
        existingStyle.remove();
      }

      // Buat & injeksikan style CSS keyframe baru dengan pergeseran linear tak terputus
      const style = document.createElement("style");
      style.id = `marquee-style-${unit}`;
      style.innerHTML = `
        @keyframes marqueeScrollDynamic-${unit} {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${cycleWidth}px);
          }
        }
        .marquee-track-dynamic-${unit} {
          display: flex;
          gap: 32px;
          flex-shrink: 0;
          animation: marqueeScrollDynamic-${unit} 12s linear infinite;
        }
        .group:hover .marquee-track-dynamic-${unit} {
          animation-play-state: paused;
        }
      `;
      document.head.appendChild(style);
      setAnimationClass(`marquee-track-dynamic-${unit}`);
    };

    // Jalankan setelah render DOM siap
    const timer = setTimeout(updateMarqueeAnimation, 150);

    window.addEventListener("resize", updateMarqueeAnimation);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateMarqueeAnimation);
      const style = document.getElementById(`marquee-style-${unit}`);
      if (style) {
        style.remove();
      }
    };
  }, [guru, unit]);

  if (isLoading || guru.length === 0) return null;

  // Duplikasi data guru secara dinamis saat memuat halaman untuk teknik seamless loop
  const duplicatedGuru = [...guru, ...guru];

  return (
    <div className="relative w-full overflow-hidden py-10 group">
      {/* Efek gradien bayangan di sisi kiri dan kanan */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none"></div>

      {/* Track Marquee Pembungkus */}
      <div ref={trackRef} className={animationClass || "flex gap-8 shrink-0"}>
        {duplicatedGuru.map((item, index) => (
          <Link 
            key={`${item.id}-${index}`} 
            href={`/${unit}/guru/${item.id}`}
            className="w-64 bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-tosca-200 cursor-pointer group/card shrink-0"
          >
            <div className="aspect-[3/4] w-full bg-tosca-50 overflow-hidden relative">
              {item.foto ? (
                <img src={item.foto} alt={item.nama} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-tosca-500 font-black text-4xl">{item.nama.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className="p-6 text-center">
              <h4 className="text-lg font-black text-gray-800 leading-tight mb-1 group-hover/card:text-tosca-600 transition-colors">{item.nama}</h4>
              <p className="text-tosca-700 font-bold text-[10px] uppercase tracking-[0.2em]">{item.jabatan}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
