"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
  unit: "sd" | "smp";
  title: string;
}

export default function DashboardLayout({ children, unit, title }: DashboardLayoutProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const savedUnit = localStorage.getItem("admin_unit");

    if (!token || savedUnit !== unit) {
      toast.error("Silakan login kembali.");
      router.push(`/admin/login?unit=${unit}`);
    }
  }, [router, unit]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_unit");
    router.push("/");
  };

  const navItems = [
    { name: "Dashboard", href: `/admin/${unit}`, icon: "🏠" },
    { name: "Berita", href: `/admin/${unit}/berita`, icon: "📰" },
    { name: "Guru", href: `/admin/${unit}/guru`, icon: "👨‍🏫" },
    { name: "Galeri", href: `/admin/${unit}/galeri`, icon: "🖼️" },
    { name: "Pengumuman", href: `/admin/${unit}/pengumuman`, icon: "📢" },
    { name: "PPDB", href: `/admin/${unit}/ppdb`, icon: "📝" },
  ];

  const themeColor = unit === "sd" ? "bg-blue-600" : "bg-indigo-700";
  const themeHover = unit === "sd" ? "hover:bg-blue-700" : "hover:bg-indigo-800";

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ${themeColor} text-white flex flex-col shadow-xl`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xl font-bold">Budiman {unit.toUpperCase()}</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 rounded-xl transition ${themeHover} group`}
            >
              <span className="text-2xl">{item.icon}</span>
              {isSidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-medium">Administrator</span>
            <div className={`w-10 h-10 rounded-full ${themeColor} flex items-center justify-center text-white font-bold`}>
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
