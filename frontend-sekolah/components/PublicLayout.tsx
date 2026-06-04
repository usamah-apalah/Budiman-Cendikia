"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PublicLayoutProps {
  children: React.ReactNode;
  unit: "sd" | "smp";
}

export default function PublicLayout({ children, unit }: PublicLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: `/${unit}` },
    { name: "Berita", href: `/${unit}/berita` },
    { name: "Guru", href: `/${unit}/guru` },
    { name: "Galeri", href: `/${unit}/galeri` },
    { name: "Agenda", href: `/${unit}/agenda` },
    { name: "PPDB", href: `/${unit}/ppdb` },
  ];

  const brandColor = unit === "sd" ? "text-tosca-700" : "text-tosca-900";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className={`fixed left-0 right-0 mx-auto w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-500 rounded-3xl ${isScrolled ? "top-4 bg-white/90 backdrop-blur-xl shadow-xl py-4 border border-gray-100" : "top-6 bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className={`font-black text-xl tracking-tighter ${brandColor}`}>BUDIMAN</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{unit} CENDIKIA</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-bold transition-colors hover:text-tosca-500 ${pathname === link.href ? "text-tosca-500" : "text-gray-500"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href={`/admin/login?unit=${unit}`}
              className="px-6 py-2.5 bg-tosca-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-tosca-700 transition-all shadow-lg shadow-tosca-900/20 flex items-center gap-2"
            >
              Login Admin
            </Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-tosca-900 text-2xl focus:outline-none transition-transform">
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-4 mx-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 flex flex-col p-4 gap-2 animate-fade-in-up">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold p-3 rounded-xl transition-colors ${pathname === link.href ? "bg-tosca-50 text-tosca-700" : "text-gray-600 hover:bg-gray-50"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href={`/admin/login?unit=${unit}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 p-3 bg-tosca-900 text-white text-sm font-black uppercase tracking-widest rounded-xl text-center shadow-md flex justify-center items-center"
            >
              Login Admin
            </Link>
          </div>
        )}
      </nav>

      <main className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDuration: '1s' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-2xl font-black tracking-tighter ${brandColor}`}>Budiman Cendikia {unit.toUpperCase()}</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed max-w-md">
              Lembaga pendidikan yang berkomitmen mencetak generasi unggul dalam iman, taqwa, dan ilmu pengetahuan. Menjadi rumah kedua yang nyaman bagi perkembangan anak.
            </p>
          </div>
          <div>
            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Navigasi</h4>
            <ul className="space-y-4">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 font-bold text-sm hover:text-tosca-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Kontak Kami</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li className="flex items-start gap-3">
                <span>Jl. Pendidikan No. 123, Kota Medan, Sumatera Utara</span>
              </li>
              <li className="flex items-center gap-3">
                <span>(061) 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <span>info@budimancendikia.sch.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">© 2026 Budiman Cendikia. All Rights Reserved.</p>
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-tosca-700 hover:bg-tosca-500 hover:text-white transition-all cursor-pointer border border-gray-100">
                f
             </div>
             <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-tosca-700 hover:bg-tosca-500 hover:text-white transition-all cursor-pointer border border-gray-100">
                ig
             </div>
             <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-tosca-700 hover:bg-tosca-500 hover:text-white transition-all cursor-pointer border border-gray-100">
                yt
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
