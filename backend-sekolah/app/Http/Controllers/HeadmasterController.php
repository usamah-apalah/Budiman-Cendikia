<?php

namespace App\Http\Controllers;

use App\Models\HeadmasterProfile;
use Illuminate\Http\Request;

class HeadmasterController extends Controller
{
    public function show(Request $request)
    {
        $request->validate([
            'unit' => 'required|in:sd,smp',
        ]);

        $profile = HeadmasterProfile::where('unit', $request->unit)->first();
        
        if (!$profile) {
            // Return default values matching the current frontend structure
            return response()->json([
                'unit' => $request->unit,
                'name' => $request->unit === 'sd' ? 'Dr. H. Ahmad Fauzi, M.Pd' : 'Drs. H. Mulyadi, M.Si',
                'greeting' => $request->unit === 'sd' 
                    ? "Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nSelamat datang di website resmi SD Budiman Cendikia. Kami bangga menjadi bagian dari perjalanan pendidikan putra-putri Anda. Di sini, kami tidak hanya fokus pada prestasi akademik, tetapi juga pembentukan karakter dan nilai-nilai keagamaan yang kuat."
                    : "Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nSelamat datang di lingkungan belajar SMP Budiman Cendikia. Kami berkomitmen untuk mendampingi putra-putri Anda melewati masa remaja dengan bimbingan yang tepat, kurikulum yang relevan, dan pembiasaan nilai-nilai Islami.",
                'photo' => null,
            ]);
        }

        return response()->json($profile);
    }

    public function edit(Request $request)
    {
        $unit = $request->query('unit', 'sd');
        if (!in_array($unit, ['sd', 'smp'])) {
            $unit = 'sd';
        }

        $profile = HeadmasterProfile::where('unit', $unit)->first();
        if (!$profile) {
            // Create a temporary model instance with default values
            $profile = new HeadmasterProfile([
                'unit' => $unit,
                'name' => $unit === 'sd' ? 'Dr. H. Ahmad Fauzi, M.Pd' : 'Drs. H. Mulyadi, M.Si',
                'greeting' => $unit === 'sd' 
                    ? "Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nSelamat datang di website resmi SD Budiman Cendikia. Kami bangga menjadi bagian dari perjalanan pendidikan putra-putri Anda. Di sini, kami tidak hanya fokus pada prestasi akademik, tetapi juga pembentukan karakter dan nilai-nilai keagamaan yang kuat."
                    : "Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nSelamat datang di lingkungan belajar SMP Budiman Cendikia. Kami berkomitmen untuk mendampingi putra-putri Anda melewati masa remaja dengan bimbingan yang tepat, kurikulum yang relevan, dan pembiasaan nilai-nilai Islami.",
                'photo' => null,
            ]);
        }

        return view('admin.headmaster.edit', compact('profile', 'unit'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'unit' => 'required|in:sd,smp',
            'name' => 'required|string|max:255',
            'greeting' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $photoFilename = null;
        
        // Find existing profile to preserve photo filename or delete old photo
        $existing = HeadmasterProfile::where('unit', $validated['unit'])->first();
        if ($existing) {
            $photoFilename = $existing->photo;
        }

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($photoFilename) {
                $oldPath = public_path('uploads/kepala_sekolah/' . $photoFilename);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }

            $file = $request->file('photo');
            $photoFilename = time() . '_' . $validated['unit'] . '.' . $file->getClientOriginalExtension();
            
            // If crop coordinates are provided and valid, crop the image using PHP GD
            if ($request->filled('crop_width') && $request->input('crop_width') > 0) {
                $cropX = (int) $request->input('crop_x', 0);
                $cropY = (int) $request->input('crop_y', 0);
                $cropW = (int) $request->input('crop_width');
                $cropH = (int) $request->input('crop_height');

                $tempPath = $file->getRealPath();
                $extension = strtolower($file->getClientOriginalExtension());
                
                if ($extension === 'jpeg' || $extension === 'jpg') {
                    $image = imagecreatefromjpeg($tempPath);
                } elseif ($extension === 'png') {
                    $image = imagecreatefrompng($tempPath);
                } elseif ($extension === 'gif') {
                    $image = imagecreatefromgif($tempPath);
                } elseif ($extension === 'webp') {
                    $image = imagecreatefromwebp($tempPath);
                } else {
                    $image = false;
                }

                if ($image !== false) {
                    $cropped = imagecrop($image, [
                        'x' => $cropX,
                        'y' => $cropY,
                        'width' => $cropW,
                        'height' => $cropH
                    ]);

                    if ($cropped !== false) {
                        $destinationPath = public_path('uploads/kepala_sekolah/' . $photoFilename);
                        if (!file_exists(public_path('uploads/kepala_sekolah'))) {
                            mkdir(public_path('uploads/kepala_sekolah'), 0755, true);
                        }

                        if ($extension === 'jpeg' || $extension === 'jpg') {
                            imagejpeg($cropped, $destinationPath, 90);
                        } elseif ($extension === 'png') {
                            imagepng($cropped, $destinationPath);
                        } elseif ($extension === 'gif') {
                            imagegif($cropped, $destinationPath);
                        } elseif ($extension === 'webp') {
                            imagewebp($cropped, $destinationPath, 90);
                        }
                        imagedestroy($cropped);
                    } else {
                        $file->move(public_path('uploads/kepala_sekolah'), $photoFilename);
                    }
                    imagedestroy($image);
                } else {
                    $file->move(public_path('uploads/kepala_sekolah'), $photoFilename);
                }
            } else {
                $file->move(public_path('uploads/kepala_sekolah'), $photoFilename);
            }
        }

        $profile = HeadmasterProfile::updateOrCreate(
            ['unit' => $validated['unit']],
            [
                'name' => $validated['name'],
                'greeting' => $validated['greeting'],
                'photo' => $photoFilename,
            ]
        );

        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'message' => 'Profil kepala sekolah berhasil diperbarui',
                'data' => $profile
            ]);
        }

        return redirect()->back()->with('success', 'Profil kepala sekolah berhasil diperbarui');
    }

}
