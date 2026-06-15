<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Agenda - Budiman Cendikia</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans text-gray-800">
    <div class="max-w-6xl mx-auto px-4 py-10">
        <div class="flex items-center justify-between mb-8">
            <div>
                <span class="text-teal-600 font-bold uppercase tracking-wider text-xs">Panel Admin</span>
                <h1 class="text-3xl font-black text-gray-900 tracking-tight mt-1">Daftar Agenda Kegiatan</h1>
            </div>
            <div class="flex gap-2">
                <a href="{{ route('agenda.index', ['unit' => 'sd']) }}" class="px-4 py-2 rounded-xl text-sm font-bold transition-all {{ $unit === 'sd' ? 'bg-teal-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50' }}">SD Unit</a>
                <a href="{{ route('agenda.index', ['unit' => 'smp']) }}" class="px-4 py-2 rounded-xl text-sm font-bold transition-all {{ $unit === 'smp' ? 'bg-teal-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50' }}">SMP Unit</a>
            </div>
        </div>

        <div class="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th class="px-8 py-5 font-black text-gray-400 uppercase text-xs tracking-widest">Judul</th>
                            <th class="px-8 py-5 font-black text-gray-400 uppercase text-xs tracking-widest">Tanggal</th>
                            <th class="px-8 py-5 font-black text-gray-400 uppercase text-xs tracking-widest">Lokasi</th>
                            <th class="px-8 py-5 font-black text-gray-400 uppercase text-xs tracking-widest text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        @foreach($agenda as $item)
                        <tr class="hover:bg-teal-50/30 transition-colors">
                            <td class="px-8 py-5">
                                <p class="text-gray-800 font-bold">{{ $item->judul }}</p>
                            </td>
                            <td class="px-8 py-5 text-gray-500 font-medium">{{ $item->tanggal }}</td>
                            <td class="px-8 py-5 text-gray-500 font-medium">{{ $item->lokasi ?? '-' }}</td>
                            <td class="px-8 py-5 text-right">
                                <a href="{{ route('agenda.edit', ['id' => $item->id]) }}" class="text-teal-600 hover:text-teal-800 font-bold text-sm">
                                    Edit
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
