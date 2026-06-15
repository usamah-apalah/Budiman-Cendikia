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
        return view('admin.settings.edit', compact('site_logo'));
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
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

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

            $logo = Setting::where('key', 'site_logo')->value('value');

            return response()->json([
                'status' => 'success',
                'message' => 'Logo website berhasil diperbarui!',
                'data' => [
                    'site_logo' => $logo ? asset('uploads/' . $logo) : null
                ]
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Gagal mendeteksi berkas logo.'
        ], 400);
    }
}

