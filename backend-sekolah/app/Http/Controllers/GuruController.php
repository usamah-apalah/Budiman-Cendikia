<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Guru::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'           => 'required|string|max:255',
            'nip'            => 'nullable|string',
            'jabatan'        => 'required|string',
            'mata_pelajaran' => 'nullable|string',
            'foto'           => 'nullable|string',
            'email'          => 'nullable|email',
            'jenjang'        => 'required|in:sd,smp', // Tambahan untuk membedakan dashboard
        ]);

        $guru = Guru::create($validated);
        return response()->json($guru, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guru $guru)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guru $guru)
    {
        $validated = $request->validate([
            'nama'           => 'sometimes|required|string|max:255',
            'nip'            => 'nullable|string',
            'jabatan'        => 'sometimes|required|string',
            'mata_pelajaran' => 'nullable|string',
            'foto'           => 'nullable|string',
            'email'          => 'nullable|email',
            'is_aktif'       => 'boolean',
        ]);

        $guru->update($validated);
        return response()->json($guru);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guru $guru)
    {
        $guru->delete();
        return response()->json(['message' => 'Data guru berhasil dihapus']);
    }
}
