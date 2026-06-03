"use client";

import DashboardLayout from "@/components/DashboardLayout";
import GuruList from "@/components/GuruList";
import { useParams } from "next/navigation";

export default function GuruPage() {
  const params = useParams();
  const unit = params.unit as "sd" | "smp";

  return (
    <DashboardLayout unit={unit} title={`Data Guru ${unit.toUpperCase()}`}>
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">Manajemen data guru dan tenaga kependidikan.</p>
        <button className={`${unit === 'sd' ? 'bg-blue-600' : 'bg-indigo-700'} text-white px-6 py-2 rounded-xl font-bold transition`}>
          ➕ Tambah Guru
        </button>
      </div>
      <GuruList unit={unit} />
    </DashboardLayout>
  );
}
