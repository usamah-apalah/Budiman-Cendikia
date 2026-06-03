"use client";

import DashboardLayout from "@/components/DashboardLayout";
import BeritaForm from "@/components/BeritaForm";
import { useParams } from "next/navigation";

export default function TambahBeritaPage() {
  const params = useParams();
  const unit = params.unit as "sd" | "smp";

  return (
    <DashboardLayout unit={unit} title={`Tambah Berita ${unit.toUpperCase()}`}>
      <div className="max-w-4xl">
        <BeritaForm unit={unit} />
      </div>
    </DashboardLayout>
  );
}
