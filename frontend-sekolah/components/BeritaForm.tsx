"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BeritaForm({ unit }: { unit: "sd" | "smp" }) {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [kategori, setKategori] = useState("umum");
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/berita", {
        unit,
        judul,
        konten,
        kategori,
        is_published: isPublished,
      });
      toast.success("Berita berhasil ditambahkan!");
      router.push(`/admin/${unit}/berita`);
    } catch (error) {
      toast.error("Gagal menambahkan berita.");
    } finally {
      setIsLoading(false);
    }
  };

  const themeBtn = unit === "sd" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-700 hover:bg-indigo-800";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita</label>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Masukkan judul berita..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="umum">Umum</option>
          <option value="prestasi">Prestasi</option>
          <option value="kegiatan">Kegiatan</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
        <textarea
          value={konten}
          onChange={(e) => setKonten(e.target.value)}
          required
          rows={10}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Tulis konten berita di sini..."
        ></textarea>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_published"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
          Publish Sekarang?
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-2 rounded-xl text-white font-bold transition flex items-center justify-center ${themeBtn} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Menyimpan...' : 'Simpan Berita'}
        </button>
      </div>
    </form>
  );
}
