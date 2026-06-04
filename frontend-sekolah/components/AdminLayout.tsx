"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdminLayoutProps {
  children: React.ReactNode;
  unit: "sd" | "smp";
  title: string;
}

export default function AdminLayout({
  children,
  unit,
  title,
}: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const savedUnit = localStorage.getItem("admin_unit");

    if (!token || savedUnit !== unit) {
      toast.error("Akses ditolak. Silakan login sebagai admin.");
      router.push(`/admin/login?unit=${unit}`);
    } else {
      setLoading(false);
    }
  }, [router, unit]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_unit");
    router.push("/");
  };

  const navItems = [
    { name: "Admin Home", href: `/admin/${unit}/dashboard` },
    { name: "Berita", href: `/admin/${unit}/berita` },
    { name: "Pengumuman", href: `/admin/${unit}/pengumuman` },
    { name: "Agenda", href: `/admin/${unit}/agenda` },
    { name: "Prestasi", href: `/admin/${unit}/prestasi` },
    { name: "Guru", href: `/admin/${unit}/guru` },
    { name: "Galeri", href: `/admin/${unit}/galeri` },
    { name: "PPDB", href: `/admin/${unit}/ppdb` },
  ];

  if (loading) return null;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-gray-900 text-white flex flex-col shadow-2xl z-20`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">
                Budiman Admin
              </span>
              <span className="text-[10px] font-black text-tosca-500 uppercase tracking-widest">
                {unit} Panel
              </span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-gray-800 hover:bg-tosca-500 transition-colors"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex-1 mt-8 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${pathname.includes(item.href) ? "bg-tosca-700" : "hover:bg-gray-800"}`}
            >
              {isSidebarOpen && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-xl bg-red-500/80 hover:bg-red-600 transition-all shadow-lg group"
          >
            {isSidebarOpen && (
              <span className="font-medium">Logout Admin</span>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <Link
              href={`/${unit}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-bold text-gray-600 transition-all"
            >
              Web Publik
            </Link>
            <h1 className="text-lg font-black text-gray-800 tracking-tight uppercase">
              <span className="text-tosca-500 mr-2">|</span> {title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-gray-900 leading-none">
                Administrator
              </span>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-tighter flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>{" "}
                Aktif
              </span>
            </div>
            <div className="w-12 h-12 bg-tosca-500 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-tosca-500/20">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
