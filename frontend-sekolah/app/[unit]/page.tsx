"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import PublicLayout from "@/components/PublicLayout";
import GuruMarquee from "@/components/GuruMarquee";
import AnimatedCounter from "@/components/AnimatedCounter";
import PPDBBadge from "@/components/PPDBBadge";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ChevronDown, Monitor, Calendar, Megaphone, Newspaper, MapPin, ChevronRight, Facebook } from "lucide-react";
import ProgramFasilitasUnggulan from "@/components/ProgramFasilitasUnggulan";
import { SITE_STATS } from "@/lib/constants";

interface NewsItem {
  id: number;
  judul: string;
  konten: string;
  kategori: string;
  thumbnail: string | null;
  slug: string;
  tanggal?: string | null;
}

interface PrestasiItem {
  id: number;
  judul: string;
  tingkat: string;
  tanggal: string;
}

interface ProgramItem {
  id: number;
  nama: string;
  deskripsi: string;
  ikon: string | null;
  url: string | null;
  slug: string;
}

interface AgendaItem {
  id: number;
  judul: string;
  konten: string;
  tanggal: string;
  lokasi: string | null;
  image: string | null;
}

interface PengumumanItem {
  id: number;
  judul: string;
  isi: string;
  image: string | null;
  is_aktif: boolean;
  created_at: string;
}

const getMonthName = (dateStr: string) => {
  const d = new Date(dateStr);
  const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
  return months[d.getMonth()];
};

const getDayNum = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.getDate().toString().padStart(2, "0");
};

