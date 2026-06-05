"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Instagram, Facebook, MessageCircle, LogIn, Menu, X } from "lucide-react";

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
      {/* Top Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] bg-tosca-900 text-white transition-all duration-300 ${
          isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
          <div className="flex gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-tosca-300" />
              <span className="hidden sm:inline">(061) 1234567</span>
              <span className="sm:hidden">Call</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-tosca-300" />
              <span className="hidden sm:inline">info@budimancendikia.sch.id</span>
              <span className="sm:hidden">Email</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-tosca-300 transition-colors group">
              <Instagram size={16} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link href="#" className="hover:text-tosca-300 transition-colors group">
              <Facebook size={16} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link href="#" className="hover:text-tosca-300 transition-colors group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.22-.32-2.57-.17-3.6.48-.99.63-1.61 1.83-1.56 3 .05 1.2.74 2.38 1.78 3.03.94.65 2.13.78 3.24.39 1.06-.34 1.89-1.26 2.18-2.32.14-.54.12-1.09.12-1.64-.01-3.8-.02-7.61-.03-11.41z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed left-0 right-0 mx-auto w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-500 rounded-3xl ${
        isScrolled 
          ? "top-4 bg-white/95 backdrop-blur-xl shadow-2xl py-4 border border-gray-100" 
          : "top-14 bg-white/60 backdrop-blur-md py-6 border border-white/30"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className={`font-black text-xl tracking-tighter ${brandColor}`}>BUDIMAN</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{unit} CENDIKIA</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-bold transition-colors hover:text-tosca-500 ${pathname === link.href ? "text-tosca-500" : "text-gray-500"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/628123456789" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-all shadow-[0_10px_20px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(37,211,102,0.5)] flex items-center justify-center transform hover:-translate-y-0.5 active:scale-95"
                title="Hubungi via WhatsApp"
              >
                <MessageCircle size={22} fill="currentColor" />
              </a>
              <Link 
                href={`/admin/login?unit=${unit}`}
                className="px-6 py-2.5 bg-tosca-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-tosca-700 transition-all shadow-lg shadow-tosca-900/20 flex items-center gap-2"
              >
                <LogIn size={14} />
                Login
              </Link>
            </div>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-tosca-900 text-2xl focus:outline-none transition-transform">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-4 mx-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 flex flex-col p-4 gap-2 animate-fade-in-up">
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              <a 
                href="https://wa.me/628123456789" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl text-center shadow-md flex justify-center items-center gap-2"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <Link 
                href={`/admin/login?unit=${unit}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-tosca-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl text-center shadow-md flex justify-center items-center gap-2"
              >
                <LogIn size={14} />
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-28 md:pt-44 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDuration: '1s' }}>
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
