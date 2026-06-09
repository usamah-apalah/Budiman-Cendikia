<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::query();

        if (!$request->has('show_all')) {
            $query->where('is_published', true);
        }

        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }

        $berita = $query->latest()->paginate(10);
        return response()->json($berita);
    }

    public function show(string $slug)
    {
        $berita = Berita::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();
        return response()->json($berita);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'         => 'required|in:sd,smp',
            'tanggal'      => 'nullable|date',
            'judul'        => 'required|string|max:255',
            'konten'       => 'required|string',
            'kategori'     => 'required|in:umum,prestasi,kegiatan',
            'thumbnail'    => 'nullable|string',
            'is_published' => 'sometimes|boolean',
        ]);

        $berita = Berita::create([
            'unit'         => $validated['unit'],
            'tanggal'      => $validated['tanggal'] ?? now()->toDateString(),
            'judul'        => $validated['judul'],
            'slug'         => Str::slug($validated['judul']) . '-' . Str::random(5),
            'konten'       => $validated['konten'],
            'kategori'     => $validated['kategori'],
            'thumbnail'    => !empty($validated['thumbnail']) ? $validated['thumbnail'] : null,
            'is_published' => $request->boolean('is_published'),
        ]);

        return response()->json($berita, 201);
    }

    public function update(Request $request, Berita $berita)
    {
        $validated = $request->validate([
            'unit'         => 'sometimes|required|in:sd,smp',
            'tanggal'      => 'nullable|date',
            'judul'        => 'sometimes|required|string|max:255',
            'konten'       => 'sometimes|required|string',
            'kategori'     => 'sometimes|required|in:umum,prestasi,kegiatan',
            'thumbnail'    => 'nullable|string',
            'is_published' => 'sometimes|boolean',
        ]);

        if (isset($validated['judul'])) {
            $validated['slug'] = Str::slug($validated['judul']) . '-' . Str::random(5);
        }

        if (isset($validated['thumbnail']) && empty($validated['thumbnail'])) {
            $validated['thumbnail'] = null;
        }
        
        if ($request->has('is_published')) {
            $validated['is_published'] = $request->boolean('is_published');
        }

        $berita->update($validated);

        return response()->json($berita);
    }

    public function destroy($id)
    {
        $deleted = Berita::where('id', $id)->delete();
        
        if ($deleted) {
            return response()->json(['message' => 'Berita berhasil dihapus', 'status' => 'success']);
        }
        
        return response()->json(['message' => 'Gagal menghapus atau data tidak ditemukan', 'status' => 'failed'], 404);
    }
}
