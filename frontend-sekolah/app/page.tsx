import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Selamat Datang di Budiman Cendikia
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Pilih jenjang pendidikan untuk melanjutkan ke dashboard pengelolaan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SD Card */}
          <Link
            href="/admin/login?unit=sd"
            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="h-48 bg-blue-600 flex items-center justify-center">
              <span className="text-6xl text-white font-bold">SD</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                Sekolah Dasar
              </h2>
              <p className="mt-2 text-gray-600">
                Kelola data berita, guru, galeri, dan PPDB tingkat Sekolah Dasar.
              </p>
              <div className="mt-6 inline-flex items-center text-blue-600 font-semibold">
                Masuk Dashboard
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* SMP Card */}
          <Link
            href="/admin/login?unit=smp"
            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="h-48 bg-indigo-700 flex items-center justify-center">
              <span className="text-6xl text-white font-bold">SMP</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition">
                Sekolah Menengah Pertama
              </h2>
              <p className="mt-2 text-gray-600">
                Kelola data berita, guru, galeri, dan PPDB tingkat SMP.
              </p>
              <div className="mt-6 inline-flex items-center text-indigo-700 font-semibold">
                Masuk Dashboard
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
