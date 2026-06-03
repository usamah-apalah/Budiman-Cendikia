<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengumuman::query();
        if ($request->has('unit')) {
            $query->where('unit', $request->unit);
        }
        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'    => 'required|in:sd,smp',
            'judul'   => 'required|string|max:255',
            'konten'  => 'required|string',
            'is_aktif' => 'boolean',
        ]);

        $pengumuman = Pengumuman::create($validated);
        return response()->json($pengumuman, 201);
    }

    public function update(Request $request, Pengumuman $pengumuman)
    {
        $validated = $request->validate([
            'unit'    => 'sometimes|required|in:sd,smp',
            'judul'   => 'sometimes|required|string|max:255',
            'konten'  => 'sometimes|required|string',
            'is_aktif' => 'boolean',
        ]);

        $pengumuman->update($validated);
        return response()->json($pengumuman);
    }

    public function destroy(Pengumuman $pengumuman)
    {
        $pengumuman->delete();
        return response()->json(['message' => 'Pengumuman dihapus']);
    }
}
