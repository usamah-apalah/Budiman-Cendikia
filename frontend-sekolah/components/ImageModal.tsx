"use client";

import { X, Download, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, title }: ImageModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-5xl max-h-full flex flex-col items-center">
        <div className="absolute -top-12 left-0 right-0 flex justify-between items-center text-white px-2">
          <h4 className="font-bold text-sm md:text-base truncate max-w-[70%]">{title || "Preview Gambar"}</h4>
          <div className="flex gap-4">
             <a 
              href={imageUrl} 
              download 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Download Gambar"
             >
               <Download size={20} />
             </a>
             <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Tutup"
             >
               <X size={24} />
             </button>
          </div>
        </div>

        <div className="relative group w-full flex justify-center overflow-hidden rounded-2xl shadow-2xl bg-gray-900/50">
          <img 
            src={imageUrl} 
            alt={title || "Full preview"} 
            className="max-w-full max-h-[80vh] object-contain select-none"
          />
        </div>
        
        <p className="mt-4 text-gray-400 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
          <Maximize2 size={12} /> Klik area luar untuk menutup
        </p>
      </div>
    </div>
  );
}
