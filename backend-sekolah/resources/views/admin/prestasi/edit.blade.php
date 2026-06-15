<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Prestasi - Budiman Cendikia</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans text-gray-800">
    <div class="max-w-4xl mx-auto px-4 py-10">
        <div class="flex items-center justify-between mb-8">
            <div>
                <span class="text-teal-600 font-bold uppercase tracking-wider text-xs">Panel Admin</span>
                <h1 class="text-3xl font-black text-gray-900 tracking-tight mt-1">Edit Prestasi</h1>
            </div>
        </div>

        <div class="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <form action="{{ route('prestasi.update', ['unit' => $unit, 'id' => $prestasi->id]) }}" method="POST" class="space-y-6">
                @csrf
                @method('PUT')
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Judul Prestasi</label>
                        <input type="text" name="judul" value="{{ old('judul', $prestasi->judul) }}" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tanggal Perolehan</label>
                            <input type="date" name="tanggal" value="{{ old('tanggal', $prestasi->tanggal) }}" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                        </div>
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Kategori</label>
                            <select name="kategori" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium appearance-none">
                                <option value="siswa" {{ old('kategori', $prestasi->kategori) == 'siswa' ? 'selected' : '' }}>Siswa</option>
                                <option value="guru" {{ old('kategori', $prestasi->kategori) == 'guru' ? 'selected' : '' }}>Guru</option>
                                <option value="sekolah" {{ old('kategori', $prestasi->kategori) == 'sekolah' ? 'selected' : '' }}>Sekolah</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tingkat</label>
                            <select name="tingkat" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium appearance-none">
                                <option value="Lokal" {{ old('tingkat', $prestasi->tingkat) == 'Lokal' ? 'selected' : '' }}>Lokal</option>
                                <option value="Nasional" {{ old('tingkat', $prestasi->tingkat) == 'Nasional' ? 'selected' : '' }}>Nasional</option>
                                <option value="Internasional" {{ old('tingkat', $prestasi->tingkat) == 'Internasional' ? 'selected' : '' }}>Internasional</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Keterangan / Detail</label>
                        <textarea name="konten" rows="6" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">{{ old('konten', $prestasi->konten) }}</textarea>
                    </div>
                </div>

                <div class="flex justify-end gap-4 pt-6 border-t">
                    <a href="{{ route('prestasi.index', $unit) }}" class="px-6 py-3 rounded-xl border font-bold text-gray-500 hover:bg-gray-50 transition-all">Batal</a>
                    <button type="submit" class="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-all">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
