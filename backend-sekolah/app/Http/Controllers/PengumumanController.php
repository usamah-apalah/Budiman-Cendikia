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

        if ($request->has('target_page')) {
            $query->whereJsonContains('target_pages', $request->target_page);
        }

        if (!$request->has('show_all')) {
            $query->where('is_aktif', true);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit'         => 'required|in:sd,smp',
            'judul'        => 'required|string|max:255',
            'isi'          => 'required|string',
            'image'        => 'nullable|string',
            'target_pages' => 'nullable|array',
            'is_aktif'     => 'boolean',
            'tanggal_mulai' => 'nullable|date',
        ]);

        $data = $validated;
        if (!isset($data['tanggal_mulai'])) {
            $data['tanggal_mulai'] = now()->toDateString();
        }

        $pengumuman = Pengumuman::create($data);
        return response()->json($pengumuman, 201);
    }

    public function show(Pengumuman $pengumuman)
    {
        return response()->json($pengumuman);
    }

    public function update(Request $request, Pengumuman $pengumuman)
    {
        $validated = $request->validate([
            'unit'         => 'sometimes|required|in:sd,smp',
            'judul'        => 'sometimes|required|string|max:255',
            'isi'          => 'sometimes|required|string',
            'image'        => 'nullable|string',
            'target_pages' => 'nullable|array',
            'is_aktif'     => 'boolean',
        ]);

        $pengumuman->update($validated);
        return response()->json($pengumuman);
    }

    public function destroy(int $id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        $pengumuman->delete();

        return response()->json([
            'message' => 'Pengumuman berhasil dihapus.'
        ]);
    }
}
