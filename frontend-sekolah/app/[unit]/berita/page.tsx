"use client";

import PublicLayout from "@/components/PublicLayout";
import BeritaList from "@/components/BeritaList";
import { useParams } from "next/navigation";

export default function PublicBeritaPage() {
  const params = useParams();
  const unit = params.unit as "sd" | "smp";

  return (
    <PublicLayout unit={unit}>
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Berita & Artikel</h1>
            <p className="text-gray-500 font-medium italic">Informasi terkini dan liputan kegiatan unit {unit.toUpperCase()}.</p>
          </div>
          <BeritaList unit={unit} />
        </div>
      </div>
    </PublicLayout>
  );
}
