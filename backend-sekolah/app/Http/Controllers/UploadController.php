<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'path' => 'nullable|string'
        ], [
            'file.max' => 'Ukuran file maksimal adalah 5MB.',
            'file.image' => 'File harus berupa gambar.',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $request->input('path', 'uploads');
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            $storedPath = $file->storeAs($path, $fileName, 'public');
            $url = asset('storage/' . $storedPath);

            return response()->json([
                'url' => $url,
                'path' => $storedPath,
                'message' => 'File uploaded successfully'
            ]);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }
}
