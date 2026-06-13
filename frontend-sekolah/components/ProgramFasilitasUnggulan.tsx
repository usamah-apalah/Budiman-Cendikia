"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Maximize2, ImageIcon } from "lucide-react";
import ShareableImageModal from "./ShareableImageModal";
import "./ProgramFasilitasUnggulan.css";

// Interface untuk item Program & Fasilitas dari database/admin
interface ProgramItem {
  id: number;
  nama: string;
  deskripsi: string;
  ikon: string | null;
  slug: string;
}

// Props komponen
interface ProgramFasilitasUnggulanProps {
  unit: "sd" | "smp";
  programFasilitas: ProgramItem[];
}

export default function ProgramFasilitasUnggulan({ unit, programFasilitas }: ProgramFasilitasUnggulanProps) {
  // Fallback data: antisipasi jika parameter tidak didefinisikan
  const rawItems = programFasilitas || [];

  // FILTER DINAMIS: Hanya meload gambar yang datanya ada dari database admin (menghindari gambar kosong/hilang)
  const items = rawItems.filter((item) => item && item.ikon);

  // State untuk melacak rasio aspek gambar secara dinamis (portrait, landscape, square)
  const [aspectRatios, setAspectRatios] = useState<Record<number, "portrait" | "landscape" | "square">>({});

  // State untuk mengontrol Lightbox modal
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    imageUrl: "",
    title: "",
    description: ""
  });

  // Reference ke elemen backdrop lightbox untuk mendeteksi klik luar secara aman
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Efek keyboard event untuk menutup lightbox dengan tombol 'Escape' secara aman
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      try {
        if (e.key === "Escape") {
          setLightbox(prev => ({ ...prev, isOpen: false }));
        }
      } catch (err) {
        console.error("Gagal memproses event escape keyboard:", err);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fungsi JavaScript untuk membuka Lightbox dengan error handling & try-catch
  const openLightbox = (url: string, name: string, desc: string) => {
    try {
      // Antisipasi variabel undefined
      const targetUrl = url || "";
      const targetName = name || "Preview";
      const targetDesc = desc || "";

      if (targetUrl) {
        setLightbox({
          isOpen: true,
          imageUrl: targetUrl,
          title: targetName,
          description: targetDesc
        });
      }
    } catch (err) {
      console.error("Gagal membuka lightbox:", err);
    }
  };

  // Fungsi JavaScript untuk mendeteksi rasio aspek gambar saat dimuat secara dinamis
  const handleImageLoad = (id: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    try {
      const img = e.currentTarget;
      
      // Antisipasi Error: Memastikan element img valid dan tidak undefined sebelum dibaca
      if (img && img.naturalWidth && img.naturalHeight) {
        const ratio = img.naturalWidth / img.naturalHeight;
        
        let determinedAspect: "portrait" | "landscape" | "square" = "square";
        if (ratio < 0.8) {
          determinedAspect = "portrait";
        } else if (ratio > 1.25) {
          determinedAspect = "landscape";
        }
        
        setAspectRatios(prev => ({
          ...prev,
          [id]: determinedAspect
        }));
      }
    } catch (err) {
      console.error(`Gagal mendeteksi rasio gambar id ${id}:`, err);
    }
  };

  // Fungsi untuk mendapatkan kelas layout masonry default berdasarkan index (sebelum onload terpicu)
  const getDefaultAspectClass = (index: number): "portrait" | "landscape" | "square" => {
    const pattern: ("portrait" | "landscape" | "square")[] = ["portrait", "landscape", "square", "portrait", "square", "landscape"];
    return pattern[index % pattern.length] || "square";
  };

  return (
    <section className="program-fasilitas-section">
      <div className="program-fasilitas-container">
        
        {/* Header Sejajar (Flexbox) */}
        <div className="program-fasilitas-header">
          {/* Teks di Kiri */}
          <h2 className="program-fasilitas-title">
            Fasilitas Unggulan
          </h2>
          
          {/* Tombol Lihat Semua di Kanan (Hover Effect 3D Tosca) */}
          <Link href={`/${unit}/fasilitas`} className="program-fasilitas-btn">
            Lihat Semua <span style={{ transition: "transform 0.2s" }}>→</span>
          </Link>
        </div>

        {/* Dynamic Masonry Grid Layout */}
        {items.length > 0 ? (
          <div className="program-fasilitas-grid">
            {items.map((item, index) => {
              const imageSrc = item.ikon || "";
              const aspectClass = aspectRatios[item.id] || getDefaultAspectClass(index);

              return (
                <div
                  key={item.id || index}
                  className={`masonry-item ${aspectClass} ${item.nama.toLowerCase().includes("outing") ? "outing-class-card" : ""}`}
                  onClick={() => {
                    openLightbox(imageSrc, item.nama, item.deskripsi || "");
                  }}
                >
                  {/* Image Container */}
                  <div className="masonry-image-wrapper">
                    <img
                      src={imageSrc}
                      alt={item.nama || "Fasilitas"}
                      className="masonry-image"
                      onLoad={(e) => handleImageLoad(item.id, e)}
                      onError={(e) => {
                        // Antisipasi gambar rusak dengan menyembunyikan / menangani error secara aman
                        try {
                          const target = e.currentTarget;
                          if (target) {
                            // Beri fallback minimal jika gambar gagal load
                            target.style.display = "none";
                          }
                        } catch (err) {
                          console.error("Gagal menangani error loading gambar:", err);
                        }
                      }}
                    />
                  </div>

                  {/* Expand Icon di pojok kanan atas */}
                  <div className="masonry-expand-icon">
                    <Maximize2 size={16} />
                  </div>

                  {/* Konten Teks Kartu (Tersembunyi secara default, muncul saat hover) */}
                  <div className="masonry-content">
                    {/* Badge Tipe */}
                    <span className="masonry-badge">
                      {item.slug ? "Unggulan" : "Fasilitas"}
                    </span>
                    
                    {/* Judul Fasilitas */}
                    <h3 className="masonry-name">
                      {item.nama || "Fasilitas Sekolah"}
                    </h3>
                    
                    {/* Deskripsi Singkat */}
                    <p className="masonry-desc">
                      {item.deskripsi || "Sarana prasarana penunjang kegiatan belajar mengajar terbaik."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Tampilan Fallback jika data kosong (Antisipasi Admin Hapus Semua Foto)
          <div className="masonry-fallback-card">
            <ImageIcon size={48} style={{ color: "#0FA8A4", marginBottom: "16px" }} />
            <h3 className="masonry-fallback-title">Foto Belum Tersedia</h3>
            <p className="masonry-fallback-desc">
              Dokumentasi fasilitas sekolah saat ini sedang diperbarui oleh administrator.
            </p>
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        <ShareableImageModal
          isOpen={lightbox.isOpen}
          onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
          imageUrl={lightbox.imageUrl}
          title={lightbox.title}
          description={lightbox.description}
        />

      </div>
    </section>
  );
}
