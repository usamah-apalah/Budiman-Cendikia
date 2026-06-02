<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = Berita::where('is_published', true)
            ->latest()
            ->paginate(10);
        return response()->json($berita);
    }

    public function show(string $slug)
    {
        $berita = Berita::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();
        return response()->json($berita);
    }

    // Untuk admin panel
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'        => 'required|string|max:255',
            'konten'       => 'required|string',
            'kategori'     => 'required|in:umum,prestasi,kegiatan',
            'thumbnail'    => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $berita = Berita::create([
            'judul'        => $validated['judul'],
            'slug'         => Str::slug($validated['judul']) . '-' . Str::random(5),
            'konten'       => $validated['konten'],
            'kategori'     => $validated['kategori'],
            'thumbnail'    => $validated['thumbnail'] ?? null,
            'is_published' => $validated['is_published'] ?? false,
        ]);

        return response()->json($berita, 201);
    }

    public function update(Request $request, Berita $berita)
    {
        $validated = $request->validate([
            'judul'        => 'sometimes|required|string|max:255',
            'konten'       => 'sometimes|required|string',
            'kategori'     => 'sometimes|required|in:umum,prestasi,kegiatan',
            'thumbnail'    => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        if (isset($validated['judul'])) {
            $validated['slug'] = Str::slug($validated['judul']) . '-' . Str::random(5);
        }

        $berita->update($validated);

        return response()->json($berita);
    }

    public function destroy(Berita $berita)
    {
        $berita->delete();
        return response()->json(['message' => 'Berita berhasil dihapus']);
    }
}
