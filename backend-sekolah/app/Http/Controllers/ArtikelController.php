<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArtikelController extends Controller
{
    public function index(Request $request)
    {
        $query = Artikel::query();

        if (!$request->has('show_all')) {
            $query->where('is_published', true);
        }

        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }

        $artikel = $query->latest()->get();
        return response()->json([
            'status' => 'success',
            'data' => $artikel
        ]);
    }

    public function show(string $slug)
    {
        $artikel = Artikel::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();
        return response()->json([
            'status' => 'success',
            'data' => $artikel
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'         => 'required|in:sd,smp',
            'tanggal'      => 'nullable|date',
            'judul'        => 'required|string|max:255',
            'konten'       => 'required|string',
            'kategori'     => 'nullable|string',
            'thumbnail'    => 'nullable|string',
            'is_published' => 'sometimes|boolean',
        ]);

        $artikel = Artikel::create([
            'unit'         => $validated['unit'],
            'tanggal'      => $validated['tanggal'] ?? now()->toDateString(),
            'judul'        => $validated['judul'],
            'slug'         => Str::slug($validated['judul']) . '-' . Str::random(5),
            'konten'       => $validated['konten'],
            'kategori'     => $validated['kategori'] ?? 'umum',
            'thumbnail'    => !empty($validated['thumbnail']) ? $validated['thumbnail'] : null,
            'is_published' => $request->has('is_published') ? $request->boolean('is_published') : true,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Artikel berhasil dibuat',
            'data' => $artikel
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $artikel = Artikel::findOrFail($id);
        
        $validated = $request->validate([
            'unit'         => 'sometimes|required|in:sd,smp',
            'tanggal'      => 'nullable|date',
            'judul'        => 'sometimes|required|string|max:255',
            'konten'       => 'sometimes|required|string',
            'kategori'     => 'nullable|string',
            'thumbnail'    => 'nullable|string',
            'is_published' => 'sometimes|boolean',
        ]);

        if (isset($validated['judul']) && $validated['judul'] !== $artikel->judul) {
            $validated['slug'] = Str::slug($validated['judul']) . '-' . Str::random(5);
        }

        if (isset($validated['thumbnail']) && empty($validated['thumbnail'])) {
            $validated['thumbnail'] = null;
        }
        
        if ($request->has('is_published')) {
            $validated['is_published'] = $request->boolean('is_published');
        }

        $artikel->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Artikel berhasil diperbarui',
            'data' => $artikel
        ]);
    }

    public function destroy($id)
    {
        $artikel = Artikel::findOrFail($id);
        $artikel->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Artikel berhasil dihapus'
        ]);
    }
}
