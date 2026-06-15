<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Keamanan Akun Admin - Budiman Cendikia</title>
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
    <div class="max-w-xl mx-auto px-4 py-10">
        <!-- Breadcrumb / Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <span class="text-tosca-600 font-bold uppercase tracking-wider text-xs">Panel Admin</span>
                <h1 class="text-3xl font-black text-gray-900 tracking-tight mt-1">Keamanan Akun</h1>
            </div>
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

        <!-- Form Card -->
        <div class="bg-white rounded-[32px] p-8 shadow-md border border-gray-100/80">
            <form action="{{ route('admin.profile.update') }}" method="POST" class="space-y-6">
                @csrf
                @method('PUT')

                <!-- Email Input -->
                <div>
                    <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Admin</label>
                    <div class="relative">
                        <input 
                            type="email" 
                            name="email"
                            value="{{ old('email', $user->email) }}"
                            required
                            class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-tosca-500 font-medium transition-all @error('email') border-red-500 @enderror"
                            placeholder="nama@email.com"
                        />
                    </div>
                    @error('email')
                        <p class="text-red-500 text-xs mt-2 font-semibold">{{ $message }}</p>
                    @enderror
                </div>

                <hr class="border-gray-100 my-4">

                <!-- Password Baru Input -->
                <div>
                    <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Password Baru</label>
                    <input 
                        type="password" 
                        name="password"
                        class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-tosca-500 font-medium transition-all @error('password') border-red-500 @enderror"
                        placeholder="••••••••"
                    />
                    <p class="text-[10px] text-gray-400 font-medium mt-1">Kosongkan jika tidak ingin mengubah password.</p>
                    @error('password')
                        <p class="text-red-500 text-xs mt-2 font-semibold">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Konfirmasi Password Baru Input -->
                <div>
                    <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Konfirmasi Password Baru</label>
                    <input 
                        type="password" 
                        name="password_confirmation"
                        class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-tosca-500 font-medium transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <a href="{{ url()->previous() }}" class="px-6 py-3 rounded-2xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm">
                        Batal
                    </a>
                    <button 
                        type="submit" 
                        class="px-8 py-3 bg-tosca-600 hover:bg-tosca-700 text-white font-bold rounded-2xl shadow-lg shadow-tosca-500/20 hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
