<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Pengumuman::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi'   => 'required|string',
            'tanggal' => 'nullable|date',
        ]);

        $pengumuman = Pengumuman::create($validated);
        return response()->json($pengumuman, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengumuman $pengumuman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengumuman $pengumuman)
    {
        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'isi'   => 'sometimes|required|string',
            'tanggal' => 'nullable|date',
        ]);

        $pengumuman->update($validated);
        return response()->json($pengumuman);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengumuman $pengumuman)
    {
        $pengumuman->delete();
        return response()->json(['message' => 'Pengumuman dihapus']);
    }
}
