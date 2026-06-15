<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profil Kepala Sekolah - Budiman Cendikia</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Cropper.js CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css">
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
    <div class="max-w-4xl mx-auto px-4 py-10">
        <!-- Breadcrumb / Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <span class="text-tosca-600 font-bold uppercase tracking-wider text-xs">Panel Admin</span>
                <h1 class="text-3xl font-black text-gray-900 tracking-tight mt-1">Kelola Sambutan Kepala Sekolah</h1>
            </div>
            <div class="flex gap-2">
                <a href="?unit=sd" class="px-4 py-2 rounded-xl text-sm font-bold transition-all {{ $unit === 'sd' ? 'bg-tosca-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50' }}">SD Unit</a>
                <a href="?unit=smp" class="px-4 py-2 rounded-xl text-sm font-bold transition-all {{ $unit === 'smp' ? 'bg-tosca-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50' }}">SMP Unit</a>
            </div>
        </div>

        @if(session('success'))
            <div class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ session('success') }}
            </div>
        @endif

        <!-- Form Card -->
        <div class="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <form id="headmasterForm" action="{{ route('headmaster.update') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                @csrf
                <input type="hidden" name="unit" value="{{ $unit }}">
                
                <!-- Crop Coordinates Hidden Inputs -->
                <input type="hidden" name="crop_x" id="crop_x" value="0">
                <input type="hidden" name="crop_y" id="crop_y" value="0">
                <input type="hidden" name="crop_width" id="crop_width" value="0">
                <input type="hidden" name="crop_height" id="crop_height" value="0">

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-2 space-y-6">
                        <!-- Name Input -->
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nama Kepala Sekolah</label>
                            <input 
                                type="text" 
                                name="name"
                                value="{{ old('name', $profile->name) }}"
                                required
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-tosca-500 font-medium @error('name') border-red-500 @enderror"
                                placeholder="Nama Lengkap beserta gelar..."
                            />
                            @error('name')
                                <p class="text-red-500 text-xs mt-1 font-semibold">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Greeting Input -->
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Kalimat Sambutan</label>
                            <textarea 
                                name="greeting"
                                required
                                rows="8"
                                class="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-tosca-500 font-medium @error('greeting') border-red-500 @enderror"
                                placeholder="Tulis sambutan kepala sekolah di sini..."
                            >{{ old('greeting', $profile->greeting) }}</textarea>
                            @error('greeting')
                                <p class="text-red-500 text-xs mt-1 font-semibold">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <!-- Photo Upload -->
                    <div class="space-y-6">
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Foto Kepala Sekolah</label>
                            <div class="mt-1 flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-[32px] hover:border-tosca-500 transition-colors">
                                <div class="relative w-32 h-40 rounded-2xl overflow-hidden mb-4 shadow-md bg-gray-100 flex items-center justify-center">
                                    <!-- Cropped Image Preview -->
                                    <img id="croppedPreview" class="w-full h-full object-cover hidden" />

                                    @if($profile->photo)
                                        <img 
                                            id="existingPhotoImg"
                                            src="{{ asset('uploads/kepala_sekolah/' . $profile->photo) }}" 
                                            alt="Foto Kepala Sekolah" 
                                            class="w-full h-full object-cover"
                                        />
                                    @else
                                        <div id="noPhotoPlaceholder" class="w-32 h-40 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center p-4 border">
                                            Belum Ada Foto
                                        </div>
                                    @endif
                                </div>
                                
                                <input 
                                    type="file" 
                                    name="photo"
                                    id="photoInput"
                                    accept="image/*"
                                    class="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-tosca-50 file:text-tosca-700 hover:file:bg-tosca-100 cursor-pointer"
                                />
                                <p class="text-[10px] text-gray-400 font-bold mt-2">JPEG, PNG, JPG maks. 2MB</p>
                                @error('photo')
                                    <p class="text-red-500 text-xs mt-1 font-semibold text-center">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <!-- On-page Cropper Area -->
                        <div id="cropperContainer" class="hidden border border-dashed border-gray-300 rounded-[32px] overflow-hidden p-6 bg-gray-50 flex flex-col items-center">
                            <h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Sesuaikan Area Potong</h4>
                            <div class="w-full max-h-[300px] overflow-hidden flex items-center justify-center bg-gray-100 rounded-2xl border">
                                <img id="cropperImage" class="max-w-full max-h-[250px]" />
                            </div>
                            <button type="button" id="applyCropBtn" class="mt-4 w-full py-3 bg-tosca-600 hover:bg-tosca-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer">Terapkan Potongan</button>
                        </div>

                        <button 
                            type="submit" 
                            class="w-full py-4 bg-tosca-600 hover:bg-tosca-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-tosca-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Cropper.js Script -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>
    <script>
        let cropper;
        const photoInput = document.getElementById('photoInput');
        const cropperContainer = document.getElementById('cropperContainer');
        const cropperImage = document.getElementById('cropperImage');
        const applyCropBtn = document.getElementById('applyCropBtn');

        const cropXInput = document.getElementById('crop_x');
        const cropYInput = document.getElementById('crop_y');
        const cropWidthInput = document.getElementById('crop_width');
        const cropHeightInput = document.getElementById('crop_height');
        const croppedPreviewImg = document.getElementById('croppedPreview');

        photoInput.addEventListener('change', function(e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    cropperImage.src = event.target.result;
                    cropperContainer.classList.remove('hidden');
                    
                    if (cropper) {
                        cropper.destroy();
                    }
                    
                    // Initialize cropper with 3:4 aspect ratio (standard portrait)
                    cropper = new Cropper(cropperImage, {
                        aspectRatio: 3 / 4,
                        viewMode: 1,
                        autoCropArea: 1.0,
                        responsive: true,
                        restore: false,
                        checkCrossOrigin: false,
                    });
                };
                reader.readAsDataURL(file);
            }
        });

        applyCropBtn.addEventListener('click', function() {
            if (cropper) {
                const data = cropper.getData();
                cropXInput.value = Math.round(data.x);
                cropYInput.value = Math.round(data.y);
                cropWidthInput.value = Math.round(data.width);
                cropHeightInput.value = Math.round(data.height);
                
                // Show cropped preview
                const canvas = cropper.getCroppedCanvas({
                    width: 300,
                    height: 400
                });
                croppedPreviewImg.src = canvas.toDataURL();
                croppedPreviewImg.classList.remove('hidden');
                document.getElementById('noPhotoPlaceholder')?.classList.add('hidden');
                document.getElementById('existingPhotoImg')?.classList.add('hidden');
                
                // Hide cropper container
                cropperContainer.classList.add('hidden');
                
                if (cropper) {
                    cropper.destroy();
                    cropper = null;
                }
            }
        });
    </script>
</body>
</html>
