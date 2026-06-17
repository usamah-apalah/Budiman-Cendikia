<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengaturan Website - Panel Admin</title>
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
    <style>
        .cropper-view-box,
        .cropper-face {
            border-radius: 50%;
        }
    </style>
</head>
<body class="bg-gray-50 font-sans text-gray-800 min-h-screen flex items-center justify-center py-10 px-4">
    <div class="w-full max-w-md">
        <!-- Card Container -->
        <div class="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 flex flex-col items-center">
            
            <!-- Header Centered -->
            <div class="text-center mb-6">
                <span class="text-tosca-600 font-bold uppercase tracking-widest text-[10px]">Panel Admin</span>
                <h1 class="text-2xl font-black text-gray-900 tracking-tight mt-1">Pengaturan Website</h1>
            </div>

            <!-- Tab Navigation -->
            <div class="flex border-b border-gray-100 w-full mb-8 justify-center gap-6">
                <button type="button" id="tabLogoBtn" class="pb-3 text-xs font-black uppercase tracking-wider text-tosca-600 border-b-2 border-tosca-600 transition-all focus:outline-none">
                    Logo Sekolah
                </button>
                <button type="button" id="tabInstagramBtn" class="pb-3 text-xs font-bold uppercase tracking-wider text-gray-400 border-b-2 border-transparent hover:text-gray-600 transition-all focus:outline-none">
                    Instagram & Media
                </button>
            </div>

            <!-- Tab 1: Logo Content -->
            <div id="tabLogoContent" class="w-full flex flex-col items-center">
                <!-- Preview Box (Circular & Large w-64 h-64) -->
                <div class="w-64 h-64 border-2 border-dashed border-gray-200 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center mb-8 relative shadow-inner">
                    <img id="imageToCrop" class="max-w-full max-h-full object-contain hidden" />
                    
                    <div id="noImageText" class="text-xs text-gray-400 font-bold text-center p-4">
                        @if($site_logo && file_exists(public_path('uploads/' . $site_logo)))
                            <img src="{{ asset('uploads/' . $site_logo) }}?v={{ time() }}" alt="Logo Saat Ini" class="w-32 h-32 rounded-full mx-auto mb-2 object-cover shadow-sm">
                            Logo Aktif
                        @else
                            Belum Ada File Dipilih
                        @endif
                    </div>
                </div>

                <!-- Choose File Button (Symmetric & Centered) -->
                <div class="w-full mb-6 flex flex-col items-center">
                    <label for="logoInput" class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs tracking-wider uppercase cursor-pointer transition-all">
                        Pilih Gambar
                    </label>
                    <input 
                        type="file" 
                        id="logoInput" 
                        accept="image/*"
                        class="hidden"
                    />
                </div>

                <!-- Zoom Control Buttons -->
                <div class="flex gap-3 mb-8 justify-center">
                    <button 
                        type="button" 
                        id="zoomInBtn" 
                        disabled
                        class="px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 text-gray-600 font-bold rounded-lg text-xs transition-all border border-gray-100"
                    >
                        Perbesar (+)
                    </button>
                    <button 
                        type="button" 
                        id="zoomOutBtn" 
                        disabled
                        class="px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 text-gray-600 font-bold rounded-lg text-xs transition-all border border-gray-100"
                    >
                        Perkecil (-)
                    </button>
                </div>

                <!-- Simpan Perubahan Button (Symmetric & Centered) -->
                <button 
                    type="button" 
                    id="cropAndSaveBtn" 
                    disabled
                    class="w-full py-4 bg-tosca-600 hover:bg-tosca-700 disabled:opacity-50 text-white font-black rounded-2xl text-xs tracking-widest uppercase transition-all shadow-lg shadow-tosca-500/20 hover:-translate-y-0.5 cursor-pointer"
                >
                    Simpan Perubahan
                </button>
            </div>

            <!-- Tab 2: Instagram Content -->
            <div id="tabInstagramContent" class="w-full hidden">
                <style>
                    #saveInstagramBtn {
                        color: #ffffff !important;
                        background-color: #0d9488 !important;
                        transition: all 0.3s ease;
                    }
                    #saveInstagramBtn:hover {
                        background-color: #0f766e !important;
                        transform: translateY(-2px);
                    }
                </style>
                
                <form id="instagramForm" class="w-full space-y-5">
                    @csrf
                    <div>
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Judul Instagram</label>
                        <input type="text" name="instagram_title" value="{{ $instagram_title }}" required class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-tosca-500 transition-all font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Deskripsi Instagram</label>
                        <textarea name="instagram_description" rows="4" required class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-tosca-500 transition-all font-medium leading-relaxed">{{ $instagram_description }}</textarea>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Link Profil Instagram</label>
                        <input type="url" name="instagram_url" value="{{ $instagram_url }}" required class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-tosca-500 transition-all font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Username Instagram</label>
                        <input type="text" name="instagram_username" value="{{ $instagram_username }}" placeholder="sat_almanshurah" required class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-tosca-500 transition-all font-medium">
                    </div>
                    
                    <button type="submit" id="saveInstagramBtn" class="w-full py-4 font-black rounded-2xl text-xs tracking-widest uppercase cursor-pointer">
                        Simpan Pengaturan Instagram
                    </button>
                </form>
            </div>

        </div>
    </div>

    <!-- Cropper.js Script -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>
    <script>
        let cropper;
        const logoInput = document.getElementById('logoInput');
        const imageToCrop = document.getElementById('imageToCrop');
        const noImageText = document.getElementById('noImageText');
        const zoomInBtn = document.getElementById('zoomInBtn');
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        const cropAndSaveBtn = document.getElementById('cropAndSaveBtn');

        // File Selection Listener
        logoInput.addEventListener('change', function (e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                
                reader.onload = function (event) {
                    if (cropper) {
                        cropper.destroy();
                    }
                    
                    imageToCrop.src = event.target.result;
                    imageToCrop.classList.remove('hidden');
                    noImageText.classList.add('hidden');
                    
                    zoomInBtn.removeAttribute('disabled');
                    zoomOutBtn.removeAttribute('disabled');
                    cropAndSaveBtn.removeAttribute('disabled');

                    // Initialize Circular Cropper
                    cropper = new Cropper(imageToCrop, {
                        aspectRatio: 1,
                        viewMode: 1,
                        dragMode: 'move',
                        background: false,
                        autoCropArea: 0.9,
                        zoomable: true,
                        cropBoxMovable: false,
                        cropBoxResizable: false
                    });
                };
                reader.readAsDataURL(file);
            }
        });

        // Zoom Listeners
        zoomInBtn.addEventListener('click', function () {
            if (cropper) cropper.zoom(0.1);
        });

        zoomOutBtn.addEventListener('click', function () {
            if (cropper) cropper.zoom(-0.1);
        });

        // Save (Submit Crop via AJAX)
        cropAndSaveBtn.addEventListener('click', function () {
            if (!cropper) return;

            // Get cropped canvas
            cropper.getCroppedCanvas({
                width: 300,
                height: 300
            }).toBlob(function (blob) {
                const formData = new FormData();
                formData.append('logo', blob, 'logo.png');
                formData.append('_token', '{{ csrf_token() }}');

                cropAndSaveBtn.setAttribute('disabled', 'true');
                cropAndSaveBtn.textContent = 'Menyimpan...';

                // Send request
                fetch("{{ route('admin.settings.updateLogo') }}", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Logo website berhasil diperbarui!');
                        window.location.reload();
                    } else {
                        alert('Gagal: ' + data.message);
                        cropAndSaveBtn.removeAttribute('disabled');
                        cropAndSaveBtn.textContent = 'Simpan Perubahan';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat menyimpan logo.');
                    cropAndSaveBtn.removeAttribute('disabled');
                    cropAndSaveBtn.textContent = 'Simpan Perubahan';
                });
            }, 'image/png');
        });

        // Instagram Form Submission
        const instagramForm = document.getElementById('instagramForm');
        const saveInstagramBtn = document.getElementById('saveInstagramBtn');

        instagramForm.addEventListener('submit', function (e) {
            e.preventDefault();

            saveInstagramBtn.setAttribute('disabled', 'true');
            saveInstagramBtn.textContent = 'Menyimpan...';

            const formData = new FormData(instagramForm);

            fetch("{{ route('admin.settings.updateInstagram') }}", {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Pengaturan Instagram berhasil diperbarui!');
                    window.location.reload();
                } else {
                    alert('Gagal: ' + data.message);
                    saveInstagramBtn.removeAttribute('disabled');
                    saveInstagramBtn.textContent = 'Simpan Pengaturan Instagram';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menyimpan pengaturan.');
                saveInstagramBtn.removeAttribute('disabled');
                saveInstagramBtn.textContent = 'Simpan Pengaturan Instagram';
            });
        });

        // Tab switching logic
        const tabLogoBtn = document.getElementById('tabLogoBtn');
        const tabInstagramBtn = document.getElementById('tabInstagramBtn');
        const tabLogoContent = document.getElementById('tabLogoContent');
        const tabInstagramContent = document.getElementById('tabInstagramContent');

        tabLogoBtn.addEventListener('click', function() {
            // Activate Tab Logo
            tabLogoBtn.classList.remove('text-gray-400', 'border-transparent', 'font-bold');
            tabLogoBtn.classList.add('text-tosca-600', 'border-tosca-600', 'font-black');
            
            // Deactivate Tab Instagram
            tabInstagramBtn.classList.remove('text-tosca-600', 'border-tosca-600', 'font-black');
            tabInstagramBtn.classList.add('text-gray-400', 'border-transparent', 'font-bold');

            // Show/Hide Content
            tabLogoContent.classList.remove('hidden');
            tabInstagramContent.classList.add('hidden');
        });

        tabInstagramBtn.addEventListener('click', function() {
            // Activate Tab Instagram
            tabInstagramBtn.classList.remove('text-gray-400', 'border-transparent', 'font-bold');
            tabInstagramBtn.classList.add('text-tosca-600', 'border-tosca-600', 'font-black');
            
            // Deactivate Tab Logo
            tabLogoBtn.classList.remove('text-tosca-600', 'border-tosca-600', 'font-black');
            tabLogoBtn.classList.add('text-gray-400', 'border-transparent', 'font-bold');

            // Show/Hide Content
            tabInstagramContent.classList.remove('hidden');
            tabLogoContent.classList.add('hidden');
        });
    </script>
</body>
</html>
