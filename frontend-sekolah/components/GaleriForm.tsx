"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function GaleriForm({ unit }: { unit: "sd" | "smp" }) {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return toast.error("Silakan pilih gambar terlebih dahulu.");
    setIsLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", image);
      uploadData.append("path", `galeri/${unit}`);
      const uploadRes = await api.post("/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      await api.post("/galeri", {
        unit,
        judul,
        deskripsi,
        image: uploadRes.data.url,
      });
      toast.success("Foto berhasil ditambahkan ke galeri!");
      router.push(`/admin/${unit}/galeri`);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal menambahkan foto.";
      toast.error(msg);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
           <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Preview Gambar</label>
           <div className="relative aspect-video rounded-[32px] border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center group hover:border-tosca-500 transition-all">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                   <span className="text-5xl mb-2 block">📸</span>
                   <p className="text-xs font-bold text-gray-400">Pilih file gambar</p>
                </div>
              )}
              <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
           </div>
        </div>
        <div className="space-y-6">
           <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Judul Foto</label>
              <input type="text" value={judul} onChange={e => setJudul(e.target.value)} required className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none" placeholder="Contoh: Lomba Mewarnai 2026" />
           </div>
           <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Deskripsi Singkat</label>
              <textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={4} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none" placeholder="Ceritakan sedikit tentang foto ini..."></textarea>
           </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-8 py-3 rounded-xl font-bold text-gray-400">Batal</button>
        <button type="submit" disabled={isLoading} className={`px-12 py-3 rounded-2xl text-white font-black text-xs uppercase tracking-widest bg-tosca-500 hover:bg-tosca-700 transition-all ${isLoading ? 'opacity-70' : ''}`}>
          {isLoading ? 'Mengupload...' : 'Unggah ke Galeri'}
        </button>
      </div>
    </form>
  );
}
