<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengumuman::query();
        // Unit filter removed to synchronize data between units
        // if ($request->has('unit')) {
        //     $query->where('unit', $request->unit);
        // }
        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'    => 'required|in:sd,smp',
            'judul'   => 'required|string|max:255',
            'isi'     => 'required|string',
            'image'   => 'nullable|string',
            'is_aktif' => 'boolean',
            'tanggal_mulai' => 'nullable|date',
        ]);

        $data = $validated;
        if (!isset($data['tanggal_mulai'])) {
            $data['tanggal_mulai'] = now()->toDateString();
        }

        $pengumuman = Pengumuman::create($data);
        return response()->json($pengumuman, 201);
    }

    public function update(Request $request, Pengumuman $pengumuman)
    {
        $validated = $request->validate([
            'unit'    => 'sometimes|required|in:sd,smp',
            'judul'   => 'sometimes|required|string|max:255',
            'isi'     => 'sometimes|required|string',
            'image'   => 'nullable|string',
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
