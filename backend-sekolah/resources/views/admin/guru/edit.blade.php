<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Guru - Budiman Cendikia</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans text-gray-800">
    <div class="max-w-4xl mx-auto px-4 py-10">
        <div class="flex items-center justify-between mb-8">
            <div>
                <span class="text-teal-600 font-bold uppercase tracking-wider text-xs">Panel Admin</span>
                <h1 class="text-3xl font-black text-gray-900 tracking-tight mt-1">Edit Data Guru</h1>
            </div>
        </div>

        <div class="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <form action="{{ route('guru.update', ['unit' => $unit, 'id' => $guru->id]) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                @csrf
                @method('PUT')
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                        <input type="text" name="nama" value="{{ old('nama', $guru->nama) }}" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">NIP / NUPTK</label>
                        <input type="text" name="nip" value="{{ old('nip', $guru->nip) }}" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Jabatan</label>
                        <input type="text" name="jabatan" value="{{ old('jabatan', $guru->jabatan) }}" required class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Mata Pelajaran</label>
                        <input type="text" name="mata_pelajaran" value="{{ old('mata_pelajaran', $guru->mata_pelajaran) }}" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Gmail Aktif</label>
                        <input type="email" name="gmail" value="{{ old('gmail', $guru->gmail) }}" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">WhatsApp</label>
                        <input type="text" name="whatsapp" value="{{ old('whatsapp', $guru->whatsapp) }}" class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-500 font-medium">
                    </div>
                </div>

                <div class="flex justify-end gap-4 pt-6 border-t">
                    <a href="{{ route('guru.index', $unit) }}" class="px-6 py-3 rounded-xl border font-bold text-gray-500 hover:bg-gray-50 transition-all">Batal</a>
                    <button type="submit" class="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-all">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
