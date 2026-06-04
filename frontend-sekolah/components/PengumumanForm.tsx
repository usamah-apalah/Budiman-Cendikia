"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PengumumanForm({ unit }: { unit: "sd" | "smp" }) {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [isAktif, setIsAktif] = useState(true);
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
    setIsLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const uploadData = new FormData();
        uploadData.append("file", image);
        uploadData.append("path", `pengumuman/${unit}`);
        const uploadRes = await api.post("/upload", uploadData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        imageUrl = uploadRes.data.url;
      }

      await api.post("/pengumuman", {
        unit,
        judul,
        isi,
        image: imageUrl,
        is_aktif: isAktif,
      });
      toast.success("Pengumuman berhasil diterbitkan!");
      router.push(`/admin/${unit}/pengumuman`);
    } catch {
      toast.error("Gagal menerbitkan pengumuman.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-6">
            <div>
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Judul Pengumuman</label>
               <input type="text" value={judul} onChange={e => setJudul(e.target.value)} required className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none font-bold" placeholder="Judul informasi resmi..." />
            </div>
            <div>
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Isi Pengumuman</label>
               <textarea value={isi} onChange={e => setIsi(e.target.value)} rows={8} required className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none leading-relaxed" placeholder="Tuliskan detail pengumuman di sini..."></textarea>
            </div>
         </div>

         <div className="space-y-8">
            <div>
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Gambar Lampiran (Opsional)</label>
               <div className="relative aspect-square rounded-[32px] border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center group hover:border-tosca-500 transition-all">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                       <p className="text-xs font-bold text-gray-400">Pilih lampiran gambar</p>
                    </div>
                  )}
                  <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
               </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between">
               <div>
                  <p className="text-sm font-black text-gray-800 uppercase tracking-tighter">Status Aktif</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Muncul di halaman depan</p>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isAktif} onChange={e => setIsAktif(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tosca-500"></div>
               </label>
            </div>
         </div>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-8 py-3 rounded-xl font-bold text-gray-400">Batal</button>
        <button type="submit" disabled={isLoading} className={`px-12 py-3 rounded-2xl text-white font-black text-xs uppercase tracking-widest bg-tosca-500 hover:bg-tosca-700 transition-all ${isLoading ? 'opacity-70' : ''}`}>
          {isLoading ? 'Menerbitkan...' : 'Terbitkan Pengumuman'}
        </button>
      </div>
    </form>
  );
}
