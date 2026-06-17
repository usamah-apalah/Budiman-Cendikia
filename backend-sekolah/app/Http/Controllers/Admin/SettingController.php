<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Menampilkan halaman edit logo.
     */
    public function edit()
    {
        $site_logo = Setting::where('key', 'site_logo')->value('value');
        
        $instagram_title = Setting::where('key', 'instagram_title')->value('value') ?? 'Yuk, Kepoin Keseruan Kami di Instagram';
        $instagram_description = Setting::where('key', 'instagram_description')->value('value') ?? 'Mulai dari keseruan belajar di kelas, tawa ceria saat bermain, hingga momen-momen penuh prestasi. Semuanya kami bagikan lewat cerita harian dan galeri foto aesthetic di Instagram. Yuk, follow biar nggak ketinggalan keseruannya!';
        $instagram_url = Setting::where('key', 'instagram_url')->value('value') ?? 'https://www.instagram.com/sat_almanshurah/';
        $instagram_username = Setting::where('key', 'instagram_username')->value('value') ?? 'sat_almanshurah';
        
        return view('admin.settings.edit', compact('site_logo', 'instagram_title', 'instagram_description', 'instagram_url', 'instagram_username'));
    }

    /**
     * Memperbarui logo website (AJAX).
     */
    public function updateLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            
            // Simpan sebagai logo.png
            $filename = 'logo.png';

            // Pindahkan file ke public/uploads/
            $destinationPath = public_path('uploads');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $file->move($destinationPath, $filename);

            // Simpan path ke settings table dengan key site_logo
            Setting::updateOrCreate(
                ['key' => 'site_logo'],
                ['value' => $filename]
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Logo website berhasil diperbarui!'
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Gagal mendeteksi berkas logo.'
        ], 400);
    }

    /**
     * Memperbarui pengaturan website via API (untuk Next.js).
     */
    public function updateApi(Request $request)
    {
        // Jika ada data teks Instagram yang diupdate
        if ($request->hasAny(['instagram_title', 'instagram_description', 'instagram_url', 'instagram_username'])) {
            $validated = $request->validate([
                'instagram_title' => 'nullable|string|max:255',
                'instagram_description' => 'nullable|string',
                'instagram_url' => 'nullable|url',
                'instagram_username' => 'nullable|string|max:255',
            ]);
            
            if (isset($validated['instagram_title'])) {
                Setting::updateOrCreate(['key' => 'instagram_title'], ['value' => $validated['instagram_title']]);
            }
            if (isset($validated['instagram_description'])) {
                Setting::updateOrCreate(['key' => 'instagram_description'], ['value' => $validated['instagram_description']]);
            }
            if (isset($validated['instagram_url'])) {
                Setting::updateOrCreate(['key' => 'instagram_url'], ['value' => $validated['instagram_url']]);
            }
            if (isset($validated['instagram_username'])) {
                Setting::updateOrCreate(['key' => 'instagram_username'], ['value' => $validated['instagram_username']]);
            }
        }

        // Jika ada logo baru
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = 'logo.png';
            $destinationPath = public_path('uploads');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $file->move($destinationPath, $filename);
            Setting::updateOrCreate(
                ['key' => 'site_logo'],
                ['value' => $filename]
            );
        }

        $settings = Setting::pluck('value', 'key');
        $logo = $settings->get('site_logo');

        return response()->json([
            'status' => 'success',
            'message' => 'Pengaturan website berhasil diperbarui!',
            'data' => [
                'site_logo' => $logo ? asset('uploads/' . $logo) : null,
                'instagram_title' => $settings->get('instagram_title', 'Yuk, Kepoin Keseruan Kami di Instagram'),
                'instagram_description' => $settings->get('instagram_description', 'Mulai dari keseruan belajar di kelas, tawa ceria saat bermain, hingga momen-momen penuh prestasi. Semuanya kami bagikan lewat cerita harian dan galeri foto aesthetic di Instagram. Yuk, follow biar nggak ketinggalan keseruannya!'),
                'instagram_url' => $settings->get('instagram_url', 'https://www.instagram.com/sat_almanshurah/'),
                'instagram_username' => $settings->get('instagram_username', 'sat_almanshurah'),
            ]
        ]);
    }

    /**
     * Memperbarui pengaturan Instagram via Form Blade.
     */
    public function updateInstagram(Request $request)
    {
        $validated = $request->validate([
            'instagram_title' => 'required|string|max:255',
            'instagram_description' => 'required|string',
            'instagram_url' => 'required|url',
            'instagram_username' => 'required|string|max:255',
        ]);

        Setting::updateOrCreate(['key' => 'instagram_title'], ['value' => $validated['instagram_title']]);
        Setting::updateOrCreate(['key' => 'instagram_description'], ['value' => $validated['instagram_description']]);
        Setting::updateOrCreate(['key' => 'instagram_url'], ['value' => $validated['instagram_url']]);
        Setting::updateOrCreate(['key' => 'instagram_username'], ['value' => $validated['instagram_username']]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pengaturan Instagram berhasil diperbarui!'
        ]);
    }
}

