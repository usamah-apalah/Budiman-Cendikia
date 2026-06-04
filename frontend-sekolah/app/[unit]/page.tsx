"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import PublicLayout from "@/components/PublicLayout";
import GuruMarquee from "@/components/GuruMarquee";
import AnimatedCounter from "@/components/AnimatedCounter";
import PPDBBadge from "@/components/PPDBBadge";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

export default function UnitPublicHomePage() {
  const params = useParams();
  const unitParam = params.unit as string;

  if (unitParam !== "sd" && unitParam !== "smp") {
    notFound();
  }

  const unit = unitParam as "sd" | "smp";
  const [latestNews, setLatestNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get(`/berita?unit=${unit}`);
        setLatestNews(res.data.data.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    fetchLatest();
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
  }, [latestNews, unit]);

  if (unit === "sd") {
    return (
      <PublicLayout unit="sd">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
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
              { label: "Siswa Aktif", end: 500, suffix: "+" },
              { label: "Tenaga Pengajar", end: 40, suffix: "+" },
              { label: "Ekstrakurikuler", end: 15, suffix: "+" },
              { label: "Prestasi Nasional", end: 100, suffix: "+" },
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

        {/* Tenaga Pengajar Marquee */}
        <section className="bg-[#F8FAFC] scroll-animate opacity-0 translate-y-12 transition-all duration-1000">
          <div className="max-w-7xl mx-auto px-6 pt-20 text-center">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
              Tenaga Pengajar Profesional
            </h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">
              Dididik dan dibimbing oleh para ahli di bidangnya masing-masing.
            </p>
          </div>
          <GuruMarquee unit="sd" />
        </section>

        {/* Featured News */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
                  Berita & Kegiatan
                </h2>
                <p className="text-gray-400 font-medium max-w-md">
                  Ikuti terus perkembangan terbaru dan keseruan aktivitas
                  belajar di SD Budiman Cendikia.
                </p>
              </div>
              <Link
                href="/sd/berita"
                className="px-6 py-3 bg-white text-tosca-700 font-black rounded-xl border border-tosca-100 hover:bg-tosca-500 hover:text-white transition-all text-xs uppercase tracking-widest shadow-sm"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestNews.map((item, i) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all group scroll-animate opacity-0 translate-y-12 duration-700"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="h-64 bg-tosca-100 overflow-hidden relative">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <img
                        src="/globe.svg"
                        alt="News"
                        className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-tosca-500 uppercase tracking-widest mb-3 block capitalize">
                      {item.kategori}
                    </span>
                    <h3 className="text-xl font-black text-gray-900 mb-4 line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium mb-6 line-clamp-3">
                      {item.konten}
                    </p>
                    <Link
                      href={`/sd/berita/${item.slug}`}
                      className="inline-flex items-center gap-2 text-tosca-700 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform"
                    >
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </div>
              ))}
              {latestNews.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 font-bold italic scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                  Belum ada berita yang diterbitkan.
                </div>
              )}
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  if (unit === "smp") {
    return (
      <PublicLayout unit="smp">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
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
              <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed">
                SMP Budiman Cendikia fokus pada pengembangan kemandirian,
                penguasaan teknologi, dan penguatan nilai keagamaan untuk
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
              { label: "Siswa Aktif", end: 500, suffix: "+" },
              { label: "Tenaga Pengajar", end: 40, suffix: "+" },
              { label: "Ekstrakurikuler", end: 15, suffix: "+" },
              { label: "Prestasi Nasional", end: 100, suffix: "+" },
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

        {/* Featured News */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-700">
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
                  Kabar Terbaru
                </h2>
                <p className="text-gray-400 font-medium max-w-md">
                  Berita terkini seputar kurikulum, prestasi, dan kegiatan
                  kesiswaan SMP Budiman Cendikia.
                </p>
              </div>
              <Link
                href="/smp/berita"
                className="px-6 py-3 bg-white text-tosca-900 font-black rounded-xl border border-tosca-900/10 hover:bg-tosca-900 hover:text-white transition-all text-xs uppercase tracking-widest shadow-sm"
              >
                Semua Berita
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestNews.map((item, i) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 scroll-animate opacity-0 translate-y-12 duration-700"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="h-64 bg-tosca-900 overflow-hidden relative">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
                        📰
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-tosca-700 uppercase tracking-widest mb-3 block capitalize">
                      {item.kategori}
                    </span>
                    <h3 className="text-xl font-black text-gray-800 mb-4 line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium mb-6 line-clamp-3">
                      {item.konten}
                    </p>
                    <Link
                      href={`/smp/berita/${item.slug}`}
                      className="inline-flex items-center gap-2 text-tosca-900 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform"
                    >
                      Selengkapnya →
                    </Link>
                  </div>
                </div>
              ))}
              {latestNews.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 font-bold italic scroll-animate opacity-0 translate-y-12 transition-all duration-700">
                  Belum ada berita yang diterbitkan.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                {
                  title: "Digital Learning",
                  icon: "💻",
                  desc: "Sistem pembelajaran berbasis digital dan akses internet cepat.",
                },
                {
                  title: "Tahfidz Program",
                  icon: "📖",
                  desc: "Program bimbingan menghafal Al-Qur'an terpadu.",
                },
                {
                  title: "Science Lab",
                  icon: "🔬",
                  desc: "Laboratorium lengkap untuk eksperimen sains.",
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="scroll-animate opacity-0 translate-y-12 transition-all duration-700"
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="w-20 h-20 bg-tosca-50 rounded-3xl flex items-center justify-center text-4xl mb-8 mx-auto shadow-sm">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tim Pengajar Marquee */}
        <section className="bg-gray-50 scroll-animate opacity-0 translate-y-12 transition-all duration-1000">
          <div className="max-w-7xl mx-auto px-6 pt-20 text-center">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase">
              Tim Pengajar Kami
            </h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">
              Dididik dan dibimbing oleh para ahli dan praktisi di bidangnya
              masing-masing.
            </p>
          </div>
          <GuruMarquee unit="smp" />
        </section>
      </PublicLayout>
    );
  }

  return null;
}
