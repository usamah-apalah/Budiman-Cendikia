"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PrestasiForm({ unit }: { unit: "sd" | "smp" }) {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [kategori, setKategori] = useState("siswa");
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
        uploadData.append("path", `prestasi/${unit}`);
        const uploadRes = await api.post("/upload", uploadData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        imageUrl = uploadRes.data.url;
      }

      await api.post("/prestasi", {
        unit,
        judul,
        konten,
        tanggal,
        kategori,
        image: imageUrl,
      });
      toast.success("Prestasi berhasil dicatat!");
      router.push(`/admin/${unit}/prestasi`);
    } catch {
      toast.error("Gagal menyimpan data prestasi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="space-y-6">
            <div>
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Judul Prestasi</label>
               <input type="text" value={judul} onChange={e => setJudul(e.target.value)} required className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none font-bold" placeholder="Contoh: Juara 1 OSN Matematika" />
            </div>
            <div>
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tanggal Perolehan</label>
               <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} required className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none" />
            </div>
            <div>
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Kategori</label>
               <select value={kategori} onChange={e => setKategori(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none appearance-none cursor-pointer">
                  <option value="siswa">Siswa</option>
                  <option value="guru">Guru</option>
                  <option value="sekolah">Sekolah</option>
               </select>
            </div>
            <div>
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Keterangan / Detail</label>
               <textarea value={konten} onChange={e => setKonten(e.target.value)} rows={5} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-tosca-500/10 focus:border-tosca-500 outline-none" placeholder="Jelaskan detail prestasi yang diraih..."></textarea>
            </div>
         </div>

         <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Foto Dokumentasi</label>
            <div className="relative aspect-[4/3] rounded-[32px] border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center group hover:border-tosca-500 transition-all">
               {preview ? (
                 <img src={preview} alt="Preview" className="w-full h-full object-cover" />
               ) : (
                 <div className="text-center">
                    <p className="text-xs font-bold text-gray-400">Pilih foto prestasi</p>
                 </div>
               )}
               <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
            </div>
         </div>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-8 py-3 rounded-xl font-bold text-gray-400">Batal</button>
        <button type="submit" disabled={isLoading} className={`px-12 py-3 rounded-2xl text-white font-black text-xs uppercase tracking-widest bg-tosca-500 hover:bg-tosca-700 transition-all ${isLoading ? 'opacity-70' : ''}`}>
          {isLoading ? 'Menyimpan...' : 'Simpan Prestasi'}
        </button>
      </div>
    </form>
  );
}
