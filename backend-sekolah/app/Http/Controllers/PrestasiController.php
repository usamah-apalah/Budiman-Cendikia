<?php

namespace App\Http\Controllers;

use App\Models\Prestasi;
use Illuminate\Http\Request;

class PrestasiController extends Controller
{
    public function index(Request $request)
    {
        $query = Prestasi::query();
        // Unit filter removed to synchronize data between units
        // if ($request->has('unit')) {
        //     $query->where('unit', $request->unit);
        // }
        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'     => 'required|in:sd,smp',
            'judul'    => 'required|string|max:255',
            'konten'   => 'required|string',
            'tanggal'  => 'required|date',
            'image'    => 'nullable|string',
            'kategori' => 'required|in:siswa,guru,sekolah',
        ]);

        $prestasi = Prestasi::create($validated);
        return response()->json($prestasi, 201);
    }

    public function update(Request $request, Prestasi $prestasi)
    {
        $validated = $request->validate([
            'unit'     => 'sometimes|required|in:sd,smp',
            'judul'    => 'sometimes|required|string|max:255',
            'konten'   => 'sometimes|required|string',
            'tanggal'  => 'sometimes|required|date',
            'image'    => 'nullable|string',
            'kategori' => 'sometimes|required|in:siswa,guru,sekolah',
        ]);

        $prestasi->update($validated);
        return response()->json($prestasi);
    }

    public function destroy($id)
    {
        $deleted = Prestasi::where('id', $id)->delete();
        
        if ($deleted) {
            return response()->json(['message' => 'Prestasi berhasil dihapus', 'status' => 'success']);
        }
        
        return response()->json(['message' => 'Gagal menghapus atau data tidak ditemukan', 'status' => 'failed'], 404);
    }
}
