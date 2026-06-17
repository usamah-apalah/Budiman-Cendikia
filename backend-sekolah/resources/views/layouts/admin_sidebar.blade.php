@php
    $logoPath = \App\Models\Setting::where('key', 'site_logo')->value('value');
@endphp

<div class="sidebar flex flex-col gap-6 p-6 bg-gray-900 text-white min-h-screen w-64 shadow-2xl">
    <!-- Brand Header / Logo -->
    <div class="flex items-center gap-3 pb-6 border-b border-gray-800">
        <div class="w-10 h-10 rounded-full overflow-hidden bg-tosca-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-tosca-500/20 shrink-0">
            @if($logoPath && file_exists(public_path('uploads/' . $logoPath)))
                <img src="{{ asset('uploads/' . $logoPath) }}" alt="Logo" class="w-full h-full object-cover">
            @else
                B
            @endif
        </div>
        <div class="flex flex-col">
            <span class="font-black text-base tracking-tighter leading-none text-white">BUDIMAN</span>
            <span class="text-[9px] font-black uppercase tracking-wider text-tosca-400 mt-1">Admin Panel</span>
        </div>
    </div>

    <!-- Menu Links -->
    <nav class="flex-1 flex flex-col gap-2">
        <!-- Menu Guru -->
        <a href="/admin/guru" class="flex items-center p-3 rounded-xl hover:bg-gray-800 transition-all font-semibold text-sm">
            Guru
        </a>
        <!-- Menu Kepala Sekolah -->
        <a href="{{ route('headmaster.edit') }}" class="flex items-center p-3 rounded-xl hover:bg-gray-800 transition-all font-semibold text-sm">
            Kepala Sekolah
        </a>
        <!-- Menu Profil Admin -->
        <a href="{{ route('admin.profile.edit') }}" class="flex items-center p-3 rounded-xl hover:bg-gray-800 transition-all font-semibold text-sm">
            Profil Admin
        </a>
        <!-- Menu Pengaturan Website -->
        <a href="{{ route('admin.settings.edit') }}" class="flex items-center p-3 rounded-xl hover:bg-gray-800 transition-all font-semibold text-sm">
            Pengaturan Website
        </a>
    </nav>
</div>
