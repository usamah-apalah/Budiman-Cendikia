<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengaturan Logo - Panel Admin</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        tosca: {
                            50: '#f0fdfa',
                            100: '#ccfbf1',
                            200: '#99f6e4',
                            500: '#14b8a6',
                            600: '#0d9488',
                            700: '#0f766e',
                            900: '#134e4a',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50 font-sans text-gray-800">
    <div class="max-w-md mx-auto px-4 py-10">
        <!-- Header -->
        <div class="mb-8">
            <span class="text-tosca-600 font-bold uppercase tracking-wider text-xs">Panel Admin</span>
            <h1 class="text-3xl font-black text-gray-900 tracking-tight mt-1">Pengaturan Logo</h1>
        </div>

        @if(session('success'))
            <div class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ session('success') }}
            </div>
        @endif

        @if(session('error'))
            <div class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ session('error') }}
            </div>
        @endif

        <!-- Card Form -->
        <div class="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center">
            <form action="{{ route('admin.settings.logo.update') }}" method="POST" enctype="multipart/form-data" class="w-full space-y-6 flex flex-col items-center">
                @csrf
                
                <!-- Logo Preview -->
                <div class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-tosca-100 flex items-center justify-center bg-gray-50 shadow-md">
                    @if($site_logo && file_exists(public_path('uploads/' . $site_logo)))
                        <img src="{{ asset('uploads/' . $site_logo) }}?v={{ time() }}" alt="Logo Website" class="w-full h-full object-cover">
                    @else
                        <div class="w-full h-full bg-tosca-600 flex items-center justify-center text-white text-5xl font-black">
                            B
                        </div>
                    @endif
                </div>

                <div class="w-full">
                    <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 text-center">Pilih File Logo Baru</label>
                    <input 
                        type="file" 
                        name="logo" 
                        accept="image/*"
                        required
                        class="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-tosca-50 file:text-tosca-700 hover:file:bg-tosca-100 cursor-pointer"
                    />
                    <p class="text-[10px] text-gray-400 text-center mt-2">Format: PNG, JPG, JPEG, GIF, SVG maks. 2MB</p>
                    @error('logo')
                        <p class="text-red-500 text-xs mt-2 font-semibold text-center">{{ $message }}</p>
                    @enderror
                </div>

                <div class="w-full pt-4 border-t border-gray-100 flex gap-4">
                    <a href="{{ url()->previous() }}" class="flex-1 py-3 border border-gray-200 text-center font-bold rounded-2xl text-sm text-gray-500 hover:bg-gray-50 transition-all">
                        Batal
                    </a>
                    <button 
                        type="submit" 
                        class="flex-1 py-3 bg-tosca-600 hover:bg-tosca-700 text-white font-bold rounded-2xl shadow-lg shadow-tosca-500/20 hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
                    >
                        Simpan Logo
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
