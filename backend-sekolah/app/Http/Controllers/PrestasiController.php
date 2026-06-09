<?php

namespace App\Http\Controllers;

use App\Models\Prestasi;
use Illuminate\Http\Request;

class PrestasiController extends Controller
{
    public function index(Request $request)
    {
        $query = Prestasi::query();
        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }

        if ($request->has('limit')) {
            return response()->json($query->latest()->limit($request->limit)->get());
        }

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
            'tingkat'  => 'required|in:Lokal,Nasional,Internasional',
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
            'tingkat'  => 'sometimes|required|in:Lokal,Nasional,Internasional',
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
