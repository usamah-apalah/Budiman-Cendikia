"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

interface Agenda {
  id: number;
  judul: string;
  konten: string;
  tanggal: string;
  lokasi: string | null;
  image: string | null;
}

export default function AgendaList({ unit }: { unit: "sd" | "smp" }) {
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem("admin_token");
      const savedUnit = localStorage.getItem("admin_unit");
      if (token && savedUnit === unit) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdmin();
  }, [unit]);

  const fetchAgenda = useCallback(async () => {
    try {
      const response = await api.get(`/agenda?unit=${unit}`);
      setAgenda(response.data);
    } catch {
      toast.error("Gagal mengambil data agenda.");
    } finally {
      setIsLoading(false);
    }
  }, [unit]);

  useEffect(() => {
    fetchAgenda();
  }, [fetchAgenda]);

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;
    if (!confirm("Hapus agenda ini?")) return;
    try {
      await api.delete(`/agenda/${id}`);
      toast.success("Agenda berhasil dihapus.");
      fetchAgenda();
    } catch {
      toast.error("Gagal menghapus agenda.");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tosca-500"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {agenda.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all group relative">
          <div className="flex-shrink-0 flex flex-row md:flex-col gap-4 items-center">
             <div className="w-20 h-24 bg-tosca-50 rounded-2xl flex flex-col items-center justify-center border border-tosca-100 group-hover:bg-tosca-500 transition-colors">
               <span className="text-xs font-black text-tosca-700 uppercase group-hover:text-white/80">
                 {new Date(item.tanggal).toLocaleDateString('id-ID', { month: 'short' })}
               </span>
               <span className="text-3xl font-black text-tosca-900 group-hover:text-white">
                 {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit' })}
               </span>
             </div>
             {item.image && (
               <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                 <img src={item.image} alt="" className="w-full h-full object-cover" />
               </div>
             )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-gray-800 mb-2 group-hover:text-tosca-700 transition-colors">{item.judul}</h3>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-3 uppercase tracking-widest">
              <span>{item.lokasi || 'Sekolah'}</span>
            </div>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{item.konten}</p>
          </div>
          {isAdmin && (
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1 bg-white border border-gray-100 text-tosca-700 hover:bg-tosca-50 rounded-xl text-xs font-bold shadow-sm">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-white border border-gray-100 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold shadow-sm">Hapus</button>
            </div>
          )}
        </div>
      ))}
      {agenda.length === 0 && (
        <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-dashed border-gray-300">
          <p className="text-gray-400 font-bold">Belum ada agenda mendatang.</p>
        </div>
      )}
    </div>
  );
}