export default function UnitPublicHomePage() {
  const params = useParams();
  const unitParam = params.unit as string;
  const isValidUnit = unitParam === "sd" || unitParam === "smp";
  
  const unit = isValidUnit ? (unitParam as "sd" | "smp") : "sd";
  const [stats, setStats] = useState(SITE_STATS[unit]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [latestArtikel, setLatestArtikel] = useState<NewsItem[]>([]);
  const [latestPrestasi, setLatestPrestasi] = useState<PrestasiItem[]>([]);
  const [programFasilitas, setProgramFasilitas] = useState<ProgramItem[]>([]);
  const [latestAgenda, setLatestAgenda] = useState<AgendaItem[]>([]);
  const [latestPengumuman, setLatestPengumuman] = useState<PengumumanItem[]>([]);
  const [isSambutanExpanded, setIsSambutanExpanded] = useState(false);

  useEffect(() => {
    if (!isValidUnit) return;
    
    const fetchStats = async () => {
      try {
        const res = await api.get(`/stats?unit=${unit}`);
        if (res.data.status === "success") {
          setStats({
            ...SITE_STATS[unit],
            ...res.data.data,
          });
        }
      } catch (e) {
        console.error("Failed to fetch stats:", e);
      }
    };

    const fetchLatest = async () => {
      try {
        const [newsRes, artikelRes, prestasiRes, programRes, agendaRes, pengumumanRes] = await Promise.all([
          api.get(`/berita?unit=${unit}`),
          api.get(`/artikel?unit=${unit}`),
          api.get(`/prestasi?unit=${unit}&limit=3`),
          api.get(`/program-fasilitas?unit=${unit}`),
          api.get(`/agenda?unit=${unit}`),
          api.get(`/pengumuman?unit=${unit}`)
        ]);
        setLatestNews(newsRes.data.data.slice(0, 3));
        setLatestArtikel(artikelRes.data.data.slice(0, 3));
        setLatestPrestasi(prestasiRes.data);
        setProgramFasilitas(programRes.data);
        setLatestAgenda(agendaRes.data.slice(0, 3));
        setLatestPengumuman(pengumumanRes.data.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
    fetchLatest();
  }, [unit, isValidUnit]);

  useEffect(() => {
    if (!isValidUnit) return;

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
  }, [latestNews, latestPrestasi, programFasilitas, unit, isValidUnit]);

  if (!isValidUnit) {
    notFound();
  }

  if (unit === "sd") {
    return (
      <PublicLayout unit="sd">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-tosca-50/50 -z-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-tosca-500/10 -z-10 blur-3xl rounded-full translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div
              className="animate-fade-in-right opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <PPDBBadge year="2026/2027" theme="sd" />
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
                Membangun Fondasi{" "}
                <span className="text-tosca-500">Masa Depan</span> Gemilang
              </h1>
              <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
                SD Budiman Cendikia menghadirkan pendidikan yang seimbang antara
                akademik, karakter, dan kreativitas untuk membekali anak Anda
                menjadi pemimpin masa depan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${unit}/ppdb`}
                  className="px-8 py-4 bg-tosca-500 text-white font-black rounded-2xl shadow-lg shadow-tosca-500/30 hover:bg-tosca-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs"
                >
                  Daftar Sekarang
                </Link>
                <Link
                  href={`/${unit}/galeri`}
                  className="px-8 py-4 bg-white text-tosca-700 font-black rounded-2xl border border-tosca-100 hover:bg-tosca-50 transition-all uppercase tracking-widest text-xs"
                >
                  Lihat Galeri
                </Link>
              </div>
            </div>
            <div
              className="relative animate-fade-in-left opacity-0 delay-200"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="aspect-square bg-tosca-200 rounded-[60px] rotate-3 relative overflow-hidden shadow-2xl">
                <img
                  src="/globe.svg"
                  alt="School"
                  className="w-full h-full object-cover -rotate-3 p-12 opacity-50"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 animate-fade-in-up opacity-0 delay-500"
                style={{ animationFillMode: "forwards" }}
              >
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-white text-2xl">
                  ⭐
                </div>
                <div>
                  <p className="font-black text-gray-900">Akreditasi A</p>
                  <p className="text-xs text-gray-400 font-bold">
                    Sekolah Unggulan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Siswa Aktif", end: stats.siswa, suffix: "+" },
              { label: "Tenaga Pengajar", end: stats.guru, suffix: "+" },
              { label: "Total Berita", end: stats.berita, suffix: "+" },
              { label: "Prestasi Nasional", end: stats.prestasi, suffix: "+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group scroll-animate opacity-0 translate-y-12 transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl font-black text-tosca-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-5 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <div className="relative">
                  <div className="absolute -inset-4 bg-tosca-100 rounded-[30px] md:rounded-[40px] -rotate-3 -z-10"></div>
                  <div className="aspect-[3/4] bg-gray-200 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl relative">
                    <img 
                      src="/globe.svg" 
                      alt="Kepala Sekolah SD" 
                      className="w-full h-full object-cover opacity-20 p-12 md:p-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tosca-900/20 to-transparent"></div>
                  </div>
                  <div className="mt-6 md:mt-8 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900">Dr. H. Ahmad Fauzi, M.Pd</h3>
                    <p className="text-tosca-600 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2">Kepala Sekolah SD Budiman Cendikia</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 scroll-animate opacity-0 translate-y-12 transition-all duration-700 delay-200">
                <span className="text-tosca-500 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] mb-2 md:mb-4 block">Welcome Message</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4 md:mb-8">
                  Sambutan <br className="hidden md:block" />
                  <span className="text-tosca-500">Kepala Sekolah</span>
                </h2>
                <div className="relative space-y-6 text-gray-500 text-lg leading-relaxed font-medium">
                  <p>
                    Assalamu&apos;alaikum Warahmatullahi Wabarakatuh,
                  </p>
                  <p>
                    Selamat datang di website resmi SD Budiman Cendikia. Kami bangga menjadi bagian dari perjalanan pendidikan putra-putri Anda. Di sini, kami tidak hanya fokus pada prestasi akademik, tetapi juga pembentukan karakter dan nilai-nilai keagamaan yang kuat.
                  </p>
                  <div className={`grid transition-all duration-1000 ease-in-out ${isSambutanExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className={`pt-6 space-y-6 transition-all duration-1000 delay-150 ${isSambutanExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <p className="text-gray-500/80">
                          Visi kami adalah mencetak generasi yang cerdas, kreatif, dan berakhlak mulia. Dengan dukungan tenaga pengajar yang kompeten dan fasilitas yang modern, kami berkomitmen memberikan lingkungan belajar yang terbaik.
                        </p>
                        <p className="text-gray-500/80">
                          Semoga kehadiran website ini dapat mempermudah komunikasi dan akses informasi bagi seluruh civitas akademika dan masyarakat luas. Mari bersama-sama membimbing putra-putri kita menuju masa depan yang gemilang.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gradient Fade Overlay */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                      isSambutanExpanded ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                    }`}
                  ></div>
                </div>
                <button 
                  onClick={() => setIsSambutanExpanded(!isSambutanExpanded)}
                  className="inline-flex items-center gap-2 mt-1 text-tosca-700 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all group py-2 px-3 rounded-xl hover:bg-tosca-50"
                >
                  <span className="relative">
                    {isSambutanExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-500 ease-in-out ${isSambutanExpanded ? "rotate-180" : "rotate-0 group-hover:translate-y-0.5"}`} 
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Terkini (Agenda, Pengumuman, Artikel) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              
              {/* Card 1: Agenda Kegiatan */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100/80 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Calendar size={18} className="text-tosca-500" />
                    Agenda
                  </h3>
                  <Link href={`/${unit}/agenda`} className="text-xs font-bold text-tosca-500 hover:text-tosca-700 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestAgenda.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestAgenda.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/agenda`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Date badge */}
                        <div className="w-[52px] h-[58px] bg-tosca-50 text-tosca-600 rounded-xl flex flex-col items-center justify-center border border-tosca-100/40 group-hover:bg-tosca-500 group-hover:border-tosca-500 transition-all duration-300 flex-shrink-0">
                          <span className="text-[9px] font-bold text-tosca-500 group-hover:text-white/85 uppercase tracking-widest leading-none mb-1">
                            {getMonthName(item.tanggal)}
                          </span>
                          <span className="text-lg font-extrabold text-tosca-700 group-hover:text-white leading-none">
                            {getDayNum(item.tanggal)}
                          </span>
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-600 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1 truncate">
                            <MapPin size={11} className="text-gray-300 flex-shrink-0" />
                            {item.lokasi || 'Budiman Cendikia'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Semua Kegiatan Terencana</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Jadwal kegiatan sekolah berikutnya sedang disiapkan. Tetap pantau halaman ini!
                    </p>
                  </div>
                )}
              </div>

              {/* Card 2: Pengumuman Resmi */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-150">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Megaphone size={18} className="text-tosca-500" />
                    Pengumuman
                  </h3>
                  <Link href={`/${unit}/pengumuman`} className="text-xs font-bold text-tosca-500 hover:text-tosca-700 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestPengumuman.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestPengumuman.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/pengumuman/${item.id}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Icon Container */}
                        <div className="w-[52px] h-[52px] bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center border border-yellow-100/40 group-hover:bg-yellow-500 group-hover:text-white group-hover:border-yellow-500 transition-all duration-300 flex-shrink-0">
                          <Megaphone size={18} />
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-600 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1">
                            <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-yellow-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-yellow-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 01-1.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Belum Ada Pengumuman</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Saat ini papan informasi bersih. Pengumuman penting akan disematkan di sini.
                    </p>
                  </div>
                )}
              </div>

              {/* Card 3: Artikel & Berita */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-300">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Newspaper size={18} className="text-tosca-500" />
                    Artikel
                  </h3>
                  <Link href={`/${unit}/artikel`} className="text-xs font-bold text-tosca-500 hover:text-tosca-700 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestArtikel.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestArtikel.slice(0, 3).map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/artikel/${item.slug}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0 bg-tosca-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300 relative shadow-sm">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl bg-tosca-50 text-tosca-400">
                              📰
                            </div>
                          )}
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-tosca-500 uppercase tracking-wider mb-0.5 block truncate">
                            {item.kategori}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-600 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          {item.tanggal && (
                            <span className="text-[11px] font-medium text-gray-400 mt-1 flex items-center gap-1">
                              <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                              {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Kabar Terbaru Segera Hadir</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Kami sedang menyusun berita dan cerita menarik seputar sekolah untuk Anda.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Prestasi Membanggakan */}
        {latestPrestasi.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <span className="text-tosca-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Achievements</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Prestasi <span className="text-tosca-600">Membanggakan</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestPrestasi.map((item, i) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-6 rounded-[12px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 scroll-animate opacity-0 translate-y-12"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1.5 bg-tosca-50 text-tosca-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-tosca-100">
                        {item.tingkat}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-800 leading-snug mb-4 line-clamp-2">
                      {item.judul}
                    </h3>
                    <div className="h-1.5 w-12 bg-tosca-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features / Program & Fasilitas */}
        <ProgramFasilitasUnggulan unit={unit} programFasilitas={programFasilitas} />

        {/* Facebook Section */}
        <section className="py-20 bg-tosca-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
                  <Facebook size={16} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Update Terbaru</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
                  Ikuti Kami di <span className="text-blue-600">Facebook</span>
                </h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl">
                  Jangan lewatkan informasi kegiatan terbaru, pengumuman penting, dan momen kebersamaan di sekolah kami. Ikuti halaman resmi kami untuk berita terkini.
                </p>
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href="https://facebook.com/sekolahbudimancendikia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
                  >
                    <Facebook size={18} fill="currentColor" />
                    Ikuti Halaman Kami
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square max-w-[300px] relative">
                <div className="absolute inset-0 bg-blue-100 rounded-[48px] rotate-6"></div>
                <div className="absolute inset-0 bg-white rounded-[48px] shadow-xl flex items-center justify-center p-10 border border-blue-50">
                  <Facebook size={120} className="text-blue-600 opacity-20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Facebook size={48} fill="currentColor" />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-gray-900 leading-none mb-1">Budiman Cendikia</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tenaga Pengajar Marquee */}
        <section className={`py-20 ${latestPrestasi.length > 0 ? 'bg-gray-50' : 'bg-white'} scroll-animate opacity-0 translate-y-12 transition-all duration-1000`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
              Tenaga Pengajar Profesional
            </h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">
              Dididik dan dibimbing oleh para ahli di bidangnya masing-masing.
            </p>
          </div>
          <GuruMarquee unit="sd" />
        </section>
      </PublicLayout>
    );
  }

  if (unit === "smp") {
    return (
      <PublicLayout unit="smp">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-tosca-900/5 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-tosca-700/5 -z-10 blur-3xl rounded-full -translate-x-1/4"></div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div
              className="order-2 md:order-1 animate-fade-in-right opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <PPDBBadge year="2026/2027" theme="smp" />
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                Eksplorasi Potensi,{" "}
                <span className="text-tosca-700">Raih Prestasi</span> Tanpa
                Batas
              </h1>
              <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
                SMP Budiman Cendikia fokus pada pengembangan kemandirian,
                penguasaan teknologi, and penguatan nilai keagamaan untuk
                mencetak remaja yang cerdas dan berkarakter.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/smp/ppdb"
                  className="px-10 py-5 bg-tosca-900 text-white font-black rounded-2xl shadow-xl shadow-tosca-900/30 hover:bg-tosca-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs"
                >
                  Mulai Pendaftaran
                </Link>
                <Link
                  href="/smp-old/dashboard"
                  className="px-10 py-5 bg-white text-tosca-900 font-black rounded-2xl border-2 border-tosca-900/10 hover:border-tosca-900 transition-all uppercase tracking-widest text-xs"
                >
                  Portal Data
                </Link>
              </div>
            </div>
            <div
              className="order-1 md:order-2 relative animate-fade-in-left opacity-0 delay-200"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="aspect-video bg-tosca-900 rounded-[48px] relative overflow-hidden shadow-2xl transform md:-rotate-2">
                <img
                  src="/globe.svg"
                  alt="SMP Life"
                  className="w-full h-full object-cover p-16 opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tosca-900/80 to-transparent flex items-end p-8">
                  <p
                    className="text-white font-bold italic animate-fade-in-up opacity-0 delay-500"
                    style={{ animationFillMode: "forwards" }}
                  >
                    &quot;Lingkungan belajar yang inspiratif dan modern.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats with Animated Counters */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Siswa Aktif", end: stats.siswa, suffix: "+" },
              { label: "Tenaga Pengajar", end: stats.guru, suffix: "+" },
              { label: "Total Berita", end: stats.berita, suffix: "+" },
              { label: "Prestasi Nasional", end: stats.prestasi, suffix: "+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group scroll-animate opacity-0 translate-y-12 transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl font-black text-tosca-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-5 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <div className="relative">
                  <div className="absolute -inset-4 bg-tosca-100 rounded-[30px] md:rounded-[40px] -rotate-3 -z-10"></div>
                  <div className="aspect-[3/4] bg-gray-200 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl relative">
                    <img 
                      src="/globe.svg" 
                      alt="Kepala Sekolah SMP" 
                      className="w-full h-full object-cover opacity-20 p-12 md:p-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tosca-900/20 to-transparent"></div>
                  </div>
                  <div className="mt-6 md:mt-8 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900">Drs. H. Mulyadi, M.Si</h3>
                    <p className="text-tosca-600 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2">Kepala Sekolah SMP Budiman Cendikia</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 scroll-animate opacity-0 translate-y-12 transition-all duration-700 delay-200">
                <span className="text-tosca-500 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] mb-2 md:mb-4 block">Welcome Message</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4 md:mb-8 uppercase">
                  Sambutan <br className="hidden md:block" />
                  <span className="text-tosca-700">Kepala Sekolah</span>
                </h2>
                <div className="relative space-y-6 text-gray-500 text-lg leading-relaxed font-medium">
                  <p>
                    Assalamu&apos;alaikum Warahmatullahi Wabarakatuh,
                  </p>
                  <p>
                    Selamat datang di lingkungan belajar SMP Budiman Cendikia. Kami berkomitmen untuk mendampingi putra-putri Anda melewati masa remaja dengan bimbingan yang tepat, kurikulum yang relevan, dan pembiasaan nilai-nilai Islami.
                  </p>
                  <div className={`grid transition-all duration-1000 ease-in-out ${isSambutanExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className={`pt-6 space-y-6 transition-all duration-1000 delay-150 ${isSambutanExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <p className="text-gray-500/80">
                          Di SMP Budiman Cendikia, kami mendorong setiap siswa untuk mengeksplorasi potensi diri, menguasai teknologi, dan memiliki kemandirian yang kuat. Bersama-sama, kita wujudkan generasi emas yang siap menghadapi tantangan zaman.
                        </p>
                        <p className="text-gray-500/80">
                          Website ini hadir sebagai jembatan informasi antara sekolah, orang tua, and masyarakat. Mari bersinergi menciptakan ekosistem pendidikan yang kondusif bagi tumbuh kembang generasi penerus bangsa.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gradient Fade Overlay */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                      isSambutanExpanded ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                    }`}
                  ></div>
                </div>
                <button 
                  onClick={() => setIsSambutanExpanded(!isSambutanExpanded)}
                  className="inline-flex items-center gap-2 mt-1 text-tosca-900 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all group py-2 px-3 rounded-xl hover:bg-tosca-50"
                >
                  <span className="relative">
                    {isSambutanExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-500 ease-in-out ${isSambutanExpanded ? "rotate-180" : "rotate-0 group-hover:translate-y-0.5"}`} 
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Terkini (Agenda, Pengumuman, Artikel) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              
              {/* Card 1: Agenda Kegiatan */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Calendar size={18} className="text-tosca-700" />
                    Agenda
                  </h3>
                  <Link href={`/${unit}/agenda`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestAgenda.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestAgenda.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/agenda`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Date badge */}
                        <div className="w-[52px] h-[58px] bg-tosca-50 text-tosca-700 rounded-xl flex flex-col items-center justify-center border border-tosca-100/40 group-hover:bg-tosca-700 group-hover:border-tosca-700 transition-all duration-300 flex-shrink-0">
                          <span className="text-[9px] font-bold text-tosca-700 group-hover:text-white/85 uppercase tracking-widest leading-none mb-1">
                            {getMonthName(item.tanggal)}
                          </span>
                          <span className="text-lg font-extrabold text-tosca-900 group-hover:text-white leading-none">
                            {getDayNum(item.tanggal)}
                          </span>
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1 truncate">
                            <MapPin size={11} className="text-gray-300 flex-shrink-0" />
                            {item.lokasi || 'Budiman Cendikia'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-700 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Semua Kegiatan Terencana</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Jadwal kegiatan sekolah berikutnya sedang disiapkan. Tetap pantau halaman ini!
                    </p>
                  </div>
                )}
              </div>

              {/* Card 2: Pengumuman Resmi */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-150">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Megaphone size={18} className="text-tosca-700" />
                    Pengumuman
                  </h3>
                  <Link href={`/${unit}/pengumuman`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestPengumuman.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestPengumuman.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/pengumuman/${item.id}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Icon Container */}
                        <div className="w-[52px] h-[52px] bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center border border-yellow-100/40 group-hover:bg-yellow-500 group-hover:text-white group-hover:border-yellow-500 transition-all duration-300 flex-shrink-0">
                          <Megaphone size={18} />
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1">
                            <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-yellow-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-yellow-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 01-1.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Belum Ada Pengumuman</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Saat ini papan informasi bersih. Pengumuman penting akan disematkan di sini.
                    </p>
                  </div>
                )}
              </div>

              {/* Card 3: Artikel & Berita */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-300">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Newspaper size={18} className="text-tosca-700" />
                    Artikel
                  </h3>
                  <Link href={`/${unit}/artikel`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestArtikel.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestArtikel.slice(0, 3).map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/artikel/${item.slug}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0 bg-tosca-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300 relative shadow-sm">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl bg-tosca-50 text-tosca-400">
                              📰
                            </div>
                          )}
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-tosca-700 uppercase tracking-wider mb-0.5 block truncate">
                            {item.kategori}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          {item.tanggal && (
                            <span className="text-[11px] font-medium text-gray-400 mt-1 flex items-center gap-1">
                              <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                              {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-700 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Kabar Terbaru Segera Hadir</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Kami sedang menyusun berita dan cerita menarik seputar sekolah untuk Anda.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Prestasi Membanggakan */}
        {latestPrestasi.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <span className="text-tosca-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Pride</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Prestasi <span className="text-tosca-700">Membanggakan</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestPrestasi.map((item, i) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-6 rounded-[12px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 scroll-animate opacity-0 translate-y-12"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1.5 bg-tosca-50 text-tosca-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-tosca-100">
                        {item.tingkat}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-800 leading-snug mb-4 line-clamp-2">
                      {item.judul}
                    </h3>
                    <div className="h-1.5 w-12 bg-tosca-900 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features / Program & Fasilitas */}
        <ProgramFasilitasUnggulan unit={unit} programFasilitas={programFasilitas} />

        {/* Facebook Section */}
        <section className="py-20 bg-tosca-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
                  <Facebook size={16} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Update Terbaru</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
                  Ikuti Kami di <span className="text-blue-600">Facebook</span>
                </h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl">
                  Jangan lewatkan informasi kegiatan terbaru, pengumuman penting, dan momen kebersamaan di sekolah kami. Ikuti halaman resmi kami untuk berita terkini.
                </p>
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href="https://facebook.com/sekolahbudimancendikia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
                  >
                    <Facebook size={18} fill="currentColor" />
                    Ikuti Halaman Kami
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square max-w-[300px] relative">
                <div className="absolute inset-0 bg-blue-100 rounded-[48px] rotate-6"></div>
                <div className="absolute inset-0 bg-white rounded-[48px] shadow-xl flex items-center justify-center p-10 border border-blue-50">
                  <Facebook size={120} className="text-blue-600 opacity-20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Facebook size={48} fill="currentColor" />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-gray-900 leading-none mb-1">Budiman Cendikia</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tenaga Pengajar Marquee */}
        <section className={`py-20 ${latestPrestasi.length > 0 ? 'bg-gray-50' : 'bg-white'} scroll-animate opacity-0 translate-y-12 transition-all duration-1000`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
              Tenaga Pengajar Profesional
            </h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">
              Dididik dan dibimbing oleh para ahli di bidangnya masing-masing.
            </p>
          </div>
          <GuruMarquee unit="sd" />
        </section>
      </PublicLayout>
    );
  }

  if (unit === "smp") {
    return (
      <PublicLayout unit="smp">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-tosca-900/5 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-tosca-700/5 -z-10 blur-3xl rounded-full -translate-x-1/4"></div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div
              className="order-2 md:order-1 animate-fade-in-right opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <PPDBBadge year="2026/2027" theme="smp" />
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                Eksplorasi Potensi,{" "}
                <span className="text-tosca-700">Raih Prestasi</span> Tanpa
                Batas
              </h1>
              <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
                SMP Budiman Cendikia fokus pada pengembangan kemandirian,
                penguasaan teknologi, and penguatan nilai keagamaan untuk
                mencetak remaja yang cerdas dan berkarakter.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/smp/ppdb"
                  className="px-10 py-5 bg-tosca-900 text-white font-black rounded-2xl shadow-xl shadow-tosca-900/30 hover:bg-tosca-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs"
                >
                  Mulai Pendaftaran
                </Link>
                <Link
                  href="/smp-old/dashboard"
                  className="px-10 py-5 bg-white text-tosca-900 font-black rounded-2xl border-2 border-tosca-900/10 hover:border-tosca-900 transition-all uppercase tracking-widest text-xs"
                >
                  Portal Data
                </Link>
              </div>
            </div>
            <div
              className="order-1 md:order-2 relative animate-fade-in-left opacity-0 delay-200"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="aspect-video bg-tosca-900 rounded-[48px] relative overflow-hidden shadow-2xl transform md:-rotate-2">
                <img
                  src="/globe.svg"
                  alt="SMP Life"
                  className="w-full h-full object-cover p-16 opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tosca-900/80 to-transparent flex items-end p-8">
                  <p
                    className="text-white font-bold italic animate-fade-in-up opacity-0 delay-500"
                    style={{ animationFillMode: "forwards" }}
                  >
                    &quot;Lingkungan belajar yang inspiratif dan modern.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats with Animated Counters */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Siswa Aktif", end: stats.siswa, suffix: "+" },
              { label: "Tenaga Pengajar", end: stats.guru, suffix: "+" },
              { label: "Total Berita", end: stats.berita, suffix: "+" },
              { label: "Prestasi Nasional", end: stats.prestasi, suffix: "+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group scroll-animate opacity-0 translate-y-12 transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl font-black text-tosca-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-5 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <div className="relative">
                  <div className="absolute -inset-4 bg-tosca-100 rounded-[30px] md:rounded-[40px] -rotate-3 -z-10"></div>
                  <div className="aspect-[3/4] bg-gray-200 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl relative">
                    <img 
                      src="/globe.svg" 
                      alt="Kepala Sekolah SMP" 
                      className="w-full h-full object-cover opacity-20 p-12 md:p-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tosca-900/20 to-transparent"></div>
                  </div>
                  <div className="mt-6 md:mt-8 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900">Drs. H. Mulyadi, M.Si</h3>
                    <p className="text-tosca-600 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2">Kepala Sekolah SMP Budiman Cendikia</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 scroll-animate opacity-0 translate-y-12 transition-all duration-700 delay-200">
                <span className="text-tosca-500 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] mb-2 md:mb-4 block">Welcome Message</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4 md:mb-8 uppercase">
                  Sambutan <br className="hidden md:block" />
                  <span className="text-tosca-700">Kepala Sekolah</span>
                </h2>
                <div className="relative space-y-6 text-gray-500 text-lg leading-relaxed font-medium">
                  <p>
                    Assalamu&apos;alaikum Warahmatullahi Wabarakatuh,
                  </p>
                  <p>
                    Selamat datang di lingkungan belajar SMP Budiman Cendikia. Kami berkomitmen untuk mendampingi putra-putri Anda melewati masa remaja dengan bimbingan yang tepat, kurikulum yang relevan, dan pembiasaan nilai-nilai Islami.
                  </p>
                  <div className={`grid transition-all duration-1000 ease-in-out ${isSambutanExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className={`pt-6 space-y-6 transition-all duration-1000 delay-150 ${isSambutanExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <p className="text-gray-500/80">
                          Di SMP Budiman Cendikia, kami mendorong setiap siswa untuk mengeksplorasi potensi diri, menguasai teknologi, dan memiliki kemandirian yang kuat. Bersama-sama, kita wujudkan generasi emas yang siap menghadapi tantangan zaman.
                        </p>
                        <p className="text-gray-500/80">
                          Website ini hadir sebagai jembatan informasi antara sekolah, orang tua, and masyarakat. Mari bersinergi menciptakan ekosistem pendidikan yang kondusif bagi tumbuh kembang generasi penerus bangsa.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gradient Fade Overlay */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                      isSambutanExpanded ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                    }`}
                  ></div>
                </div>
                <button 
                  onClick={() => setIsSambutanExpanded(!isSambutanExpanded)}
                  className="inline-flex items-center gap-2 mt-1 text-tosca-900 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all group py-2 px-3 rounded-xl hover:bg-tosca-50"
                >
                  <span className="relative">
                    {isSambutanExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-500 ease-in-out ${isSambutanExpanded ? "rotate-180" : "rotate-0 group-hover:translate-y-0.5"}`} 
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Terkini (Agenda, Pengumuman, Artikel) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              
              {/* Card 1: Agenda Kegiatan */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Calendar size={18} className="text-tosca-700" />
                    Agenda
                  </h3>
                  <Link href={`/${unit}/agenda`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestAgenda.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestAgenda.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/agenda`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Date badge */}
                        <div className="w-[52px] h-[58px] bg-tosca-50 text-tosca-700 rounded-xl flex flex-col items-center justify-center border border-tosca-100/40 group-hover:bg-tosca-700 group-hover:border-tosca-700 transition-all duration-300 flex-shrink-0">
                          <span className="text-[9px] font-bold text-tosca-700 group-hover:text-white/85 uppercase tracking-widest leading-none mb-1">
                            {getMonthName(item.tanggal)}
                          </span>
                          <span className="text-lg font-extrabold text-tosca-900 group-hover:text-white leading-none">
                            {getDayNum(item.tanggal)}
                          </span>
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1 truncate">
                            <MapPin size={11} className="text-gray-300 flex-shrink-0" />
                            {item.lokasi || 'Budiman Cendikia'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-700 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Semua Kegiatan Terencana</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Jadwal kegiatan sekolah berikutnya sedang disiapkan. Tetap pantau halaman ini!
                    </p>
                  </div>
                )}
              </div>

              {/* Card 2: Pengumuman Resmi */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-150">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Megaphone size={18} className="text-tosca-700" />
                    Pengumuman
                  </h3>
                  <Link href={`/${unit}/pengumuman`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestPengumuman.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestPengumuman.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/pengumuman/${item.id}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Icon Container */}
                        <div className="w-[52px] h-[52px] bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center border border-yellow-100/40 group-hover:bg-yellow-500 group-hover:text-white group-hover:border-yellow-500 transition-all duration-300 flex-shrink-0">
                          <Megaphone size={18} />
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1">
                            <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-yellow-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-yellow-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 01-1.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Belum Ada Pengumuman</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Saat ini papan informasi bersih. Pengumuman penting akan disematkan di sini.
                    </p>
                  </div>
                )}
              </div>

              {/* Card 3: Artikel & Berita */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-300">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Newspaper size={18} className="text-tosca-700" />
                    Artikel
                  </h3>
                  <Link href={`/${unit}/artikel`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestArtikel.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestArtikel.slice(0, 3).map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/artikel/${item.slug}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0 bg-tosca-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300 relative shadow-sm">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl bg-tosca-50 text-tosca-400">
                              📰
                            </div>
                          )}
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-tosca-700 uppercase tracking-wider mb-0.5 block truncate">
                            {item.kategori}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          {item.tanggal && (
                            <span className="text-[11px] font-medium text-gray-400 mt-1 flex items-center gap-1">
                              <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                              {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-700 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Kabar Terbaru Segera Hadir</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Kami sedang menyusun berita dan cerita menarik seputar sekolah untuk Anda.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Prestasi Membanggakan */}
        {latestPrestasi.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <span className="text-tosca-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Pride</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Prestasi <span className="text-tosca-700">Membanggakan</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestPrestasi.map((item, i) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-6 rounded-[12px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 scroll-animate opacity-0 translate-y-12"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1.5 bg-tosca-50 text-tosca-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-tosca-100">
                        {item.tingkat}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-800 leading-snug mb-4 line-clamp-2">
                      {item.judul}
                    </h3>
                    <div className="h-1.5 w-12 bg-tosca-900 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features / Program & Fasilitas */}
        <ProgramFasilitasUnggulan unit={unit} programFasilitas={programFasilitas} />

        {/* Facebook Section */}
        <section className="py-20 bg-tosca-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
                  <Facebook size={16} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Update Terbaru</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
                  Ikuti Kami di <span className="text-blue-600">Facebook</span>
                </h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl">
                  Jangan lewatkan informasi kegiatan terbaru, pengumuman penting, dan momen kebersamaan di sekolah kami. Ikuti halaman resmi kami untuk berita terkini.
                </p>
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href="https://facebook.com/sekolahbudimancendikia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
                  >
                    <Facebook size={18} fill="currentColor" />
                    Ikuti Halaman Kami
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square max-w-[300px] relative">
                <div className="absolute inset-0 bg-blue-100 rounded-[48px] rotate-6"></div>
                <div className="absolute inset-0 bg-white rounded-[48px] shadow-xl flex items-center justify-center p-10 border border-blue-50">
                  <Facebook size={120} className="text-blue-600 opacity-20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Facebook size={48} fill="currentColor" />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-gray-900 leading-none mb-1">Budiman Cendikia</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tenaga Pengajar Marquee */}
        <section className={`py-20 ${latestPrestasi.length > 0 ? 'bg-gray-50' : 'bg-white'} scroll-animate opacity-0 translate-y-12 transition-all duration-1000`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
              Tenaga Pengajar Profesional
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
              Dididik dan dibimbing oleh para ahli di bidangnya masing-masing.
            </p>
          </div>
          <GuruMarquee unit="sd" />
        </section>
      </PublicLayout>
    );
  }

  if (unit === "smp") {
    return (
      <PublicLayout unit="smp">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-tosca-900/5 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-tosca-700/5 -z-10 blur-3xl rounded-full -translate-x-1/4"></div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div
              className="order-2 md:order-1 animate-fade-in-right opacity-0"
              style={{ animationFillMode: "forwards" }}
            >
              <PPDBBadge year="2026/2027" theme="smp" />
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                Eksplorasi Potensi,{" "}
                <span className="text-tosca-700">Raih Prestasi</span> Tanpa
                Batas
              </h1>
              <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
                SMP Budiman Cendikia fokus pada pengembangan kemandirian,
                penguasaan teknologi, and penguatan nilai keagamaan untuk
                mencetak remaja yang cerdas dan berkarakter.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/smp/ppdb"
                  className="px-10 py-5 bg-tosca-900 text-white font-black rounded-2xl shadow-xl shadow-tosca-900/30 hover:bg-tosca-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs"
                >
                  Mulai Pendaftaran
                </Link>
                <Link
                  href="/smp-old/dashboard"
                  className="px-10 py-5 bg-white text-tosca-900 font-black rounded-2xl border-2 border-tosca-900/10 hover:border-tosca-900 transition-all uppercase tracking-widest text-xs"
                >
                  Portal Data
                </Link>
              </div>
            </div>
            <div
              className="order-1 md:order-2 relative animate-fade-in-left opacity-0 delay-200"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="aspect-video bg-tosca-900 rounded-[48px] relative overflow-hidden shadow-2xl transform md:-rotate-2">
                <img
                  src="/globe.svg"
                  alt="SMP Life"
                  className="w-full h-full object-cover p-16 opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tosca-900/80 to-transparent flex items-end p-8">
                  <p
                    className="text-white font-bold italic animate-fade-in-up opacity-0 delay-500"
                    style={{ animationFillMode: "forwards" }}
                  >
                    &quot;Lingkungan belajar yang inspiratif dan modern.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats with Animated Counters */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Siswa Aktif", end: stats.siswa, suffix: "+" },
              { label: "Tenaga Pengajar", end: stats.guru, suffix: "+" },
              { label: "Total Berita", end: stats.berita, suffix: "+" },
              { label: "Prestasi Nasional", end: stats.prestasi, suffix: "+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group scroll-animate opacity-0 translate-y-12 transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl font-black text-tosca-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-5 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <div className="relative">
                  <div className="absolute -inset-4 bg-tosca-100 rounded-[30px] md:rounded-[40px] -rotate-3 -z-10"></div>
                  <div className="aspect-[3/4] bg-gray-200 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl relative">
                    <img 
                      src="/globe.svg" 
                      alt="Kepala Sekolah SMP" 
                      className="w-full h-full object-cover opacity-20 p-12 md:p-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tosca-900/20 to-transparent"></div>
                  </div>
                  <div className="mt-6 md:mt-8 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900">Drs. H. Mulyadi, M.Si</h3>
                    <p className="text-tosca-600 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2">Kepala Sekolah SMP Budiman Cendikia</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 scroll-animate opacity-0 translate-y-12 transition-all duration-700 delay-200">
                <span className="text-tosca-500 font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] mb-2 md:mb-4 block">Welcome Message</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4 md:mb-8 uppercase">
                  Sambutan <br className="hidden md:block" />
                  <span className="text-tosca-700">Kepala Sekolah</span>
                </h2>
                <div className="relative space-y-6 text-gray-500 text-lg leading-relaxed font-medium">
                  <p>
                    Assalamu&apos;alaikum Warahmatullahi Wabarakatuh,
                  </p>
                  <p>
                    Selamat datang di lingkungan belajar SMP Budiman Cendikia. Kami berkomitmen untuk mendampingi putra-putri Anda melewati masa remaja dengan bimbingan yang tepat, kurikulum yang relevan, dan pembiasaan nilai-nilai Islami.
                  </p>
                  <div className={`grid transition-all duration-1000 ease-in-out ${isSambutanExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className={`pt-6 space-y-6 transition-all duration-1000 delay-150 ${isSambutanExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <p className="text-gray-500/80">
                          Di SMP Budiman Cendikia, kami mendorong setiap siswa untuk mengeksplorasi potensi diri, menguasai teknologi, dan memiliki kemandirian yang kuat. Bersama-sama, kita wujudkan generasi emas yang siap menghadapi tantangan zaman.
                        </p>
                        <p className="text-gray-500/80">
                          Website ini hadir sebagai jembatan informasi antara sekolah, orang tua, and masyarakat. Mari bersinergi menciptakan ekosistem pendidikan yang kondusif bagi tumbuh kembang generasi penerus bangsa.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gradient Fade Overlay */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                      isSambutanExpanded ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                    }`}
                  ></div>
                </div>
                <button 
                  onClick={() => setIsSambutanExpanded(!isSambutanExpanded)}
                  className="inline-flex items-center gap-2 mt-1 text-tosca-900 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all group py-2 px-3 rounded-xl hover:bg-tosca-50"
                >
                  <span className="relative">
                    {isSambutanExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-500 ease-in-out ${isSambutanExpanded ? "rotate-180" : "rotate-0 group-hover:translate-y-0.5"}`} 
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Terkini (Agenda, Pengumuman, Artikel) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              
              {/* Card 1: Agenda Kegiatan */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Calendar size={18} className="text-tosca-700" />
                    Agenda
                  </h3>
                  <Link href={`/${unit}/agenda`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestAgenda.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestAgenda.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/agenda`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Date badge */}
                        <div className="w-[52px] h-[58px] bg-tosca-50 text-tosca-700 rounded-xl flex flex-col items-center justify-center border border-tosca-100/40 group-hover:bg-tosca-700 group-hover:border-tosca-700 transition-all duration-300 flex-shrink-0">
                          <span className="text-[9px] font-bold text-tosca-700 group-hover:text-white/85 uppercase tracking-widest leading-none mb-1">
                            {getMonthName(item.tanggal)}
                          </span>
                          <span className="text-lg font-extrabold text-tosca-900 group-hover:text-white leading-none">
                            {getDayNum(item.tanggal)}
                          </span>
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1 truncate">
                            <MapPin size={11} className="text-gray-300 flex-shrink-0" />
                            {item.lokasi || 'Budiman Cendikia'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-700 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Semua Kegiatan Terencana</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Jadwal kegiatan sekolah berikutnya sedang disiapkan. Tetap pantau halaman ini!
                    </p>
                  </div>
                )}
              </div>

              {/* Card 2: Pengumuman Resmi */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-150">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Megaphone size={18} className="text-tosca-700" />
                    Pengumuman
                  </h3>
                  <Link href={`/${unit}/pengumuman`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestPengumuman.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestPengumuman.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/pengumuman/${item.id}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Icon Container */}
                        <div className="w-[52px] h-[52px] bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center border border-yellow-100/40 group-hover:bg-yellow-500 group-hover:text-white group-hover:border-yellow-500 transition-all duration-300 flex-shrink-0">
                          <Megaphone size={18} />
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1">
                            <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-yellow-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-yellow-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 01-1.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Belum Ada Pengumuman</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Saat ini papan informasi bersih. Pengumuman penting akan disematkan di sini.
                    </p>
                  </div>
                )}
              </div>

              {/* Card 3: Artikel & Berita */}
              <div className="bg-white p-7 md:p-8 rounded-[24px] border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[490px] w-full scroll-animate opacity-0 translate-y-12 delay-300">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100/70 mb-5 flex-shrink-0">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Newspaper size={18} className="text-tosca-700" />
                    Artikel
                  </h3>
                  <Link href={`/${unit}/artikel`} className="text-xs font-bold text-tosca-700 hover:text-tosca-900 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Lihat Semua <ChevronRight size={14} />
                  </Link>
                </div>
                
                {latestArtikel.length > 0 ? (
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto space-y-4 pr-1">
                    {latestArtikel.slice(0, 3).map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/${unit}/artikel/${item.slug}`}
                        className="flex gap-4 items-center group p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0 bg-tosca-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300 relative shadow-sm">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.judul} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl bg-tosca-50 text-tosca-400">
                              📰
                            </div>
                          )}
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-tosca-700 uppercase tracking-wider mb-0.5 block truncate">
                            {item.kategori}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-tosca-700 transition-colors line-clamp-2">
                            {item.judul}
                          </h4>
                          {item.tanggal && (
                            <span className="text-[11px] font-medium text-gray-400 mt-1 flex items-center gap-1">
                              <Calendar size={11} className="text-gray-300 flex-shrink-0" />
                              {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center flex-1 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl border border-gray-100/50">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-tosca-100/30 rounded-full blur-xl scale-150"></div>
                      <svg className="w-16 h-16 text-tosca-700 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 tracking-tight">Kabar Terbaru Segera Hadir</h4>
                    <p className="text-xs text-gray-400 max-w-[210px] mt-1.5 leading-relaxed font-medium">
                      Kami sedang menyusun berita dan cerita menarik seputar sekolah untuk Anda.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Prestasi Membanggakan */}
        {latestPrestasi.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                <span className="text-tosca-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Pride</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Prestasi <span className="text-tosca-700">Membanggakan</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestPrestasi.map((item, i) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-6 rounded-[12px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 scroll-animate opacity-0 translate-y-12"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1.5 bg-tosca-50 text-tosca-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-tosca-100">
                        {item.tingkat}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-800 leading-snug mb-4 line-clamp-2">
                      {item.judul}
                    </h3>
                    <div className="h-1.5 w-12 bg-tosca-900 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features / Program & Fasilitas */}
        <ProgramFasilitasUnggulan unit={unit} programFasilitas={programFasilitas} />

        {/* Facebook Section */}
        <section className="py-20 bg-tosca-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
                  <Facebook size={16} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Update Terbaru</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
                  Ikuti Kami di <span className="text-blue-600">Facebook</span>
                </h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl">
                  Jangan lewatkan informasi kegiatan terbaru, pengumuman penting, dan momen kebersamaan di sekolah kami. Ikuti halaman resmi kami untuk berita terkini.
                </p>
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href="https://facebook.com/sekolahbudimancendikia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
                  >
                    <Facebook size={18} fill="currentColor" />
                    Ikuti Halaman Kami
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square max-w-[300px] relative">
                <div className="absolute inset-0 bg-blue-100 rounded-[48px] rotate-6"></div>
                <div className="absolute inset-0 bg-white rounded-[48px] shadow-xl flex items-center justify-center p-10 border border-blue-50">
                  <Facebook size={120} className="text-blue-600 opacity-20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Facebook size={48} fill="currentColor" />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-gray-900 leading-none mb-1">Budiman Cendikia</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tim Pengajar Kami Marquee */}
        <section className={`py-20 ${latestPrestasi.length > 0 ? 'bg-gray-50' : 'bg-white'} scroll-animate opacity-0 translate-y-12 transition-all duration-1000`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
              Tim Pengajar Kami
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
              Dididik dan dibimbing oleh para ahli dan praktisi di bidangnya masing-masing.
            </p>
          </div>
          <GuruMarquee unit="smp" />
        </section>
      </PublicLayout>
    );
  }

  return null;
}
