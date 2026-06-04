"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { useParams } from "next/navigation";
import api from "@/lib/api";

interface Guru {
  id: number;
  nama: string;
  jabatan: string;
  mata_pelajaran: string | null;
  foto: string | null;
}

export default function PublicGuruPage() {
  const params = useParams();
  const unit = params.unit as "sd" | "smp";
  const [guru, setGuru] = useState<Guru[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const response = await api.get(`/guru?unit=${unit}`);
        setGuru(response.data);
      } catch (error) {
        console.error("Gagal mengambil data guru:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuru();
  }, [unit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-12");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [guru]); // Re-run when guru data loads

  const kepalaSekolah = guru.length > 0 ? guru[0] : null;
  const daftarGuru = guru.length > 1 ? guru.slice(1) : [];

  return (
    <PublicLayout unit={unit}>
      <div className="pt-32 pb-32 bg-[#F8FAFC] min-h-screen">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-20 scroll-animate opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-tosca-50 text-tosca-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-tosca-100">
            Tim Akademik
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Guru dan Tenaga Kependidikan
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Mengenal lebih dekat para pendidik dan profesional yang membimbing
            putra-putri Anda menuju masa depan cemerlang.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-tosca-500 border-gray-200"></div>
            </div>
          ) : (
            <>
              {/* Profil Staf Inti (Horizontal Card) */}
              {kepalaSekolah && (
                <div className="bg-white rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500 scroll-animate opacity-0 translate-y-12">
                  <div className="w-full md:w-1/3 bg-tosca-50 flex-shrink-0 overflow-hidden">
                    <img
                      src={
                        kepalaSekolah.foto ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(kepalaSekolah.nama)}&background=2FCFC9&color=fff&size=512`
                      }
                      alt={kepalaSekolah.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 aspect-square md:aspect-auto"
                    />
                  </div>
                  <div className="p-10 md:p-14 flex flex-col justify-center flex-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-tosca-900 pointer-events-none transform -rotate-12">
                      <Quote size={120} />
                    </div>

                    <span className="text-sm font-black text-tosca-500 uppercase tracking-widest mb-2 block">
                      {kepalaSekolah.jabatan}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                      {kepalaSekolah.nama}
                    </h2>

                    <div className="relative">
                      <p className="text-lg text-gray-500 font-medium leading-relaxed italic relative z-10">
                        &quot;Pendidikan bukan sekadar transfer ilmu, melainkan
                        proses menumbuhkan karakter, menggali potensi, dan
                        menginspirasi siswa untuk menjadi pembelajar sepanjang
                        hayat. Kami berkomitmen memberikan lingkungan terbaik
                        bagi perkembangan mereka.&quot;
                      </p>
                    </div>

                    {kepalaSekolah.mata_pelajaran && (
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                          Mata Pelajaran
                        </span>
                        <span className="text-gray-800 font-bold">
                          {kepalaSekolah.mata_pelajaran}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Grid Daftar Guru */}
              {daftarGuru.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {daftarGuru.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-tosca-200 transition-all duration-500 group flex flex-col items-center text-center scroll-animate opacity-0 translate-y-12"
                      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                    >
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-tosca-50 mb-6 border-4 border-white shadow-lg relative">
                        <img
                          src={
                            item.foto ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&background=2FCFC9&color=fff&size=256`
                          }
                          alt={item.nama}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between w-full">
                        <div>
                          <h4 className="text-lg font-black text-gray-800 leading-tight mb-2 group-hover:text-tosca-700 transition-colors">
                            {item.nama}
                          </h4>
                          <span className="inline-block px-3 py-1 bg-tosca-50 text-tosca-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            {item.jabatan}
                          </span>
                        </div>

                        {item.mata_pelajaran && (
                          <div className="pt-4 border-t border-gray-50 mt-auto w-full">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                              Pengampu
                            </p>
                            <p className="text-gray-700 text-sm font-bold">
                              {item.mata_pelajaran}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
