"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Instagram, Facebook, Youtube, LogIn, Menu, X, ChevronDown } from "lucide-react";

interface PublicLayoutProps {
  children: React.ReactNode;
  unit: "sd" | "smp";
}

export default function PublicLayout({ children, unit }: PublicLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
    { 
      name: "Profil Sekolah", 
      href: "#",
      dropdown: [
        { name: "Visi & Misi", href: `/${unit}/visi-misi` },
        { name: "Program & Fasilitas", href: `/${unit}/fasilitas` },
        { name: "Tenaga Pengajar (Guru)", href: `/${unit}/guru` },
      ]
    },
    { 
      name: "Informasi", 
      href: "#",
      dropdown: [
        { name: "Berita & Kegiatan", href: `/${unit}/berita` },
        { name: "Agenda Sekolah", href: `/${unit}/agenda` },
        { name: "Prestasi Siswa", href: `/${unit}/prestasi` },
        { name: "Ekstrakurikuler", href: `/${unit}/ekstrakurikuler` },
      ]
    },
    { 
      name: "Galeri", 
      href: "#",
      dropdown: [
        { name: "Galeri Foto", href: `/${unit}/galeri` },
        { name: "Dokumentasi Video", href: `/${unit}/video` },
      ]
    },
    { 
      name: "Kontak", 
      href: "#",
      dropdown: [
        { name: "Instagram", href: "#" },
        { name: "TikTok", href: "#" },
        { name: "Facebook", href: "#" },
        { name: "WhatsApp", href: "#" },
      ]
    },
  ];

  const brandColor = unit === "sd" ? "text-tosca-600" : "text-tosca-900";
  const accentBg = unit === "sd" ? "bg-tosca-50 text-tosca-600" : "bg-tosca-50 text-tosca-900";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Top Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] bg-[#0B6B69] text-white transition-all duration-500 ${
          isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-between items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
          <div className="flex gap-10">
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-tosca-300" />
              <span className="opacity-80">(061) 1234567</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={14} className="text-tosca-300" />
              <span className="opacity-80">info@budimancendikia.sch.id</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-tosca-300 transition-colors">
              <Instagram size={15} />
            </Link>
            <Link href="#" className="hover:text-tosca-300 transition-colors">
              <Facebook size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Capsule Navbar */}
      <div className={`fixed left-0 right-0 z-50 transition-all duration-700 flex justify-center px-4 md:px-8 ${
        isScrolled ? "top-4 md:top-6" : "top-12 md:top-14"
      }`}>
        <nav className={`w-full max-w-[1100px] transition-all duration-700 flex items-center justify-between px-3 md:px-4 py-3 rounded-full border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl border-white/50" 
            : "bg-white/70 backdrop-blur-md border-white/40"
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 pl-4 md:pl-6 group shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-tosca-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg shadow-tosca-500/20 group-hover:rotate-12 transition-transform">
              B
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-lg md:text-xl tracking-tighter leading-none ${brandColor}`}>BUDIMAN</span>
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">CENDIKIA {unit}</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 mx-4">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={link.href}
                  className={`flex items-center gap-2.5 px-5 py-2.5 text-[11px] xl:text-[12px] font-black uppercase tracking-[0.1em] transition-all rounded-full ${
                    pathname === link.href || (link.dropdown && link.dropdown.some(s => pathname === s.href))
                      ? accentBg
                      : "text-gray-500 hover:text-tosca-600 hover:bg-tosca-50/50"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.dropdown && <ChevronDown size={12} className={`transition-transform duration-300 opacity-50 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                    activeDropdown === link.name ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                    <div className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-[24px] p-2 min-w-[220px] flex flex-col gap-1">
                      {link.dropdown.map((sub) => (
                        <Link 
                          key={sub.name}
                          href={sub.href}
                          className={`px-5 py-3 text-[11px] font-bold rounded-xl transition-all whitespace-nowrap ${
                            pathname === sub.href ? "text-tosca-700 bg-tosca-50" : "text-gray-600 hover:text-tosca-700 hover:bg-tosca-50"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3 pr-2 flex-none">
            <Link 
              href={`/admin/login?unit=${unit}`}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-[#0B6B69] text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-tosca-900 transition-all shadow-lg shadow-tosca-900/10 flex items-center gap-2.5"
            >
              <LogIn size={14} className="hidden sm:block" />
              Login
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-gray-50 text-tosca-900 rounded-full hover:bg-tosca-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 mt-3 px-4 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-gray-100 p-6 flex flex-col gap-3 overflow-hidden">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div className="space-y-1 mb-2">
                    <p className="px-4 flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                      {link.name}
                    </p>
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {link.dropdown.map(sub => (
                        <Link 
                          key={sub.name} 
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-xs font-bold p-3.5 rounded-2xl transition-colors ${pathname === sub.href ? "bg-tosca-50 text-tosca-700" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 text-xs font-bold p-3.5 rounded-2xl transition-colors ${pathname === link.href ? "bg-tosca-50 text-tosca-700" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

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
             <Link 
               href="#" 
               aria-label="Facebook"
               className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-tosca-700 hover:bg-tosca-500 hover:text-white transition-all cursor-pointer border border-gray-100"
             >
                <Facebook size={18} />
             </Link>
             <Link 
               href="#" 
               aria-label="Instagram"
               className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-tosca-700 hover:bg-tosca-500 hover:text-white transition-all cursor-pointer border border-gray-100"
             >
                <Instagram size={18} />
             </Link>
             <Link 
               href="#" 
               aria-label="YouTube"
               className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-tosca-700 hover:bg-tosca-500 hover:text-white transition-all cursor-pointer border border-gray-100"
             >
                <Youtube size={18} />
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
