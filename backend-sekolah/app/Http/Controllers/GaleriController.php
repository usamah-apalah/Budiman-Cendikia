<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;

class GaleriController extends Controller
{
    public function index(Request $request)
    {
        $query = Galeri::query();
        // Unit filter removed to synchronize data between units
        // if ($request->has('unit')) {
        //     $query->where('unit', $request->unit);
        // }
        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'      => 'required|in:sd,smp',
            'judul'     => 'required|string|max:255',
            'image'     => 'required|string',
            'deskripsi' => 'nullable|string',
        ]);

        $galeri = Galeri::create($validated);
        return response()->json($galeri, 201);
    }

    public function show(Galeri $galeri)
    {
        return response()->json($galeri);
    }

    public function update(Request $request, Galeri $galeri)
    {
        $validated = $request->validate([
            'unit'      => 'sometimes|required|in:sd,smp',
            'judul'     => 'sometimes|required|string|max:255',
            'image'     => 'sometimes|required|string',
            'deskripsi' => 'nullable|string',
        ]);

        $galeri->update($validated);
        return response()->json($galeri);
    }

    public function destroy($id)
    {
        $deleted = Galeri::where('id', $id)->delete();
        
        if ($deleted) {
            return response()->json(['message' => 'Galeri berhasil dihapus', 'status' => 'success']);
        }
        
        return response()->json(['message' => 'Gagal menghapus atau data tidak ditemukan', 'status' => 'failed'], 404);
    }
}
