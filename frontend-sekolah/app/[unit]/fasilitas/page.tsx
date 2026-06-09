"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-toastify";
import PublicLayout from "@/components/PublicLayout";
import { ChevronRight, X, Maximize2, Image as ImageIcon } from "lucide-react";

interface ProgramFasilitas {
  id: number;
  nama: string;
  slug: string;
  deskripsi: string | null;
  ikon: string | null;
  url: string | null;
  unit: string;
}

export default function FasilitasPage() {
  const params = useParams();
  const unit = params.unit as "sd" | "smp";

  const [items, setItems] = useState<ProgramFasilitas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const response = await api.get(`/program-fasilitas?unit=${unit}`);
      // Filter only items with images (ikon) to show in the photo masonry grid
      const itemsWithImages = response.data.filter((item: ProgramFasilitas) => item.ikon);
      setItems(itemsWithImages);
    } catch {
      toast.error("Gagal mengambil data fasilitas.");
    } finally {
      setIsLoading(false);
    }
  }, [unit]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <PublicLayout unit={unit}>
      <div className="pt-6 pb-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tosca-500 mb-8">
            <Link href={`/${unit}`} className="hover:text-tosca-700 transition-colors">
              Beranda
            </Link>
            <ChevronRight size={12} className="text-tosca-200" />
            <Link href="#" className="hover:text-tosca-700 transition-colors">
              Profil Sekolah
            </Link>
            <ChevronRight size={12} className="text-tosca-200" />
            <span className="text-tosca-700">Fasilitas Sekolah</span>
          </nav>

          {/* Heading */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-tosca-900 tracking-tight mb-2 uppercase">
              Fasilitas Sekolah
            </h1>
            <div className="h-1.5 w-24 bg-tosca-500 rounded-full mt-4"></div>
          </div>

          {/* Main Content */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-tosca-500"></div>
            </div>
          ) : (
            <>
              {items.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        if (item.ikon) {
                          setActiveImage(item.ikon);
                          setActiveTitle(item.nama);
                          setIsLightboxOpen(true);
                        }
                      }}
                      className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-tosca-200 shadow-[0_4px_20px_rgba(11,107,105,0.03)] hover:shadow-[0_10px_20px_rgba(11,107,105,0.12)] hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer group mb-6 relative"
                    >
                      {/* Image block */}
                      <div className="relative overflow-hidden w-full h-auto">
                        <img 
                          src={item.ikon || "/globe.svg"} 
                          alt={item.nama}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Hover Overlay with palette colors */}
                        <div className="absolute inset-0 bg-tosca-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 select-none">
                          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                            <Maximize2 size={16} strokeWidth={1.5} />
                          </div>
                          <h3 className="text-white text-lg font-black uppercase tracking-tight mb-2">
                            {item.nama}
                          </h3>
                          {item.deskripsi && (
                            <p className="text-tosca-50 text-xs font-medium leading-relaxed line-clamp-3">
                              {item.deskripsi}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-tosca-200 p-8 shadow-sm">
                  <ImageIcon size={48} strokeWidth={1.5} className="text-tosca-200 mx-auto mb-4" />
                  <h3 className="text-lg font-black text-tosca-900 mb-1">Fasilitas Belum Tersedia</h3>
                  <p className="text-tosca-700 font-bold text-sm">Dokumentasi fasilitas sekolah belum ditambahkan saat ini.</p>
                </div>
              )}
            </>
          )}

          {/* Fullscreen Lightbox */}
          {isLightboxOpen && activeImage && (
            <div 
              className="fixed inset-0 bg-tosca-900/95 backdrop-blur-sm z-[999] flex flex-col items-center justify-center p-4 animate-fade-in cursor-zoom-out"
              onClick={() => setIsLightboxOpen(false)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 text-white hover:text-tosca-200 transition-colors bg-tosca-700/50 p-3 rounded-full hover:bg-tosca-700 focus:outline-none"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              {/* Lightbox Content Container */}
              <div 
                className="max-w-4xl max-h-[85vh] relative flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-tosca-200/20 bg-tosca-900 shadow-2xl animate-zoom-in"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={activeImage} 
                  alt={activeTitle} 
                  className="max-w-full max-h-[75vh] object-contain rounded-t-2xl"
                />
                
                {/* Caption using white and dark tosca bg */}
                <div className="w-full bg-tosca-900/90 p-5 border-t border-tosca-700/50 text-center">
                  <h3 className="text-white text-lg font-black uppercase tracking-tight">{activeTitle}</h3>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
}
